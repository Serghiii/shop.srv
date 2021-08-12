import { Injectable } from '@nestjs/common';
import { translate } from '../locales/translate';

const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
   transporter: any;
   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: Number(process.env.SMTP_PORT),
         secure: true,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
      });
   }

   async sendMail(to: string, link: string, lang: string = 'uk') {
      return this.transporter.sendMail({
         from: process.env.SMTP_USER,
         to,
         subject: translate('mail.activation_on', lang) + process.env.API_URL + ' ✔',
         html: `<div><h2>${translate('mail.activation_ref', lang)}</h2><a href="${link}">${link}</a></a></div>`
      });
   }

}
