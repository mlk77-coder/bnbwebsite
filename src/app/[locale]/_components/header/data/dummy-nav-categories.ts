import type { Category, CategorySlugs, SubCategory, SubSubCategory } from '@/types/categories';

/** Root node for dummy hierarchy (matches CategorySlugs shape). */
export const DUMMY_SHOP_ROOT: CategorySlugs = {
  id: 0,
  name: 'Shop',
  slug: 'shop',
  parent_category: null,
};

const img = (photoId: string, sig?: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80${sig ? `&sig=${sig}` : ''}`;

const cs = (
  id: number,
  name: string,
  slug: string,
  parent: CategorySlugs | null
): CategorySlugs => ({
  id,
  name,
  slug,
  parent_category: parent,
});

type LeafDef = { id: number; name: string; slug: string; image: string };

function leaf(id: number, name: string, slug: string, image: string, parent: CategorySlugs): SubSubCategory {
  return {
    id,
    name,
    description: '',
    slug,
    image,
    parent_category: parent,
  };
}

function sub(
  id: number,
  name: string,
  slug: string,
  image: string,
  dept: CategorySlugs,
  leaves: LeafDef[]
): SubCategory {
  const self = cs(id, name, slug, dept);
  return {
    id,
    name,
    description: '',
    slug,
    image,
    parent_category: dept,
    sub_categories: leaves.map((L) => leaf(L.id, L.name, L.slug, L.image, self)),
  };
}

function department(
  id: number,
  name: string,
  slug: string,
  image: string,
  build: (dept: CategorySlugs) => SubCategory[]
): Category {
  const self = cs(id, name, slug, DUMMY_SHOP_ROOT);
  return {
    id,
    name,
    description: `${name} — curated like a department store`,
    slug,
    image,
    parent_category: DUMMY_SHOP_ROOT,
    sub_categories: build(self),
  };
}

/**
 * Rich showcase navigation (Amazon-style departments) for header only.
 * Links point to `/category/...` slugs — use for UI demos without backend categories.
 */
export const DUMMY_HEADER_CATEGORIES: Category[] = [
  department(
    100,
    'Electronics',
    'electronics',
    img('photo-1498049794561-7780e7231661', '1'),
    (d) => [
      sub(101, 'Computers & Office', 'computers-office', img('photo-1517694712202-14dd9538aa97', '2'), d, [
        { id: 1001, name: 'Laptops', slug: 'laptops', image: img('photo-1496181133206-80ce9b88a853', '3') },
        { id: 1002, name: 'Monitors', slug: 'monitors', image: img('photo-1527443224154-c86a403dbd67', '4') },
        { id: 1003, name: 'Tablets', slug: 'tablets', image: img('photo-1544244015-0df4b3ffc6b0', '5') },
        { id: 1004, name: 'Accessories', slug: 'computer-accessories', image: img('photo-1587825140708-dfaf72ae4b04', '6') },
      ]),
      sub(102, 'TV & Home Theater', 'tv-home-theater', img('photo-1593359677879-a4bb92f829d1', '7'), d, [
        { id: 1011, name: '4K TVs', slug: '4k-tvs', image: img('photo-1461151304267-38535e780c79', '8') },
        { id: 1012, name: 'Soundbars', slug: 'soundbars', image: img('photo-1545454675-3531c543be5d', '9') },
        { id: 1013, name: 'Streaming', slug: 'streaming-devices', image: img('photo-1611162617474-5b21e879e113', '10') },
      ]),
      sub(103, 'Camera & Photo', 'camera-photo', img('photo-1516035069371-29a1b244cc32', '11'), d, [
        { id: 1021, name: 'DSLR', slug: 'dslr-cameras', image: img('photo-1502920917128-1aa500764cbd', '12') },
        { id: 1022, name: 'Lenses', slug: 'lenses', image: img('photo-1606980446861-1e9e557bdfff', '13') },
        { id: 1023, name: 'Drones', slug: 'drones', image: img('photo-1473968512647-3ae44790a858', '14') },
      ]),
      sub(104, 'Headphones', 'headphones', img('photo-1505740420928-5e560c06d30e', '15'), d, [
        { id: 1031, name: 'Wireless', slug: 'wireless-headphones', image: img('photo-1484704849700-f985a7890ae7', '16') },
        { id: 1032, name: 'Noise cancelling', slug: 'noise-cancelling', image: img('photo-1546435770-a3e426bf472b', '17') },
        { id: 1033, name: 'Gaming headsets', slug: 'gaming-headsets', image: img('photo-1612444533842-3670e33c843b', '18') },
      ]),
      sub(105, 'Wearable Tech', 'wearable-tech', img('photo-1434493789847-2f02dc6ca35d', '19'), d, [
        { id: 1041, name: 'Smartwatches', slug: 'smartwatches', image: img('photo-1579586337278-3befd40fd17a', '20') },
        { id: 1042, name: 'Fitness trackers', slug: 'fitness-trackers', image: img('photo-1510017803434-a899398421e3', '21') },
      ]),
    ]
  ),
  department(
    200,
    'Fashion',
    'fashion',
    img('photo-1441986300917-64674bd600d8', '22'),
    (d) => [
      sub(201, 'Women', 'women-fashion', img('photo-1483985988355-c7688a4d8900', '23'), d, [
        { id: 2001, name: 'Dresses', slug: 'dresses', image: img('photo-1595777457583-95e059d581b8', '24') },
        { id: 2002, name: 'Tops', slug: 'womens-tops', image: img('photo-1564257631407-4b34a7623d42', '25') },
        { id: 2003, name: 'Shoes', slug: 'womens-shoes', image: img('photo-1543163521-1bf539c55dd2', '26') },
      ]),
      sub(202, 'Men', 'men-fashion', img('photo-1617137968427-85924c800a22', '27'), d, [
        { id: 2011, name: 'Shirts', slug: 'mens-shirts', image: img('photo-1602810318383-e386cc2a3ccf', '28') },
        { id: 2012, name: 'Denim', slug: 'mens-denim', image: img('photo-1541099649105-f69ad21df32a', '29') },
        { id: 2013, name: 'Sneakers', slug: 'mens-sneakers', image: img('photo-1542291026-7eec264c27ff', '30') },
      ]),
      sub(203, 'Kids & Baby', 'kids-baby', img('photo-1503454537195-1dcabb73ffb9', '31'), d, [
        { id: 2021, name: 'Baby', slug: 'baby-clothes', image: img('photo-1522771739844-6a9f6d5f14af', '32') },
        { id: 2022, name: 'Kids shoes', slug: 'kids-shoes', image: img('photo-1514986888952-8cd320577b68', '33') },
      ]),
      sub(204, 'Handbags', 'handbags', img('photo-1584917865442-de89d76afd3a', '34'), d, [
        { id: 2031, name: 'Totes', slug: 'totes', image: img('photo-1590874103328-eac38a683ce7', '35') },
        { id: 2032, name: 'Crossbody', slug: 'crossbody-bags', image: img('photo-1564422170194-896b34310c51', '36') },
      ]),
    ]
  ),
  department(
    300,
    'Home & Kitchen',
    'home-kitchen',
    img('photo-1555041469-a586c61ea9bc', '37'),
    (d) => [
      sub(301, 'Furniture', 'furniture', img('photo-1555041469-a586c61ea9bc', '38'), d, [
        { id: 3001, name: 'Living room', slug: 'living-room-furniture', image: img('photo-1556228578-0d85b1a4d571', '39') },
        { id: 3002, name: 'Bedroom', slug: 'bedroom-furniture', image: img('photo-1616594039964-ae9021a400a0', '40') },
        { id: 3003, name: 'Office', slug: 'office-furniture', image: img('photo-1518455027357-f3f8164ba6bd', '41') },
      ]),
      sub(302, 'Kitchen', 'kitchen', img('photo-1556911220-e15b29be8c8f', '42'), d, [
        { id: 3011, name: 'Cookware', slug: 'cookware', image: img('photo-1556910103-1c02745aae4d', '43') },
        { id: 3012, name: 'Small appliances', slug: 'small-appliances', image: img('photo-1574269909862-7e1d70bb8077', '44') },
        { id: 3013, name: 'Storage', slug: 'kitchen-storage', image: img('photo-1584622650111-993a426fbf00', '45') },
      ]),
      sub(303, 'Bedding', 'bedding', img('photo-1631049307264-da0cfb9d7598', '46'), d, [
        { id: 3021, name: 'Sheets', slug: 'sheets', image: img('photo-1522771739844-6a9f6d5f14af', '47') },
        { id: 3022, name: 'Comforters', slug: 'comforters', image: img('photo-1616627547586-b607f843f90b', '48') },
      ]),
      sub(304, 'Decor', 'home-decor', img('photo-1618220179428-22790b461013', '49'), d, [
        { id: 3031, name: 'Lighting', slug: 'lighting', image: img('photo-1513506003901-1e6a229e2d15', '50') },
        { id: 3032, name: 'Rugs', slug: 'rugs', image: img('photo-1600166898405-6e16c60f7a1a', '51') },
        { id: 3033, name: 'Wall art', slug: 'wall-art', image: img('photo-1513519245081-0e12902e5a38', '52') },
      ]),
    ]
  ),
  department(
    400,
    'Beauty & Personal Care',
    'beauty',
    img('photo-1596462502278-27bfdc403348', '53'),
    (d) => [
      sub(401, 'Skin care', 'skin-care', img('photo-1556228578-8c89e565adf5', '54'), d, [
        { id: 4001, name: 'Moisturizers', slug: 'moisturizers', image: img('photo-1620916566398-39f1143ab7be', '55') },
        { id: 4002, name: 'Serums', slug: 'serums', image: img('photo-1608248543803-ba988f4ddf89', '56') },
        { id: 4003, name: 'Sunscreen', slug: 'sunscreen', image: img('photo-1556228720-195a672e8a03', '57') },
      ]),
      sub(402, 'Makeup', 'makeup', img('photo-1512496015851-a90fb38ba796', '58'), d, [
        { id: 4011, name: 'Face', slug: 'face-makeup', image: img('photo-1487412912498-0447578fcca8', '59') },
        { id: 4012, name: 'Eyes', slug: 'eye-makeup', image: img('photo-1516975080664-ed2fc6a32937', '60') },
      ]),
      sub(403, 'Hair care', 'hair-care', img('photo-1522338242992-e1a5492a48aa', '61'), d, [
        { id: 4021, name: 'Shampoo', slug: 'shampoo', image: img('photo-1608248597279-f99d160bfcbc', '62') },
        { id: 4022, name: 'Styling', slug: 'hair-styling', image: img('photo-1527799820374-dcf8d71d7f1d', '63') },
      ]),
    ]
  ),
  department(
    500,
    'Sports & Outdoors',
    'sports-outdoors',
    img('photo-1571019613454-1cb2f99b2d8b', '64'),
    (d) => [
      sub(501, 'Fitness', 'fitness', img('photo-1534438327276-14e5300d3cda', '65'), d, [
        { id: 5001, name: 'Weights', slug: 'weights', image: img('photo-1581009146145-b48e902e7478', '66') },
        { id: 5002, name: 'Cardio', slug: 'cardio-equipment', image: img('photo-1576678926173-e3a20d2d1e96', '67') },
        { id: 5003, name: 'Yoga', slug: 'yoga', image: img('photo-1544367567-0f2fcb009e0b', '68') },
      ]),
      sub(502, 'Outdoor', 'outdoor', img('photo-1478131143081-80f7f84ca84d', '69'), d, [
        { id: 5011, name: 'Camping', slug: 'camping', image: img('photo-1504280390367-361c6d9f38d4', '70') },
        { id: 5012, name: 'Hiking', slug: 'hiking', image: img('photo-1551632811-561732d1e306', '71') },
      ]),
      sub(503, 'Team sports', 'team-sports', img('photo-1461896836934-ffe607ba8211', '72'), d, [
        { id: 5021, name: 'Soccer', slug: 'soccer', image: img('photo-1431324155629-1a6deb1dec8d', '73') },
        { id: 5022, name: 'Basketball', slug: 'basketball', image: img('photo-1546519638-68e109498ffc', '74') },
      ]),
    ]
  ),
  department(
    600,
    'Toys & Games',
    'toys-games',
    img('photo-1566576912321-d58ddd7a6088', '75'),
    (d) => [
      sub(601, 'Games', 'games', img('photo-1611996575747-78b368c4d35b', '76'), d, [
        { id: 6001, name: 'Board games', slug: 'board-games', image: img('photo-1611371805429-86bf120c6161', '77') },
        { id: 6002, name: 'Video games', slug: 'video-games', image: img('photo-1493711662062-fa541adb3fc8', '78') },
      ]),
      sub(602, 'Kids toys', 'kids-toys', img('photo-1558060379-71230705dfa7', '79'), d, [
        { id: 6011, name: 'LEGO & building', slug: 'lego-building', image: img('photo-1587654780297-9c786be4e06f', '80') },
        { id: 6012, name: 'Action figures', slug: 'action-figures', image: img('photo-1608889825205-eebdb9fc5806', '81') },
      ]),
    ]
  ),
];

const saleRoot = DUMMY_SHOP_ROOT;

export const DUMMY_SALE_CATEGORIES: Category[] = [
  {
    id: 8001,
    name: 'Tech deals',
    description: 'Laptops, audio & more',
    slug: 'tech-deals',
    image: img('photo-1607082348824-0a96f2a4b9da', '82'),
    parent_category: saleRoot,
    sub_categories: [],
  },
  {
    id: 8002,
    name: 'Fashion outlet',
    description: 'Seasonal markdowns',
    slug: 'fashion-outlet',
    image: img('photo-1445205170230-053b83016050', '83'),
    parent_category: saleRoot,
    sub_categories: [],
  },
  {
    id: 8003,
    name: 'Home essentials',
    description: 'Kitchen & decor',
    slug: 'home-essentials-sale',
    image: img('photo-1586023492125-27b2c045efd7', '84'),
    parent_category: saleRoot,
    sub_categories: [],
  },
  {
    id: 8004,
    name: 'Beauty steals',
    description: 'Limited-time bundles',
    slug: 'beauty-steals',
    image: img('photo-1596462502278-27bfdc403348', '85'),
    parent_category: saleRoot,
    sub_categories: [],
  },
];
