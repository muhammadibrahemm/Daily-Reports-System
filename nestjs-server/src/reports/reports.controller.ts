import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}


  @UseGuards(AuthGuard)
  @Get('can-create')
  async canCreate(@Request() req){
    const userId = req.user.sub;
    const res = await this.reportsService.canCreate(userId);
    console.log("res:",res);
    return res;
    
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Request() req, @Body() createReportDto: CreateReportDto) {
    const userId = req.user.sub;
    console.log("user id:",userId);
    const res = await this.reportsService.create(createReportDto,userId);
    return res;
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findAll(@Request() req) {

    const userId = req.user.sub;
    console.log("user Id in get req:", userId);
    
    // Pass userId to service
    return this.reportsService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('edit/:id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    const res = await this.reportsService.update(id, updateReportDto);
    return res;
  }
}
