import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URL as string),
    ReportsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
