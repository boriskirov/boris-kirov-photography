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
      "/shop/summer-in-the-city/exhibition-promo.mov",
      "/shop/summer-in-the-city/0.jpg",
      "/shop/summer-in-the-city/1.png",
      "/shop/summer-in-the-city/2.png",
      "/shop/summer-in-the-city/3.png",
      "/shop/summer-in-the-city/4.jpg",
      "/shop/summer-in-the-city/5.png",
      "/shop/summer-in-the-city/sitc03.jpg",
      "/shop/summer-in-the-city/sitc05.jpg",
      "/shop/summer-in-the-city/sitc06.jpg",
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
      "/shop/200-postcards/200Postcards.jpeg",
      "/shop/200-postcards/200Postcards2.jpeg",
      "/shop/200-postcards/prep-cover.jpeg",
      "/shop/200-postcards/prep-details.jpeg",
      "/shop/200-postcards/book-open-01.png",
      "/shop/200-postcards/book-open-02.png",
      "/shop/200-postcards/book-open-03.png",
      "/shop/200-postcards/book-open-04.png",
      "/shop/200-postcards/inner-page-1.jpeg",
      "/shop/200-postcards/inner-page-2.jpeg",
      "/shop/200-postcards/stamps.jpeg",
    ],
  },
  {
    slug: "time-flies",
    title: "Time flies",
    description: "",
    images: [],
  },
];

export function getShopItem(slug) {
  return SHOP.find((item) => item.slug === slug) || null;
}
