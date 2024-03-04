import { BaseQuery } from '../../base';

export class FindProductById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindProductById) {
    super(data);
  }
}
