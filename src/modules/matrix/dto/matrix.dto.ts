import { ObjectId } from 'mongoose';

export class MatrixDTO {
  img?: string;
  title: string;
  description: string;
  idBranch?: ObjectId;
  fkBranchId?: ObjectId;
}
