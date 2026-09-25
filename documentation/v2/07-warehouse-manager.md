# Warehouse Manager — v2 UI/UX Design Plan

> **Role:** Warehouse Manager / Inventory Controller (អ្នកគ្រប់គ្រងឃ្លាំង)
> **Portal ID:** `wmPortal`
> **Folder:** `frontend/roles/07-warehouse-manager/`
> **Status:** Restructured from v1. Sidebar consolidated from 5 items → 4 items. ECharts moved off Dashboard → Reports page only.

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | B + C Hybrid — *Action & Governance* |
| **Primary Color** | Slate `#475569` (Slate 600) |
| **Secondary Accent** | Stone `#57534e` |
| **Background Tone** | Cool white `#f8fafc` (Slate 50) — industrial, neutral |
| **UI Style** | Operations-focused: dense data tables, status queues, approval workflows, binary-clear actions |
| **Key Persona** | **Inventory Controller** — manages physical stock balance, approves stock adjustments, creates transfer slips, monitors reorder alerts, receives incoming PO deliveries. Does NOT own procurement decisions. |
| **Price Visibility** | **CRITICAL RESTRICTION:** Selling prices (`តម្លៃលក់`) must **NEVER** appear anywhere in this role's UI. Cost prices are visible for inventory valuation purposes ONLY. Any table, form, or report that would normally include a selling price column must omit it entirely. |
| **Data Scope** | All warehouses/locations under WM authority. GRNs from procurement POs. Stock movements company-wide. |

---

## 2. Sidebar Navigation

Restructured from v1. **4 items.** v1 had 5+ items including "ប័ណ្ណផ្ទេរស្តុក", "ការកែតម្រូវស្តុក", "ការដាស់តឿនស្តុក" as separate nav entries — in v2 these are **merged into one nav item** with sub-tabs.

| # | ID | Label (Khmer) | Icon | href | Badge/Alert |
|---|---|---|---|---|---|
| 1 | `nav-dashboard` | ផ្ទាំងគ្រប់គ្រងស្តុក | `mdi:store-24-hour` | `dashboard.html` | None |
| 2 | `nav-balance` | តុល្យភាពស្តុក | `mdi:package-variant-closed` | `stock-balance/balance.html` | None |
| 3 | `nav-movements` | ចលនា & កែតម្រូវ | `mdi:swap-horizontal` | `movements/movements.html` | **Yes** — count of pending adjustments awaiting WM approval |
| 4 | `nav-reports` | របាយការណ៍ស្តុក | `mdi:chart-bar` | `reports/reports.html` | None |

**v1 → v2 Sidebar Migration:**
- v1 `ប័ណ្ណផ្ទេរស្តុក` → merged into `movements/movements.html` Tab 1 (Transfers)
- v1 `ការកែតម្រូវស្តុក` → merged into `movements/movements.html` Tab 2 (Adjustments)
- v1 `ការដាស់តឿនស្តុក` → merged into `movements/movements.html` Tab 3 (Alerts)
- v1 `dashboard.html` — retained, but ECharts removed and moved to `reports/reports.html`

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — Warehouse Overview (`dashboard.html`)

**Purpose:** Give the Warehouse Manager an instant operational picture — stock health, pending actions, and incoming deliveries — in a single glance with no charts.

**Layout:** Single scrollable column. Full-width header bar. Then a 4-card KPI row. Then two equal panels (Low Stock Alerts | Pending Actions). Then full-width Incoming Deliveries section at the bottom.

---

#### Section A — Page Header Bar

- **Left:** Page title `ផ្ទាំងគ្រប់គ្រងស្តុក` (Khmer) + subtitle `Warehouse Overview` (English small)
- **Right:** Date/time (live), user avatar, notification bell
- Background: Slate sidebar contrast, clean white main area

---

#### Section B — KPI Cards Row (4 cards, equal width, 1/4 each)

Each card: large bold number, Khmer label, English sub-label, slate left-border accent. No sparklines. No charts.

| Card # | Metric | Khmer Label | Behavior |
|---|---|---|---|
| 1 | **Total Active SKUs** | ផលិតផលសរុប | Count of all products with `status=Active` in the catalog. Static info — no click action needed. |
| 2 | **Low Stock Items** | ទំនិញស្តុកទាប | Count of items where `current_qty < safety_stock_level`. **Clickable** — navigates to `stock-balance/balance.html` pre-filtered to show only Low/Critical items. |
| 3 | **Pending Transfer Slips** | ប័ណ្ណផ្ទេររង់ចាំ | Count of transfer slips with `status=Pending`. Clicking → `movements/movements.html#transfers` filtered to Pending. |
| 4 | **Pending Adjustments (Awaiting Approval)** | ការកែតម្រូវរង់ចាំ | Count of stock adjustments submitted but not yet approved by WM. This is the same number shown as the sidebar badge on `nav-movements`. Clicking → `movements/movements.html#adjustments` filtered to Pending. |

---

#### Section C — Low Stock Alert Cards (Left panel, ~55% width)

