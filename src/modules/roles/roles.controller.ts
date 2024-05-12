import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesDTO } from './dto/roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private RolService: RolesService) {}

  @Get()
  getAll() {
    return this.RolService.getAll();
  }

  @Post()
  create(@Body() roles: RolesDTO) {
    return this.RolService.create(roles);
  }

  @Patch(':id')
  async updateRol(@Param('id') id: string, @Body() updatedRolData: Partial<RolesDTO>) {
    return this.RolService.update(id, updatedRolData);
  }

  @Delete(':id')
  async deleteRol(@Param('id') id: string) {
    return this.RolService.delete(id);
  }
}
