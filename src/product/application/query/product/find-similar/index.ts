import { BaseQuery } from '../../base';

export class FindProductSimilar extends BaseQuery {
  data: {
    code: string;
  };

  constructor(data: FindProductSimilar) {
    super(data);
  }
}
