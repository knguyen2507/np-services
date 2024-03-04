import { BaseQuery } from '../../base';

export class FindUser extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchModel?: string;
  };

  constructor(data: FindUser) {
    super(data);
  }
}
