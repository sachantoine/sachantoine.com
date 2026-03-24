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
    image: "/gear/topcube-1.jpg",
  },
  // Add more gear items here
]
