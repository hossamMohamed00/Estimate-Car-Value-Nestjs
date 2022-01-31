import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number; //* Longitude

  @Column()
  lat: number; //* Latitude

  @Column()
  mileage: number;

  //? Setup relationship with User entity
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
