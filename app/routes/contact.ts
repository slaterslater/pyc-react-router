import dayjs from "dayjs";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  // const resend = new Resend(context.env.RESEND_API_KEY);
  const formData = await request.formData();
  const { firstName, lastName, email, to, from, message, site, page } = Object.fromEntries(formData.entries());

  // check honeypot
  const emailStr = String(email ?? '').toLowerCase();
  const isExampleEmail = emailStr.endsWith('@example.com') || emailStr.endsWith('.example.com');
  if (from || isExampleEmail) return { success: true }; // fake success so bots don't retry

  const subject = `${firstName} ${lastName} - Power Yoga ${site} - ${dayjs().format('MMMM D')}`

  const html = `
    ${subject}
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
      <p>Name: <strong>${firstName} ${lastName}</strong></p> 
      <p>Email: <a href="mailto:${email}">${email}</a></p>
      <p>Web: <a href="https://${url.hostname}${page}">${url.hostname}${page}</a></p>
      <p>Message:<br>${message}</p>
    </div>
  `;

  console.log(to, html);

  // await resend.emails.send({
  //   from: 'PYC Contact Form <no-reply@contact.poweryogacollective.com>',
  //   to,
  //   subject,
  //   html,
  // });

  return { success: true, url };
}