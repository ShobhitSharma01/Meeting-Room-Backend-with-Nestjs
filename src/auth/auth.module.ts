import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeesModule } from '../employees/employees.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    EmployeesModule,
    JwtModule.register({
      secret: 'MY_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
