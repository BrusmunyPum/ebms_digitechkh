# Customer Support — v2 UI/UX Design Plan

> **File:** `documentation/v2/12-customer-support.md`
> **Role Folder:** `frontend/roles/12-customer-support/`
> **Portal ID:** `csPortal`
> **Last Updated:** 2026-09-25
> **Archetype:** B Variant — Support Console (Action-Oriented, Customer-Facing)

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | B Variant — Support Console (Action-oriented but customer-facing) |
| **Persona Name** | Customer Concierge |
| **Color Accent** | Sky Blue `#0ea5e9` |
| **Secondary Accent** | Emerald `#10b981` (resolved/success states) |
| **Alert Color** | Rose `#f43f5e` (SLA breaches, delivery failures) |
| **Background Tone** | Light Slate `#f0f9ff` (sky-tinted white) content area + Dark Navy `#0c1a2e` sidebar |
| **UI Style** | Action Pipeline — ticket queue cards, hero search bar, Kanban delivery board |
| **Key Persona** | Front-line support agent who receives customer inquiries via phone/chat. Primary tasks: look up orders, confirm delivery status, resolve complaints, log support notes. Can view but never edit financial data. |

### Key Constraint

> This role can **VIEW** orders, invoices, and delivery records but **CANNOT** edit prices, payment status, quantities, or any financial field. Support notes and delivery status updates are the only write actions permitted.

---

## 2. Sidebar Navigation (3 Items)

```
Sidebar Header:
  - Logo: DIGITECHKH eBMS
  - Role Label: "ជំនួយការអតិថិជន"
  - Agent status dot: ● Online (green) — visible below role label
```

| # | ID | Label (Khmer) | Icon | `href` Target File | Badge/Alert |
|---|---|---|---|---|---|
| 1 | `cs-dashboard` | ផ្ទាំងសេវាកម្ម | `mdi:headset` | `dashboard.html` | `badge: true` — live count of open tickets (e.g., "5") in sky-blue pill |
| 2 | `cs-orders` | ស្វែងរកវិក្កយបត្រ | `mdi:file-document-outline` | `orders-lookup.html` | — |
| 3 | `cs-delivery` | តាមដានការដឹកជញ្ជូន | `mdi:truck-check-outline` | `delivery-status.html` | — |

**Sidebar Footer:**
- Agent name + avatar (initials)
- Current shift time indicator (e.g., "Shift: 08:00 – 17:00")
- Logout link

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — Support Desk Command Center (`dashboard.html`)

**Purpose:** The primary workspace for the support agent — enables instant customer/order search and provides a live queue of open support tickets with SLA timers.

> **NO ECharts on this page.** Simple number badges and status indicators only.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Role name, agent name, shift time, logout          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SEARCH BAR (center, very prominent)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🔍  ស្វែងរក Invoice # / លេខទូរស័ព្ទ / ឈ្មោះអតិថិជន      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  SECTION A: Ticket Queue (main body, ~65% width)            │
│  Filter Tabs: [ទាំងអស់] [បើក] [កំពុងដោះស្រាយ] [បានបិទ]        │
│  Ticket Cards (vertical stack)                              │
├─────────────────────────────────────────────────────────────┤
│  SECTION B: Failed/Delayed Deliveries Alert                 │
│  (below ticket queue, full width, red-border section)       │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Hero Search Bar

- **This is the #1 most important UI element for this role.**
- Placement: Top of content area, horizontally centered, wide (min 600px on desktop)
- Size: Large — `height: 56px`, `font-size: 1.125rem`, `border-radius: 12px`
- Placeholder text (Khmer): `"ស្វែងរក Invoice # / លេខទូរស័ព្ទ / ឈ្មោះអតិថិជន ..."`
- Left icon: `mdi:magnify` in sky blue `#0ea5e9`
- Border: `2px solid #0ea5e9` always (not just on focus — always prominent)
- Shadow: `box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2)` — a soft sky-blue glow
- On input: live search dropdown appears below (see below)
- `[Enter]` or clicking result → navigates to `orders-lookup.html?query=...`
- Keyboard shortcut: `Ctrl+K` or `/` focuses this bar from anywhere in the page

