# Chief Accountant — v2 UI/UX Design Plan

> **Role:** Chief Accountant (Financial Gatekeeper)
> **Portal ID:** `caPortal` *(NEW — does not exist in v1, must be created)*
> **Archetype:** D — Financial Ledger & Reconciliation
> **File Path:** `frontend/roles/09-chief-accountant/`
> **Last Updated:** 2026-09-25

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | D — Financial Ledger & Reconciliation |
| **Color Accent** | Violet `#7c3aed` |
| **Active Nav Highlight** | `#6d28d9` (Violet-700) |
| **Background Tone** | `#f5f3ff` (very light violet-white — professional, calm) |
| **Surface Cards** | `#ffffff` with `border-l-4 border-indigo-500` for critical panels |
| **Danger/Unbalanced** | `#dc2626` (Red-600) |
| **Success/Balanced** | `#16a34a` (Green-600) |
| **Warning/Pending** | `#d97706` (Amber-600) |
| **Font Scale** | `text-sm` for dense ledger grids; `text-base` for form fields; `text-2xl` for KPI values |
| **Button Height** | `h-10` standard (desk-based role, mouse/keyboard driven) |
| **UI Style** | Ledger grids, tabular data, double-entry split views, precise number formatting, read-heavy with controlled write actions |
| **Key Persona** | Financial Gatekeeper — manages the Chart of Accounts, validates every journal entry uses correct double-entry, files GDT tax reports, locks accounting periods to prevent retroactive changes. Highly detail-oriented, number-precise, compliance-focused. |

### Persona Details

The Chief Accountant sits at a desk with a full keyboard and large monitor. They need:
- **Dense tabular views** with many columns — they can handle data density
- **Precision number formatting** — KHR and USD, always 2 decimal places, comma-separated thousands
- **Audit trail everywhere** — who posted, when, what changed
- **Period locking authority** — only this role can lock/unlock accounting periods
- **Read-first, write-carefully** — most views are read-heavy; write actions require deliberate confirmation
- **Double-entry enforcement** — the system must prevent saving journal entries where Dr ≠ Cr

---

## 2. Sidebar Navigation

The sidebar is permanently visible (desktop-first role). Width: `240px`. No mobile-first consideration — CA works at a desk.

Maximum 4 navigation items. No bottom-tab-bar pattern.

| # | Label (Khmer) | Label (EN) | Icon | href Target | Badge/Alert |
|---|---|---|---|---|---|
| 1 | ផ្ទាំងហិរញ្ញវត្ថុ | Finance Dashboard | `mdi:finance` | `dashboard.html` | Red dot if Trial Balance UNBALANCED |
| 2 | សៀវភៅធំ & COA | Ledger & COA | `mdi:book-open-page-variant-outline` | `ledger/ledger.html` | Count badge: unposted entries |
| 3 | របាយការណ៍ពន្ធ | Tax Reports | `mdi:file-document-check-outline` | `tax-reports/tax-reports.html` | Amber badge: submissions due |
| 4 | របាយការណ៍ហិរញ្ញវត្ថុ | Financial Reports | `mdi:chart-line` | `financial-reports/financial-reports.html` | Red badge: unbalanced indicator |

### Sidebar Design Rules

- Sidebar background: `#2e1065` (deep violet-950) — dark sidebar, professional finance aesthetic
- Active item: `bg-violet-600`, text white, left border `4px solid #c4b5fd` (violet-300)
- Inactive item: text `#c7d2fe` (indigo-200), icon muted
- Hover: `bg-violet-800`
- Portal branding: "eBMS ហិរញ្ញវត្ថុ" with a small finance icon, white text at top of sidebar
- User profile (name, role label "Chief Accountant") at bottom of sidebar
- Period status indicator in sidebar footer: "Period: Sep 2026 — OPEN" (green) or "LOCKED" (red)

---

## 3. Pages & Layouts

---

### 3.1 Financial Command Center (`dashboard.html`)

**Purpose:** Give the Chief Accountant an immediate snapshot of the accounting health — trial balance status, key obligations, and the unposted transaction queue — with no ECharts on this page.

**Layout:** 2-column desktop layout. Left column (wider, ~65%): status widgets + queue. Right column (~35%): period lock + recent entries. No charts on this page.

---

#### Section A — Trial Balance Status Hero (Full Width, Top)

This is the most important element on the dashboard — it must be immediately visible and unmistakable.

