import { Expose, Transform } from 'class-transformer';
/**
 * Report dto that used to serialize the outgoing report data.
 */
export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  lng: number; //* Longitude

  @Expose()
  lat: number; //* Latitude

  @Expose()
  mileage: number;

  /**
   * ? Transform the entire user instance into single property called userId.
   * ? obj --> is a reference to the original report entity
   */

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;
}
