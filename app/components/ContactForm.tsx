import { useFetcher, useLocation } from "react-router";
import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';
import { z } from 'zod';
import { useEffect, useState } from "react";
import { FiLoader, FiCheckCircle } from "react-icons/fi";
import { useSite } from "~/hooks/useSite";
import { useStudio } from "~/hooks/useStudio";

export function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const fetcher = useFetcher();
  const isIdle = fetcher.state === 'idle';
  const [success, setSuccess] = useState(false);

  const schema = z.object({
    firstName: z.string('first name is required').max(100, "fewer than 100 characters"),
    lastName: z.string('last name is required').max(100, "fewer than 100 characters"),
    email: z.string('email is required').email('email is invalid'),
    message: z.string('message is required').max(1000, "fewer than 1000 characters"),
  })

  const [form, fields] = useForm({
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onBlur',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (!fetcher.data?.success) return

    setSuccess(true);

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 5000);

    // Cleanup function to prevent memory leaks
    return () => clearTimeout(timer);
  }, [fetcher.data]);

  const { siteName } = useSite();
  const { studioName } = useStudio();
  const page = useLocation().pathname;

  const l = useLocation()
  const site = studioName ?? siteName;
  console.log({ fetcherData: fetcher.data, site });

  return (
    <div className="bg-cream px-7 py-10 rounded-md">
      <div className="text-xl pb-4 uppercase">contact Us</div>
      {!success && (
        <fetcher.Form className="flex flex-col gap-5" method="post" action="/contact" {...getFormProps(form)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <InputControl input={fields.firstName} label="First Name" />
            <InputControl input={fields.lastName} label="Last Name" />
          </div>
          <InputControl input={fields.email} label="Email" type="email" />
          <TextareaControl input={fields.message} label="Your Message" />
          <input type="hidden" name="to" value={recipientEmail} />
          <input type="hidden" name="from" />  {/* honeypot */}
          <input type="hidden" name="site" value={studioName ?? siteName} />
          <input type="hidden" name="page" value={page} />
          <button
            type="submit"
            className="btn-black w-full rounded-md py-2 px-12 mt-2 max-w-fit md:max-w-none uppercase"
            disabled={!isIdle || success}
          >
            submit
          </button>
        </fetcher.Form>
      )}
      {success && (
        <div className="min-h-[545px] sm:min-h-[445px] md:min-h-[545px] lg:min-h-[445px] flex items-center justify-center gap-3">
          {!isIdle && <FiLoader className="animate-spin" size={32} />}
          {isIdle && (
            <>
              <FiCheckCircle size={20} />
              <span>Your message has been sent successfully.</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export function InputControl({ input, label, placeholder, type = 'text', maxLength }: InputControlProps) {
  return (
    <div>
      <label htmlFor={input.id} className="text-sm font-semibold">{label}</label>
      <input
        {...getInputProps(input, { type, ariaAttributes: true })}
        className="w-full bg-white rounded-md p-2 border border-gray-300"
        placeholder={placeholder}
        maxLength={maxLength}
        type={type}
      />
      <FormError id={input.errorId}>{input.errors}</FormError>
    </div>
  )
}

function TextareaControl({ input, label, placeholder, rows = 4 }: TextareaControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={input.id} className="text-sm font-semibold">{label}</label>
      <textarea
        {...getTextareaProps(input)}
        placeholder={placeholder}
        className="w-full bg-white rounded-md p-2 border border-gray-300"
        rows={rows}
      />
      <FormError id={input.errorId}>{input.errors}</FormError>
    </div>
  )
}

interface TextareaControlProps {
  input: any;
  label: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

function FormError({ id, children }: { id: string, children: React.ReactNode }) {
  return <div id={id} className="text-xs text-red tracking-wider pt-1 h-[18px]">{children}</div>;
}

interface InputControlProps {
  input: any;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email';
  maxLength?: number;
}