import { BaseQuery } from '../../base';

export class FindCategoryByCode extends BaseQuery {
  data: {
    readonly code: string;
  };

  constructor(data: FindCategoryByCode) {
    super(data);
  }
}
