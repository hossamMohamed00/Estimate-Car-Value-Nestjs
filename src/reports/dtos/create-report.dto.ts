import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @IsLongitude()
  lng: number; //* Longitude

  @IsLatitude()
  lat: number; //* Latitude

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
