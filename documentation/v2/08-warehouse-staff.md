# Warehouse Staff — v2 UI/UX Design Plan

> **Role:** Warehouse Staff (Floor Operator)
> **Portal ID:** `wsPortal`
> **Archetype:** A — Touch & Floor Console (Handheld / Scanner Optimized)
> **File Path:** `frontend/roles/08-warehouse-staff/`
> **Last Updated:** 2026-09-25

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | A — Touch & Floor Console |
| **Color Accent** | Stone `#78716c` |
| **Active Nav Highlight** | `#334155` (Slate-700) |
| **Background Tone** | `#f8fafc` (very light gray-white — high contrast for floor lighting) |
| **Danger/Alert** | `#ef4444` (Red-500) |
| **Success/Done** | `#22c55e` (Green-500) |
| **Pending/Bin Location Highlight** | `#facc15` (Yellow-400 — high visibility on shelves) |
| **Font Scale** | Minimum `text-base` (16px) body; `text-lg` (18px) item names; `text-2xl` for critical numbers |
| **Button Height** | Minimum `h-14` (56px) — touch-friendly on all interactive elements |
| **UI Style** | Chunky cards, high-contrast text, large checkboxes, scan-first workflow |
| **Key Persona** | Floor Operator — picks orders, receives stock, counts inventory. Works with handheld scanner or tablet on the warehouse floor. No desk, no mouse, no financial context whatsoever. |

### Persona Details

The Warehouse Staff user is a physical-space operator who interacts with the system while standing, moving between shelves, or driving a forklift. The UI must:

- Require **zero typing** wherever possible — scanning barcodes drives all actions
- Show **only what is needed** to physically do the job (location, quantity, product identity)
- Be completely **free of any financial data** — no prices, costs, margins, totals, or currency symbols
- Support **one-handed operation** with large tap targets
- Work reliably at `width: 360px` (phone handheld) up to `width: 1024px` (tablet mounted on cart)
- Use **high contrast** text/background — warehouse floors often have mixed lighting

---

## 2. Sidebar Navigation

The sidebar is **collapsed by default on mobile** (hamburger icon top-left). On tablet landscape mode it may be pinned as a bottom tab bar (3 large icons).

Maximum 3 navigation items — no sub-menus, no nested dropdowns.

| # | Label (Khmer) | Label (EN) | Icon | href Target | Badge/Alert |
|---|---|---|---|---|---|
| 1 | រើស និងវេចខ្ចប់ | Pick & Pack | `mdi:package-variant-closed` | `pick-and-pack.html` | Count badge: pending orders |
| 2 | ទទួលទំនិញចូល | Receive Stock | `mdi:truck-delivery-outline` | `receive-stock.html` | Count badge: expected deliveries today |
| 3 | រាប់ស្តុកជាក់ស្តែង | Stock Count | `mdi:clipboard-check-outline` | `stock-count.html` | Dot badge: active session in progress |

### Sidebar Design Rules

- Each nav item: minimum `h-16` touch area, icon size `24px`, label below icon
- Active item: background `#44403c`, text white, left border `4px solid #facc15`
- Inactive item: text `#64748b`, icon muted gray
- On mobile: sidebar becomes a **bottom navigation bar** — 3 equal-width tabs
- Portal branding: "eBMS ឃ្លាំង" (Warehouse) displayed at top of sidebar with a small warehouse icon
- No collapsible sub-items — flat navigation only

---

## 3. Pages & Layouts

---

### 3.1 Pick & Pack Queue (`pick-and-pack.html`)

**Purpose:** Display all pending warehouse pick orders in a touch-optimized card queue; allow staff to open a picking checklist, scan items to confirm picks, and mark orders as packed.

**Layout:** Full-width single-column card list on mobile; 2-column grid on tablet. Fixed top scan bar (always visible). No sidebar on mobile — bottom tab bar only.

---

#### Section A — Fixed Top Bar (Always Visible)

This strip is **sticky at the top** and never scrolls away.

