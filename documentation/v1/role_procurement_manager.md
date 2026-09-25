# 🛒 DIGITECHKH BMS — ការសិក្សាស៊ីជម្រៅ: តួនាទី អ្នកគ្រប់គ្រងលទ្ធកម្ម (Procurement Manager)

> **ឯកសារ**: `role_procurement_manager.md`  
> **កំណែ**: 1.0  
> **កាលបរិច្ឆេទ**: 20 កញ្ញា 2026  
> **គោលបំណង**: ការយល់ 100% អំពីតួនាទី Procurement Manager — រួមមានវិសាលភាពការងារ, សិទ្ធិ, UI Pages, Workflow, Business Logic, ស្ថាបត្យកម្ម, និងអនុសាសន៍ Prototype Planning

---

## ⚠️ ចំណុចចាំបាច់ — ការយល់ Dual Scope ក្នុង Prototype

មុនពេលចូលខ្លឹមសារ ត្រូវយល់ **ភាពខុសគ្នា 2 ស្រទាប់** ក្នុង Prototype:

| ស្រទាប់ | Path | ប្រើដោយ | Page Count |
|---|---|---|---|
| **Admin Module `4-buy/`** | `pages/4-buy/` | Admin/GM ប្រើ (Full CRUD) | **12 pages** |
| **Procurement Portal** | `pages/9-portals/purchase-staff/` | Procurement Staff/Manager ប្រើ | **6 pages** |

> 💡 **ការប្រៀបធៀប**: Admin ដូចជា *ប្រធានសាខាធំ* — ប្រើ Module ពេញ (`4-buy/`) ។ Procurement Manager/Staff ប្រើ Portal ផ្ទាល់ (`purchase-staff/`) ដែលជា Focused View ត្រង់ Mission របស់ខ្លួន។

ឯកសារនេះ **Cover ទាំង 2 ស្រទាប់** ។

---

## តារាងមាតិកា

