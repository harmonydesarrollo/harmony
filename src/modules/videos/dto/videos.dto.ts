import { ObjectId } from 'mongoose';

export class VideosDTO {
  title: string;
  description: string;
  urlVideo: string;
  fkBranchId?: ObjectId;
  other?: string;
}
