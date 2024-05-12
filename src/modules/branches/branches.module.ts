import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialties, SpecialtiesSchema } from '../specialties/schema/specialties.schema';
import { Branches, BranchesSchema } from './schema/branches.schema';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branches.name,
        schema: BranchesSchema,
      },
    ]),
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}