- **Barcode Scan Input Field:**
  - Large input: `h-12`, placeholder text: "ស្កែន SKU ឬ លេខបញ្ជាទិញ…" (Scan SKU or Order No.)
  - Auto-focus on page load and after every successful scan
  - Magnifying-glass icon on left; clear button on right
  - When a barcode is scanned, the system should:
    1. If an order card is already expanded: auto-tick the matching item in the checklist
    2. If no card is expanded: highlight the order card containing that SKU
  - Input field background: `#fef9c3` (light yellow) to signal it is always active

- **Filter Chips (horizontal scroll, small):**
  - [ទាំងអស់] All | [បន្ទាន់] Urgent | [ធម្មតា] Normal
  - Chips use slate border and filled active state

---

#### Section B — Order Queue (Card List)

Each **Order Card** displays:

| Field | Display Rule |
|---|---|
| Order Number | Large: `text-xl font-bold` — e.g., `SO-2026-00412` |
| Customer Initials | Only initials in a circular avatar — e.g., "ស.ច" — **NO full name on card** |
| Item Count | "5 សំភារៈ" (5 items) — text-lg |
| Priority Badge | `URGENT` = red filled pill; `NORMAL` = slate outline pill |
| Picking Status | Progress ring or bar (0 of 5 picked) |
| Time Queued | Relative time: "ចូលមក 42 នាទីមុន" |

**Card Actions:**
- Tap anywhere on card → **expand inline** to show picking checklist (Section C)
- Only ONE card can be expanded at a time — tapping another collapses the current

**Card States:**
- **Pending** (default): white background, slate border
- **In Progress**: light blue background `#eff6ff`, blue-left-border `4px`
- **All Picked** (awaiting pack): light green background `#f0fdf4`, green-left-border
- **Packed/Done**: muted gray, checkmark icon, removed from active queue

**Empty State:**
- Large warehouse icon, text: "គ្មានបញ្ជាទិញដែលត្រូវរើស" (No orders to pick)
- "ស្រស់ស្អាត! ✓" — well done message

---

#### Section C — Inline Picking Checklist (Expanded Card)

Appears **below the card header** when a card is tapped. This is the primary work screen.

**Checklist Header:**
- Order number (large, bold)
- Customer: initials only
- Progress bar: `X of Y items picked` — green fill, shows live progress
- Estimated pick path note: "ចាប់ពី Bin A1 → B3 → C7" (suggested bin sequence, auto-sorted)

**Each Line Item Row:**
Every item in the order is rendered as a large checklist row:

| Element | Details |
|---|---|
| Product Image | Small thumbnail `48x48px` (if available), else SKU icon |
| Product Name | `text-lg font-semibold` — full name in Khmer/English |
| SKU Code | `text-sm font-mono text-slate-500` — monospace for scanner reference |
| Bin Location | **Yellow highlighted badge** `bg-yellow-400 text-black font-bold px-3 py-1 rounded` — e.g., `BIN-B3-S2` |
| Qty to Pick | Large: `text-2xl font-bold` — e.g., `× 3` |
| Done Checkbox | Giant checkbox button `h-14 w-14` or full-row tap target — toggles ✓ when tapped or when barcode scanned |

**Item States:**
- **Unpicked:** normal white row, bold text
- **Picked (✓):** row background `#f0fdf4`, text `line-through text-gray-400`, green check icon
- **Scan Mismatch:** row flashes red briefly — haptic feedback if supported — stays unpicked

**Barcode Scan Behavior Within Checklist:**
- Scan SKU → auto-tick that item's checkbox + plays success sound (if device supports)
- Scan unknown SKU → red flash on scan bar + error message: "SKU មិនត្រូវនឹងបញ្ជា" (SKU not on this order)
- Scan already-ticked item → no action, soft beep

**Checklist Footer Actions:**
- `[▲ បង្រួម]` — Collapse card (top-right corner, small)
- `[✓ ចំណាំ Damaged]` — Flag item as damaged (optional per-item action — small link)
- `[Mark as Packed]` button:
  - Only appears when ALL items are ticked (100% progress)
  - Button: full-width, `h-14`, green background, large white text
  - On tap: confirmation modal → "បញ្ជាក់ SO-XXXX ត្រូវបានវេចខ្ចប់?" → [បញ្ជាក់] [ទំនេរ]
  - After confirm: order moves to "Packed" state, card collapses and grays out

---

