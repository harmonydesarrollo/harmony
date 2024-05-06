import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema, Users } from './schema/users.schema';
import { Specialties, SpecialtiesSchema } from '../specialties/schema/specialties.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Specialties.name,
        schema: SpecialtiesSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