**Design:** Large horizontal banner card spanning full page width.

| State | Appearance |
|---|---|
| **BALANCED** | Green banner `bg-green-50 border-green-500`, large green checkmark icon, "តារាងតុល្យភាព: សម" (Trial Balance: BALANCED), Dr Total = Cr Total shown |
| **UNBALANCED** | Red banner `bg-red-50 border-red-600`, large red warning icon, "⚠ តារាងតុល្យភាព: មិនសម" (UNBALANCED), Difference amount shown in red, [View Discrepancy] button |

**Data shown in banner:**
- Total Debit (Dr) for current open period
- Total Credit (Cr) for current open period
- Difference amount (should be 0.00 if balanced)
- Last calculated timestamp: "Calculated: 25 Sep 2026, 10:42 AM"
- [Recalculate Now] text button — forces recalculation from DB

---

#### Section B — KPI Cards Row (3 Cards)

Three equal-width cards below the trial balance banner:

**Card 1 — Unposted Transactions**
- Large number: count of transactions that have been recorded in the system (sales, purchases, payments) but do NOT yet have a corresponding journal entry posted to the ledger
- Label: "ប្រតិបត្តិការអាត្មន័យ" (Auto-captured transactions pending journalization)
- Sub-text: "ត្រូវការចូលក្នុងបញ្ជី" (Need journal entry)
- Color: amber if > 0, green if 0
- Icon: `mdi:pencil-clock`
- [View All] link → navigates to Ledger page, Journal Entries tab, filtered to "Unposted"

**Card 2 — Tax Submissions Due This Month**
- Count of GDT tax submissions due within current calendar month
- Label: "ការដាក់ពាក្យពន្ធខែនេះ" (Tax submissions this month)
- Sub-text: nearest due date e.g., "ផុតកំណត់: 15 តុលា 2026" (Due: 15 Oct 2026)
- Color: red if past due, amber if within 7 days, green otherwise
- Icon: `mdi:file-document-alert-outline`
- [Go to Tax Reports] link

**Card 3 — Overdue AR Total**
- Total KHR/USD amount of customer invoices past due date
- Label: "ការទូទាត់ AR ហួសកំណត់" (Overdue AR)
- Sub-text: customer count with overdue balances
- Color: red if > 0, green if 0
- Icon: `mdi:cash-clock`
- Note: read-only for CA — this is informational; AP/AR accountant handles collections
- [View AR Report] link → financial-reports

---

#### Section C — Period Lock Panel (Right Column, Top)

**Design:** Card in right column with indigo-left-border.

- Current Period Label: "ខែ: កញ្ញា 2026" (Month: Sep 2026)
- Period Status: large badge `OPEN` (green) or `LOCKED` (red padlock icon)
- Days Until Month-End: countdown — "6 ថ្ងៃទៀតដល់ Month-End" (6 days until month-end)
- Progress bar: days elapsed in month (visual)
- **[🔒 Lock Period]** button:
  - Only enabled when Trial Balance is BALANCED
  - If unbalanced: button is disabled, tooltip: "ត្រូវតែ Balance ជាមុនសិន" (Must be balanced first)
  - On click: confirmation modal: "Lock September 2026? No entries can be created, edited, or deleted in this period after locking."
  - Confirmation requires typing the period name: "Sep-2026" into a text field
- **[🔓 Unlock Period]** button (only shown if period is LOCKED):
  - Requires a reason/justification text field
  - Logs the unlock action to audit trail with timestamp and user

---

#### Section D — Unposted Transactions Queue (Left Column)

**Design:** Compact table/list in the left column below KPI cards.

Header: "ប្រតិបត្តិការរង់ចាំចូលក្នុងបញ្ជី" (Transactions Awaiting Journalization)

Each row in the queue:

| Column | Details |
|---|---|
| Type Icon | Small icon: SO (sales), PO (purchase), PMT (payment), etc. |
| Reference | e.g., `SO-2026-00412` — monospace |
| Description | Auto-generated description: "Sales to ស.ច — 25/09/2026" |
| Amount | KHR amount, right-aligned |
| Age | "3 ថ្ងៃ" (3 days) — how long it's been unposted |
| [Post Journal] | Small action button: opens quick journal entry modal |

