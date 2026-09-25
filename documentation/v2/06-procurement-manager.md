# Procurement Manager — v2 UI/UX Design Plan

> **Role:** Procurement Manager ( អ្នកគ្រប់គ្រងលទ្ធកម្ម)
> **Portal ID:** `pmPortal` *(NEW — does not exist in v1, must be created in `portal.js`)*
> **Folder:** `frontend/roles/06-procurement-manager/`
> **Status:** Built almost entirely from scratch. v1 has only 3 sparse placeholder files.

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | B — Action & Pipeline Engine |
| **Primary Color** | Amber/Orange `#d97706` |
| **Secondary Accent** | Deep Amber `#b45309` |
| **Background Tone** | Warm white `#fffbeb` with amber-tinted sidebar |
| **UI Style** | Pipeline-focused: Kanban-like status flows, quick-action forms, split-view matching panels |
| **Key Persona** | **Purchasing Controller** — issues Purchase Orders, manages vendor relationships, reconciles supplier bills against delivery receipts using 3-Way Matching (PO ↔ GRN ↔ Bill) |
| **Price Visibility** | **FULL** — cost prices are fully visible. This role owns purchasing cost data. Selling prices are irrelevant and must not appear. |
| **Data Scope** | All vendors, all POs across the company, all supplier bills, GRN records from Warehouse |

---

## 2. Sidebar Navigation

Maximum 4 items. Each item maps to a top-level page. Sub-pages are reached via sub-navigation tabs or linked buttons — they do NOT appear as separate sidebar entries.

| # | ID | Label (Khmer) | Icon | href | Badge/Alert |
|---|---|---|---|---|---|
| 1 | `nav-dashboard` | ផ្ទាំងលទ្ធកម្ម | `mdi:shopping-outline` | `dashboard.html` | None |
| 2 | `nav-po` | បញ្ជាទិញ & វិក្កយបត្រ | `mdi:clipboard-list-outline` | `purchase-orders/purchase-orders.html` | **Yes** — count of Bills pending 3-Way Match approval |
| 3 | `nav-vendors` | អ្នកផ្គត់ផ្គង់ | `mdi:truck-delivery-outline` | `vendors/vendors.html` | None |
| 4 | `nav-reports` | របាយការណ៍ទិញ | `fa-chart-bar` | `reports/reports.html` | None |

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — Procurement Hub (`dashboard.html`)

**Purpose:** Give the Procurement Manager an immediate operational overview — pending requests, PO pipeline status, reorder alerts, and vendor performance — without any charts.

**Layout:** Single scrollable column. Full-width header bar at top, then a 3-column KPI row, then two equal-width panels side-by-side (Auto-Reorder | Recent PO Feed), then a full-width Vendor Snapshot section at the bottom.

---

#### Section A — Page Header Bar

- **Left:** Page title `ផ្ទាំងលទ្ធកម្ម` (Khmer), subtitle `Procurement Hub` (English small text)
- **Right:** Current date + time (live), user avatar + name, notification bell

---

#### Section B — KPI Cards Row (3 cards, equal width, 1/3 each)

Each KPI card is a compact box with: large number (bold), label (Khmer), sub-label (English), and a subtle amber left-border accent. **No sparklines, no charts.**

| Card # | Metric | Khmer Label | Notes |
|---|---|---|---|
| 1 | **Pending Purchase Requests** | សំណើទិញរង់ចាំ | Count of PRs submitted by Warehouse, not yet converted to PO. Clicking navigates to the PO list filtered to `status=pending_pr`. |
| 2 | **POs Awaiting Delivery** | PO រង់ចាំទទួល | Count of POs with status `Sent` or `Partial`. Clicking navigates to PO list filtered to those statuses. |
| 3 | **Bills Pending 3-Way Match** | វិក្កយបត្ររង់ចាំផ្ទៀងផ្ទាត់ | Count of supplier bills not yet matched against a GRN. This is the same number shown as the sidebar badge. Clicking navigates to the 3-Way Match tab. |

---

#### Section C — Auto-Reorder Suggestions (Left panel, ~60% width)

- **Title:** `ការណែនាំបញ្ជាទិញឡើងវិញ` / *Auto-Reorder Suggestions*
- **Purpose:** Smart list of inventory items that have dropped below their safety stock level, pulled from Warehouse data. This alerts the Procurement Manager to act without waiting for a formal Purchase Request.
- **Source:** Items where `current_qty < safety_stock_level` from `data.js → getAutoReorderSuggestions()`
- **Layout:** Scrollable card list (max 8 visible, then scroll). Each row/card contains:
  - **SKU badge** (amber pill, monospace font)
  - **Product Name** (Khmer + English)
  - **Current Qty** (shown in red if critical, orange if low)
  - **Suggested Reorder Qty** (calculated: `max_stock_level - current_qty` or vendor MOQ, whichever is higher)
  - **Preferred Vendor** (vendor name, if set on product)
  - **[ចេញ PO]** quick-action button (amber filled button) — clicking pre-fills a new Create PO form with this product + qty + preferred vendor and opens `create-po.html` in the same tab
