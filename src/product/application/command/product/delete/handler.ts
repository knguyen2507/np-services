import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogLevel } from '@prisma/client';
import { CloudinaryService } from 'libs/cloudinary/cloudinary.service';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { DeleteProduct } from '.';
import { ProductRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(DeleteProduct)
export class DeleteProductHandler implements ICommandHandler<DeleteProduct, void> {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly util: UtilityImplement,
  ) {}
  @Inject()
  private readonly product: ProductRepositoryImplement;

  async execute(command: DeleteProduct): Promise<void> {
    const ids = command.data.ids;
    const products = await this.product.getByIds(ids);
    try {
      for (const product of products) {
        for (const image of product.images) {
          const arr = image.url.split('/');
          const public_id = arr[arr.length - 1].split('.')[0];
          // id, messageId, [cloudinary, delete, data: image.url]
          this.cloudinaryService.deleteFile(public_id);
        }
      }
    } catch (error) {
      const log = {
        id: this.util.generateId(),
        messageId: command.messageId,
        level: LogLevel.ERROR,
        timeStamp: moment().toDate(),
        eventName: `delete product`,
        message: error,
        data: command.data,
      };
      await this.util.writeLog(log);
      throw new HttpException('Error Server!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.product.remove(ids);
  }
}
