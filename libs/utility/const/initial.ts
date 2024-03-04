import moment from 'moment';

export const InitialShop = {
  id: '6502d51ac4841b15cd7756a2',
  name: 'Cửa hàng Nội Thất - Điện Máy Nguyên Phát',
  address: 'QL.19B, Thuận Đức, Nhơn Mỹ, An Nhơn, Bình Định',
  description: 'Chuyên kinh doanh các mặt hàng: Trang trí Nội thất, Điện tử - Điện lạnh, Điện gia dụng',
};

export const InitialUser1 = {
  id: '6502d51ac4841b15cd7756a3',
  name: 'Test User 1',
  phone: '0987654321',
  username: 'admin001',
  password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
  created: moment().toDate(),
};
export const InitialUser2 = {
  id: '6502d51ac4841b15cd7756b3',
  name: 'Test User 2',
  phone: '0123456789',
  username: 'admin002',
  password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
  created: moment().toDate(),
};

export const InitialBrand = [
  {
    id: `507f191e810c19729de860e1`,
    name: 'samsung',
    brandCode: 'samsung',
    thumbnailLink: 'https://cdn.iconscout.com/icon/free/png-256/free-samsung-226432.png?f=webp',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e2`,
    name: 'toshiba',
    brandCode: 'toshiba',
    thumbnailLink: 'https://cdn.iconscout.com/icon/free/png-256/free-toshiba-226434.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e3`,
    name: 'lg',
    brandCode: 'lg',
    thumbnailLink: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/lg-512.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e4`,
    name: 'mutoshi',
    brandCode: 'mutoshi',
    thumbnailLink: 'https://mutosi.com/images/logo-2022.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e5`,
    name: 'sunhouse',
    brandCode: 'sunhouse',
    thumbnailLink: 'https://upload.wikimedia.org/wikipedia/vi/e/ed/Logo_cong_ty_sunhouse.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e6`,
    name: 'khác',
    brandCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
];

export const InitialCategory = [
  {
    id: `507f191e810c19729de860f1`,
    name: 'tv',
    categoryCode: 'tv',
    thumbnailLink: 'https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f2`,
    name: 'tủ lạnh',
    categoryCode: 'tu-lanh',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/018/777/993/original/refrigerator-logo-icon-vector.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f3`,
    name: 'máy giặt',
    categoryCode: 'may-giat',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/009/458/554/original/washing-machine-icon-logo-design-template-vector.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f4`,
    name: 'nệm',
    categoryCode: 'nem',
    thumbnailLink:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTd_05i_Vhj92vyv1ie2HGhoP1mj2QwKauug&usqp=CAU',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f5`,
    name: 'đồ gỗ',
    categoryCode: 'do-go',
    thumbnailLink: 'https://i.pinimg.com/736x/7c/3e/ff/7c3eff5ee208ca917337fa2a1d8f7a71.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f6`,
    name: 'khác',
    categoryCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
];
