import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { translate } from '../locales/translate';

var Jimp = require('jimp');

@Injectable()
export class FileService {

   async writeImage(fileName: string, filePath: string, data: string, lang: string = 'uk'): Promise<string> {
      try {
         const Path = await path.resolve(__dirname, '../..', filePath);
         if (!fs.existsSync(Path)) {
            await fs.mkdirSync(Path, { recursive: true });
         }
         await Jimp.read(await Buffer.from(data, 'base64')).then((image: any) => {
            image.quality(10).writeAsync(path.join(Path, fileName));
         });
         return path.join(Path, fileName);
      }
      catch (e) {
         throw new HttpException(translate('file.write_error', lang), HttpStatus.INTERNAL_SERVER_ERROR)
      }
   }

   async removeFile(fileName: string, filePath: string, lang: string = 'uk') {
      try {
         const Path = await path.resolve(__dirname, '../..', filePath);
         fs.unlinkSync(path.join(Path, fileName));
      }
      catch (e) {
         throw new HttpException(translate('file.delete_error', lang), HttpStatus.INTERNAL_SERVER_ERROR)
      }
   }

}