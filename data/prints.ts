export type Print = {
  name: string
  description?: string
  image: string | null
  shopifyLink?: string
  available?: boolean
}

// Add your 3D print photos here
// image: path relative to /public, e.g. "/prints/mycoolprint.jpg"
export const prints: Print[] = [
  // {
  //   name: "Print Name",
  //   description: "Short description",
  //   image: "/prints/example.jpg",
  //   shopifyLink: "https://bycuratedcreations.com/products/...",
  //   available: true,
  // },
]
