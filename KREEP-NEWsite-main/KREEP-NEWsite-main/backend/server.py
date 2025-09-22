from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from emails import send_newsletter_notification, send_contact_notification


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# KREEP Store Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class ApiResponse(BaseModel):
    success: bool
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# KREEP Store Endpoints
@api_router.post("/contact", response_model=ApiResponse)
async def submit_contact_form(contact_data: ContactMessageCreate, background_tasks: BackgroundTasks):
    try:
        # Create contact message object
        contact_message = ContactMessage(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"Contact form submitted by {contact_data.email}")
            
            # Send email notification in background
            background_tasks.add_task(
                send_contact_notification,
                contact_data.name,
                contact_data.email,
                contact_data.message
            )
            
            return ApiResponse(
                success=True, 
                message="Дякуємо за ваше повідомлення! Ми зв'яжемося з вами найближчим часом."
            )
        else:
            raise Exception("Failed to insert contact message")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        return ApiResponse(
            success=False,
            message="Сталася помилка при відправленні повідомлення. Спробуйте ще раз."
        )

@api_router.post("/newsletter", response_model=ApiResponse)
async def subscribe_newsletter(subscription_data: NewsletterSubscriptionCreate, background_tasks: BackgroundTasks):
    try:
        # Check if email already exists
        existing_subscription = await db.newsletter_subscriptions.find_one(
            {"email": subscription_data.email, "active": True}
        )
        
        if existing_subscription:
            return ApiResponse(
                success=True,
                message="Ви вже підписані на наші новини!"
            )
        
        # Create subscription object
        subscription = NewsletterSubscription(**subscription_data.dict())
        
        # Insert into database
        result = await db.newsletter_subscriptions.insert_one(subscription.dict())
        
        if result.inserted_id:
            logger.info(f"Newsletter subscription: {subscription_data.email}")
            
            # Send email notification in background
            background_tasks.add_task(
                send_newsletter_notification,
                subscription_data.email
            )
            
            return ApiResponse(
                success=True,
                message="Ви успішно підписалися на новини KREEP!"
            )
        else:
            raise Exception("Failed to insert newsletter subscription")
            
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        return ApiResponse(
            success=False,
            message="Сталася помилка при підписці. Спробуйте ще раз."
        )

# Admin endpoints for viewing submissions
@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
    return [ContactMessage(**message) for message in messages]

@api_router.get("/newsletter/subscriptions", response_model=List[NewsletterSubscription])
async def get_newsletter_subscriptions():
    subscriptions = await db.newsletter_subscriptions.find({"active": True}).sort("subscribed_at", -1).to_list(1000)
    return [NewsletterSubscription(**subscription) for subscription in subscriptions]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
