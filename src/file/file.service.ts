import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import en from "src/locals/en";

var Jimp = require('jimp');

@Injectable()
export class FileService {

   async writeImage(fileName: string, filePath: string, data: string): Promise<string> {
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
         throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: en.file.write_error, error: 'file.write_error' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async removeFile(fileName: string, filePath: string) {
      try {
         const Path = await path.resolve(__dirname, '../..', filePath);
         fs.unlinkSync(path.join(Path, fileName));
      }
      catch (e) {
         throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: en.file.delete_error, error: 'file.delete_error' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

}