import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class BaseFactory {
  protected createModel<E, P>(entity: ClassConstructor<E>, plain: P): E {
    return plainToInstance(entity, plain, {
      excludeExtraneousValues: true,
    }) as E;
  }

  protected createModels<E, P>(entity: ClassConstructor<E>, plains: P[]): E[] {
    return plainToInstance(entity, plains, { excludeExtraneousValues: true });
  }
}
