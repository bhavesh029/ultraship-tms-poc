// server/src/shipments/shipment.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  trackingId: string;

  @Column()
  @Field()
  status: string; // e.g., 'IN_TRANSIT', 'DELIVERED'

  @Column()
  @Field()
  origin: string;

  @Column()
  @Field()
  destination: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  estimatedDelivery: Date;
}