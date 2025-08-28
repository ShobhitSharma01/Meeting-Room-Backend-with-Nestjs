// // import { DataSource } from 'typeorm';
// // export const AppDataSource = new DataSource({
// //   type: 'postgres',
// //   host: 'localhost',
// //   port: 5432,
// //   username: 'postgres',
// //   password: 'password',
// //   database: 'nestdb',
// //   entities: ['dist/**/*.entity{.ts,.js}'],
// //   migrations: ['dist/migrations/*{.ts,.js}'],
// //   synchronize: false,
// // });

// import { DataSource } from 'typeorm';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password',
//   database: 'nestdb',
//   entities: ['src/**/*.entity{.ts,.js}'],
//   migrations: ['src/migrations/*{.ts,.js}'],
//   synchronize: false,
// });

import { DataSource } from 'typeorm';
import { Booking } from './bookings/entities/booking.entity';
import { Employee } from './employees/entities/entity';
import { Room } from './room/entities/room.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestdb',
  entities: [Booking,Room,Employee],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});
