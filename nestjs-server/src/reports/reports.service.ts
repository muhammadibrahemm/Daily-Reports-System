import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './schemas/report.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ReportsService {

  constructor(
    @InjectModel(Report.name) private reportModel: Model<Report>,
    @InjectModel(User.name) private userModel: Model<User>
  ){}

  /**
   * 1. can create report user can only create one report per day
   *    checking it
   */

  async canCreate(userId: string){
    try {

      const latestReport = await this.reportModel
      .findOne({ user: userId })
      .sort({ createdAt: -1 })

      if(!latestReport) {
        return { 
          success: true, 
          canCreate: true, 
          message: "You can create your first report." 
        };
      }

      const now = new Date();
      const lastReportDate = new Date(latestReport.createdAt!);
      const diffInMs = now.getTime() - lastReportDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours >= 24) {
        return { 
          success: true, 
          canCreate: true, 
          message: "You can create a new report today." 
        };

      } else {
        return { 
          success: false, 
          canCreate: false, 
          message: "You already created a report in the last 24 hours." };
      }

    } catch (error) {
      return { 
        success: false, 
        canCreate: false, 
        message: "Error checking report status", 
        error: error.message 
      };
    }
  }

  /**
   * 2. creating the report finally one report per day
   */
  async create(createReportDto: CreateReportDto, userId: string) {
    console.log("services create report dto: ", createReportDto);
  
    try {
      const report = await this.reportModel.create({
        date: createReportDto.date,
        task: createReportDto.task,
        startTime: createReportDto.startTime,
        endTime: createReportDto.endTime,
        user: userId,  
      });

      return {
        success: true,
        message: "Report created successfully",
        data: report,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create report",
        error: error?.message,
      };
    }
  }
  

  async findAll(userId: string) {
    try {
      const user = await this.userModel.findById(userId).exec();
  
      if (!user) {
        return { success: false, message: 'User not found' };
      }
  
      if (user.role === 'admin') {
        // Admin 
        const reports = await this.reportModel
          .find()
          .populate('user', 'name email');

          console.log("reports:",reports)
  
        return { success: true, data: reports };
      } else {

        // Normal user
        const reports = await this.reportModel
          .find({ user: userId })

        return { success: true, data: reports };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching reports',
        error: error.message,
      };
    }
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    console.log("Update DTO:", updateReportDto);
    console.log("Report ID:", id);

    try {

      const updatedReport = await this.reportModel.findByIdAndUpdate(
        id,
        updateReportDto,
        { new: true } 
      );

      if (!updatedReport) {
        console.log(`Report with ID ${id} not found`);

        return { 
          success: false, 
          message: `Report with ID ${id} not found` 
        };
        
      }

      console.log("Updated Report:", updatedReport);

      return {
        success: true,
        message: "Report updated successfully",
        data: updatedReport,
      };
      
    } catch (error) {

      console.error("Error updating report:", error.message);

      return { 
        success: false, 
        message: "Failed to update report", 
        error: error.message 
      };

    }

  }

}
