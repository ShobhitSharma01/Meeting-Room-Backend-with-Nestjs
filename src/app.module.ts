import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './room/room.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: false,
    }),
    EmployeesModule,
    AuthModule,
    BookingsModule,
    RoomsModule,
  ],
})
export class AppModule {}
