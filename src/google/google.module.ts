import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleService } from './google.service';

@Module({
   imports: [forwardRef(() => UserModule)],
   exports: [GoogleService],
   providers: [GoogleService]
})
export class GoogleModule { }