**Live Search Dropdown (below the hero bar):**
Appears after 2+ characters typed. Shows grouped results:
```
┌──────────────────────────────────────────────────────────┐
│ 📄 វិក្កយបត្រ                                              │
│   INV-2026-0234  |  សុខ វណ្ណ  |  $340.00  |  Delivered   │
│   INV-2026-0198  |  ចន្ទ ដារា  |  $120.00  |  Pending     │
│ ─────────────────────────────────────────────────────── │
│ 👤 អតិថិជន                                                │
│   សុខ វណ្ណ  |  012-345-678  |  Last order: 2026-09-20    │
└──────────────────────────────────────────────────────────┘
```
- Max 5 results per group
- `[See all results →]` at bottom → full orders-lookup page

#### Section A — Ticket Queue

**Filter Tabs (pill tabs, top of section):**
```
[ទាំងអស់ (12)]  [បើក (5)]  [កំពុងដោះស្រាយ (4)]  [បានបិទ (3)]
```
Active tab underlined in sky blue `#0ea5e9`, count shown in parentheses.

**Ticket Card Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ #TKT-0045                          [● ការដឹក]  SLA: 02:14  │
│ ─────────────────────────────────────────────────────────── │
│ អតិថិជន: ចន្ទ ដារា  |  ☎ 012-456-789                        │
│ បញ្ហា: ការបញ្ជូនទំនិញយឺត — INV-2026-0198                    │
│ ─────────────────────────────────────────────────────────── │
│ បើក: 2026-09-25 09:14              ភ្នាក់ងារ: [Unassigned]  │
│                                                  [View →]   │
└─────────────────────────────────────────────────────────────┘
```

**Ticket Card Fields:**

| Field | Detail |
|---|---|
| Ticket # | e.g., `#TKT-0045` — monospace font |
| Issue Type Badge | Pill badge in distinct colors per type (see below) |
| SLA Timer | Countdown from ticket creation: green if <2hr, amber if 2–4hr, red if >4hr. Format: `HH:MM` |
| Customer Name | Full name — clickable → opens orders-lookup for that customer |
| Customer Phone | `☎ XXX-XXX-XXX` |
| Issue Description | Short free-text description (1 line truncated with ellipsis) |
| Linked Invoice | If ticket is linked to a specific invoice — shown as `INV-XXXX` pill link |
| Time Opened | Relative time (e.g., "3 hours ago") + absolute on hover |
| Assigned Agent | Name or "[Unassigned]" |
| [View →] | Opens ticket detail modal or page |

**Issue Type Badges (pill colors):**

| Type (Khmer) | Type (EN) | Pill Color |
|---|---|---|
| ការបង្ក្រាប | Complaint | Rose `#f43f5e` |
| ការដឹក | Delivery | Amber `#f59e0b` |
| ការទូទាត់ | Payment | Violet `#8b5cf6` |
| ទូទៅ | General | Sky `#0ea5e9` |
| ការបង្វិលទំនិញ | Return/Refund | Orange `#f97316` |

**SLA Timer Color Rules:**
- < 2 hours: Green `#10b981` — "On track"
- 2–4 hours: Amber `#f59e0b` — "At risk" (amber pulsing animation)
- > 4 hours: Red `#ef4444` — "Breached" (red pulsing animation + exclamation icon)

**[View →] Button:**
- Opens a ticket detail panel (slide-in from right OR inline expansion below card)
- Shows: full issue description, linked order detail (read-only), previous notes/history, `[Add Note]` textarea, `[Mark as Resolved]` button

#### Section B — Failed / Delayed Deliveries Alert

- Title: "ការដឹកជញ្ជូនមានបញ្ហា" — with `mdi:truck-alert` icon in red
- Background: `#fff1f2` (very light rose tint) with `border-left: 4px solid #f43f5e`
- Shows orders where delivery status = `Failed` or `Delayed` in the last 48 hours
- Limited to max 5 cards in this section — `[View All →]` link to delivery-status.html
- Each mini-card: Order#, Customer Name, Issue (Failed/Delayed), Driver, `[View →]` link
- If no issues: shows a green confirmation "គ្មានបញ្ហាការដឹកជញ្ជូន" with checkmark icon — collapsed/minimal

**Actions Available:**
- Hero search bar (navigates to orders-lookup)
- `Ctrl+K` or `/` shortcut — focus hero search
- Filter tabs on ticket queue
- `[View →]` on each ticket → ticket detail
- `[View All →]` link on delivery issues section
- Within ticket detail panel:
  - `[Add Note]` — support note textarea
  - `[Mark as Resolved]` — closes the ticket

