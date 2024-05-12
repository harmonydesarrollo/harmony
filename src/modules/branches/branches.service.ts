import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Specialties, SpecialtiesDocument } from '../specialties/schema/specialties.schema';
import { Branches, BranchesDocument } from './schema/branches.schema';
import { BranchesDTO } from './dto/branches.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branches.name)
    private branchModule: Model<BranchesDocument>
  ) {}

  async getAll() {
    try {
      // Obtener todos los usuarios
      return await this.branchModule.find().exec();
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir
      console.error('Error al obtener los datos de los usuarios:', error);
      throw error;
    }
  }

  async create(branch: BranchesDTO) {
    try {
      const created_branches = await this.branchModule.create(branch);

      return [
        {
          status: 200,
          message: 'success',
          items: created_branches,
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
  async update(id: string, updatedBranchData: Partial<BranchesDTO>) {
    try {
      const updatedBranch = await this.branchModule.findByIdAndUpdate(id, updatedBranchData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedBranch,
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
      const deletedBranch = await this.branchModule.findByIdAndDelete(id);

      if (!deletedBranch) {
        status = 404;
        message = 'Branch with ID ${id} not found';
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