**Quick Journal Entry Modal (inline):**
- Triggered by [Post Journal] button
- Shows the auto-generated journal entry (Dr/Cr) based on transaction type
- CA can review and adjust account codes before posting
- [Confirm & Post] button — writes journal entry, removes from queue
- [Cancel] — returns without posting

**Pagination:** Show 10 rows, [Load More] link.

---

#### Section E — Recent Journal Entries (Right Column, Below Period Lock)

**Design:** Compact 5-row list.

Header: "Journal Entries ថ្មីៗ" (Recent Journal Entries)

| Column | Details |
|---|---|
| JE Number | `JE-2026-00089` — monospace |
| Date | Short date |
| Description | Truncated text, full on hover |
| Dr Amount | Right-aligned |
| Cr Amount | Right-aligned |
| Posted By | User initials badge |

[View All Journal Entries] link at bottom → `ledger/ledger.html` (Journal Entries tab)

---

**Actions Available:**
- [Recalculate Now] trial balance
- [View Discrepancy] if unbalanced
- [View All] unposted transactions
- [Post Journal] quick post per transaction
- [Lock Period] / [Unlock Period]
- [Go to Tax Reports] KPI card link
- [View AR Report] KPI card link

**Rules/Constraints:**
- Dashboard is read-only except for: [Post Journal] quick action and [Lock/Unlock Period]
- Trial Balance widget auto-refreshes every 5 minutes or on user navigation
- [Lock Period] is disabled unless trial balance shows BALANCED
- NO ECharts or charts on this page — numbers and lists only
- Period lock affects ALL roles — once locked, no one can post entries to that period

**Files to Create/Modify:**
- `frontend/roles/09-chief-accountant/dashboard.html`

---

### 3.2 General Ledger & COA (`ledger/ledger.html`)

**Purpose:** Provide the complete Chart of Accounts management, journal entry listing, and a journal entry creation/editing interface with enforced double-entry validation.

**Layout:** Full-width page with Sub-Navigation Tabs. Dense tabular content. Left sidebar remains visible.

---

#### Sub-Navigation Tabs

Three tabs at top of content area:
1. **[COA ដើម]** — Chart of Accounts
2. **[ចូលក្នុងបញ្ជី]** — Journal Entries
3. **[ស្ដូកដំណើរការ]** — GL Balances / Trial Balance Detail

---

#### Tab 1 — Chart of Accounts (COA)

**Layout:** Tree/hierarchical expandable list — left to right indent per account level.

**Account Hierarchy:**
```
1000 — Assets (Level 1, bold header row)
  1100 — Current Assets (Level 2, semi-bold)
    1110 — Cash on Hand (Level 3, normal)
    1120 — Bank — ABA (Level 3, normal)
    1130 — Accounts Receivable (Level 3, normal)
  1200 — Fixed Assets (Level 2)
    1210 — Equipment (Level 3)
    ...
2000 — Liabilities
  2100 — Accounts Payable
  2200 — Tax Payable (VAT)
  ...
3000 — Equity
4000 — Revenue
5000 — Cost of Goods Sold
6000 — Operating Expenses
```

**Each Account Row Columns:**

| Column | Details |
|---|---|
| ▶ Expand Toggle | Arrow icon — click to show/hide child accounts |
| Account Code | Monospace e.g., `1110`, `1120.01` |
| Account Name (KH) | Khmer account name |
| Account Name (EN) | English account name |
| Account Type | `Asset` / `Liability` / `Equity` / `Revenue` / `Expense` — color-coded pill |
| Normal Balance | `Dr` or `Cr` |
| Current Balance | Right-aligned, formatted: `KHR 1,234,000.00` — colored red if unusual balance for account type |
| Actions | `[✎ Edit]` `[+ Child]` — appear on row hover |

**COA Actions:**
- **[+ Add Account]** button (top-right): opens Add Account modal
  - Fields: Account Code, Account Name (KH + EN), Parent Account (dropdown), Account Type, Normal Balance, Notes
  - Account code must be unique — inline validation
- **[✎ Edit]** per row: opens Edit Account modal (same fields, pre-filled)
- **[+ Child]**: shortcut to add a child account under this parent
- **[Deactivate]** (not delete — accounts with journal entries cannot be deleted): toggles account to inactive (hidden from entry dropdowns, shown in COA with strike-through)

**Rules:**
- Accounts with existing journal entries cannot be deleted — only deactivated
- Account codes follow the company's numbering convention (configured in system settings)
- Only CA and Admin can modify COA

---

