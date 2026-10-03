/**
 * Shop items for the OS shell.
 *
 * To add an item:
 * 1. Put its images in public/shop/{slug}/ and list them below, in viewer order.
 * 2. Add the info drawer copy at content/shop/{slug}.md
 */
export const SHOP = [
  {
    slug: "summer-in-the-city",
    title: "Summer in the city",
    description: "Zine for Amsterdam’s 750th birthday",
    images: [
      "/shop/summer-in-the-city/smtc-1.png",
      "/shop/summer-in-the-city/sitc02.jpg",
      "/shop/summer-in-the-city/sitc03.jpg",
      "/shop/summer-in-the-city/sitc04.jpg",
      "/shop/summer-in-the-city/sitc05.jpg",
      "/shop/summer-in-the-city/sitc06.jpg",
      "/shop/summer-in-the-city/shop-6.png",
    ],
  },
  {
    slug: "presets-and-luts",
    title: "Presets and LUTS",
    description: "Presets and LUTS",
    images: ["/shop/presets-and-luts/shop-7.png"],
  },
  {
    slug: "200-postcards",
    title: "200 Postcards",
    description: "200 Postcards photobook by Boris Kirov",
    images: [
      "/video/200-postcards.mp4",
      "/shop/200-postcards/photo-book-loop.gif",
      "/shop/200-postcards/200-postcards-transparent.png",
      "/shop/200-postcards/book-open-01.png",
      "/shop/200-postcards/book-open-02.png",
      "/shop/200-postcards/book-open-03.png",
      "/shop/200-postcards/book-open-04.png",
      "/shop/200-postcards/shop-1.png",
    ],
  },
  {
    slug: "sunset-in-centrale-markt",
    title: "Sunset in Centrale Markt",
    description: "Print",
    images: ["/shop/sunset-in-centrale-markt/shop-2.png"],
  },
];

export function getShopItem(slug) {
  return SHOP.find((item) => item.slug === slug) || null;
}
