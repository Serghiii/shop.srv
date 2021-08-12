import { Body, Controller, Post } from '@nestjs/common';
import { PropdetailService } from './propdetail.service';

@Controller('propdetail')
export class PropdetailController {
   constructor(private readonly propdetailService: PropdetailService) { }

   @Post('/ids')
   async getPropDetailIds(@Body() { data }) {
      return await this.propdetailService.getPropDetailIds(data);
   }

}
