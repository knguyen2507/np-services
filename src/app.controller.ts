import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { pathPrefixTime } from 'libs/utility/const/path.prefix';
import moment from 'moment';

@ApiTags(pathPrefixTime.swagger)
@Controller(pathPrefixTime.controller)
@ApiBearerAuth()
export class AppController {
  @Get(pathPrefixTime.getTimeServer)
  GetTimeServer(): number {
    return moment().unix();
  }
}