**Actions Available:**
- Tap card: expand/collapse checklist
- Scan barcode: auto-tick item
- Manual tap checkbox: manually tick item
- [Mark as Packed]: only when all picked
- [Flag Damaged]: per item, opens a note dialog
- Filter chips: filter queue by urgency

**Rules/Constraints:**
- **ZERO price fields** — no cost, no selling price, no currency symbols anywhere on this page
- Staff cannot see customer full name — initials only (privacy and simplicity)
- Staff cannot modify order contents — read-only item list
- Staff cannot cancel or reject orders — must be done by manager/sales
- Packed orders disappear from queue after a configurable time (e.g., 30 min) or on next page load
- Bin Location must always render — if null/empty, show "⚠ Bin មិនទាន់កំណត់" (Bin not assigned) in orange

**Files to Create/Modify:**
- `frontend/roles/08-warehouse-staff/pick-and-pack.html`

---

### 3.2 Inbound Stock Receiving (`receive-stock.html`)

**Purpose:** Allow warehouse staff to receive incoming supplier deliveries against open Purchase Orders, recording quantities received and flagging discrepancies — without seeing any cost/price information.

**Layout:** Card list of expected deliveries → full-screen receiving mode per delivery.

---

#### Section A — Daily Deliveries List

Displayed on page load. Shows all inbound deliveries expected today (derived from POs with expected delivery date = today, plus any overdue expected deliveries).

**Delivery Card (each expected delivery):**

| Element | Details |
|---|---|
| Vendor Name | `text-xl font-bold` |
| PO Number | `text-sm font-mono text-slate-500` — e.g., `PO-2026-00089` |
| Expected Item Count | "12 ប្រភេទ" (12 types) |
| Delivery Date | Today indicator (green dot) or overdue (red dot + days late) |
| Status Badge | `PENDING` / `IN PROGRESS` / `COMPLETED` |
| [Start Receiving] Button | `h-14 w-full`, slate background, white text |

**Sorting:** Overdue first, then today's pending, then completed at bottom (collapsed).

**Empty State:** "គ្មានការដឹកជញ្ជូនរំពឹងថ្ងៃនេះ" with truck icon.

---

#### Section B — Receiving Mode (Full-Screen, After Tapping [Start Receiving])

When [Start Receiving] is tapped, the page transitions to a **full-screen receiving session** for that delivery. Back button top-left returns to delivery list (with confirmation if items already entered).

**Receiving Mode Header:**
- Vendor name (large)
- PO Number (monospace)
- Scan bar: "ស្កែន barcode ទំនិញ…" — same sticky scan bar as pick-and-pack
- Progress indicator: "5 of 12 processed"

**Item Receiving Grid:**

Each expected item is listed as a large row:

| Element | Details |
|---|---|
| Product Image | `48x48px` thumbnail |
| Product Name | `text-lg font-semibold` |
| SKU Code | Monospace, `text-sm` |
| Ordered Qty | Label: "ចំនួនបញ្ជា:" value large gray text (read-only) |
| Received Qty Input | Large number input `h-14 text-2xl text-center` — default 0, tap to edit |
| Condition Selector | 3 large segmented buttons: `[✓ OK]` `[⚠ ខូច]` (Damaged) `[↓ ខ្វះ]` (Short-shipped) |
| Scan Status | Green check when scanned, empty circle when pending |

**Important Rules for Item Rows:**
- **NO unit cost field** — cost price is NEVER shown to warehouse staff
- Received qty input has `+` / `-` stepper buttons on both sides (large `h-10 w-10`) for easy tap adjustment
- Condition defaults to `OK` — staff must actively select Damaged or Short-shipped
- If `Damaged` selected: a note text area appears below the row (pre-filled suggestions: "ប្រអប់ខ្ទេច", "ទំនិញស្រួច", "ផ្ទៃខូច")
- If `Short-shipped` selected: received qty input auto-fills with ordered qty minus expected shortfall (editable)

**Scan Behavior:**
- Scan barcode → highlights that item row and opens received qty input (if qty is still 0)
- Scan barcode of already-processed item → jumps to that row, shows current recorded qty

