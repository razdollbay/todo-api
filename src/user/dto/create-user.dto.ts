import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDTO {
    @IsEmail({}, { message: 'Invalid email format' })
    @ApiProperty({
        description: 'The email of the user',
    })
    email: string;

    @IsString({ message: 'Username must be a string' })
    @MaxLength(50, { message: 'Username is too long' })
    @MinLength(3, { message: 'Username is too short' })
    @ApiProperty({
        description: 'The username of the user',
        maxLength: 50,
        minLength: 3,
    })
    username: string;

    @MaxLength(20, { message: 'Password is too long' })
    @MinLength(6, { message: 'Password is too short' })
    @ApiProperty({
        description: 'The password of the user',
        maxLength: 20,
        minLength: 6,
    })
    password: string;
}
