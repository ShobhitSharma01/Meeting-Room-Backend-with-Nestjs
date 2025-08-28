import { IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDto {
  @IsUUID()
  room_id: string;

  @IsUUID()
  booking_id: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;
}