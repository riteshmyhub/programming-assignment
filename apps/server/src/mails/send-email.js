import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export default async function SendEmail({ to, cc, bcc, subject, from, context, templateName }) {
   const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST, //if when gmail not work
      port: process.env.SMPT_PORT, //if when gmail not work
      service: process.env.SMPT_SERVICE,
      auth: {
         user: from || process.env.SMPT_MAIL, //simple mail protocol transfer
         pass: process.env.SMPT_PASSWORD,
      },
   });

   const templatesPath = path.resolve("./src/mails/templates/");

   const hbsOptions = {
      viewEngine: {
         defaultLayout: false,
         extName: ".hbs",
         partialsDir: templatesPath,
      },
      viewPath: templatesPath, //,
      extName: ".hbs",
   };
   transporter.use("compile", hbs(hbsOptions));

   const mailOptions = () => {
      let options = {};
      options.from = from || process.env.SMPT_MAIL;
      if (to) {
         options.to = to;
      }
      if (cc) {
         options.cc = cc;
      }
      if (bcc) {
         options.bcc = bcc;
      }
      if (subject) {
         options.subject = subject;
      }
      if (templateName && context) {
         options.template = templateName;
         options.context = context;
      }
      return Object.freeze(options);
   };
   let info = await transporter.sendMail(mailOptions());
   return info;
}
