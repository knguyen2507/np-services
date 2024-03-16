import { v2 as cloudinary } from 'cloudinary';
import { environment } from '../../src/environment';
import { CloudinaryProviderConstant } from '../utility/const/constant';

export const CloudinaryProvider = {
  provide: CloudinaryProviderConstant,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: environment.CLOUDINARY_CLOUDNAME,
      api_key: environment.CLOUDINARY_APIKEY,
      api_secret: environment.CLOUDINARY_APISECRET,
    });
  },
};
