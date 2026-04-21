"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flagEmoji } from "@/lib/country";
import {
  Plus,
  Trash2,
  Save,
  Copy,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type Entry = {
  supplierSlug: string;
  supplierName: string;
  country: string;
  countryCode: string;
  arrives: Day;
  detail: string;
  deadline: string;
  available: boolean;
};

type SupplierOption = {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
};

export function ScheduleBuilder({
  weekCommencing,
  days,
  entries: initial,
  supplierOptions,
}: {
  weekCommencing: string;
  days: Day[];
  entries: Entry[];
  supplierOptions: SupplierOption[];
}) {
  const [entries, setEntries] = useState<Entry[]>(initial);
  const [addingFor, setAddingFor] = useState<Day | null>(null);
  const [newSupplierSlug, setNewSupplierSlug] = useState<string>("");

  const weekDate = new Date(weekCommencing).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const grouped = useMemo(() => {
    const out: Record<Day, Entry[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };
    for (const e of entries) out[e.arrives].push(e);
    return out;
  }, [entries]);

  function remove(slug: string, day: Day) {
    setEntries((prev) =>
      prev.filter((e) => !(e.supplierSlug === slug && e.arrives === day))
    );
    toast.success("Removed from schedule");
  }

  function addToDay(day: Day) {
    const s = supplierOptions.find((o) => o.slug === newSupplierSlug);
    if (!s) return;
    if (entries.some((e) => e.supplierSlug === s.slug && e.arrives === day)) {
      toast.error("Already on the schedule for that day");
      return;
    }
    setEntries((prev) => [
      ...prev,
      {
        supplierSlug: s.slug,
        supplierName: s.name,
        country: s.country,
        countryCode: s.countryCode,
        arrives: day,
        detail: "",
        deadline: defaultDeadline(day),
        available: true,
      },
    ]);
    setAddingFor(null);
    setNewSupplierSlug("");
    toast.success(`${s.name} added to ${day}`);
  }

  function update<K extends keyof Entry>(
    slug: string,
    day: Day,
    key: K,
    value: Entry[K]
  ) {
    setEntries((prev) =>
      prev.map((e) =>
        e.supplierSlug === slug && e.arrives === day
          ? { ...e, [key]: value }
          : e
      )
    );
  }

  function publish() {
    toast.success("Schedule published", {
      description: `${entries.length} arrivals · trade users notified`,
    });
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Import schedule
          </h1>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Week commencing {weekDate}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" aria-label="Previous week">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Next week">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.info("Copied last week to this week")}
          >
            <Copy className="mr-1 h-4 w-4" />
            Duplicate last week
          </Button>
          <Button
            size="sm"
            onClick={publish}
            className="bg-brand-500 text-white hover:bg-brand-600"
          >
            <Save className="mr-1 h-4 w-4" />
            Publish schedule
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <DayColumn
            key={day}
            day={day}
            entries={grouped[day]}
            onRemove={remove}
            onUpdate={update}
            onAdd={() => setAddingFor(day)}
            addingFor={addingFor}
            newSupplierSlug={newSupplierSlug}
            setNewSupplierSlug={setNewSupplierSlug}
            supplierOptions={supplierOptions}
            addToDay={() => addToDay(day)}
            onCancelAdd={() => {
              setAddingFor(null);
              setNewSupplierSlug("");
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DayColumn({
  day,
  entries,
  onRemove,
  onUpdate,
  onAdd,
  addingFor,
  newSupplierSlug,
  setNewSupplierSlug,
  supplierOptions,
  addToDay,
  onCancelAdd,
}: {
  day: Day;
  entries: Entry[];
  onRemove: (slug: string, day: Day) => void;
  onUpdate: <K extends keyof Entry>(
    slug: string,
    day: Day,
    key: K,
    value: Entry[K]
  ) => void;
  onAdd: () => void;
  addingFor: Day | null;
  newSupplierSlug: string;
  setNewSupplierSlug: React.Dispatch<React.SetStateAction<string>>;
  supplierOptions: SupplierOption[];
  addToDay: () => void;
  onCancelAdd: () => void;
}) {
  const isAdding = addingFor === day;
  const available = entries.filter((e) => e.available).length;
  return (
    <Card className="border-border/70">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">{day}</h3>
            <p className="text-xs text-muted-foreground">
              {entries.length} {entries.length === 1 ? "arrival" : "arrivals"}
              {entries.length > 0 && ` · ${available} live`}
            </p>
          </div>
          <Button size="icon" variant="ghost" onClick={onAdd} aria-label="Add">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {entries.length === 0 && !isAdding && (
            <p className="rounded-md bg-muted/50 px-3 py-6 text-center text-xs text-muted-foreground">
              No arrivals. Click + to add.
            </p>
          )}

          {entries.map((e) => (
            <div
              key={`${e.supplierSlug}-${e.arrives}`}
              className="group rounded-lg border border-border/60 bg-background p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-base leading-none">
                    {flagEmoji(e.countryCode)}
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {e.supplierName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {e.country}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  onClick={() => onRemove(e.supplierSlug, e.arrives)}
                  aria-label="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>

              <Input
                value={e.deadline}
                onChange={(ev) =>
                  onUpdate(e.supplierSlug, e.arrives, "deadline", ev.target.value)
                }
                placeholder="Deadline"
                className="mt-2 h-8 text-xs"
              />

              <div className="mt-2 flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Checkbox
                    checked={e.available}
                    onCheckedChange={(checked) =>
                      onUpdate(
                        e.supplierSlug,
                        e.arrives,
                        "available",
                        checked === true
                      )
                    }
                  />
                  Available
                </label>
                {!e.available && (
                  <Badge variant="secondary" className="text-[10px]">
                    Pre-order
                  </Badge>
                )}
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="rounded-lg border border-dashed border-brand-400 bg-brand-50/60 p-3">
              <Select
                value={newSupplierSlug}
                onValueChange={(v) => setNewSupplierSlug(v ?? "")}
              >
                <SelectTrigger className="h-9 w-full text-xs">
                  <SelectValue placeholder="Pick a supplier…" />
                </SelectTrigger>
                <SelectContent>
                  {supplierOptions.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {flagEmoji(s.countryCode)} {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex gap-1.5">
                <Button
                  size="sm"
                  className="flex-1 bg-brand-500 text-white hover:bg-brand-600"
                  onClick={addToDay}
                  disabled={!newSupplierSlug}
                >
                  Add
                </Button>
                <Button size="sm" variant="ghost" onClick={onCancelAdd}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function defaultDeadline(day: Day): string {
  const map: Record<Day, string> = {
    Monday: "Friday 4pm",
    Tuesday: "Monday 9am",
    Wednesday: "Tuesday 9pm",
    Thursday: "Wednesday 4pm",
    Friday: "Thursday 4pm",
  };
  return map[day];
}
