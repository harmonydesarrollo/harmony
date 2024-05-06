import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentSchema, Treatments } from './schema/treatments.schema';
import { TreatmentsController } from './treatments.controller';
import { TreatmentService } from './treatments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Treatments.name,
        schema: TreatmentSchema,
      },
    ]),
  ],
  controllers: [TreatmentsController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentsModule {}
