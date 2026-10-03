/**
 * Projects for the OS shell — images from existing project folders.
 */
export const PROJECTS = [
  {
    slug: "lecoffeeride",
    title: "Lecoffeeride",
    description: "Cycling trip through the Belgian Ardennes with Lecoffeeride",
    date: "2026",
    images: [
        "/lecoffeeride/lecoffeehero.jpg",
        "/lecoffeeride/lecofferide-1.jpg",
        "/lecoffeeride/lecofferide-2.jpg",
        "/lecoffeeride/lecofferide-3.jpg",
        "/lecoffeeride/lecofferide-4.jpg",
        "/lecoffeeride/lecofferide-5.jpg",
        "/lecoffeeride/lecofferide-6.jpg",
        "/lecoffeeride/lecofferide-7.jpg",
        "/lecoffeeride/lecofferide-8.jpg",
        "/lecoffeeride/lecofferide-9.jpg",
        "/lecoffeeride/square01.jpg",
        "/lecoffeeride/square02.jpg",
        "/lecoffeeride/square03.jpg",
        "/lecoffeeride/square04.jpg",
        "/lecoffeeride/square05.jpg",
        "/lecoffeeride/square06.jpg",
        "/lecoffeeride/square07.jpg",
        "/lecoffeeride/square08.jpg",
        "/lecoffeeride/square09.jpg",
        "/lecoffeeride/square10.jpg",
        "/lecoffeeride/square11.jpg",
        "/lecoffeeride/square12.jpg",
        "/lecoffeeride/square13.png",
        "/lecoffeeride/square14.png",
        "/lecoffeeride/square15.png"
    ],
  },
  {
    slug: "uci-world-championships",
    title: "UCI World Championships",
    description: "UCI World Championships in Zonhoven, Belgium",
    date: "2026",
    images: [
        "/uci-2026/uci-1.png"
    ],
  },
  {
    slug: "power-of-love-of-power",
    title: "Power of Love & Love of Power",
    description: "Photography, videography & graphic design for Svetlin Travis contemporary dance performance",
    date: null,
    images: [
        "/polop/polop-1.png",
        "/polop/polop-2.png",
        "/polop/polop-3.png",
        "/polop/polop-4.png",
        "/polop/polop-5.png",
        "/polop/polop-6.png",
        "/polop/polop-7.png",
        "/polop/polop-8.png",
        "/polop/polop-9.png",
        "/polop/polop-10.png"
    ],
  },
  {
    slug: "fjallraven",
    title: "Fjällräven",
    description: "",
    date: null,
    images: [],
  },
  {
    slug: "the-happy-man",
    title: "The Happy Man",
    description: "",
    date: null,
    images: [],
  },
];

export function getProject(slug) {
  return PROJECTS.find((item) => item.slug === slug) || null;
}
