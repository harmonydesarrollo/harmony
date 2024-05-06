import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialties, SpecialtiesDocument } from './schema/specialties.schema';
import { specialtiesDTO } from './dto/specialties.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialties.name)
    private specialtyModule: Model<SpecialtiesDocument>
  ) {}

  async getAll() {
    return await this.specialtyModule.find().exec();
  }

  async create(specialties: specialtiesDTO) {
    try {
      const created_specialtie = await this.specialtyModule.create(specialties);

      return [
        {
          status: 200,
          message: 'success',
          items: created_specialtie,
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
  async update(id: string, updatedSpecialtyData: Partial<specialtiesDTO>) {
    try {
      const updatedSpecialty = await this.specialtyModule.findByIdAndUpdate(id, updatedSpecialtyData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedSpecialty,
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
      const deletedSpecialty = await this.specialtyModule.findByIdAndDelete(id);

      if (!deletedSpecialty) {
        status = 404;
        message = 'specialty with ID ${id} not found';
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