**Rules/Constraints:**
- Support agent CANNOT create a new invoice or order from this page
- Support agent CANNOT edit prices, quantities, or payment status — view only
- Ticket queue auto-refreshes every 90 seconds
- SLA timers update in real-time (every 60 seconds via `setInterval`)
- Badge in sidebar shows live open ticket count — updates on ticket status change
- If ticket count is 0, badge is hidden

**Files to Create/Modify:**
- `frontend/roles/12-customer-support/dashboard.html` — **redesign** to add hero search as primary element

---

### 3.2 Orders Lookup — Global Order & Customer Search (`orders-lookup.html`)

**Purpose:** Allows the support agent to search for any customer or invoice and view full order details to answer customer inquiries accurately.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Page Title: "ស្វែងរកវិក្កយបត្រ / អតិថិជន"                    │
├─────────────────────────────────────────────────────────────┤
│  SEARCH BAR (large, prominent — same style as dashboard)    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🔍  ស្វែងរក Invoice # / លេខទូរស័ព្ទ / ឈ្មោះអតិថិជន      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  RESULTS AREA                                               │
│                                                             │
│  [Customer Card — left panel, ~30%] [Order List — 70%]     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ORDER DETAIL PANEL (expands below selected order, full-w)  │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Search Bar

- Same visual style as dashboard hero search bar
- Accepts: Invoice number, customer phone number, customer name (partial match)
- On submit or `Enter`: shows results below
- URL param: `orders-lookup.html?query=INV-2026-0198` — supports direct linking from dashboard

#### Customer Card (left panel, shown after search)

Displays the matched customer's summary:
```
┌───────────────────────────────────┐
│ [Avatar Initials]                 │
│ ចន្ទ ដារា                          │
│ ☎ 012-456-789                     │
│ 📧 dara@example.com (if available)│
│ ─────────────────────────────── │
│ អតិថិជនតាំងពី: 2025-03-12          │
│ ការបញ្ជាទិញសរុប: 23                │
│ ការបញ្ជាទិញចុងក្រោយ: 2026-09-20    │
│ ─────────────────────────────── │
│ [📝 Add Support Note]             │
└───────────────────────────────────┘
```

- If search returns multiple customers → show list of matching customer cards first, then pick one
- Customer card is read-only — no edit of customer profile
- `[📝 Add Support Note]` → navigates to `create-note.html?orderId=...` dedicated page

#### Order List (right panel)

Shows all orders for the selected customer, most recent first.

**Order Row:**
```
┌──────────────────────────────────────────────────────────────┐
│ INV-2026-0234   2026-09-20   $340.00   [● Delivered]   [▼]  │
└──────────────────────────────────────────────────────────────┘
```

| Field | Value |
|---|---|
| Invoice # | `INV-XXXX-XXXX` — monospace |
| Date | Order date |
| Total Amount | USD or KHR |
| Status Badge | Pending (amber), Processing (blue), Delivered (green), Failed (red), Cancelled (gray) |
| `[▼]` expand | Expands the Order Detail Panel below |

**Order Detail Panel (expanded, full width):**

When `[▼]` is clicked on an order row, a detail panel expands below:

```
┌─────────────────────────────────────────────────────────────┐
│ INV-2026-0234 — Order Detail                                │
│ ─────────────────────────────────────────────────────────── │
│ ITEMS:                                                      │
│  # | ឈ្មោះទំនិញ        | ចំនួន | តម្លៃឯកតា | សរុប             │
│  1 | Laptop Bag XL     |  2   |  $45.00   | $90.00          │
│  2 | Mouse Wireless    |  1   |  $25.00   | $25.00          │
│ ─────────────────────────────────────────────────────────── │
│ Subtotal: $115.00   Tax: $0.00   Discount: $0.00           │
│ TOTAL: $115.00                                              │
│ ─────────────────────────────────────────────────────────── │
│ ការទូទាត់: Cash on Delivery    ស្ថានភាព: Delivered           │
│ ការដឹក: [Driver: សុខ វណ្ណ]  [Delivered: 2026-09-21 14:23]   │
│ ─────────────────────────────────────────────────────────── │
│ កំណត់ចំណាំ: [Previous support notes shown here]              │
│ ─────────────────────────────────────────────────────────── │
│ [📝 Add Support Note to This Order]                         │
└─────────────────────────────────────────────────────────────┘
```

