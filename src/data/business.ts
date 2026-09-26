/**
 * Business data model with strict Content Integrity Rules.
 * Only confirmed data is populated.
 * Any unconfirmed fields (phone, email, hours, fake reviews) remain null
 * and are NEVER shown on the production site.
 */
export const business = {
  name: "INSTALACIONES AXA",
  tagline: "Climatización · Electricidad · Fontanería",
  location: {
    street: "Rambla Nova 124",
    postalCode: "43001",
    city: "Tarragona",
    country: "España",
    fullAddress: "Rambla Nova 124, 43001 Tarragona, España",
  },
  social: {
    instagram: {
      handle: "@instalaciones_axa",
      url: "https://www.instagram.com/instalaciones_axa/",
    },
  },
  // Fields pending confirmation - strictly null or empty in production:
  phone: null as string | null,
  email: null as string | null,
  openingHours: null as string | null,
  serviceAreasExtra: [] as string[],
  certifications: [] as string[],
  brands: [] as string[],
  testimonials: [] as Array<{ id: string; quote: string; author: string; location: string }>,
  pricingTable: null,
};
