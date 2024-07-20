// // users/users.service.ts

// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Auth, AuthDocument } from './schema/auth.schema';
// import { CreateAuthDto } from './dto/auth.dto';


// @Injectable()
// export class AuthService {
//   constructor(@InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>) {}

//   async create(createAuthDto: CreateAuthDto): Promise<Auth> {
//     const createdAuth = new this.authModel(createAuthDto);
//     return createdAuth.save();
//   }

//   async findByUsername(username: string): Promise<Auth | undefined> {
//     return this.authModel.findOne({ username }).exec();
//   }

//   async findById(id: string): Promise<Auth | undefined> {
//     return this.authModel.findById(id).exec();
//   }

//   async validateUser(username: string, password: string): Promise<Auth | null> {
//     const user = await this.findByUsername(username);
//     if (!user) {
//       return null;
//     }
//     const isPasswordValid = await user.comparePassword(password);
//     return isPasswordValid ? user : null;
//   }
// }
