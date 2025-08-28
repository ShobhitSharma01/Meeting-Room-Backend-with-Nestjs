import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Post()
  addEmployee(@Body() employee: any) {
    return this.employeesService.create(employee);
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string, @Body() employee: any) {
    return this.employeesService.update(Number(id), employee);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.delete(Number(id));
  }
}
