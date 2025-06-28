import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MatrixService } from './matrix.service';
import { MatrixDTO } from './dto/matrix.dto';



@Controller('matrices')
export class MatrixsController {
  constructor(private matrixService: MatrixService) {}

  @Get()
  getAll() {
    return this.matrixService.getAll();
  }
  @Get(':id')
  getByIdBranch(@Param('id') id: string) {
    console.log({ id });
    return this.matrixService.getByIdBranch(id);
  }

  @Post()
  create(@Body() matrixs: MatrixDTO) {
    return this.matrixService.create(matrixs);
  }

  @Patch(':id')
  async updateReview(@Param('id') id: string, @Body() updatedMatrixData: Partial<MatrixDTO>) {
    return this.matrixService.update(id, updatedMatrixData);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.matrixService.delete(id);
  }
}