#### Tab 2 — Journal Entries

**Layout:** Filter bar at top + paginated data table.

**Filter Bar:**
- Date range picker (From / To)
- Status filter: [All] [Draft] [Posted] [Voided]
- Search: by JE number or description
- [+ New Journal Entry] button (right-aligned, indigo, `h-10`)

**Journal Entries Table:**

| Column | Details |
|---|---|
| JE Number | `JE-2026-00089` — monospace, clickable link |
| Date | Entry date |
| Description | Entry memo/description |
| Source | Auto-generated from (SO / PO / Payment) or Manual |
| Dr Total | Right-aligned, `font-mono` |
| Cr Total | Right-aligned, `font-mono` |
| Balance Check | ✓ Balanced (green) / ✗ Unbalanced (red) |
| Status | `Draft` / `Posted` / `Voided` pill |
| Posted By | User name |
| Actions | `[View]` `[Void]` (if Posted) `[Edit]` (if Draft only) `⋮` menu |

**Pagination:** 25 rows per page, page numbers at bottom.

---

#### Journal Entry Create/Edit Page (`ledger/create-entry.html` and `ledger/view-entry.html`)

**Create Journal Entry Layout:**
- Page header: "Journal Entry ថ្មី" + JE auto-number (draft until posted)
- **Entry Metadata Section:**
  - Date picker (required)
  - Description / Memo (text input, required)
  - Reference (optional — links to SO/PO/Payment)
  - Period label (auto-set to current open period — read-only)
- **Double-Entry Grid:**
  - Two-column visual: Dr side (left) | Cr side (right)
  - More accurately: a single table with columns: Account (dropdown), Description (text), Dr Amount, Cr Amount
  - Each row: [Account Code + Name dropdown] | [Line Description] | [Dr Amount input] | [Cr Amount input] | [✕ Remove Row]
  - A row can have a value in EITHER Dr OR Cr — not both
  - [+ Add Line] button: appends a new blank row
  - Running totals row at bottom: "Total Dr: KHR X | Total Cr: KHR Y"
  - Balance indicator: real-time as user types:
    - Dr = Cr: green checkmark "✓ Balanced"
    - Dr ≠ Cr: red warning "✗ Out of balance by KHR Z"
- **Actions:**
  - [Save as Draft] — saves without posting (can edit later)
  - [Post Journal Entry] — posts entry (becomes immutable)
    - Only enabled when Dr total = Cr total exactly
    - Confirmation modal before posting
  - [Cancel] — returns to Journal Entries list

**View Journal Entry (`ledger/view-entry.html`):**
- All fields read-only
- Same double-entry grid layout but non-editable
- Shows: JE number, date, description, source, all Dr/Cr lines, total amounts
- Posted by / Posted at timestamp
- [Print] button — A4 printable journal entry voucher format
- [Void] button (if Posted and period not locked): opens void reason modal

---

#### Tab 3 — GL Balances (Trial Balance Detail)

**Layout:** Single table, grouped by account type.

**Filter:** Period selector (Month / Quarter / Custom range)

**Table Columns:**

| Account Code | Account Name | Opening Balance | Period Dr | Period Cr | Closing Balance | Account Type |
|---|---|---|---|---|---|---|

- Color: asset/revenue accounts with Dr balances shown normally; if reversed, red text
- Group subtotals per account type (bold row: Total Assets, Total Liabilities, etc.)
- Grand total row: Total Dr = Total Cr (balanced state)
- [Export to Excel] button
- [Print Trial Balance] button

---

**Files to Create/Modify:**
- `frontend/roles/09-chief-accountant/ledger/ledger.html`
- `frontend/roles/09-chief-accountant/ledger/create-entry.html`
- `frontend/roles/09-chief-accountant/ledger/view-entry.html`

---

### 3.3 GDT Tax Reports (`tax-reports/tax-reports.html`)

**Purpose:** Provide structured views of VAT, Withholding Tax, and monthly declaration summaries for GDT (General Department of Taxation) compliance filing.

**Layout:** Sub-Navigation Tabs within the page. Dense table views with export actions.

---

#### Sub-Navigation Tabs

1. **[អតប 10%]** — VAT (Value Added Tax) — 10% standard rate
2. **[ពន្ធកាត់ទុក WHT]** — Withholding Tax
3. **[របាយការណ៍ប្រចាំខែ]** — Monthly Declaration Summary

