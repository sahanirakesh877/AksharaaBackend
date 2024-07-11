const nodemailer = require("nodemailer");



module.exports=async(email,subject,text)=>{
    try {

         // Set up Node Mailer transport
    const transporter = nodemailer.createTransport({
      // Specify your email service details (SMTP or other service)
      service: "Gmail",
      auth: {
        user: "sahanirakesh877@gmail.com",
        pass: "pnvh gmbs hzrd wdzc",
      },
    });
    // Compose email message
    const mailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: email,
      subject: "Email Verification",
      text: ` http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}`,
      html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${existingUser.name},</p>
      <p>You have requested a password reset. Please click the following link to reset your password:</p>
      <a href="http://localhost:5173/resetpassword/${existingUser._id}/${resetToken}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
     
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email could not be sent" });
      }
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Email Verification  successfully" });
    });
    } catch (error) {
        
    }

}