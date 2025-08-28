import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dto/booking.dto';
import { UpdateDto } from './dto/update-dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Get all bookings
  @Get()
  getAllBookings() {
    return this.bookingsService.fetchAllBookings();
  }

  // Get bookings by a single employee
  @Get('employee/:id')
  getBookingsByEmployee(@Param('id') id: string) {
    return this.bookingsService.fetchAllBookingsByEmployee(id);
  }

  // Create a new booking
  @Post()
  addBooking(@Body() bookingDto: BookingDto) {
    return this.bookingsService.create(bookingDto);
  }

  // Update an existing booking
  @Patch()
  updateBooking(@Body() updateDto: UpdateDto) {
    return this.bookingsService.updateBooking(updateDto);
  }

  // Delete a booking
  @Delete(':id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingsService.deleteBooking(id);
  }
}
