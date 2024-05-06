import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employees } from './schema/employee.schema';
import { EmployeesController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employees.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeesModule {}
