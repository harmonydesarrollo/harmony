import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) {}

  async getAll() {
    return 'Hola mundo dev!!'
  }
}
