# ផែនការ UI Prototype តាមតួនាទី — DIGITECHKH BMS
## Role-Based Access Control (RBAC) Portal System

> ប្រព័ន្ធ BMS ដ៏ទូលំទូលាយ ដែលរួមបញ្ចូលមុខងារស្រដៀង Odoo · Dolibarr · QuickBooks · Petree  
> អ្នកប្រើប្រាស់គ្រប់រូបឃើញ និងអាចធ្វើបានតែអ្វីដែលចាំបាច់សម្រាប់ការងាររបស់ខ្លួន។

---

## គោលការណ៍ស្ថាបត្យកម្ម (Architecture Principles)

- **Zero Data Leakage** — portal នីមួយៗជាថតដាច់ដោយឡែក, គ្មានការចែករំលែកទំព័រជាមួយ Admin
- **Visual Role Identity** — sidebar color + role badge ខុសគ្នាពីគ្នា ឱ្យស្គាល់ role ភ្លាមៗ
- **Minimum Privilege** — sidebar បង្ហាញតែ menu ដែល role អនុញ្ញាតប៉ុណ្ណោះ
- **Khmer-first UI** — អត្ថបទ 100% ភាសាខ្មែរ, លេខ English/Arabic
- **Consistent Design** — Kantumruy Pro, h-[72px] header, unified date picker, custom dropdowns

---

## តារាង Role Access Matrix

| # | Role | ខ្មែរ | Sidebar Color | Modules |
|---|---|---|---|---|
| 0 | Admin *(existing)* | អ្នកគ្រប់គ្រង | `#1b5223` dark green | Full access |
| 1 | **Super Admin** | ស៊ុបភើរ អ្នកគ្រប់គ្រង | `#1a1a2e` midnight navy | Platform: Companies, Subscriptions, Global Users, Audit |
| 2 | **Manager** | អ្នកគ្រប់គ្រង/ប្រធានផ្នែក | `#1e3a5f` steel blue | Read-only: Reports, Approvals (approve/reject only) |
| 3 | **Accountant** | គណនេយ្យករ | `#2d3748` dark slate | Finance: Payments, Disbursements, Tax, Reports |
| 4 | **Sales Staff** | បុគ្គលិកផ្នែកលក់ | `#7c2d12` deep amber-red | Sales only: Invoices, Quotes, Customers, Payments |
| 5 | **Purchase Staff** | បុគ្គលិកផ្នែកទិញ | `#1e3a8a` royal blue | Purchase only: Bills, Suppliers, Disbursements |
| 6 | **Inventory Staff** | បុគ្គលិកផ្នែកស្តុក | `#4a1d96` deep purple | Stock only: Balance, Catalog, Movement (no cost prices) |
| 7 | **Cashier** | អ្នកគិតប្រាក់ | `#065f46` deep emerald | POS Quick-Sale, Today's Transactions only |
| 8 | **Supplier Portal** | ច្រករបៀងអ្នកផ្គត់ផ្គង់ | `#1c1917` warm dark | My Orders, My Bills, My Payments |
| 9 | **Delivery Driver** | អ្នកដឹកជញ្ជូន | `#78350f` warm brown | My Deliveries, Confirm Delivery, Proof Upload |
| 10 | **HR Staff** | បុគ្គលិកផ្នែករដ្ឋបាល/HR | `#134e4a` dark teal | Employees, Attendance, Leave, Payroll Summary |
| 11 | **Customer Portal** | ច្រករបៀងអតិថិជន | `#1e1b4b` deep indigo | My Invoices, My Payments, My Orders, Download Docs |

---

## រចនាសម្ព័ន្ធថត (Full Folder Structure)

