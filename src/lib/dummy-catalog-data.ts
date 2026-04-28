import { DUMMY_HEADER_CATEGORIES } from '@/app/[locale]/_components/header/data/dummy-nav-categories';
import type {
  Category,
  CategoryDetail,
  CategoryMainInfo,
  SubCategory,
} from '@/types/categories';
import type {
  GetProductsResponse,
  ProductAttribute,
  ProductCard,
} from '@/types/products';

type CatalogNode = Category | SubCategory | CategoryMainInfo;

const PRODUCT_IMAGES = [
  'photo-1523275335684-37898b6baf30',
  'photo-1542291026-7eec264c27ff',
  'photo-1591047139829-d91aecb6caea',
  'photo-1553062407-98eeb64c6a62',
  'photo-1578662996442-48f60103fc96',
  'photo-1505740420928-5e560c06d30e',
  'photo-1491553895911-0055eca6402d',
  'photo-1572635196237-14b3f281503f',
  'photo-1594938291221-94f18cbb5660',
  'photo-1515886657613-9f3515b0c78f',
  'photo-1512436991641-6745cdb1723f',
  'photo-1560343090-f0409e92791a',
];

const PRODUCT_NAMES = [
  'Everyday Essential',
  'Signature Pick',
  'Premium Set',
  'Modern Classic',
  'Travel Favorite',
  'Limited Edition',
  'Soft Touch',
  'Urban Style',
  'Weekend Ready',
  'Best Seller',
  'New Season',
  'Gift Bundle',
];

export const dummyProductAttributes: ProductAttribute[] = [
  {
    attribute: 'Size',
    values: [
      { id: 101, value: 'S', image: '' },
      { id: 102, value: 'M', image: '' },
      { id: 103, value: 'L', image: '' },
    ],
  },
  {
    attribute: 'Color',
    values: [
      { id: 201, value: 'Black', image: '' },
      { id: 202, value: 'White', image: '' },
      { id: 203, value: 'Beige', image: '' },
    ],
  },
];

export const dummyCategoryTree = DUMMY_HEADER_CATEGORIES;

export const dummyHomeCategories = dummyCategoryTree.map(category => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
  image: category.image,
  parents_slugs: [],
}));

const imageUrl = (photoSlug: string, width = 900) =>
  `https://images.unsplash.com/${photoSlug}?auto=format&fit=crop&w=${width}&q=90`;

const titleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const hashSlug = (slug: string) =>
  [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);

const hasChildren = (node: CatalogNode): node is Category | SubCategory =>
  'sub_categories' in node && Array.isArray(node.sub_categories);

function flattenCategories(nodes: CatalogNode[]): CatalogNode[] {
  return nodes.flatMap(node => [
    node,
    ...(hasChildren(node) ? flattenCategories(node.sub_categories) : []),
  ]);
}

const allDummyCategories = flattenCategories(DUMMY_HEADER_CATEGORIES);

export function getDummyCategoryDetail(slug: string) {
  const category = allDummyCategories.find(item => item.slug === slug);

  if (!category) {
    return {
      status: 404,
      ok: false,
      error: { message: 'Dummy category not found', status: 404 },
      data: undefined,
    } as const;
  }

  const subCategories = hasChildren(category) ? category.sub_categories : [];
  const detail: CategoryDetail = {
    products: [],
    category,
    sub_categories: subCategories,
    sub_sub_categories: subCategories.flatMap(subCategory =>
      hasChildren(subCategory) ? subCategory.sub_categories : []
    ),
    products_count: makeDummyProductsForSlug(slug).length,
    attribute_filters: [],
    price_range: [],
  };

  return {
    status: 200,
    ok: true,
    error: undefined,
    data: detail,
  } as const;
}

export function getDummyProductList(
  slug: string,
  params: Record<string, string> = {}
) {
  const category = allDummyCategories.find(item => item.slug === slug);
  const categoryName = category?.name ?? titleCase(slug);
  const allProducts = makeDummyProductsForSlug(slug, categoryName);
  const from = Number(params.from || 0);
  const to = Number(params.to || Number.MAX_SAFE_INTEGER);
  const page = Math.max(Number(params.page || 1), 1);
  const perPage = 10;

  const filteredProducts = allProducts
    .filter(product => {
      const price = Number(product.price);
      return price >= from && price <= to;
    })
    .sort((a, b) => {
      if (params['sort[price]'] === 'asc') return Number(a.price) - Number(b.price);
      if (params['sort[price]'] === 'desc') return Number(b.price) - Number(a.price);
      return 0;
    });

  const start = (page - 1) * perPage;
  const products = filteredProducts.slice(start, start + perPage);
  const total = filteredProducts.length;
  const maxPrice = Math.max(...allProducts.map(product => Number(product.price)));
  const minPrice = Math.min(...allProducts.map(product => Number(product.price)));

  const data: GetProductsResponse = {
    success: true,
    message: 'Dummy products loaded',
    products,
    range_price: {
      min_price: minPrice,
      max_price: maxPrice,
    },
    attributes: dummyProductAttributes,
    pagination: {
      current_page: page,
      next_page_url: start + perPage < total ? `/category/products/${slug}?page=${page + 1}` : null,
      prev_page_url: page > 1 ? `/category/products/${slug}?page=${page - 1}` : null,
      first_page_url: `/category/products/${slug}?page=1`,
      last_page_url: `/category/products/${slug}?page=${Math.max(Math.ceil(total / perPage), 1)}`,
      per_page: perPage,
      total,
    },
  };

  return {
    status: 200,
    ok: true,
    error: undefined,
    data,
  } as const;
}

function makeDummyProductsForSlug(
  slug: string,
  categoryName = titleCase(slug)
): ProductCard[] {
  const seed = hashSlug(slug);

  return PRODUCT_NAMES.map((productName, index) => {
    const image = imageUrl(PRODUCT_IMAGES[(seed + index) % PRODUCT_IMAGES.length]);
    const price = 24 + ((seed + index * 17) % 180);
    const hasDiscount = index % 4 === 0 ? 1 : 0;

    return {
      id: seed * 100 + index + 1,
      name: `${categoryName} ${productName}`,
      price: price.toString(),
      created_at: new Date().toISOString(),
      quantity: index === 7 ? 0 : 24,
      image,
      has_discount: hasDiscount,
      price_after_sale: hasDiscount ? Math.round(price * 0.8) : null,
      slug: `dummy-${slug}-${index + 1}`,
      alternative_image:
        imageUrl(PRODUCT_IMAGES[(seed + index + 3) % PRODUCT_IMAGES.length]),
      product_color_attributes: [
        {
          image,
          color_image: imageUrl(PRODUCT_IMAGES[(seed + index + 1) % PRODUCT_IMAGES.length], 120),
          color: 'Black',
        },
        {
          image: imageUrl(PRODUCT_IMAGES[(seed + index + 2) % PRODUCT_IMAGES.length]),
          color_image: imageUrl(PRODUCT_IMAGES[(seed + index + 2) % PRODUCT_IMAGES.length], 120),
          color: 'Beige',
        },
      ],
    };
  });
}
