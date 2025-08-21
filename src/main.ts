import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app =
        await NestFactory.create<NestExpressApplication>(
            AppModule,
        );

    const config = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(
        config.getOrThrow<number>('APPLICATION_PORT'),
        () =>
            console.log(
                `Application is running on: ${config.getOrThrow<string>('APPLICATION_URL')}`,
            ),
    );
}
bootstrap().catch((e) => console.log(e));
