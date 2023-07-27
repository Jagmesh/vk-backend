import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallpostsCallbackController } from './routes/wallposts-callback/wallposts-callback.controller';
import { WallpostsCallbackService } from './routes/wallposts-callback/wallposts-callback.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, WallpostsCallbackController],
  providers: [AppService, WallpostsCallbackService],
})
export class AppModule {}
