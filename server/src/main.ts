import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. ENABLE CORS (Allow Frontend to talk to Backend)
  app.enableCors({
    origin: 'http://localhost:5173', // Allow your Vite frontend
    credentials: true,
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();