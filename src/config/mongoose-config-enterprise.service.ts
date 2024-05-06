import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseConfigEnterpriseService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const env_type = this.config.get('NODE_ENV');

    if (env_type === 'LOCAL') {
      return {
        uri: 'mongodb://localhost:27017/enterprise',
      };
    }

    const username = this.config.get('DATABASE_ENTERPRISE_USER');
    const password = this.config.get('DATABASE_ENTERPRISE_PASSWORD');
    const host = this.config.get('DATABASE_ENTERPRISE_HOST');
    const db = this.config.get('DATABASE_ENTERPRISE_NAME');

    const uri = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

    return {
      uri,
      //   useUnifiedTopology: true,
    };
  }
}
