'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle, WarningCircle, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { enquiryOptions } from '@/data/machinery';
import { company, whatsappLink } from '@/data/company';
import { validateEnquiry, type EnquiryErrors, type EnquiryField, type EnquiryValues } from '@/lib/enquiry-rules';
import { ENQUIRE_EVENT } from './EnquireButton';

type Values = EnquiryValues;
type Errors = EnquiryErrors;
type Outcome =
  | { kind: 'idle' }
  | { kind: 'sent'; ref: string }
  | { kind: 'failed'; reason: 'not_configured' | 'send_failed' | 'rate_limited' | 'network' };

const empty: Values = { name: '', company: '', phone: '', email: '', machinery: '', message: '' };
const fieldOrder: EnquiryField[] = ['name', 'company', 'phone', 'email', 'machinery', 'message'];

const failureCopy: Record<Extract<Outcome, { kind: 'failed' }>['reason'], string> = {
  not_configured: 'Online enquiries are not connected yet, so your message was not sent.',
  send_failed: 'Your message could not be delivered just now and was not sent.',
  rate_limited: 'Too many enquiries were sent from this connection. Your message was not sent.',
  network: 'Your message could not be sent. Please check your connection.',
};

const inputBase =
  'mt-2 block w-full rounded-sm border bg-deep px-4 py-3 text-base text-ink transition-colors duration-300 hover:border-muted focus:border-accent focus:outline-2 focus:outline-offset-0 focus:outline-accent';

export function EnquiryForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>({ kind: 'idle' });
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect machinery when a visitor clicks "Enquire about ..." in the machinery section.
  useEffect(() => {
    const onEnquire = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (enquiryOptions.some((o) => o.value === slug)) {
        setValues((v) => ({ ...v, machinery: slug }));
        setErrors((er) => ({ ...er, machinery: undefined }));
      }
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, []);

  useEffect(() => {
    if (outcome.kind !== 'idle') statusRef.current?.focus();
  }, [outcome]);

  const update = (f: EnquiryField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [f]: value }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }));
  };

  const focusFirstError = (errs: Errors) => {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return; // guards double-clicks before React re-renders the disabled button

    const honeypot = (new FormData(e.currentTarget).get('website') as string | null) ?? '';
    const checked = validateEnquiry(values);
    if (Object.keys(checked.errors).length > 0) {
      setErrors(checked.errors);
      focusFirstError(checked.errors);
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setOutcome({ kind: 'idle' });
    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...checked.values, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { code?: string; ref?: string; fieldErrors?: Errors };
      if (res.ok && data.code === 'ok') {
        setOutcome({ kind: 'sent', ref: data.ref ?? '' });
        setValues(empty);
      } else if (data.code === 'validation' && data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      } else {
        const reason = data.code === 'not_configured' || data.code === 'rate_limited' ? data.code : 'send_failed';
        setOutcome({ kind: 'failed', reason });
      }
    } catch {
      setOutcome({ kind: 'failed', reason: 'network' });
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  if (outcome.kind === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-base p-6 sm:p-10 focus:outline-none">
        <CheckCircle size={32} weight="fill" className="text-accent" aria-hidden />
        <h3 className="display mt-5 text-3xl">Enquiry sent</h3>
        <p className="mt-2 leading-relaxed text-muted">
          Thank you. Your requirement has reached {company.name}
          {outcome.ref ? ` (reference ${outcome.ref})` : ''}. For anything urgent, call {company.phoneDisplay}.
        </p>
        <button type="button" onClick={() => setOutcome({ kind: 'idle' })} className="btn-ghost mt-8">
          Send another enquiry
        </button>
      </div>
    );
  }

  const machineryLabel = enquiryOptions.find((o) => o.value === values.machinery)?.label;
  const whatsappText = [
    `Hello ${company.name}, I have a machinery requirement.`,
    values.name && `Name: ${values.name}`,
    values.company && `Company: ${values.company}`,
    machineryLabel && `Machinery: ${machineryLabel}`,
    values.message && `Requirement: ${values.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  const fieldProps = (f: EnquiryField) => ({
    id: id(f),
    name: f,
    value: values[f],
    onChange: update(f),
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-error`) : undefined,
    className: `${inputBase} ${errors[f] ? 'border-danger' : 'border-edge'}`,
  });

  const errorText = (f: EnquiryField) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-1.5 text-sm font-medium text-danger">
        {errors[f]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="border border-line bg-base p-5 sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="text-sm font-medium text-ink">
            Name <span className="text-danger" aria-hidden>*</span>
          </label>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor={id('company')} className="text-sm font-medium text-ink">
            Company name
          </label>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
          {errorText('company')}
        </div>
        <div>
          <label htmlFor={id('phone')} className="text-sm font-medium text-ink">
            Phone number <span className="text-danger" aria-hidden>*</span>
          </label>
          <input type="tel" inputMode="tel" autoComplete="tel" required {...fieldProps('phone')} />
          {errorText('phone')}
        </div>
        <div>
          <label htmlFor={id('email')} className="text-sm font-medium text-ink">
            Business email
          </label>
          <input type="email" autoComplete="email" {...fieldProps('email')} />
          {errorText('email')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('machinery')} className="text-sm font-medium text-ink">
            Machinery or service <span className="text-danger" aria-hidden>*</span>
          </label>
          <select required {...fieldProps('machinery')}>
            <option value="" disabled>
              Select machinery
            </option>
            {enquiryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errorText('machinery')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className="text-sm font-medium text-ink">
            Requirement <span className="text-danger" aria-hidden>*</span>
          </label>
          <p id={id('message-hint')} className="mt-1 text-sm text-muted">
            Material handled, capacity, length or lift height, and SS or MS construction if known.
          </p>
          <textarea
            rows={5}
            required
            {...fieldProps('message')}
            aria-describedby={[id('message-hint'), errors.message && id('message-error')].filter(Boolean).join(' ')}
          />
          {errorText('message')}
        </div>
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <p className="mt-6 text-sm text-muted">
        <span aria-hidden>*</span> Required. Your details are used only to reply to this enquiry.
      </p>

      {outcome.kind === 'failed' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 border border-danger/50 bg-danger/10 p-4 text-ink focus:outline-none"
        >
          <WarningCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-danger" aria-hidden />
          <div className="text-[0.95rem] leading-relaxed">
            <p className="font-semibold">{failureCopy[outcome.reason]}</p>
            <p className="mt-1">
              Send the same details on{' '}
              <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                WhatsApp
              </a>{' '}
              or call{' '}
              <a href={company.phoneHref} className="font-semibold underline">
                {company.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="btn-primary disabled:cursor-wait disabled:opacity-70">
          {submitting ? 'Sending enquiry…' : 'Send Enquiry'}
        </button>
        <a
          href={whatsappLink(whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <WhatsappLogo size={18} aria-hidden />
          Send on WhatsApp
        </a>
      </div>
    </form>
  );
}
