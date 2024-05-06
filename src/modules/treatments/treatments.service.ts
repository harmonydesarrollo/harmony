import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Treatments, TreatmentsDocument } from './schema/treatments.schema';
import { TreatmentsDTO } from './dto/treatments.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel(Treatments.name)
    private treatmentModule: Model<TreatmentsDocument>
  ) {}

  async getAll() {
    // console.log('consulta!!!');
    return await this.treatmentModule.find().exec();
  }

  async create(treatments: TreatmentsDTO) {
    try {
      const created_treatment = await this.treatmentModule.create(treatments);

      return [
        {
          status: 200,
          message: 'success',
          items: created_treatment,
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
  async update(id: string, updatedTreatmentData: Partial<TreatmentsDTO>) {
    try {
      const updatedTreatment = await this.treatmentModule.findByIdAndUpdate(id, updatedTreatmentData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedTreatment,
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
      const deletedTreatment = await this.treatmentModule.findByIdAndDelete(id);

      if (!deletedTreatment) {
        status = 404;
        message = 'Treatment with ID ${id} not found';
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
