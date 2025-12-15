import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 1. Seed Default Users on Startup
  async onModuleInit() {
    const adminExists = await this.findOne('admin');
    if (!adminExists) {
      await this.create('admin', 'admin123', 'ADMIN');
      console.log('✅ Default Admin User Created');
    }

    const staffExists = await this.findOne('staff');
    if (!staffExists) {
      await this.create('staff', 'staff123', 'EMPLOYEE');
      console.log('✅ Default Staff User Created');
    }
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(username: string, pass: string, role: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = this.usersRepository.create({ username, password: hashedPassword, role });
    return this.usersRepository.save(user);
  }
}