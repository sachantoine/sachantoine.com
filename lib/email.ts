import { Resend } from "resend"
import type { Commission } from "@/types/commission"
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from "@/types/commission"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "Curated Creations <commissions@sachantoine.com>"
const ADMIN_EMAIL = "sacha@sachantoine.com"

// ─── Shared primitives ───────────────────────────────────────────────────────

const btn = (href: string, label: string) => `
  <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
    <tr>
      <td style="background:#3b82f6;border-radius:8px;">
        <a href="${href}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.01em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${label} →</a>
      </td>
    </tr>
  </table>`

const btnSecondary = (href: string, label: string) => `
  <table cellpadding="0" cellspacing="0" style="margin-top:12px;">
    <tr>
      <td style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;">
        <a href="${href}" style="display:inline-block;padding:12px 28px;color:#a3a3a3;font-size:14px;font-weight:500;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${label}</a>
      </td>
    </tr>
  </table>`

const orderIdBox = (id: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid #2a2a2a;border-radius:8px;margin:24px 0;">
    <tr>
      <td style="padding:16px 20px;">
        <p style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Order ID</p>
        <p style="color:#ffffff;font-family:'Courier New',Courier,monospace;font-size:22px;font-weight:700;margin:0;letter-spacing:0.05em;">${id}</p>
      </td>
    </tr>
  </table>`

const row = (label: string, value: string, last = false) => `
  <tr>
    <td style="padding:10px 0;${last ? "" : "border-bottom:1px solid #1f1f1f;"}color:#737373;font-size:13px;width:38%;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${label}</td>
    <td style="padding:10px 0;${last ? "" : "border-bottom:1px solid #1f1f1f;"}color:#e5e5e5;font-size:13px;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${value}</td>
  </tr>`

function shell(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border:1px solid #222222;border-radius:14px;overflow:hidden;max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 28px;border-bottom:1px solid #1a1a1a;">
              <p style="color:#3b82f6;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Curated Creations</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1a1a1a;">
              <p style="color:#3a3a3a;font-size:12px;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Sacha Antoine &nbsp;·&nbsp; <a href="https://sachantoine.com" style="color:#3a3a3a;text-decoration:none;">sachantoine.com</a> &nbsp;·&nbsp; <a href="https://tiktok.com/@sachantoine_" style="color:#3a3a3a;text-decoration:none;">@sachantoine_</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Emails ──────────────────────────────────────────────────────────────────

export async function sendCustomerConfirmation(commission: Commission) {
  const typeLabel = commission.type === "custom-design" ? "Custom Design" : commission.type === "personalized" ? "Personalization" : "Other"

  const body = `
    <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Thanks, ${commission.name}!</h1>
    <p style="color:#a3a3a3;font-size:14px;line-height:1.6;margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Your commission request has been received. I'll get back to you with a quote within 48 hours.</p>

    ${orderIdBox(commission.id)}

    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Type", typeLabel)}
      ${row("Quantity", String(commission.quantity))}
      ${row("Deadline", commission.deadline || "Flexible", true)}
    </table>

    ${btn(`https://sachantoine.com/commissions/${commission.id}`, "Track Your Order")}
    <p style="color:#4a4a4a;font-size:12px;margin:16px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Save your order ID — you'll need it to check your status.</p>
  `

  await resend.emails.send({
    from: FROM,
    to: commission.email,
    subject: `Request Received — ${commission.id}`,
    html: shell(body),
  })
}

export async function sendAdminNotification(commission: Commission) {
  const body = `
    <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">New commission</h1>
    <p style="color:#a3a3a3;font-size:14px;margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">From ${commission.name} &lt;${commission.email}&gt;</p>

    ${orderIdBox(commission.id)}

    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Type", commission.type)}
      ${row("Quantity", String(commission.quantity))}
      ${row("Color", commission.color || "—")}
      ${row("Dimensions", commission.dimensions || "—")}
      ${row("Deadline", commission.deadline || "Flexible")}
      ${row("Description", commission.description, true)}
    </table>

    ${commission.referenceImages?.length ? `
    <p style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:20px 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Reference Images</p>
    <table cellpadding="0" cellspacing="0"><tr>
      ${commission.referenceImages.map(url => `
        <td style="padding-right:8px;">
          <a href="${url}" target="_blank">
            <img src="${url}" width="120" height="120" style="display:block;border-radius:8px;object-fit:cover;border:1px solid #2a2a2a;" alt="Reference image" />
          </a>
        </td>`).join("")}
    </tr></table>` : ""}

    ${btn(`https://sachantoine.com/admin/commissions/${commission.id}`, "Open in Admin")}
  `

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Commission — ${commission.id}`,
    html: shell(body),
  })
}

export async function sendStatusUpdate(commission: Commission) {
  if (commission.status === "pending" || commission.status === "reviewing") return

  const body = `
    <p style="color:#3b82f6;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Order Update</p>
    <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${STATUS_LABELS[commission.status]}</h1>
    <p style="color:#a3a3a3;font-size:14px;line-height:1.6;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${STATUS_DESCRIPTIONS[commission.status]}</p>

    ${orderIdBox(commission.id)}

    ${commission.quoteAmount ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid #2a2a2a;border-radius:8px;margin-bottom:8px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Quote Total</p>
          <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">$${commission.quoteAmount.toFixed(2)} <span style="font-size:14px;color:#737373;font-weight:400;">USD</span></p>
        </td>
      </tr>
    </table>` : ""}

    ${commission.trackingInfo ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid #2a2a2a;border-radius:8px;margin-bottom:8px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Tracking</p>
          <p style="color:#e5e5e5;font-family:'Courier New',Courier,monospace;font-size:13px;margin:0;word-break:break-all;">${commission.trackingInfo}</p>
        </td>
      </tr>
    </table>` : ""}

    ${commission.shopifyDraftOrderUrl ? btn(commission.shopifyDraftOrderUrl, "View Invoice & Pay") : ""}
    ${btnSecondary(`https://sachantoine.com/commissions/${commission.id}`, "Track Your Order")}
  `

  await resend.emails.send({
    from: FROM,
    to: commission.email,
    subject: `${STATUS_LABELS[commission.status]} — ${commission.id}`,
    html: shell(body),
  })
}
