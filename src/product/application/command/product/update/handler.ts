import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Images, PIC } from '@prisma/client';
import { CloudinaryService } from 'libs/cloudinary/cloudinary.service';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { UpdateProduct } from '.';
import { ProductRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(UpdateProduct)
export class UpdateProductHandler implements ICommandHandler<UpdateProduct, void> {
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Inject()
  private readonly product: ProductRepositoryImplement;

  async execute(command: UpdateProduct): Promise<void> {
    const { id, main, mainId, files, oldImage, user, ...data } = command.data;
    const model = await this.product.getById(id);
    const update: PIC = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };

    // remove images
    const oldImageInfo = model.images.filter((image) => oldImage.includes(image.id));
    model.images = model.images.filter((image) => !oldImage.includes(image.id));
    for (const image of oldImageInfo) {
      const arr = image.url.split('/');
      const public_id = arr[arr.length - 1].split('.')[0];
      this.cloudinaryService.deleteFile(public_id);
    }

    // change main Image
    if (mainId && mainId !== model.thumbnailLink.id) {
      let mainImageNew: Images;
      for (const image of model.images) {
        if (image.id === model.thumbnailLink.id) {
          image.isMain = false;
        }
        if (image.id === mainId) {
          image.isMain = true;
          mainImageNew = image;
        }
      }
      model.thumbnailLink = mainImageNew;
    }

    // upload images
    for (const image of files) {
      const uploaded = await this.cloudinaryService.uploadFile(image);
      const imageInfo = {
        id: this.util.generateId(),
        name: image.originalname,
        url: uploaded.url,
        isMain: false,
      };

      // new image is main
      if (!mainId && main === imageInfo.name) {
        imageInfo.isMain = true;
        model.thumbnailLink = imageInfo;
      }

      model.images.push(imageInfo);
    }

    model.updated.push(update);
    model.update({ ...data });

    await this.product.update(model);
  }
}
