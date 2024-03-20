import { BaseQuery } from '../../base';

export class FindProductByIds extends BaseQuery {
  data: {
    ids: string | string[];
  };

  constructor(data: FindProductByIds) {
    super(data);
  }
}
