import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll() {
    return this.employeeRepository.find();
  }

  async create(employee: Partial<Employee>) {
    const existing = await this.employeeRepository.findOne({
      where: { email: employee.email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    return this.employeeRepository.save(employee);
  }

  async update(id: number, employee: Partial<Employee>) {
    if (employee.email) {
      const existing = await this.employeeRepository.findOne({
        where: { email: employee.email },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    return this.employeeRepository.update(id, employee);
  }

  delete(id: number) {
    return this.employeeRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.employeeRepository.findOne({ where: { email } });
  }
}
