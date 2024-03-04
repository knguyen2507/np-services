import { BaseQuery } from '../../base';

export class FindCategoryById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindCategoryById) {
    super(data);
  }
}