- **Title:** `ការព្រមាននៃស្តុកទំនិញ` / *Stock Level Alerts*
- **Purpose:** Visual flag cards for inventory items that are critically low. Designed for immediate visual scanning.
- **Layout:** A vertical stack of alert cards. Each card is a compact strip with a color-coded left border:
  - **Red border:** Critical — `current_qty = 0` (Out of Stock)
  - **Amber border:** Low — `current_qty > 0` but `< safety_stock_level`
- **Each card shows:**
  - SKU badge (monospace, slate pill)
  - Product Name (Khmer, bold) + English (smaller)
  - **Current Qty** (large, colored red or amber based on severity)
  - **Safety Stock Level** (gray text: "Safety: 50 pcs")
  - Bin Location (e.g., `A-03-2`)
  - **[ស្នើបញ្ជាទិញ]** Request Reorder button (slate-outlined, small) — triggers a notification/purchase request to the Procurement Manager. On click: shows a confirmation modal where WM can optionally add a note, then creates a `PurchaseRequest` record and notifies `pmPortal`.
- **Sorting:** Out of Stock first, then sorted by `(current_qty / safety_stock_level)` ascending (most critical first).
- **Max visible without scroll:** 6 cards. Scroll within this panel for more.
- **Empty state:** Green checkmark + `"ស្តុកទំនិញទាំងអស់គ្រប់គ្រាន់"` — all stock at safe levels.
- **Price rule:** NO selling price anywhere on these cards. Show `cost_price` ONLY if needed for valuation context (e.g., "Cost Impact: $X"). If cost is shown, label it explicitly as `ថ្លៃដើម` (Cost) never `តម្លៃ` alone.

---

#### Section D — Pending Actions Queue (Right panel, ~45% width)

- **Title:** `សកម្មភាពរង់ចាំការអនុម័ត` / *Pending Actions*
- **Purpose:** A combined list of all items requiring WM sign-off. This is the WM's "to-do inbox."
- **Layout:** Vertically scrollable queue list. Items are grouped by type with a small type label.
- **Item types shown:**

| Type | Label (Khmer) | Description |
|---|---|---|
| Adjustment | `ការកែតម្រូវស្តុក` | Stock adjustment submitted by warehouse staff. Shows: product name, qty change (+/-), reason |
| Transfer | `ការផ្ទេរស្តុក` | Transfer slip pending WM approval. Shows: from/to location, product, qty |

- **Each queue item shows:**
  - Type badge (pill: blue = Transfer, purple = Adjustment)
  - Product name
  - Qty change / transfer qty
  - Submitted by + time ago (e.g., "by សុខ • 2h ago")
  - **[អនុម័ត]** Approve button (green, small)
  - **[បដិសេធ]** Reject button (red outlined, small)
  - Clicking the item title opens the full detail in a modal (not a new page) for review before approving.
- **If empty:** `"គ្មានសកម្មភាពរង់ចាំ"` — no pending actions.

---

#### Section E — Incoming Deliveries Today (Full width, bottom)

- **Title:** `ការដឹកជញ្ជូនដែលត្រូវទទួលថ្ងៃនេះ` / *Incoming Deliveries Today*
- **Purpose:** Show POs from Procurement that are expected to arrive today (Expected Delivery Date = today). Helps WM prepare to receive goods.
- **Layout:** Horizontal card strip or compact table. One row/card per PO.
- **Each entry shows:**
  - PO # (read-only reference — not editable from here)
  - Vendor name
  - Expected items: count of line items
  - Delivery address / warehouse location
  - `[ចាប់ផ្ដើមទទួល]` Start Receiving button → opens a new GRN creation form pre-linked to this PO (navigates to `movements/create-grn.html?po=xxx`)
- **If no deliveries today:** `"គ្មានការដឹកជញ្ជូនថ្ងៃនេះ"` — nothing expected.
- **Data source:** `getPOsExpectedToday()` — filters POs with `status=Sent OR Partial` and `expected_delivery_date = TODAY`.

**Actions Available on Dashboard:**
- Click KPI cards 2/3/4 → navigate to filtered list pages
- `[ស្នើបញ្ជាទិញ]` → create purchase request notification
- `[អនុម័ត]` / `[បដិសេធ]` → approve/reject pending actions inline
- `[ចាប់ផ្ដើមទទួល]` → open GRN creation

**Rules/Constraints:**
- **NO ECharts on this page.** All data is text, numbers, and status badges only.
- No selling prices anywhere on this page.
- Dashboard is primarily read + quick-action. No bulk edit operations.
- The `[ស្នើបញ្ជាទិញ]` action creates a record that appears in `pmPortal` dashboard's "Pending Purchase Requests" KPI.

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/dashboard.html` — remove existing ECharts, add new sections C/D/E.

---

### 3.2 Stock Balance & SKU Catalog (`stock-balance/balance.html`)

**Purpose:** The definitive reference for current stock levels across all locations and the full product catalog, split into two sub-tabs.

**Layout:** Full-width page. Header with page title + `[+ Add Product]` button (right). Sub-nav tab bar below header. Tab content fills remaining space.

---

#### Sub-Navigation Tab Bar

| Tab | Khmer Label | English Label | Default? |
|---|---|---|---|
| Tab 1 | `ស្តុកទំនិញ` | Stock Balance | **Yes** |
| Tab 2 | `កាតាឡុកផលិតផល` | Product Catalog | No |

Active tab uses slate `#475569` underline/background.

