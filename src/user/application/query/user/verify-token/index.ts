import { UserInterface } from '../../../../../../libs/utility/interface/user.interface';
import { BaseQuery } from '../../base';

export class VerifyAccessToken extends BaseQuery {
  data: {
    accessToken: string;
    user: UserInterface;
  };

  constructor(data: VerifyAccessToken) {
    super(data);
  }
}
