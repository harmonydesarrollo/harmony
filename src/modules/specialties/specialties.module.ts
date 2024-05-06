import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialties, SpecialtiesSchema } from './schema/specialties.schema';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specialties.name,
        schema: SpecialtiesSchema,
      },
    ]),
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService],
})
export class SpecialtiesModule {}