- **Empty state:** If no items below safety stock, show a green checkmark with text `ស្តុកទំនិញទាំងអស់គ្រប់គ្រាន់` (*All stock levels are sufficient*)
- **Rules:** Items are sorted by severity: Critical first (qty = 0), then Low, then items approaching safety stock (within 10%).

---

#### Section D — Recent PO Status Feed (Right panel, ~40% width)

- **Title:** `ស្ថានភាព PO ថ្មីៗ` / *Recent PO Activity*
- **Purpose:** Quick glance at the last 5 Purchase Orders and their current lifecycle status.
- **Layout:** Vertical timeline-style list (not a table). Each entry shows:
  - PO number (e.g., `PO-2026-0041`) — clickable link → `view-po.html`
  - Vendor name
  - PO Total (formatted, KHR or USD depending on currency field)
  - Status badge pill:
    - `Draft` → gray
    - `Sent` → blue
    - `Partial` → amber
    - `Complete` → green
  - Date of last status change (relative: "2 days ago")
- **Max entries shown:** 5. A `[មើលទាំងអស់]` link at the bottom navigates to the full PO list.

---

#### Section E — Vendor Performance Snapshot (Full width, bottom)

- **Title:** `ដំណើរការអ្នកផ្គត់ផ្គង់` / *Vendor Performance*
- **Purpose:** Quick text-based summary of the top 3 vendors by purchase volume. **No chart.** This is a concise text grid only.
- **Layout:** 3 equal-width cards side by side. Each card shows:
  - Vendor name (bold)
  - Vendor code (small, muted)
  - **On-Time Delivery %** — large percentage number with color coding (green ≥ 90%, amber 70–89%, red < 70%)
  - Total POs this month: number
  - Total spend this month: formatted currency
  - A clickable link: `[មើលប្រវត្តិ]` → `vendors/view-vendor.html?id=xxx`
- **Rules:** Top 3 vendors are ranked by total PO value in the current calendar month. If fewer than 3 vendors exist, show only as many as exist.

---

**Actions Available on Dashboard:**
- Click KPI card numbers → navigate to filtered list pages
- `[ចេញ PO]` button on each reorder suggestion → pre-fill `create-po.html`
- Click PO number in feed → `view-po.html`
- Click `[មើលទាំងអស់]` → `purchase-orders.html`
- Click vendor name in snapshot → `view-vendor.html`

**Rules/Constraints:**
- **NO ECharts or chart libraries on this page.** All data is text/number only.
- All monetary values display with currency symbol (KHR ៛ or USD $) based on the PO's currency field.
- Dashboard data is read-only. No edits happen here.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/dashboard.html`

---

### 3.2 PO & Bills Management (`purchase-orders/purchase-orders.html`)

**Purpose:** Central hub for managing the full Purchase Order lifecycle and supplier billing, organized into three sub-navigation tabs on one page.

**Layout:** Full-width page. Top bar with page title + `[+ Create PO]` primary button (amber, right-aligned). Below that, a horizontal sub-nav tab bar. Tab content area fills the remaining space.

---

#### Sub-Navigation Tab Bar

Three tabs, rendered as pill-style toggles beneath the page header:

| Tab | Khmer Label | English Label | Default? |
|---|---|---|---|
| Tab 1 | `បញ្ជាទិញ (PO)` | Purchase Orders | **Yes (default active)** |
| Tab 2 | `វិក្កយបត្រទិញ` | Supplier Bills | No |
| Tab 3 | `ការផ្ទៀងផ្ទាត់ 3-Way` | 3-Way Match Review | No — shows count badge if unmatched items exist |

Active tab underline or background uses amber `#d97706`. Tab switching is client-side (no page reload). URL hash updates: `#po`, `#bills`, `#match`.

---

#### Tab 1 — Purchase Orders

**Toolbar (above table):**
- Search input: filter by PO#, vendor name
- Status dropdown filter: All / Draft / Sent / Partial / Complete
- Date range picker: filter by PO date

**Table Columns:**

| Column | Notes |
|---|---|
| PO # | Clickable link → `view-po.html?id=xxx`. Format: `PO-YYYY-NNNN` |
| Vendor | Vendor name |
| PO Date | `DD/MM/YYYY` format |
| Expected Delivery | Date |
| Total Amount | Formatted with currency symbol |
| Status | Pill badge: Draft (gray) / Sent (blue) / Partial (amber) / Complete (green) |
| ⋮ Actions | Context menu: View, Edit (only if Draft), Print PDF, Mark as Received, Cancel |

