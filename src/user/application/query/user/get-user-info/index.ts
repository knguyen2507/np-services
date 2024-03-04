import { BaseQuery } from '../../base';

export class GetUserInfo extends BaseQuery {
  data: {
    id: string;
  };

  constructor(data: GetUserInfo) {
    super(data);
  }
}