```
frontend/src/pages/
│
├── 1-login/                            (existing — shared login with role detection)
├── 2-home/                             (existing — Admin portal)
├── 3-sales/                            (existing — Admin)
├── 4-buy/                              (existing — Admin)
├── 5-stock/                            (existing — Admin)
├── 6-reports/                          (existing — Admin)
├── 7-settings/                         (existing — Admin)
│
├── 8-super-admin/                      ★ NEW — Super Admin Portal
│   ├── dashboard.html
│   ├── 1-companies/
│   │   ├── companies.html
│   │   └── view-company.html
│   ├── 2-subscriptions/
│   │   └── subscriptions.html
│   ├── 3-users/
│   │   └── global-users.html
│   └── 4-audit-logs/
│       └── audit-logs.html
│
└── 9-portals/                          ★ NEW — Role-Based Portals
    │
    ├── manager/
    │   ├── dashboard.html
    │   ├── approvals.html
    │   └── reports.html
    │
    ├── accountant/
    │   ├── dashboard.html
    │   ├── payments.html
    │   ├── disbursements.html
    │   └── reports.html
    │
    ├── sales-staff/
    │   ├── dashboard.html
    │   ├── invoices.html
    │   ├── quotes.html
    │   ├── customers.html
    │   └── payments.html
    │
    ├── purchase-staff/
    │   ├── dashboard.html
    │   ├── bills.html
    │   ├── suppliers.html
    │   └── disbursements.html
    │
    ├── inventory-staff/
    │   ├── dashboard.html
    │   ├── balance.html
    │   ├── catalog.html
    │   └── movement.html
    │
    ├── cashier/
    │   ├── dashboard.html              (POS split-panel layout)
    │   └── history.html
    │
    ├── supplier/
    │   ├── dashboard.html
    │   ├── my-orders.html
    │   ├── my-bills.html
    │   └── payments.html
    │
    ├── driver/
    │   ├── dashboard.html
    │   ├── my-deliveries.html
    │   └── delivery-detail.html
    │
    ├── hr-staff/
    │   ├── dashboard.html
    │   ├── employees.html
    │   ├── attendance.html
    │   ├── leave.html
    │   └── payroll.html
    │
    └── customer/
        ├── dashboard.html
        ├── my-invoices.html
        ├── my-payments.html
        └── my-orders.html
```

---

## លម្អិតគ្រប់ Portal (Page-by-Page Detail)

---

### 🔐 Portal 1 — Super Admin `8-super-admin/`

**Sidebar:** `#1a1a2e` midnight navy · Badge: Gold `#f59e0b` · Label: "ស៊ុបភើរ អ្នកគ្រប់គ្រង"

#### `dashboard.html`
- KPI Cards: ចំនួនក្រុមហ៊ុន, អ្នកប្រើសកម្ម, ចំណូលប្រចាំខែ, ស្ថានភាពប្រព័ន្ធ
- Chart: Company activity (ECharts bar)
- Feed: ព្រឹត្តិការណ៍ចុងក្រោយ (Audit log mini feed)
- Quick links: បន្ថែមក្រុមហ៊ុន, គ្រប់គ្រងផែនការ

#### `1-companies/companies.html`
- Table: ឈ្មោះក្រុមហ៊ុន, ផែនការ, ថ្ងៃផុតកំណត់, ស្ថានភាព
- Status badges: សកម្ម / ផ្អាក / សាកល្បង
- Row actions: មើល, កែ, ផ្អាក

#### `1-companies/view-company.html`
- Company profile: ឈ្មោះ, អាសយដ្ឋាន, ទំនាក់ទំនង
- Tab: អ្នកប្រើ | ជាវ | ប្រវត្តិ Audit

#### `2-subscriptions/subscriptions.html`
- Table: ក្រុមហ៊ុន, ផែនការ (Trial/Basic/Pro/Enterprise), ថ្ងៃផ្តើម, ថ្ងៃផុតកំណត់, ស្ថានភាព
- Summary cards: ចំនួន Trial, ចំនួន Active, ចំណូលប្រចាំខែ (MRR)

#### `3-users/global-users.html`
- Table: ឈ្មោះ, Email, ក្រុមហ៊ុន, តួនាទី, ថ្ងៃចូលប្រព័ន្ធចុងក្រោយ, ស្ថានភាព
- Filter by: ក្រុមហ៊ុន, តួនាទី, ស្ថានភាព
- Row actions: កំណត់ Password, ដំណើរការ/ផ្អាក

