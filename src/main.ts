import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app/app.module'
import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(3000)
}

bootstrap()
