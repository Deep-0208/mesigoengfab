import { z } from 'zod';
import { limits, machineryValues, messages, phonePattern } from './enquiry-rules';

/** Authoritative server-side check for /api/enquiry/. Built from the same rules the form uses. */
export const enquirySchema = z.object({
  name: z.string().trim().min(limits.nameMin, messages.nameShort).max(limits.nameMax, messages.nameLong),
  company: z.string().trim().max(limits.companyMax, messages.companyLong).optional().default(''),
  phone: z.string().trim().regex(phonePattern, messages.phone),
  email: z.union([z.literal(''), z.string().trim().email(messages.email)]).default(''),
  machinery: z.enum(machineryValues, { errorMap: () => ({ message: messages.machinery }) }),
  message: z.string().trim().min(limits.messageMin, messages.messageShort).max(limits.messageMax, messages.messageLong),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().default(''),
});