#### `4-audit-logs/audit-logs.html`
- Table: ម៉ោង, អ្នកប្រើ, ក្រុមហ៊ុន, សកម្មភាព, Module, IP address
- Color-coded action types: បង្កើត (green), កែ (blue), លុប (red), Login (gray)
- Filter: ក្រុមហ៊ុន, អ្នកប្រើ, ប្រភេទ, ចន្លោះកាលបរិច្ឆេទ

---

### 📊 Portal 2 — Manager `9-portals/manager/`

**Sidebar:** `#1e3a5f` steel blue · Badge: Light blue · Label: "ប្រធានផ្នែក"

#### `dashboard.html`
- KPI: ចំនួនការអនុម័តរង់ចាំ (prominent red counter), ចំណូលខែនេះ, ចំណាយខែនេះ, ប្រាក់ចំណេញ
- Chart: Revenue vs Expense (line chart — 6 months)
- Widget: Top 5 ផលិតផលដែលលក់ច្រើន (bar chart)
- Feed: ព្រឹត្តិការណ៍ថ្មីៗ (latest 10 activities)

#### `approvals.html`
- Tabs: វិក្កយបត្រ | សម្រង់តម្លៃ | ការទិញ
- Table: លេខ, ឈ្មោះ, ទឹកប្រាក់, ស្នើដោយ, ថ្ងៃស្នើ, ស្ថានភាព
- Actions per row: ✅ យល់ព្រម · ❌ បដិសេធ (with reason textarea modal)
- **No "Create" button anywhere on this portal**

#### `reports.html`
- Tabs: ការលក់ | ការទិញ | ស្តុក | ហិរញ្ញវត្ថុ
- Date range picker (unified standard)
- Summary table + ECharts visual
- Buttons: Export PDF, Export Excel (UI only for prototype)
- **All read-only — no edit/delete actions**

---

### 💰 Portal 3 — Accountant `9-portals/accountant/`

**Sidebar:** `#2d3748` dark slate · Badge: Teal `#0d9488` · Label: "គណនេយ្យករ"

#### `dashboard.html`
- KPI: ចំណូលសុទ្ធ, ចំណាយសរុប, ប្រាក់ចំណេញដុល, អតប (VAT) ត្រូវបង់
- Chart: Cash flow monthly (ECharts area chart)
- Widget: ការទូទាត់ផុតកំណត់ (overdue payments alert list)
- Widget: Tax summary (Q1–Q4 capsule progress)

#### `payments.html`
- ការទូទាត់ចូល — Sales payments received list
- Table: វិក្កយបត្រ#, អតិថិជន, ទឹកប្រាក់, ថ្ងៃទូទាត់, វិធីទូទាត់, ស្ថានភាព
- Filter: ចន្លោះកាលបរិច្ឆេទ, វិធីទូទាត់
- Action: Confirm Receipt (accountant double-check)

#### `disbursements.html`
- ការទូទាត់ចេញ — Purchase disbursements list
- Same structure as payments but outgoing

#### `reports.html`
- Financial-only reports: P&L, Cash Flow, VAT/Tax Report
- Export-ready Khmer layout

---

### 🛒 Portal 4 — Sales Staff `9-portals/sales-staff/`

**Sidebar:** `#7c2d12` deep amber-red · Badge: Orange `#f97316` · Label: "បុគ្គលិកផ្នែកលក់"

#### `dashboard.html`
- KPI: ការលក់ថ្ងៃនេះ, ចំណូលខែនេះ, គោលដៅ (progress bar %), អតិថិជនកំពូល
- Quick CTA: ប៊ូតុង "+ បង្កើតវិក្កយបត្រ" (large, prominent)
- Chart: My sales last 7 days (bar)
- List: វិក្កយបត្ររបស់ខ្ញុំ (5 ចុងក្រោយ)

#### `invoices.html`
- Same columns as Admin invoice list but filtered to "My invoices" by default
- Can Create, Edit own drafts, View all

#### `quotes.html` · `customers.html` · `payments.html`
- Same structure, same restriction (own data scope)
- **Hidden: cost price columns, profit margin, other staff's records**

---

