import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [
    // 1. Config Module (for .env later)
    ConfigModule.forRoot({ isGlobal: true }),
    ShipmentsModule,

    // 2. Database Connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Use 'db' if running nest inside docker, 'localhost' if running nest on host
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'ultraship_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Set to false in production
    }),

    // 3. GraphQL Setup (Code-First)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable playground for testing
    }),
  ],
})
export class AppModule {}