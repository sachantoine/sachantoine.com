import { siteConfig } from "@/data/config"

// To connect your Shopify store with live products:
// 1. In Shopify Admin → Settings → Apps and sales channels → Develop apps
// 2. Create an app, enable Storefront API, grant: unauthenticated_read_product_listings
// 3. Add to .env.local:
//    NEXT_PUBLIC_SHOPIFY_DOMAIN=bycuratedcreations.myshopify.com
//    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here

export default function Store() {
  return (
    <section id="store" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Shop</h2>
            <p className="mt-1 text-sm text-neutral-400">Physical 3D prints, shipped to you.</p>
          </div>
          <a
            href={siteConfig.socials.shopify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            View all →
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex flex-col items-center gap-6 p-12 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
              🖨️
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">By Curated Creations</h3>
              <p className="mt-1 text-sm text-neutral-400">
                Custom 3D printed products — desk accessories, enclosures, mounts, and more. All designed and printed by me.
              </p>
            </div>
            <a
              href={siteConfig.socials.shopify}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-80"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
