import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: string) {
    return this.roomRepository.findOne({ where: { id } });
  }

  create(room: Partial<Room>) {
    return this.roomRepository.save(room);
  }

  update(id: string, room: Partial<Room>) {
    return this.roomRepository.update(id, room);
  }

  delete(id: string) {
    return this.roomRepository.delete(id);
  }
}
