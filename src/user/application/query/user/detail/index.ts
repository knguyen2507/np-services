import { BaseQuery } from '../../base';

export class FindUserById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindUserById) {
    super(data);
  }
}