- All fields are **read-only display** — no editable inputs
- Prices, quantities, payment status: strictly view-only
- `[📝 Add Support Note to This Order]` → navigates to `create-note.html?orderId=...` dedicated page

#### create-note.html (ទំព័របន្ថែមកំណត់ចំណាំ)

**Layout:** Full dedicated page with back button (icon-only rounded-xl per project standard)
**Back:** Returns to orders-lookup.html

**Trigger Button (in customer card or order detail):**
```html
<a href="create-note.html?orderId=..." class="btn btn-sky-outline rounded-xl">
  📝 Add Support Note
</a>
```

**Form Fields:**
- Order reference (read-only, pre-filled from URL param)
- Customer name (read-only, pre-filled)
- Note content (textarea, large, required)
- Note type: radio buttons (ជំនួយ / ការផ្ទៀងផ្ទាត់ / ការត្អូញត្អែរ / ផ្សេងៗ)

**Submit:** saves note, redirects back to orders-lookup.html with success toast

- Agent name + timestamp automatically recorded
- Note is attached to the order/customer record
- Note content CANNOT modify any order data — it is append-only commentary
- After save: note appears in the order detail's "កំណត់ចំណាំ" section on return to orders-lookup.html

**Actions Available:**
- Search bar (primary interaction)
- Order row expand/collapse `[▼]`
- `[📝 Add Support Note]` on customer card or order detail → navigates to `create-note.html?orderId=...`

**Rules/Constraints:**
- CANNOT edit any field inside the order detail (prices, quantities, payment status, etc.)
- CANNOT create a new invoice or order
- CANNOT delete or void an order
- Support notes are the ONLY write action on this page
- Search must work with partial match (minimum 3 characters)
- If no results found: show friendly empty state with icon `mdi:file-search-outline` and text "គ្មានលទ្ធផល — សូមពិនិត្យម្តងទៀត"
- If navigated from dashboard with `?query=` param: auto-run search on page load

**Files to Create/Modify:**
- `frontend/roles/12-customer-support/orders-lookup.html` — **redesign** (v1 exists but needs full layout overhaul with 2-panel structure and note modal)

---

### 3.3 Delivery Status — Tracking & Driver Dispatch (`delivery-status.html`)

**Purpose:** Provides a Kanban-style visual board of all deliveries for the current day or week — allowing the support agent to track delivery progress, contact drivers, and flag delivery issues.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Page Title: "តាមដានការដឹកជញ្ជូន"                             │
├─────────────────────────────────────────────────────────────┤
│  FILTER BAR: [Today ●] [This Week]   [Driver ▼]  [Search]  │
│  SUMMARY BADGES: Preparing (5)  Out for Delivery (8)        │
│                  Delivered (23) Failed (2)                  │
├─────────────────────────────────────────────────────────────┤
│  KANBAN BOARD (horizontal scroll if needed)                 │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │  🔧 Preparing  │  │ 🚚 Out for    │  │ ✅ Delivered / │ │
│  │  (5)           │  │    Delivery   │  │ ❌ Failed      │ │
│  │                │  │  (8)          │  │ (25)           │ │
│  │  [Card]        │  │  [Card]       │  │  [Card]        │ │
│  │  [Card]        │  │  [Card]       │  │  [Card]        │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  MAP PLACEHOLDER (future GPS tracking area)                 │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Filter Bar

- **Date Toggle:** `[Today]` (default, active sky blue) | `[This Week]`
- **Driver Filter:** Dropdown list of all active drivers
- **Search:** Small inline search for order # or customer name
- **Summary Badges:** Non-clickable count pills for each status — gives quick situational overview

#### Kanban Board — 3 Columns

**Column 1: Preparing (រៀបចំ)**
- Background: Slate `#f1f5f9`
- Header icon: `mdi:package-variant-closed` in gray
- Orders that have been confirmed but not yet dispatched / still being packed

**Column 2: Out for Delivery (កំពុងដឹក)**
- Background: Sky blue tint `#f0f9ff`
- Header icon: `mdi:truck-fast-outline` in sky blue `#0ea5e9`
- Orders currently in transit

