export type LocationSlug = "london" | "glasgow";

export interface ClinicAddress {
  name: string;
  lines: string[]; // full display address, one entry per line
}

export interface TransportLine {
  mode: string; // emoji
  text: string;
}

export interface Location {
  slug: LocationSlug;
  pathPrefix: string; // "" | "/glasgow"
  webhookPrefix: string; // "" | "glasgow-"
  brandName: string; // same for both
  cityName: string; // "London" | "Glasgow"
  locationHeading: string; // "Find Us in London" | "Find Us in Glasgow"
  locationSubheading: string;
  clinicCountLabel: string; // "2 London Clinics" | "1 Glasgow Clinic"
  phoneDisplay: string;
  phoneHref: string;
  telephoneE164: string; // schema format
  email: string;
  baseUrl: string;
  reviewsUrl: string;
  reviewRating: string;
  reviewCount: string;
  clinics: ClinicAddress[];
  schemaAddress: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  geo: { latitude: number; longitude: number };
  mapEmbedUrl: string;
  mapTitle: string;
  transport: TransportLine[];
}

export const locations: Record<LocationSlug, Location> = {
  london: {
    slug: "london",
    pathPrefix: "",
    webhookPrefix: "",
    brandName: "Harley Street Wellness",
    cityName: "London",
    locationHeading: "Find Us in London",
    locationSubheading:
      "Two convenient locations in the heart of London's prestigious medical district",
    clinicCountLabel: "2 London Clinics",
    phoneDisplay: "020 4628 3137",
    phoneHref: "02046283137",
    telephoneE164: "+44-20-4628-3137",
    email: "hello@harleystreetwellness.co.uk",
    baseUrl: "https://harleystreetwellness.co.uk",
    reviewsUrl: "https://g.co/kgs/harleystreetwellness",
    reviewRating: "4.9",
    reviewCount: "200",
    clinics: [
      { name: "Harley Street Clinic", lines: ["10 Harley Street", "London W1G 9PF"] },
      { name: "Portpool Lane Clinic", lines: ["1-5 Portpool Ln", "London EC1N 7UU"] },
    ],
    schemaAddress: {
      streetAddress: "10 Harley Street",
      addressLocality: "London",
      postalCode: "W1G 9PF",
    },
    geo: { latitude: 51.5155, longitude: -0.1484 },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8!2d-0.1484!3d51.5155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10+Harley+Street%2C+London+W1G+9PF!5e0!3m2!1sen!2suk!4v1",
    mapTitle: "Harley Street Wellness Locations",
    transport: [
      { mode: "🚇", text: "Oxford Circus (3 min walk) · Regent's Park (5 min walk)" },
      { mode: "🚌", text: "Bus routes: 88, 453, C2 — stop on Harley Street" },
    ],
  },
  glasgow: {
    slug: "glasgow",
    pathPrefix: "/glasgow",
    webhookPrefix: "glasgow-",
    brandName: "Harley Street Wellness",
    cityName: "Glasgow",
    locationHeading: "Find Us in Glasgow",
    locationSubheading:
      "Our Glasgow clinic in the heart of the Merchant City",
    clinicCountLabel: "1 Glasgow Clinic",
    phoneDisplay: "0141 488 8985",
    phoneHref: "01414888985",
    telephoneE164: "+44-141-488-8985",
    email: "hello@harleystreetmedicalwellness.co.uk",
    baseUrl: "https://harleystreetmedicalwellness.co.uk",
    // TODO: confirm Glasgow-specific Google reviews URL (reusing brand URL for now)
    reviewsUrl: "https://g.co/kgs/harleystreetwellness",
    reviewRating: "4.9",
    reviewCount: "200",
    clinics: [
      {
        name: "Ingram House Clinic",
        lines: ["5th Floor, Ingram House", "227 Ingram St", "Glasgow G1 1DA"],
      },
    ],
    schemaAddress: {
      streetAddress: "5th Floor, Ingram House, 227 Ingram St",
      addressLocality: "Glasgow",
      postalCode: "G1 1DA",
    },
    geo: { latitude: 55.8602, longitude: -4.2466 },
    mapEmbedUrl:
      "https://www.google.com/maps?q=227+Ingram+St,+Glasgow+G1+1DA&output=embed",
    mapTitle: "Harley Street Wellness — Glasgow",
    transport: [
      // TODO: confirm exact walking times
      { mode: "🚇", text: "Buchanan Street Subway (4 min walk)" },
      { mode: "🚆", text: "Glasgow Queen Street station (5 min walk)" },
    ],
  },
};

export function getLocation(slug: LocationSlug = "london"): Location {
  return locations[slug];
}

export function getLocationFromPath(pathname: string | null): Location {
  return pathname && pathname.startsWith("/glasgow")
    ? locations.glasgow
    : locations.london;
}
