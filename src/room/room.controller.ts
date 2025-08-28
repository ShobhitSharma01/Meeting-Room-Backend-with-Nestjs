import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './room.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAllRooms() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  getRoom(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Post()
  addRoom(@Body() room: any) {
    return this.roomsService.create(room);
  }

  @Put(':id')
  updateRoom(@Param('id') id: string, @Body() room: any) {
    return this.roomsService.update(id, room);
  }

  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
