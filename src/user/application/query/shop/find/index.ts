import { BaseQuery } from '../../base';

export class FindShop extends BaseQuery {
  data: {
    id: string;
  };

  constructor(data: FindShop) {
    super(data);
  }
}
