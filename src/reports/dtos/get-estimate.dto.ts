import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number; //* Longitude

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number; //* Latitude

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
