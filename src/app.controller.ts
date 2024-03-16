import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { pathPrefixTime } from '../libs/utility/const/path.prefix';

@ApiTags(pathPrefixTime.swagger)
@Controller()
@ApiBearerAuth()
export class AppController {
  @Get(pathPrefixTime.getTimeServer)
  GetTimeServer(): number {
    return moment().unix();
  }
}