**Column 3: Delivered / Failed (បានដឹក / បរាជ័យ)**
- Split into two sections within the column:
  - Top: Delivered (green header, `mdi:check-circle-outline`)
  - Bottom: Failed (red header, `mdi:close-circle-outline`)
- Or: Two separate narrow columns if screen width allows

**Delivery Card Structure (per column):**
```
┌─────────────────────────────────────────────────────┐
│ DEL-2026-0087    INV-2026-0234                      │
│ ─────────────────────────────────────────────────── │
│ ចន្ទ ដារា           📍 Phnom Penh, Khan Daun Penh  │
│ 👤 Driver: ហ៊ន សំអាត  |  Items: 3                   │
│ ─────────────────────────────────────────────────── │
│ ⏱ Dispatched: 09:30     ETA: ~11:00               │
│ ─────────────────────────────────────────────────── │
│ [☎ Contact Driver]  [⚠ Mark Failed]  [📅 Reschedule]│
└─────────────────────────────────────────────────────┘
```

**Card Fields:**

| Field | Detail |
|---|---|
| Delivery # | `DEL-XXXX-XXXX` — unique delivery reference |
| Linked Invoice | `INV-XXXX-XXXX` pill link → view-only invoice detail |
| Customer Name | Full name |
| Address | Partial address (province + district only — no full address for privacy) |
| Driver Name | Assigned driver name |
| Items Count | Number of line items |
| Dispatch Time | When driver departed |
| ETA | Estimated arrival (if available) |
| Action Buttons | (see below) |

**Card Action Buttons:**

1. **`[☎ Contact Driver]`**
   - `href="tel:+855XXXXXXXXX"` — triggers phone call on mobile devices
   - Desktop: shows driver's phone number in a tooltip or small popup
   - Icon: `mdi:phone-outline`
   - Available in: Preparing, Out for Delivery columns

2. **`[⚠ Mark as Failed/Returned]`**
   - Only available in "Out for Delivery" column
   - Click → opens confirmation modal:
     ```
     ┌────────────────────────────────────────────────┐
     │ បញ្ជាក់ការបរាជ័យ / ត្រឡប់មកវិញ                   │
     │ ─────────────────────────────────────────────── │
     │ ហេតុផល: [Dropdown: Customer Absent / Wrong     │
     │           Address / Refused / Damaged /        │
     │           Other]                               │
     │ ─────────────────────────────────────────────── │
     │ កំណត់ចំណាំ: [Textarea — optional]                │
     │ ─────────────────────────────────────────────── │
     │           [Cancel]   [✓ Confirm Failed]        │
     └────────────────────────────────────────────────┘
     ```
   - On confirm: card moves to "Failed" column, triggers notification to warehouse staff
   - Does NOT affect financial records — only delivery status is updated

3. **`[📅 Reschedule]`**
   - Available in "Failed" column only
   - Click → opens reschedule modal:
     ```
     ┌────────────────────────────────────────────────┐
     │ គ្រោងដឹកជញ្ជូនឡើងវិញ                           │
     │ ─────────────────────────────────────────────── │
     │ ថ្ងៃដឹកថ្មី: [Date Picker]                       │
     │ ចំណាំ: [Textarea — optional]                    │
     │ ─────────────────────────────────────────────── │
     │           [Cancel]   [✓ Save]                  │
     └────────────────────────────────────────────────┘
     ```
   - Only saves a rescheduled date and note — NO financial impact
   - Card stays in "Failed" column with "Rescheduled for [date]" label

**Delivered Card (in Delivered section):**
```
┌─────────────────────────────────────────────────────┐
│ DEL-2026-0061    INV-2026-0198   ✅ Delivered        │
│ ─────────────────────────────────────────────────── │
│ សុខ វណ្ណ        Delivered: 10:45 by ហ៊ន សំអាត       │
└─────────────────────────────────────────────────────┘
```
Delivered cards are compact — no action buttons, just confirmation info.

#### Map Placeholder (Future GPS Tracking)

- Placed at the bottom of the page
- Shows a gray placeholder box with text:
  `"🗺 ផែនទីតាមដានការដឹក — នឹងមានក្នុងកំណែបន្ទាប់"`
  `"Live GPS tracking — Coming in next release"`
