import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmployeesService } from '../employees/employees.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const hashedPass = await bcrypt.hash(dto.password, 10);
    return this.employeesService.create({
      ...dto,
      password: hashedPass,
    });
  }

  async login(dto: LoginUserDto) {
    const user = await this.employeesService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('User not found');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
