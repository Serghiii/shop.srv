import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubGroup } from './subgroup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubGroupService {
    constructor(
        @InjectRepository(SubGroup) private subgroupRepository: Repository<SubGroup>,
    ) { }

    async getAllSubGroups() {
        return await this.subgroupRepository.find({
            select: {
                id: true,
                name: true,
                ref: true,
                pic: true,
                group: {
                    id: true
                }
            },
            relations: { group: true },
        })
    }
}
