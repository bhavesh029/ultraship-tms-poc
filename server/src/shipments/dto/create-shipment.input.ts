import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateShipmentInput {
  @Field()
  @IsNotEmpty()
  origin: string;

  @Field()
  @IsNotEmpty()
  destination: string;

  @Field()
  @IsNotEmpty()
  status: string; // You could make this an Enum later

  @Field({ nullable: true })
  @IsOptional()
  estimatedDelivery?: Date;
}