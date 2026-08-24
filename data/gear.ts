export type GearItem = {
  name: string
  description: string
  category: string
  link: string
  image?: string
  discount?: string
}

export const gear: GearItem[] = [
  {
    name: "FlashForge Creator 5",
    description: "Dual-extrusion, high-speed 3D printer with a full-metal frame and auto-calibration. Great for reliable, fast prints straight out of the box.",
    category: "3D Printing",
    link: "https://flashforge.sjv.io/JkW21a",
    image: "/gear/flashforge-creator5.png",
  },
  {
    name: "FlashForge Creator 5 Pro",
    description: "Pro version of the Creator 5 with upgraded dual-extrusion and higher-temp hotends for engineering filaments. My pick for demanding materials.",
    category: "3D Printing",
    link: "https://flashforge.sjv.io/WO0NbM",
    image: "/gear/flashforge-creator5-pro.png",
  },
  {
    name: "SALTGATOR",
    description: "Desktop soft plastic injection machine I use with 3D printed molds. Makes custom softbaits in minutes, pairs perfectly with a Bambu printer.",
    category: "3D Printing",
    link: "https://saltgator.com/SA15",
    image: "/gear/saltgator.jpg",
    discount: "SA15 — 15% off",
  },
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
    link: "https://www.amazon.com/dp/B0D17V4SKM",
    image: "/gear/bambu-a1-combo.png",
  },
  {
    name: "Polydryer Boxes",
    description: "Filament dryer boxes I use to keep moisture out of my spools. Runs while printing so you never have to pre-dry.",
    category: "3D Printing",
    link: "https://www.amazon.com/dp/B0CK17RTP4",
    image: "/gear/polydryer.png",
  },
  {
    name: "Fanttik NEX E2 Ultra",
    description: "Compact cordless electric screwdriver for precision work on electronics and small devices. 50 magnetic bits, up to 0.6N·m torque — great for phones, cameras, and laptops.",
    category: "Tools",
    link: "https://www.amazon.com/dp/B0DSVKLNQR",
    image: "/gear/fanttik-e2-ultra.jpg",
  },
  {
    name: "Fanttik F2 Pro",
    description: "Compact multi-function tool I use around the shop. Solid build quality from Fanttik.",
    category: "Tools",
    link: "https://www.amazon.com/dp/B0DRXRH9DQ",
    image: "/gear/fanttik-f2-pro.jpg",
  },
  {
    name: "Fanttik T1 Max Soldering Iron Kit",
    description: "Portable soldering iron for quick electronics work. Heats up fast and the cordless form factor is great for the bench.",
    category: "Tools",
    link: "https://www.amazon.com/dp/B0D41ZMDPD",
    image: "/gear/fanttik-soldering-iron.jpg",
  },
  {
    name: "Fanttik NEX S2 Pro",
    description: "Cordless electric screwdriver with 7 adjustable torque settings up to 6N·m. Good for furniture, electronics, and household DIY — USB-C fast charging and built-in LED.",
    category: "Tools",
    link: "https://www.amazon.com/dp/B0F3X74WT9",
    image: "/gear/fanttik-s2-pro.png",
  },
]
