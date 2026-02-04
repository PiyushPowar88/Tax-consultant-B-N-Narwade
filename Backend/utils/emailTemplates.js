// Email template for admin notification
export const getAdminEmailTemplate = (name, email, phone, message) => {
  return {
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px;">New Inquiry Received</h2>
        
        <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong style="color: #0066cc;">Name:</strong> ${name}</p>
          <p><strong style="color: #0066cc;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong style="color: #0066cc;">Phone:</strong> ${phone}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <p style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #0066cc; border-radius: 4px;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated message from your contact form system.
        </p>
      </div>
    `,
  };
};

// Email template for user confirmation
export const getUserEmailTemplate = (name) => {
  return {
    subject: "Thank you for contacting us!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #0066cc; text-align: center;">Thank You for Reaching Out!</h2>
        
        <div style="margin: 20px 0; background-color: #e8f4f8; padding: 15px; border-radius: 5px; border-left: 4px solid #0066cc;">
          <p>Dear <strong>${name}</strong>,</p>
          
          <p>We have received your inquiry and appreciate you taking the time to contact us. Our team is reviewing your message and will get back to you as soon as possible.</p>
          
          <p><strong>What's Next?</strong></p>
          <ul style="color: #333;">
            <li>We'll review your inquiry carefully</li>
            <li>We'll connect with you soon with relevant solutions</li>
            <li>Please expect a response within 24-48 hours</li>
          </ul>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <p style="color: #666; font-size: 14px;">
            <strong>Need immediate assistance?</strong><br>
            Feel free to reach out to us directly through our website or contact information.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 12px; text-align: center;">
          Best regards,<br>
          <strong>B N Narwade Team</strong><br>
          <em>We'll connect you soon!</em>
        </p>
      </div>
    `,
  };
};
