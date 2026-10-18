import { enquiryOptions } from '@/data/machinery';

/**
 * Enquiry field rules in plain TypeScript, so the browser gets instant feedback
 * without shipping Zod. lib/enquiry-schema.ts (server only) builds its Zod
 * schema from the same limits, pattern and messages, so the two cannot drift.
 */
export type EnquiryField = 'name' | 'company' | 'phone' | 'email' | 'machinery' | 'message';
export type EnquiryValues = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const limits = { nameMin: 2, nameMax: 120, companyMax: 160, messageMin: 15, messageMax: 3000 } as const;
export const phonePattern = /^\+?[0-9][0-9\s-]{7,18}$/;
// Practical check only; the server's Zod email validator is authoritative.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const messages = {
  nameShort: 'Enter your name.',
  nameLong: 'Name is too long.',
  companyLong: 'Company name is too long.',
  phone: 'Enter a phone number with country or STD code, e.g. +91 98765 43210.',
  email: 'Enter a valid email address, or leave it empty.',
  machinery: 'Choose the machinery you are enquiring about.',
  messageShort: 'Describe your requirement in a little more detail (material, capacity, length or height).',
  messageLong: 'Please keep the description under 3000 characters.',
} as const;

export const machineryValues = enquiryOptions.map((o) => o.value) as [string, ...string[]];

export function validateEnquiry(raw: EnquiryValues): { values: EnquiryValues; errors: EnquiryErrors } {
  const v = Object.fromEntries(Object.entries(raw).map(([k, s]) => [k, s.trim()])) as EnquiryValues;
  const e: EnquiryErrors = {};
  if (v.name.length < limits.nameMin) e.name = messages.nameShort;
  else if (v.name.length > limits.nameMax) e.name = messages.nameLong;
  if (v.company.length > limits.companyMax) e.company = messages.companyLong;
  if (!phonePattern.test(v.phone)) e.phone = messages.phone;
  if (v.email && !emailPattern.test(v.email)) e.email = messages.email;
  if (!machineryValues.includes(v.machinery)) e.machinery = messages.machinery;
  if (v.message.length < limits.messageMin) e.message = messages.messageShort;
  else if (v.message.length > limits.messageMax) e.message = messages.messageLong;
  return { values: v, errors: e };
}
