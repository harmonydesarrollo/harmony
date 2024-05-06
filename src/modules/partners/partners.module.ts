import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema, Partners } from './schema/partners.schema';
import { PartnersController } from './partners.controller';
import { PartnerService } from './partners.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Partners.name,
        schema: PartnerSchema,
      },
    ]),
  ],
  controllers: [PartnersController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnersModule {}
