import { SUPPLIERS } from "./suppliers";

export type ArrivalDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export type ScheduleEntry = {
  supplierSlug: string;
  arrives: ArrivalDay;
  detail: string;
  deadline: string;
  available: boolean;
};

export const CURRENT_WEEK_COMMENCING = "2026-04-20";

export const CURRENT_SCHEDULE: ScheduleEntry[] = [
  {
    supplierSlug: "indonesia-plants",
    arrives: "Tuesday",
    detail: "Bucephalandra, Anubias, Cryptocoryne and rare tissue culture.",
    deadline: "Monday 9am",
    available: true,
  },
  {
    supplierSlug: "indonesia-growers-mix",
    arrives: "Tuesday",
    detail: "Weekly rotating growers' mix, tetras, barbs, loaches, oddballs.",
    deadline: "Monday 9am",
    available: true,
  },
  {
    supplierSlug: "brazil-para",
    arrives: "Wednesday",
    detail: "Wild plecos, Amazonian characins, seasonal freshwater stingrays.",
    deadline: "Tuesday 9pm",
    available: true,
  },
  {
    supplierSlug: "colombia",
    arrives: "Wednesday",
    detail:
      "Cardinal tetras in volume, Orinoco oddballs, altum angelfish (limited).",
    deadline: "Tuesday 9pm",
    available: true,
  },
  {
    supplierSlug: "asian-arowana",
    arrives: "Wednesday",
    detail: "CITES arowana, pre-order only. Please confirm by Tuesday.",
    deadline: "Tuesday 9pm",
    available: false,
  },
  {
    supplierSlug: "peru",
    arrives: "Thursday",
    detail:
      "Wild Corydoras, tetras and small plecos. Strong Cory range this week.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "china-goldfish",
    arrives: "Thursday",
    detail: "Ranchu, oranda, butterfly-tail. Show-grade available.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "congo",
    arrives: "Thursday",
    detail:
      "Wild Congo tetras (large), buffalo head cichlids, upside-down cats.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "singapore-plants",
    arrives: "Thursday",
    detail: "Nursery-grown plants, carpet species, tissue culture.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "singapore-ornamental",
    arrives: "Thursday",
    detail: "Shrimp, nano fish, ornamental tropicals.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "sri-lanka-negombo-marine",
    arrives: "Thursday",
    detail: "Reef fish, hard and soft corals, Negombo reef.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "sri-lanka-freshwater",
    arrives: "Thursday",
    detail: "Endemic Sri Lankan barbs, loaches, rasboras.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "jakarta-marine-soft",
    arrives: "Thursday",
    detail: "Soft coral frags, zoas, palythoa, mushrooms, leathers.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "jakarta-marine-hard",
    arrives: "Thursday",
    detail: "SPS and LPS colonies, Acropora, Montipora, Euphyllia.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "jakarta-marine-fish",
    arrives: "Thursday",
    detail: "Reef fish, tangs, wrasses, angels, gobies.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "lucerne-philippines",
    arrives: "Thursday",
    detail: "Philippine reef fish, clowns, dottybacks, damsels.",
    deadline: "Wednesday 4pm",
    available: true,
  },
  {
    supplierSlug: "thai-plants",
    arrives: "Friday",
    detail: "Farm-raised plants, limited fancy guppies.",
    deadline: "Thursday 4pm",
    available: true,
  },
  {
    supplierSlug: "malaysia-discus",
    arrives: "Friday",
    detail: "Discus, all sizes and strains, some adult show-grade.",
    deadline: "Thursday 4pm",
    available: true,
  },
  {
    supplierSlug: "miami-freshwater",
    arrives: "Friday",
    detail: "Farm-bred freshwater, angels, gouramis, swordtails, platies.",
    deadline: "Thursday 4pm",
    available: true,
  },
  {
    supplierSlug: "lagos-nigeria",
    arrives: "Friday",
    detail: "Seasonal West African, killifish, mormyrids, elephant-nose.",
    deadline: "Thursday 4pm",
    available: false,
  },
  {
    supplierSlug: "japan-koi",
    arrives: "Friday",
    detail: "Koi to order, 20cm through to show pedigree. Contact for list.",
    deadline: "Thursday 9am",
    available: true,
  },
];

export const DAY_ORDER: Record<ArrivalDay, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

export function scheduleWithSuppliers() {
  return CURRENT_SCHEDULE.map((entry) => {
    const supplier = SUPPLIERS.find((s) => s.slug === entry.supplierSlug);
    return { ...entry, supplier };
  }).sort((a, b) => {
    const d = DAY_ORDER[a.arrives] - DAY_ORDER[b.arrives];
    if (d !== 0) return d;
    return (a.supplier?.name ?? "").localeCompare(b.supplier?.name ?? "");
  });
}
