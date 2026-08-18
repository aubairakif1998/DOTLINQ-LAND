export type WaitlistEntry = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  roleTitle: string | null;
  notes: string | null;
  source: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
};

export type JoinWaitlistInput = {
  email: string;
  name: string;
  company?: string;
  roleTitle?: string;
  notes?: string;
  source?: string;
  website?: string;
  ipAddress?: string;
  userAgent?: string;
};

export type JoinWaitlistResult = {
  alreadyJoined: boolean;
  message: string;
};

export type LandingEventType = 'page_view' | 'waitlist_open' | 'waitlist_submit';

export type LandingEventInput = {
  sessionId: string;
  eventType: LandingEventType;
  path?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingUrl?: string;
};

export type AnalyticsSummary = {
  waitlistSignups: number;
  pageViews: number;
  waitlistOpens: number;
  waitlistSubmitsTracked: number;
  uniqueSessions: number;
  signupsLast7Days: number;
  signupsLast30Days: number;
};
