import { CreateShipmentInput } from './create-shipment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShipmentInput extends PartialType(CreateShipmentInput) {
  @Field()
  id: string; // We MUST have the ID to know which one to update
}