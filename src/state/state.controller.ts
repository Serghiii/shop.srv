import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('states')
export class StateController {
    constructor(private stateService: StateService,
    ) { }
 
    @Get()
    getAllStates() {
       return this.stateService.getAllStates();
    }
 }
 