---

#### Global Filter Bar (Above All Tabs)

- Period selector: Month picker (e.g., "Sep 2026")
- Comparison toggle: [This Month Only] [YTD Cumulative]
- [Export to PDF] button (right)
- [Export to Excel] button (right)

---

#### Tab 1 — VAT (អតប 10%)

**Layout:** Two summary cards at top, then detail table below.

**Summary Cards (side by side):**

- **Output VAT (Collected):** VAT charged to customers on sales invoices
  - Total sales (ex-VAT): KHR X
  - Output VAT 10%: KHR Y
- **Input VAT (Paid):** VAT paid on purchase invoices
  - Total purchases (ex-VAT): KHR A
  - Input VAT 10%: KHR B
- **Net VAT Payable = Output − Input:**
  - Large number display: positive (must pay GDT) in red, negative (credit) in green
  - "ត្រូវបង់ VAT ប្រចាំខែ: KHR Z" (Monthly VAT payable: KHR Z)

**Detail Table — VAT Transactions:**

| Column | Details |
|---|---|
| Date | Transaction date |
| Reference | Invoice/PO number |
| Party | Customer or Vendor name |
| Sale/Purchase Amount | Ex-VAT amount |
| VAT 10% | Computed VAT amount |
| Type | `Output` (sales) or `Input` (purchases) |
| Invoice Status | `Issued` / `Received` |

**Footer:** Total Output VAT | Total Input VAT | Net VAT Payable

---

#### Tab 2 — Withholding Tax (ពន្ធកាត់ទុក WHT)

Cambodia WHT is deducted at source when paying certain vendors (services, rent, royalties).

**Summary Card:**
- Total WHT deducted this period from vendor payments
- Number of vendors affected
- "ត្រូវបង់ WHT ទៅ GDT: KHR X" (WHT to pay GDT: KHR X)

**Detail Table — WHT Deductions:**

| Column | Details |
|---|---|
| Payment Date | Date paid to vendor |
| Vendor Name | Supplier name |
| TIN | Vendor Tax ID (Taxpayer Identification Number) |
| Payment Amount | Gross payment |
| WHT Rate | e.g., 15% (services), 10% (rent) |
| WHT Amount | Deducted amount |
| Net Paid | Gross − WHT |
| Certificate No. | WHT certificate number (if issued) |

**Actions:**
- [Print WHT Certificate] per row — generates a printable WHT deduction certificate

---

#### Tab 3 — Monthly Declaration Summary (របាយការណ៍ប្រចាំខែ)

A pre-formatted, GDT-compliant monthly tax declaration layout.

**Design:** Structured form/table mimicking the GDT paper form layout.

**Sections:**
1. **Company Information Header** — Company name, TIN, address, period
2. **Monthly Turnover Summary** — Total taxable revenue for the period
3. **VAT Section** — Output VAT, Input VAT, Net VAT payable
4. **WHT Section** — Total WHT collected, to remit to GDT
5. **Minimum Tax / TOT** (if applicable) — Turnover-based minimum tax
6. **Tax Summary Table** — All taxes consolidated:
   - VAT payable
   - WHT payable
   - Total tax due this month

**Actions:**
- [Print Monthly Declaration] — prints A4 formatted GDT declaration
- [Export to Excel] — exports structured spreadsheet matching GDT format
- [Mark as Filed] — sets declaration status to "Filed" with date and CA name

**Status Tracking:**
- Each month's declaration has a status: `Draft` / `Filed` / `Paid`
- Filed status shown in a small history list at bottom of page
- Filing history shows: Month, Filed Date, Filed By, Status, Reference

---

**Files to Create/Modify:**
- `frontend/roles/09-chief-accountant/tax-reports/tax-reports.html`

---

### 3.4 Financial Statements (`financial-reports/financial-reports.html`)

**Purpose:** Present the three core financial statements (P&L, Cash Flow, Balance Sheet) with date range filtering; this is the only Chief Accountant page where ECharts are permitted.

**Layout:** Filter bar + Sub-Navigation Tabs. ECharts charts appear within the P&L tab only as supporting visuals — the primary content is always the tabular financial statement.

---

#### Global Filter Bar

- **Date Range:** From / To date pickers
- **Period Preset Buttons:** [This Month] [Last Month] [This Quarter] [This Year] [Custom]
- **Currency Toggle:** [KHR] [USD] (if multi-currency is enabled)
- **[Print Financial Statement]** button (right) — A4 formatted print for selected tab
- **[Export Excel]** button (right)

