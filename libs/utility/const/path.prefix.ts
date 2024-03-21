// Swagger
export const pathPrefixSwagger = {
  setup: 'docs',
};

// --------------------------------------------
// Shop
export const pathPrefixShop = {
  swagger: 'shop',
  controller: 'shop',
};

export const pathPrefixQueryShop = {
  findShops: 'find',
  findShopById: 'detail',
};

export const pathPrefixCommandShop = {
  createShop: 'create-shop',
  updateShop: 'update-shop',
};

// --------------------------------------------
// User
export const pathPrefixUser = {
  swagger: 'user',
  controller: 'user',
};

export const pathPrefixQueryUser = {
  findUsers: 'find',
  findUserById: 'detail',
  getTotalUser: 'get-total-user',
  verifyAccessToken: 'verify-access-token',
  getUserInfo: 'get-user-info',
};

export const pathPrefixCommandUser = {
  createUser: 'create',
  login: 'login',
  updatePassword: 'change-password',
  logout: 'logout',
};

// --------------------------------------------
// Role
export const pathPrefixRole = {
  swagger: 'role',
  controller: 'role',
};

export const pathPrefixQueryRole = {
  findRoles: 'find',
  findRoleById: 'detail',
};

export const pathPrefixCommandRole = {
  createRole: 'create-role',
};

// --------------------------------------------
// Permission
export const pathPrefixPermission = {
  swagger: 'permission',
  controller: 'permission',
};

export const pathPrefixQueryPermission = {
  findPermissions: 'find',
};

// --------------------------------------------
// Product
export const pathPrefixProduct = {
  swagger: 'product',
  controller: 'product',
};

export const pathPrefixQueryProduct = {
  findProductListByAdmin: 'admin/find',
  findProducts: 'find',
  findProductByCode: 'detail',
  findProductById: 'find-by-id',
  findProductByBrand: 'find-by-brand',
  findProductByCategory: 'find-by-category',
  findProductByIds: 'find-by-ids',
  findProductSimilar: 'find-similar',
  findProductSamePrice: 'find-same-price',
  findProductSameCategory: 'find-same-category',
  findProductSameBrand: 'find-same-brand',
  getTotalProduct: 'get-total-product',
  getShopByProduct: 'get-shop-by-product',
  findShopDetalByProduct: 'find-shop-detail-by-product',
};

export const pathPrefixCommandProduct = {
  createProduct: 'create',
  updateProduct: 'update',
  deleteProduct: 'delete',
};

// --------------------------------------------
// Category
export const pathPrefixCategory = {
  swagger: 'category',
  controller: 'category',
};

export const pathPrefixQueryCategory = {
  findCategories: 'find',
  findCategoryById: 'detail',
  findCategoryByCode: 'find-by-code',
  getTotalCategory: 'get-total-category',
};

export const pathPrefixCommandCategory = {
  createCategory: 'create',
};

// --------------------------------------------
// Brand
export const pathPrefixBrand = {
  swagger: 'brand',
  controller: 'brand',
};

export const pathPrefixQueryBrand = {
  findBrands: 'find',
  findBrandById: 'detail',
  findBrandByCode: 'find-by-code',
  getTotalBrand: 'get-total-brand',
};

export const pathPrefixCommandBrand = {
  createBrand: 'create',
};

// --------------------------------------------
// Time
export const pathPrefixTime = {
  swagger: 'time',
  getTimeServer: 'server/time',
};
