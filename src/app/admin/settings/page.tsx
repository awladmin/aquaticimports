import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Company details, contact info, and site-wide options.
        </p>
      </header>

      <Card className="border-border/70">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input
              id="companyName"
              defaultValue="Independent Aquatic Imports Ltd"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="+44 (0)1753 687050" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="info@aquaticimports.com" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Registered address</Label>
            <Textarea
              id="address"
              rows={4}
              defaultValue={
                "Unit 2, Trident Industrial Estate\nBlackthorne Road, Colnbrook\nSlough, Berkshire SL3 0AX\nUnited Kingdom"
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-brand-500 text-white hover:bg-brand-600">
          Save changes
        </Button>
      </div>
    </div>
  );
}