**Pagination:** 20 rows per page. Show total count above table.

**[+ Create PO] button:** Top-right. Opens `create-po.html`.

---

#### Tab 2 — Supplier Bills

**Purpose:** List all bills received from vendors, showing their payment and matching status.

**Toolbar:**
- Search: by Bill#, Vendor name
- Filter by: Match Status (All / Matched / Unmatched / Disputed)
- Date range picker

**Table Columns:**

| Column | Notes |
|---|---|
| Bill # | Supplier's bill/invoice number |
| Linked PO # | PO number this bill is associated with. Clickable → `view-po.html` |
| Vendor | Vendor name |
| Bill Date | Received date |
| Due Date | Payment due |
| Amount | Total bill amount |
| Match Status | Pill: Matched (green) / Unmatched (red) / Partial (amber) / Disputed (purple) |
| ⋮ Actions | View, Edit (if unmatched), Delete (if not posted), Run 3-Way Match |

**Note:** Creating bills is done from within `view-po.html` (link a bill to a PO), not from this tab independently. The `[+ Add Bill]` button on this tab should pre-prompt for a PO number first.

---

#### Tab 3 — 3-Way Match Review

**Purpose:** Show all unmatched or partially matched bills that require manual review. This is where the Procurement Manager compares what was ordered (PO), what was received (GRN), and what was billed (Bill).

**Layout:** Split-view panel. When a bill is selected from the left list, the right panel shows the 3-column comparison.

**Left panel — Unmatched Bills List:**
- Each row: Bill#, Vendor, Amount, Mismatch type (Qty / Price / Both)
- Clicking a row loads the comparison in the right panel.
- Items with `status=Disputed` are highlighted with a red left border.

**Right panel — 3-Column Comparison View:**

| Column | Source | Shows |
|---|---|---|
| PO Lines | Purchase Order | Product, Qty Ordered, Unit Cost agreed |
| GRN Lines | Goods Receipt Note (from Warehouse) | Product, Qty Received, Receipt date |
| Bill Lines | Supplier Bill | Product, Qty Billed, Unit Price billed |

Each line item is color-coded:
- **Green row:** PO qty = GRN qty = Bill qty — fully matched
- **Amber row:** Minor discrepancy (within tolerance, e.g., ±1 unit)
- **Red row:** Major mismatch — requires action

**Actions per unmatched item (right panel):**
- `[យល់ព្រម]` Accept match (within tolerance)
- `[ជំទាស់]` Dispute — opens a text reason modal
- `[កែសម្រួល Bill]` Edit the bill to correct qty/price

**Rules:**
- 3-Way Match logic: `PO.qty_ordered = GRN.qty_received = Bill.qty_billed`. Flag any line where all three do not match.
- Price tolerance: configurable in system settings (default 0%). Any price difference is flagged.
- A bill can only be approved for payment AFTER it is marked as `Matched` here.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/purchase-orders/purchase-orders.html`

---

### 3.3 Create Purchase Order (`purchase-orders/create-po.html`)

**Purpose:** Form for drafting a new Purchase Order to send to a vendor.

**Layout:** Two-column form layout. Left column (~65%): main form fields + line items table. Right column (~35%): financial summary panel (sticky on scroll).

---

#### Section A — PO Header Fields (Left column, top)

| Field | Type | Rules |
|---|---|---|
| PO Number | Auto-generated, read-only | Format: `PO-YYYY-NNNN`. Generated on Save. Display as placeholder before save. |
| Vendor | Custom searchable dropdown | Search by vendor name or code. Shows: vendor name + code + payment terms on selection. Required. |
| PO Date | Date picker | Default: today. Required. |
| Expected Delivery Date | Date picker | Must be ≥ PO Date. Required. |
| Delivery Address | Dropdown or text | Default: company warehouse address. Can be overridden. |
| Payment Terms | Auto-filled | Populated from selected vendor's default terms (e.g., Net 30). Editable. |
| Currency | Dropdown: KHR / USD | Default: USD |
| Internal Notes | Textarea | Optional. Not printed on PO document. |
| Vendor Notes / Instructions | Textarea | Optional. Printed on PO document. |

---

#### Section B — Line Items Table (Left column, middle)

A dynamic table where rows can be added/removed.

**Columns:**

| Column | Input Type | Rules |
|---|---|---|
| # | Auto-increment | Read-only |
| Product / SKU | Searchable dropdown | Search by SKU or product name. Selecting auto-fills Unit. |
| Description | Text input | Auto-filled from product. Editable. |
| Unit | Text (auto-filled) | e.g., Box, Piece, Kg |
| Qty Ordered | Number input | Min: 1. Required. |
| Unit Cost | Number input | **Cost price visible to PM.** Auto-filled from product's last purchase price. Editable. Required. |
| WHT % | Number input | Default 0. Applicable if vendor is subject to WHT. |
| Line Total | Auto-calculated | `Qty × Unit Cost`. Read-only. |
| Remove | ✕ button | Removes the row |

**[+ Add Line Item]** button below table. Adds a new empty row.

**Rules:**
- Minimum 1 line item required to save.
- Line total auto-updates on Qty or Unit Cost change (no page reload).
- Duplicate SKUs in the same PO are warned but not blocked.

---

#### Section C — Financial Summary Panel (Right column, sticky)

A card panel that auto-recalculates as line items change.

| Row | Calculation |
|---|---|
| Subtotal | Sum of all Line Totals |
| WHT Deduction | Sum of WHT amounts across lines |
| Grand Total | Subtotal − WHT |
| Currency | Selected currency (KHR/USD) |

Below the summary:
- **Status indicator:** `Draft` badge (will change to `Sent` after submitting)
- **[Save Draft]** button — amber outlined — saves without sending. PO status = `Draft`.
- **[Send to Vendor]** button — amber filled — saves and marks PO status = `Sent`. Triggers a confirmation modal: *"ផ្ញើ PO នេះទៅអ្នកផ្គត់ផ្គង់?"*

---

**Rules/Constraints:**
- Only vendors with `status=Active` appear in the vendor dropdown.
- A Draft PO can be edited freely. A Sent PO can only be edited with a revision note.
- Cancellation of a Sent PO requires a reason and triggers a notification to the vendor contact (logged in system).
- Cost prices are visible — this is correct for Procurement Manager.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/purchase-orders/create-po.html`

