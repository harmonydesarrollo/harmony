import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema, Services } from './schema/service.schema';
import { ServicesController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Services.name,
        schema: ServiceSchema,
      },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServicesModule {}
