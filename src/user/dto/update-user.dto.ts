import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateUserDTO {
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @ApiProperty({
        description: 'The email of the user',
        required: false,
    })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Username must be a string' })
    @MaxLength(50, { message: 'Username is too long' })
    @MinLength(3, { message: 'Username is too short' })
    @ApiProperty({
        description: 'The username of the user',
        maxLength: 50,
        minLength: 3,
        required: false,
    })
    username?: string;

    @IsOptional()
    @MaxLength(20, { message: 'Password is too long' })
    @MinLength(6, { message: 'Password is too short' })
    @ApiProperty({
        description: 'The password of the user',
        maxLength: 20,
        minLength: 6,
        required: false,
    })
    password?: string;
}
