import { Injectable, NotFoundException } from '@nestjs/common';
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
   * @param user - User who create the report
   * @returns report instance
   */
  async create(reportDto: CreateReportDto, user: User) {
    const report = await this.repo.create(reportDto);

    //? Assign user to report
    report.user = user;

    return this.repo.save(report);
  }

  /**
   * Change report's approval status
   * @param id - Report id
   * @param body - Contains the approved property
   * @returns updated report instance
   */
  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('Report not found ❌');
    }

    report.approved = approved;

    return this.repo.save(report);
  }
}
