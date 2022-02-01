import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ApiTags } from '@nestjs/swagger';

@Serialize(ReportDto)
@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  /**
   * Get estimate about car based on car details provided
   * @query query - Dto of report
   */
  @Get('/estimate')
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  /**
   * Create new report.
   * @param body {CreateReportDto} - Report data.
   */
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('approve/all')
  @UseGuards(AdminGuard)
  approveAllReports() {
    return this.reportsService.approveAllReports();
  }

  /**
   * Change report approved status
   * @param id - Report id
   * @param body - Report details
   * @returns updated report
   */
  @Patch('approve/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeReportApproval(id, body.approved);
  }

  /**
   * Get list of all un approved reports
   * @query approved - Boolean
   */
  @Get()
  @UseGuards(AdminGuard)
  getReportsByApprovalStatus(
    @Query('approved', ParseBoolPipe) approved: boolean
  ) {
    return this.reportsService.getReportsByApprovalStatus(approved);
  }
}
