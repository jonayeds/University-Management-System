import nodemailer from "nodemailer"
import config from "../config";
export const sendEmail =async ()=>{
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
        to: "jonayeeds@gmail.com", // list of receivers
        subject: "Change Your password ✔", // Subject line
        text: "Hello !!!", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      
}