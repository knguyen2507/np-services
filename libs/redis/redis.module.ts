import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { environment } from 'src/environment';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: environment.REDIS_HOST,
          port: environment.REDIS_PORT,
          username: environment.REDIS_USERNAME,
          password: environment.REDIS_PASSWORD,
          no_ready_check: true,
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