- Icon: `mdi:map-marker-radius-outline`
- Dimensions: full width, ~200px tall, dashed border
- This area is pre-allocated so the future map integration slots in cleanly

**Actions Available:**
- Date toggle (Today / This Week)
- Driver filter dropdown
- Order search
- `[☎ Contact Driver]` (tel: link)
- `[⚠ Mark as Failed/Returned]` → confirmation modal → status update
- `[📅 Reschedule]` → reschedule modal → date note saved

**Rules/Constraints:**
- Support agent CANNOT change delivery to "Delivered" manually — only drivers or warehouse can mark delivered (prevents fraud)
- Support agent CAN mark as "Failed" (customer-side issue) — this is within their responsibility scope
- `[Reschedule]` saves a date note only — does NOT auto-assign a new driver or generate a new delivery order (that requires warehouse action)
- Financial fields (order total, payment status) are never shown or editable on this page
- Kanban columns are NOT drag-and-drop — status changes happen only via action buttons and confirmation modals
- Cards auto-refresh every 2 minutes to reflect driver updates

**Files to Create/Modify:**
- `frontend/roles/12-customer-support/delivery-status.html` — **redesign** (v1 exists but needs Kanban-style column layout; v1 used a simple list/table)

---

## 4. UI Identity Details

| Property | Value |
|---|---|
| **Primary Color** | Sky Blue `#0ea5e9` |
| **Secondary/Success** | Emerald `#10b981` |
| **Alert/SLA Breach** | Rose `#f43f5e` |
| **Warning/SLA At-risk** | Amber `#f59e0b` |
| **Sidebar Background** | Dark Navy `#0c1a2e` |
| **Sidebar Text** | Slate `#94a3b8` (inactive) / White (active) |
| **Sidebar Active Item** | Left border `4px solid #0ea5e9` + background `#1e3a5f` |
| **Content Background** | Sky-tinted white `#f0f9ff` |
| **Card Background** | Pure White `#ffffff` |
| **Card Shadow** | `box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1)` — subtle sky-blue shadow |
| **Font — Headings** | `font-weight: 700` — Battambang (Khmer) / Inter (Latin) |
| **Font — Body** | `font-weight: 400` |
| **Font — Labels/Status** | `font-weight: 600`, `font-size: 0.75rem` uppercase |
| **Kanban Column Header** | `font-size: 0.875rem`, `font-weight: 700`, uppercase |
| **Border Radius** | `12px` for cards, `8px` for badges — friendlier/rounder than other roles |

### Unique Design Elements — What Makes This Role Distinct

1. **Hero Search Bar as Primary UI:** Every other role has a dashboard with charts or KPIs as the hero element. The Customer Support role uniquely places a large, glowing search bar as the #1 element — communicating that searching for customer data is the agent's primary workflow.

2. **Sky Blue Color Palette:** The `#0ea5e9` sky blue is distinct from all other roles (which use red, amber, emerald, violet, or deep blue). Sky blue conveys friendliness and helpfulness — appropriate for customer-facing work.

3. **SLA Timer with Pulsing Animation:** The amber/red pulsing animation on overdue ticket SLA timers creates urgency without being alarming — a unique interactive element for this role.

4. **Kanban Delivery Board:** The three-column Kanban layout on delivery-status.html gives an immediate visual of the delivery pipeline state — distinct from the ledger tables (Archetype D) and approval queues (Archetype C).

5. **Live Ticket Badge in Sidebar:** The sky-blue number pill on the Dashboard sidebar item that updates in real-time shows how many open tickets need attention — unique to this role.

6. **`tel:` Link on Driver Contact:** The `[☎ Contact Driver]` button that opens a phone call is a practical mobile-first feature unique to the support role — reflects a field-operations support context.

7. **Rounded Card Aesthetic:** `border-radius: 12px` on all cards is slightly rounder than other roles (which typically use 8px) — subtly making the interface feel more approachable and customer-service-oriented.

---

## 5. Developer Notes

### `portal.js` Config

