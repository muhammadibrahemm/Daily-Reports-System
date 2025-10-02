import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './schemas/report.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Report.name, schema: ReportSchema}, 
        { name: User.name, schema: UserSchema }
      ]),
    ],
  controllers: [ReportsController],
  providers: [ReportsService],
  
})
export class ReportsModule {}
