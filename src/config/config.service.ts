import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { DatabaseConfig } from './interfaces';

export type EnvConfig = {
  [key: string]: string;
};

@Injectable()
export class ConfigService {
  private readonly conf: EnvConfig;

  constructor() {
    const path = '.env';
    this.conf = parse(readFileSync(path));
  }

  get dbConfig(): DatabaseConfig {
    return {
      uri: this.conf.DB_HOST,
    };
  }
}