```
// csPortal nav config — v1 is already correct (3 items)
// Changes needed: dashboard.html redesign only
// No nav item additions or removals required

csPortal.nav = [
  { id: 'cs-dashboard', href: 'dashboard.html',       label: 'ផ្ទាំងសេវាកម្ម',       icon: 'mdi:headset',                badge: { type: 'count', source: 'openTickets' } },
  { id: 'cs-orders',   href: 'orders-lookup.html',    label: 'ស្វែងរកវិក្កយបត្រ',     icon: 'mdi:file-document-outline' },
  { id: 'cs-delivery', href: 'delivery-status.html',  label: 'តាមដានការដឹកជញ្ជូន',   icon: 'mdi:truck-check-outline' },
]
```

Badge source `openTickets` should reflect the count of tickets with `status === 'open'` from `data.js`.

### `data.js` Fields Needed

```
supportTickets[]      — id, customerName, customerPhone, issueType, 
                        description, linkedInvoiceId, status, 
                        createdAt, assignedAgent, resolvedAt,
                        notes[] (array of note objects)

supportNotes[]        — id, ticketId, orderId, customerId, content, 
                        agentName, createdAt, noteType

deliveries[]          — id, invoiceId, customerName, customerPhone,
                        address, district, province,
                        driverName, driverPhone, itemCount,
                        status (preparing/out/delivered/failed),
                        dispatchedAt, estimatedArrival, deliveredAt,
                        failureReason, rescheduledDate, notes

customers[]           — id, name, phone, email, registeredDate,
                        totalOrders, lastOrderDate

orders[]              — id (invoiceId), customerId, date, items[],
                        subtotal, tax, discount, total, 
                        paymentMethod, status, deliveryId,
                        supportNotes[]

openTickets           — (computed value) count of supportTickets 
                        where status === 'open'
```

### Key Redesign Summary for Existing v1 Files

| File | v1 State | v2 Change Required |
|---|---|---|
| `dashboard.html` | Exists — generic dashboard with KPI boxes | Full redesign: hero search bar as #1 element, ticket queue, SLA timers, delivery alerts |
| `orders-lookup.html` | Exists — basic search list | Full redesign: 2-panel layout (customer card + order list), expandable order detail, links to create-note.html |
| `create-note.html` | New | Dedicated page: support note form with back button per GEMINI.md standards |
| `delivery-status.html` | Exists — simple list/table | Full redesign: 3-column Kanban layout with action buttons, modals, map placeholder |

### Shared Components

- **Support Note Navigation:** Trigger links navigate to `create-note.html?orderId=...` — used on both dashboard.html (ticket detail) and orders-lookup.html per GEMINI.md dedicated page standard
- **SLA Timer:** Implement as a JS utility `slaTimer(createdAt)` returning current elapsed time and severity class (`sla-ok / sla-warning / sla-breached`) — attach `setInterval` to update every 60 seconds
- **Search Bar Component:** The hero search bar should be the same component on both dashboard.html and orders-lookup.html, initialized with different `placeholder` text and `target` navigation URL

### Kanban Board Implementation Notes

- Kanban columns are implemented as CSS Flexbox (3 columns, `flex: 1`, `gap: 16px`) — NOT drag-and-drop (intentional constraint)
- Each column header shows count badge that auto-updates when card status changes
- On narrow screens (<1024px): columns stack vertically (mobile-first: use `flex-direction: column` below breakpoint)
- Cards within columns sorted by: dispatch time ascending (oldest first = needs attention soonest)
- Status change via action buttons updates:
  1. `deliveries[id].status` in data.js (prototype) → future: API call
  2. Card DOM element moves to new column via JS DOM manipulation
  3. Column count badges update
  4. If status = `failed`: trigger `notifyWarehouse(deliveryId)` function (stub in prototype)

### Permissions Summary for This Role

| Action | Allowed? |
|---|---|
| View orders/invoices | ✅ Yes |
| View customer data | ✅ Yes |
| Add support notes | ✅ Yes |
| Mark delivery as Failed | ✅ Yes |
| Reschedule delivery (note only) | ✅ Yes |
| Contact driver (`tel:`) | ✅ Yes |
| Edit prices | ❌ No |
| Edit quantities | ❌ No |
| Edit payment status | ❌ No |
| Create new invoice/order | ❌ No |
| Delete any record | ❌ No |
| Mark delivery as Delivered | ❌ No (warehouse/driver only) |

---

*End of Document — Customer Support (Role 12) v2 UI/UX Design Plan*
*DIGITECHKH eBMS — Planning Document — For Developer Use Only*
