import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
   async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
      if (!metatype || !this.toValidate(metatype)) {
         return value
      }
      const obj = plainToInstance(metatype, value)

      const errors = await validate(obj)
      if (errors.length) {
         let messages = errors.map((err: any) => {
            return `${err.property} - ${Object.values(err.constraints).join(', ')}`
         })
         throw new ValidationException(messages)
      }
      return value
   }
   private toValidate(metatype: Function): boolean {
      const types: Function[] = [String, Boolean, Number, Array, Object]
      return !types.includes(metatype)
   }
}
