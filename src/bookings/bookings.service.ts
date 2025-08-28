import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { BookingDto } from './dto/booking.dto';
import { UpdateDto } from './dto/update-dto';
import { Room } from 'src/room/entities/room.entity';
import { Employee } from 'src/employees/entities/entity';

export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  // Create a booking
  async create(bookingDto: BookingDto): Promise<string> {
    const { room_id, employee_id, startTime, endTime } = bookingDto;
    const startObj = new Date(startTime);
    const endObj = new Date(endTime);

    if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    if (startObj.getTime() <= new Date().getTime()) {
      throw new BadRequestException('Start time must be in the future');
    }
    if (endObj.getTime() <= startObj.getTime()) {
      throw new BadRequestException('End time must be greater than start time');
    }

    // Employee ID is number
    const employeeIdNum = Number(employee_id);
    if (isNaN(employeeIdNum)) {
      throw new BadRequestException('Invalid employee_id');
    }

    // Room ID is string
    const roomIdStr = room_id;

    // Check if room or employee is already booked in this time slot
    const alreadyBooked = await this.bookingRepository
      .createQueryBuilder('b')
      .where('(b.room = :room_id OR b.employee = :employee_id)', {
        room_id: roomIdStr,
        employee_id: employeeIdNum,
      })
      .andWhere('b.endTime > :startTime', { startTime: startObj })
      .andWhere('b.startTime < :endTime', { endTime: endObj })
      .getOne();

    if (alreadyBooked) {
      throw new ConflictException('Room is already booked in this time slot');
    }

    const newBooking = new Booking();

    // Create partial entities safely
    const employee = this.bookingRepository.manager
      .getRepository(Employee)
      .create({ id: employeeIdNum });

    const room = this.bookingRepository.manager
      .getRepository(Room)
      .create({ id: roomIdStr });

    newBooking.employee = employee;
    newBooking.room = room;
    newBooking.startTime = startObj;
    newBooking.endTime = endObj;

    await this.bookingRepository.save(newBooking);
    return 'Booking created successfully';
  }

  // Update an existing booking
  async updateBooking(updateDto: UpdateDto): Promise<string> {
    const { booking_id, room_id, startTime, endTime } = updateDto;
    const startObj = new Date(startTime);
    const endObj = new Date(endTime);

    if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    if (startObj.getTime() <= new Date().getTime()) {
      throw new BadRequestException('Start time must be in the future');
    }
    if (endObj.getTime() <= startObj.getTime()) {
      throw new BadRequestException('End time must be greater than start time');
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: { id: booking_id },
    });

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }

    const roomIdStr = room_id;

    // Check for overlapping bookings excluding current booking
    const alreadyBooked = await this.bookingRepository
      .createQueryBuilder('b')
      .where('b.room = :room_id', { room_id: roomIdStr })
      .andWhere('b.id != :booking_id', { booking_id })
      .andWhere('b.endTime > :startTime', { startTime: startObj })
      .andWhere('b.startTime < :endTime', { endTime: endObj })
      .getOne();

    if (alreadyBooked) {
      throw new ConflictException('Room is already booked in this time slot');
    }

    existingBooking.startTime = startObj;
    existingBooking.endTime = endObj;

    // Update room safely
    const room = this.bookingRepository.manager
      .getRepository(Room)
      .create({ id: roomIdStr });

    existingBooking.room = room;

    await this.bookingRepository.save(existingBooking);
    return 'Booking updated successfully';
  }

  // Delete a booking
  async deleteBooking(booking_id: string): Promise<string> {
    const existingBooking = await this.bookingRepository.findOne({
      where: { id: booking_id },
    });

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingRepository.remove(existingBooking);
    return 'Booking deleted successfully';
  }

  // Fetch all bookings
  async fetchAllBookings(): Promise<any[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['room', 'employee'],
    });

    return bookings.map((booking) => ({
      booking_id: booking.id,
      room_id: booking.room.id,
      employee_id: booking.employee.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
  }

  // Fetch all bookings by a single employee
  async fetchAllBookingsByEmployee(employee_id: string): Promise<any[]> {
    const employeeIdNum = Number(employee_id);
    if (isNaN(employeeIdNum)) {
      throw new BadRequestException('Invalid employee_id');
    }

    const bookings = await this.bookingRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.room', 'room')
      .leftJoinAndSelect('b.employee', 'employee')
      .where('employee.id = :employee_id', { employee_id: employeeIdNum })
      .getMany();

    return bookings.map((booking) => ({
      booking_id: booking.id,
      room_id: booking.room.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
  }
}
