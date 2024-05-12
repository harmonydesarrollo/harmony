import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { UsersDTO } from './dto/users.dto';
import { Specialties, SpecialtiesDocument } from '../specialties/schema/specialties.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private userModule: Model<UsersDocument>,
    @InjectModel(Specialties.name)
    private specialtyModule: Model<SpecialtiesDocument>
  ) {}

  async getByIdBranch(auxIdBranch: string) {
    try {
      const idBranch = new mongoose.Types.ObjectId(auxIdBranch);

      // Obtener todos los usuarios
      const users = await this.userModule.find({ idBranch: idBranch }).exec();

      // Crear un arreglo para almacenar los datos de los usuarios junto con el nombre de la especialidad
      const userDataWithSpecialty = [];

      // Iterar sobre cada usuario
      for (const user of users) {
        // Encontrar la especialidad correspondiente al idSpecialty del usuario actual
        const specialty = await this.specialtyModule.findOne({ _id: user.idSpecialty });

        // Si se encuentra la especialidad, agregar los datos del usuario junto con el nombre de la especialidad al arreglo userDataWithSpecialty
        if (specialty) {
          userDataWithSpecialty.push({
            user: user,
            specialtyName: specialty.name,
          });
        }
      }

      // Retornar los datos de los usuarios junto con el nombre de la especialidad
      return userDataWithSpecialty;
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir
      console.error('Error al obtener los datos de los usuarios:', error);
      throw error;
    }
  }
  async getAll() {
    try {
      // Obtener todos los usuarios
      const users = await this.userModule.find().exec();

      // Crear un arreglo para almacenar los datos de los usuarios junto con el nombre de la especialidad
      const userDataWithSpecialty = [];

      // Iterar sobre cada usuario
      for (const user of users) {
        // Encontrar la especialidad correspondiente al idSpecialty del usuario actual
        const specialty = await this.specialtyModule.findOne({ _id: user.idSpecialty });

        // Si se encuentra la especialidad, agregar los datos del usuario junto con el nombre de la especialidad al arreglo userDataWithSpecialty
        if (specialty) {
          userDataWithSpecialty.push({
            user: user,
            specialtyName: specialty.name,
          });
        }
      }

      // Retornar los datos de los usuarios junto con el nombre de la especialidad
      return userDataWithSpecialty;
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir
      console.error('Error al obtener los datos de los usuarios:', error);
      throw error;
    }
  }

  async create(users: UsersDTO) {
    try {
      const created_users = await this.userModule.create(users);

      return [
        {
          status: 200,
          message: 'success',
          items: created_users,
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
  async update(id: string, updatedUserData: Partial<UsersDTO>) {
    try {
      const updatedUser = await this.userModule.findByIdAndUpdate(id, updatedUserData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedUser,
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
      const deletedUser = await this.userModule.findByIdAndDelete(id);

      if (!deletedUser) {
        status = 404;
        message = 'User with ID ${id} not found';
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