---

### 3.4 Edit Purchase Order (`purchase-orders/edit-po.html`)

**Purpose:** Edit an existing Draft or (with restriction) Sent PO.

**Layout:** Identical to `create-po.html`. All the same sections and fields apply.

**Differences from Create:**
- PO Number is pre-filled and read-only.
- Existing line items are pre-populated.
- If PO status is `Sent`, a **warning banner** is shown at the top: *"PO នេះត្រូវបានផ្ញើហើយ។ ការកែប្រែណាមួយនឹងត្រូវការហេតុផល។"* (*This PO has already been sent. Any changes require a reason.*)
- If status is `Sent`, an additional **"Revision Reason"** textarea is shown and required before saving.
- POs with status `Partial` or `Complete` cannot be edited (Edit button is disabled, tooltip: *"PO ត្រូវបានទទួលរួច — មិនអាចកែប្រែ"*).

**Actions:**
- `[Save Draft]` — only available if status is `Draft`
- `[Save Changes]` — available if status is `Sent` (with revision reason)
- `[Cancel]` — returns to `purchase-orders.html` without saving

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/purchase-orders/edit-po.html`

---

### 3.5 View Purchase Order (`purchase-orders/view-po.html`)

**Purpose:** Read-only detail view of a single Purchase Order, showing ordered vs. received quantities, linked GRNs, linked Bills, and 3-Way Match status.

**Layout:** Full-width page. Sticky header bar with PO metadata + action buttons. Below: tabbed or stacked sections for line items, GRNs, and Bills.

---

#### Section A — PO Header (Sticky top bar)

- PO Number (large, bold): e.g., `PO-2026-0041`
- Vendor name + code
- PO Date | Expected Delivery Date
- Payment Terms | Currency
- Status badge (large, prominent): Draft / Sent / Partial / Complete / Cancelled
- **Action buttons (right side):**
  - `[កែប្រែ]` Edit — disabled if status is Partial/Complete
  - `[បោះពុម្ព]` Print — generates print-friendly PO document (no sidebar/nav)
  - `[ផ្ញើទៅអ្នកផ្គត់ផ្គង់]` Send to Vendor — only shown if status is `Draft`

---

#### Section B — Line Items Table

Extends the standard line items with received quantity data overlaid.

| Column | Source | Notes |
|---|---|---|
| SKU | PO | Product code |
| Product Name | PO | Khmer + English |
| Qty Ordered | PO | Original quantity |
| Qty Received | GRN data (aggregated) | Sum of all GRN receipts for this PO line |
| Qty Outstanding | Calculated | `Qty Ordered − Qty Received` |
| Unit Cost | PO | Cost per unit |
| Line Total | Calculated | `Qty Ordered × Unit Cost` |
| Match Status | 3-Way logic | Per-line indicator: ✓ Matched / ⚠ Partial / ✗ Mismatch |

Row color coding:
- Fully received + matched: light green tint
- Partially received: light amber tint
- Not yet received: no tint (white)
- Mismatch: light red tint

---

#### Section C — Linked GRNs

- **Title:** `ប័ណ្ណទទួលទំនិញដែលភ្ជាប់` / *Linked Goods Receipt Notes*
- A table listing all GRNs that reference this PO:
  - GRN # | Receipt Date | Received By (Warehouse Staff name) | Total Items Received | Notes
  - Each GRN# is a clickable link (cross-role read-only view of the GRN)
- If no GRNs exist yet: *"មិនទាន់ទទួលទំនិញទេ"* (No goods received yet)

---

#### Section D — Linked Bills

- **Title:** `វិក្កយបត្ររបស់អ្នកផ្គត់ផ្គង់ដែលភ្ជាប់` / *Linked Supplier Bills*
- Table: Bill # | Bill Date | Amount | Match Status | Actions
- `[+ Link Bill]` button: allows attaching a new supplier bill to this PO by entering the bill number.
- `[Run 3-Way Match]` button: triggers match calculation and updates the Match Status column on all line items.

---

#### Section E — Internal Notes & Audit Trail

- Internal notes (from PO header)
- Revision history: timestamped log of status changes and edits (who, when, what changed)

**Rules/Constraints:**
- `[Edit]` button is only active for `Draft` or `Sent` status.
- `[Send to Vendor]` only appears if current status is `Draft`.
- Linking a bill is only available if PO status is `Sent` or `Partial`.
- All quantities and amounts are read-only on this view page.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/purchase-orders/view-po.html`

