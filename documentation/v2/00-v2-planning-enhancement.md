# eBMS v2 — Deep Study: Planning & Enhancement Proposals

> **Status:** Planning Only — No Code  
> **Based On:** Full study of `documentation/v2/` (12 role files) + `frontend/roles/` (83 HTML files across 14 folders), then a second consistency review of the role navigation and shared `portal.js` configuration.  
> **Date:** 2026-09-26  

---

## 📊 Part 1: Current State at a Glance

### Files Built vs. Still Needed

| # | Role | Files Built | Per-Doc Required | Missing Files (Critical) |
|---|---|---|---|---|
| 01 | Super Admin | 7 | ~9 | `create-subscription.html`, `edit-subscription.html`, `view-subscription.html` |
| 02 | Admin / GM | 9 | ~7 | Mostly done; `settings.html` split into 2 files — needs consolidation check |
| 03 | Sales Manager | 5 | 5 | ✅ Complete per doc |
| 04 | Sales Executive | 9 | ~14 | `edit-customer.html`, `view-customer.html`, `edit-invoice.html`, `edit-quote.html` |
| 05 | Cashier / POS | 4 | 4 | `view-receipt.html`; `khqr-payment.html` should be in-terminal not standalone |
| 06 | Procurement Mgr | 7 | ~12 | `edit-po.html`, `view-supplier.html`, `edit-supplier.html`, `create-vendor-bill.html`, `view-vendor-bill.html`, `reports.html` |
| 07 | Warehouse Mgr | 6 | ~12 | `balance.html`, `create-grn.html`, `view-adjustment.html`, `view-movement.html`, `reports.html` |
| 08 | Warehouse Staff | 4 | 3 | `dashboard.html` exists but not in v2 doc spec |
| 09 | Chief Accountant | 5 | ~8 | `ledger.html`, `create-entry.html`, `view-entry.html`, `financial-reports.html` |
| 10 | AP/AR Accountant | 7 | ~11 | `ar.html`, `ap.html`, `bank-recon.html`, `reports.html` |
| 11 | Internal Auditor | 6 | 5 | `financial-overview.html` to be merged; structure correct |
| 12 | Customer Support | 3 | 4 | `create-note.html` |

> [!IMPORTANT]
> **Verified correction (2026-09-26):** `pmPortal`, `caPortal`, and `aparPortal` already exist in `frontend/shared/scripts/portal.js`. Do not plan new portal configurations for them. The work for v2 is to reconcile those current navigation entries with the approved role documents and the final v2 information architecture.

---

## 💡 Part 2: Enhancement Ideas Per Role

Each section shows the **current documented sidebar**, then proposes **additions, new tabs, new pages, and improved functionality** that would make the role significantly more powerful without violating the 5-item sidebar cap.

---

