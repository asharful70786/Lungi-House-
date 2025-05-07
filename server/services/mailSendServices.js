import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ashrafulmomin2@gmail.com", 
    pass:  process.env.nodemailer_password, 
  },
});


async function sendMail(name, email, phone, message) {
  const info = await transporter.sendMail({
    from: '"Lungi House Support" <lungiHouse@ashraful.in>',
    to: "ashrafulmomin530@gmail.com",
    subject: `📩 New Message from ${name} via Lungi House Contact Form`,
    text: `New message from ${name} (${email}, ${phone}): ${message}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #2c3e50;">📬 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #3498db;">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #3498db;">${phone}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #3498db; padding-left: 10px; color: #555; font-style: italic;">
          ${message}
        </blockquote>
        <hr style="margin: 20px 0;" />
        <footer style="font-size: 0.9em; color: #777;">
          This message was sent from the Lungi House contact form.
        </footer>
      </div>
    `
  });

  console.log("✅ Message sent:", info.messageId);
}

export default sendMail;