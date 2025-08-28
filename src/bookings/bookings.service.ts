import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: string) {
    return this.bookingRepository.findOne({ where: { id } });
  }

  create(booking: Partial<Booking>) {
    return this.bookingRepository.save(booking);
  }

  update(id: string, booking: Partial<Booking>) {
    return this.bookingRepository.update(id, booking);
  }

  delete(id: string) {
    return this.bookingRepository.delete(id);
  }
}
