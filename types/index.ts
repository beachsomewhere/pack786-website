// ---------------------------------------------------------------------------
// Core data models for Pack 786's website.
// Public types (safe to use in client components) vs. Private types (server /
// admin only) are separated so it's easy to see what must never reach a
// public page or API response.
// ---------------------------------------------------------------------------

export type EventCategory =
  | "Pack Event"
  | "Pack Meeting"
  | "Den Meeting"
  | "Camping"
  | "Service Project"
  | "Fundraiser"
  | "Leadership Meeting"
  | "Training";

export type EventStatus =
  | "Draft"
  | "Tentative"
  | "Confirmed"
  | "Registration Open"
  | "Registration Closed"
  | "Completed"
  | "Postponed"
  | "Canceled";

export type ProgramYear = "2025-2026" | "2026-2027" | "Archived";

export type Den = "Lion" | "Tiger" | "Wolf" | "Bear" | "Webelos" | "Arrow of Light" | "All Dens";

/** Public event record — safe to render on any public page. */
export interface PackEvent {
  slug: string;
  name: string;
  category: EventCategory;
  programYear: ProgramYear;
  status: EventStatus;
  date: string; // ISO date, or a date-range string like "2026-06-19/2026-06-21"
  dateLabel: string; // human label as it appeared on the source calendar, e.g. "TBD; March"
  startTime?: string;
  endTime?: string;
  location?: string;
  address?: string;
  mapUrl?: string;
  description?: string;
  audience?: string;
  den?: Den;
  registrationLink?: string;
  registrationDeadline?: string;
  capacity?: number;
  cost?: string;
  organizer?: string;
  volunteerNeeds?: string;
  packingList?: string[];
  mealDetails?: string;
  weatherNotes?: string;
  accessibilityNotes?: string;
  requiredForms?: string[];
  notes?: string;
  featured?: boolean;
  confirmed: boolean; // true only when an admin has explicitly marked it Confirmed
}

/** Private registration record — admin/server only, never sent to public pages. */
export interface EventRegistration {
  id: string;
  eventSlug: string;
  familyName: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  attendingAdults: string[];
  attendingChildren: { name: string; age: number; den?: Den }[];
  den?: Den;
  totalAttending: number;
  dietaryRestrictions?: string;
  allergies?: string;
  emergencyContact: { name: string; phone: string; relationship: string };
  volunteerInterest?: string;
  itemsBringing?: string;
  paymentStatus: "Not Required" | "Pending" | "Paid" | "Waived";
  internalNotes?: string;
  submittedAt: string;
}

export interface RecruitmentInquiry {
  id: string;
  guardianName: string;
  email: string;
  phone: string;
  childName: string;
  childGrade: string;
  childSchool: string;
  preferredContact: "Email" | "Phone" | "Text";
  message?: string;
  consentToContact: boolean;
  submittedAt: string;
  status: "New" | "Contacted" | "Visited a Meeting" | "Joined" | "Closed";
}

export interface VolunteerSignup {
  id: string;
  name: string;
  email: string;
  phone: string;
  childDen?: Den;
  areasOfInterest: string[];
  availability: string;
  skills?: string;
  interestedInLeadership: boolean;
  submittedAt: string;
}

export type AdminRole = "Site Administrator" | "Pack Leader" | "Event Coordinator";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  body: string;
  expirationDate?: string;
  link?: string;
  urgent: boolean;
}

export interface DocumentResource {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  updatedAt: string;
  archived: boolean;
}
