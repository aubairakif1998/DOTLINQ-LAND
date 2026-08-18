"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { joinWaitlist } from "@/lib/config";
import { trackLandingEvent } from "@/lib/analytics";
import { BRAND } from "@/lib/brand";

type WaitlistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const emptyForm = {
  name: "",
  email: "",
  company: "",
  roleTitle: "",
  notes: "",
  website: "",
};

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ message: string } | null>(null);

  const reset = () => {
    setForm(emptyForm);
    setError(null);
    setDone(null);
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await joinWaitlist({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        roleTitle: form.roleTitle.trim() || undefined,
        notes: form.notes.trim() || undefined,
        website: form.website,
        source: "landing",
      });
      void trackLandingEvent("waitlist_submit");
      setDone({ message: result.message });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-5 sm:max-w-md">
        {done ? (
          <div className="py-2 text-center sm:text-left">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-[#0B1220] text-white sm:mx-0">
              <CheckCircle2 className="size-6" />
            </div>
            <DialogHeader>
              <DialogTitle>You&apos;re on the list</DialogTitle>
              <DialogDescription className="pt-2">
                {done.message}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                className="h-11 rounded-md bg-[#0B1220] text-white hover:bg-[#152033]"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <DialogHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#0B1220] text-white">
                <Mail className="size-5" />
              </div>
              <DialogTitle>Join the DotLinQ waitlist</DialogTitle>
              <DialogDescription>
                {BRAND.name} is in active development. Share your details for
                invitation when early access opens. Live demos are not offered
                at this stage.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5">
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist-name">Name</Label>
                <Input
                  id="waitlist-name"
                  required
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  disabled={submitting}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist-email">Work email</Label>
                <Input
                  id="waitlist-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  disabled={submitting}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="waitlist-company">
                    Company{" "}
                    <span className="font-normal text-[#94A3B8]">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="waitlist-company"
                    autoComplete="organization"
                    placeholder="Acme Logistics"
                    value={form.company}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company: e.target.value }))
                    }
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="waitlist-role">
                    Role{" "}
                    <span className="font-normal text-[#94A3B8]">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="waitlist-role"
                    placeholder="Integration lead"
                    value={form.roleTitle}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, roleTitle: e.target.value }))
                    }
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist-notes">
                  What are you looking to connect?{" "}
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </Label>
                <Textarea
                  id="waitlist-notes"
                  placeholder="Partner networks, systems of record, APIs…"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  disabled={submitting}
                />
              </div>

              {/* Honeypot — hidden from people, visible to basic bots */}
              <div
                className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
                aria-hidden
              >
                <Label htmlFor="waitlist-website">Website</Label>
                <Input
                  id="waitlist-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, website: e.target.value }))
                  }
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md"
                disabled={submitting}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="h-11 rounded-md bg-[var(--brand-navy)] text-white shadow-sm hover:bg-[#132338]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Joining…
                  </>
                ) : (
                  "Request access"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