---

### 3.6 Vendor List (`vendors/vendors.html`)

**Purpose:** Master list of all suppliers/vendors used for purchasing.

**Layout:** Full-width page. Header with title + `[+ Add Vendor]` button. Filter bar. Data table below.

---

#### Section A — Filter Bar

- Search input: filter by vendor name, code, TIN
- Category dropdown: All / product categories (e.g., Electronics, Stationery, Raw Materials)
- Status filter: All / Active / Inactive / Blacklisted

---

#### Section B — Vendor Table

| Column | Notes |
|---|---|
| Vendor Code | e.g., `VND-001`. Monospace font. |
| Vendor Name | Khmer name (primary) + English name (secondary, smaller) |
| Phone | Main contact phone number |
| Category | Primary product category supplied |
| Outstanding AP Balance | Amount owed to this vendor (in KHR or USD). Red if overdue. |
| Last Order Date | Date of most recent PO. "Never" if no orders. |
| Status | Pill: Active (green) / Inactive (gray) / Blacklisted (red) |
| ⋮ Actions | View Profile, Edit, New PO, Deactivate, Blacklist |

**Pagination:** 25 rows per page.

**Rules:**
- Blacklisted vendors are shown in the list but cannot be selected in new POs (the vendor dropdown in `create-po.html` filters them out). A warning tooltip explains why.
- Deactivating a vendor does not delete their PO history.
- `[+ Add Vendor]` navigates to `create-vendor.html`.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/vendors/vendors.html`

---

### 3.7 Create Vendor (`vendors/create-vendor.html`)

**Purpose:** Form to register a new vendor/supplier in the system.

**Layout:** Single-column form, grouped into labeled fieldset sections. Submit buttons fixed at the bottom.

---

#### Section A — Basic Information

| Field | Type | Rules |
|---|---|---|
| Vendor Name (Khmer) | Text input | Required |
| Vendor Name (English) | Text input | Required |
| Vendor Code | Text input | Auto-suggested based on name (e.g., `VND-XXX`). Must be unique. |
| TIN (Tax ID) | Text input | Cambodian TIN format. Optional but recommended. |
| Business Type | Dropdown | Sole Proprietor / Company / Partnership / NGO |
| Status | Toggle | Active (default) / Inactive |

---

#### Section B — Contact Details

| Field | Type | Rules |
|---|---|---|
| Primary Phone | Text input | Required |
| Secondary Phone | Text input | Optional |
| Email | Email input | Optional |
| Website | URL input | Optional |
| Address (Khmer) | Textarea | Required |
| Address (English) | Textarea | Optional |
| Province/City | Dropdown | Cambodian provinces list |

---

#### Section C — Payment & Banking

| Field | Type | Rules |
|---|---|---|
| Default Payment Terms | Dropdown | Net 0 / Net 7 / Net 15 / Net 30 / Net 60 / COD |
| Currency | Dropdown | KHR / USD |
| Bank Name | Text input | Optional |
| Account Number | Text input | Optional |
| Account Name | Text input | Optional |
| SWIFT/BIC | Text input | Optional, for international transfers |

---

#### Section D — Supply Profile

| Field | Type | Rules |
|---|---|---|
| Product Categories Supplied | Multi-select checkboxes | List of system product categories |
| Minimum Order Quantity (MOQ) | Number input | Per-vendor default MOQ. Optional. |
| Lead Time (days) | Number input | Expected delivery time in days. Used in reorder suggestions. |
| Preferred Contact Person | Text input | Name of the vendor's sales rep |

---

#### Section E — Notes

| Field | Type | Notes |
|---|---|---|
| Pricing History Notes | Textarea | Free-text field for internal notes on pricing negotiations, past quotes, etc. Not shown to vendor. |
| Internal Comments | Textarea | General operational notes |

**Actions:**
- `[រក្សាទុក]` Save — validates all required fields, then saves and redirects to `view-vendor.html`
- `[បោះបង់]` Cancel — returns to `vendors.html` with no changes

**Rules/Constraints:**
- Vendor Code must be unique. System checks on blur.
- A vendor cannot be saved without at least one product category selected.
- TIN is recommended; show a soft warning (not blocking) if left empty.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/vendors/create-vendor.html`

