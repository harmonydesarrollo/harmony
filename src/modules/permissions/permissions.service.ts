import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permissions, PermissionsDocument } from './schema/permissions.schema';
import { PermissionsDTO } from './dto/permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions.name)
    private permissionModule: Model<PermissionsDocument>
  ) {}

  async getAll() {
    return await this.permissionModule.find().exec();
  }

  async create(permissions: PermissionsDTO) {
    try {
      const created_permissions = await this.permissionModule.create(permissions);

      return [
        {
          status: 200,
          message: 'success',
          items: created_permissions,
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
  async update(id: string, updatedPermissionData: Partial<PermissionsDTO>) {
    try {
      const updatedPermission = await this.permissionModule.findByIdAndUpdate(id, updatedPermissionData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedPermission,
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
      const deletedPermission = await this.permissionModule.findByIdAndDelete(id);

      if (!deletedPermission) {
        status = 404;
        message = 'Permission with ID ${id} not found';
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
