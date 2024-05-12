import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Services, ServicesDocument } from './schema/service.schema';
import { ServicesDTO } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Services.name)
    private serviceModule: Model<ServicesDocument>
  ) {}

  async getAll() {
    return await this.serviceModule.find().exec();
  }
  async getByIdBranch(auxIdBranch: string) {
    const idBranch = new mongoose.Types.ObjectId(auxIdBranch);

    return await this.serviceModule.find({ idBranch: idBranch }).exec();
  }
  async create(services: ServicesDTO) {
    try {
      const created_service = await this.serviceModule.create(services);

      return [
        {
          status: 200,
          message: 'success',
          items: created_service,
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
  async update(id: string, updatedServiceData: Partial<ServicesDTO>) {
    try {
      const updatedReview = await this.serviceModule.findByIdAndUpdate(id, updatedServiceData, { new: true });
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
      const deletedService = await this.serviceModule.findByIdAndDelete(id);

      if (!deletedService) {
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
