import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Matrixs, MatrixSchema } from './schema/matrix.schema';
import { MatrixsController } from './matrix.controller';
import { MatrixService } from './matrix.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Matrixs.name,
        schema: MatrixSchema,
      },
    ]),
  ],
  controllers: [MatrixsController],
  providers: [MatrixService],
  exports: [MatrixService],
})
export class MatrixsModule {}
