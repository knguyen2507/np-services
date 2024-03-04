import { BaseQuery } from '../../base';

export class FindProductByAdmin extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchModel?: string;
  };

  constructor(data: FindProductByAdmin) {
    super(data);
  }
}