---

#### Sub-Navigation Tabs

1. **[P&L — តារាងចំណេញ/ខាត]** — Profit & Loss Statement
2. **[ដំណើរការសាច់ប្រាក់]** — Cash Flow Statement
3. **[Balance Sheet — តារាងតុល្យភាព]** — Balance Sheet

---

#### Tab 1 — Profit & Loss Statement

**Layout:** Two-section layout. Left: P&L Table (primary). Right: ECharts Revenue Trend (supporting).

**P&L Table (structured financial statement format):**

```
REVENUE
  Product Sales Revenue          KHR X,XXX,XXX
  Service Revenue                KHR X,XXX,XXX
  Other Income                   KHR X,XXX,XXX
  ─────────────────────────────────────────────
  TOTAL REVENUE                  KHR X,XXX,XXX    ← Bold

COST OF GOODS SOLD (COGS)
  Opening Inventory              KHR X,XXX,XXX
  Purchases                      KHR X,XXX,XXX
  Less: Closing Inventory        (KHR X,XXX,XXX)
  ─────────────────────────────────────────────
  TOTAL COGS                     KHR X,XXX,XXX    ← Bold

  GROSS PROFIT                   KHR X,XXX,XXX    ← Bold, highlighted

OPERATING EXPENSES
  Salaries & Wages               KHR X,XXX,XXX
  Rent & Utilities               KHR X,XXX,XXX
  Marketing                      KHR X,XXX,XXX
  Depreciation                   KHR X,XXX,XXX
  Other Expenses                 KHR X,XXX,XXX
  ─────────────────────────────────────────────
  TOTAL OPERATING EXPENSES       KHR X,XXX,XXX    ← Bold

  OPERATING PROFIT (EBIT)        KHR X,XXX,XXX    ← Bold, indigo highlight
  Less: Tax Expense              KHR X,XXX,XXX
  ─────────────────────────────────────────────
  NET PROFIT / (LOSS)            KHR X,XXX,XXX    ← Large, bold, green/red
```

**ECharts — Revenue Trend Line Chart (right panel):**
- Line chart: monthly Revenue vs Expenses trend for the selected year
- X-axis: months
- Y-axis: KHR amount
- Two lines: Revenue (indigo) and Total Expenses (orange)
- Simple, clean ECharts config — no 3D, no pie charts here
- This chart is only here for supplementary insight; the table is the authoritative document

**Prior Period Comparison:**
- Optional toggle: [Show Comparison] — adds a "Prior Period" column to the P&L table
- Variance column: absolute and % change

---

#### Tab 2 — Cash Flow Statement

**Layout:** Single-column structured financial statement. No charts on this tab.

**Cash Flow Format (Indirect Method):**

```
OPERATING ACTIVITIES
  Net Profit                     KHR X,XXX,XXX
  Adjustments:
    + Depreciation               KHR X,XXX,XXX
    + Decrease in AR             KHR X,XXX,XXX
    − Increase in Inventory      (KHR X,XXX,XXX)
    + Increase in AP             KHR X,XXX,XXX
  ─────────────────────────────────────────────
  Net Cash from Operations       KHR X,XXX,XXX    ← Bold

INVESTING ACTIVITIES
  Purchase of Equipment          (KHR X,XXX,XXX)
  Proceeds from Asset Sales      KHR X,XXX,XXX
  ─────────────────────────────────────────────
  Net Cash from Investing        (KHR X,XXX,XXX)  ← Bold

FINANCING ACTIVITIES
  Loan Proceeds                  KHR X,XXX,XXX
  Loan Repayments                (KHR X,XXX,XXX)
  Owner Drawings                 (KHR X,XXX,XXX)
  ─────────────────────────────────────────────
  Net Cash from Financing        KHR X,XXX,XXX    ← Bold

NET CHANGE IN CASH               KHR X,XXX,XXX    ← Bold, highlighted
Opening Cash Balance             KHR X,XXX,XXX
─────────────────────────────────────────────────
CLOSING CASH BALANCE             KHR X,XXX,XXX    ← Large, bold
```

Positive cash flow rows: normal text. Negative cash flow rows: shown in parentheses and colored red.

---

#### Tab 3 — Balance Sheet

**Layout:** Two-column table format (Assets | Liabilities + Equity side by side). No charts.

