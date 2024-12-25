import nodemailer from "nodemailer"
import config from "../config";
export const sendEmail =async (to:string, html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production", // true for port 465, false for other ports
        auth: {
          user: "1juunaayeed@gmail.com",
          pass: "arka yhap okjq hixs",
        },
      });
      
      await transporter.sendMail({
        from: '1juunaayeed@gmail.com', // sender address
        to, // list of receivers
        subject: "Change Your password ✔", // Subject line
        text: "Reset your password within 10 minutes", // plain text body
        html, // html body
      });
      
}