---

#### Tab 1 — Stock Balance

**Toolbar:**
- **Search input:** filter by SKU, product name (Khmer or English), barcode
- **Category dropdown:** All + list of product categories
- **Location/Warehouse dropdown:** All locations / specific bin or warehouse zone
- **Status filter:** All / OK / Low / Critical / Out of Stock
- **[Export]** button (CSV/Excel) — exports current filtered view

**Table Columns:**

| Column | Notes |
|---|---|
| SKU | Monospace, slate badge. Clickable → product detail modal or catalog entry. |
| Image | Small thumbnail (32×32px). Fallback: product category icon. |
| Product Name (KH) | Primary, bold |
| Product Name (EN) | Secondary, smaller, gray |
| Category | Text |
| Bin Location | e.g., `A-03-2`. If multiple locations, show primary + count. |
| On-Hand Qty | Total physically in stock across all locations |
| Reserved Qty | Qty allocated to confirmed but unfulfilled sales orders |
| Available Qty | `On-Hand − Reserved` — what can actually be picked |
| Safety Stock | Threshold level configured per product |
| Cost Price | `ថ្លៃដើម` — visible to WM for valuation purposes. Clearly labeled as cost. |
| Status | Pill badge: OK (green) / Low (amber) / Critical (orange) / Out of Stock (red) |
| ⋮ Actions | View Movement History, Transfer Stock (→ create transfer), Request Adjustment, Set Safety Stock Level |

**PRICE RULE — CRITICAL:** The column is explicitly labeled **"ថ្លៃដើម (Cost)"**. There is no selling price column. No selling price data is fetched or rendered on this page.

**Pagination:** 25 rows per page. Row count indicator shown above table.

**Row color tinting:**
- Out of Stock: very light red background `#fef2f2`
- Critical: very light orange background `#fff7ed`
- Low: very light amber background `#fffbeb`
- OK: default white

---

#### Tab 2 — Product Catalog

**Purpose:** Full product master data — descriptions, barcodes, images, units. Used for product management.

**Toolbar:**
- Search by SKU, name, barcode
- Category filter
- Status filter (Active / Inactive / Discontinued)
- **[+ Add Product]** button — opens `stock-balance/create-product.html`

**Layout options toggle (top right):** Grid view (cards with image) / List view (dense table). Default: List view.

**List View Table Columns:**

| Column | Notes |
|---|---|
| SKU | Monospace |
| Product Image | Thumbnail |
| Product Name KH + EN | Two-line cell |
| Category | Text |
| Unit of Measure | e.g., Box, Piece, Kg |
| Barcode | EAN-13 / QR value (text) |
| Status | Active / Inactive / Discontinued |
| ⋮ Actions | Edit, Deactivate, View Stock Levels, Print Barcode Label |

**Grid View Cards:**
- 4 columns (responsive: 2 on tablet, 1 on mobile)
- Each card: product image (top), SKU badge, name, category, unit, status badge
- Click card → product detail/edit

