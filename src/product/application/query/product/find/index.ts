import { BaseQuery } from '../../base';

export class FindProduct extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchName?: string;
  };

  constructor(data: FindProduct) {
    super(data);
  }
}
