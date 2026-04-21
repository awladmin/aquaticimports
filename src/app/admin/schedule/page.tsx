import { SUPPLIERS } from "@/data/suppliers";
import { scheduleWithSuppliers, CURRENT_WEEK_COMMENCING, type ArrivalDay } from "@/data/schedule";
import { ScheduleBuilder } from "./schedule-builder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Import schedule",
};

const DAYS: ArrivalDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function AdminSchedulePage() {
  const entries = scheduleWithSuppliers();
  return (
    <ScheduleBuilder
      weekCommencing={CURRENT_WEEK_COMMENCING}
      days={DAYS}
      entries={entries.map((e) => ({
        supplierSlug: e.supplierSlug,
        supplierName: e.supplier?.name ?? e.supplierSlug,
        country: e.supplier?.country ?? "",
        countryCode: e.supplier?.countryCode ?? "",
        arrives: e.arrives,
        detail: e.detail,
        deadline: e.deadline,
        available: e.available,
      }))}
      supplierOptions={SUPPLIERS.map((s) => ({
        slug: s.slug,
        name: s.name,
        country: s.country,
        countryCode: s.countryCode,
      }))}
    />
  );
}
