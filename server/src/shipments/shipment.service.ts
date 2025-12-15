import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentsArgs } from './dto/shipments.args';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

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

  async create(input: CreateShipmentInput): Promise<Shipment> {
     const trackingId = `TRK-${Date.now().toString().slice(-6)}`; 

     const newShipment = this.shipmentRepository.create({
       ...input,
       trackingId,
     });
     
     return this.shipmentRepository.save(newShipment);
  }

  async update(id: string, input: UpdateShipmentInput): Promise<Shipment> {
    // 1. Preload merges the new data into the existing entity
    const shipment = await this.shipmentRepository.preload({
      ...input,
    });

    if (!shipment) {
      throw new Error(`Shipment #${id} not found`);
    }

    return this.shipmentRepository.save(shipment);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.shipmentRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOneBy({ id });
    if (!shipment) {
      throw new Error(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }
}