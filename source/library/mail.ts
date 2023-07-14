// @ts-expect-error
import { SMTPChannel } from 'smtp-channel';

const smtp: SMTPChannel = new SMTPChannel({
	host: process['env']['EMAIL_HOST'],
	port: Number.parseInt(process['env']['EMAIL_PORT']),
	secure: true
});

const encodedEmailUser: string = Buffer.from(process['env']['EMAIL_USER'], 'utf-8').toString('base64');
const encodedEmailPassword: string = Buffer.from(process['env']['EMAIL_PASSWORD'], 'utf-8').toString('base64');
const encodedBlogName: string = Buffer.from(process['env']['BLOG_NAME'], 'utf-8').toString('base64');

export default function sendMail(email: string, title: string, content: string): Promise<boolean> {
	return smtp.connect()
	.then(function (): Promise<void> {
		return smtp.write('EHLO server\r\n');
	})
	.then(function (): Promise<void> {
		return smtp.write('AUTH LOGIN\r\n');
	})
	.then(function (): Promise<void> {
		return smtp.write(encodedEmailUser + '\r\n' + encodedEmailPassword + '\r\nMAIL FROM:<' + process['env']['EMAIL_USER'] + '> SMTPUTF8\r\nRCPT TO:<' + email + '>\r\n');
	})
	.then(function (): Promise<void> {
		return smtp.write('DATA\r\n');
	})
	.then(function (): Promise<void> {
		return smtp.write('From: =?UTF-8?B?' + encodedBlogName + '?= <' + process['env']['EMAIL_USER'] + '>\r\nTo: <' + email + '>\r\nSubject: =?UTF-8?B?' + Buffer.from(title.replace(/\./m, '..'), 'utf-8').toString('base64') + '?=\r\nContent-Type: text/html; charset="UTF-8";\r\n\r\n=?UTF-8?B?' + Buffer.from(content.replace(/\./m, '..').replace(/[^\r]\n/g, '\r\n'), 'utf-8').toString('base64') + '?=\r\n.\r\nQUIT\r\n');
	})
	.then(function (): Promise<boolean> {
		return smtp.close(); // close event in Socket, returns hadError
	});
}