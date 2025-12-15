import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.entity';
import { ShipmentsArgs } from './dto/shipments.args';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Query(() => [Shipment], { name: 'shipments' })
  async getShipments(@Args() args: ShipmentsArgs) {
    return this.shipmentService.findAll(args);
  }

  // NEW: Real Mutation
  @Mutation(() => Shipment)
  async createShipment(@Args('createShipmentInput') input: CreateShipmentInput) {
    return this.shipmentService.create(input);
  }

  @Mutation(() => Shipment)
  async updateShipment(@Args('updateShipmentInput') input: UpdateShipmentInput) {
    return this.shipmentService.update(input.id, input);
  }
}