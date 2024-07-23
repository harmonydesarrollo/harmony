import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchesDTO } from './dto/branches.dto';
import { BranchesService } from './branches.service';

@Controller('branches')
export class BranchesController {
  constructor(private branchService: BranchesService) {}

  @Get()
  getAll() {
    return this.branchService.getAll();
  }

  @Get(':branchId')
  getAllFromLocation(@Param('branchId') branchId: string) {
    return this.branchService.getAll();
  }
  @Post()
  create(@Body() branches: BranchesDTO) {
    return this.branchService.create(branches);
  }

  @Patch(':id')
  async updateBranch(@Param('id') id: string, @Body() updatedBranchData: Partial<BranchesDTO>) {
    return this.branchService.update(id, updatedBranchData);
  }

  @Delete(':id')
  async deleteBranch(@Param('id') id: string) {
    return this.branchService.delete(id);
  }
}
