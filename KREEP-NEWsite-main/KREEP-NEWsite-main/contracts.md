# KREEP Store - API Contracts & Integration Plan

## Mock Data Overview
Currently using static mock data in `/app/frontend/src/mock.js` for all sections:
- Hero content
- How it works steps
- Product categories
- Features and benefits  
- Security information
- FAQ items
- Contact information
- Newsletter data

## Required Backend Endpoints

### 1. Contact Form API
```
POST /api/contact
Body: {
  name: string,
  email: string,
  message: string
}
Response: { success: boolean, message: string }
```

### 2. Newsletter Subscription API
```
POST /api/newsletter
Body: {
  email: string
}
Response: { success: boolean, message: string }
```

### 3. Content Management APIs (Optional Enhancement)
```
GET /api/content/hero - Hero section content
GET /api/content/features - Why KREEP features
GET /api/content/faq - FAQ items
GET /api/products/categories - Product categories
```

## Database Models

### Contact Messages
```python
class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime
    status: str = "new"  # new, read, replied
```

### Newsletter Subscriptions
```python
class NewsletterSubscription(BaseModel):
    id: str
    email: str
    subscribed_at: datetime
    active: bool = True
```

## Frontend Integration Changes Required

### 1. Remove Mock Dependencies
- Replace mock data imports with API calls
- Add loading states for async operations
- Implement error handling for API failures

### 2. Form Submissions
- Update ContactSection.js to use real API endpoint
- Add proper validation and error handling
- Show loading states during submission

### 3. Newsletter Subscription
- Connect newsletter form to backend API
- Add email validation
- Handle subscription success/error states

## Integration Checklist

- [ ] Create backend models and endpoints
- [ ] Test backend APIs with curl/Postman
- [ ] Update frontend to use real APIs
- [ ] Remove mock.js dependencies
- [ ] Add proper error handling
- [ ] Test full frontend-backend integration

## Notes
- Keep all styling and UI components unchanged
- Focus on functionality, not design changes
- Maintain current user experience with real data
- Add email notifications for contact form submissions