**Receiving Mode Footer Actions:**
- `[បោះបង់]` Cancel (returns to list, clears unsaved data) — text button, less prominent
- `[Submit GRN]` — Primary button: `h-14 w-full`, green
  - Only enabled when ALL items have been processed (received qty > 0 OR explicitly marked as Short-shipped)
  - On tap: summary modal shows — count of OK items, Damaged items, Short-shipped items
  - Confirm → GRN record created, status changes to COMPLETED, returns to delivery list
  - On success: brief success toast: "GRN បានបញ្ជូន ✓"

---

**Actions Available:**
- [Start Receiving] per delivery card
- Scan barcode: identify and jump to item
- Tap received qty: number input
- Stepper +/- on qty
- Condition toggle: OK / Damaged / Short-shipped
- [Submit GRN]: finalizes receiving session
- [Cancel]: abort without saving

**Rules/Constraints:**
- **ZERO cost price fields** — absolutely no financial data shown
- Staff cannot see purchase price or unit cost anywhere in this flow
- Staff cannot create new POs or add items not in the original PO — they can only receive against existing expected items
- If a vendor brings items NOT in the PO, staff sees: "ទំនិញនេះមិននៅក្នុង PO — ទំនាក់ទំនង Procurement" (Item not in PO — contact procurement)
- GRN submission is final — cannot be edited by staff (only Procurement Manager or Admin can void)
- Overdue deliveries (expected date passed) shown with red "ហួសពេល X ថ្ងៃ" badge

**Files to Create/Modify:**
- `frontend/roles/08-warehouse-staff/receive-stock.html`

---

### 3.3 Physical Stock Audit Checklist (`stock-count.html`)

**Purpose:** Guide warehouse staff through a structured physical inventory count session, recording actual quantities per bin location, without revealing system quantities beforehand (to prevent bias).

**Layout:** Session list view → active session full-screen counting mode.

---

#### Section A — Count Sessions List

Displays all stock count sessions assigned to or started by this staff member.

**Session Card (each count session):**

| Element | Details |
|---|---|
| Session Title | e.g., "រាប់ស្តុក — Zone A" |
| Date Created | "ថ្ងៃទី 25 កញ្ញា 2026" |
| Zone / Location | Bin range or zone name — e.g., "Rack A1–A10" |
| Assigned By | Warehouse Manager name |
| Status Badge | `IN PROGRESS` (blue) / `COMPLETED` (green) / `PENDING REVIEW` (amber) |
| Item Count | "47 SKUs to count" |
| Progress | Mini progress bar: X of Y counted |
| [Continue Counting] or [View Results] | Button based on status |

**`[+ Start New Count]` Button:**
- Top-right of page header area, `h-14`
- Only available if Warehouse Manager has pre-created a session (staff does not create sessions from scratch)
- If no sessions are assigned: "គ្មានវគ្គរាប់ស្តុកដែលបានចាត់ចែង" (No counting sessions assigned)

---

#### Section B — Active Count Session (Full-Screen Mode)

**Session Header (sticky):**
- Session name + Zone
- Date
- Scan bar: "ស្កែន SKU ដើម្បីរកទំនិញ…" (Scan SKU to find item)
- Filter controls: [Zone/Bin] dropdown + [ទាំងអស់ / មិនទាន់រាប់] (All / Not yet counted) toggle
- Progress: "X of Y items recorded"

**Item Count Row:**

Each item that needs to be counted:

| Element | Details |
|---|---|
| Product Image | `48x48px` thumbnail if available, else gray SKU box |
| Product Name | `text-lg font-semibold` — full name |
| SKU Code | Monospace `text-sm text-slate-500` |
| Bin Location | **Yellow badge** `BIN-A3-S1` — exact shelf location |
| Physical Count Input | Large number input `h-14 text-2xl text-center` — default empty |
| Stepper buttons | `[−]` and `[+]` flanking the input, `h-12 w-12` each |
| Count Status | Empty circle → Green checkmark when a number is entered |

**CRITICAL: System Quantity is HIDDEN during active count session:**
- There is NO column for "System Qty" during counting — this is intentional to prevent staff from simply copying system numbers
- After the session is submitted and reviewed, the Warehouse Manager can reveal variances
- Staff sees only: product identity, location, and their own input field

