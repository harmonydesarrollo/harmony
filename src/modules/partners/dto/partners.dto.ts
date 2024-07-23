import { ObjectId } from "mongoose";

export class PartnersDTO {
  img?: string;
  title: string;
  description: string;
  fkBranchId?: ObjectId;
}
