import { Resend } from "resend"
import type { Commission } from "@/types/commission"
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from "@/types/commission"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Curated Creations <commissions@sachantoine.com>"
const ADMIN_EMAIL = "sacha@sachantoine.com"

const btnStyle = "display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600"

export async function sendCustomerConfirmation(commission: Commission) {
  await resend.emails.send({
    from: FROM,
    to: commission.email,
    subject: `Commission Request Received — ${commission.id}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="margin-bottom:4px">Thanks, ${commission.name}!</h2>
        <p style="color:#555">Your commission request has been received. Here's a summary:</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555;width:40%">Order ID</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${commission.id}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Type</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.type === "custom-design" ? "Custom Design" : commission.type === "personalized" ? "Personalization" : "Other"}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Quantity</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.quantity}</td></tr>
          <tr><td style="padding:8px 0;color:#555">Deadline</td><td style="padding:8px 0">${commission.deadline || "Flexible"}</td></tr>
        </table>
        <p style="color:#555">I'll review your request and get back to you with a quote within 48 hours.</p>
        <p style="margin-top:24px">
          <a href="https://sachantoine.com/commissions/${commission.id}" style="${btnStyle}">Track Your Order</a>
        </p>
        <p style="color:#888;font-size:13px;margin-top:32px">— Sacha Antoine / Curated Creations</p>
      </div>
    `,
  })
}

export async function sendAdminNotification(commission: Commission) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Commission Request — ${commission.id}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2>New commission from ${commission.name}</h2>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555;width:40%">ID</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${commission.id}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${commission.email}">${commission.email}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Type</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.type}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Quantity</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.quantity}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Color</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.color || "—"}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Dimensions</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.dimensions || "—"}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#555">Deadline</td><td style="padding:8px 0;border-bottom:1px solid #eee">${commission.deadline || "Flexible"}</td></tr>
          <tr><td style="padding:8px 0;color:#555;vertical-align:top">Description</td><td style="padding:8px 0">${commission.description}</td></tr>
        </table>
        ${commission.referenceImages?.length ? `<p style="color:#555">${commission.referenceImages.length} reference image(s) uploaded — view in admin.</p>` : ""}
        <p style="margin-top:24px">
          <a href="https://sachantoine.com/admin/commissions/${commission.id}" style="${btnStyle}">Manage in Admin</a>
        </p>
      </div>
    `,
  })
}

export async function sendStatusUpdate(commission: Commission) {
  if (commission.status === "pending" || commission.status === "reviewing") return

  await resend.emails.send({
    from: FROM,
    to: commission.email,
    subject: `Order Update: ${STATUS_LABELS[commission.status]} — ${commission.id}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2>Order Update</h2>
        <p style="font-size:18px;font-weight:600">${STATUS_LABELS[commission.status]}</p>
        <p style="color:#555">${STATUS_DESCRIPTIONS[commission.status]}</p>
        ${commission.quoteAmount ? `<p style="color:#555">Quote total: <strong>$${commission.quoteAmount.toFixed(2)} USD</strong></p>` : ""}
        ${commission.trackingInfo ? `<p style="color:#555">Tracking: <strong>${commission.trackingInfo}</strong></p>` : ""}
        ${commission.shopifyDraftOrderUrl ? `<p style="margin-top:16px"><a href="${commission.shopifyDraftOrderUrl}" style="${btnStyle}">View Invoice & Pay</a></p>` : ""}
        <p style="margin-top:24px">
          <a href="https://sachantoine.com/commissions/${commission.id}" style="${btnStyle}">Track Your Order</a>
        </p>
        <p style="color:#888;font-size:13px;margin-top:32px">— Sacha Antoine / Curated Creations</p>
      </div>
    `,
  })
}
