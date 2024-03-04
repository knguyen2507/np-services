import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryProviderConstant } from 'libs/utility/const/constant';
import { environment } from 'src/environment';

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
