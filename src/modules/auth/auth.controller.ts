// // auth/auth.controller.ts

// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/auth.dto';


// @Controller('auths')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Body() createAuthDto: CreateAuthDto) {
//     // return this.authService.register(createAuthDto);
//   }

//   @Post('login')
//   async login(@Body('username') username: string, @Body('password') password: string) {
//     return this.authService.login(username, password);
//   }
// }
