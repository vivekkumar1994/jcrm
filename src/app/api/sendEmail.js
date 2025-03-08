// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    try {
      // Send email to admin
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "your-email@example.com", // Receiving email
        subject: `New Contact Form Message from ${name}`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`,
      });

      // Send confirmation email to the user
      await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: email, // Send to the user's email
        subject: `Thank You for Contacting Us, ${name}!`,
        text: `Hi ${name}, thank you for reaching out. We have received your message and will respond shortly.`,
        html: `<p>Hi <strong>${name}</strong>,</p>
               <p>Thank you for getting in touch with us! We have received your message and will get back to you as soon as possible.</p>
               <p><strong>Your Message:</strong></p>
               <p>${message}</p>
               <p>If your inquiry is urgent, please feel free to reach us at <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>
               <br/>
               <p>Best regards,</p>
               <p>Your Company Name</p>
               <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>`,
      });

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Email sending failed:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
