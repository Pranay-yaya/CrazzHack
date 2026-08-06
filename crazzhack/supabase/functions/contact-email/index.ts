
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "pranay@crazzhack.com";

serve(async (req) => {
  try {
    const { record } = await req.json();
    const { full_name, email, phone, description } = record;

    await resend.emails.send({
      from: "CrazzHack <no-reply@crazzhack.com>",
      to: email,
      subject: "We've received your inquiry!",
      html: `<h2>Thanks, ${full_name}!</h2><p>We’ll get back to you within 24 hours.</p>`
    });

    await resend.emails.send({
      from: "CrazzHack System <alerts@crazzhack.com>",
      to: ADMIN_EMAIL,
      subject: `New Lead: ${full_name}`,
      html: `<p><strong>Name:</strong> ${full_name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p>${description}</p>`
    });

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