**Scan-to-Find Behavior:**
- Scan SKU → scrolls to that item row and highlights it with a yellow pulse animation
- The count input for that item auto-focuses

**Item Not Found in Session:**
- If staff scans an SKU not in the current count session: "SKU នេះមិននៅក្នុងវគ្គរាប់" — contact manager button shown
- Staff cannot add items to a session themselves

**Sorting:**
- Default sort: by Bin Location (alphabetical — A1 before A2 before B1) so staff can walk shelves in order
- Option to sort: [Bin Location] | [Product Name] | [មិនទាន់រាប់ First]

**Session Footer (sticky bottom):**
- [Save Progress] — auto-save, preserves entered counts without submitting (staff can close app and return)
- [Submit Count] — primary full-width green `h-14` button:
  - Enabled only when ALL items in session have a count entered (even if the count is 0)
  - On tap: confirmation modal: "ផ្ញើរបាយការណ៍រាប់ស្តុកទៅ Warehouse Manager?"
  - After confirm: session status → `PENDING REVIEW`, read-only view with entered counts

**Submitted Session View:**
- Once submitted, row becomes read-only
- System quantity is revealed alongside staff-entered count: "System: 12 | Counted: 10 | Variance: -2"
- Variance highlighted in red if non-zero
- Awaiting manager review message

---

**Actions Available:**
- [Continue Counting] / [View Results] on session cards
- Scan barcode: find and focus item in list
- Tap qty input: enter count
- [−] [+] steppers: adjust count
- Sort toggle: by bin location, name, or uncounted first
- Filter: zone/bin filter dropdown
- [Save Progress]: save without submitting
- [Submit Count]: finalize and send to manager

**Rules/Constraints:**
- **ZERO price fields** — no cost, no selling price, no inventory value shown
- System quantity is **hidden during active counting** — revealed only post-submission
- Staff cannot create new count sessions — only managers can initiate
- Staff cannot edit a session after submission — manager must unlock it
- A submitted session showing `PENDING REVIEW` cannot be re-opened by staff
- Counts of 0 are valid and must be explicitly entered (cannot leave blank and submit)
- If a count session has been idle > 24 hours (no new entries), a reminder notification is sent

**Files to Create/Modify:**
- `frontend/roles/08-warehouse-staff/stock-count.html`

---

## 4. UI Identity Details

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#78716c` | Sidebar background, primary buttons, nav active state |
| Primary Dark | `#57534e` | Active nav highlight, pressed button state |
| Accent Yellow | `#facc15` | Bin Location badges, active input background, progress highlights |
| Success | `#22c55e` | Picked/done states, Submit GRN success, completed sessions |
| Warning | `#f59e0b` | Overdue deliveries, partial states |
| Danger | `#ef4444` | Scan mismatches, urgent badges, overdue flags |
| Background | `#f8fafc` | Page background |
| Card Surface | `#ffffff` | Card backgrounds |
| Text Primary | `#1e293b` | Main body text (very dark slate) |
| Text Secondary | `#64748b` | Sub-labels, meta info |
| Bin Badge BG | `#facc15` | Yellow highlight for bin locations |
| Bin Badge Text | `#1e293b` | Near-black on yellow for maximum readability |

### Typography

- **Item Names:** `font-semibold text-lg` (18px) minimum — no small text for product names
- **SKU Codes:** `font-mono text-sm text-slate-500` — monospace for barcode-reference
- **Quantities:** `font-bold text-2xl` — numbers must be immediately readable at arm's length
- **Labels/Meta:** `text-sm text-slate-400` — supporting info only, not primary focus
- **Bin Locations:** `font-bold text-base` inside yellow badge — maximum legibility
- **Buttons:** `font-semibold text-base` or `text-lg` — no small button text

### Unique Design Elements

