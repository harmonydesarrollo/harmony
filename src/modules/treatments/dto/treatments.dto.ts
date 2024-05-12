import { ObjectId } from "mongoose";

export class TreatmentsDTO {
  img?: string;
  title: string;
  description: string;
  idBranch?: ObjectId;
}
