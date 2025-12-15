import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.entity';
import { ShipmentsArgs } from './dto/shipments.args';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard'

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Query(() => [Shipment], { name: 'shipments' })
  // Queries are PUBLIC (Everyone can see)
  async getShipments(@Args() args: ShipmentsArgs) {
    return this.shipmentService.findAll(args);
  }

  // Mutations are PROTECTED (Only Admins)
  @Mutation(() => Shipment)
  @UseGuards(RolesGuard) 
  async createShipment(@Args('createShipmentInput') input: CreateShipmentInput) {
    return this.shipmentService.create(input);
  }

  @Mutation(() => Shipment)
  @UseGuards(RolesGuard) 
  async updateShipment(@Args('updateShipmentInput') input: UpdateShipmentInput) {
    return this.shipmentService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  async deleteShipment(@Args('id') id: string) {
    return this.shipmentService.remove(id);
  }

  @Query(() => Shipment, { name: 'shipment' })
  async getShipment(@Args('id') id: string) {
    return this.shipmentService.findOne(id);
  }
}