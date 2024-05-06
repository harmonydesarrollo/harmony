import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partners, PartnersDocument } from './schema/partners.schema';
import { PartnersDTO } from './dto/partners.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partners.name)
    private partnerModule: Model<PartnersDocument>
  ) {}

  async getAll() {
    // console.log('consulta!!!');
    return await this.partnerModule.find().exec();
  }

  async create(partners: PartnersDTO) {
    try {
      const created_partner = await this.partnerModule.create(partners);

      return [
        {
          status: 200,
          message: 'success',
          items: created_partner,
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
  async update(id: string, updatedPartnerData: Partial<PartnersDTO>) {
    try {
      const updatedPartner = await this.partnerModule.findByIdAndUpdate(id, updatedPartnerData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedPartner,
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
      const deletedPartner = await this.partnerModule.findByIdAndDelete(id);

      if (!deletedPartner) {
        status = 404;
        message = 'Partner with ID ${id} not found';
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
