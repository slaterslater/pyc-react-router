import { Form } from "react-router";

export function ContactForm() {
  return (
    <Form className="bg-cream px-7 py-10 rounded-md flex flex-col gap-5">
      <div className="text-xl pb-4 uppercase">contact Us</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputControl label="First Name" name="first_name" type="first_name" />
        <InputControl label="Last Name" name="last_name" type="last_name" />
      </div>
      <InputControl label="Email" name="email" type="email" />
      <TextareaControl label="Your Message" name="message" />
      <button type="submit" className="btn-black w-full rounded-md py-2 mt-2">Submit</button>
    </Form>
  )
}

function InputControl({ label, name, type }: { label: string, name: string, type: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input type={type} id={name} name={name} className="w-full bg-white rounded-md p-2 border border-gray-300" />
    </div>
  )
}

function TextareaControl({ label, name }: { label: string, name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <textarea id={name} name={name} className="w-full bg-white rounded-md p-2" />
    </div>
  )
}