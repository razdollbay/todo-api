import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('/')
    @ApiOkResponse({
        isArray: true,
        description: 'List of all users',
    })
    @ApiOperation({ summary: 'Get all users' })
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Return user by id',
    })
    @ApiNotFoundResponse({
        description: 'User not found',
    })
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id);
    }

    @Post('/')
    @ApiOkResponse({
        type: CreateUserDTO,
        description: 'User created successfully',
    })
    async createUser(@Body() dto: CreateUserDTO) {
        return await this.userService.create(dto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'User deleted successfully',
    })
    @ApiNotFoundResponse({
        description: 'User not found',
    })
    async deleteUser(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

    @Patch(':id')
    @ApiOkResponse({
        description: 'User updated successfully',
    })
    @ApiNotFoundResponse({
        description: 'User not found',
    })
    async updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO,
    ) {
        return await this.userService.update(id, dto);
    }
}