1. **Sticky Scan Bar** — Always-visible barcode input at top of every page, yellow background, auto-focus. This is the signature interaction pattern for this role.
2. **Bin Location Yellow Badge** — Every bin location renders as a high-contrast yellow pill (`bg-yellow-400 text-black`) — unmistakable on any device in any lighting.
3. **Giant Checkbox Buttons** — Checklist items use full-row tap targets (minimum `h-14`) rather than tiny checkboxes — designed for gloved hands and large touch targets.
4. **Progress Rings on Cards** — Each order/session card shows a live mini donut progress ring (CSS-only, no ECharts) showing completion percentage.
5. **Zero Financial Chrome** — There are absolutely no dollar signs, price columns, cost fields, or currency-related labels anywhere in the entire role UI. The layout never allocates space for them.
6. **Scan Success Feedback** — On successful barcode scan, the matched row pulses green for 1 second. On failure, the scan bar flashes red. Audio feedback supported where browser allows.

### Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 640px` (phone/handheld) | Single column, bottom tab bar, full-width cards |
| `640px – 1024px` (tablet portrait) | Single column wide cards, side-pinned scan bar option |
| `> 1024px` (tablet landscape) | 2-column card grid, left sidebar visible |

---

## 5. Developer Notes

### Portal Configuration (`portal.js`)

- `wsPortal` nav config should already be present in v1 — **verify** the 3 nav items match exactly:
  - `{ id: 'pick', label: 'រើស និងវេចខ្ចប់', icon: 'mdi:package-variant-closed', href: 'pick-and-pack.html' }`
  - `{ id: 'receive', label: 'ទទួលទំនិញចូល', icon: 'mdi:truck-delivery-outline', href: 'receive-stock.html' }`
  - `{ id: 'count', label: 'រាប់ស្តុកជាក់ស្តែង', icon: 'mdi:clipboard-check-outline', href: 'stock-count.html' }`
- Badge on `pick` nav item: live count of pending orders
- Badge on `receive` nav item: count of expected deliveries today
- Dot badge on `count`: appears if any session is `IN PROGRESS`

### Data Fields Required (`data.js` / API)

For `pick-and-pack.html`:
```
order.id, order.priority ('urgent'|'normal'), order.customerInitials,
order.itemCount, order.createdAt,
lineItem.productName, lineItem.skuCode, lineItem.binLocation,
lineItem.qtyToPick, lineItem.productImageUrl, lineItem.isPicked
```

For `receive-stock.html`:
```
delivery.vendorName, delivery.poNumber, delivery.expectedDate,
delivery.status, delivery.items[],
item.productName, item.skuCode, item.orderedQty,
item.productImageUrl
```
> **IMPORTANT:** `item.unitCost` and `item.unitPrice` fields MUST NOT be passed to this frontend view — filter at API/portal level.

For `stock-count.html`:
```
session.id, session.title, session.zone, session.assignedBy,
session.status, session.createdAt,
sessionItem.productName, sessionItem.skuCode, sessionItem.binLocation,
sessionItem.productImageUrl, sessionItem.countedQty (null until entered),
sessionItem.systemQty (HIDDEN until session.status === 'PENDING REVIEW' or 'COMPLETED')
```

### Security / Data Filtering Rules

- The backend/portal layer MUST strip all financial fields before sending data to `wsPortal`
- Fields to strip: `unitCost`, `unitPrice`, `totalValue`, `margin`, `purchasePrice`, `sellingPrice`
- If any of these accidentally appear in DOM (via JS inspection), consider this a **security misconfiguration**
- Add a lint rule or automated test: scan all `08-warehouse-staff/*.html` files for `$`, `ដុល្លារ`, `price`, `cost`, `total` — fail build if found

### Shared Components

- Barcode scan input: create a shared component `components/scan-bar.js` — reused across all 3 pages
- Product image fallback: shared `components/product-thumb.js` — shows gray SKU box if no image
- Progress bar: shared CSS utility class `.pick-progress-bar` — green fill animation

### Accessibility

- All buttons must have `aria-label` attributes in both Khmer and English
- Scan input must have `aria-live="polite"` region for scan result announcements
- Color is never the sole indicator — always paired with icon or text label

### File Checklist

- [ ] `frontend/roles/08-warehouse-staff/pick-and-pack.html`
- [ ] `frontend/roles/08-warehouse-staff/receive-stock.html`
- [ ] `frontend/roles/08-warehouse-staff/stock-count.html`
- [ ] `frontend/components/scan-bar.js` (new shared component)
- [ ] Verify `portal.js` → `wsPortal` nav config is correct
- [ ] Automated test: zero price/cost fields in all WS HTML files
