import { ObjectId } from 'mongoose';

export class UsersDTO {
  firstName: string;
  lastName: string;
  middleName: string;
  gender?: string;
  birthday?: string; // cambiar el tipo de dato a date
  fullName: string;
  idSpecialty?: ObjectId;
  idBranch?: ObjectId;
  idRol?: ObjectId;
  photo: string;
  password?: string;
  username?: string;
}
