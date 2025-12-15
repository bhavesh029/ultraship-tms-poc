import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@ArgsType()
export class ShipmentsArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number = 0;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  take: number = 10;

  @Field({ nullable: true })
  @IsOptional()
  status?: string; // Optional filter: e.g., "IN_TRANSIT"
}