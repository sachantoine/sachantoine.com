export type CommissionType = "custom-design" | "personalized" | "other"

export type CommissionStatus =
  | "pending"
  | "reviewing"
  | "quoted"
  | "awaiting-payment"
  | "paid"
  | "printing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type Commission = {
  id: string
  createdAt: string
  name: string
  email: string
  type: CommissionType
  description: string
  color: string
  dimensions: string
  quantity: number
  deadline: string
  status: CommissionStatus
  adminNotes: string
  quoteAmount: number | null
  shopifyDraftOrderUrl: string
}

export const STATUS_LABELS: Record<CommissionStatus, string> = {
  pending: "Pending Review",
  reviewing: "Under Review",
  quoted: "Quote Sent",
  "awaiting-payment": "Awaiting Payment",
  paid: "Payment Received",
  printing: "Printing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export const STATUS_DESCRIPTIONS: Record<CommissionStatus, string> = {
  pending: "Your request has been received. We'll review it shortly.",
  reviewing: "We're reviewing your request and will send a quote soon.",
  quoted: "A quote has been sent to your email via Shopify. Check your inbox.",
  "awaiting-payment": "We're waiting on your payment to get started.",
  paid: "Payment received! Your order is queued for printing.",
  printing: "Your order is currently being printed.",
  shipped: "Your order has shipped! Check your email for tracking info.",
  delivered: "Your order has been delivered. Thanks!",
  cancelled: "This order has been cancelled.",
}

export const TYPE_LABELS: Record<CommissionType, string> = {
  "custom-design": "Custom Design (new model from scratch)",
  personalized: "Personalization (name/logo on existing design)",
  other: "Other modification",
}
