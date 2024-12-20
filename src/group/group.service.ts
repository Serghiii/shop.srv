import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
    ) { }

    async getAllGroups() {
        return await this.groupRepository.find({
            select: {
                id: true,
                name: true,
                ref: true,
                pic: true,
                category: {
                    id: true
                }
            },
            relations: { category: true }
        })
    }
}
