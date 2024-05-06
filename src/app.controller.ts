import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

}
