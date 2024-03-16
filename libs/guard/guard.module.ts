import { Global, Module } from '@nestjs/common';
import { UtilityModule } from '../utility/utility.module';

@Global()
@Module({
  imports: [UtilityModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class GuardModule {}
