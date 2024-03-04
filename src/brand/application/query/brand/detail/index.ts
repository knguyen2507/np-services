import { BaseQuery } from '../../base';

export class FindBrandById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindBrandById) {
    super(data);
  }
}
