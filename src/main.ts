import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Initializes and starts the NestJS application.
 *
 * - Sets up global exception filters and validation pipes.
 * - Configures Swagger for API documentation with custom options.
 * - Enables CORS for the application.
 * - Starts the application on the specified port or defaults to port 3000.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} A promise that resolves when the application has started.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(`Humble Superhero API`)
    .setDescription(`API to manage superheroes`)
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/swagger-json')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      persistAuthorization: true,
      customSiteTitle: `API Docs`,
    },
  });

  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  console.log(
    `Application is running on: localhost:${
      process.env.PORT || 3000
    }. \nSwagger documentation is available at: localhost:${
      process.env.PORT || 3000
    }/swagger`,
  );
}
bootstrap();