```
ASSETS                                  LIABILITIES
─────────────────────────────────────   ────────────────────────────────────
Current Assets:                         Current Liabilities:
  Cash & Bank           KHR X           Accounts Payable       KHR X
  Accounts Receivable   KHR X           Tax Payable (VAT)      KHR X
  Inventory             KHR X           Accrued Liabilities    KHR X
  ─────────────────────────────         ────────────────────────────────────
  Total Current Assets  KHR X           Total Current Liab.    KHR X

Non-Current Assets:                     Non-Current Liabilities:
  Equipment (net)       KHR X           Long-term Loans        KHR X
  ─────────────────────────────         ────────────────────────────────────
  Total Non-Curr Assets KHR X           Total Non-Curr Liab.   KHR X

                                        EQUITY
                                          Share Capital         KHR X
                                          Retained Earnings     KHR X
                                          ───────────────────────────
                                          Total Equity          KHR X
─────────────────────────────────────   ────────────────────────────────────
TOTAL ASSETS            KHR X           TOTAL LIAB + EQUITY    KHR X
```

- If `Total Assets ≠ Total Liab + Equity`: display red warning banner: "Balance Sheet is not balancing — please verify journal entries"
- [Print] produces a clean A4 formatted Balance Sheet without UI navigation elements

---

**Files to Create/Modify:**
- `frontend/roles/09-chief-accountant/financial-reports/financial-reports.html`

---

## 4. UI Identity Details

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary (Violet) | `#7c3aed` | Buttons, links, active states, accents |
| Primary Dark | `#6d28d9` | Sidebar bg, hover states |
| Sidebar BG | `#2e1065` | Deep violet sidebar |
| Sidebar Text | `#ddd6fe` | Inactive nav items |
| Background | `#f5f3ff` | Page background (light violet-white) |
| Card Surface | `#ffffff` | Card/panel backgrounds |
| Balanced/Success | `#16a34a` | Trial balance OK, positive values |
| Unbalanced/Danger | `#dc2626` | Trial balance error, negative values |
| Warning/Pending | `#d97706` | Amber for pending actions |
| Dr Column Accent | `#dbeafe` | Light blue tint for debit columns |
| Cr Column Accent | `#fce7f3` | Light pink tint for credit columns |
| Locked Period | `#1e293b` | Dark text for locked indicators |
| Text Primary | `#1e293b` | Main body text |
| Text Secondary | `#64748b` | Meta labels, secondary text |

### Typography

- **KPI Values:** `font-bold text-3xl` — large, decisive numbers
- **Financial Statement Rows:** `text-sm font-mono` — monospace for precise number alignment
- **Subtotal/Total Rows:** `font-semibold text-sm border-t` — visual hierarchy in statements
- **Section Headers:** `font-bold text-base text-indigo-700`
- **Account Codes:** `font-mono text-sm text-slate-500`
- **Status Badges:** `text-xs font-semibold px-2 py-0.5 rounded-full`

### Unique Design Elements

1. **Dark Violet Sidebar** — Deep `#2e1065` sidebar is the signature visual of the CA role — immediately distinguishes it from all other roles with their lighter sidebars.
2. **Trial Balance Banner** — The hero status banner (green = balanced, red = unbalanced) is a dramatic, full-width visual that drives immediate attention to the most critical accounting health metric.
3. **Split Dr/Cr Entry Grid** — The journal entry creator uses a visually split grid with color-tinted columns (blue for Dr, pink for Cr) — making double-entry visually intuitive.
4. **Real-Time Balance Checker** — As the CA types journal entry amounts, a live running balance indicator updates (green checkmark / red warning) — enforcing double-entry without requiring save first.
5. **Period Lock with Type-to-Confirm** — The period lock action requires the CA to type the period name (e.g., "Sep-2026") in a confirmation field — preventing accidental locks.
6. **Financial Statement Print Mode** — All financial statement pages have a clean A4 print CSS (`@media print`) that hides navigation, sidebars, and action buttons — outputting a professional, ready-to-sign document.

---

## 5. Developer Notes

### NEW Portal Configuration (`portal.js`)

`caPortal` does not exist in v1. Create a new portal configuration entry:

