export type GearItem = {
  name: string
  description: string
  category: string
  link: string
  image?: string
}

export const gear: GearItem[] = [
  {
    name: "Topcube Enclosure",
    description: "The enclosure I use for my Bambu Lab printer. Huge quality improvement for ABS/ASA and keeps the noise down.",
    category: "3D Printing",
    link: "https://www.amazon.com/Enclosure-Transparent-Isolation-Constant-Temperature/dp/B0G1RGZMHX",
    image: "/gear/topcube1.jpg",
  },
  {
    name: "Bambu Lab A1 Combo",
    description: "My main printer. Comes with the AMS Lite for multi-color printing. Fast, reliable, and easy to use — the best value in the game right now.",
    category: "3D Printing",
    link: "#", // TODO: add Amazon link
    image: "/gear/bambu-a1-combo.png",
  },
  {
    name: "Polydryer Boxes",
    description: "Filament dryer boxes I use to keep moisture out of my spools. Runs while printing so you never have to pre-dry.",
    category: "3D Printing",
    link: "#", // TODO: add Amazon link
    image: "/gear/polydryer.png",
  },
  {
    name: "Fanttik NEX E2 Ultra",
    description: "Portable cordless tire inflator. Compact and powerful — I keep it in my car and it's come in handy more times than I can count.",
    category: "Tools",
    link: "#", // TODO: add Amazon link
    image: "/gear/fanttik-e2-ultra.jpg",
  },
  {
    name: "Fanttik F2 Pro",
    description: "Compact multi-function tool I use around the shop. Solid build quality from Fanttik.",
    category: "Tools",
    link: "#", // TODO: add Amazon link
    image: "/gear/fanttik-f2-pro.jpg",
  },
  {
    name: "Fanttik T1 Max Soldering Iron Kit",
    description: "Portable soldering iron for quick electronics work. Heats up fast and the cordless form factor is great for the bench.",
    category: "Tools",
    link: "#", // TODO: add Amazon link
    image: "/gear/fanttik-soldering-iron.jpg",
  },
  {
    name: "Fanttik NEX S2 Pro",
    description: "Another Fanttik inflator in my lineup — the S2 Pro handles higher pressure and is my go-to for anything beyond car tires.",
    category: "Tools",
    link: "#", // TODO: add Amazon link
    image: "/gear/fanttik-s2-pro.png",
  },
]
