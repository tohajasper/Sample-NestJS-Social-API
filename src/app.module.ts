import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfilesController } from './profiles/profiles.controller';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule,
    ProfilesModule,
    AuthModule,
  ], 
  // controllers: [UsersController, ProfilesController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
