import { BaseQuery } from '../../base';

export class FindProductSamePrice extends BaseQuery {
  data: {
    code: string;
  };

  constructor(data: FindProductSamePrice) {
    super(data);
  }
}
