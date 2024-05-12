import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionsDTO } from './dto/permissions.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  @Get()
  getAll() {
    return this.permissionService.getAll();
  }

  @Post()
  create(@Body() permissions: PermissionsDTO) {
    return this.permissionService.create(permissions);
  }

  @Patch(':id')
  async updatePermission(@Param('id') id: string, @Body() updatedPermissionData: Partial<PermissionsDTO>) {
    return this.permissionService.update(id, updatedPermissionData);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }
}
