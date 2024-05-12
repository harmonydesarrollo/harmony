import { ObjectId } from 'mongoose';

export class ServicesDTO {
  img?: string;
  title: string;
  description: string;
  idBranch?: ObjectId;
}