**Rules:**
- Only Active products appear in the stock balance tab by default.
- Deactivating a product does not delete its stock history.
- The `[+ Add Product]` button is available in both tabs (it's a catalog-level action).

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/stock-balance/balance.html`

---

### 3.3 Movements & Adjustments (`movements/movements.html`)

**Purpose:** The consolidated operational hub for all stock movements — transfers between locations, inventory adjustments, and reorder alerts — previously spread across 3 separate v1 sidebar items.

**Layout:** Full-width page. Header with page title. Sub-nav tabs. Per-tab toolbar + content. Contextual action buttons per tab.

---

#### Sub-Navigation Tab Bar

| Tab | Khmer Label | English Label | Default? | Badge? |
|---|---|---|---|---|
| Tab 1 | `ប័ណ្ណផ្ទេរ` | Stock Transfers | **Yes** | No |
| Tab 2 | `ការកែតម្រូវ` | Stock Adjustments | No | Yes — pending count |
| Tab 3 | `ការដាស់តឿន` | Reorder Alerts | No | No |

---

#### Tab 1 — Stock Transfers

**Purpose:** Manage all stock transfer slips (moving inventory between warehouse locations, bins, or stores).

**Toolbar:**
- Search by Transfer #, product name, location
- Status filter: All / Pending Approval / Approved / In Transit / Completed / Rejected
- Date range filter
- **[+ New Transfer]** button (right) — opens `create-transfer.html`

**Table Columns:**

| Column | Notes |
|---|---|
| Transfer # | Auto-generated. Format: `TR-YYYY-NNNN`. Clickable → `view-transfer.html` |
| From Location | Source warehouse/bin |
| To Location | Destination warehouse/bin |
| Products | Count of line items. Hover/click shows popover with product list. |
| Total Qty | Sum of all item quantities transferred |
| Submitted By | Name of staff who created the slip |
| Date | Transfer slip creation date |
| Status | Pending Approval / Approved / In Transit / Completed / Rejected |
| ⋮ Actions | View, Approve (if Pending + WM is actor), Reject, Print Slip, Cancel |

**Status Pill Colors:**
- Pending Approval: amber
- Approved: blue
- In Transit: indigo
- Completed: green
- Rejected: red

---

#### Tab 2 — Stock Adjustments

**Purpose:** Handle manual stock adjustments (e.g., correcting inventory count after a physical count, writing off damaged goods).

**Toolbar:**
- Search by Adjustment #, product name
- Type filter: All / Increase / Decrease / Write-Off / Count Correction
- Approval status filter: All / Pending / Approved / Rejected
- Date range filter
- **[+ New Adjustment]** button — opens `create-adjustment.html`

**Table Columns:**

| Column | Notes |
|---|---|
| Adjustment # | Format: `ADJ-YYYY-NNNN`. Clickable → `view-adjustment.html` |
| Product SKU + Name | |
| Adjustment Type | Increase / Decrease / Write-Off / Count Correction |
| Qty Change | `+25` or `−10` format. Color: green for increase, red for decrease. |
| Cost Impact | `qty_change × cost_price`. Shows valuation impact. **No selling price.** |
| Reason | Short text summary of reason |
| Submitted By | |
| Date Submitted | |
| Approval Status | Pending (amber) / Approved (green) / Rejected (red) |
| Approved By | WM name or "—" |
| ⋮ Actions | View, Approve (WM only, if Pending), Reject (WM only), Edit (if still Draft) |

**Approval Workflow:**
1. Warehouse Staff submits adjustment (status = `Pending`)
2. Adjustment appears in WM's dashboard Pending Actions Queue
3. WM reviews and approves or rejects (with mandatory rejection reason)
4. Approved adjustments update stock balance immediately
5. Rejected adjustments are logged but do not affect stock

---

#### Tab 3 — Reorder Alerts

**Purpose:** List of all products currently below their safety stock level, with reorder recommendations. This is the same data set shown in the Dashboard Section C but in full tabular form.

**Layout:** Filter bar + table. No sub-tabs within this tab.

**Toolbar:**
- Category filter
- Severity filter: All / Out of Stock / Critical / Low
- **[Request All]** bulk button — creates purchase requests for ALL items in the current filtered view at once (with confirmation modal)

**Table Columns:**

| Column | Notes |
|---|---|
| SKU | |
| Product Name | |
| Category | |
| Current Qty | Red if 0, orange if critical, amber if low |
| Safety Stock Level | Threshold |
| Shortage Qty | `safety_stock − current_qty` (always positive here) |
| Preferred Vendor | Vendor name. "Not set" if none configured. |
| Suggested Reorder Qty | `max_stock_level − current_qty` or vendor MOQ — whichever is higher |
| Last Reorder Date | Date of last PO for this product |
| Status | Out of Stock / Critical / Low (pill, color-coded) |
| ⋮ Actions | Request Reorder (creates PR to Procurement), View Stock History |

**Rules:**
- `[Request Reorder]` per row creates a `PurchaseRequest` record visible to Procurement Manager in `pmPortal`.
- A product can only have one active `PendingPurchaseRequest` at a time. If one already exists, the button is replaced with a `PR Sent` badge.
- This tab is **read-only for data** — WM cannot edit safety stock levels from here (that is done via the ⋮ menu in `balance.html`).

---

**Actions Available on Movements Page:**
- Per-tab `[+ New Transfer]` and `[+ New Adjustment]` buttons
- Row-level ⋮ context menus
- Approve/Reject on pending items (inline or via detail view)
- `[Request Reorder]` on alert items
- Tab switching (URL hash: `#transfers`, `#adjustments`, `#alerts`)

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/movements.html`

---

### 3.4 Create Stock Transfer (`movements/create-transfer.html`)

**Purpose:** Form to create a new stock transfer slip between locations.

**Layout:** Two-column layout. Left (~65%): form fields + line items. Right (~35%): summary panel (sticky).

---

#### Section A — Transfer Header

| Field | Type | Rules |
|---|---|---|
| Transfer # | Auto-generated, read-only | Format: `TR-YYYY-NNNN` |
| From Location | Dropdown | List of warehouse zones/bins |
| To Location | Dropdown | List of warehouse zones/bins. Must differ from From Location. |
| Transfer Date | Date picker | Default: today. Required. |
| Reason / Purpose | Text input | Brief description (e.g., "Restocking Shop Floor"). Required. |
| Notes | Textarea | Optional additional notes |

---

#### Section B — Line Items

Dynamic table. Each row:

| Column | Input | Rules |
|---|---|---|
| Product / SKU | Searchable dropdown | Shows available qty at `From Location`. |
| Available Qty | Read-only | Pulled from stock balance at From Location. |
| Qty to Transfer | Number input | Must be ≥ 1 and ≤ Available Qty. Validated on entry. |
| Unit | Auto-filled | |
| Remove | ✕ button | |

`[+ Add Item]` button adds new row. Min 1 item required.

---

#### Section C — Summary Panel (Right column, sticky)

- Total items: count
- Total qty: sum
- From → To locations (visual indicator)
- Status: `Draft` (pending approval)
- `[ដាក់ជូនអនុម័ត]` Submit for Approval — slate filled button. Sets status to `Pending Approval`, notifies WM.
- `[រក្សាទុកព្រាង]` Save Draft — saves without submitting.
- `[បោះបង់]` Cancel

**Rules:**
- Transfer qty cannot exceed available qty at the source location.
- Both locations must be specified before adding line items.
- A transfer slip cannot be submitted if any line item has validation errors.

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/create-transfer.html`

---

### 3.5 View Stock Transfer (`movements/view-transfer.html`)

**Purpose:** Read-only detail view of a single transfer slip.

**Layout:** Full-width. Sticky header with TR# + status. Below: sections for header info, line items, and audit trail.

**Header:** TR#, From/To locations, date, submitted by, status badge.
**Action Buttons (WM only, right side):**
- `[អនុម័ត]` Approve — only shown if status = `Pending Approval` and current user = WM
- `[បដិសេធ]` Reject — opens modal for rejection reason. Required text.
- `[បោះពុម្ព]` Print Transfer Slip

**Line Items Table:** SKU, Product Name, Available Qty at time of transfer, Qty Transferred, Unit.

**Audit Trail:** Status change log — who submitted, who approved/rejected, timestamps.

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/view-transfer.html`

---

### 3.6 Create Stock Adjustment (`movements/create-adjustment.html`)

**Purpose:** Form to manually adjust inventory quantities for a single product.

**Layout:** Single-column form. Submit buttons at bottom.

---

#### Form Fields

| Field | Type | Rules |
|---|---|---|
| Adjustment # | Auto-generated, read-only | Format: `ADJ-YYYY-NNNN` |
| Product / SKU | Searchable dropdown | Required. Shows current qty on selection. |
| Current Qty (read-only) | Number display | Auto-filled from stock data |
| Adjustment Type | Dropdown | Increase / Decrease / Write-Off / Count Correction |
| Qty Change | Number input | Positive integer for increase, negative for decrease. System converts based on Type selection. |
| New Qty After Adjustment | Read-only | `Current Qty + Qty Change`. Shown in real-time. |
| Reason (Khmer) | Textarea | Required. Minimum 10 characters. |
| Supporting Document | File upload | Optional. PDF, JPG, PNG. Max 5MB. |
| Cost Impact | Read-only display | `Qty Change × Cost Price`. **No selling price.** Labeled as `ផលប៉ះពាល់ថ្លៃដើម`. |

**Action Buttons:**
- `[ដាក់ជូនអនុម័ត]` Submit for Approval — creates record with `status=Pending`. Notifies WM.
- `[រក្សាទុកព្រាង]` Save as Draft
- `[បោះបង់]` Cancel

**Rules:**
- A `Decrease` or `Write-Off` cannot reduce stock below 0.
- Count Correction adjustments require a mandatory supporting document upload.
- The form clearly displays current qty before and projected qty after — to prevent input errors.

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/create-adjustment.html`

---

### 3.7 View Stock Adjustment (`movements/view-adjustment.html`)

**Purpose:** Read-only detail view of a single stock adjustment, with WM approval controls.

**Layout:** Full-width. Sticky header with ADJ#, product name, status. Below: adjustment details + approval section.

**Sections:**
- **Adjustment Details:** All fields from create form (read-only display)
- **Cost Impact panel:** Shows qty change × cost. No selling price.
- **Supporting Document:** Displayed inline if uploaded (PDF embed or image preview)
- **WM Approval Section (shown only to WM if status = Pending):**
  - Reason summary
  - `[អនុម័ត]` Approve button → sets status to `Approved`, updates stock balance immediately
  - `[បដិសេធ]` Reject button → opens modal requiring rejection reason text
- **Audit Trail:** Submission timestamp, approver name + timestamp, rejection reason if applicable

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/view-adjustment.html`

---

### 3.8 GRN Creation (`movements/create-grn.html`)

**Purpose:** Goods Receipt Note — record the physical receipt of goods from a supplier delivery against a specific PO.

**Layout:** Two-column form. Left: GRN details + line items. Right: linked PO summary (sticky).

**Note:** This page is typically reached by clicking `[ចាប់ផ្ដើមទទួល]` from the dashboard or from `view-po.html` in Procurement, with `?po=XXX` pre-filled.

---

#### Section A — GRN Header

| Field | Type | Rules |
|---|---|---|
| GRN # | Auto-generated, read-only | Format: `GRN-YYYY-NNNN` |
| Linked PO # | Searchable dropdown or pre-filled | Required. Selecting a PO pre-populates line items. |
| Vendor | Auto-filled from PO | Read-only |
| Receipt Date | Date picker | Default: today. Required. |
| Delivery Note # | Text input | Vendor's delivery note/packing slip number |
| Received By | Auto-filled | Current logged-in WM/staff name |
| Warehouse Location | Dropdown | Where goods are being received into |
| Notes | Textarea | Optional |

---

#### Section B — Line Items (Linked from PO)

Pre-populated from the selected PO. Each row:

| Column | Notes |
|---|---|
| Product / SKU | From PO. Read-only. |
| Qty Ordered (from PO) | Read-only reference |
| Qty Previously Received | Sum of past GRNs for this line (read-only) |
| Qty Outstanding | `Ordered − Previously Received`. Highlighted if 0 (already fully received). |
| Qty Received Now | **Editable.** Must be ≥ 0 and ≤ Qty Outstanding. |
| Condition | Dropdown: Good / Damaged / Rejected |
| Notes | Per-line notes (e.g., "2 boxes damaged") |

---

#### Section C — Right Panel: Linked PO Summary

- PO # + Vendor
- PO Date + Expected Delivery
- Total PO value (cost)
- Summary of what was ordered vs. previously received
- Visual progress bar per line item (% received)

**Action Buttons:**
- `[ទទួលទំនិញ]` Confirm Receipt — saves GRN, updates stock balance for received quantities, updates PO status (Partial or Complete based on totals).
- `[រក្សាទុកព្រាង]` Save Draft — saves without updating stock balance.
- `[បោះបង់]` Cancel

**Rules:**
- Cannot receive more than the outstanding qty per line.
- If all PO lines are fully received, PO status automatically changes to `Complete`.
- If partially received, PO status changes to `Partial`.
- GRN creation also updates the stock balance at the specified warehouse location.
- Damaged/Rejected items do NOT update stock balance. They are logged separately for vendor dispute.

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/movements/create-grn.html`

---

### 3.9 Inventory Reports (`reports/reports.html`)

**Purpose:** Data analysis and reporting hub for inventory. **This is the ONLY page in the WM role that uses ECharts.** Charts moved here from v1 dashboard.

**Layout:** Full-width page. Top: filter controls (date range, category, location). Below: two-column chart grid. Below that: tabular reports.

---

#### Section A — Filter Controls (Full width, top)

- **Date Range Picker:** Start date → End date (default: last 30 days)
- **Category Filter:** All / specific category
- **Location Filter:** All warehouses / specific location
- **[Apply Filters]** button — reloads all charts and tables with new parameters
- **[Export All]** button — exports all report tables below to Excel

---

#### Section B — ECharts Grid (2 columns, equal width)

**Chart 1 — Stock Turnover Rate by Category (Bar Chart)**
- X-axis: Product categories
- Y-axis: Turnover rate (number of times stock is sold and replaced in the period)
- Each bar represents one category
- Tooltip: exact turnover rate on hover
- Note: Turnover = `COGS ÷ Average Inventory Value` (cost-based, no selling price)

**Chart 2 — Stock Valuation Trend (Line Chart)**
- X-axis: Dates (daily or weekly depending on date range selected)
- Y-axis: Total inventory value (cost-based) in KHR or USD
- Single line showing how total cost valuation changes over time
- Tooltip: date + value on hover
- Note: Uses cost prices only. No selling prices involved.

Both charts are rendered using ECharts. Use `echarts.init()` on designated `<div>` containers. Charts are responsive (use `resize` observer). Slate color palette for chart elements (`#475569` primary, `#94a3b8` secondary).

---

#### Section C — Slow-Moving Items Report (Full width table)

- **Title:** `ទំនិញដែលចលនាយឺត` / *Slow-Moving Items*
- Period toggle (radio buttons): Last 30 days / 60 days / 90 days
- **Table Columns:**

| Column | Notes |
|---|---|
| SKU | |
| Product Name | KH + EN |
| Category | |
| On-Hand Qty | Current |
| Last Movement Date | Last date any stock-in or stock-out occurred |
| Days Since Last Movement | Calculated from today |
| Cost Value (On-Hand) | `Qty × Cost Price`. For valuation only. **No selling price.** |
| Action | `[Mark for Review]` — flags item for WM review |

- Sorted by "Days Since Last Movement" descending (most stagnant first).
- Rows with 90+ days: red tint. 60–89 days: amber tint. 30–59 days: yellow tint.

---

#### Section D — Stock Aging Report (Full width table)

- **Title:** `របាយការណ៍អាយុស្តុក` / *Stock Aging Report*
- Groups current inventory by how long it has been in stock (using FIFO receipt dates from GRNs).
- **Columns:**

| Column | Notes |
|---|---|
| SKU | |
| Product Name | |
| Qty in 0–30 days | Units received within last 30 days |
| Qty in 31–60 days | |
| Qty in 61–90 days | |
| Qty in 90+ days | Highlighted in red |
| Total On-Hand | Sum |
| Aging Cost Value | `Qty × Cost Price per batch`. No selling price. |

---

#### Section E — Export Controls

- `[Export Slow-Moving Table]` → CSV
- `[Export Aging Report]` → CSV
- `[Export Full Stock Valuation]` → Excel with all active SKUs and cost-based valuation
- `[Print Report]` → print-friendly view (hides charts, shows tables only)

**Rules/Constraints:**
- **ECharts IS permitted on this page** — this is the designated reports page.
- All monetary values on this page use **cost prices only**. Selling prices do not appear anywhere.
- The reports page is **read-only**. No editing from here.
- Date range changes trigger chart and table refresh (client-side filtering on demo data, or API call in production).

**Files to Create/Modify:** `frontend/roles/07-warehouse-manager/reports/reports.html`

---

## 4. UI Identity Details

### Color System

| Token | Value | Usage |
|---|---|---|
| Primary Accent | `#475569` (Slate 600) | Buttons, active nav items, table header accents |
| Deep Accent | `#334155` (Slate 700) | Hover states, pressed states |
| Sidebar Background | `#1e293b` (Slate 800) | Dark industrial sidebar |
| Sidebar Active | `#475569` text + slate left border | |
| Page Background | `#f8fafc` (Slate 50) | Cool, neutral, industrial |
| Card Background | `#ffffff` | Standard white cards |
| Text Primary | `#1e293b` (Slate 800) | |
| Text Secondary | `#64748b` (Slate 500) | |
| Dividers | `#e2e8f0` (Slate 200) | |
| Success | `#16a34a` | OK status, approved, completed |
| Warning Amber | `#d97706` | Low stock, pending |
| Danger Red | `#dc2626` | Out of stock, critical, rejected |
| Info Blue | `#2563eb` | Transfer status, informational |
| Cost Accent | `#0f766e` (Teal 700) | Cost price values — a distinct color to make clear these are cost, not selling price |

### Typography

- **Page Titles:** 600 weight, 1.375rem, Slate 800
- **KPI Numbers:** 700 weight, 2rem, Slate 700
- **Table Headers:** 500 weight, 0.75rem, UPPERCASE, letter-spacing, Slate 500
- **Body Text:** 400 weight, 0.875rem, Slate 700
- **Qty Numbers (large):** 700 weight in alert cards — red or amber depending on severity
- **Khmer text:** Noto Sans Khmer, same weights
- **Monospace** (SKU, TR#, ADJ#, GRN#): `font-mono`, Slate 600

### Unique Design Elements

1. **Approval Queue Panel:** The WM's dashboard Pending Actions Queue is a unique inbox-style panel — only roles with approval authority (Archetype C/hybrid) have this pattern.
2. **Merged Movements Hub:** The 3-tab `movements.html` page consolidates what was 3 sidebar items in v1 into one clean hub — this reduces navigation friction for a frequently-used operational area.
3. **GRN Line Item Progress:** The create-GRN form shows a visual progress display (ordered vs. received) directly embedded in the line items table — making partial receipts visually obvious.
4. **Price Color Coding:** All cost price values are displayed in Teal `#0f766e` — a deliberate visual signal that distinguishes these as cost figures, not selling prices. This is a WM-specific design pattern.
5. **Industrial Cool Palette:** Slate/stone tones distinguish the WM role from the warm amber of Procurement (06), the green of Sales (02), and the deep navy of Admin (03). The palette communicates operational precision.
6. **Reports-Only Charts Policy:** ECharts are deliberately excluded from the dashboard and all operational pages. They appear ONLY on `reports/reports.html` — this is a strict design rule enforced visually by the consistent absence of charts on all other WM pages.

---

## 5. Developer Notes

### portal.js Changes (wmPortal — Sidebar Restructure)

Update the existing `wmPortal` config in `portal.js`. The old sidebar had 5+ items. Replace with the new 4-item structure:

```
wmPortal: {
  id: 'wmPortal',
  role: 'warehouse_manager',
  color: '#475569',
  sidebar: [
    { id: 'nav-dashboard',  labelKh: 'ផ្ទាំងគ្រប់គ្រងស្តុក', icon: 'mdi:store-24-hour',           href: 'dashboard.html',                  badge: false },
    { id: 'nav-balance',    labelKh: 'តុល្យភាពស្តុក',         icon: 'mdi:package-variant-closed',    href: 'stock-balance/balance.html',      badge: false },
    { id: 'nav-movements',  labelKh: 'ចលនា & កែតម្រូវ',       icon: 'mdi:swap-horizontal',           href: 'movements/movements.html',        badge: true, badgeSource: 'getPendingAdjustmentCount' },
    { id: 'nav-reports',    labelKh: 'របាយការណ៍ស្តុក',        icon: 'mdi:chart-bar',                 href: 'reports/reports.html',            badge: false },
  ]
}
```

**Remove from portal config (v1 items that no longer exist as sidebar items):**
- `nav-transfers` (was: ប័ណ្ណផ្ទេរស្តុក) — now a tab in movements.html
- `nav-adjustments` (was: ការកែតម្រូវស្តុក) — now a tab in movements.html
- `nav-alerts` (was: ការដាស់តឿនស្តុក) — now a tab in movements.html

### data.js — New & Updated Functions Required

| Function | Returns | Used By |
|---|---|---|
| `getStockBalance(filters)` | Array of stock items with qty, safety stock, cost | `balance.html` Tab 1 |
| `getProductCatalog(filters)` | Array of product master records | `balance.html` Tab 2 |
| `getStockTransfers(filters)` | Array of transfer slips with status | `movements.html` Tab 1 |
| `getStockAdjustments(filters)` | Array of adjustments with approval status | `movements.html` Tab 2 |
| `getReorderAlerts()` | Items where `current_qty < safety_stock` | `movements.html` Tab 3, dashboard |
| `getPendingAdjustmentCount()` | Integer — for sidebar badge | `portal.js` badge source |
| `getPendingActionsForWM()` | Combined list of pending transfers + adjustments | Dashboard Section D |
| `getPOsExpectedToday()` | POs with `expected_delivery_date = TODAY` | Dashboard Section E |
| `getGRNs(filters)` | Array of GRN records | `movements.html`, history views |
| `getGRNById(id)` | Single GRN with line items | View GRN |
| `createGRN(data)` | New GRN + updates stock balance | `create-grn.html` |
| `createTransfer(data)` | New transfer slip | `create-transfer.html` |
| `approveTransfer(id)` | Updated transfer with status=Approved | Approve action |
| `rejectTransfer(id, reason)` | Updated transfer with status=Rejected + reason | Reject action |
| `createAdjustment(data)` | New adjustment with status=Pending | `create-adjustment.html` |
| `approveAdjustment(id)` | Approved + stock balance updated | WM approve action |
| `rejectAdjustment(id, reason)` | Rejected + reason logged | WM reject action |
| `getInventoryReports(filters)` | Turnover, valuation, slow-moving, aging data | `reports/reports.html` |
| `createPurchaseRequest(skuId, qty, note)` | PR record visible to pmPortal | `[ស្នើបញ្ជាទិញ]` action |

### CRITICAL: Selling Price Enforcement

The following must be enforced at the **data layer**, not just in the template:
- `getStockBalance()` must **NOT** return `selling_price`, `unit_price`, `sale_price`, or any similar field.
- If the underlying product data object contains selling price, it must be **stripped** before being passed to WM role components.
- This prevents any accidental template rendering of selling prices even if a developer adds a column.
- A code comment should be added in data.js near `wmPortal`-related functions: `// WM ROLE: SELLING PRICE FIELDS EXCLUDED — DO NOT ADD`

### GRN → Stock Balance Update Flow

When a GRN is confirmed (`[ទទួលទំនិញ]`):
1. For each line where `condition = Good`: `stock_balance[sku][location] += qty_received_now`
2. For each line where `condition = Damaged/Rejected`: qty is logged but NOT added to stock
3. PO status is recalculated: if all lines fully received → `Complete`, else → `Partial`
4. Reorder alerts are re-evaluated: if received qty now satisfies safety stock → remove from alert list

### Purchase Request → Procurement Notification Flow

When WM clicks `[ស្នើបញ្ជាទិញ]` on a reorder alert:
1. A `PurchaseRequest` record is created with: `sku`, `suggested_qty`, `wm_note`, `status=Pending`, `created_by=wmUserId`
2. The record becomes visible in `pmPortal` → dashboard KPI Card 1 (Pending Purchase Requests) count
3. The `[ស្នើបញ្ជាទិញ]` button on that SKU is replaced with a `[PR ដាក់ស្នើរួច]` (PR Submitted) badge — disabled
4. When Procurement creates a PO from this PR, the PR status updates to `Converted` and the badge updates

### Shared Components Used

- `components/sidebar.js` — wmPortal config
- `components/modal.js` — approve/reject confirmation modals, reorder confirmation
- `components/data-table.js` — all list tables (stock balance, transfers, adjustments)
- `components/sub-nav-tabs.js` — tab switching on balance.html and movements.html
- `components/form-validator.js` — transfer and adjustment form validation
- `components/status-badge.js` — stock status pills (OK/Low/Critical etc.)
- `components/currency-format.js` — cost formatting (KHR/USD)
- `echarts` — **only** in `reports/reports.html`

### File Manifest — All Files to Create/Modify

```
frontend/roles/07-warehouse-manager/
├── dashboard.html                          (MODIFY — remove ECharts, add new sections)
├── stock-balance/
│   ├── balance.html                        (CREATE — 2-tab page replacing v1 stock pages)
│   └── create-product.html                 (CREATE — product catalog add form)
├── movements/
│   ├── movements.html                      (CREATE — 3-tab hub, replaces 3 old v1 pages)
│   ├── create-transfer.html               (CREATE)
│   ├── view-transfer.html                 (CREATE)
│   ├── create-adjustment.html             (CREATE)
│   ├── view-adjustment.html               (CREATE)
│   ├── create-grn.html                    (CREATE)
│   └── view-grn.html                      (CREATE — read-only GRN detail)
└── reports/
    └── reports.html                        (CREATE — ECharts charts live here only)
```

**v1 Files to Deprecate / Archive:**
- Any standalone transfer, adjustment, or alert page previously in the root `07-warehouse-manager/` folder that are now consolidated into `movements/movements.html`.

Total new/modified files: **10 files** (1 modified + 9 created).

---

*Document version: v2.0 | Role: 07-Warehouse Manager | Last updated: 2026-09-25*
