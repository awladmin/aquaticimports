import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Search, UserCheck, UserX } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Trade users",
};

const USERS = [
  {
    name: "The Reef Shop",
    contact: "Jamie Roberts",
    email: "jamie@thereefshop.co.uk",
    status: "pending",
    joined: "2 hours ago",
  },
  {
    name: "Aquatic Dreams Ltd",
    contact: "Sarah Woolf",
    email: "sarah@aquaticdreams.co.uk",
    status: "active",
    joined: "11 Feb 2024",
  },
  {
    name: "Coral Cove Aquatics",
    contact: "Chris Patel",
    email: "chris@coralcove.co.uk",
    status: "active",
    joined: "4 Aug 2023",
  },
  {
    name: "Seahaven Pets",
    contact: "Tony Hirsch",
    email: "tony@seahavenpets.co.uk",
    status: "active",
    joined: "2 May 2022",
  },
  {
    name: "Riverside Aquaria",
    contact: "Mike Danvers",
    email: "mike@riversideaquaria.co.uk",
    status: "disabled",
    joined: "18 Sep 2021",
  },
  {
    name: "Neptune Aquatics",
    contact: "Lisa Okonkwo",
    email: "lisa@neptuneaquatics.co.uk",
    status: "active",
    joined: "14 Dec 2020",
  },
];

export default function AdminUsersPage() {
  const pending = USERS.filter((u) => u.status === "pending").length;

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Trade users
          </h1>
          <p className="text-sm text-muted-foreground">
            {USERS.length} accounts · {pending} awaiting approval
          </p>
        </div>
        <Button className="bg-brand-500 text-white hover:bg-brand-600">
          Invite user
        </Button>
      </header>

      {pending > 0 && (
        <Card className="border-amber-200 bg-amber-50/60">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white">
                <UserCheck className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium text-amber-900">
                  {pending} application awaiting approval
                </p>
                <p className="text-xs text-amber-800/80">
                  New signups can&apos;t see stock lists until approved.
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300">
              Review
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/70">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-border/60 p-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search users…" className="pl-9" />
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Business</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.contact}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.email}
                    </TableCell>
                    <TableCell>
                      {u.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-amber-800"
                        >
                          Pending
                        </Badge>
                      )}
                      {u.status === "active" && (
                        <Badge
                          variant="outline"
                          className="border-brand-200 bg-brand-50 text-brand-800"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      )}
                      {u.status === "disabled" && (
                        <Badge variant="outline" className="text-muted-foreground">
                          <UserX className="mr-1 h-3 w-3" />
                          Disabled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {u.joined}
                    </TableCell>
                    <TableCell className="text-right">
                      {u.status === "pending" ? (
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            className="h-7 bg-brand-500 text-white hover:bg-brand-600"
                          >
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-7">
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-7">
                          Manage
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
