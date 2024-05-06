import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employees, EmployeesDocument } from './schema/employee.schema';
import { EmployeesDTO } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employees.name)
    private employeeModule: Model<EmployeesDocument>
  ) {}

  async getAll() {
    // console.log('consulta!!!');
    return await this.employeeModule.find().exec();
  }

  async create(employees: EmployeesDTO) {
    try {
      const created_employee = await this.employeeModule.create(employees);

      return [
        {
          status: 200,
          message: 'success',
          items: created_employee,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: error.message,
          items: [],
        },
      ];
    }
  }
  async update(id: string, updatedEmployeeData: Partial<EmployeesDTO>) {
    try {
      const updatedEmployee = await this.employeeModule.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedEmployee,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: error.message,
          items: [],
        },
      ];
    }
  }
  async delete(id: string) {
    try {
      let response = [];
      let status, message;
      const deletedEmployee = await this.employeeModule.findByIdAndDelete(id);

      if (!deletedEmployee) {
        status = 404;
        message = 'Employee with ID ${id} not found';
      } else {
        status = 200;
        message = 'success';
      }
      return [
        {
          status,
          message,
        },
      ];
    } catch (error) {
      return [
        {
          status: 500,
          message: 'Error: ' + error.message,
        },
      ];
    }
  }
}