### Role 01 — Super Admin `saPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងបញ្ជាការដ្ឋាន `dashboard.html`
2. ក្រុមហ៊ុនជាវ `companies/companies.html`
3. កញ្ចប់សេវា `subscriptions/subscriptions.html`
4. កំណត់ហេតុសកល `audit-logs/audit-logs.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ការកំណត់វេទិកា `platform-settings/platform-settings.html`
The super admin currently has no place to configure the platform itself. This page would hold:
- **Tab 1 — ការកំណត់ Email SMTP**: Configure global outbound email (for password reset, notifications)
- **Tab 2 — ការកំណត់ KHQR**: Global KHQR credentials & webhook URL
- **Tab 3 — ការកំណត់ Backup**: Automated backup schedule & storage path
- **Tab 4 — Feature Flags**: Toggle features per subscription plan tier

#### 📌 Improve `subscriptions/subscriptions.html` (Add Tabs)
Currently just a list of company subscriptions with ECharts.  
**Add 3 tabs:**
- **Tab 1 — ទិដ្ឋភាព MRR** (current — ECharts + summary table, rename)  
- **Tab 2 — គ្រប់គ្រងកញ្ចប់** → Plan management CRUD (create Silver/Gold/Enterprise tiers with feature matrix)  
- **Tab 3 — ប្រវត្តិការទូទាត់** → Payment history per company (subscription billing log)

**New files needed:** `subscriptions/plans.html`, `subscriptions/create-plan.html`, `subscriptions/edit-plan.html`

#### 📌 Improve `companies/view-company.html` (Add Tab)
Currently has 4 tabs (General Info / Users / Subscription History / Activity Log).  
**Add Tab 5 → ការកំណត់មុខងារ (Feature Flags)**: Per-tenant feature toggle (disable certain modules for a company)

#### 📌 Improve `audit-logs/audit-logs.html`
Currently timeline layout.  
**Add filter by severity level:** `Critical / Warning / Info` — with color-coded dot indicators.  
**Add "Export PDF Report"** button that generates an official audit report with SA stamp and timestamp.  
**Add "Live Mode" toggle**: Auto-refresh the timeline every 30 seconds (show live events in real-time).

---

### Role 02 — Admin / General Manager `gmPortal`

**Current Sidebar (4 items):**
1. បញ្ជាការដ្ឋាន `dashboard.html`
2. មជ្ឈមណ្ឌលអនុម័ត `approvals/approvals.html`
3. គណនីបុគ្គលិក `users/users.html`
4. ការកំណត់ក្រុមហ៊ុន `settings/settings.html`

**Enhancement Ideas:**

#### 🆕 New Page → `reports/performance-report.html` (as tab in Dashboard or Settings)
Currently GM has **no dedicated reports page** — the master overview says "delegated to CA & SM." However, GM should see a high-level business overview:  
- Business KPI summary: Revenue this month vs last month (text-based, NO ECharts per GM archetype)  
- Headcount utilization per department  
- Approval turnaround time (average hours from request to decision)  
- Period close status across all accounting periods

> This is NOT ECharts — it's a table/text-based dashboard summary. Stays within Archetype C rules.

#### 📌 Improve `approvals/approvals.html` (Add Approval Types)
Currently 6 tabs: All / Discount / Expense / Stock / Credit / History.  
**Add Tab 7 → ការបិទកំណត់ (Period Lock Requests)**: When CA wants to lock a period, GM must approve. This approval type should appear here.  
**Add "Bulk Export"**: Export all approved/rejected items for the month as a PDF register.

#### 📌 Improve `users/users.html` (Strengthen Tabs)
Currently: Tab 1 = Staff Table, Tab 2 = Role Assignment Matrix.  
**Add Tab 3 → ប្រវត្តិការចូលប្រើ (Access History)**: Show last login, last activity, failed login attempts per user — security audit view.  
**Add Tab 4 → ទំនាក់ទំនងគ្រោះថ្នាក់ (Emergency Contacts)**: HR-level contact info per staff (useful for Cambodian SMEs).

#### 📌 Improve `settings/settings.html`
Currently 4 tabs. **Add Tab 5 → ការកំណត់ការជូនដំណឹង (Notification Rules)**:  
Configure which events trigger alerts to which role. For example: "When invoice is overdue >30 days → notify Sales Manager + CS".

#### 📌 New Feature → Delegation of Authority
When GM is absent (on leave), who approves? Add a **"Delegate Approval Authority"** feature to the settings page — GM picks another user + date range. All approval requests route to that delegate during that period.

---

### Role 03 — Sales Manager `smPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងគ្រប់គ្រងលក់ `dashboard.html`
2. ជួរអនុម័ត `approvals/approvals.html`
3. បំពង់លំហូរការលក់ `pipeline/pipeline.html`
4. របាយការណ៍លក់ `reports/reports.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ការគ្រប់គ្រងការលក់ `sales-management/sales-management.html`
This is a critical missing piece: SM sets the rules the Sales Execs operate within.  
- **Tab 1 — គោលដៅ (Sales Targets)**: Set monthly/quarterly quota per Sales Exec (this is what drives the quota bar on SE dashboard — but currently no page to SET it)
- **Tab 2 — ច្បាប់តម្លៃ (Pricing Rules)**: Set floor prices per product, per customer tier (SE cannot go below this — but currently no page to configure it)
- **Tab 3 — ការគ្រប់គ្រង Commission**: Commission rate per SE, per product category, current month calculation
- **Tab 4 — ផែនការ Territory**: Assign customers/regions to specific SEs (currently SE sees "My Customers" but who assigns which customer to which SE?)

#### 📌 Improve `pipeline/pipeline.html` (Add Views)
Currently: Kanban board (5 columns).  
**Add View Toggle**: Kanban (current) ↔ **List View** (sortable table of all deals) ↔ **Forecast View** (tabular: deal value × win probability = weighted pipeline value).  
**Add Pipeline Summary Bar**: Total pipeline value, weighted forecast, avg days in stage.

#### 📌 Improve `approvals/approvals.html`
**Add Credit Limit Approval tab** — currently only discount/expense mentioned.  
When SE requests a credit limit increase for a customer, SM reviews here (not just discount approvals).

#### 📌 Improve `reports/reports.html` (Add More Chart Types)
Currently: 3 charts (Revenue Trend / Rep Performance / Quote-to-Invoice Funnel).  
**Add Tab 2 → ការវិភាគអតិថិជន (Customer Analytics)**:  
- Top 10 customers by revenue (horizontal bar)  
- Customer retention rate  
- New vs. returning customer count  
**Add Tab 3 → ការព្យាករណ៍ (Sales Forecast)**: Weighted pipeline + historical trend projection line chart.

---

### Role 04 — Sales Executive `sePortal`

**Current Sidebar (3 items):**
1. ផ្ទាំងការងារ `dashboard.html`
2. អតិថិជនរបស់ខ្ញុំ `customers/customers.html`
3. ឯកសារលក់ `quotes/quotes.html` (Quotes + Invoices tab hub)

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 4 → ម្ចាស់ភ្ញៀវ & ការទំនាក់ `schedule/schedule.html`
SE's core workflow is customer relationships. A lightweight **CRM Schedule page**:
- **Tab 1 — ការណាត់ជួប (Appointments)**: Calendar view of planned customer visits (simple — no third-party calendar needed, just a custom CSS grid for month view)
- **Tab 2 — ការតាមដាន (Follow-ups)**: All follow-up tasks (currently only shows 8 on dashboard — dedicated page needed for full list + filters)
- **Tab 3 — កំណត់ហេតុ (Call Notes)**: Log of customer interaction notes (lightweight CRM log — links to customer cards)

#### 📌 Improve `customers/customers.html` (Card Grid Improvements)
Doc specifies card grid (not table). Each card shows AR balance + credit limit bar.  
**Add "Statement of Account" button per customer card**: Opens a printable A4 statement for that customer (outstanding invoices list).  
**Add Customer "Health Score" badge**: Simple visual — Green (no overdue) / Amber (1-30d overdue) / Red (>30d overdue) — drives urgency.

#### 📌 Improve `quotes/quotes.html` (Document Hub Enhancement)
Currently 2 tabs: Quotes | Invoices.  
**Add Tab 3 → ការទូទាត់ (Payments)**: View payment receipts issued to MY customers (read-only — no financial editing). SE should be able to confirm "did this customer pay?" without calling accounting.

#### 📌 Improve `quotes/view-quote.html`
**Add Quick Convert Button**: "បម្លែងជាវិក្កយបត្រ" — converts approved quote to invoice with one click. Currently not detailed how SE performs this conversion.

#### 🆕 New View Page → `customers/view-customer.html`
Currently missing. This is a **high-priority gap**. Should include:
- Hero header: Customer name, tier badge, credit used/limit progress bar
- **Tab 1 — ប្រវត្តិការទិញ**: All invoices/quotes (with status)
- **Tab 2 — ការទូទាត់**: Payment history
- **Tab 3 — ព័ត៌មានទូទៅ**: Contact, business terms, pricing notes
- **Tab 4 — ម៉ូនីទ័រ**: Open AR balance, overdue flag

---

### Role 05 — Cashier / POS `posPortal`

**Current Pages (3 items sidebar):**
1. ផ្ទាំងគិតលុយ `pos-terminal.html`
2. វិក្កយបត្រក្នុងវេន `receipts/receipts.html`
3. បិទវេន និងរាប់សាច់ប្រាក់ `close-shift.html`

**Enhancement Ideas:**

#### 📌 Improve POS Terminal — Hold Orders
**"Hold" Feature**: Cashier can put a cart on hold (customer not ready to pay) and start a NEW order. Multiple holds possible (max 5 per shift). **Hold Queue button** in the terminal header reopens a held order.  
This is a real-world critical feature for retail — currently completely absent.

#### 📌 Improve POS Terminal — Product Search Refinement
Currently product grid with category pills.  
**Add Quick Search inside terminal**: Filter products by name/barcode without leaving the terminal. Currently scan-to-add works, but typed search is needed for products without barcode labels.

#### 📌 Improve `receipts/receipts.html`
Add **"Reprint Receipt"** button per row (currently mentioned but ensure it's explicit).  
**Add "Request Void"** button per receipt: Cashier cannot void directly — tapping this sends a void request to GM/Admin with a reason note. Creates a workflow trail.

#### 📌 Improve `close-shift.html`
Add **"Opening Float" recording at start of shift**: Before starting a new shift, cashier enters opening cash amount (e.g., $50 float). This becomes Step 0 in the close-shift wizard, and closing reconciliation becomes: Opening Float + Cash Sales − Cash Out = Expected Closing Cash.

#### 🆕 New Page → Open Shift `open-shift.html`
Currently undocumented. When cashier starts their shift:
- Select their name / confirm identity
- Enter opening float amount (counted physically)
- System records shift_start time and float
- "Start Shift" button → navigates to POS terminal

---

### Role 06 — Procurement Manager `pmPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងលទ្ធកម្ម `dashboard.html`
2. បញ្ជាទិញ & វិក្កយបត្រ `purchase-orders/purchase-orders.html`
3. អ្នកផ្គត់ផ្គង់ `vendors/vendors.html`
4. របាយការណ៍ទិញ `reports/reports.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ការគ្រប់គ្រងថវិកា `budget/budget.html`
Currently no budget management exists anywhere in the system.  
- **Tab 1 — ថវិកាប្រចាំខែ**: Define budget per expense category (set by GM, viewed/tracked by PM)
- **Tab 2 — ការប្រើប្រាស់ (Actual vs Budget)**: Compare PO spending vs approved budget per category. Visual progress bars.
- **Tab 3 — ការព្រមាន (Alerts)**: Categories nearing or exceeding budget limit

#### 📌 Improve `purchase-orders/purchase-orders.html`
Currently 3 tabs: PO List | Supplier Bills | 3-Way Match.  
**Add Tab 4 → សំណើទិញ (Purchase Requests)**: View PRs submitted by Warehouse Manager, convert to PO with one click. Currently the PR → PO flow is mentioned but no dedicated PR management UI.

#### 🆕 New Feature → RFQ (Request for Quotation) Management
Before creating a PO, PM can send RFQ to multiple vendors.  
**New pages under `purchase-orders/`:**
- `rfq.html` — List of open RFQs
- `create-rfq.html` — Select items, select multiple vendors, set response deadline
- `compare-rfq.html` — **Side-by-side vendor price comparison** (most powerful feature — choose best vendor with one click → converts to PO)

#### 📌 Improve `vendors/view-vendor.html`
Currently 3 tabs. **Add Tab 4 → ការ Evaluate (Vendor Scorecard)**:  
Score vendor on: Delivery on time % | Quality rejection rate % | Price competitiveness rating  
This makes vendor relationships data-driven.

#### 📌 Improve `reports/reports.html`
Currently: Monthly Spend by Vendor bar + PO Pipeline donut + vendor performance table.  
**Add Tab 2 → ការវិភាគថ្លៃដើម (Cost Trend Analysis)**:  
- Product cost trend over 12 months (track price inflation per item)
- Vendor price comparison for same product across vendors

---

### Role 07 — Warehouse Manager `wmPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងគ្រប់គ្រងស្តុក `dashboard.html`
2. តុល្យភាពស្តុក `stock-balance/balance.html`
3. ចលនា & កែតម្រូវ `movements/movements.html`
4. របាយការណ៍ស្តុក `reports/reports.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ការគ្រប់គ្រងទីតាំង `locations/locations.html`
Currently bin locations are referenced in pick-and-pack (yellow badge) but NO page exists to manage them.  
- **Tab 1 — ផែនការឃ្លាំង (Warehouse Map)**: Visual zone/aisle/bin layout (CSS grid, no third-party map)
- **Tab 2 — ការគ្រប់គ្រង Bin**: Create/edit/deactivate bin locations; assign products to bins
- **Tab 3 — ការផ្លាស់ប្ដូរ Bin**: Bin-to-bin transfer log (product relocation history)

#### 📌 Improve `stock-balance/balance.html`
Currently 2 tabs: Stock Balance | Product Catalog.  
**Add Tab 3 → ការគ្រប់គ្រង Batch/Lot**: Track individual batches with manufacturing/expiry dates. Critical for food, pharma, or any expirable product.  
**Add Tab 4 → ការ Cycle Count **: Schedule and manage periodic cycle counts (partial counts by zone, not full stocktake).

#### 📌 Improve `movements/movements.html`
Currently 3 tabs: Transfers | Adjustments | Reorder Alerts.  
**Add Tab 4 → GRN (ការទទួលទំនិញ)**: Move GRN management here (currently only create-grn.html exists as a standalone form; add a GRN list tab showing all received deliveries with status).  
**Add Tab 5 → សំណើទិញ (Purchase Requests)**: WM creates PRs here → sent to PM. Full PR lifecycle: Draft → Submitted → Converted to PO / Rejected.

#### 📌 Improve `reports/reports.html`
Currently: Turnover Rate bar + Valuation Trend line + Slow-Moving table.  
**Add Tab 2 → ការវិភាគ Expiry**: Products by expiry bucket: Expired / <30 days / 30-90 days / >90 days. Color-coded urgency system.  
**Add Tab 3 → Dead Stock Report**: Products with zero movement for >90 days. Include last movement date and suggested action (markdown/return to vendor).

---

### Role 08 — Warehouse Staff `wsPortal`

**Current Pages (3 sidebar items):**
1. រើស និងវេចខ្ចប់ `pick-and-pack.html`
2. ទទួលទំនិញចូល `receive-stock.html`
3. រាប់ស្តុកជាក់ស្តែង `stock-count.html`

**Enhancement Ideas:**

#### 🆕 New Page → ការស្វែងរកផលិតផល `product-lookup.html`
WS staff frequently need to answer: "Where is product X?" or "How many of Y are there?"  
A **scan-to-lookup** page (fully Archetype A compliant):
- Scan barcode → show: product name, bin location(s), current qty (not cost price)
- Giant text display — readable from arm's length
- No editing, no pricing, no financial data

This handles a real operational need that isn't currently addressed.

#### 📌 Improve `pick-and-pack.html`
**Add "Report Issue" button per order line**: When picking, staff finds wrong qty or damaged product — tap to log an exception note (sent to WM). Currently no way to flag problems during pick.

#### 📌 Improve `receive-stock.html`
**Add "Damaged Items" section per GRN**: After receiving, staff can mark specific items as damaged. These items get logged separately (do NOT enter stock) and WM gets notified for vendor dispute.  
Currently mentioned in docs as logging "separately" but no UI for it.

#### 📌 Redesign Existing `dashboard.html`
This file exists but isn't in v2 spec. Rather than delete it, repurpose as a **"Today's Tasks" summary page** (Archetype A compliant):
- Today's pick orders count (with large number badge)
- Pending deliveries count  
- Active stock count session (yes/no, with "Go to Count" button)
- No prices, no charts, no financial data
- Make it the actual landing page when WS logs in

---

### Role 09 — Chief Accountant `caPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងហិរញ្ញវត្ថុ `dashboard.html`
2. សៀវភៅធំ & COA `ledger/ledger.html`
3. របាយការណ៍ពន្ធ `tax-reports/tax-reports.html`
4. របាយការណ៍ហិរញ្ញវត្ថុ `financial-reports/financial-reports.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ទ្រព្យសកម្មមិនប្រែប្រួល `fixed-assets/fixed-assets.html`
Fixed asset management is completely absent from the current system but is an accounting fundamental.  
- **Tab 1 — បញ្ជីទ្រព្យ**: Asset register (name, purchase date, cost, useful life, accumulated depreciation, book value)
- **Tab 2 — ការរំលោះ (Depreciation Run)**: Monthly depreciation calculation; one-click "Post Depreciation Entries" for all assets
- **Tab 3 — ការចោល/លក់ (Disposal)**: Record asset disposal or sale; auto-journal for gain/loss on disposal

#### 📌 Improve `ledger/ledger.html` (Strengthen COA Tab)
Currently 3 tabs: COA tree | Journal Entries | GL Balances.  
**Add Tab 4 → ការជ្រើសរើស Cost Center**: Allocate journal entries to departments/cost centers. CA can generate expense reports by department.

#### 📌 Improve `financial-reports/financial-reports.html`
Currently 3 tabs: P&L | Cash Flow | Balance Sheet.  
**Add Tab 4 → ការប្រៀបធៀប (Comparative Analysis)**: Side-by-side comparison of any two periods (Month vs Month, Quarter vs Quarter, Year vs Year) — no ECharts needed, pure table format with variance columns (Amount Δ and % Δ).  
**Add Tab 5 → ថវិកា vs ពិតប្រាកដ (Budget vs Actual)**: Compare budgeted P&L vs actual (if budget module added via GM settings).

#### 📌 Improve `tax-reports/tax-reports.html`
Currently 3 tabs: VAT | WHT | Monthly Declaration.  
**Add Tab 4 → ការត្រៀមការបង់ (Tax Payment Tracker)**: Track which declarations have been filed + paid, with due date countdown. Link to the AP/AR payment voucher workflow (`aparPortal`).

#### 📌 New Feature → Month-End Closing Checklist
Within `dashboard.html`, add a **Period Closing Progress widget** (replaces or supplements Period Lock card):  
- Checklist: ✔ All GRNs posted / ✔ All receipts matched / ✔ Trial Balance balanced / ✔ Tax filed / ✔ Period Locked
- Progress bar with step completion %
- Each item is a clickable link to the relevant page

---

### Role 10 — AP/AR Accountant `aparPortal`

**Current Sidebar (5 items — maximum):**
1. ផ្ទាំងបំណុល & ទូទាត់ `dashboard.html`
2. បំណុលត្រូវទារ `ar/ar.html`
3. បំណុលត្រូវសង `ap/ap.html`
4. ការផ្ទៀងផ្ទាត់ធនាគារ `bank-recon/bank-recon.html`
5. របាយការណ៍ AR/AP `reports/reports.html`

> Sidebar is already at max (5). All additions must go as tabs within existing pages.

**Enhancement Ideas:**

#### 📌 Improve `ar/ar.html`
Currently 3 tabs: All Outstanding | Overdue Only | Collection History.  
**Add Tab 4 → លិខិតជំនុំ (Customer Statements)**: Generate and send monthly statement of account per customer.  
- Select customer → preview A4 statement (list of all open invoices + running balance)  
- "ផ្ញើតាម Email" button (or print if email not integrated yet)  
**Add Tab 5 → ការ Batch Collection**: Select multiple overdue customers → generate collection call list with contact info, outstanding amounts, overdue days.

#### 📌 Improve `ap/ap.html`
Currently 3 tabs: Amounts Due | Payment History | Payment Vouchers.  
**Add Tab 4 → ផែនការទូទាត់ (Payment Planning)**: Group bills by due date bucket → show weekly cash requirement. AP accountant can flag which bills to pay first (priority flag).  
This is a simple cash flow tool within the AP context.

#### 📌 Improve `bank-recon/bank-recon.html`
Currently: 2-panel matching + CSV upload + Auto-Match.  
**Add "Bank Statement History"**: List of all completed reconciliations with "View" link to see what was matched. Provides audit trail of bank reconciliations.  
**Add Multiple Bank Accounts support**: Dropdown to switch between: ABA Bank / Canadia / ACLEDA / Others (each has its own unreconciled balance).

#### 📌 Improve `dashboard.html`
Current: AR/AP Aging Cards + Due Today Strip + Quick Actions.  
**Add "Cash Flow Forecast" mini-panel**: Expected AR collections next 7 days vs AP payments due next 7 days. Net projected cash position (text only, no chart — Archetype D compliant).

#### 📌 New Feature → KHQR Batch Collection
Currently KHQR is individual per customer.  
**Add "ការ Batch KHQR"** button on the AR Overdue tab: Generate a list of unique KHQR QR codes for all selected overdue customers (PDF download). Team can physically visit with printed QRs for collection.

---

### Role 11 — Internal Auditor `iaPortal`

**Current Sidebar (4 items):**
1. ផ្ទាំងសវនកម្ម `dashboard.html`
2. កំណត់ហេតុសវនកម្ម `audit-trail/audit-trail.html`
3. ការគ្រប់គ្រងផ្ទៃក្នុង `internal-controls/internal-controls.html`
4. របាយការណ៍សវនកម្ម `reports/reports.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 5 → ផែនការសវនកម្ម `audit-plan/audit-plan.html`
Internal auditors don't just react — they PLAN. Currently no planning capability exists.  
- **Tab 1 — ផែនការប្រចាំឆ្នាំ (Annual Audit Plan)**: Schedule of planned audit activities by quarter (read-only table with status badges)
- **Tab 2 — ករណីស្រាវជ្រាវ (Investigation Cases)**: Formal investigation case management — when a breach escalates beyond acknowledgment, open a case file (case number, description, evidence links, status: Open/Under Review/Closed)
- **Tab 3 — ការរកឃើញ (Findings Register)**: Master list of all audit findings with risk level, remediation owner, due date, and status

