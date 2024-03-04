import { BaseQuery } from '../../base';

export class FindProductByBrand extends BaseQuery {
  data: {
    brandCode: string;
    offset: number;
    limit: number;
  };

  constructor(data: FindProductByBrand) {
    super(data);
  }
}
