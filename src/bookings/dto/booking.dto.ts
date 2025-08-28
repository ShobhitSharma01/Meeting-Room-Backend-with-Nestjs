import { IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingDto {
  @IsUUID()
  room_id: string;

  @IsUUID()
  employee_id: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;
}