#### 📌 Improve `audit-trail/audit-trail.html`
Currently: Timeline layout + expandable Before/After diff.  
**Add "Anomaly Highlight" filter**: One-click to filter only entries flagged as anomalous by the system (e.g., time-of-day outliers, bulk deletions, unusual amounts).  
**Add "Chain of Events" view**: Given any document (e.g., invoice INV-0042), show ALL audit events related to that document in chronological order — cross-references without navigating separately.

#### 📌 Improve `internal-controls/internal-controls.html`
Currently 3 tabs: Breaches | Risk Analysis | Review History.  
**Add Tab 4 → ការ Benchmark**: Compare key financial ratios vs industry benchmarks (manually configured). Highlight where the company underperforms.  
**Add "Acknowledge All" batch button**: If many minor breaches pile up, auditor can bulk-acknowledge with a master note.

#### 📌 Improve `reports/reports.html`
Currently 3 tabs with ECharts: Financial / Ratio Analysis / Historical Comparison.  
**Add Tab 4 → ការ Export ផ្លូវការ (Official Audit Export)**: Generate a formal internal audit report (PDF) with:  
- Auditor name + digital signature  
- Period covered  
- Summary of findings  
- Risk ratings  
- Recommendations section (free-text, typed by auditor before export)

---

### Role 12 — Customer Support `csPortal`

