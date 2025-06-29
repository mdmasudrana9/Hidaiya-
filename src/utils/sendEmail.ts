import nodemailer from 'nodemailer'

const sendEmail = async (to: string, subject: string, html: string) => {
  console.log('process.env. :>> ', process.env.SMTP_USER)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. 'smtp.gmail.com'
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL, // your email
      pass: process.env.SMTP_PASSWORD, // your password or app password
    },
    tls: {
      // ✅ This line allows self-signed certificate (for development only)
      rejectUnauthorized: false,
    },
  })

  const info = await transporter.sendMail({
    from: `"Hidaya Org" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  })

  console.log('Email sent: ', info.messageId)
}

export default sendEmail