---

### 3.8 Edit Vendor (`vendors/edit-vendor.html`)

**Purpose:** Edit an existing vendor's information.

**Layout:** Identical to `create-vendor.html`. All fields pre-populated from existing data.

**Differences from Create:**
- Vendor Code is pre-filled but still editable (with a warning: *"ការផ្លាស់ប្ដូរលេខកូដនឹងប៉ះពាល់ដល់ PO ដែលមានស្រាប់"* — changing the code will affect existing POs).
- An additional section shows **Audit Trail**: who last modified this vendor record and when.

**Actions:**
- `[រក្សាទុកការផ្លាស់ប្ដូរ]` Save Changes
- `[បោះបង់]` Cancel

**Rules:**
- Blacklisted vendors can be edited (to unblacklist them), but a confirmation modal is required.
- Purchase history is not editable from this form — it is always read-only.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/vendors/edit-vendor.html`

---

### 3.9 Vendor Profile (`vendors/view-vendor.html`)

**Purpose:** Comprehensive read-only profile of a single vendor, with purchase history and performance data.

**Layout:** Full-width page. Top header bar with vendor identity and action buttons. Below: horizontal tab navigation.

---

#### Section A — Vendor Profile Header

- Vendor Name (Khmer, large/bold) + English name below
- Vendor Code badge (amber pill)
- Status badge (Active/Inactive/Blacklisted)
- Contact info summary: Phone | Email | Address (one line)
- TIN number
- **Action Buttons (right side):**
  - `[កែប្រែ]` Edit → `edit-vendor.html?id=xxx`
  - `[PO ថ្មី]` New PO → `create-po.html?vendor=xxx` (pre-selects this vendor)

---

#### Section B — Tab Navigation (3 tabs)

| Tab | Khmer Label | English |
|---|---|---|
| Tab 1 | ប្រវត្តិបញ្ជាទិញ | Purchase History |
| Tab 2 | ព័ត៌មានទូទៅ | General Information |
| Tab 3 | ការប្រើប្រាស់ (ផលិតផល) | Products Supplied |

---

##### Tab 1 — Purchase History

- Date range filter (default: last 6 months)
- **Summary stats (text row, no chart):**
  - Total POs: count
  - Total Spend: formatted currency
  - On-Time Delivery Rate: % (green/amber/red)
  - Avg Lead Time: X days
- **PO History Table:**

| Column | Notes |
|---|---|
| PO # | Clickable → `view-po.html` |
| Date | PO creation date |
| Expected Delivery | Planned date |
| Actual Delivery | Date from GRN (or "Pending") |
| On-Time? | ✓ Yes / ✗ No / — Pending |
| Total Amount | Formatted |
| Status | Pill badge |

---

##### Tab 2 — General Information

- Read-only display of all fields from create/edit form:
  - Business details (name, TIN, type)
  - Full contact information
  - Address
  - Payment terms
  - Bank account details (masked: `****4521`)
  - Lead time, MOQ
  - Internal notes

---

##### Tab 3 — Products Supplied

- List of product categories this vendor supplies
- Optional: list of specific products with their last quoted price and last order date
- `[Update Supply Profile]` link → opens `edit-vendor.html` scrolled to Section D

**Rules/Constraints:**
- All data on this page is read-only. Edit must go through `edit-vendor.html`.
- Bank account number is masked for security (last 4 digits only shown).
- On-time delivery is calculated as: `actual_delivery_date <= expected_delivery_date`.

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/vendors/view-vendor.html`

---

### 3.4 reports/reports.html (របាយការណ៍ទិញ)

**Purpose:** Procurement analytics for strategic purchasing decisions.
**Access:** Procurement Manager only.
**ECharts Placement:** This page is the ONLY page in this portal that uses ECharts.

