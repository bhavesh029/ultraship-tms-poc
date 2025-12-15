import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  // No @Field() here because we never want to expose the password in GraphQL
  password: string; 

  @Column({ default: 'EMPLOYEE' })
  @Field()
  role: string; // 'ADMIN' or 'EMPLOYEE'
}