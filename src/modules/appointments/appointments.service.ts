import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointments, AppointmentsDocument } from './schema/appointments.schema';
import { AppointmentsDTO } from './dto/appointments.dto';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointments.name)
    private appointmentModule: Model<AppointmentsDocument>
  ) {}

  async getAll() {
    return await this.appointmentModule.find().exec();
  }
   convertirFecha(fechaISO) {
    // Crear un objeto de fecha a partir de la cadena ISO 8601
    const fecha = new Date(fechaISO);

    // Obtener día, mes y año
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
    const año = fecha.getUTCFullYear();

    // Formatear para obtener DD/MM/YYYY
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

    return fechaFormateada;
}

 convertDate(inputDate) {
  // Paso 1: Parsear la fecha de entrada en un objeto Date
  const input = new Date(inputDate);

  // Paso 2: Crear una nueva fecha con el desplazamiento necesario
  const adjustedDate = new Date(
    input.getFullYear(),
    input.getMonth() - 1,
    input.getDate()
  );

  // Paso 3: Formatear la fecha en el formato 'YYYY-MM-DD'
  const formattedDate = adjustedDate.toISOString().split('T')[0];

  return formattedDate;
}

async getAllAppointmentsWithServices() {
  try {
    ;
    const appointmentsWithServices = await this.appointmentModule.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: 'idService',
          foreignField: '_id',
          as: 'serviceInfo'
        }
      },
      {
        $unwind: '$serviceInfo'
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          telephone: 1,
          date: {
            $dateToString: {
              format: '%Y-%m-%d', // Formato de fecha deseado
              date: '$date' // Suponiendo que 'date' es el nombre del campo de fecha en tus datos
            }
          },
          hour: 1,
          status: 1,
          service: '$serviceInfo.title',
          idService: '$serviceInfo._id',
        }
      }
    ]).exec();

    return appointmentsWithServices;
  } catch (error) {
    return [
      {
        status: 500,
        message: 'Error: ' + error.message,
        items: [],
      },
    ];
  }
}
  // async getAllAppointmentsWithServices() {
  //   try {
  //     const appointmentsWithServices = await this.appointmentModule.aggregate([
  //       {
  //         $lookup: {
  //           from: 'services', // Nombre de la colección de servicios en tu base de datos
  //           localField: 'idService',
  //           foreignField: '_id',
  //           as: 'serviceInfo'
  //         }
  //       },
  //       {
  //         $unwind: '$serviceInfo' // Deshacer el array resultante del $lookup
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           fullName: 1,
  //           telephone: 1,
  //           date: 1,
  //           hour: 1,
  //           status: 1,
  //           service: '$serviceInfo.title', // Cambiar para incluir el nombre del servicio como 'service'
  //         }
  //       }
  //     ]).exec();
  
  //     return appointmentsWithServices;
  //   } catch (error) {
  //     return [
  //       {
  //         status: 500,
  //         message: 'Error: ' + error.message,
  //         items: [],
  //       },
  //     ];
  //   }
  // }
  

  async create(appointments: AppointmentsDTO) {
    try {
      const created_appointment = await this.appointmentModule.create(appointments);

      return [
        {
          status: 200,
          message: 'success',
          items: created_appointment,
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
  async update(id: string, updatedAppointmentData: Partial<AppointmentsDTO>) {
    try {
      const updatedAppointment = await this.appointmentModule.findByIdAndUpdate(id, updatedAppointmentData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedAppointment,
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
      const deletedAppointment = await this.appointmentModule.findByIdAndDelete(id);

      if (!deletedAppointment) {
        status = 404;
        message = 'Appointment with ID ${id} not found';
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