#### Layout Structure:
```
[HEADER: h-[72px]] — "របាយការណ៍ទិញ" | Export buttons
[FILTER BAR] — Date Range Picker (standard unified component) | Vendor filter
[KPI STRIP — 4 compact cards]
  1. ចំណាយសរុបខែនេះ (Total Spend This Month)
  2. PO កំពុងរង់ចាំ (Pending POs)
  3. អ្នកផ្គត់ផ្គង់សកម្ម (Active Vendors)
  4. ថ្លៃដើមមធ្យម/PO (Average PO Value)
[CHART ROW — 2 charts side by side]
  Left: Bar Chart — Monthly Spend by Vendor (ECharts bar, top 5 vendors)
  Right: Donut Chart — PO Pipeline Status (Draft / Approved / Received / Cancelled)
[TABLE SECTION]
  Title: “សមត្ថភាពអ្នកផ្គត់ផ្គង់” (Vendor Performance Summary)
  Columns: ឈ្មោះអ្នកផ្គត់ផ្គង់ | PO ចំនួន | តម្លៃសរុប | ចំនួននៃការផ្គត់ផ្គង់ទាន់ពេល (%) | ស្ថានភាព
[EXPORT BAR]
  Button: “ទាញចុះ Excel” + “ទាញចុះ PDF”
```

#### ECharts Specifications:

**Chart 1: Monthly Spend by Vendor (Bar Chart)**
- Type: `bar` (grouped)
- X-axis: Last 6 months (e.g., “មេសា, ឧសភា, មិថុនា, កក្កដា, សីហា, កញ្ញា”)
- Y-axis: Amount in USD
- Series: Top 5 vendors by spend, each a distinct bar color
- Tooltip: Vendor name + amount on hover

**Chart 2: PO Pipeline Status (Donut)**
- Type: `pie` with `radius: ['40%', '70%']` (donut)
- Data: Count of POs per status
- Colors: Draft=slate, Approved=amber, Received=green, Cancelled=red
- Center label: Total PO count

**Files to Create/Modify:** `frontend/roles/06-procurement-manager/reports/reports.html`

---

## 4. UI Identity Details

### Color System

| Token | Value | Usage |
|---|---|---|
| Primary Accent | `#d97706` (Amber 600) | Buttons, active tab underlines, KPI card borders, status badges |
| Deep Accent | `#b45309` (Amber 700) | Hover states, pressed button states |
| Background Base | `#fffbeb` (Amber 50) | Page background — warm, purchasing-energy tone |
| Sidebar Background | `#1c1917` (Stone 900) | Dark sidebar with amber highlights |
| Sidebar Active Item | `#d97706` text + amber left border | |
| Text Primary | `#1c1917` (Stone 900) | |
| Text Secondary | `#78716c` (Stone 500) | Sub-labels, timestamps |
| Dividers | `#e7e5e4` (Stone 200) | |
| Success Green | `#16a34a` | Matched status, on-time delivery |
| Warning Amber | `#d97706` | Partial status, low stock |
| Danger Red | `#dc2626` | Mismatch, overdue AP, critical stock |

### Typography

