import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Videos, VideosSchema } from './schema/videos.schema';
import { VideosController } from './videos.controller';
import { VideoService } from './videos.service';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Videos.name,
        schema: VideosSchema,
      },
    ]),
  ],
  controllers: [VideosController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideosModule {}
