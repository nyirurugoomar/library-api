import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers
  app.enableCors({
    origin: '*',
    
  })
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 3001; 
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
