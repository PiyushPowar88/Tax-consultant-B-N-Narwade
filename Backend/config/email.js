import nodemailer from "nodemailer";

// Configure your email service (Gmail, SendGrid, etc.)
// For Gmail, you need to use App Password: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

// Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email service not configured:", error.message);
    console.log("📧 Email User:", process.env.EMAIL_USER);
    console.log("🔑 Email Password length:", process.env.EMAIL_PASSWORD?.length);
  } else {
    console.log("✅ Email service ready");
  }
});

export default transporter;
