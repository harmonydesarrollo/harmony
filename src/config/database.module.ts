import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { MongooseConfigEnterpriseService } from './mongoose-config-enterprise.service';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: undefined
    }),
    // MongooseModule.forRootAsync({
    //   useClass: MongooseConfigEnterpriseService,
    //   connectionName: 'enterprise',
    // }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
