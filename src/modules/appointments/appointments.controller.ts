import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { AppointmentsDTO } from './dto/appointments.dto';


@Controller('appointments')
export class AppointmentController {
  constructor(private AppointmentService: AppointmentService) {}

  @Get()
  getAll() {
    return this.AppointmentService.getAllAppointmentsWithServices();
  }

  @Post()
  create(@Body() appointments: AppointmentsDTO) {
    return this.AppointmentService.create(appointments);
  }

  @Patch(':id')
  async updateAppointment(@Param('id') id: string, @Body() updatedAppointmentData: Partial<AppointmentsDTO>) {
    return this.AppointmentService.update(id, updatedAppointmentData);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.AppointmentService.delete(id);
  }
}
