import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';

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
  async create(reportDto: CreateReportDto) {
    const report = await this.repo.create(reportDto);

    return this.repo.save(report);
  }
}
