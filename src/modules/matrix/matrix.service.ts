import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Matrixs, MatrixsDocument } from './schema/matrix.schema';
import { MatrixDTO } from './dto/matrix.dto';

@Injectable()
export class MatrixService {
  constructor(
    @InjectModel(Matrixs.name)
    private matrixModule: Model<MatrixsDocument>
  ) {}

  async getAll() {
    return await this.matrixModule.find().exec();
  }
  async getByIdBranch(auxIdBranch: string) {
    const idBranch = new mongoose.Types.ObjectId(auxIdBranch);

    return await this.matrixModule.find({ idBranch: idBranch }).exec();
  }
  async create(matrixs: MatrixDTO) {
    try {
      const created_matrix = await this.matrixModule.create(matrixs);

      return [
        {
          status: 200,
          message: 'success',
          items: created_matrix,
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
  async update(id: string, updatedMatrixData: Partial<MatrixDTO>) {
    try {
      const updatedReview = await this.matrixModule.findByIdAndUpdate(id, updatedMatrixData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedReview,
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
      const deletedMatrix = await this.matrixModule.findByIdAndDelete(id);

      if (!deletedMatrix) {
        status = 404;
        message = 'Review with ID ${id} not found';
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