**Current Sidebar (3 items):**
1. ផ្ទាំងសេវាកម្ម `dashboard.html`
2. ស្វែងរកវិក្កយបត្រ `orders-lookup.html`
3. តាមដានការដឹកជញ្ជូន `delivery-status.html`

**Enhancement Ideas:**

#### 🆕 New Sidebar Item 4 → មូលដ្ឋានចំណេះដឹង `knowledge-base/knowledge-base.html`
Customer support agents need quick reference to answer common questions.  
- **Tab 1 — FAQ**: Frequently asked questions with answers (editable by GM/Admin only, read-only for CS)
- **Tab 2 — ច្បាប់ & គោលការណ៍**: Company policies (return policy, warranty terms, delivery terms) — quick reference for CS agents
- **Tab 3 — ព័ត៌មានផលិតផល**: Basic product info lookup (name, description, current price — NO cost price)

#### 📌 Improve `dashboard.html`
Currently: Hero Search + Ticket Queue (SLA timers) + Failed Deliveries Alert.  
**Add "Quick Stats Strip"**: Today's calls handled / Avg resolution time / Customer satisfaction score (from feedback). Motivational performance summary for CS agents.  
**Add "Escalation Queue"**: Tickets that have been escalated (beyond CS authority) — show status without CS being able to edit them.

