import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './config/database.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PartnersModule } from './modules/partners/partners.module';

import { S3Module } from './AWS/S3.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TreatmentsModule } from './modules/treatments/treatments.module';
import { UsersModule } from './modules/users/users.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { ServicesModule } from './modules/services/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PartnersModule,
    ReviewsModule,
    TreatmentsModule,
    S3Module,
    UsersModule,
    SpecialtiesModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
