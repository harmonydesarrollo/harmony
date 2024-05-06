import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesDTO } from './dto/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  getAll() {
    return this.employeeService.getAll();
  }

  @Post()
  create(@Body() employees: EmployeesDTO) {
    return this.employeeService.create(employees);
  }

  @Patch(':id')
  async updateEmployee(@Param('id') id: string, @Body() updatedEmployeeData: Partial<EmployeesDTO>) {
    return this.employeeService.update(id, updatedEmployeeData);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
