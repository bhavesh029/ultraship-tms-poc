import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentsArgs } from './dto/shipments.args';
import { CreateShipmentInput } from './dto/create-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async findAll(args: ShipmentsArgs): Promise<Shipment[]> {
    const { skip, take, status } = args;

    // Create a query builder for flexibility
    const query = this.shipmentRepository.createQueryBuilder('shipment');

    // Apply Filter if provided
    if (status) {
      query.where('shipment.status = :status', { status });
    }

    // Apply Pagination
    query.skip(skip).take(take);

    // Sort by most recent first (Standard for dashboards)
    query.orderBy('shipment.id', 'DESC'); 

    return query.getMany();
  }

//   async createDummy() {
//     // ... keep your existing dummy code here ...
//     const shipment = this.shipmentRepository.create({
//       trackingId: `TRK-${Math.floor(Math.random() * 100000)}`, // Random ID for testing
//       status: Math.random() > 0.5 ? 'IN_TRANSIT' : 'DELIVERED',
//       origin: 'New York',
//       destination: 'London',
//       estimatedDelivery: new Date(),
//     });
//     return this.shipmentRepository.save(shipment);
//   }

  async create(input: CreateShipmentInput): Promise<Shipment> {
     const newShipment = this.shipmentRepository.create(input);
     return this.shipmentRepository.save(newShipment);
  }
}