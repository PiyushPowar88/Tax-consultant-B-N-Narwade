# Email Service Implementation Guide

## Overview
Email notifications are now integrated into the contact form. When a user submits the contact form:
1. Their inquiry is saved to the database
2. An email is sent to the admin with full details
3. A confirmation email is sent to the user

## Setup Instructions

### 1. Install Dependencies ✅
Nodemailer has already been installed in the Backend:
```bash
npm install nodemailer
```

### 2. Configure Environment Variables
Create a `.env` file in the Backend folder (or update the existing one):

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@example.com

# Other existing configurations...
```

### 3. Gmail Setup (For Email Sending)

#### Using Gmail with App Passwords:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Generate an App Password
6. Copy the 16-character password to your `.env` file as `EMAIL_PASSWORD`

#### Using Other Email Services:
If you want to use a different email service (SendGrid, Mailgun, etc.), update `Backend/config/email.js`:

```javascript
// Example for SendGrid
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### 4. File Structure

#### New/Modified Backend Files:
- **Backend/config/email.js** - Email service configuration
- **Backend/utils/emailTemplates.js** - HTML email templates for admin and user
- **Backend/routes/inquiryRoutes.js** - Updated with email sending logic
- **Backend/.env.example** - Environment variables template

#### Updated Frontend Files:
- **Frontend/src/pages/Contact.jsx** - Enhanced with validation and better UX

### 5. Features Implemented

✅ **Admin Notification Email**
- Receives all contact details (name, email, phone, message)
- Professional HTML formatting
- Clickable email link to reply

✅ **User Confirmation Email**
- Professional thank you message
- Sets expectations for response time (24-48 hours)
- Branded with company name

✅ **Form Validation**
- Required field validation
- Email format validation
- Phone number length validation

✅ **User Feedback**
- Success message with email confirmation
- Error messages for validation failures
- Loading state during submission

✅ **Error Handling**
- Gracefully handles email service failures
- Database errors are caught
- Console logging for debugging

### 6. Testing the Email Service

1. Ensure `.env` file is configured with valid credentials
2. Start the backend server:
   ```bash
   npm start
   # or
   npm run dev
   ```
3. Start the frontend
4. Navigate to the Contact page
5. Fill in all fields and submit
6. Check both:
   - Admin email inbox for the inquiry details
   - User email inbox for the confirmation message

### 7. Troubleshooting

**❌ "Email service not configured"**
- Check that `.env` file exists with correct variables
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Check console for detailed error messages

**❌ "Failed to send email"**
- Verify Gmail App Password is correctly set (16 characters with spaces removed)
- Ensure 2-Factor Authentication is enabled on Gmail
- Check that your firewall/antivirus isn't blocking SMTP port 587

**❌ Emails going to spam**
- This is normal for first-time sends
- Add your domain to sender allowlist in Gmail settings
- For production, consider setting up proper SPF/DKIM records

### 8. Customization

#### Change Email Templates:
Edit `Backend/utils/emailTemplates.js` to customize:
- Subject lines
- Email content and styling
- HTML formatting

#### Change Admin Email Recipient:
Update in `.env` file:
```env
ADMIN_EMAIL=your-admin@company.com
```

Or set it when starting the server:
```bash
ADMIN_EMAIL=custom@email.com npm start
```

### 9. Database Requirement

Ensure you have the `inquiries` table in your database:
```sql
CREATE TABLE inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  is_read INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Production Considerations

- **Use environment variables** for all sensitive data
- **Implement rate limiting** to prevent spam submissions
- **Add email templates** for other notifications
- **Monitor email delivery** - keep logs of sent emails
- **Consider email service** - for high volume, use SendGrid/Mailgun
- **Add spam protection** - implement CAPTCHA if needed

## Testing Email Credentials

To test your email configuration without using the form:
```javascript
// Backend/config/email.js already has a verification function
// Check console logs when backend starts to see:
// ✅ Email service ready
// or
// ❌ Email service not configured
```

---

**Ready to test!** Start your backend and frontend, then submit a test inquiry from the contact form.
