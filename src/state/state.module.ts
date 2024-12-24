import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
  ],
  exports: [
    StateService
  ],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule {}
