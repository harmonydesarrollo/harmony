import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VideoService } from './videos.service';
import { VideosDTO } from './dto/videos.dto';



@Controller('videos')
export class VideosController {
  constructor(private videosService: VideoService) {}

  @Get()
  getAll() {
    return this.videosService.getAll();
  }

  @Post()
  create(@Body() videos: VideosDTO) {
    return this.videosService.create(videos);
  }

  @Patch(':id')
  async updateVideo(@Param('id') id: string, @Body() updatedVideoData: Partial<VideosDTO>) {
    return this.videosService.update(id, updatedVideoData);
  }

  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
