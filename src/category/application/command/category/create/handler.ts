import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import jimp from 'jimp';
import { CloudinaryService } from 'libs/cloudinary/cloudinary.service';
import { UtilityImplement } from 'libs/utility/utility.module';
import moment from 'moment';
import { CreateCategory } from '.';
import { CategoryFactory } from '../../../../infrastructure/factory/category';
import { CategoryRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateCategory)
export class CreateCategoryHandler implements ICommandHandler<CreateCategory, void> {
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Inject()
  private readonly factory: CategoryFactory;
  @Inject()
  private readonly category: CategoryRepositoryImplement;

  async execute(command: CreateCategory): Promise<void> {
    const id = this.util.generateId();
    const { name, thumbnailLink, categoryCode, user } = command.data;
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

    const model = await this.factory.createCategoryModel({
      name,
      thumbnailLink: uploaded.url,
      categoryCode,
      id,
      created,
      updated: [],
    });

    await this.category.save(model);
  }
}