- **Page Titles:** 600 weight, 1.5rem
- **KPI Numbers:** 700 weight, 2.25rem, amber color
- **Table Headers:** 500 weight, 0.75rem, uppercase, letter-spaced, stone-500
- **Body Text:** 400 weight, 0.875rem
- **Khmer text:** Noto Sans Khmer, same weights
- **Monospace** (PO#, SKU, Vendor Code): `font-mono` class, stone-600

### Unique Design Elements

1. **Pipeline Status Flow:** PO lifecycle is visualized as a horizontal step indicator at the top of `view-po.html`: `Draft → Sent → Partial → Complete` — with the current step highlighted in amber.
2. **3-Way Match Split View:** The side-by-side 3-column comparison panel (PO / GRN / Bill) is a unique design element found nowhere else in the system.
3. **Auto-Reorder Card List:** Amber-accented card strips with a prominent `[ចេញ PO]` call-to-action — designed for speed (one click to start a PO from a suggestion).
4. **Warm Background Tone:** `#fffbeb` background distinguishes PM pages from the cooler/neutral tones of other roles.
5. **Vendor Performance Text Grid:** 3 vendor cards with large on-time % numbers — high information density, no charts needed.

---

## 5. Developer Notes

### portal.js Changes (CRITICAL — New Portal Required)

A new portal config must be added to `portal.js` in the `PORTAL_CONFIGS` object:

```
pmPortal: {
  id: 'pmPortal',
  role: 'procurement_manager',
  color: '#d97706',
  sidebar: [
    { id: 'nav-dashboard', labelKh: 'ផ្ទាំងលទ្ធកម្ម', icon: 'mdi:shopping-outline', href: 'dashboard.html', badge: false },
    { id: 'nav-po', labelKh: 'បញ្ជាទិញ & វិក្កយបត្រ', icon: 'mdi:clipboard-list-outline', href: 'purchase-orders/purchase-orders.html', badge: true, badgeSource: 'getPendingMatchCount' },
    { id: 'nav-vendors', labelKh: 'អ្នកផ្គត់ផ្គង់', icon: 'mdi:truck-delivery-outline', href: 'vendors/vendors.html', badge: false },
    { id: 'nav-reports', labelKh: 'របាយការណ៍ទិញ', icon: 'fa-chart-bar', href: 'reports/reports.html', badge: false },
  ]
}
```

### data.js — New Functions Required

| Function | Returns | Used By |
|---|---|---|
| `getPurchaseOrders(filters)` | Array of PO objects with status, vendor, lines, totals | PO list tab, dashboard feed |
| `getPurchaseOrderById(id)` | Single PO object with full line items + GRN + Bill links | `view-po.html` |
| `getVendors(filters)` | Array of vendor objects with AP balance, last order | Vendor list, vendor dropdown |
| `getVendorById(id)` | Single vendor object with full history | `view-vendor.html` |
| `getAutoReorderSuggestions()` | Items where `current_qty < safety_stock`. Includes preferred vendor. | Dashboard Section C |
| `getSupplierBills(filters)` | Array of bill objects with match status | Bills tab |
| `getGRNsForPO(poId)` | Array of GRN objects linked to a PO | `view-po.html` Section C |
| `getPendingMatchCount()` | Integer — count of unmatched bills | Sidebar badge, KPI card 3 |
| `createPurchaseOrder(data)` | New PO object | `create-po.html` |
| `updatePurchaseOrder(id, data)` | Updated PO object | `edit-po.html` |
| `createVendor(data)` | New vendor object | `create-vendor.html` |
| `updateVendor(id, data)` | Updated vendor object | `edit-vendor.html` |
| `runThreeWayMatch(billId)` | Match result object with per-line match status | 3-Way Match tab |

### PO Data Object Schema (Minimum Required Fields)

```
PurchaseOrder {
  id: string,           // PO-YYYY-NNNN
  vendor_id: string,
  po_date: date,
  delivery_date: date,
  payment_terms: string,
  currency: 'KHR' | 'USD',
  status: 'Draft' | 'Sent' | 'Partial' | 'Complete' | 'Cancelled',
  lines: [
    {
      sku: string,
      product_name_kh: string,
      product_name_en: string,
      unit: string,
      qty_ordered: number,
      unit_cost: number,
      wht_pct: number,
      line_total: number
    }
  ],
  subtotal: number,
  wht_total: number,
  grand_total: number,
  internal_notes: string,
  vendor_notes: string,
  linked_grn_ids: string[],
  linked_bill_ids: string[]
}
```

### 3-Way Matching Logic — Implementation Note

The match engine compares three data sets per PO line:
1. `PO.lines[i].qty_ordered` — what was ordered
2. `SUM(GRN.lines where sku=X and po_id=Y).qty_received` — what was received (may span multiple GRNs)
3. `Bill.lines[i].qty_billed` — what the vendor claims to have delivered

A line is `Matched` only if all three are equal AND unit cost on the Bill matches unit cost on the PO (within tolerance).
A line is `Partial` if GRN qty received < PO qty ordered (delivery not complete).
A line is `Mismatch` if Bill qty or price deviates from PO or GRN values beyond tolerance.

### Shared Components Used

- `components/sidebar.js` — portal sidebar (pmPortal config)
- `components/modal.js` — confirmation modals (Send to Vendor, Dispute bill)
- `components/data-table.js` — all list tables (POs, Vendors, Bills)
- `components/form-validator.js` — required field validation on create/edit forms
- `components/status-badge.js` — pill badges (Draft/Sent/Partial etc.)
- `components/currency-format.js` — KHR/USD formatting across all pages

### File Manifest — All Files to Create

```
frontend/roles/06-procurement-manager/
├── dashboard.html                          (CREATE)
├── purchase-orders/
│   ├── purchase-orders.html               (CREATE — 3-tab page)
│   ├── create-po.html                     (CREATE)
│   ├── edit-po.html                       (CREATE)
│   └── view-po.html                       (CREATE)
├── vendors/
│   ├── vendors.html                       (CREATE)
│   ├── create-vendor.html                 (CREATE)
│   ├── edit-vendor.html                   (CREATE)
│   └── view-vendor.html                   (CREATE)
└── reports/
    └── reports.html                       (CREATE — ECharts Analytics)
```

Total: **10 new HTML files** to build from scratch.

---

*Document version: v2.0 | Role: 06-Procurement Manager | Last updated: 2026-09-25*
