import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
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

@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  /**
   * Create new report.
   * @param body {CreateReportDto} - Report data.
   */
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