### 🛍️ Portal 5 — Purchase Staff `9-portals/purchase-staff/`

**Sidebar:** `#1e3a8a` royal blue · Badge: Sky blue · Label: "បុគ្គលិកផ្នែកទិញ"

#### `dashboard.html`
- KPI: វិក្កយបត្ររង់ចាំ, ការចំណាយខែនេះ, អ្នកផ្គត់ផ្គង់ (Top 3)
- Alert: ស្តុកទំនិញជិតអស់ (Low stock notifications — read-only)
- Chart: Monthly purchase spending (bar)

#### `bills.html` · `suppliers.html` · `disbursements.html`
- Purchase modules only
- **Hidden: sales data, revenue, customer info**

---

### 📦 Portal 6 — Inventory Staff `9-portals/inventory-staff/`

**Sidebar:** `#4a1d96` deep purple · Badge: Violet `#a78bfa` · Label: "បុគ្គលិកផ្នែកស្តុក"

#### `dashboard.html`
- KPI: ផលិតផលសរុប, ផលិតផលជិតអស់ (alert count highlighted red), ចលនាស្តុកថ្ងៃនេះ
- List: Low-stock alert table (item, current qty, min threshold)
- Quick action: "+ បញ្ចូលស្តុក"

#### `balance.html`
- Stock balance table: ផលិតផល, SKU, ចំនួន, ទីតាំង
- **Hidden: ថ្លៃទិញ (purchase cost), ថ្លៃលក់ (sale price)** — quantity only

#### `catalog.html`
- Product list: ឈ្មោះ, SKU, ប្រភេទ, ឯកតា, ចំនួនស្តុក
- Can Add / Edit product details (no pricing fields visible)

#### `movement.html`
- In/Out movement log: ថ្ងៃខែ, ផលិតផល, ចំនួនចូល/ចេញ, ហេតុផល, ធ្វើដោយ
- Quick stock adjustment form

---

### 🖥️ Portal 7 — Cashier (POS) `9-portals/cashier/`

**Sidebar:** `#065f46` deep emerald · Badge: Lime `#84cc16` · Label: "អ្នកគិតប្រាក់"

> **Layout: POS Split-Panel** — NOT the standard table layout

#### `dashboard.html` *(POS Interface)*
```
┌─────────────────────────────┬──────────────────────┐
│  LEFT PANEL (2/3 width)     │ RIGHT PANEL (1/3)    │
│  ──────────────────────     │ ─────────────────    │
│  🔍 ស្វែងរកផលិតផល           │ 🛒 រាយការណ៍ (Cart)   │
│                             │                      │
│  [Product Grid — big cards] │ Item 1  x2  $10.00  │
│  ┌──────┐ ┌──────┐ ┌──────┐│ Item 2  x1  $ 5.00  │
│  │ 🖼️  │ │ 🖼️  │ │ 🖼️  │ │ ─────────────────    │
│  │Name │ │Name │ │Name │ │ សរុបរង:      $15.00  │
│  │$5.00│ │$8.00│ │$3.00│ │ បញ្ចុះតម្លៃ:  $ 0.00  │
│  └──────┘ └──────┘ └──────┘│ សរុបចុងក្រោយ: $15.00 │
│                             │                      │
│  Category filter pills      │ [💵 សាច់ប្រាក់]      │
│                             │ [💳 កាត]              │
│                             │ [QR បង់ប្រាក់]       │
│                             │                      │
│                             │ ✅ [គិតប្រាក់]        │
│                             │  (Large green btn)   │
└─────────────────────────────┴──────────────────────┘
```
- Today's summary bar at top: # transactions, total cash, total card
- No historical access beyond today

#### `history.html`
- Today's transactions only (date-locked — cannot change date)
- Columns: ម៉ោង, # វិក្កយបត្រ, ចំនួនមុខ, ទឹកប្រាក់, វិធីទូទាត់, ប៊ូតុងបោះពុម្ពម្ដងទៀត

---

### 🏭 Portal 8 — Supplier Portal `9-portals/supplier/`

