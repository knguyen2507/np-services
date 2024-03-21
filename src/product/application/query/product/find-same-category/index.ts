import { BaseQuery } from '../../base';

export class FindProductSameCategory extends BaseQuery {
  data: {
    code: string;
  };

  constructor(data: FindProductSameCategory) {
    super(data);
  }
}
