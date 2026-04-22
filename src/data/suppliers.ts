export type Supplier = {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  categories: string[];
  summary: string;
  description: string;
  stockListFile: string;
  stockListUpdatedAt: string;
  imageQuery: string;
  featured?: boolean;
};

export const SUPPLIERS: Supplier[] = [
  {
    slug: "sri-lanka-negombo-marine",
    name: "Negombo Marine",
    country: "Sri Lanka",
    countryCode: "LK",
    categories: ["Marine", "Hard Corals", "Soft Corals"],
    summary:
      "Sustainably collected reef fish, hard corals and soft corals from the Negombo reef system.",
    description:
      "Negombo Marine has supplied us with quality marine livestock for over a decade. Their dive teams work to strict sustainability quotas and all livestock is acclimatised at their holding facility before shipment.",
    stockListFile: "Negombo-Marine-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "tropical-reef-sri-lanka",
    featured: true,
  },
  {
    slug: "indonesia-plants",
    name: "Indonesia Plants",
    country: "Indonesia",
    countryCode: "ID",
    categories: ["Plants", "Freshwater"],
    summary:
      "Bucephalandra, Anubias, Cryptocoryne and a rotating selection of rare aquatic plants.",
    description:
      "A long-standing plant nursery producing tissue-cultured and farm-grown aquatic plants. Excellent Bucephalandra range.",
    stockListFile: "Indonesia-Plants-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "aquarium-plants-bucephalandra",
    featured: true,
  },
  {
    slug: "indonesia-growers-mix",
    name: "Indonesia Growers Mix",
    country: "Indonesia",
    countryCode: "ID",
    categories: ["Freshwater", "Oddballs"],
    summary:
      "A weekly rotating grower's mix, tetras, barbs, loaches and the occasional oddball.",
    description:
      "Our 'growers mix' box is a favourite with independent shops. Selection varies week to week based on availability.",
    stockListFile: "Indonesia-Growers-Mix-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "tropical-fish-tank-community",
  },
  {
    slug: "singapore-plants",
    name: "Singapore Plants",
    country: "Singapore",
    countryCode: "SG",
    categories: ["Plants", "Freshwater"],
    summary:
      "Premium nursery-grown aquatic plants, stems, swords, carpet species and rare tissue culture.",
    description:
      "Consistent quality nursery-grown plants from one of the most established aquatic plant farms in Southeast Asia.",
    stockListFile: "Singapore-Plants-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "aquascaping-plants-nursery",
    featured: true,
  },
  {
    slug: "thai-plants",
    name: "Thai Plants",
    country: "Thailand",
    countryCode: "TH",
    categories: ["Plants", "Freshwater"],
    summary: "Farm-raised aquatic plants and a small selection of fancy guppies.",
    description:
      "Thailand's oldest commercial aquatic plant farm. Reliable, affordable and an excellent entry-level plant list.",
    stockListFile: "Thai-Plants-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "thai-aquatic-plant-farm",
  },
  {
    slug: "brazil-para",
    name: "Brazil Para",
    country: "Brazil",
    countryCode: "BR",
    categories: ["Freshwater", "Wild-caught", "Plecos"],
    summary: "Wild-caught plecos, catfish, tetras and stingrays from the Para region.",
    description:
      "Specialist wild Amazonian imports, L-number plecos, characins and occasional freshwater stingrays (subject to CITES).",
    stockListFile: "Brazil-Para-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "amazon-river-pleco",
    featured: true,
  },
  {
    slug: "asian-arowana",
    name: "Asian Arowana",
    country: "Singapore",
    countryCode: "SG",
    categories: ["Premium", "Freshwater"],
    summary: "CITES-registered Asian arowana in Red, Golden and Crossback varieties.",
    description:
      "All fish are CITES-certified, microchipped and come with full documentation. By pre-order only.",
    stockListFile: "Asian-Arowana-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "red-asian-arowana",
  },
  {
    slug: "china-goldfish",
    name: "China",
    country: "China",
    countryCode: "CN",
    categories: ["Goldfish", "Coldwater"],
    summary: "Premium ranchu, oranda and butterfly-tail goldfish from specialist farms.",
    description:
      "Hand-selected show-quality goldfish. Sizes from small through to collector-grade.",
    stockListFile: "China-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "oranda-goldfish-ranchu",
  },
  {
    slug: "colombia",
    name: "Colombia",
    country: "Colombia",
    countryCode: "CO",
    categories: ["Freshwater", "Wild-caught"],
    summary:
      "Wild-caught tetras, catfish and oddballs from the Orinoco and Rio Meta basins.",
    description:
      "Strong selection of cardinal tetras, altum angelfish (seasonal) and peaceful oddballs.",
    stockListFile: "Colombia-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "cardinal-tetra-amazon",
  },
  {
    slug: "congo",
    name: "Congo",
    country: "DR Congo",
    countryCode: "CD",
    categories: ["Freshwater", "Wild-caught", "African"],
    summary: "Wild-caught West African cichlids, Congo tetras and specialist species.",
    description:
      "Hard-to-source West African river fish, large Congo tetras, buffalo head cichlids, upside-down catfish.",
    stockListFile: "Congo-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "congo-tetra-african-cichlid",
  },
  {
    slug: "czech-republic-cichlids",
    name: "Czech Republic Cichlids & Specials",
    country: "Czech Republic",
    countryCode: "CZ",
    categories: ["Freshwater", "Cichlids"],
    summary: "European-bred Central American cichlids and hard-to-find specials.",
    description:
      "Captive-bred stock from a small family farm, excellent quality, tank-raised, easy to ship.",
    stockListFile: "Czech-Republic-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "central-american-cichlid",
  },
  {
    slug: "guinea",
    name: "Guinea",
    country: "Guinea",
    countryCode: "GN",
    categories: ["Freshwater", "Wild-caught", "African"],
    summary: "Seasonal West African imports, killifish, tetras and cichlids.",
    description:
      "Small-batch wild imports, availability varies by weather and the local collection schedule.",
    stockListFile: "Guinea-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "killifish-west-africa",
  },
  {
    slug: "czech-republic-oddball",
    name: "Czech Republic Oddball Scatters",
    country: "Czech Republic",
    countryCode: "CZ",
    categories: ["Freshwater", "Oddballs"],
    summary: "Captive-bred oddball scatter species, rare livebearers and wild-strain guppies.",
    description:
      "Tank-raised oddballs from a specialist European breeder, great for retailers wanting something different.",
    stockListFile: "CZ-Oddball-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "rare-livebearer-guppy",
  },
  {
    slug: "peru",
    name: "Peru",
    country: "Peru",
    countryCode: "PE",
    categories: ["Freshwater", "Wild-caught"],
    summary: "Wild-caught Amazonian tetras, Corydoras and plecos from the Peruvian Amazon.",
    description:
      "Strong Corydoras range, many rare species not commonly seen elsewhere in the trade.",
    stockListFile: "Peru-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "corydoras-catfish-amazon",
  },
  {
    slug: "malaysia-discus",
    name: "Malaysian Discus",
    country: "Malaysia",
    countryCode: "MY",
    categories: ["Premium", "Freshwater"],
    summary: "Farm-raised discus in all classic strains, pigeon blood, red melon, blue diamond.",
    description:
      "Sizes from 2\" through to show-grade adults. All fish quarantined for 10 days before release.",
    stockListFile: "Malaysia-Discus-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "discus-fish-aquarium",
    featured: true,
  },
  {
    slug: "miami-freshwater",
    name: "Miami Freshwater",
    country: "USA",
    countryCode: "US",
    categories: ["Freshwater", "Farm-bred"],
    summary: "Farm-bred freshwater tropicals, angels, gouramis, swordtails, platies.",
    description:
      "Reliable bread-and-butter stock, the species every aquatic retailer needs every week.",
    stockListFile: "Miami-Freshwater-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "freshwater-angelfish",
  },
  {
    slug: "singapore-ornamental",
    name: "Singapore Ornamental",
    country: "Singapore",
    countryCode: "SG",
    categories: ["Freshwater", "Farm-bred"],
    summary: "Ornamental tropicals, shrimp and nano species from Singapore's specialist farms.",
    description:
      "Excellent shrimp range, crystal red, taiwan bee and neocaridina colour forms.",
    stockListFile: "Singapore-Ornamental-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "crystal-red-shrimp",
  },
  {
    slug: "jakarta-marine-soft",
    name: "Jakarta Marine Soft Corals",
    country: "Indonesia",
    countryCode: "ID",
    categories: ["Marine", "Soft Corals"],
    summary: "Soft coral frags and colonies, leathers, zoas, palythoa and mushrooms.",
    description:
      "Specialist soft coral farm, cultured frags with excellent colouration.",
    stockListFile: "Jakarta-Soft-Corals-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "soft-coral-zoanthid",
  },
  {
    slug: "jakarta-marine-hard",
    name: "Jakarta Marine Hard Corals",
    country: "Indonesia",
    countryCode: "ID",
    categories: ["Marine", "Hard Corals"],
    summary: "SPS and LPS hard coral colonies, Acropora, Montipora, Euphyllia, Duncans.",
    description:
      "Licensed collection and aquacultured frags, full CITES documentation.",
    stockListFile: "Jakarta-Hard-Corals-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "acropora-coral-reef",
  },
  {
    slug: "jakarta-marine-fish",
    name: "Jakarta Marine Fish",
    country: "Indonesia",
    countryCode: "ID",
    categories: ["Marine", "Reef Fish"],
    summary: "Reef fish, tangs, wrasses, angels, gobies and a rotating rare species list.",
    description:
      "Healthy, well-acclimatised reef fish from a specialist collector network.",
    stockListFile: "Jakarta-Fish-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "tang-reef-fish-angel",
  },
  {
    slug: "lagos-nigeria",
    name: "Lagos Nigeria",
    country: "Nigeria",
    countryCode: "NG",
    categories: ["Freshwater", "Wild-caught", "African"],
    summary: "Wild West African imports, killifish, mormyrids, elephant-nose and puffers.",
    description:
      "Seasonal wild collection, availability varies. Strong killifish range in season.",
    stockListFile: "Lagos-Nigeria-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "elephant-nose-fish-mormyrid",
  },
  {
    slug: "japan-koi",
    name: "Japan",
    country: "Japan",
    countryCode: "JP",
    categories: ["Coldwater", "Premium"],
    summary: "Japanese koi, ranchu goldfish and premium pond stock, available to order.",
    description:
      "Direct from recognised Niigata and Hiroshima breeders. Full pedigree and veterinary documentation.",
    stockListFile: "Japan-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "japanese-koi-carp-pond",
  },
  {
    slug: "lucerne-philippines",
    name: "Luzon Philippines",
    country: "Philippines",
    countryCode: "PH",
    categories: ["Marine", "Reef Fish"],
    summary: "Reef fish, clownfish, dottybacks, damsels, wrasses, seasonal rare catch.",
    description:
      "Established collector network on Luzon, strong and consistent weekly list.",
    stockListFile: "Luzon-Philippines-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "clownfish-anemone-reef",
  },
  {
    slug: "sri-lanka-freshwater",
    name: "Sri Lanka Freshwater",
    country: "Sri Lanka",
    countryCode: "LK",
    categories: ["Freshwater", "Wild-caught"],
    summary: "Endemic Sri Lankan barbs, loaches and rasboras.",
    description:
      "Small-scale wild collection of endemic species, many unique to Sri Lanka.",
    stockListFile: "Sri-Lanka-Freshwater-2026-04-21.xlsx",
    stockListUpdatedAt: "2026-04-21",
    imageQuery: "cherry-barb-sri-lanka-loach",
  },
];

export const ALL_COUNTRIES = Array.from(
  new Set(SUPPLIERS.map((s) => s.country))
).sort();

export const ALL_CATEGORIES = Array.from(
  new Set(SUPPLIERS.flatMap((s) => s.categories))
).sort();

export function getSupplier(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}
