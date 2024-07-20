import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointments, AppointmentsSchema } from './schema/appointments.schema';
import { AppointmentController } from './appointments.controller';
import { AppointmentService } from './appointments.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointments.name,
        schema: AppointmentsSchema,
      },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentsModule {}
