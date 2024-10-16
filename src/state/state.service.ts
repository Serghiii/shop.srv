import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
    constructor(
        @InjectRepository(State) private stateRepository: Repository<State>,
     ) { }
  
     async getAllStates() {
        return await this.stateRepository
           .createQueryBuilder("states")
           .select('*')
           .getRawMany();
     }  
}