#### 📌 Improve `orders-lookup.html`
Currently: 2-panel (Customer Card 30% + Orders 70%) + create-note link.  
**Add "Contact History" panel** below Customer Card: Last 5 support notes for this customer (read-only). Agent can see what previous agents discussed — avoids repeat explanations.  
**Add "Return/Refund Request" initiation**: CS cannot process refunds but can INITIATE a request (with reason + supporting order ID). Routes to GM for approval. Different from editing financial data — it's a service request.

#### 📌 Improve `delivery-status.html`
Currently: 3-column Kanban (Preparing / Out for Delivery / Delivered+Failed).  
**Add "Filter by Driver/Route"**: Group deliveries by assigned driver. More useful for operations management.  
**Add "SMS Notification" button per card**: One-tap to send a pre-configured SMS template to customer ("Your delivery is on the way..."). Integration placeholder — actual SMS can be future.

---

## 🌐 Part 3: System-Wide Cross-Cutting Improvements

These improvements apply across multiple or all roles.

---

### 3.1 🔔 Global Notification Center

**The Problem:** Currently NO role has a proper notification center. The sidebar shows count badges but clicking does nothing beyond navigating to the relevant page.

**Proposed Design:**
- Bell icon `🔔` in every role's content header bar (right side, next to user avatar)
- Badge shows unread count
- Click opens a **Notification Drawer** (slides in from right, 400px wide)
- Each notification: icon + message + timestamp + "Mark as Read" + action link
- "Mark All Read" button at top of drawer
- **Role-specific notification types** per the permission model

**New shared file:** `shared/scripts/notifications.js`

---

### 3.2 🔍 Global Command Search (Ctrl+K)

**The Problem:** Only Customer Support has a hero search. All other roles navigate by sidebar + manual filtering.

**Proposed Design:**
- Every role gets a **Command Palette** triggered by `Ctrl+K` or `/`
- Opens a centered modal search bar (dark overlay)
- Type to search within this role's data domain:
  - SE: search customers, invoices, quotes
  - PM: search vendors, POs
  - CA: search COA accounts, journal entries
  - WM: search products, movements
- Results appear as instant dropdown: grouped by type (Customer / Invoice / Quote)
- Select result → navigate to view page directly

**New shared file:** `shared/scripts/command-search.js`

---

### 3.3 📱 Mobile Strategy Declaration

**The Problem:** The v2 docs define Archetype A as touch-first but provide no guidance for non-A roles on mobile/tablet.

**Proposed Plan:**
| Role Category | Mobile Strategy |
|---|---|
| Archetype A (Cashier, WH Staff) | Full mobile-first responsive, tested at 375px |
| Archetype B (Sales, Procurement) | Tablet-responsive (768px min). Sidebar collapses to icons-only on tablet |
| Archetype C (Admin, Auditor) | Desktop-first; minimum readable at 1024px |
| Archetype D (Accounting) | Desktop-only; financial tables require minimum 1280px |
| External Portals | Mobile-first (customers/suppliers access on phone) |

---

### 3.4 🖨️ Shared Print Infrastructure

**The Problem:** Multiple roles need A4 print outputs (invoices, vouchers, POs, GRNs, statements, WHT certificates, payment receipts). Each currently implements print CSS individually.

**Proposed Standardization:**
- `shared/styles/print-a4.css` — shared base A4 print layout
- `shared/styles/document-template.css` — shared document header/footer/table styling
- `shared/scripts/print-manager.js` — handles browser print dialog, logo injection, page breaks

**Documents that should use shared print:**

| Document | Role | Current Status |
|---|---|---|
| Sales Invoice A4 | Sales Exec | Exists (ad-hoc CSS) |
| Quote A4 | Sales Exec | Exists |
| POS Receipt (thermal) | Cashier | Needs ESC/POS integration |
| Purchase Order A4 | Procurement Mgr | Needs creation |
| Goods Receipt Note (GRN) A4 | Warehouse Mgr | Needs creation |
| Payment Receipt A4 | AP/AR Accountant | Needs creation |
| Payment Voucher A4 | AP/AR Accountant | Needs creation |
| WHT Certificate A4 | Chief Accountant | Needs creation |
| Monthly Tax Declaration | Chief Accountant | Needs creation |
| Internal Audit Report PDF | Internal Auditor | Needs creation |

---

### 3.5 🌐 External Portals Enhancement

#### Customer Portal (currently 4 files)
**Currently:** Dashboard, My Invoices, Order Tracking, View Invoice

**Add:**
- `make-payment.html` → KHQR payment page (customer-facing QR generation from their outstanding invoices)
- `statement.html` → Monthly statement of account (download PDF)
- `contact-support.html` → Submit a support request (feeds into CS ticket queue)

#### Supplier Portal (currently 6 files)
**Currently:** Dashboard, Bills, Create Bill, POs, View PO, Delivery Tracking

