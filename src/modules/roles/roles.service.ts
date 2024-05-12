import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from './schema/roles.schema';
import { RolesDTO } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name)
    private rolModule: Model<RolesDocument>
  ) {}

  async getAll() {
    return await this.rolModule.find().exec();
  }

  async create(roles: RolesDTO) {
    try {
      const created_roles = await this.rolModule.create(roles);

      return [
        {
          status: 200,
          message: 'success',
          items: created_roles,
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
  async update(id: string, updatedRolData: Partial<RolesDTO>) {
    try {
      const updatedRol = await this.rolModule.findByIdAndUpdate(id, updatedRolData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedRol,
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
      const deletedRol = await this.rolModule.findByIdAndDelete(id);

      if (!deletedRol) {
        status = 404;
        message = 'Rol with ID ${id} not found';
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
