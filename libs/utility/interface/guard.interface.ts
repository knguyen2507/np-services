import { SetMetadata } from '@nestjs/common';

export interface GuardDecoratorParams {
  action: string;
  resource: string;
}

export const GuardDecorator = (params: GuardDecoratorParams | string) => {
  return SetMetadata('data', params);
};