**Add:**
- `submit-invoice.html` → Supplier submits their own invoice (feeds into PM's bill matching workflow)
- `rfq-response.html` → Supplier responds to RFQ with their quoted prices (feeds PM's compare-rfq page)
- `banking-details.html` → Supplier self-service banking info update (AP accountant verifies before activation)

---

### 3.6 📊 Missing Data Flows (Need Planning)

These cross-role workflows are referenced but not fully designed:

| Flow | From | To | Gap |
|---|---|---|---|
| Purchase Request → PO | Warehouse Manager (creates PR) | Procurement Manager (converts to PO) | No PR list page; no PR creation form fully documented |
| Quote Approval | Sales Executive (submits) | Sales Manager (approves/rejects/counter) | Counter-offer response UI not documented |
| Stock Count → Adjustment | Warehouse Staff (counts) | Warehouse Manager (reviews and approves) | WM review page for count results not documented |
| Invoice Void | Sales Exec (requests) | Admin/GM (approves void) | Void request form and approval flow not documented |
| Delivery Failed → Rescheduled | Customer Support (marks failed) | Warehouse Staff (re-queue for delivery) | How re-queued? No page for re-scheduling delivery |
| KHQR Payment Confirmed | Bank webhook | AP/AR Accountant (auto-mark paid) | Webhook handling not designed |

---

## 🗓️ Part 4: Recommended Build Priority

### Phase 1 — Critical Gaps (Complete What's Documented)
These are missing files that block workflow completion:

1. **04 Sales Exec**: `edit-customer.html`, `view-customer.html`, `edit-invoice.html`, `edit-quote.html`
2. **06 Procurement**: `edit-po.html`, `view-vendor-bill.html`, `edit-supplier.html`, `view-supplier.html`, `reports.html`
3. **07 Warehouse Mgr**: `balance.html`, `create-grn.html`, `view-adjustment.html`, `view-movement.html`, `reports.html`
4. **09 Chief Accountant**: `ledger.html`, `create-entry.html`, `view-entry.html`, `financial-reports.html`
5. **10 AP/AR**: `ar.html`, `ap.html`, `bank-recon.html`, `reports.html`
6. **Shared navigation**: reconcile `portal.js` with the approved v2 role navigation; do not add a new portal configuration where one already exists.
7. **12 Customer Support**: `create-note.html`

### Phase 2 — High Impact Enhancements
These are new features that significantly improve the system:

8. **03 Sales Manager**: `sales-management/sales-management.html` (Targets + Pricing Rules + Commission)
9. **07 Warehouse Mgr**: `movements/purchase-requests` tab (WM → PM PR flow)
10. **Global Notification Center**: `shared/scripts/notifications.js` + header bell icon for all roles
11. **05 Cashier**: `open-shift.html` + Hold Orders feature
12. **01 Super Admin**: `platform-settings/platform-settings.html`

### Phase 3 — Valuable Additions
13. **06 Procurement**: `rfq.html`, `create-rfq.html`, `compare-rfq.html` (RFQ workflow)
14. **09 Chief Accountant**: `fixed-assets/fixed-assets.html`
15. **11 Internal Auditor**: `audit-plan/audit-plan.html`
16. **Global**: `shared/scripts/command-search.js` (Ctrl+K search)
17. **04 Sales Exec**: `schedule/schedule.html` (CRM scheduling)

### Phase 4 — Future / v3 Scope
*(These are confirmed v3 features — keep placeholders in v2)*
- Drag-and-drop Kanban (Sales Manager pipeline)
- ESC/POS thermal printer via browser Serial API
- Live GPS tracking (Customer Support delivery board)
- WebSocket-based KHQR real-time payment detection
- SMS/Email notification service integration
- Live GPS Map for delivery Kanban

---

## 📝 Key Questions for Product Owner

Before implementing Phase 2 and beyond, these decisions need confirmation:

1. **Commission calculation**: Does the system calculate commissions automatically, or is it advisory only? Are commission rates per SE, per product, or per deal size?

2. **Budget module ownership**: Who creates the budget? GM only? Or CA? What is the budget period — monthly or annual?

3. **Purchase Request authority**: Can only WM create PRs? Or can other roles (e.g., department heads) also create PRs? What is the approval flow before PM sees them?

4. **Void Invoice flow**: SE cannot void. Does SE submit a void request through the system, or verbally to GM? If through system, which page does SE use?

5. **RFQ process**: Is RFQ a formal step before every PO, or optional? Does the system send actual emails to vendors, or just manage internal records?

6. **Fixed Assets**: Is depreciation required for v2, or v3? What depreciation method (straight-line only, or declining balance too)?

7. **Stock Count sessions**: Who initiates — WM only? Or can SA/GM initiate a surprise count?

8. **Multiple bank accounts**: How many bank accounts does a typical tenant have? Does each account reconcile separately in `bank-recon.html`?

9. **Customer Portal payment**: Is the intention for customers to actually PAY online through KHQR, or just view invoices? Payment processing has compliance implications.

10. **KHQR vs ABA/Wing**: Is KHQR the preferred digital payment or is ABA/Wing more common among the target customers? This affects the POS terminal's default payment button order.

---

## ✅ Part 5: Verified V2 UX/UI Blueprint

> **Purpose:** This section is the decision framework for redesigning v1 into v2. It is based on a second review of all 12 role documents, the current role folders, and the live shared sidebar configuration. It supersedes any earlier recommendation in this document when the two conflict.

### 5.1 Verification Findings Before V2 Build Starts

| Area | Verified finding | V2 planning decision |
|---|---|---|
| Roles | There are 12 internal roles in the role documents and matching numbered frontend folders. | Design the system as one connected 12-role operating model; do not design roles as isolated pages. |
| Current navigation | `portal.js` already contains configs for Sales, Warehouse, Customer Support, GM, Super Admin, Auditor, Procurement, Chief Accountant, and AP/AR. | Reconcile navigation labels, paths, counts, and active IDs with the approved v2 role documents before building features. |
| Navigation mismatch | GM currently has 5 sidebar entries while its role document specifies 4. Auditor currently has 5 while the v2 role document specifies 4. Chief Accountant and AP/AR current entries do not yet match the planned accounting workspaces. | Freeze one approved v2 sidebar map below, then make the documents and frontend use it as the single source of truth. |
| Page inventory | Existing HTML page counts show a prototype surface, not completed workflows. Several documents refer to pages that are not present in the current role folders. | Do not treat page count as completeness. Build workflow definitions first, then create only pages required by an approved workflow. |
| Earlier planning claims | The earlier note that PM, CA, and AP/AR portal configurations were absent is stale. | Use `aparPortal` as the existing AP/AR ID; decide whether to rename it only during a controlled navigation cleanup. |
| Responsive guidance | The master overview says fixed sidebar, while Warehouse Staff describes mobile bottom navigation and collapsed navigation. | Responsive navigation must depend on role and device. Floor and POS roles use touch navigation; desk roles use the desktop sidebar. |

### 5.2 Non-Negotiable V2 Page-Placement Rules

These rules answer where each function should go. They prevent one page, tab, or sidebar from becoming overloaded.

| UI surface | Use it for | Do not put here |
|---|---|---|
| Sidebar destination | A durable work area a user deliberately visits: for example, Receivables, Pick & Pack, or Audit Trail. | One-off actions, create forms, every report type, or a new entry for every feature. |
| Dashboard / home | What needs attention now: 1 status banner, up to 4 meaningful indicators, 2–4 quick routes, and a short action queue. | Charts, paginated record tables, filter bars, dense analytics, or a second copy of the full work list. |
| Work queue / list page | Scanning, filtering, sorting, assigning, and acting on many records of the same type. | Unrelated record types or visual analytics that distract from completion work. |
| Detail page | Understanding one record, its state, history, related records, and allowed next action. | Editing every field in-place or burying dangerous actions among ordinary actions. |
| Create / edit page | Completing one carefully structured transaction: quote, receipt, adjustment, journal, PO, or case update. | Historical analysis or unrelated management settings. |
| Report / analytics page | Date-filtered trends, comparison, charts when they answer a real question, export, and a small supporting data view. | Editing, approval decisions, or an operational queue. |
| Tab | 2–4 closely related views of the same object or same workflow stage. Examples: All / Draft / Awaiting Approval, or Customer Details / Activity / Documents. | A hiding place for many unrelated functions. If tabs have different owners, goals, or permission rules, split the destination. |
| Contextual action | A task that only makes sense from one record: approve, reject, post, reverse, reprint, request void. | A primary daily activity that users need to discover from navigation. |

### 5.3 Dashboard, List, and Report Standard

Every v2 page must have **one primary job**. A user must be able to answer from the page title and first screen: "What can I finish here?"

1. **Dashboard:** action-first. A KPI is allowed only when it changes a user's next action. It must link to the related queue. Use compact task cards or short rows, not a full table.
2. **List / queue:** operational-first. It may have status tabs, search, filters, saved views, sorting, bulk actions where safe, and a row action menu. No large chart area.
3. **Report:** analysis-first. Put charts, date ranges, comparison, export, and a concise supporting table here. If there is no decision the chart helps a role make, do not create the chart.
4. **Detail:** decision-first. Show state, ownership, timeline, related records, evidence, and the next allowed action.
5. **Forms:** completion-first. Show only the fields required for the transaction, validate early, preserve drafts where interruption is likely, and make the final commitment explicit.

### 5.4 Interaction and Visual Language

The system should share accessibility and quality standards while looking and behaving like the work of each role.

| Role family | Roles | V2 identity | Primary interaction |
|---|---|---|---|
| Platform governance | Super Admin | Calm, sparse platform operations; tenant health and controlled system changes. | Review, provision, suspend, investigate. |
| Executive governance | Admin/GM, Internal Auditor | Authority, clarity, guarded decisions, visible accountability. | Approve, delegate, review, investigate. |
| Pipeline work | Sales Manager, Sales Executive, Procurement Manager | Fast progression between states; clear ownership and next step. | Create, qualify, submit, compare, approve, follow up. |
| Floor console | Cashier, Warehouse Staff | Large touch targets, scan-first, interruption tolerant, high contrast. | Scan, confirm, hold, receive, count, close. |
| Inventory control | Warehouse Manager | Operational control room with exceptions, location awareness, and stock accountability. | Review exceptions, authorize movements, resolve variances. |
| Financial control | Chief Accountant, AP/AR Accountant | Precise, dense, desktop-first workspaces with traceable numbers. | Reconcile, post, collect, pay, close, investigate. |
| Customer operations | Customer Support | Search-first case workspace with customer context and clear service ownership. | Find, verify, communicate, escalate, resolve. |

**Action design rules**

- Use icon plus Khmer text for primary and high-risk actions. Icons alone are acceptable only for familiar secondary controls with an accessible label or tooltip.
- Use explicit verbs: Approve, Reject, Post, Reverse, Receive, Assign, Close Shift, Request Void. Avoid vague labels such as "Process" or "Submit" unless the result is obvious.
- Put destructive or financially irreversible actions in a distinct danger area with a clear consequence, reason capture where needed, and confirmation.
- Keep color meanings stable: red for a problem or destructive action, amber for waiting or caution, green for completed/posted/paid, and neutral/role accent for ordinary navigation.
- Use role-specific layout and density, not only a different color. A cashier screen must not feel like an accounting ledger; an auditor screen must not feel like a sales pipeline.

### 5.5 Proposed V2 Sidebar Map and Focused Workspaces

This is the recommended target architecture. Counts stay between 3 and 5. Parenthetical items are **tabs or contextual views inside that workspace**, not extra sidebar items.

| # | Role | Target sidebar destinations | Focused workspace design and recommendations |
|---|---|---|---|
| 01 | Super Admin | Dashboard; Tenants; Plans & Billing; Global Audit; Platform Settings | Keep Platform Settings as the fifth destination only if this role truly owns platform-wide SMTP, backups, integrations, and feature flags. In Plans & Billing, use separate tabs for plan catalog, tenant subscriptions, and billing history. Tenant detail can contain profile, users, subscription, activity, and feature access because all belong to one tenant. |
| 02 | Admin / GM | Executive Home; Approvals; People & Access; Company Administration | Keep this at 4. Combine company profile, operating policy, notification rules, and approval delegation under Company Administration only if GM owns all of them. If daily user administration is delegated, move it to a separate Admin role later rather than making GM a data-entry user. |
| 03 | Sales Manager | Sales Home; Approval Queue; Team Pipeline; Sales Control; Sales Reports | Add Sales Control as item 5 only for targets, territories, pricing floors, and commission policy. Do not combine these with pipeline because they are management configuration, not deal work. Pipeline should offer board, list, and forecast views of the same deals. |
| 04 | Sales Executive | My Work; My Customers; Sales Documents; Follow-ups | The fourth destination is justified only if follow-up volume is material. It holds tasks, visits, calls, reminders, and notes. Keep Quotes and Invoices as tabs inside Sales Documents only if the first action is to create or track a sales document; otherwise give the documents workspace a clear start screen. Never expose cost or margin. |
| 05 | Cashier / POS | POS Terminal; This Shift; Close Shift | Do not add a dashboard. The terminal is the home. This Shift contains receipts, held sales, reprints, payment exceptions, and void requests. Opening a shift should be a gate before entering the terminal, not a permanent sidebar item. |
| 06 | Procurement Manager | Procurement Home; Purchase Workspace; Suppliers; Procurement Reports | Purchase Workspace contains approved purchase requests, RFQs if required, POs, receiving status, and vendor bill matching because these are stages of buying. Keep Suppliers separate for vendor profile, documents, contacts, banking verification, and scorecard. Do not add RFQ as a sidebar item unless RFQ is a major daily workflow. |
| 07 | Warehouse Manager | Inventory Home; Stock Balance; Inventory Control; Inventory Reports | Inventory Control contains transfers, adjustments, goods receipt review, stock-count variance review, and purchase requests. Use tabs only when each view changes the same stock position or exception queue. Add Locations as a tab of Stock Balance unless multi-warehouse setup becomes its own daily job. |
| 08 | Warehouse Staff | Pick & Pack; Receive Stock; Stock Count | Do not add a dashboard sidebar item. Start at the most urgent assigned queue. On phone use 3 large bottom tabs; on tablet use a pinned touch navigation bar. Every task must support scan-first use and a safe resume after interruption. |
| 09 | Chief Accountant | Finance Home; Ledger & COA; Tax; Financial Statements | The current navigation must be changed to include Ledger & COA and remove an unnecessary separate Approvals destination unless chief-accountant approvals are a high-volume daily job. Put approval work as a filtered queue on Finance Home or in Ledger & COA only when it relates to posting and close. Use Financial Statements for P&L, balance sheet, cash flow, comparative analysis, and drill-down. |
| 10 | AP/AR Accountant | AR Home; Receivables; Payables; Bank Reconciliation; AR/AP Reports | Keep 5 destinations. Receivables owns invoices due, collections, receipts, credit notes, statements, and collection history. Payables owns bills due, payment proposals, vouchers, WHT, and payment history. This removes the current ambiguity where separate receipt and voucher entries hide the AR/AP work queues. |
| 11 | Internal Auditor | Audit Home; Audit Trail; Internal Controls; Audit Reports | Keep 4. Merge Financial Overview into Audit Reports as the role document proposes. Audit Reports may have financial review, ratios, history, and official export tabs because they are read-only analysis. Add Audit Plan and Findings follow-up as tabs in Internal Controls only if they use the same risk/control lifecycle; otherwise make Audit Work a fifth destination and remove no-longer-needed views. |
| 12 | Customer Support | Service Queue; Order Lookup; Delivery & Returns; Knowledge Base | Make the home a live case queue, not merely a dashboard. Add Delivery & Returns only if returns and failed-delivery work are a real support responsibility. Knowledge Base is useful when agents repeatedly answer product, payment, delivery, or return questions; it should be read-only for agents and managed by an authorized owner. |

### 5.6 Cross-Role Workflows Required for V2

No role page is complete until the record handoff, ownership, notification, and exception path are defined.

| Workflow | Recommended v2 path | Required decisions before UI build |
|---|---|---|
| Quote to cash | Sales Executive creates quote → Sales Manager approves/counters when needed → Sales Executive issues invoice → Cashier or AP/AR records payment → Chief Accountant receives posted accounting effect. | Discount thresholds, counter-offer behavior, credit hold, invoice void/reversal authority, payment allocation rules. |
| Replenishment to supplier bill | Warehouse Manager creates purchase request → authorised approver reviews if required → Procurement creates RFQ/PO → Warehouse Staff receives delivery → Warehouse Manager resolves discrepancy → Procurement/AP performs three-way match → AP/AR schedules payment → Chief Accountant posts/controls period. | Who can request, when RFQ is mandatory, partial receipt rules, tolerance for price/quantity differences, who can approve exceptions. |
| Stock count to adjustment | Warehouse Manager opens count session → Warehouse Staff counts by scan → system compares expected versus counted → Warehouse Manager reviews variance → authority approves adjustment → audit trail retains evidence. | Blind count requirement, movement freeze or live counting rule, variance limits, evidence and reason requirements. |
| Customer delivery problem | Customer Support identifies delayed/failed/returned delivery → assigns or escalates → Warehouse Staff receives re-queue work → support updates customer → case closes with a reason. | Delivery owner, allowed status changes, return authorization, customer notification channel, SLA and escalation. |
| Payment and bank reconciliation | Cashier/APAR records or imports payment → payment validates against customer/supplier record → bank transaction matches or becomes exception → AP/AR reconciles → Chief Accountant reviews close controls. | Payment providers, multi-bank account support, duplicate/partial payment handling, reconciliation approval and reversals. |
| Audit finding remediation | Auditor detects control breach → records finding/evidence → accountable role receives remediation task → owner responds → auditor verifies and closes or reopens. | Auditor ability to create findings, evidence retention, remediation owner, due-date escalation, closure authority. |

### 5.7 Notification, Search, and Work Ownership

**Notification center:** A badge is useful only when clicking it leads to a clear, actionable list. Each notification must have: event type, target role/user, priority, related record, owner, due date/SLA when relevant, escalation rule, and read state. Avoid sending a notification for every data change.

**Search:** Use global search only for authorised records the user can access. The result must state record type, status, primary identifier, and next step. Keep role-specific search on operational pages where scanning speed matters: Customer Support order lookup, Warehouse barcode input, and financial document lookup.

**Ownership:** Every active record should show: current state, current owner, next required action, due time if any, and latest activity. This is more valuable than adding more dashboard cards.

### 5.8 Device and Responsive Policy

| Role group | Primary device | Navigation | Layout rules |
|---|---|---|---|
| Cashier and Warehouse Staff | Phone, touch terminal, tablet, scanner | 3 large bottom or pinned touch destinations | 56px minimum primary targets, scan field always reachable, large text, no financial data for Warehouse Staff, safe draft/resume behavior. |
| Sales and Procurement | Laptop and tablet | 4–5 destination sidebar; compact tablet navigation when necessary | Pipeline/list switching, fast forms, contextual actions, no dense financial ledger layouts. |
| GM, Super Admin, Auditor | Laptop or desktop | Persistent sidebar | Wide read-first views, clear approval or review queue, guarded high-impact actions. |
| Accounting | Desktop with keyboard | Persistent sidebar | Dense, right-aligned numeric grids, sticky table headers, keyboard-friendly workflow, source-document drill-down. |

### 5.9 V2 Delivery Order

Do not start by creating many pages. Each phase must leave complete, usable workflows.

1. **Foundation:** approve the sidebar map, page-placement rules, role permissions, status vocabulary, responsive policy, and shared record-detail/timeline patterns.
2. **Critical end-to-end workflows:** quote-to-cash, purchase-to-pay, stock-count-to-adjustment, and delivery-exception handling. Define state transitions and handoffs before building missing screens.
3. **Role workspaces:** finish role queues, record detail pages, create/edit forms, and exception actions. Remove navigation that contradicts the approved map.
4. **Financial governance:** ledger/COA, tax, AR/AP, reconciliation, period close, reversals, and traceability.
5. **Reports and decision support:** add only reports tied to a stated decision. Keep reports read-only, exportable, and separate from operational queues.
6. **Optional integrations and advanced functions:** payment webhooks, external messaging, GPS, thermal printer support, live updates, and portals after their operational and compliance decisions are confirmed.

### 5.10 V2 Acceptance Checklist

Before a role is considered complete, verify all of the following:

- Its sidebar has 3–5 clear destinations and every destination has one primary job.
- The dashboard or home does not contain a chart, paginated table, or unrelated configuration work.
- Each queue has defined filters, empty state, row actions, ownership, and status transitions.
- Each record type has a detail view, relevant activity/audit history, and explicit allowed next actions.
- Every handoff identifies sender, receiver, state, notification, escalation, and exception route.
- Every high-impact financial, inventory, approval, or access action records who acted, when, why, and what changed.
- The role's device, text size, target size, visibility rules, and information density match its real working environment.
- The role cannot view data outside its permission boundary, especially costs, margins, bank details, tax data, and audit evidence.
- The role looks different because its workflow, layout, and interaction are different, while shared patterns remain familiar and accessible.

---

*End of Planning Document — eBMS v2 Enhancement Proposals*  
*Planning only — no code changes made.*
