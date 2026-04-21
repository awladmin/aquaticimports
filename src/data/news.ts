export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  author: string;
  tag: "Announcement" | "Supplier" | "Trade" | "Logistics";
};

export const NEWS: NewsPost[] = [
  {
    slug: "spring-2026-wild-amazonian-arrivals",
    title: "Spring 2026 wild Amazonian arrivals",
    excerpt:
      "Water levels are right and the Para and Peru collections are flowing. Expect strong Cory and pleco lists for the next six weeks.",
    body: "Water conditions in the Para and Peruvian Amazon are ideal this season. Our collection teams report strong availability of L-number plecos and an unusually wide Corydoras selection — including a few rarely-seen species. Weekly lists will be longer than usual and we strongly recommend pre-ordering, as demand is high and some species are only available in small batches.",
    publishedAt: "2026-04-15",
    author: "Colin",
    tag: "Supplier",
  },
  {
    slug: "cites-update-2026",
    title: "CITES documentation update for 2026",
    excerpt:
      "New stamped CITES paperwork from April — your dropbox will be included automatically with marine and arowana orders.",
    body: "From 1 April 2026 all CITES-listed species ship with updated stamped paperwork. This affects Asian arowana, stingrays and a number of marine species. You don't need to do anything differently — the documentation will be included automatically with your delivery. Please file these copies for your own records as Border Force checks are becoming more frequent.",
    publishedAt: "2026-04-01",
    author: "Colin",
    tag: "Trade",
  },
  {
    slug: "bank-holiday-schedule-may-2026",
    title: "May 2026 bank holiday shipping schedule",
    excerpt:
      "Two bank holidays this month. Revised arrival days for the weeks commencing 4 May and 25 May.",
    body: "Because of the early and late May bank holidays, the arrival schedule shifts by one day for the weeks commencing 4 May and 25 May. Tuesday arrivals become Wednesday, Wednesday becomes Thursday, and so on. The order deadlines shift by the same amount. A revised schedule is on the Shipment Schedule page — if in doubt give us a call.",
    publishedAt: "2026-03-22",
    author: "Colin",
    tag: "Logistics",
  },
  {
    slug: "new-supplier-czech-oddball-scatters",
    title: "New supplier: Czech Oddball Scatters",
    excerpt:
      "We've added a small European breeder specialising in oddball livebearers and wild-strain guppies — first list now live.",
    body: "We're pleased to announce a new supplier: Czech Oddball Scatters. This is a small family operation in the Czech Republic that specialises in hard-to-find wild-strain livebearers and oddball scatter species. Their first list is live on the site — quantities are small but quality is excellent, and it's a great range for retailers looking for something different on the shelf.",
    publishedAt: "2026-03-10",
    author: "Colin",
    tag: "Announcement",
  },
];

export function getNewsPost(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}