**Sidebar:** `#1c1917` warm dark · Badge: Amber `#d97706` · Label: "ច្រករបៀងអ្នកផ្គត់ផ្គង់"

> External-facing portal. Supplier logs in with their own credentials and sees ONLY their own data.

#### `dashboard.html`
- Welcome banner: "សូមស្វាគមន៍, [ឈ្មោះអ្នកផ្គត់ផ្គង់]"
- Cards: សមតុល្យនៅជំពាក់, ចំនួនការបញ្ជាទិញ, ការទូទាត់ចុងក្រោយ
- Timeline: Recent order status

#### `my-orders.html`
- Orders placed by the company TO this supplier
- Columns: # បញ្ជាទិញ, ថ្ងៃ, ផលិតផល, ចំនួន, ស្ថានភាព (Pending/Confirmed/Delivered)

#### `my-bills.html`
- Bills/invoices this supplier submitted to the company
- Can upload new bill (document upload UI)

#### `payments.html`
- Payments received from the company
- Columns: ថ្ងៃ, ទឹកប្រាក់, វិធី, # យោង, ស្ថានភាព

---

### 🚚 Portal 9 — Delivery Driver `9-portals/driver/`

**Sidebar:** `#78350f` warm brown · Badge: Yellow `#eab308` · Label: "អ្នកដឹកជញ្ជូន"

> Mobile-friendly layout priority. Driver checks their phone on the road.

#### `dashboard.html`
- Today's stats: ចំនួនដឹក, បានបញ្ជូន, នៅសល់
- Assigned deliveries list for today (map-link per order)
- Status overview donut chart

#### `my-deliveries.html`
- List of deliveries assigned to this driver
- Filter: ថ្ងៃនេះ / ថ្ងៃស្អែក / ទាំងអស់
- Columns: ពេលវេលា, អតិថិជន, អាសយដ្ឋាន, ទូរស័ព្ទ, ស្ថានភាព
- Per-row action: "បានដឹកជញ្ជូន" (confirm delivery button)
- **Hidden: prices, invoice amounts, payment info**

#### `delivery-detail.html`
- Customer name, address (click-to-call phone)
- Items list (names + quantities ONLY, no prices)
- Photo upload proof of delivery
- Signature capture area
- Note/remark input
- Confirm Delivery button

---

### 👥 Portal 10 — HR Staff `9-portals/hr-staff/`

**Sidebar:** `#134e4a` dark teal · Badge: Cyan `#06b6d4` · Label: "HR / រដ្ឋបាល"

#### `dashboard.html`
- KPI: បុគ្គលិករបស់ (total), ចូលការ/ថ្ងៃនេះ, ច្បាប់រង់ចាំ, ខែប្រាក់ខែ
- Calendar: Today's attendance summary
- List: Pending leave requests

#### `employees.html`
- Employee list: ឈ្មោះ, តួនាទី, ផ្នែក, ទូរស័ព្ទ, ថ្ងៃចូលធ្វើការ, ស្ថានភាព
- Can add/edit employee profiles
- **Hidden: financial data, salary of others (role-limited)**

#### `attendance.html`
- Daily attendance log: ឈ្មោះ, ម៉ោងចូល, ម៉ោងចេញ, ស្ថានភាព
- Weekly/monthly view toggle

#### `leave.html`
- Leave request list: ឈ្មោះ, ប្រភេទច្បាប់, ចាប់ពី, ដល់, ស្ថានភាព
- Approve/Reject buttons (HR staff only)
- Leave balance summary per employee

#### `payroll.html`
- Monthly payroll summary table: ឈ្មោះ, ប្រាក់ខែ, ហត្ថលេខាបញ្ជាក់
- Read + export only (no direct edit — edit goes through employee profile)

---

### 🛍️ Portal 11 — Customer Portal `9-portals/customer/`

**Sidebar:** `#1e1b4b` deep indigo · Badge: Purple `#a855f7` · Label: "ច្រករបៀងអតិថិជន"

> Self-service portal for customers. They see ONLY their own business transactions.

