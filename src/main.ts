import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// import { Zeebe } from './common/zeebe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  // const zeebe = app.get(Zeebe);
  await Promise.all([ 
    /*<%#*/ app.listen(parseInt(process.env.PORT || '3111')), /*_%>*/
    /*<%- `app.listen(parseInt(process.env.PORT || '3001')),` %>*/
    // zeebe.connectZeebe()
  ]);
}
bootstrap();
