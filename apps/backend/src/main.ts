import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Use helmet to follow general security practices
    app.use(helmet());

    // Enable CORS for client to server requests
    app.enableCors({
        // Allow list of headers allowed to be passed to the server via CORS requests
        allowedHeaders: ['Authorization', 'Content-Type'],
    });

    // Enable endpoint validation across all endpoints, allowing use of `class-validator` in controller dtos
    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            validateCustomDecorators: true,
        }),
    );

    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`🚀 Application is running on http://localhost:${port}`);
}

bootstrap();
