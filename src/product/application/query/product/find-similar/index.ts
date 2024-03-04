import { BaseQuery } from '../../base';

export class FindProductSimilar extends BaseQuery {
  data: {
    id: string;
  };

  constructor(data: FindProductSimilar) {
    super(data);
  }
}
