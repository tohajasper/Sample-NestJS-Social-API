import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfilesController } from './profiles/profiles.controller';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/challange-a'),
    UsersModule,
    ProfilesModule,
  ], 
  // controllers: [UsersController, ProfilesController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
