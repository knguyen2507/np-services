import { BaseQuery } from '../../base';

export class FindProductByCode extends BaseQuery {
  data: {
    readonly productCode: string;
  };

  constructor(data: FindProductByCode) {
    super(data);
  }
}