#### `dashboard.html`
- Welcome banner: "សូមស្វាគមន៍, [ឈ្មោះអតិថិជន]"
- Cards: ចំនួនវិក្កយបត្ររង់ចាំ, ចំនួនជំពាក់, ការទូទាត់ចុងក្រោយ
- Recent invoices mini-list (last 5)

#### `my-invoices.html`
- My invoices from the company: #, ថ្ងៃ, ទឹកប្រាក់, ស្ថានភាព
- Download PDF button per invoice
- **Cannot see other customers' invoices**

#### `my-payments.html`
- Payment history: ថ្ងៃ, # យោង, ទឹកប្រាក់, វិធីទូទាត់, ស្ថានភាព
- Download payment receipt

#### `my-orders.html`
- Orders/quotes status: ថ្ងៃ, ផលិតផល, ចំនួន, ស្ថានភាព
- Track order timeline

---

## លំដាប់ការអនុវត្ត (Execution Priority Order)

| លំដាប់ | Portal | ហេតុផល |
|---|---|---|
| 1️⃣ | **Super Admin** | Platform governance — highest authority level |
| 2️⃣ | **Manager** | Approval workflow + reports — daily business need |
| 3️⃣ | **Sales Staff** | Highest daily usage role |
| 4️⃣ | **Cashier (POS)** | Revenue-critical — must be fast & reliable |
| 5️⃣ | **Accountant** | Financial oversight |
| 6️⃣ | **Purchase Staff** | Procurement workflow |
| 7️⃣ | **Inventory Staff** | Stock control |
| 8️⃣ | **Supplier Portal** | External partner UX |
| 9️⃣ | **Customer Portal** | External customer self-service |
| 🔟 | **HR Staff** | Internal administration |
| 1️⃣1️⃣ | **Delivery Driver** | Field operations (mobile-first) |

---

## ចំណុចពិនិត្យគុណភាព (Quality Checklist)

### Design Standards (per GEMINI.md)
- [ ] ភាសាខ្មែរ 100% — គ្មានពាក្យអង់គ្លេសសូម្បីតែ 1
- [ ] លេខ English/Arabic numerals ប្រើជានិច្ច
- [ ] Sidebar brand container: `h-[72px] px-6` exact
- [ ] Content header: `h-[72px]` exact (pixel-perfect alignment)
- [ ] Kantumruy Pro font loaded on every page
- [ ] Scrollbars hidden globally via `custom.css`
- [ ] Layout `w-full` — ហាម `max-w-*`
- [ ] Custom dropdown — ហាម native `<select>`
- [ ] `showToast()` — ហាម `window.alert()`
- [ ] `showCustomConfirm()` — ហាម `window.confirm()`
- [ ] Table row actions use `⋮` dropdown only
- [ ] Back button: icon-only `w-10 h-10 rounded-xl` standard

### Security / RBAC UI
- [ ] Each portal sidebar shows ONLY allowed menu items
- [ ] Role badge visible in sidebar header
- [ ] Sidebar color is unique per role (visual identity)
- [ ] Cost/price columns hidden for Inventory Staff
- [ ] Transaction history locked to today for Cashier
- [ ] Supplier sees only their own orders/bills/payments
- [ ] Customer sees only their own invoices/payments
- [ ] Driver sees no prices — items + quantities + address only
- [ ] Manager has NO "Create" / "Edit" / "Delete" buttons anywhere

### Technical
- [ ] ECharts used for all charts (not Chart.js)
- [ ] Unified date range picker on all filter pages
- [ ] Print-ready `@media print` on document pages
- [ ] Favicon linked correctly per relative path depth

---

## ចំណាំចុងក្រោយ

> ប្រព័ន្ធ DIGITECHKH BMS នឹងក្លាយជាប្រព័ន្ធ All-in-One ស្រដៀងនឹងការ combine:
> - **Odoo** (ERP full modules)
> - **Dolibarr** (SME management)
> - **QuickBooks** (accounting & finance)
> - **Petree / similar retail** (POS + inventory)
>
> ដោយមានភាពងាយស្រួលប្រើ, ភាពសុវត្ថិភាព RBAC ពេញលេញ, និង UX ស្រស់ស្អាតកម្រិតសហគ្រាស។
