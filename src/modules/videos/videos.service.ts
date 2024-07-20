import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Videos, VideosDocument } from './schema/videos.schema';
import { VideosDTO } from './dto/videos.dto';


@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Videos.name)
    private videoModule: Model<VideosDocument>
  ) {}

  async getAll() {
    return await this.videoModule.find().exec();
  }

  async create(videos: VideosDTO) {
    try {
      const created_video = await this.videoModule.create(videos);

      return [
        {
          status: 200,
          message: 'success',
          items: created_video,
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
  async update(id: string, updatedVideoData: Partial<VideosDTO>) {
    try {
      const updatedVideo = await this.videoModule.findByIdAndUpdate(id, updatedVideoData, { new: true });
      return [
        {
          status: 200,
          message: 'success',
          items: updatedVideo,
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
      let status, message;
      const deletedVideo = await this.videoModule.findByIdAndDelete(id);

      if (!deletedVideo) {
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
