from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class EmailDeliveryError(Exception):
    pass

def send_email(to: str, subject: str, content: str, content_type: str = "html"):
    """
    Send email via SendGrid

    Args:
        to: Recipient email address
        subject: Email subject line
        content: Email content (HTML or plain text)
        content_type: "html" or "plain"
    """
    # For demo purposes, we'll log the email instead of actually sending
    # In production, you would use a real SendGrid API key
    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    sender_email = os.getenv('SENDER_EMAIL')
    
    if not sendgrid_api_key or sendgrid_api_key == "demo_key_for_development":
        # Demo mode - just log the email
        logger.info(f"""
        📧 EMAIL NOTIFICATION (Demo Mode):
        From: {sender_email}
        To: {to}
        Subject: {subject}
        Content: {content}
        """)
        return True
    
    try:
        message = Mail(
            from_email=sender_email,
            to_emails=to,
            subject=subject,
            html_content=content if content_type == "html" else None,
            plain_text_content=content if content_type == "plain" else None
        )

        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")

def send_newsletter_notification(subscriber_email: str, subscriber_name: str = "Новий підписник"):
    """
    Send notification to kreep@kreep.world about new newsletter subscription
    """
    notification_email = os.getenv('NOTIFICATION_EMAIL', 'kreep@kreep.world')
    
    subject = f"🎉 Нова підписка на розсилку KREEP"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00FFD1, #6FD2C0); padding: 30px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: #000; margin: 0; font-size: 28px;">KREEP</h1>
                <p style="color: #000; margin: 10px 0 0 0; font-size: 18px;">Магазин майбутнього</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0;">Нова підписка на розсилку!</h2>
                
                <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #00FFD1;">
                    <p style="color: #333; margin: 0 0 10px 0;"><strong>Email підписника:</strong></p>
                    <p style="color: #00FFD1; font-size: 18px; margin: 0 0 15px 0;">{subscriber_email}</p>
                    
                    <p style="color: #666; margin: 0; font-size: 14px;">
                        Підписка створена: {subscriber_name}<br>
                        Час: автоматично зафіксовано в системі
                    </p>
                </div>
            </div>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #1976d2; margin-top: 0;">Що далі?</h3>
                <ul style="color: #333; line-height: 1.6;">
                    <li>Підписник автоматично доданий до бази розсилки</li>
                    <li>Можна відправляти персоналізовані пропозиції</li>
                    <li>Рекомендуємо підготувати welcome-серію листів</li>
                    <li>Відстежуйте активність через панель адміністратора</li>
                </ul>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f5f5f5; border-radius: 8px; color: #666;">
                <p style="margin: 0;">Це автоматичне повідомлення від системи KREEP</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">
                    Для питань звертайтеся: tech@kreep.world
                </p>
            </div>
        </body>
    </html>
    """
    
    try:
        return send_email(notification_email, subject, html_content, "html")
    except EmailDeliveryError as e:
        logger.error(f"Failed to send newsletter notification: {str(e)}")
        return False

def send_contact_notification(contact_name: str, contact_email: str, message: str):
    """
    Send notification to kreep@kreep.world about new contact form submission
    """
    notification_email = os.getenv('NOTIFICATION_EMAIL', 'kreep@kreep.world')
    
    subject = f"📝 Нове повідомлення з контактної форми KREEP"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00FFD1, #6FD2C0); padding: 30px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: #000; margin: 0; font-size: 28px;">KREEP</h1>
                <p style="color: #000; margin: 10px 0 0 0; font-size: 18px;">Магазин майбутнього</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0;">Нове повідомлення з контактної форми</h2>
                
                <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #00FFD1; margin-bottom: 15px;">
                    <p style="color: #333; margin: 0 0 10px 0;"><strong>Ім'я:</strong></p>
                    <p style="color: #00FFD1; font-size: 18px; margin: 0 0 15px 0;">{contact_name}</p>
                    
                    <p style="color: #333; margin: 0 0 10px 0;"><strong>Email:</strong></p>
                    <p style="color: #00FFD1; font-size: 16px; margin: 0;">{contact_email}</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #ff9800;">
                    <p style="color: #333; margin: 0 0 10px 0;"><strong>Повідомлення:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; color: #333; line-height: 1.6;">
                        {message}
                    </div>
                </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #2e7d2e; margin-top: 0;">Рекомендовані дії:</h3>
                <ul style="color: #333; line-height: 1.6;">
                    <li>Відповісти на email {contact_email} протягом 2 годин</li>
                    <li>Додати контакт до CRM системи</li>
                    <li>Проаналізувати тип запиту для покращення FAQ</li>
                    <li>За потреби призначити дзвінок менеджера</li>
                </ul>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f5f5f5; border-radius: 8px; color: #666;">
                <p style="margin: 0;">Це автоматичне повідомлення від системи KREEP</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">
                    Для питань звертайтеся: tech@kreep.world
                </p>
            </div>
        </body>
    </html>
    """
    
    try:
        return send_email(notification_email, subject, html_content, "html")
    except EmailDeliveryError as e:
        logger.error(f"Failed to send contact notification: {str(e)}")
        return False