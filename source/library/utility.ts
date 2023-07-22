
import { pbkdf2 } from 'crypto';

export function getEpoch(): number {
	return Math.trunc(Date.now() / 1000);
}

export function getEncryptedPassword(password: string, salt: string): Promise<string> {
	return new Promise<string>(function (resolve: ResolveFunction<string>, reject: RejectFunction): void {
		pbkdf2(password, salt, Number.parseInt(process['env']['PBKDF2_ITERATION'], 10), 64, 'sha512', function (error: Error | null, encryptedPassword: Buffer) {
			if(error === null) {
				resolve(encryptedPassword.toString('hex'));
			} else {
				reject(error);
			}
		});

		return;
	});
}

export function setBlogPassword(password: string): Promise<void> {
	return getEncryptedPassword(password, process['env']['SECRET'])
	.then(function (encryptedPassword: string): void {
		process['env']['BLOG_PASSWORD'] = encryptedPassword;

		return;
	});
}

export function getReadingTime(content: string): number {
	let spaceCount: number = 0;
	
	for(let i: number = 0; i < content['length']; i++) {
		if(content[i].charCodeAt(0) === 32 && (i + 1 === content['length'] || content[i + 1].charCodeAt(0) !== 32)) {
			spaceCount++;
		}
	}

	return Math.trunc(spaceCount / 200); // Reading speed of 200wpm
}

export function getNormaltext(text: string): string {
	return text.replace(/[^\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9\s]+/gu, '');
}