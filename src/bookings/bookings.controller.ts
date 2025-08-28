import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAllBookings() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  getBooking(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Post()
  addBooking(@Body() booking: any) {
    return this.bookingsService.create(booking);
  }

  @Put(':id')
  updateBooking(@Param('id') id: string, @Body() booking: any) {
    return this.bookingsService.update(id, booking);
  }

  @Delete(':id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
