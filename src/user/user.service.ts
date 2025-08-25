import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { isUUID } from 'class-validator';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    private readonly selectedUserData = {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
    };

    private isUuid(id: string) {
        if (!isUUID(id, '4')) {
            throw new BadRequestException(
                'Invalid ID format',
            );
        }
    }

    async getAllUsers() {
        try {
            return await this.prisma.user.findMany({
                select: this.selectedUserData,
            });
        } catch (error) {
            if (
                error instanceof
                    Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(
                    'No users found',
                );
            }
        }
    }

    async getUserById(id: string) {
        this.isUuid(id);
        try {
            await this.prisma.user.findUnique({
                where: { id },
                select: this.selectedUserData,
            });
        } catch (error) {
            if (
                error instanceof
                    Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(
                    'User not found',
                );
            }
            throw error;
        }
    }

    async create(dto: CreateUserDTO) {
        try {
            return await this.prisma.user.create({
                data: {
                    ...dto,
                    password: await hash(dto.password),
                },
                select: this.selectedUserData,
            });
        } catch (error) {
            if (
                error instanceof
                    Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'User with this email already exists',
                );
            }
        }
    }

    async update(id: string, dto: UpdateUserDTO) {
        this.isUuid(id);
        try {
            await this.prisma.user.update({
                where: { id },
                data: {
                    ...dto,
                    ...(dto.password && {
                        password: await hash(
                            dto.password,
                        ),
                    }),
                },
                select: this.selectedUserData,
            });
        } catch (error) {
            if (
                error instanceof
                    Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(
                    'User not found',
                );
            }
            throw error;
        }
    }

    async delete(id: string) {
        this.isUuid(id);
        try {
            await this.prisma.user.delete({
                where: { id },
                select: this.selectedUserData,
            });

            return true;
        } catch (error) {
            if (
                error instanceof
                    Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(
                    'User not found',
                );
            }
            throw error;
        }
    }
}
