import { BaseQuery } from '../../base';

export class FindBrandByCode extends BaseQuery {
  data: {
    readonly code: string;
  };

  constructor(data: FindBrandByCode) {
    super(data);
  }
}
