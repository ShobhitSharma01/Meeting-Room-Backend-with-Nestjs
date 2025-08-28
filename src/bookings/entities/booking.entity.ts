import { Employee } from '../../employees/entities/entity';
import { Room } from '../../room/entities/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (employee) => employee.bookings, { eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Room, (room) => room.bookings, { eager: true })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
