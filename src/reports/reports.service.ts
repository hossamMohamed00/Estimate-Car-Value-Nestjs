import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from './../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>
  ) {}

  /**
   * Creates new report
   * @param reportDto - Report data
   * @returns report instance
   */
  async create(reportDto: CreateReportDto, user: User) {
    const report = await this.repo.create(reportDto);

    //? Assign user to report
    report.user = user;

    return this.repo.save(report);
  }
}
