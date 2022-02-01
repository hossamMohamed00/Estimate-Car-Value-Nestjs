import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from './../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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
  async changeReportApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('Report not found ❌');
    }

    report.approved = approved;

    return this.repo.save(report);
  }

  async approveAllReports() {
    const reports = await this.repo.find({ where: { approved: false } });

    reports.forEach((report) => (report.approved = true));

    return this.repo.save(reports);
  }

  /**
   * Get an estimate for var value based on existing reports data.
   * @param {
   *     make,
   *     model,
   *     lat,
   *     lng,
   *     year,
   *     mileage
   *   }
   * @returns Estimate Price
   */
  async createEstimate({
    make,
    model,
    lat,
    lng,
    year,
    mileage
  }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  /**
   * Gets all reports based on approval status.
   * @returns list of un approved reports
   */
  async getReportsByApprovalStatus(approved: boolean) {
    return this.repo.find({ where: { approved } });
  }
}
