import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

// Modules
import { ShipmentsModule } from './shipments/shipments.module';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // <--- READ FROM CLOUD
      host: process.env.DB_HOST || 'localhost', // Fallback for local
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'ultraship_db',
      autoLoadEntities: true,
      synchronize: true, // Safe for POC, bad for real prod (but keep true for this test)
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // <--- REQUIRED FOR NEON/RENDER
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }), // Critical: Pass request to context for Headers
    }),
    ShipmentsModule,
    // Register JWT globally for simplicity
    JwtModule.register({
      global: true,
      secret: 'secretKey123', 
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]), // Register User Repo
  ],
  providers: [UsersService, AuthService, AuthResolver, RolesGuard],
})
export class AppModule {}