```javascript
caPortal: {
  id: 'caPortal',
  roleLabel: 'Chief Accountant',
  basePath: 'frontend/roles/09-chief-accountant/',
  accentColor: '#7c3aed',
  sidebarBg: '#2e1065',
  defaultPage: 'dashboard.html',
  nav: [
    { id: 'dashboard', label: 'ផ្ទាំងហិរញ្ញវត្ថុ', icon: 'mdi:finance', href: 'dashboard.html', badge: 'unbalanced' },
    { id: 'ledger', label: 'សៀវភៅធំ & COA', icon: 'mdi:book-open-page-variant-outline', href: 'ledger/ledger.html', badge: 'unpostedCount' },
    { id: 'tax', label: 'របាយការណ៍ពន្ធ', icon: 'mdi:file-document-check-outline', href: 'tax-reports/tax-reports.html', badge: 'taxDue' },
    { id: 'reports', label: 'របាយការណ៍ហិរញ្ញវត្ថុ', icon: 'mdi:chart-line', href: 'financial-reports/financial-reports.html', badge: 'unbalanced' }
  ]
}
```

### Data Fields Required (`data.js` / API)

For `dashboard.html`:
```
trialBalance.totalDr, trialBalance.totalCr, trialBalance.difference,
trialBalance.isBalanced, trialBalance.calculatedAt,
period.name, period.status ('open'|'locked'), period.daysRemaining,
unpostedTransactions[]: { id, type, reference, description, amount, daysOld },
recentJournalEntries[]: { jeNumber, date, description, drTotal, crTotal, postedBy }
kpi.unpostedCount, kpi.taxDue, kpi.overdueAR
```

For `ledger/ledger.html`:
```
coa[]: { accountCode, nameKH, nameEN, parentCode, accountType, normalBalance, currentBalance, isActive },
journalEntries[]: { jeNumber, date, description, source, drTotal, crTotal, isBalanced, status, postedBy },
journalEntry.lines[]: { accountCode, accountName, description, drAmount, crAmount }
```

For `tax-reports/tax-reports.html`:
```
vatSummary: { outputVAT, inputVAT, netPayable },
vatTransactions[]: { date, reference, party, amount, vatAmount, type },
whtDeductions[]: { paymentDate, vendorName, tin, grossAmount, whtRate, whtAmount, netPaid, certNo },
monthlyDeclaration: { period, totalRevenue, vatPayable, whtPayable, totalTax, status, filedDate, filedBy }
```

For `financial-reports/financial-reports.html`:
```
pl: { revenue{}, cogs{}, grossProfit, expenses{}, operatingProfit, netProfit },
cashFlow: { operating{}, investing{}, financing{}, netChange, openingCash, closingCash },
balanceSheet: { assets{}, liabilities{}, equity{}, totalAssets, totalLiabEquity },
monthlyTrends[]: { month, revenue, totalExpenses }  // for ECharts line chart
```

### Business Logic Constraints

- **Double-Entry Enforcement:** Journal entry save/post API must validate `sum(drAmounts) === sum(crAmounts)` — reject with error if not equal
- **Period Lock:** All entry creation, edit, and void endpoints must check `period.status !== 'locked'` — return 403 if locked
- **COA Delete Prevention:** If an account code has any journal entry lines referencing it, it cannot be deleted (only deactivated)
- **Trial Balance Recalculation:** Triggered on: new JE posted, JE voided, or manual [Recalculate Now] — compute sum of all Dr and Cr across all posted JEs for the open period

### Shared Components & Print CSS

- All financial statement pages must include `@media print { .sidebar, .nav, .action-bar { display: none; } }` print CSS
- Create shared `components/financial-table.css` — standardized styling for ledger grids, statement rows, subtotals
- ECharts only on `financial-reports.html` — no ECharts imports on dashboard, ledger, or tax-reports pages

### File Checklist

**New files to create (from near-scratch — existing folder has only 3 sparse files):**
- [ ] `frontend/roles/09-chief-accountant/dashboard.html`
- [ ] `frontend/roles/09-chief-accountant/ledger/ledger.html`
- [ ] `frontend/roles/09-chief-accountant/ledger/create-entry.html`
- [ ] `frontend/roles/09-chief-accountant/ledger/view-entry.html`
- [ ] `frontend/roles/09-chief-accountant/tax-reports/tax-reports.html`
- [ ] `frontend/roles/09-chief-accountant/financial-reports/financial-reports.html`
- [ ] `portal.js` → add `caPortal` config block
- [ ] `components/financial-table.css` (new shared component)
