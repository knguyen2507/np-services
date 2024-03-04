import { BaseQuery } from '../../base';

export class FindProductByCategory extends BaseQuery {
  data: {
    categoryCode: string;
    offset: number;
    limit: number;
  };

  constructor(data: FindProductByCategory) {
    super(data);
  }
}
