import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import en from '../locals/en'

@Injectable()
export class FileService {
	async writeFile(
		fileName: string,
		filePath: string,
		data: string | NodeJS.ArrayBufferView
	): Promise<string> {
		try {
			const Path = path.resolve(__dirname, '../..', filePath)
			if (!fs.existsSync(Path)) {
				fs.mkdirSync(Path, { recursive: true })
			}
			// await Jimp.read(Buffer.from(data, 'base64')).then((image: any) => {
			//    image.quality(10).writeAsync(path.join(Path, fileName));
			// });
			fs.writeFileSync(path.join(Path, fileName), data)
			return path.join(Path, fileName)
		} catch {
			throw new HttpException(
				{
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: en.file.write_error,
					messageId: 'file.write_error'
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async removeFile(fileName: string, filePath: string) {
		try {
			const Path = await path.resolve(__dirname, '../..', filePath)
			fs.unlinkSync(path.join(Path, fileName))
		} catch {
			throw new HttpException(
				{
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
					message: en.file.delete_error,
					messageId: 'file.delete_error'
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
