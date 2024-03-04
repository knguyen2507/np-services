import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import jimp from 'jimp';
import { CloudinaryService } from 'libs/cloudinary/cloudinary.service';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { CreateBrand } from '.';
import { BrandFactory } from '../../../../infrastructure/factory/brand';
import { BrandRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateBrand)
export class CreateBrandHandler implements ICommandHandler<CreateBrand, void> {
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Inject()
  private readonly factory: BrandFactory;
  @Inject()
  private readonly Brand: BrandRepositoryImplement;

  async execute(command: CreateBrand): Promise<void> {
    const id = this.util.generateId();
    const { name, thumbnailLink, brandCode, user } = command.data;
    const created = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };

    const file = await jimp.read(thumbnailLink.buffer);
    file.resize(200, 200);
    file.getBuffer(jimp.MIME_PNG, (err, buffer) => {
      thumbnailLink.buffer = buffer;
    });

    const uploaded = await this.cloudinaryService.uploadFile(thumbnailLink);

    const model = await this.factory.createBrandModel({
      name,
      thumbnailLink: uploaded.url,
      brandCode,
      id,
      created,
      updated: [],
    });

    await this.Brand.save(model);
  }
}
