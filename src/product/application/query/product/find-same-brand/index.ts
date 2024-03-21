import { BaseQuery } from '../../base';

export class FindProductSameBrand extends BaseQuery {
  data: {
    code: string;
  };

  constructor(data: FindProductSameBrand) {
    super(data);
  }
}
