# 👑 DIGITECHKH BMS — ការសិក្សាស៊ីជម្រៅ: តួនាទី ស៊ុបភើរ អភិបាល (Super Admin)

> **ឯកសារ**: `role_superadmin.md`  
> **កំណែ**: 1.0  
> **កាលបរិច្ឆេទ**: 20 កញ្ញា 2026  
> **គោលបំណង**: ការយល់ 100% អំពីតួនាទី Super Admin មុនពេលចាប់ផ្តើម Prototype — រួមមានអត្តសញ្ញាណ, សិទ្ធិ, UI/UX, ការងារ, ស្ថាបត្យកម្ម, និងអនុសាសន៍ Architect

---

## តារាងមាតិកា (Table of Contents)

1. [អ្វីជា Super Admin?](#1-អ្វីជា-super-admin)
2. [ឋានានុក្រមក្នុងប្រព័ន្ធ](#2-ឋានានុក្រមក្នុងប្រព័ន្ធ)
3. [អ្វីដែល Super Admin ធ្វើបាន (Full Capability Map)](#3-អ្វីដែល-super-admin-ធ្វើបាន)
4. [ទំព័រ UI ទាំង 6 (Page-by-Page Blueprint)](#4-ទំព័រ-ui-ទាំង-6)
5. [ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)](#5-ម៉ាទ្រីសសិទ្ធិ)
6. [វដ្តការងារស្នូលទាំង 4 (Core Workflows)](#6-វដ្តការងារស្នូលទាំង-4)
7. [ទំនាក់ទំនងជាមួយតួនាទីផ្សេង (Role Interaction Map)](#7-ទំនាក់ទំនងជាមួយតួនាទីផ្សេង)
8. [ស្ថាបត្យកម្ម Data Scope (What Data Can See)](#8-ស្ថាបត្យកម្ម-data-scope)
9. [KPI និង Dashboard Widgets](#9-kpi-និង-dashboard-widgets)
10. [គំរូ Database Schema សម្រាប់ Super Admin](#10-គំរូ-database-schema)
11. [ការការពារសុវត្ថិភាព (Security Hardening)](#11-ការការពារសុវត្ថិភាព)
12. [អនុសាសន៍ Architect + Prototype Planning](#12-អនុសាសន៍-architect--prototype-planning)
13. [FAQ — ចម្លើយសំណួរទូទៅ](#13-faq)

---

## 1. អ្វីជា Super Admin?

### 1.1 និយមន័យ (Definition)

**Super Admin** (ស៊ុបភើរ អភិបាល) គឺជា **Root Authority** ខ្ពស់បំផុតក្នុងប្រព័ន្ធ DIGITECHKH BMS ។ គាត់/នាង **មិនមែនជាអ្នកប្រើប្រាស់ប្រចាំថ្ងៃ (Day-to-day User)** ដូចជា Admin ក្រុមហ៊ុន, Sales Staff ឬ Cashier ឡើយ — តែជា **អ្នកដំណើរការ Platform** (Platform Operator) ដែលជារបស់ DIGITECHKH Co., Ltd. ផ្ទាល់ (developer/owner of the SaaS platform)។

> 💡 **ការប្រៀបធៀប**: Super Admin ដូចជា **Amazon Web Services (AWS) Account Root User** — អ្នកដែលគ្រប់គ្រង Cloud Platform រួម ហើយ Admin/GM របស់ ក្រុមហ៊ុននីមួយៗ ដូចជា Customer AWS Account ម្នាក់ៗ ដែលបាន Onboard ចូលប្រើប្រព័ន្ធ។

### 1.2 ទំនាក់ទំនងជាមួយ Multi-Tenant Architecture

ប្រព័ន្ធ DIGITECHKH BMS ប្រើប្រាស់ **Multi-Tenant Architecture** ដែលមានន័យថា ក្រុមហ៊ុនអតិថិជន (Tenants) ច្រើននាកដំណើរការប្រព័ន្ធដូចគ្នា ប៉ុន្តែទិន្នន័យ **ដាច់ដោយឡែក 100%** ពីគ្នា:

```
Super Admin (Platform Level)
│
├── Tenant 1: ហាងទំនិញ ABC Co., Ltd.
│   ├── Admin (GM ហាង ABC)
│   ├── Sales Staff 3 នាក់
│   ├── Cashier 2 នាក់
│   └── ...
│
├── Tenant 2: ក្រុមហ៊ុន XYZ Import-Export
│   ├── Admin (GM XYZ)
│   ├── Procurement Staff 2 នាក់
│   └── ...
│
└── Tenant N: ...
```

**Super Admin** ឃើញ Tenant ទាំងអស់ ប៉ុន្តែ **Admin ក្រុមហ៊ុន A** ឃើញតែ Tenant A ប៉ុណ្ណោះ — ហើយ **Admin ក្រុមហ៊ុន B** ឃើញតែ Tenant B ។

### 1.3 Super Admin ជានរណា? (Who is this Person in Real Life?)

ក្នុងតំណាក់កាល Prototype/MVP ២ ស្ថានភាពសម្រាប់ Super Admin:

| ស្ថានភាព | Super Admin ជានរណា | ករណីប្រើប្រាស់ |
|---|---|---|
| **ករណី A** (SaaS) | Developer / Owner of DIGITECHKH | អតិថិជនច្រើននាក់ជាវប្រើប្រាស់ Platform |
| **ករណី B** (Custom Deployment) | IT Administrator ម្ចាស់ | ក្រុមហ៊ុនតែ 1 ។ Super Admin = System IT |

---

## 2. ឋានានុក្រមក្នុងប្រព័ន្ធ

```
┌─────────────────────────────────────┐
│        👑 SUPER ADMIN               │ ← Platform Owner (DIGITECHKH)
│   (Global / Multi-Tenant Scope)     │   Root Access — គ្មានដែនកំណត់
└───────────────┬─────────────────────┘
                │ Onboards / Manages
                ▼
┌─────────────────────────────────────┐
│    🏢 ADMIN / GM (Tenant Level)     │ ← ម្ចាស់ / អ្នកគ្រប់គ្រងក្រុមហ៊ុន
│   (Company-wide Scope Only)         │   Full permissions ក្នុង Tenant ខ្លួន
└───────────────┬─────────────────────┘
                │ Manages
        ┌───────┼───────────────┐
        ▼       ▼               ▼
   Sales    Warehouse      Accountant
   Staff      Staff         Staff...
```

**Super Admin VS Admin:**

| ចំណុច | Super Admin | Admin/GM |
|---|---|---|
| **ចំនួន Tenants ដែលមើលឃើញ** | ទាំងអស់ (N Tenants) | 1 Tenant ប៉ុណ្ណោះ |
| **កំណត់ Subscription/Quota** | ✅ ចាស | ❌ ទេ |
| **Suspend/Delete Tenant** | ✅ ចាស | ❌ ទេ |
| **Global Audit Log** | ✅ ទាំងអស់ | ❌ Tenant ខ្លួន |
| **System Config** | ✅ Platform Level | ⚠️ Company Level |
| **ចូលមើលប្រតិបត្តិការ (Invoice/PO)** | 👁️ Read-Only (Audit) | ✅ Full CRUD |
| **ធ្វើ Business Transaction** | ❌ ហាម | ✅ ចាស |

> ⚠️ **ចំណុចសំខាន់**: Super Admin **ហាមដាច់ខាតធ្វើ Business Transactions** (បង្កើត Invoice, PO, Payroll ជាដើម) ។ Super Admin ធ្វើការ **Platform Operations Only**។ នេះជា Design Principle ដ៏សំខាន់!

---

## 3. អ្វីដែល Super Admin ធ្វើបាន (Full Capability Map)

### 3.1 Capability Matrix ពេញលេញ

```
SUPER ADMIN CAPABILITIES
│
├── 🏢 COMPANY MANAGEMENT
│   ├── [CREATE] ចុះឈ្មោះ Tenant / ក្រុមហ៊ុនថ្មី (Onboarding)
│   ├── [READ]   មើលបញ្ជីក្រុមហ៊ុនទាំងអស់
│   ├── [UPDATE] កែប្រែព័ត៌មានក្រុមហ៊ុន (ឈ្មោះ, ទំនាក់ទំនង, Logo)
│   ├── [UPDATE] Activate / Deactivate Tenant
│   └── [DELETE] លុប Tenant (Soft Delete + Archive Data)
│
├── 📦 SUBSCRIPTION & PLAN MANAGEMENT
│   ├── [READ]   មើលបញ្ជី Subscription Plans ទាំងអស់
│   ├── [UPDATE] ផ្លាស់ប្តូរ Plan របស់ Tenant (Upgrade/Downgrade)
│   ├── [UPDATE] កំណត់ User Quota (Max Users per Tenant)
│   ├── [UPDATE] កំណត់ Feature Flags (Enable/Disable features per Tenant)
│   ├── [UPDATE] ចូរសុពលភាព Subscription (Renewal Date, Grace Period)
│   └── [UPDATE] ផ្ញើ Renewal Reminder ស្វ័យប្រវត្តិ
│
├── 📋 AUDIT LOG & MONITORING
│   ├── [READ]   Global Audit Log (What, Who, When, IP — ទ្រើស Tenant ណាក៏បាន)
│   ├── [READ]   System Activity Dashboard (Login History, Failed Attempts)
│   ├── [READ]   Error Log & System Health Metrics
│   └── [EXPORT] ទាញ Audit Log ជា CSV / PDF
│
├── ⚙️ SYSTEM CONFIGURATION
│   ├── [UPDATE] Global System Settings (Maintenance Mode, Version Info)
│   ├── [UPDATE] Default VAT Rate, Default Currency
│   ├── [UPDATE] Email/Telegram Notification Templates
│   └── [UPDATE] Backup Schedule Configuration
│
└── 🔐 SECURITY OVERSIGHT
    ├── [READ]   មើល Failed Login Attempts (All Tenants)
    ├── [UPDATE] Force Reset Password (Any User, Any Tenant)
    ├── [UPDATE] Lock / Unlock User Account
    └── [READ]   Active Sessions Monitor
```

### 3.2 អ្វីដែល Super Admin **ធ្វើ**បាន (Green Light ✅)

| # | សកម្មភាព | ហេតុ |
|---|---|---|
| 1 | Onboard ក្រុមហ៊ុនថ្មីចូលប្រព័ន្ធ | Platform Business |
| 2 | ជ្រើសរើស Subscription Plan | Revenue Management |
| 3 | Suspend Tenant ដែលមិនបង់ | Enforcement |
| 4 | មើល Global Audit Log | Security & Compliance |
| 5 | Reset Password User ណាមួយ | Emergency Support |
| 6 | Lock User ណាមួយ | Security Incident Response |
| 7 | Export Audit Data ផ្ញើ Auditor | Compliance Report |
| 8 | Enable/Disable Feature per Tenant | Subscription Control |
| 9 | Monitor System Health | Platform Operations |
| 10 | Configure Backup Schedule | Data Safety |

### 3.3 អ្វីដែល Super Admin **ហាម**ធ្វើ (Red Zone ❌)

| # | ហាម | ហេតុ |
|---|---|---|
| 1 | ❌ បង្កើត Invoice / Quote | Super Admin ≠ Salesperson |
| 2 | ❌ ធ្វើ Stock Adjustment | Super Admin ≠ Warehouse Staff |
| 3 | ❌ បង្កើត Payroll | Super Admin ≠ HR |
| 4 | ❌ ចូល POS Dashboard | Super Admin ≠ Cashier |
| 5 | ❌ Edit Invoice/PO ក្រុមហ៊ុន | Avoid Conflict of Interest |
| 6 | ❌ Delete Business Data | Data Protection Policy |
| 7 | ❌ Access Financial Reports | Tenant Privacy |
| 8 | ❌ ចូល Customer Data ដោយផ្ទាល់ | GDPR / Privacy |

---

## 4. ទំព័រ UI ទាំង 6 (Page-by-Page Blueprint)

ក្នុង Prototype បច្ចុប្បន្ន Super Admin Portal (path: `8-super-admin/`) មាន **6 ទំព័រ**:

```
8-super-admin/
├── dashboard.html
├── 1-companies/
│   ├── companies.html
│   ├── create-company.html
│   ├── edit-company.html          ← [+ បន្ថែម] ទម្រង់កែប្រែព័ត៌មានក្រុមហ៊ុន
│   └── view-company.html
├── 2-subscriptions/
│   └── subscriptions.html
└── 4-audit-logs/
    └── audit-logs.html
```

> **ចំណាំ**: ថតលេខ `3` (settings per tenant) ត្រូវបានបម្រុងទុកសម្រាប់ Phase 2 — `3-system-settings/`


### 4.1 `dashboard.html` — ផ្ទាំងគ្រប់គ្រងសកល (Global Overview)

**គោលបំណង**: ទំព័រដំបូងដែល Super Admin ឃើញ — ផ្ទាំង KPI ចម្រុះ ដែលបង្ហាញ **ស្ថានភាពសុខភាពប្រព័ន្ធទូទៅ**។

**ខ្លឹមសារដែលត្រូវបង្ហាញ**:

| Section | Widget | ទិន្នន័យ |
|---|---|---|
| **KPI Row 1** | 📊 Tenants សកម្ម | ចំនួនក្រុមហ៊ុនកំពុងប្រើ |
| **KPI Row 1** | 💰 MRR (Monthly Recurring Revenue) | ចំណូលប្រចាំខែ |
| **KPI Row 1** | ⚠️ ជាវហួសកាល | ចំនួន Tenants ហួស Renewal Date |
| **KPI Row 1** | 🔴 Tenants ផ្អាកដំណើរការ | Suspended Count |
| **Table** | Tenants ចុងក្រោយ | 10 ក្រុមហ៊ុនចុងក្រោយ + Status Badge |
| **Chart** | ក្រាហ្វ Subscriptions ប្រចាំខែ | Growth Chart |
| **Alert Box** | Renewals ក្នុង 7 ថ្ងៃ | List of Expiring Soon |

**ជម្រើស Action Buttons**:
- ប៊ូតុង «+ ចុះឈ្មោះក្រុមហ៊ុនថ្មី» → `create-company.html`
- ប៊ូតុង «មើល Audit Log» → `audit-logs.html`

---

### 4.2 `companies.html` — បញ្ជីក្រុមហ៊ុន (Tenant List)

**គោលបំណង**: ទំព័រសម្រាប់ Super Admin មើល **ក្រុមហ៊ុន (Tenants) ទាំងអស់** ដែលបានចុះឈ្មោះក្នុងប្រព័ន្ធ ។

**ជួរឈរតារាង (Table Columns)**:

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| លេខ | Auto | 1, 2, 3 |
| ឈ្មោះក្រុមហ៊ុន | Text | ABC Co., Ltd. |
| TIN (ស.ស.អ) | Text | K001-9999999 |
| Plan | Badge | Starter / Pro / Enterprise |
| ចំនួន Users | Number | 5 / 10 |
| ផុតកំណត់ | Date | 31 ធ្នូ 2026 |
| ស្ថានភាព | Badge | 🟢 សកម្ម / 🟡 ជិតផុត / 🔴 ផ្អាក |
| សកម្មភាព | ⋮ Menu | មើល, ផ្លាស់ Plan, Suspend, Reset Admin Password |

**Filters**:
- ស្វែងរកតាមឈ្មោះ
- Filter តាម Status (All / Active / Suspended / Expired)
- Filter តាម Plan Type
- Date Range Picker ជ្រើសរើសតាមកាលបរិច្ឆេទចុះឈ្មោះ

**Action Dropdown (⋮)**:
1. 👁️ **មើលលម្អិត** → `view-company.html?id=...`
2. 📦 **ផ្លាស់ Plan** → Inline Plan Change (Custom Dropdown)
3. 🔴 **ផ្អាកដំណើរការ** → `showCustomConfirm()` សួរបញ្ជាក់
4. 🔑 **Reset Password Admin** → ផ្ញើ Reset Email ស្វ័យប្រវត្តិ

---

### 4.3 `create-company.html` — ចុះឈ្មោះក្រុមហ៊ុនថ្មី

**គោលបំណង**: Form សម្រាប់ Super Admin Onboard ក្រុមហ៊ុន (Tenant) ថ្មីចូលប្រព័ន្ធ ។

**ទ្រង់ទ្រាយ Form (2 Column Enterprise Layout)**:

**Section 1 — ព័ត៌មានក្រុមហ៊ុន**

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ឈ្មោះក្រុមហ៊ុន (ខ្មែរ) | Text | ✅ | ដូចក្នុង វិញ្ញាបនបត្រចុះបញ្ជីក្រុមហ៊ុន |
| ឈ្មោះក្រុមហ៊ុន (អង់គ្លេស) | Text | ✅ | |
| លេខ TIN ពន្ធដារ | Text | ✅ | Format: 9-10 ខ្ទង់ (ឧ. 1001234567) ស្រប GDT |
| ទំនាក់ទំនងអ្នកទទួលខុសត្រូវ | Text | ✅ | ឈ្មោះ Admin ម្ចាស់ |
| Email Admin | Email | ✅ | Login email ដំបូង |
| Phone | Text | ✅ | |
| ទីតាំង / អាសយដ្ឋាន | Textarea | ⚠️ | |
| Logo ក្រុមហ៊ុន | File Upload | ⚠️ | PNG / JPG ≤ 2MB |

**Section 2 — ការកំណត់ Subscription**

| Field | ប្រភេទ | Required | ជម្រើស |
|---|---|:---:|---|
| Subscription Plan | Custom Dropdown | ✅ | Starter / Pro / Enterprise |
| ចំនួន User អតិបរមា | Number | ✅ | 5 / 10 / 50 / ∞ |
| រូបិយប័ណ្ណគោល | Custom Dropdown | ✅ | USD / KHR |
| ថ្ងៃចាប់ផ្តើមជាវ | Date Picker | ✅ | Default: Today |
| រយៈពេលជាវ | Custom Dropdown | ✅ | 1 ខែ / 3 ខែ / 6 ខែ / 12 ខែ |
| ថ្ងៃផុតកំណត់ (Auto) | Display Only | — | Calculate auto |
| ចំណាំ | Textarea | ⚠️ | Internal Notes |

**Section 3 — ការកំណត់ Feature**

| Feature | Toggle | Default |
|---|---|---|
| ម៉ូឌុល POS (Touch Screen) | ✅/❌ | ON |
| ម៉ូឌុល e-Commerce Showroom | ✅/❌ | OFF |
| ម៉ូឌុល HR & Payroll | ✅/❌ | ON |
| ការជូនដំណឹងតាម Telegram | ✅/❌ | ON |
| Multi-Warehouse | ✅/❌ | OFF |
| Lot/Expiry Tracking | ✅/❌ | OFF |

**Buttons**:
- «ចុះឈ្មោះ» → Create Tenant + Send Welcome Email to Admin
- «បោះបង់» → Back to `companies.html`

---

### 4.4 `view-company.html` — ព័ត៌មានលម្អិតក្រុមហ៊ុន

**គោលបំណង**: ទំព័រ Read-Only (+ Limited Edit) ទំព័របង្ហាញពេញ Profile ក្រុមហ៊ុន មួយ ។

**ប្លង់ (3 Sections Layout)**:

**Header Section**: Logo + ឈ្មោះ + TIN + Status Badge + Action Buttons

**Action Buttons** (ក្នុង Header):
- 🟢/🔴 «Activate / Suspend»
- 🔑 «Reset Admin Password»
- 📦 «ផ្លាស់ Plan»
- 🖨️ «Print Profile»

**Tab 1 — ព័ត៌មានទូទៅ**:
- ព័ត៌មានក្រុមហ៊ុន (អាចដាក់ Edit inline)
- Subscription Details (Plan, Dates, Quota)
- Feature Flags ដែលបានបើក

**Tab 2 — Audit / Usage Stats**:
- ចំនួន Users សកម្ម vs ចំនួន Quota
- ចំនួន Login ក្នុង 30 ថ្ងៃ
- Last Login Date/Time
- ចំនួន Invoices បង្កើតក្នុងខែ
- Data Storage Used

**Tab 3 — Subscription History**:
- ប្រវត្តិ Plan ផ្លាស់ប្តូរ (table)
- ប្រវត្តិ Renewal (table)
- Timeline Events

---

### 4.5 `subscriptions.html` — គ្រប់គ្រង Plans

**គោលបំណង**: ទំព័រ Overview ដ៏ Comprehensive ខ្ញុំណែនាំ **2 Section**:

**Section A — Plan Definitions** (Super Admin កំណត់ Plans):

| Plan | Users | Features | Price/Month |
|---|---|---|---|
| **Starter** | 5 | Sales + POS + Stock only | $29 |
| **Pro** | 15 | All features except HR | $69 |
| **Enterprise** | Unlimited | All features + Priority Support | $199 |

**Section B — Active Subscriptions Table**:

| Column | Description |
|---|---|
| ក្រុមហ៊ុន | Tenant Name |
| Plan | Badge |
| ផ្តើម | Start Date |
| ផុតកំណត់ | Expiry + Status (Countdown) |
| ចំណូល/ខែ | Revenue |
| Actions | Renew / Upgrade / Downgrade |

**KPI Row** (ខ្ញុំណែនាំ):
- 💵 MRR Total
- 📈 New This Month
- ⚠️ Expiring in 7 Days
- 💔 Churned This Month

---

### 4.6 `audit-logs.html` — Global Audit Log

**គោលបំណង**: ទំព័រ **Read-Only** ដ៏សំខាន់ — Super Admin មើលចូលទៅ Activity ផ្ទៃក្នុងប្រព័ន្ធទាំងអស់ ។

**ជួរឈរ Audit Table**:

| ជួរឈរ | ឧទាហរណ៍ |
|---|---|
| ពេលវេលា | 20 កញ្ញា 2026, 10:45:32 |
| ក្រុមហ៊ុន | ABC Co., Ltd. |
| User | ហេង សុខ (Sales Staff) |
| IP Address | 192.168.1.10 |
| Action | DELETE_INVOICE |
| Entity | Invoice #INV-2026-0045 |
| លទ្ធផល | SUCCESS / FAILED |
| ព័ត៌មានបន្ថែម | Reason: Customer cancel |

**Filter Options** (Critical for Audit):
- ជ្រើស Tenant
- ជ្រើស Action Type (LOGIN, CREATE, UPDATE, DELETE, EXPORT)
- ជ្រើស User
- Date Range Picker
- IP Address filter

**Important Features**:
- ❌ **ហាម Edit / Delete** Audit Logs (Immutable)
- ✅ **Export ជា CSV / PDF**
- ✅ **Highlight** Failed Attempts (Red row)
- ✅ **Alert** ពេល Failed Login > 5 ដង

---

## 5. ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)

### 5.1 Full CRUD Matrix

| Module / Feature | CREATE | READ | UPDATE | DELETE |
|---|:---:|:---:|:---:|:---:|
| **Tenant Profile** | ✅ | ✅ | ✅ | ⚠️ Soft-Delete |
| **Subscription Plan** | ✅ (Config) | ✅ | ✅ | ✅ |
| **User Accounts** | ⚠️ Admin Only (Onboard) | ✅ (All) | ✅ (Force Reset PW / Lock) | ❌ |
| **Audit Logs** | — | ✅ | ❌ Immutable | ❌ Immutable |
| **Business Invoices** | ❌ | 👁️ Audit Only | ❌ | ❌ |
| **Business Inventory** | ❌ | 👁️ Audit Only | ❌ | ❌ |
| **Financial Reports** | ❌ | 👁️ Audit Only | ❌ | ❌ |
| **System Settings** | — | ✅ | ✅ | — |
| **Feature Flags** | — | ✅ | ✅ | — |
| **Email Templates** | ✅ | ✅ | ✅ | ✅ |

> **⚠️ Legend**: ✅ Full | ⚠️ Limited/Conditional | 👁️ Read-Only (Audit Stats Only) | ❌ Not Allowed  
> **ចំណាំ `⚠️ Admin Only (Onboard)`**: Super Admin Create Initial Admin Account ពេល Onboard ក្រុមហ៊ុនថ្មីតែប៉ុណ្ណោះ — Admin Account ផ្សេងៗ User ទូទៅ ចាំ Admin ក្រុមហ៊ុន Create ខ្លួនឯង


### 5.2 Data Scope (ឃើញអ្វី?)

```
Super Admin CAN SEE:
✅ Dashboard stats: Total Tenants, MRR, Expiring Subscriptions
✅ Company list (all tenants) with basic info
✅ Subscription details per tenant
✅ Global Audit Log (all actions, all tenants)
✅ User list per tenant (names, roles, last login)
✅ System-level error logs and health metrics

Super Admin CANNOT SEE (Tenant Data Privacy):
❌ Actual Invoice amounts and customer names
❌ Inventory quantities and cost prices
❌ Payroll figures and employee salaries
❌ Financial P&L reports
❌ Customer contact information
❌ Supplier pricing contracts
```

---

## 6. វដ្តការងារស្នូលទាំង 4 (Core Workflows)

### Workflow 1: Onboard ក្រុមហ៊ុនថ្មី (New Tenant Onboarding)

```
START
  │
  ▼
Super Admin ទទួលបន្ទុការ (Sign up form / Phone call)
  │
  ▼
ចូល dashboard.html → ចុច «+ ចុះឈ្មោះក្រុមហ៊ុនថ្មី»
  │
  ▼
បំពេញ create-company.html (Company Info + Plan + Features)
  │
  ▼
ចុច «ចុះឈ្មោះ»
  │
  ├── ប្រព័ន្ធ Create Tenant in DB (Tenant ID, Isolated Schema)
  ├── ប្រព័ន្ធ Create Admin Account (Email + Temp Password)
  ├── ប្រព័ន្ធ ផ្ញើ Welcome Email (Login URL + Temp PW)
  └── ប្រព័ន្ធ Set Subscription Expiry Date
  │
  ▼
Super Admin ឃើញ showToast("ក្រុមហ៊ុនថ្មីត្រូវបានចុះឈ្មោះជោគជ័យ")
  │
  ▼
Admin ក្រុមហ៊ុន ទទួល Email → Login ដំបូង → Change Password
  │
  ▼
END
```

---

### Workflow 2: Renew / Upgrade Subscription

```
START
  │
  ▼
ប្រព័ន្ធ Auto-Alert ពេលហួស 7 ថ្ងៃ (Dashboard Widget + Telegram)
  │
  ▼
Super Admin ចូល subscriptions.html → ជ្រើស Tenant
  │
  ▼
ចុច «ផ្លាស់ Plan» ឬ «Renew»
  │
  ├── ជ្រើស Plan ថ្មី (Custom Dropdown)
  ├── ជ្រើស Duration (1M / 3M / 6M / 12M)
  └── បញ្ចូល ចំណាំ (Internal Note)
  │
  ▼
ចុច «ធ្វើបច្ចុប្បន្នភាព»
  │
  ├── ប្រព័ន្ធ Update Subscription Expiry
  ├── ប្រព័ន្ធ Update Feature Flags (ប្រសិនបើ Plan ផ្លាស់ប្តូរ)
  └── ប្រព័ន្ធ Log Action in Audit Log
  │
  ▼
END
```

---

### Workflow 3: Suspend Tenant (Due to Non-Payment)

```
START
  │
  ▼
ថ្ងៃ Subscription ផ្តាច់ → Grace Period (7 ថ្ងៃ) ចាប់ផ្តើម
  │
  ▼
ប្រព័ន្ធ Auto-Alert ផ្ញើ Email + Telegram ជូន Super Admin
  │
  ▼
Super Admin ចូល view-company.html → ចុច «ផ្អាកដំណើរការ»
  │
  ▼
showCustomConfirm("តើអ្នកចង់ផ្អាកក្រុមហ៊ុន [ABC] ដែរទេ?")
  │
  ├── YES →
  │   ├── ប្រព័ន្ធ Set Tenant Status = SUSPENDED
  │   ├── Users ទាំងអស់ Login ឃើញ "Account Suspended" Page
  │   ├── API Calls ត្រូវបាន Block ដោយ Middleware
  │   └── Audit Log: Suspended by Super Admin + Timestamp
  │
  └── NO → Cancel
  │
  ▼
END
```

---

### Workflow 4: Security Incident Response

```
START
  │
  ▼
ប្រព័ន្ធ Detect Failed Login > 5 ដង ក្នុង 10 នាទី
  │
  ▼
Auto-Alert → Telegram ផ្ញើ: "⚠️ Failed login 6 times - [IP] - [User]"
  │
  ▼
Super Admin ចូល audit-logs.html → Filter by IP / User
  │
  ▼
Super Admin ពិនិត្យ Pattern
  │
  ├── Normal (ភ្លេច Password) →
  │   └── Force Reset Password → ផ្ញើ Reset Email ជូន User
  │
  └── Suspicious (ប្រហែល Brute Force Attack) →
      ├── Lock Account
      ├── Block IP (Server-level)
      └── Notify Tenant Admin
  │
  ▼
END
```

---

## 7. ទំនាក់ទំនងជាមួយតួនាទីផ្សេង (Role Interaction Map)

```
Super Admin
│
├── [CREATES] → Admin/GM Account (per Tenant)
│   └── Admin/GM [CREATES] → All other roles (Sales, Cashier, etc.)
│
├── [MONITORS] → All Tenants via Global Dashboard
│
├── [RECEIVES ALERTS FROM] → System (Automated)
│   ├── Subscription Expiry alerts
│   ├── Failed Login alerts
│   └── System Error alerts
│
├── [CAN FORCE-RESET] → Any User (Any Tenant)
│
└── [READS] → All Audit Logs
    └── Includes: What Admin did, What Sales Staff did, etc.
```

**Super Admin ទំនាក់ទំនង** (ថ្ងៃ to ថ្ងៃ):

| ទំនាក់ទំនងជាមួយ | ចំណុចប្រទាក់ |
|---|---|
| Admin/GM ក្រុមហ៊ុន | Onboard, Plan Change, Support |
| System Monitoring | Auto Alerts, Error Logs |
| Audit Logs | Cross-Tenant Security Review |
| DIGITECHKH Internal Team | Feature Deployment, Bug Fix |

---

## 8. ស្ថាបត្យកម្ម Data Scope (What Data Can See)

### 8.1 Database Isolation Architecture

```sql
-- Multi-Tenant Isolation Design
-- ការដាច់ Tenant Data ដោយ tenant_id

-- tenants table (Super Admin can access)
CREATE TABLE tenants (
    id          UUID PRIMARY KEY,
    name_kh     VARCHAR(255),
    name_en     VARCHAR(255),
    tin_number  VARCHAR(50),
    status      ENUM('active','suspended','expired'),
    plan        ENUM('starter','pro','enterprise'),
    quota_users INTEGER,
    created_at  TIMESTAMP,
    expires_at  TIMESTAMP
);

-- ក្នុង Business Tables ទាំងអស់ មាន tenant_id
-- Super Admin ហ្គ Query បាន ប៉ុន្តែ BY DESIGN ក្នុង API
-- Super Admin endpoint ឃើញ COUNT stats ប៉ុណ្ណោះ មិនមែន raw data

-- Correct API response for Super Admin's company view:
{
  "tenant_id": "abc-123",
  "name_kh": "ហាង ABC",
  "stats": {
    "total_users": 8,
    "invoices_this_month": 150,
    "storage_used_mb": 230
  }
  -- No: customer_names, invoice_amounts, cost_prices
}
```

### 8.2 API Authorization Rules

```
Super Admin JWT Token Contains:
{
  "role": "SUPER_ADMIN",
  "tenant_id": null,  ← Global (not locked to any tenant)
  "scope": ["platform:*"]
}

Admin JWT Token Contains:
{
  "role": "ADMIN",
  "tenant_id": "abc-123",  ← Locked to Tenant A
  "scope": ["company:*"]
}

Middleware Check:
if (user.role === 'SUPER_ADMIN') {
  // Allow platform endpoints: /api/superadmin/*
  // Block business endpoints: /api/invoices, /api/stock, etc.
}
```

---

## 9. KPI និង Dashboard Widgets

ខ្ញុំណែនាំ Super Admin Dashboard ត្រូវបង្ហាញ **KPI ចំនួន 8** ទាំងនេះ:

| # | Widget | ការគណនា | ការ Update |
|---|---|---|---|
| 1 | 🏢 Tenants សកម្ម | COUNT(tenants WHERE status='active') | Real-time |
| 2 | 💵 MRR | SUM(plan_price) WHERE active | Monthly |
| 3 | ⚠️ ជិតផុតកំណត់ | COUNT WHERE expires_at ≤ now+7d | Daily |
| 4 | 🔴 ផ្អាក | COUNT WHERE status='suspended' | Real-time |
| 5 | 📈 Tenants ថ្មីខែនេះ | COUNT WHERE created_at >= month_start | Monthly |
| 6 | 💔 Churned | COUNT WHERE suspended_this_month | Monthly |
| 7 | 👥 Total Users | SUM(active_users) across all tenants | Daily |
| 8 | 🖥️ System Uptime | Server health metric | Real-time |

---

## 10. គំរូ Database Schema

```sql
-- Core Tables for Super Admin Scope

-- 1. Tenants (ក្រុមហ៊ុន)
CREATE TABLE tenants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_kh         VARCHAR(255) NOT NULL,
    name_en         VARCHAR(255) NOT NULL,
    tin_number      VARCHAR(50),
    logo_url        TEXT,
    contact_name    VARCHAR(255),
    contact_email   VARCHAR(255),
    contact_phone   VARCHAR(50),
    address         TEXT,
    status          VARCHAR(20) DEFAULT 'active',
        -- active | suspended | expired | trial
    plan            VARCHAR(20) DEFAULT 'starter',
        -- starter | pro | enterprise
    quota_users     INTEGER DEFAULT 5,
    base_currency   VARCHAR(3) DEFAULT 'USD',
    features        JSONB DEFAULT '{}',
        -- {"pos": true, "hr": false, "showroom": false}
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ,
    suspended_at    TIMESTAMPTZ,
    suspended_by    UUID REFERENCES super_admins(id),
    notes           TEXT
);

-- 2. Subscription History
CREATE TABLE subscription_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID REFERENCES tenants(id),
    changed_by      UUID,   -- super_admin id
    old_plan        VARCHAR(20),
    new_plan        VARCHAR(20),
    old_expires_at  TIMESTAMPTZ,
    new_expires_at  TIMESTAMPTZ,
    reason          TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Global Audit Log (Immutable)
CREATE TABLE global_audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    tenant_id       UUID REFERENCES tenants(id),
    user_id         UUID,
    user_name       VARCHAR(255),
    user_role       VARCHAR(50),
    ip_address      INET,
    action          VARCHAR(100),
        -- LOGIN, LOGOUT, CREATE_INVOICE, DELETE_USER, etc.
    entity_type     VARCHAR(50),
        -- Invoice, User, Tenant, StockItem
    entity_id       VARCHAR(255),
    result          VARCHAR(10) DEFAULT 'SUCCESS',
        -- SUCCESS | FAILED
    details         JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
-- NOTE: NO UPDATE, NO DELETE triggers on this table!

-- 4. Super Admins
CREATE TABLE super_admins (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255),
    email           VARCHAR(255) UNIQUE,
    password_hash   TEXT,
    last_login_at   TIMESTAMPTZ,
    is_active       BOOLEAN DEFAULT TRUE
);
```

---

## 11. ការការពារសុវត្ថិភាព (Security Hardening)

### 11.1 Authentication Requirements

| ស្តង់ដារ | Description |
|---|---|
| **MFA Mandatory** | Super Admin **ត្រូវ** Enable 2FA (Google Authenticator / Telegram OTP) |
| **Strong Password** | ≥ 16 characters, uppercase + lowercase + number + symbol |
| **Session Timeout** | Auto logout ក្រោយ 30 នាទី inactive |
| **IP Whitelist** | ❗ ណែនាំ — Lock Super Admin login ចំពោះ IP ចំនួនតែ 2-3 ចំណុចប្រទាក់ |
| **Login Audit** | គ្រប់ Login/Logout ត្រូវ Log ជា Audit Entry |

### 11.2 Authorization Rules

```
Rule 1: Super Admin API endpoints (/api/superadmin/*)
  → Only accessible with role=SUPER_ADMIN token
  → All other roles receive 403 Forbidden

Rule 2: Business API endpoints (/api/invoices, /api/stock, etc.)
  → Super Admin role receives 403 Forbidden (even if they try)
  → Tenant-scoped roles only

Rule 3: Audit Log endpoints
  → WRITE: System-only (automated) — No human can write
  → READ: Super Admin only for global, Admin for own tenant
  → DELETE: NEVER ALLOWED (DB-level trigger)
```

### 11.3 Data Isolation (Tenant Separation)

```
Every business table has tenant_id:

invoices    → tenant_id FK → tenants.id
stock_items → tenant_id FK → tenants.id
employees   → tenant_id FK → tenants.id

API Middleware (for Admin and below):
WHERE tenant_id = current_user.tenant_id

Super Admin queries (for stats only):
GROUP BY tenant_id → Aggregate only
NOT raw business data
```

---

## 12. អនុសាសន៍ Architect + Prototype Planning

### 12.1 ចំណុចខ្ញុំណែនាំ (My Recommendations)

#### ✅ ណែនាំ 1: Super Admin ≠ Business User — Enforce ចំពោះ Code Level

ហាមដាច់ខាតការ Share Business Feature ជាមួយ Super Admin ។ ក្នុង Route Guard:

```javascript
// Good:
const SUPERADMIN_ALLOWED_ROUTES = [
  '/superadmin/dashboard',
  '/superadmin/companies',
  '/superadmin/audit-logs',
  // ...
];

// If Super Admin tries to access /invoices → Redirect to /unauthorized
```

#### ✅ ណែនាំ 2: Tenant Status Machine

```
trial → active → suspended → expired → archived
  │         │         │
  └→ active  └→ active  └→ active (Reactivate)
```

ប្រើ Enum ជា DB Column មិនមែន Boolean `is_active` ។

#### ✅ ណែនាំ 3: Soft Delete Tenant (ហាម Hard Delete)

ពេល Tenant «ត្រូវបានលុប» — គ្មានការ DELETE ជា Database ។ ជំនួសដោយ:
```sql
UPDATE tenants SET status='archived', archived_at=NOW() WHERE id=...
```
Data ត្រូវ Retain ≥ 7 ឆ្នាំ (Cambodian accounting law requirement)

#### ✅ ណែនាំ 4: Telegram Alert for Critical Events

Super Admin Portal គួរ Auto-Alert ដោយ Telegram Bot នៅពេល:
- Tenant Subscription ផ្តាច់ (T-7 days, T-3 days, T-0)
- Login Failed > 5 ដងលើ User ណាមួយ
- System Error (500 errors > threshold)
- Storage Usage > 80%

#### ✅ ណែនាំ 5: Subscription Plans — កំណត់ Feature Flags យ៉ាងប្រុងប្រយ័ត្ន

```json
// plan_config.json
{
  "starter": {
    "max_users": 5,
    "max_invoices_per_month": 200,
    "features": {
      "pos": true,
      "sales": true,
      "stock_basic": true,
      "hr": false,
      "showroom": false,
      "multi_warehouse": false,
      "api_access": false
    }
  },
  "pro": {
    "max_users": 15,
    "max_invoices_per_month": 1000,
    "features": {
      "pos": true,
      "sales": true,
      "stock_advanced": true,
      "hr": true,
      "showroom": true,
      "multi_warehouse": false,
      "api_access": false
    }
  },
  "enterprise": {
    "max_users": -1,
    "max_invoices_per_month": -1,
    "features": { "all": true }
  }
}
```

#### ✅ ណែនាំ 6: Impersonation Feature (Advanced — Phase 2)

**Feature ខ្ញុំណែនាំ** (ដាក់ Phase 2): Super Admin អាច «Impersonate» (ក្លែងខ្លួនជា Admin ក្រុមហ៊ុន) ដើម្បី Troubleshoot បញ្ហា — ប៉ុន្តែ:
- Actions ក្នុង Impersonation mode ត្រូវ **Log ភ្លាម** "Action by SuperAdmin [Name] impersonating [TenantAdmin]"
- Impersonation Session ផ្តាច់ស្វ័យប្រវត្តិ ក្រោយ 15 នាទី
- Impersonation Actions ហាម DELETE/UPDATE Business Data

---

### 12.2 ផែនការ Prototype Pages (Prototype Checklist)

| # | Page | Priority | Complexity | Status |
|---|---|:---:|:---:|:---:|
| 1 | `dashboard.html` | 🔴 HIGH | Medium | ⬜ |
| 2 | `companies.html` | 🔴 HIGH | Medium | ⬜ |
| 3 | `create-company.html` | 🔴 HIGH | High | ⬜ |
| 4 | `view-company.html` | 🟡 MED | Medium | ⬜ |
| 5 | `subscriptions.html` | 🟡 MED | Medium | ⬜ |
| 6 | `audit-logs.html` | 🟡 MED | Low-Medium | ⬜ |
| 7 | `edit-company.html` | 🟢 LOW | Low | ⬜ |
| ➕ | `system-settings.html` | 🟢 LOW | Low | ⬜ (Future) |

**ណែនាំ: ចាប់ផ្តើមពី** → `companies.html` ដំបូង (Core feature) → `create-company.html` → `dashboard.html`

---

### 12.3 ការ Validate Prototype (Before Moving to Next Role)

Super Admin Prototype ត្រូវ Pass Checklist ទាំងនេះ:

- [ ] **Sidebar** មាន Logo + «DIGITECHKH» + Menu (Dashboard, ក្រុមហ៊ុន, ជាវ, Audit Log)
- [ ] **Header** `h-[72px]` ស្មើ Sidebar Header ពិតប្រាកដ
- [ ] **companies.html** — Table, Filter, ⋮ Dropdown Action
- [ ] **create-company.html** — Form 3 Sections, Custom Dropdowns (ហាម native `<select>`)
- [ ] **edit-company.html** — Pre-filled Form ដូច create ប៉ុន្តែ Load ទិន្នន័យ Tenant មុន
- [ ] **view-company.html** — Tabs (ព័ត៌មានទូទៅ, Usage Stats, Subscription History)
- [ ] **Status Badge** — 3 ពណ៌ (🟢 សកម្ម / 🟡 ជិតផុត / 🔴 ផ្អាក)
- [ ] **showToast()** — ជំនួស `alert()`
- [ ] **showCustomConfirm()** — ជំនួស `confirm()` ពេល Suspend Tenant
- [ ] **ទំព័រ View** — Full Detail Page (ហាម Modal)
- [ ] **ប៊ូតុងត្រឡប់ក្រោយ** — `w-10 h-10 rounded-xl` icon-only
- [ ] **ភាសាខ្មែរ 100%** — label, placeholder, toast, table header
- [ ] **លេខអង់គ្លេស 0-9** — All numbers

---

## 13. FAQ

**Q: Super Admin ហ្គចូល Invoice របស់ Tenant A បានទេ?**  
A: **ទេ**ក្នុងការ Design ស្អាត — Super Admin API Endpoints ត្រូវ Block ចំពោះ Business Data endpoints ។ ប្រសិនបើ Super Admin ចាំបាច់ Troubleshoot Invoice មានបញ្ហា គួរ Impersonate Admin ហើយ Log ជានិច្ច ។

**Q: Super Admin ម្នាក់ ឬ ច្រើននាក់?**  
A: Design-wise Super Admin Account **ចំនួននីមួយៗ** ត្រូវបង្កើត ។ DIGITECHKH Internal Team Member ម្នាក់ = Super Admin Account ម្នាក់ — ហាម Share Account!

**Q: Super Admin Dashboard ហ្គ ប្រើ Date Range Picker ដូច Invoice ទេ?**  
A: **ចាស** — ស្តង់ដារ GEMINI.md Rule 3 ត្រូវ Apply ។ Date Range Picker Component ដូចគ្នា 100% ។

**Q: ពេល Tenant ផ្អាក (Suspend) — Users ខ្លះហ្គ Login ឆ្ពោះ?**  
A: **ទេ** — Middleware ត្រូវ Check Tenant Status ។ ប្រសិនបើ `tenant.status === 'suspended'` → Return 403 + Message «ការជាវរបស់ក្រុមហ៊ុនអ្នកត្រូវផ្អាក។ សូមទំនាក់ទំនង DIGITECHKH ។»

**Q: Audit Log ខ្ញុំ Archive ពេលណា?**  
A: ទុក Hot Storage **2 ឆ្នាំ** → Archive ទៅ Cold Storage **7 ឆ្នាំ** → Purge ។ ព្រោះ Cambodia GDT ក្នុង Tax Audit ត្រូវការ 5-7 ឆ្នាំ ។

---

*ឯកសារនេះតំណាង​ 100% knowledge base​ សម្រាប់ Super Admin Role ក្នុង DIGITECHKH BMS Prototype*  
*Next Role: Procurement Manager → [`role_procurement_manager.md`](role_procurement_manager.md)*