1. [អ្វីជា Procurement Manager?](#1-អ្វីជា-procurement-manager)
2. [ឋានានុក្រម និងទំនាក់ទំនង](#2-ឋានានុក្រម-និងទំនាក់ទំនង)
3. [Full Capability Map](#3-full-capability-map)
4. [ទំព័រ UI ពេញលេញ (All Pages Blueprint)](#4-ទំព័រ-ui-ពេញលេញ)
5. [ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)](#5-ម៉ាទ្រីសសិទ្ធិ)
6. [វដ្តការងារស្នូល (Core Workflows)](#6-វដ្តការងារស្នូល)
7. [Business Logic — 3-Way Matching](#7-business-logic--3-way-matching)
8. [ទំនាក់ទំនងជាមួយតួនាទីផ្សេង](#8-ទំនាក់ទំនងជាមួយតួនាទីផ្សេង)
9. [Data Scope — ឃើញអ្វី? លាក់អ្វី?](#9-data-scope--ឃើញអ្វី-លាក់អ្វី)
10. [KPI Dashboard](#10-kpi-dashboard)
11. [គំរូ Database Schema](#11-គំរូ-database-schema)
12. [ការការពារទំនាក់ទំនង Supplier](#12-ការការពារទំនាក់ទំនង-supplier)
13. [អនុសាសន៍ Architect + Prototype Planning](#13-អនុសាសន៍-architect--prototype-planning)
14. [FAQ](#14-faq)

---

## 1. អ្វីជា Procurement Manager?

### 1.1 និយមន័យ

**Procurement Manager** (អ្នកគ្រប់គ្រងលទ្ធកម្ម) គឺជា **ច្រករបៀងបញ្ចូលទំនិញ** — អ្នកដែលគ្រប់គ្រង **ដំណើរការទិញទំនិញចូល** ទាំងមូលរបស់ក្រុមហ៊ុន ចាប់ពី ការស្រង់ Supplier → ការចេញ PO → ការទទួលទំនិញ → រហូតដល់ ការបង់ប្រាក់ Supplier ។

> 💡 **ការប្រៀបធៀប**: Procurement Manager ដូចជា *Gate Keeper* — ទំនិញទាំងអស់ដែលចូលមកក្នុងក្រុមហ៊ុន **ត្រូវឆ្លងកាត់** Procurement Manager ។ ហើយ Accountant ត្រូវ **ទទួលបំណង** (Bill) ពី Procurement ជានិច្ច ។

### 1.2 តួនាទីក្នុង Value Chain

```
SUPPLIER                PROCUREMENT MANAGER              WAREHOUSE            ACCOUNTANT
   │                           │                              │                    │
   │   ── Quote/Price ──►       │                              │                    │
   │                    [Select Supplier]                      │                    │
   │                    [Issue PO]           ──► PO ──►        │                    │
   │   ── Deliver Goods ──────────────────────────────►        │                    │
   │                                              [Receive & Count GRN]             │
   │   ── Send Invoice ──►      │                              │                    │
   │                    [3-Way Match: PO+GRN+Bill]             │                    │
   │                           │ ─────────────────── Approve Disbursement ──►      │
   │   ◄── Payment ──────────────────────────────────────────────────── [Pay] ──►  │
```

### 1.3 Procurement Manager ជានរណា? (Real World)

| ទំហំអាជីវកម្ម | Procurement Manager ជានរណា |
|---|---|
| **ខ្នាតតូច (< 5 Staff)** | ម្ចាស់ / Admin គ្រប់គ្រងខ្លួនឯង |
| **ខ្នាតមធ្យម (5-30 Staff)** | Procurement Officer ម្នាក់ ឬ 2 នាក់ |
| **ខ្នាតធំ (> 30 Staff)** | ប្រធានផ្នែកលទ្ធកម្ម + Team |

---

## 2. ឋានានុក្រម និងទំនាក់ទំនង

```
┌─────────────────────────────────────────┐
│         👑 SUPER ADMIN (Platform)        │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│      🏢 ADMIN / GM (Company Level)       │
│   ← ផ្តល់ Budget ♦ អនុម័ត PO ធំ         │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│  🛒 PROCUREMENT MANAGER / STAFF          │  ← Role នេះ
│   Portal: purchase-staff/               │
│   Scope: Purchasing Dept Only           │
└──────┬────────────────────┬─────────────┘
       │                    │
       ▼                    ▼
┌──────────────┐    ┌───────────────────┐
│  SUPPLIER    │    │  WAREHOUSE MGR    │
│  (External)  │    │  (Receives Goods) │
└──────────────┘    └───────────────────┘
       │                    │
       └──────────┬─────────┘
                  ▼
        ┌─────────────────┐
        │   ACCOUNTANT    │
        │ (Pays Supplier) │
        └─────────────────┘
```

**Procurement Manager VS Admin (ចំណុចខុស)**:

| ចំណុច | Procurement Manager | Admin/GM |
|---|---|---|
| **ជ្រើសរើស Supplier** | ✅ ពេញលេញ | ✅ ពេញលេញ |
| **ចេញ PO** | ✅ ក្នុង Budget | ✅ + លើ Budget |
| **ឃើញ Sales Revenue** | ❌ ហាម | ✅ ពេញលេញ |
| **ឃើញ Profit Margin** | ❌ ហាម | ✅ ពេញលេញ |
| **ឃើញ Payroll** | ❌ ហាម | ✅ ពេញលេញ |
| **Approve Disbursement** | ⚠️ ចេញ Request ប៉ុណ្ណោះ | ✅ Final Approve |
| **Access Financial Reports** | ❌ ហាម | ✅ ពេញលេញ |
| **Manage Users** | ❌ ហាម | ✅ ពេញលេញ |

---

## 3. Full Capability Map

```
PROCUREMENT MANAGER CAPABILITIES
│
├── 📋 PURCHASE ORDERS (PO) — ស្នូលការងារ
│   ├── [CREATE]  ចេញ PO ថ្មី → ផ្ញើជូន Supplier
│   ├── [READ]    មើលបញ្ជី PO ទាំងអស់ (Status: Draft/Sent/Partial/Received)
│   ├── [UPDATE]  កែ PO ក្នុងស្ថានភាព Draft ប៉ុណ្ណោះ
│   ├── [UPDATE]  Update Status (Mark as Received)
│   └── [READ]    Print PO ជា PDF / A4 ផ្ញើ Supplier
│
├── 🏭 SUPPLIER MANAGEMENT — គ្រប់គ្រងអ្នកផ្គត់ផ្គង់
│   ├── [CREATE]  ចុះឈ្មោះ Supplier ថ្មី (Profile + Bank Account + Contact)
│   ├── [READ]    មើលបញ្ជី Supplier ទាំងអស់
│   ├── [UPDATE]  កែប្រែ Supplier Profile
│   ├── [READ]    ប្រវត្តិ PO + ប្រវត្តិតម្លៃទិញរបស់ Supplier នីមួយៗ
│   └── [READ]    Supplier Performance (On-time delivery, Quality)
│
├── 📄 BILLS (វិក្កយបត្រទិញចូល) — ទទួលវិក្កយបត្រពី Supplier
│   ├── [CREATE]  បញ្ចូល Bill ពី Supplier (ភ្ជាប់ PDF Scan)
│   ├── [READ]    មើលបញ្ជី Bills ទាំងអស់
│   ├── [READ]    ប្រៀបធៀប Bill vs PO (3-Way Matching Preview)
│   └── [UPDATE]  ដាក់ស្នើ Bill ឱ្យ Accountant ទូទាត់
│
├── 💸 DISBURSEMENT REQUEST — ស្នើសុំចំណាយ
│   ├── [CREATE]  ចេញ Disbursement Request (សំណើសុំបង់ប្រាក់ Supplier)
│   ├── [READ]    មើល Status: Pending / Approved / Paid
│   └── [READ]    ប្រវត្តិ Disbursements ទាំងអស់
│
├── 📦 STOCK VIEW (Read-Only — ចំនួន ប៉ុណ្ណោះ)
│   ├── [READ]    មើលតុល្យភាពស្តុក (Quantity Only — ❌ ហាមមើលតម្លៃ)
│   └── [READ]    ដឹងថ្នាក់ Reorder Point ហើយទំនិញណាត្រូវ Reorder
│
└── 📊 REPORTS (Procurement Only)
    ├── [READ]    របាយការណ៍ PO ប្រចាំខែ/ត្រីមាស
    ├── [READ]    ប្រៀបធៀបថ្លៃទិញ Supplier A vs B
    └── [READ]    Status Bills ដែលហួសកាលទូទាត់
```

### 3.1 ✅ អ្វីដែល Procurement Manager ធ្វើបាន

| # | សកម្មភាព | ហេតុ |
|---|---|---|
| 1 | ចុះបញ្ជី Supplier ថ្មី + ព័ត៌មានធនាគារ | Core Duty |
| 2 | ចេញ Purchase Order (PO) | Core Duty |
| 3 | Print PO ជា PDF ផ្ញើ Supplier | Procurement Operation |
| 4 | ទទួល Bill ពី Supplier + Upload PDF | Bill Processing |
| 5 | Verify 3-Way Match (PO + GRN + Bill) | Quality Control |
| 6 | ដាក់ Disbursement Request ឱ្យ Accountant | Payment Trigger |
| 7 | មើល Stock Balance (Qty Only) | Reorder Awareness |
| 8 | ប្រៀបធៀប Price History ពី Suppliers | Negotiation Support |
| 9 | Export Procurement Report | Management Reporting |
| 10 | ប្រាស្រ័យជាមួយ Supplier Portal (ទទួល Confirmation) | Supplier Collaboration |

### 3.2 ❌ អ្វីដែល Procurement Manager ហាមធ្វើ

| # | ហាម | ហេតុ |
|---|---|---|
| 1 | ❌ មើល Sales Invoices / Revenue | Privacy — Sales Dept Separation |
| 2 | ❌ មើល Customer Data | Zero Data Leakage |
| 3 | ❌ ធ្វើ Final Payment ដោយខ្លួនឯង | Accountant ជាអ្នកទូទាត់ |
| 4 | ❌ ឃើញ Selling Price / Profit Margin | Data Compartmentalization |
| 5 | ❌ ឃើញ Payroll / HR Data | HR Dept Separation |
| 6 | ❌ Edit Stock Balance | Warehouse's Responsibility |
| 7 | ❌ Access Financial Reports (P&L) | Accountant Only |
| 8 | ❌ Approve Own Disbursement | Segregation of Duties (SoD) |
| 9 | ❌ Delete Posted Bills | Immutable after posting |
| 10 | ❌ Change Supplier Bank Account ក្រោយ Bill ត្រូវបាន Approved | Anti-Fraud |

---

## 4. ទំព័រ UI ពេញលេញ (All Pages Blueprint)

### 4.1 ទំព័រ Admin Module `4-buy/` — Full CRUD (Admin/GM ប្រើ)

```
4-buy/
├── 1-bills/
│   ├── bills.html              ← បញ្ជី Bills ទាំងអស់ (List View)
│   ├── create-bills.html       ← ទម្រង់បង្កើត Bill ថ្មី
│   ├── edit-bills.html         ← ទម្រង់កែប្រែ Bill
│   └── view-bills.html         ← ព័ត៌មានលម្អិត Bill + 3-Way Match Status
├── 2-suppliers/
│   ├── suppliers.html          ← បញ្ជី Suppliers ទាំងអស់
│   ├── create-suppliers.html   ← ចុះឈ្មោះ Supplier ថ្មី
│   ├── edit-suppliers.html     ← កែប្រែ Supplier Profile
│   └── view-suppliers.html     ← Profile Supplier លម្អិត + History
└── 3-disbursement/
    ├── disbursement.html       ← បញ្ជី Disbursements
    ├── create-disbursement.html← ចេញ Disbursement Voucher
    ├── edit-disbursement.html  ← កែ Disbursement (ស្ថានភាព Draft)
    └── view-disbursement.html  ← ប័ណ្ណចំណាយ A4 + 4 ហត្ថលេខា
```

**សរុប Admin Module**: **12 ទំព័រ**

---

### 4.2 ទំព័រ Procurement Portal `9-portals/purchase-staff/` — Focused View

```
9-portals/purchase-staff/
├── dashboard.html          ← ផ្ទាំងគ្រប់គ្រង Procurement
├── bills.html              ← បញ្ជី Bills (PO ដែលបាន/នៅ Pending)
├── create-bill.html        ← ចេញ PO / ទទួល Bill ពី Supplier
├── suppliers.html          ← បញ្ជី Suppliers
├── create-supplier.html    ← ចុះឈ្មោះ Supplier ថ្មី
└── disbursements.html      ← មើល Status Disbursements
```

**សរុប Portal**: **6 ទំព័រ**

---

### 4.3 ការពន្យល់ Pages លម្អិត

#### Page 1: `dashboard.html` — ផ្ទាំងគ្រប់គ្រង Procurement

**KPI Cards Row**:

| Widget | ទិន្នន័យ | ណែនាំ |
|---|---|---|
| 📋 POs ដែលបានចេញ (ខែនេះ) | COUNT(POs this month) | |
| ⏳ POs ដែលរង់ចាំ Delivery | COUNT(status='sent') | 🔴 ប្រសិនបើ > 7 ថ្ងៃ |
| 📄 Bills ដែលរង់ចាំ Match | COUNT(bills pending match) | |
| 💸 Disbursements រង់ចាំ Approval | Total amount pending | |

**Section ខាងក្រោម**:
- តារាង PO ចុងក្រោយ 10 (Status Badges: Draft/Sent/Partial/Received/Cancelled)
- Alert Box: Overdue POs (ហួស Delivery Date)
- Alert Box: Bills ដែល Unmatched > 14 ថ្ងៃ

---

#### Page 2: `bills.html` — បញ្ជី Bills / Purchase Orders

**ចំណាំ Design**: ក្នុង Prototype Portal ទំព័រ `bills.html` = **ដំណើរការ PO + Bill រួមគ្នា** (ព្រោះ PO/Bill ជា lifecycle តែមួយ)

**ជួរឈរតារាង**:

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| លេខ PO | Code | PO-2026-0045 |
| Supplier | Text + Avatar | ហ៊ុន ត្រេឌីង |
| ថ្ងៃចេញ | Date | 15 កញ្ញា 2026 |
| ថ្ងៃ Delivery | Date | 22 កញ្ញា 2026 |
| ទំហំ | Amount | $1,250.00 |
| ស្ថានភាព | Badge | Draft / Sent / Received / Matched |
| 3-Way | Icon | ✅ / ⚠️ / ❌ |
| សកម្មភាព | ⋮ | មើល, Print PO, Mark Received, Upload Bill |

**Filters**:
- ស្វែងរកតាម PO Number / Supplier Name
- Filter Status (All / Draft / Sent / Received / Matched / Overdue)
- Date Range Picker (ថ្ងៃចេញ PO)
- Filter by Supplier

---

#### Page 3: `create-bill.html` — ចេញ PO / បញ្ចូល Bill

ទំព័រ **ចម្រុះ** — ដំណើរការ 2 use cases:
- **Mode A**: ចេញ Purchase Order ថ្មី
- **Mode B**: ទទួល Bill ពី Supplier (ភ្ជាប់ PDF + ផ្ទៀងផ្ទាត់ vs PO)

**Section 1 — ព័ត៌មាន PO ចម្បង**

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| លេខ PO (Auto) | Display | — | PO-YYYY-XXXX |
| Supplier | Custom Dropdown | ✅ | Search + Select ពី Supplier DB |
| ថ្ងៃចេញ PO | Date | ✅ | Default: Today |
| ថ្ងៃ Delivery ស្នើ | Date | ✅ | Expected Delivery |
| ទីតាំងដឹក | Text | ✅ | Warehouse Location |
| លក្ខខណ្ឌទូទាត់ | Custom Dropdown | ✅ | COD / NET-15 / NET-30 / NET-60 |
| ចំណាំ | Textarea | ⚠️ | Special Instructions for Supplier |

**Section 2 — តារាងមុខទំនិញ (Line Items Table)**

| Column | ប្រភេទ | ចំណាំ |
|---|---|---|
| # | Auto | |
| ឈ្មោះទំនិញ | Dropdown + Search | ពី Catalog/SKU |
| SKU/Barcode | Auto-fill | |
| ចំនួន (Qty) | Number | |
| ឯកតា | Text | ប្រអប់, ដប, kg |
| ថ្លៃទិញ/ឯកតា | Number | **តម្លៃ Supplier ជាក់ស្តែង** |
| VAT (10%) | Auto-calc | |
| សរុប | Auto-calc | Qty × Price |
| ⊗ | Delete Row | |

**Footer Summary**:
```
                         សរុបរង (Subtotal):    $1,000.00
                    អាករតម្លៃបន្ថែម (10%):      $100.00
                         ទឹកប្រាក់សរុប:       $1,100.00
```

**Buttons**:
- «រក្សាទុក Draft» → Save as Draft
- «ចេញ PO ផ្លូវការ» → Confirm + Print Preview
- «បោះបង់»

---

#### Page 4: `suppliers.html` — បញ្ជី Suppliers

**ជួរឈរតារាង**:

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| # | Auto | 1 |
| ឈ្មោះ Supplier | Text + Avatar | ហ៊ុន ត្រេឌីង Co. |
| ទំនាក់ទំនង | Phone | 012 XXX XXX |
| ប្រភេទ | Badge | Manufacturer / Distributor / Importer |
| ប្រទេស | Flag + Text | 🇰🇭 កម្ពុជា |
| PO ចុងក្រោយ | Date | 10 កញ្ញា 2026 |
| ចំនួន POs | Number | 24 |
| ស្ថានភាព | Badge | 🟢 សកម្ម / 🔴 ផ្អាក |
| ⋮ | Menu | មើល, កែ, ផ្អាក, ប្រវត្តិ PO |

---

#### Page 5: `create-supplier.html` — ចុះឈ្មោះ Supplier ថ្មី

**3 Sections (Enterprise Layout)**:

**Section 1 — ព័ត៌មានក្រុមហ៊ុន Supplier**

| Field | ប្រភេទ | Required |
|---|---|:---:|
| ឈ្មោះ Supplier (ខ្មែរ) | Text | ✅ |
| ឈ្មោះ Supplier (អង់គ្លេស) | Text | ✅ |
| ប្រភេទ Supplier | Custom Dropdown | ✅ |
| ប្រទេស | Custom Dropdown | ✅ |
| TIN / លេខចុះបញ្ជី | Text | ⚠️ |
| អាសយដ្ឋាន | Textarea | ✅ |
| ឯកសារ Supplier | File Upload | ⚠️ |

**Section 2 — ព័ត៌មានទំនាក់ទំនង**

| Field | ប្រភេទ | Required |
|---|---|:---:|
| ឈ្មោះអ្នកទំនាក់ទំនង | Text | ✅ |
| លេខទូរស័ព្ទ | Text | ✅ |
| Email | Email | ✅ |
| Telegram / LINE | Text | ⚠️ |

**Section 3 — ព័ត៌មានធនាគារ + លក្ខខណ្ឌ**

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ធនាគារ | Custom Dropdown | ✅ | ABA, ACLEDA, Canadia… |
| លេខគណនី | Text | ✅ | |
| ឈ្មោះម្ចាស់គណនី | Text | ✅ | ត្រូវស្របនឹង Invoice |
| KHQR ID | Text | ⚠️ | Bakong Transfer |
| លក្ខខណ្ឌទូទាត់ | Custom Dropdown | ✅ | COD / NET-15 / NET-30 / NET-60 |
| ដែនកំណត់ Credit | Number | ⚠️ | Max Unpaid Amount |
| ចំណាំ | Textarea | ⚠️ | Internal Notes |

---

#### Page 6: `disbursements.html` — ស្ថានភាព Disbursements

**គោលបំណង**: Procurement Manager **មើលប៉ុណ្ណោះ** — Accountant ជាអ្នក Final Approve ។

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| លេខ | Code | DIS-2026-012 |
| PO Reference | Link | PO-2026-0045 |
| Supplier | Text | ហ៊ុន ត្រេឌីង |
| ចំនួន | Amount | $1,100.00 |
| ថ្ងៃស្នើ | Date | 18 កញ្ញា 2026 |
| ថ្ងៃ Due | Date | 18 តុលា 2026 |
| ស្ថានភាព | Badge | ⏳ រង់ចាំ / ✅ អនុម័ត / 💰 បានបង់ |
| ⋮ | Menu | មើលលម្អិត |

---

#### Pages Admin Full CRUD — `view-bills.html` (Key Page)

ទំព័រ View Bill ក្នុង `4-buy/1-bills/` ជាទំព័រ **ស្នូលដ៏សំខាន់** ព្រោះបង្ហាញ **3-Way Matching Status**:

```
┌─────────────────────────────────────────────────────────────┐
│  Bill #BILL-2026-045  │  ⏳ រង់ចាំ Match                    │
├──────────────────┬──────────────────┬───────────────────────┤
│  📋 PO-2026-0045 │  📦 GRN-2026-031 │  📄 BILL-2026-045    │
│  ✅ Confirmed    │  ✅ Received      │  ✅ Uploaded          │
│                  │                  │                       │
│  Qty: 100        │  Qty: 98 ⚠️      │  Qty: 100             │
│  Price: $10/u    │  OK              │  Price: $10/u ✅       │
│  Total: $1,000   │                  │  Total: $1,000        │
├──────────────────┴──────────────────┴───────────────────────┤
│  ⚠️ MISMATCH: Quantity received (98) ≠ PO quantity (100)    │
│  ការណែនាំ: ផ្ទៀងផ្ទាត់ 2 ឯកតាដែលបាត់ ឬ Deduct ពី Bill     │
└─────────────────────────────────────────────────────────────┘
```

---

#### `view-disbursement.html` — ប័ណ្ណចំណាយ A4 ផ្លូវការ

បោះពុម្ព **A4 Enterprise Document** ដែលមាន **4 ហត្ថលេខា**:

```
┌─────────────────────────────────────────────────────────────┐
│                    ប័ណ្ណចំណាយទូទាត់                         │
│              DIGITECHKH BMS - [ឈ្មោះក្រុមហ៊ុន]              │
│  លេខ: DIS-2026-012         កាលបរិច្ឆេទ: 20 កញ្ញា 2026       │
├─────────────────────────────────────────────────────────────┤
│  អ្នកទទួល: ហ៊ុន ត្រេឌីង Co., Ltd.                           │
│  គណនី: ABA Bank - 000123456                                 │
│  មូលហេតុ: ទូទាត់ PO-2026-0045 (ប្រេង + គ្រឿងបន្លាស់)        │
│  ចំនួន: $1,100.00 (USD មួយពាន់មួយរយដុល្លារ)                 │
│  WHT (15%): - $150.00                                       │
│  សុទ្ធ: $950.00                                              │
├────────────────┬────────────────┬───────────────────────────┤
│  អ្នករៀបចំ     │  ប្រធានគណនេយ្យ  │ នាយករ + អ្នកទទួល       │
│  ________________│________________│_________________________  │
│  [Procurement]   │  [Accountant]  │ [Director] [Supplier]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)

### 5.1 CRUD Matrix — Procurement Portal

| Feature / Action | CREATE | READ | UPDATE | DELETE |
|---|:---:|:---:|:---:|:---:|
| **Purchase Orders (PO)** | ✅ | ✅ | ⚠️ Draft Only | ❌ (Cancel Only) |
| **Supplier Profile** | ✅ | ✅ | ✅ | ❌ (Deactivate) |
| **Bills (Vendor Invoice)** | ✅ | ✅ | ⚠️ Unposted Only | ❌ |
| **Disbursement Request** | ✅ (Request) | ✅ | ⚠️ Pending Only | ❌ |
| **Stock Quantity** | ❌ | ✅ (Qty Only) | ❌ | ❌ |
| **Stock Price/Cost** | ❌ | ❌ **ហាម** | ❌ | ❌ |
| **Sales Invoices** | ❌ | ❌ **ហាម** | ❌ | ❌ |
| **Financial Reports** | ❌ | ❌ **ហាម** | ❌ | ❌ |
| **HR / Payroll** | ❌ | ❌ **ហាម** | ❌ | ❌ |
| **System Settings** | ❌ | ❌ | ❌ | ❌ |

> **Legend**: ✅ Full | ⚠️ Conditional | ❌ Forbidden

### 5.2 Module Access Matrix (Dashboard View)

| Module | Procurement Manager | ការពន្យល់ |
|---|:---:|---|
| **Dashboard** | ✅ Procurement KPIs | PO stats, Pending bills, Overdue |
| **Sales & CRM** | ❌ | ហាមទាំងស្រុង |
| **POS Cashier** | ❌ | ហាមទាំងស្រុង |
| **Bills / PO** | ✅ Full | Core duty |
| **Suppliers** | ✅ Full | Core duty |
| **Disbursements** | ✅ Request Only | Accountant Approves |
| **Stock Balance** | 👁️ Qty Only | Reorder planning |
| **Stock Catalog** | 👁️ Name + SKU | Reference only |
| **Accounting** | ❌ | Accountant only |
| **HR** | ❌ | HR only |
| **Reports** | ✅ Procurement | Own dept reports |
| **Settings** | ❌ | Admin only |

---

## 6. វដ្តការងារស្នូល (Core Workflows)

### Workflow 1: Purchase Request → PO → Receive (End-to-End)

```
START
  │
  ▼
[Trigger] ស្តុកធ្លាក់ក្រោម Reorder Point
OR Warehouse Staff ស្នើសុំ PR (Purchase Requisition)
  │
  ▼
Procurement Manager ចូល dashboard.html
→ ឃើញ Alert: "ទំនិញ [X] ជិតអស់ (Qty: 5 | Min: 10)"
  │
  ▼
ចូល create-bill.html → ជ្រើស Supplier
  │
  ├── មើល Price History ពី Supplier ចុងក្រោយ
  └── ប្រៀបធៀប Suppliers ≥ 2 (ជ្រើស Best Price)
  │
  ▼
បំពេញ PO (Supplier + Items + Qty + Price + Delivery Date)
→ ចុច «ចេញ PO ផ្លូវការ»
  │
  ├── ប្រព័ន្ធ Generate PO Number (PO-YYYY-XXXX)
  ├── ប្រព័ន្ធ Set Status = "Sent"
  ├── ប្រព័ន្ធ Print/Export PO PDF → Procurement ផ្ញើ Supplier
  └── ប្រព័ន្ធ Notify Warehouse: "PO sent, expect delivery by [date]"
  │
  ▼
Supplier Confirms (via Supplier Portal ឬ ទូរស័ព្ទ)
  │
  ▼
[Goods Arrive] Warehouse Staff Count + GRN (Goods Receipt Note)
  │
  ▼
Procurement Manager ចូល bills.html → រក PO នោះ
→ ចុច «Mark as Received» + Upload GRN Photo/PDF
  │
  ▼
Supplier ផ្ញើ Invoice (Bill) → Procurement Upload ភ្ជាប់ PDF
→ ប្រព័ន្ធ Run 3-Way Match Auto-Check
  │
  ├── ✅ Match 100% → Status = "Matched" → Disbursement Request Auto-Draft
  └── ⚠️ Mismatch → Alert → Procurement ដោះស្រាយ (ទំនាក់ Supplier)
  │
  ▼
Procurement ចេញ Disbursement Request → ផ្ញើ Accountant
  │
  ▼
Accountant Final Approve → Pay Supplier
  │
  ▼
END
```

---

### Workflow 2: Supplier Registration (ចុះឈ្មោះ Supplier ថ្មី)

```
START
  │
  ▼
Procurement Manager ទំនាក់ Supplier ថ្មីប្រទះ
  │
  ▼
ចូល create-supplier.html
→ បំពេញ ព័ត៌មានក្រុមហ៊ុន + ទំនាក់ + ធនាគារ
  │
  ▼
ចុច «ចុះឈ្មោះ»
  │
  ├── ប្រព័ន្ធ Generate Supplier ID
  ├── ប្រព័ន្ធ Set Status = "Active"
  ├── Optional: ប្រព័ន្ធ ផ្ញើ Invitation ទៅ Supplier Portal
  └── Audit Log: "Supplier [X] registered by [User]"
  │
  ▼
showToast("ព័ត៌មានអ្នកផ្គត់ផ្គង់ត្រូវបានរក្សាទុកជោគជ័យ")
  │
  ▼
END → Supplier ស្ថិត Status Active → ជ្រើសបាននៅ create-bill.html
```

---

### Workflow 3: Handling Bill Mismatch (ការដោះស្រាយ 3-Way Mismatch)

```
START
  │
  ▼
ប្រព័ន្ធ Detect Mismatch ក្រោយ Upload Bill:
  Qty Received: 98 ≠ PO Qty: 100
  │
  ▼
Status = "Mismatch" + Alert ជូន Procurement + Accountant
  │
  ▼
Procurement Manager ចូល view-bills.html
→ ពិនិត្យ Mismatch Details
  │
  ▼
Option A: ទំនាក់ Supplier → Supplier ឯកភាព Credit Note 2 ឯកតា
  ├── Procurement Update Bill Amount
  └── Re-run 3-Way Match → ✅ Match

Option B: GRN ខុស (Warehouse Count Error)
  ├── Procurement ជូនដំណឹង Warehouse Manager
  ├── Warehouse Recount + Update GRN
  └── Re-run 3-Way Match → ✅ Match

Option C: Force Accept (Management Decision)
  ├── Admin/Manager Override Approve
  └── Audit Log: "Mismatch overridden by [User] - Reason: [...]"
  │
  ▼
END → Disbursement Request ត្រូវបាន Unblocked
```

---

### Workflow 4: Supplier Evaluation (ប្រៀបធៀប Supplier Price)

```
START
  │
  ▼
Procurement Manager ត្រូវ Restock: "ប្រេងម៉ាស៊ីន 5L x 20 ដប"
  │
  ▼
ចូល suppliers.html → Filter by Product Category
  │
  ▼
មើល Price History Supplier A vs B vs C:

Supplier A (ហ៊ុន ត្រេឌីង):  $8.50/ដប — NET-30
Supplier B (ABC Import):     $7.80/ដប — COD
Supplier C (XYZ Logistics):  $8.00/ដប — NET-15 + Free Delivery
  │
  ▼
ជ្រើស Supplier C (Best Value: Price + Credit Term + Delivery)
  │
  ▼
ចេញ PO → Supplier C
  │
  ▼
END → Data ត្រូវ Log ក្នុង Price History → ប្រើជា Reference ខែក្រោយ
```

---

## 7. Business Logic — 3-Way Matching

**3-Way Matching** ជា **Control Mechanism ដ៏សំខាន់** ដើម្បីការពារ:
- ការបង់ប្រាក់ Supplier ហួស (Over-payment)
- ការបង់ប្រាក់ Supplier ដែលមិនបានដឹក (Fraud)
- ការខ្ជះខ្ជាយ ហើយ Duplicate Payments

```
Document 1: PO (Purchase Order)
  └── Ordered: 100 units @ $10 = $1,000

Document 2: GRN (Goods Receipt Note)
  └── Received: 98 units (counted by Warehouse)

Document 3: BILL (Supplier Invoice)
  └── Charged: 100 units @ $10 = $1,000

3-WAY MATCH RESULT:
  PO Qty (100) vs GRN Qty (98) vs BILL Qty (100)
  ⚠️ GRN ≠ PO → MISMATCH!

  Action Required:
  → ពន្យល់ 2 units ដែល Missing
  → ឬ Request Credit Note ពី Supplier
  → ឬ Charge Back ពី Warehouse
```

### 7.1 Match Rules

| Rule | Condition | Action |
|---|---|---|
| ✅ **Full Match** | PO qty = GRN qty = Bill qty + prices match | Auto-approve Disbursement Draft |
| ⚠️ **Qty Mismatch** | GRN qty ≠ PO qty ឬ Bill qty | Alert + Hold — ទំនាក់ Supplier |
| ⚠️ **Price Mismatch** | Bill price ≠ PO agreed price | Alert + Hold — Review Contract |
| 🔴 **Major Mismatch** | ± 10% Variance | Escalate to Admin/Manager |
| ✅ **Tolerance Match** | ± 2% Variance | Auto-approve (within tolerance) |

### 7.2 Tolerance Policy (ណែនាំ)

```
Recommended Tolerance Setting (Configurable by Admin):
- Quantity tolerance: ± 2%  (e.g., order 100, receive 98 = OK)
- Price tolerance:    ± 1%  (e.g., agreed $10, billed $10.05 = OK)
- Amount tolerance:   ± $5  (minor rounding differences)
```

---

## 8. ទំនាក់ទំនងជាមួយតួនាទីផ្សេង

```
Procurement Manager
│
├── [RECEIVES REQUESTS FROM] → Warehouse Manager / Staff
│   └── "ស្តុក [X] ជិតអស់ — ស្នើ Reorder"
│
├── [SENDS PO TO] → Supplier (via Supplier Portal / Email / Print)
│
├── [COORDINATES WITH] → Warehouse Manager
│   └── GRN Count, Goods Quality Check
│
├── [SUBMITS DISBURSEMENT TO] → Accountant
│   └── Disbursement Request ដែល 3-Way Matched
│
├── [REPORTS TO] → Admin / GM
│   └── Procurement KPIs, Budget Usage, Supplier Performance
│
└── [RECEIVES ALERTS FROM] → System (Auto)
    ├── Reorder Point Alerts
    ├── Overdue PO Delivery Alerts
    └── 3-Way Match Mismatch Alerts
```

**ការ Handoff ដ៏សំខាន់ (Critical Handoff Points)**:

| Handoff | From | To | Document |
|---|---|---|---|
| ស្តុកជិតអស់ | ប្រព័ន្ធ/Warehouse | Procurement | Reorder Alert |
| PO ចេញ | Procurement | Supplier | Purchase Order PDF |
| ទំនិញដល់ | Supplier | Warehouse | Goods Receipt Note |
| Bill ចូល | Supplier | Procurement | Vendor Invoice |
| Match OK | Procurement | Accountant | Disbursement Request |
| Payment | Accountant | Supplier | Payment Voucher |

---

## 9. Data Scope — ឃើញអ្វី? លាក់អ្វី?

```
PROCUREMENT MANAGER DATA SCOPE
│
├── ✅ ឃើញ (CAN SEE):
│   ├── Purchase Orders (ខ្លួនឯងបង្កើត + ទូទៅ Department)
│   ├── Supplier profiles, contact, bank accounts
│   ├── Vendor Bills + Attachments
│   ├── Disbursement Request status
│   ├── Stock Quantity (quantity only — NO price/cost/value)
│   ├── Product names + SKU (for ordering reference)
│   └── Procurement Reports (own dept)
│
└── ❌ ហាមមើល (CANNOT SEE):
    ├── Sales Invoices + Revenue
    ├── Customer names + contact
    ├── Selling Prices / Profit Margins
    ├── Cost Prices shown in Sales context
    ├── Payroll / Salary data
    ├── Bank account balances
    ├── Financial P&L Reports
    ├── Admin System Settings
    └── Other Tenant data (Multi-tenant isolation)
```

**Stock View Rule (Zero Price Leakage)**:

| ទំព័រ Stock | Procurement Sees | Procurement ហាមមើល |
|---|---|---|
| Stock Balance | ✅ Product Name, SKU, Qty, Warehouse | ❌ Cost Price, Selling Price, Total Value |
| Catalog | ✅ Name, SKU, Description, Category | ❌ Any prices |
| Movement Log | ✅ In/Out Qty, Dates | ❌ Values/Amounts |

---

## 10. KPI Dashboard

| # | Widget | ការគណនា | Alert Condition |
|---|---|---|---|
| 1 | 📋 POs ចេញ (ខែនេះ) | COUNT(POs WHERE month=current) | — |
| 2 | ⏳ POs Pending Delivery | COUNT(status='sent') | 🔴 ប្រសិនបើ > 7 days overdue |
| 3 | 📦 POs Received (ខែនេះ) | COUNT(status='received') | — |
| 4 | ✅ 3-Way Matched (ខែនេះ) | COUNT(status='matched') | — |
| 5 | ⚠️ Mismatch Pending | COUNT(status='mismatch') | 🔴 Any > 0 |
| 6 | 💸 Disbursements Pending | SUM(amount WHERE status='pending') | — |
| 7 | 🏭 Active Suppliers | COUNT(suppliers WHERE active) | — |
| 8 | 📉 Reorder Alerts | COUNT(stock WHERE qty < reorder_point) | 🔴 ≥ 1 |

---

## 11. គំរូ Database Schema

```sql
-- Core Tables for Procurement Manager Scope

-- 1. Suppliers
CREATE TABLE suppliers (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),    -- Multi-tenant isolation
    name_kh             VARCHAR(255) NOT NULL,
    name_en             VARCHAR(255),
    supplier_type       VARCHAR(50),
        -- manufacturer | distributor | importer | local_trader
    country             VARCHAR(100) DEFAULT 'Cambodia',
    tin_number          VARCHAR(50),
    address             TEXT,
    contact_name        VARCHAR(255),
    contact_phone       VARCHAR(50),
    contact_email       VARCHAR(255),
    telegram            VARCHAR(100),
    bank_name           VARCHAR(100),
    bank_account_number VARCHAR(100),
    bank_account_name   VARCHAR(255),
    khqr_id             VARCHAR(100),
    payment_terms       VARCHAR(20) DEFAULT 'COD',
        -- COD | NET15 | NET30 | NET60
    credit_limit        DECIMAL(15,2),
    status              VARCHAR(20) DEFAULT 'active',
        -- active | inactive | blacklisted
    notes               TEXT,
    created_by          UUID,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Purchase Orders (PO)
CREATE TABLE purchase_orders (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    po_number           VARCHAR(50) UNIQUE NOT NULL,
        -- PO-2026-XXXX (Auto-generated)
    supplier_id         UUID REFERENCES suppliers(id),
    status              VARCHAR(30) DEFAULT 'draft',
        -- draft | sent | partial | received | matched | cancelled
    ordered_at          DATE NOT NULL,
    expected_delivery   DATE NOT NULL,
    delivery_location   VARCHAR(255),
    payment_terms       VARCHAR(20),
    subtotal            DECIMAL(15,2),
    vat_amount          DECIMAL(15,2),
    total_amount        DECIMAL(15,2),
    notes               TEXT,
    created_by          UUID,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PO Line Items
CREATE TABLE po_items (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id               UUID REFERENCES purchase_orders(id),
    product_id          UUID REFERENCES products(id),
    sku                 VARCHAR(100),
    product_name        VARCHAR(255),
    unit                VARCHAR(50),
    qty_ordered         DECIMAL(10,3) NOT NULL,
    qty_received        DECIMAL(10,3) DEFAULT 0,
    unit_cost           DECIMAL(15,4) NOT NULL,    -- Cost price (Procurement sees this)
    vat_rate            DECIMAL(5,2) DEFAULT 10,
    line_total          DECIMAL(15,2)
);

-- 4. Goods Receipt Notes (GRN)
CREATE TABLE grn (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    grn_number          VARCHAR(50) UNIQUE,
    po_id               UUID REFERENCES purchase_orders(id),
    received_at         TIMESTAMPTZ DEFAULT NOW(),
    received_by         UUID,   -- Warehouse Staff
    notes               TEXT,
    attachment_url      TEXT    -- Photo evidence
);

CREATE TABLE grn_items (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grn_id              UUID REFERENCES grn(id),
    po_item_id          UUID REFERENCES po_items(id),
    qty_received        DECIMAL(10,3) NOT NULL,
    qty_rejected        DECIMAL(10,3) DEFAULT 0,
    rejection_reason    TEXT
);

-- 5. Vendor Bills
CREATE TABLE vendor_bills (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    bill_number         VARCHAR(100),   -- Supplier's own invoice number
    po_id               UUID REFERENCES purchase_orders(id),
    supplier_id         UUID REFERENCES suppliers(id),
    bill_date           DATE,
    due_date            DATE,
    subtotal            DECIMAL(15,2),
    vat_amount          DECIMAL(15,2),
    wht_amount          DECIMAL(15,2) DEFAULT 0,    -- Withholding Tax
    total_amount        DECIMAL(15,2),
    match_status        VARCHAR(20) DEFAULT 'pending',
        -- pending | matched | mismatch | overridden
    attachment_url      TEXT,   -- PDF scan of supplier invoice
    notes               TEXT,
    created_by          UUID,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Disbursement Requests
CREATE TABLE disbursements (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    disbursement_number VARCHAR(50) UNIQUE,   -- DIS-2026-XXXX
    bill_id             UUID REFERENCES vendor_bills(id),
    supplier_id         UUID REFERENCES suppliers(id),
    amount_gross        DECIMAL(15,2),
    wht_rate            DECIMAL(5,2) DEFAULT 0,
    wht_amount          DECIMAL(15,2) DEFAULT 0,
    amount_net          DECIMAL(15,2),
    payment_method      VARCHAR(50),    -- bank_transfer | cash | khqr
    payment_account     VARCHAR(255),
    due_date            DATE,
    status              VARCHAR(30) DEFAULT 'pending',
        -- pending | approved | paid | cancelled
    requested_by        UUID,   -- Procurement Manager
    approved_by         UUID,   -- Accountant / Admin
    paid_at             TIMESTAMPTZ,
    notes               TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 12. ការការពារទំនាក់ទំនង Supplier

### 12.1 Anti-Fraud Controls

| Control | Description | Implementation |
|---|---|---|
| **Supplier Bank Change Lock** | ប្រសិនបើ Supplier ស្នើ Change Bank Account ក្រោយ Bill Approved → ត្រូវ Admin Approve | Field lock + Admin-only override |
| **Duplicate Bill Detection** | Block Bill ដែល Bill Number ដូចគ្នាពី Supplier ដូចគ្នា | Unique constraint DB |
| **3-Way Mandatory** | ហាម Disbursement ប្រសិនបើ 3-Way Match មិន Passed | Workflow gate |
| **Segregation of Duties** | Procurement Request → Accountant Approves → Different people | Role enforcement |
| **Credit Limit Alert** | ប្រសិនបើ Unpaid Bills > Credit Limit → Alert | DB trigger |

### 12.2 Supplier Blacklist Management

```
Supplier Status Machine:
active → inactive → blacklisted → (archived)
  │
  └── Blacklisted Supplier:
      - Cannot issue new POs
      - Alert ជូន Admin
      - Reason + Audit Log Required
```

---

## 13. អនុសាសន៍ Architect + Prototype Planning

### 13.1 ណែនាំ Design (My Recommendations)

#### ✅ ណែនាំ 1: ភ្ជាប់ Procurement Portal ← → Admin Module ឱ្យ Consistent

Data ត្រូវ **Share តែមួយ DB** — Procurement Manager ចូល portal ហើយ Admin ចូល `4-buy/` module — ឃើញ Data ដូចគ្នា ។ ទំព័រ Portal ជា Filtered/Simplified view នៃ data ដូចគ្នានោះ ។

#### ✅ ណែនាំ 2: PO Number Format ស្តង់ដារ

```
Format: PO-YYYY-NNNN
Example: PO-2026-0001

Generated: ប្រព័ន្ធ Auto-increment per Tenant per Year
Reset: ចាប់ NNNN=0001 រៀង 1 ម្តងក្នុង 1 ឆ្នាំ
```

#### ✅ ណែនាំ 3: WHT (Withholding Tax) ក្នុង Disbursement

**Cambodia GDT** ទាមទារ WHT (Withholding Tax / ពន្ធកាត់ទុក) ពេលទូទាត់ Supplier:
- **ទំនិញ (Goods)**: 0% WHT
- **សេវាកម្ម (Services)**: 15% WHT
- **លក់ឡើងវិញ (Resale/Import)**: 0% WHT

Procurement Manager ត្រូវ **Set WHT Rate** ពេលបង្កើត Disbursement Request ។

#### ✅ ណែនាំ 4: Supplier Portal Integration

Procurement Manager ចេញ PO → ប្រព័ន្ធ Auto-Notify ជូន Supplier Portal:
- Supplier Login ពិនិត្យ PO → ចុច «ទទួលយក / បដិសេធ»
- Supplier Upload Invoice / Bill → Procurement Sees instantly
- Tracking Delivery Status

#### ✅ ណែនាំ 5: Price History ជា Negotiation Tool

```
ពេល Procurement ជ្រើស Supplier ក្នុង create-bill.html:
→ ប្រព័ន្ធ Show Last 3 Purchase Prices:

  ហ៊ុន ត្រេឌីង - ប្រេងម៉ាស៊ីន 5L
  ┌──────────────┬──────────────┬──────────┐
  │ ថ្ងៃទិញ       │ ចំនួន        │ ថ្លៃ/ឯកតា │
  ├──────────────┼──────────────┼──────────┤
  │ 15 ក.ញ 2026  │ 20 ដប        │ $8.50    │
  │ 12 ស.ក 2026  │ 30 ដប        │ $8.20    │
  │ 05 ម.ច 2026  │ 50 ដប        │ $8.00    │
  └──────────────┴──────────────┴──────────┘
  💡 ចំណាំ: ថ្លៃ ↗ ប្រៀបធៀប ៦ ខែ = +6.25%
```

#### ✅ ណែនាំ 6: Reorder Point Alert System

```
Product Table (Admin configures):
  reorder_point: 10  ← ពេល Stock ≤ 10 → Alert
  reorder_qty:   50  ← Suggested order quantity

Procurement Dashboard Widget:
  🔴 ទំនិញ [ប្រេងម៉ាស៊ីន 5L] — ស្តុក: 8 | Reorder Point: 10
       [+ បង្កើត PO ភ្លាម]  ← Quick Action Button
```

---

### 13.2 ផែនការ Prototype Pages

| # | Page | Layer | Priority | Complexity |
|---|---|---|:---:|:---:|
| 1 | `purchase-staff/dashboard.html` | Portal | 🔴 HIGH | Medium |
| 2 | `purchase-staff/suppliers.html` | Portal | 🔴 HIGH | Medium |
| 3 | `purchase-staff/create-supplier.html` | Portal | 🔴 HIGH | High |
| 4 | `purchase-staff/bills.html` | Portal | 🔴 HIGH | Medium |
| 5 | `purchase-staff/create-bill.html` | Portal | 🔴 HIGH | High |
| 6 | `purchase-staff/disbursements.html` | Portal | 🟡 MED | Low |
| 7 | `4-buy/1-bills/bills.html` | Admin | 🟡 MED | Medium |
| 8 | `4-buy/1-bills/create-bills.html` | Admin | 🟡 MED | High |
| 9 | `4-buy/1-bills/view-bills.html` | Admin | 🟡 MED | High (3-Way UI) |
| 10 | `4-buy/2-suppliers/suppliers.html` | Admin | 🟡 MED | Medium |
| 11 | `4-buy/2-suppliers/view-suppliers.html` | Admin | 🟢 LOW | Medium |
| 12 | `4-buy/3-disbursement/disbursement.html` | Admin | 🟡 MED | Medium |
| 13 | `4-buy/3-disbursement/view-disbursement.html` | Admin | 🔴 HIGH | High (A4 Print) |

**ណែនាំ**: ចាប់ផ្តើម → Portal ជ្រើស `suppliers.html` → `create-supplier.html` → `bills.html` → `create-bill.html` ។ Admin Module ព្រម Deploy ជាមួយ ។

---

### 13.3 ការ Validate Prototype (Before Moving to Next Role)

- [ ] **Sidebar** Procurement Portal — Menu: Dashboard, Bills/POs, Suppliers, Disbursements
- [ ] **Header** `h-[72px]` ស្មើ Sidebar Header ពិតប្រាកដ
- [ ] **suppliers.html** — Table + Filter + ⋮ Dropdown
- [ ] **create-supplier.html** — Form 3 Sections + Custom Dropdowns (ហាម native `<select>`)
- [ ] **bills.html** — Table + Status Badges (Draft/Sent/Received/Matched/Mismatch)
- [ ] **create-bill.html** — Supplier Dropdown + Dynamic Line Items Table + Auto-calc
- [ ] **3-Way Match UI** (view-bills.html Admin) — Visual 3-Column Comparison
- [ ] **view-disbursement.html** — A4 Print + 4 ហត្ថលេខា
- [ ] **Stock View** — Qty Only (ហាមមើលតម្លៃ — Zero Price Leakage)
- [ ] **showToast()** ជំនួស `alert()`
- [ ] **showCustomConfirm()** ជំនួស `confirm()` ពេល Cancel PO
- [ ] **ប៊ូតុងត្រឡប់ក្រោយ** `w-10 h-10 rounded-xl` icon-only
- [ ] **ភាសាខ្មែរ 100%** លើ UI ទាំងអស់
- [ ] **លេខអង់គ្លេស 0-9** — ចំនួន, ថ្ងៃ, ទឹកប្រាក់

---

## 14. FAQ

**Q: Procurement Manager ចេញ PO ហើយ Admin ត្រូវ Approve PO ទៀតទេ?**  
A: ក្នុង Prototype Phase 1 — **ចេញ PO ផ្ទាល់** (Procurement Manager ចេញបានដោយផ្ទាល់) ។ Phase 2 អាចបន្ថែម Approval Flow: PO ≥ Budget Threshold → ស្នើ Admin Approve ।

**Q: Disbursement — Procurement Manager ចុចបង់ប្រាក់ Supplier ដោយខ្លួនឯងបានទេ?**  
A: **ទេ** — Procurement Manager **ចេញ Disbursement Request ប៉ុណ្ណោះ** ។ Accountant ជា Final Approver + ជា អ្នក Mark as Paid ។ នេះជា **Segregation of Duties** (SoD) — ការបែកការទទួលខុសត្រូវ ដើម្បីការពារការក្លែងបន្លំ ។

**Q: Supplier ណ្ហែ Login ចូល Portal ដោយខ្លួនឯង ហើយ View PO?**  
A: **ចាស** — Supplier Portal (`9-portals/supplier/`) ជា External Self-Service ។ Supplier ទទួល Invitation Email → Login → View PO → Accept/Reject → Submit Invoice ។

**Q: 3-Way Matching ដំណើរការ Manual ឬ Auto?**  
A: **Semi-Auto** — ប្រព័ន្ធ Auto-Compare PO vs GRN vs Bill ហើយ Show Results ។ ប្រសិនបើ Match → ប្រព័ន្ធ Flag as Matched ស្វ័យប្រវត្តិ ។ ប្រសិនបើ Mismatch → ប្រព័ន្ធ Alert ។ Procurement Manager ជា អ្នក **Final Decision** (Override ឬ ដោះស្រាយ) ។

**Q: WHT (ពន្ធកាត់ទុក) Procurement Manager ត្រូវវាយ Manual ទេ?**  
A: **Manual ជ្រើស Rate** ក្នុង Disbursement Form ។ Admin Configure Default Rates per Supplier Type ។ Accountant Final Verify មុន Approve ។

**Q: ប្រសិន Stock ចូល Warehouse ហើយ ស្តុក Update ស្វ័យប្រវត្តិ?**  
A: **ចាស** — ពេល Warehouse Staff Mark GRN ជា Received → Stock Balance Update ស្វ័យប្រវត្តិ ។ Procurement Manager ឃើញ Qty Updated (ប៉ុន្តែ **ហាមមើលតម្លៃ**) ។

---

*ឯកសារនេះតំណាង 100% knowledge base សម្រាប់ Procurement Manager Role ក្នុង DIGITECHKH BMS*  
*Previous Role: Super Admin → [`role_superadmin.md`](role_superadmin.md)*  
*Next Role: Warehouse Staff → [`role_warehouse_staff.md`](role_warehouse_staff.md)*
