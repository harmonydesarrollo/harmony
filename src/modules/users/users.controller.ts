import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersDTO } from './dto/users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Get(':id')
  getByIdBranch(@Param('id') id: string) {
    console.log({ id });
    return this.userService.getByIdBranch(id);
  }

  @Post()
  create(@Body() users: UsersDTO) {
    return this.userService.create(users);
  }

  @Post('login')
  async login(@Body() body: { username: string, password: string }): Promise<any> {
    const { username, password } = body;
    const user = await this.userService.findByUsernameAndPassword(username, password);

    if (user) {
      return { 
        code:200,
        message: 'Login successful',
        items:[
          user
        ]
      };
    } else {
      return { message: 'Invalid username or password' };
    }
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updatedUserData: Partial<UsersDTO>) {
    return this.userService.update(id, updatedUserData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
