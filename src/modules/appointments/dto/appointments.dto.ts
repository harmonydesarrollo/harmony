import { ObjectId } from 'mongoose';
export class AppointmentsDTO {
  fullName: string;     // jorge montiel salguero
  telephone: string;    // 7711129510
  idService?: ObjectId; // 662b108dd25ce70194ea5974
  date: Date;         // 1 de julio
  hour:string;          // 4:30 pm
  status: string;       // pagado - pendiente de pago - cancelado - reagendado - cerrado
  }
  

  
