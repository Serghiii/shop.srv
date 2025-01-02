import { Injectable } from '@nestjs/common'
import { PUserDto, UserDto } from '../user/dto/user.dto'
import en from '../locals/en'

const nodemailer = require('nodemailer')

@Injectable()
export class MailService {
	transporter: any
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		})
	}

	async sendMail(to: string, link: string, dto: UserDto) {
		return await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: (dto as PUserDto).activation_on
				? (dto as PUserDto).activation_on
				: en.mail.activation_on + process.env.API_URL + ' ✔',
			html: `<div><h2>${(dto as PUserDto).activation_ref ? (dto as PUserDto).activation_ref : en.mail.activation_ref}</h2><a href="${link}">${link}</a></a></div>`
		})
	}
}
