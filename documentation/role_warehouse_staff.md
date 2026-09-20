# 📦 DIGITECHKH BMS — ការសិក្សាស៊ីជម្រៅ: តួនាទី បុគ្គលិកគ្រប់គ្រងស្តុក (Warehouse Staff)

> **ឯកសារ**: `role_warehouse_staff.md`  
> **កំណែ**: 1.0  
> **កាលបរិច្ឆេទ**: 20 កញ្ញា 2026  
> **គោលបំណង**: ការយល់ 100% អំពីតួនាទី Warehouse Staff — រួមមានវិសាលភាពការងារ, Zero Price Leakage Policy, UI Pages ទាំងអស់, Workflow, Stock Logic, ស្ថាបត្យកម្ម, និងអនុសាសន៍ Prototype Planning

---

## ⚠️ ចំណុចចាំបាច់ — Zero Price Leakage Policy (ច្បាប់ 0 ទំហំតម្លៃ)

នេះជាគោលការណ៍ **Critical** ដ៏សំខាន់ **ខុសពី Role ផ្សេងៗ** ទាំងអស់:

> 🔴 **Warehouse Staff ហាមមើលតម្លៃ 100%** — ទាំង ថ្លៃដើម (Cost Price) និង ថ្លៃលក់ (Selling Price) ។ Warehouse Staff ឃើញ**ចំនួន (Quantity)** ប៉ុណ្ណោះ ។ នេះជា Design Principle មិនមែន UX ឆ្លើយ ។

| ព័ត៌មាន | Warehouse Staff ឃើញ? |
|---|:---:|
| ឈ្មោះទំនិញ | ✅ |
| SKU / Barcode | ✅ |
| ចំនួនស្តុក (Qty) | ✅ |
| ទីតាំងថតស្តុក | ✅ |
| ថ្ងៃ Expiry (ប្រសិនបើ Tracking) | ✅ |
| **ថ្លៃដើម (Cost Price)** | ❌ **ហាម** |
| **ថ្លៃលក់ (Selling Price)** | ❌ **ហាម** |
| **តម្លៃស្តុករួម (Total Value)** | ❌ **ហាម** |
| **ចំណេញ / ខាត** | ❌ **ហាម** |

---

## ⚠️ ការយល់ Dual Scope ក្នុង Prototype

| ស្រទាប់ | Path | ប្រើដោយ | Pages |
|---|---|---|---|
| **Admin Module `5-stock/`** | `pages/5-stock/` | Admin/GM ប្រើ (Full CRUD + ឃើញតម្លៃ) | **12 pages** |
| **Warehouse Portal** | `pages/9-portals/inventory-staff/` | Warehouse Staff ប្រើ (No Prices) | **7 pages** |

---

## តារាងមាតិកា

1. [អ្វីជា Warehouse Staff?](#1-អ្វីជា-warehouse-staff)
2. [ឋានានុក្រម និងទំនាក់ទំនង](#2-ឋានានុក្រម-និងទំនាក់ទំនង)
3. [Full Capability Map](#3-full-capability-map)
4. [ទំព័រ UI ពេញលេញ (All Pages Blueprint)](#4-ទំព័រ-ui-ពេញលេញ)
5. [ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)](#5-ម៉ាទ្រីសសិទ្ធិ)
6. [វដ្តការងារស្នូល (Core Workflows)](#6-វដ្តការងារស្នូល)
7. [Business Logic — Stock Operations](#7-business-logic--stock-operations)
8. [ទំនាក់ទំនងជាមួយតួនាទីផ្សេង](#8-ទំនាក់ទំនងជាមួយតួនាទីផ្សេង)
9. [Data Scope — ឃើញអ្វី? លាក់អ្វី?](#9-data-scope--ឃើញអ្វី-លាក់អ្វី)
10. [KPI Dashboard](#10-kpi-dashboard)
11. [គំរូ Database Schema](#11-គំរូ-database-schema)
12. [Stock Control Logic](#12-stock-control-logic)
13. [អនុសាសន៍ Architect + Prototype Planning](#13-អនុសាសន៍-architect--prototype-planning)
14. [FAQ](#14-faq)

---

## 1. អ្វីជា Warehouse Staff?

### 1.1 និយមន័យ

**Warehouse Staff** (បុគ្គលិកគ្រប់គ្រងស្តុក / បុគ្គលិកឃ្លាំង) ជា **អ្នកទទួលខុសត្រូវផ្ទាល់** ចំពោះ **ភាពត្រឹមត្រូវរាល់ ចូល-ចេញ ទំនិញ** ក្នុងឃ្លាំង ។ គាត់/នាង ជា **"The Truth Keeper of Stock"** — ព័ត៌មានស្តុក ទៅ ក្រុមលក់ (Sales), ក្រុមទិញ (Procurement), និង Accountant ទាំងអស់ **ចេញមកពី** Warehouse Staff ។

> 💡 **ការប្រៀបធៀប**: Warehouse Staff ដូចជា *Bank Teller ក្នុងធនាគារ* — ដឹងថាប្រាក់ (ទំនិញ) ចូល-ចេញ ចំនួនប៉ុន្មាន ប៉ុន្តែ **ហាមមើលតម្លៃ** ពេញ P&L ។ ហើយ គ្រប់ Movement ត្រូវ Record ចំបាច់ ។

### 1.2 ប្រភេទ Warehouse Staff

ក្នុង DIGITECHKH BMS Prototype — **Warehouse Staff** Cover **2 Sub-Roles**:

| Sub-Role | ការងារ | Note |
|---|---|---|
| **Warehouse Staff (Receiving)** | ទទួលទំនិញ + GRN + Count | ទំនាក់ Procurement |
| **Warehouse Staff (Dispatch)** | ចេញទំនិញ Sales + Pack + Record Outbound | ទំនាក់ Sales |

> ក្នុង Prototype Phase 1 — **Portal ចែករួមគ្នា** ។ Phase 2 អាច Split Portal ។

### 1.3 Warehouse Staff ក្នុង Business ជាក់ស្តែង

| ទំហំ | Warehouse Staff ជានរណា |
|---|---|
| **ខ្នាតតូច** | ម្ចាស់ / Admin ជា Warehouse ខ្លួនឯង |
| **ខ្នាតមធ្យម** | Storekeeper 1-2 នាក់ |
| **ខ្នាតធំ** | Warehouse Manager + Receiving Staff + Dispatch Staff + Inventory Counter |

---

## 2. ឋានានុក្រម និងទំនាក់ទំនង

```
┌─────────────────────────────────────────────┐
│         👑 SUPER ADMIN (Platform)            │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│      🏢 ADMIN / GM (Company Level)           │
│   ← Config Reorder Points, Catalog, Prices  │
└───────────────────┬─────────────────────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
┌────────────────┐   ┌─────────────────────────┐
│  🛒 PROCUREMENT │   │  💼 WAREHOUSE MANAGER   │
│  (Issues PO)   │   │  (Oversees all stock)   │
└───────┬────────┘   └──────────┬──────────────┘
        │                       │
        │    PO ────────────►   │
        │                       ▼
        │            ┌──────────────────────────┐
        └──────────► │  📦 WAREHOUSE STAFF       │ ← Role នេះ
                     │  Portal: inventory-staff/ │
                     │  Scope: Stock Ops Only    │
                     └──────────┬───────────────┘
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                   ▼
    [RECEIVE Goods]      [DISPATCH Goods]     [ADJUST Stock]
    GRN → Stock ↑        Sales Order → ↓      Physical Count
```

**Warehouse Staff VS Warehouse Manager (ចំណុចខុស)**:

| ចំណុច | Warehouse Staff | Warehouse Manager |
|---|---|---|
| **ទទួលទំនិញ + GRN** | ✅ ធ្វើដោយផ្ទាល់ | ✅ Supervise |
| **ចេញទំនិញ** | ✅ ធ្វើដោយផ្ទាល់ | ✅ Approve ធំ |
| **Adjust Stock** | ⚠️ Input Only | ✅ Approve Adjustments |
| **Approve GRN** | ⚠️ Submit | ✅ Final Confirm |
| **Catalog Management** | ❌ ហាម | ✅ (Limited) |
| **ឃើញ Stock Value** | ❌ ហាម | ❌ ហាម (Same Rule) |
| **Report — Dept Level** | ❌ | ✅ Dept Reports |

> **ចំណាំ**: ក្នុង Prototype Phase 1 — **Portal ភ្ជាប់ Warehouse Staff + Manager រួម** (`inventory-staff/`) ។ ឯកសារនេះ Cover **Warehouse Staff** Level ។

---

## 3. Full Capability Map

```
WAREHOUSE STAFF CAPABILITIES
│
├── 📥 RECEIVING (ការទទួលទំនិញ)
│   ├── [READ]    មើល PO List ដែលហៅ Delivery (Pending Arrival)
│   ├── [CREATE]  បង្កើត GRN (Goods Receipt Note) ក្រោយរាប់ទំនិញ
│   ├── [UPDATE]  Record Qty Received per Line Item
│   ├── [UPDATE]  Mark Rejected Items + មូលហេតុ
│   └── [UPLOAD]  ភ្ជាប់រូបភាព/ឯកសារ GRN ជា Evidence
│
├── 📤 DISPATCH (ការចេញទំនិញ)
│   ├── [READ]    មើល Sales Orders / Delivery Orders ដែលត្រូវ Pick
│   ├── [UPDATE]  Confirm Picked Qty (Pick & Pack)
│   ├── [UPDATE]  Mark as Dispatched (Stock Deduct Auto)
│   └── [CREATE]  Outbound Movement Record
│
├── 🔄 STOCK ADJUSTMENT (ការកែស្តុក)
│   ├── [CREATE]  ស្នើ Stock Adjustment (Physical Count Variance)
│   ├── [CREATE]  Record Damaged / Expired / Lost Items
│   └── [READ]    មើល Adjustment History
│
├── 📋 STOCK BALANCE (មើលស្តុក)
│   ├── [READ]    មើល Current Stock Balance (Qty Only ❌ ហាមមើលតម្លៃ)
│   ├── [READ]    Filter by Warehouse / Location / Category
│   └── [READ]    ស្វែងរក Item តាម SKU / Barcode / ឈ្មោះ
│
├── 📦 CATALOG (Reference Only)
│   ├── [READ]    មើល Product Info (Name, SKU, Unit, Category)
│   └── ❌        ហាម Create/Edit Catalog (Admin ជាអ្នក Manage)
│
└── 📊 MOVEMENT LOG (ប្រវត្តិចលនាស្តុក)
    ├── [READ]    មើល All Stock In / Out Movements
    ├── [READ]    Filter by Date / Item / Type (IN/OUT/ADJUST)
    └── [CREATE]  Manual Movement Entry (Special Cases)
```

### 3.1 ✅ អ្វីដែល Warehouse Staff ធ្វើបាន

| # | សកម្មភាព | ហេតុ |
|---|---|---|
| 1 | រាប់ + Record ទំនិញដែលទទួល (GRN) | Core Duty — Stock In |
| 2 | រាប់ + Record ទំនិញដែលចេញ (Dispatch) | Core Duty — Stock Out |
| 3 | Scan Barcode ពេល Count | Speed + Accuracy |
| 4 | ស្នើ Stock Adjustment (ក្រោយ Physical Count) | Variance Reporting |
| 5 | Record Damaged / Expired Items | Quality Control |
| 6 | Upload Photo Evidence ក្នុង GRN | Audit Trail |
| 7 | មើល Stock Balance (Qty Only) | Operational Awareness |
| 8 | ស្វែងរក Item by Barcode | Daily Operation |
| 9 | មើល Movement History | Traceability |
| 10 | ចេញ Movement Record (Manual) | Special Cases |

### 3.2 ❌ អ្វីដែល Warehouse Staff ហាមធ្វើ

| # | ហាម | ហេតុ |
|---|---|---|
| 1 | ❌ មើលតម្លៃទំនិញ (Cost/Sell Price) | Zero Price Leakage |
| 2 | ❌ មើលតម្លៃស្តុករួម (Total Stock Value) | Zero Price Leakage |
| 3 | ❌ Create / Edit Product Catalog | Admin / Catalog Manager |
| 4 | ❌ Approve Own Stock Adjustment | Warehouse Manager Approves |
| 5 | ❌ Delete Stock Records | Immutable Audit Trail |
| 6 | ❌ Access Sales Invoices | Sales Dept Only |
| 7 | ❌ Access Financial Reports | Accountant Only |
| 8 | ❌ Access Customer Data | Sales / CRM Only |
| 9 | ❌ Access HR / Payroll | HR Only |
| 10 | ❌ Manage Users / Settings | Admin Only |

---

## 4. ទំព័រ UI ពេញលេញ (All Pages Blueprint)

### 4.1 Admin Module `5-stock/` — Full CRUD ជាមួយ Prices (Admin/GM ប្រើ)

```
5-stock/
├── 1-balance/
│   ├── balance.html            ← បញ្ជីតុល្យភាពស្តុក (+ ឃើញ Cost Price)
│   ├── adjust-balance.html     ← ការប្រែប្រួលតុល្យភាព (Admin Approve)
│   ├── edit-balance.html       ← កែ Stock Entry (Admin)
│   └── view-balance.html       ← ព័ត៌មានលម្អិត Stock Item
├── 2-catalog/
│   ├── catalog.html            ← បញ្ជីផលិតផលទាំងអស់
│   ├── create-catalog.html     ← ចុះឈ្មោះ Product ថ្មី
│   ├── edit-catalog.html       ← កែ Product Info + Prices
│   └── view-catalog.html       ← Product Profile + Price History
└── 3-movement/
    ├── movement.html           ← ប្រវត្តិចលនាស្តុកទាំងអស់
    ├── create-movement.html    ← ចុះ Manual Movement
    ├── edit-movement.html      ← កែ Movement (Admin)
    └── view-movement.html      ← Movement Details
```

**សរុប Admin Module**: **12 ទំព័រ**

---

### 4.2 Warehouse Portal `9-portals/inventory-staff/` — Zero Price View

```
9-portals/inventory-staff/
├── dashboard.html          ← ផ្ទាំងគ្រប់គ្រងស្តុក (Qty + Alerts)
├── balance.html            ← ស្តុកបច្ចុប្បន្ន (Qty Only — ❌ ហាមមើលតម្លៃ)
├── adjust-balance.html     ← ស្នើ Stock Adjustment
├── catalog.html            ← Catalog Reference (Read Only)
├── create-catalog.html     ← [ណែនាំ] Quick Add New Item (Minimal Form)
├── movement.html           ← ប្រវត្តិ Movement
└── create-movement.html    ← ចុះ Manual Movement Record
```

**សរុប Portal**: **7 ទំព័រ**

> **ចំណាំ**: `create-catalog.html` ក្នុង Portal ជា Simplified Form (ឈ្មោះ, SKU, Unit, Category) ។ ហាម Price Fields ទាំងអស់ — Admin ចូល `5-stock/2-catalog/edit-catalog.html` ដើម្បីបន្ថែម Prices ។

---

### 4.3 ការពន្យល់ Pages លម្អិត

#### Page 1: `dashboard.html` — ផ្ទាំងគ្រប់គ្រងស្តុក

**KPI Cards Row** (ចំនួន ប៉ុណ្ណោះ — ❌ ហាមមើលទំហំទឹកប្រាក់)**:

| Widget | ទិន្នន័យ | Alert |
|---|---|---|
| 📦 Items ក្នុងស្តុក | COUNT(distinct products) | — |
| ⚠️ ស្តុកជិតអស់ | COUNT(qty ≤ reorder_point) | 🔴 ≥ 1 |
| 🔴 ស្តុកអស់ | COUNT(qty = 0) | 🔴 ≥ 1 |
| 📥 ការទទួលថ្ងៃនេះ | COUNT(GRN today) | — |
| 📤 ការចេញថ្ងៃនេះ | COUNT(Dispatch today) | — |
| 🔄 Adjustments Pending | COUNT(adj status=pending) | 🟡 ≥ 1 |

**Section ខាងក្រោម**:
- តារាង Items ដែលស្តុកជិតអស់ / អស់ (Alert Table)
- POs ដែលរង់ចាំ Arrival (Incoming PO List)
- Movement ចុងក្រោយ 10 (Recent Activity Feed)

---

#### Page 2: `balance.html` — ស្តុកបច្ចុប្បន្ន (Warehouse View)

**ចំណុចសំខាន់**: Portal version **ហាមមានជួរឈរ** Cost Price, Selling Price, Total Value ទាំងស្រុង ។

**ជួរឈរតារាង (Warehouse Staff Version)**:

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| # | Auto | 1 |
| ឈ្មោះទំនិញ | Text | ប្រេងម៉ាស៊ីន 5L |
| SKU | Code | OIL-5L-001 |
| ប្រភេទ | Badge | គ្រឿងប្រើ / ស្ករ / ប្លង់... |
| ឯកតា | Text | ដប / ប្រអប់ / kg |
| ស្តុក | **Number (Bold)** | **24** |
| Reorder Point | Number | 10 |
| ស្ថានភាព | Badge | 🟢 គ្រប់ / 🟡 ជិតអស់ / 🔴 អស់ |
| ឃ្លាំង | Text | ឃ្លាំង A |
| ⋮ | Menu | មើល, Adjust, Movement |

**Filters**:
- ស្វែងរកតាមឈ្មោះ / SKU / Barcode
- Filter Status (All / គ្រប់ / ជិតអស់ / អស់)
- Filter Category
- Filter Warehouse

**Admin Version `5-stock/1-balance/balance.html`** (ជួរឈរបន្ថែម):
- ✅ ថ្លៃដើម/ឯកតា
- ✅ តម្លៃស្តុករួម
- ✅ Average Cost

---

#### Page 3: `adjust-balance.html` — ស្នើ Stock Adjustment

**គោលបំណង**: ក្រោយ Physical Count — Warehouse Staff Records **ភាពខុសគ្នា** រវាង System Qty vs Actual Qty ។

**Form Layout**:

**Section 1 — ជ្រើស Item**

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ស្វែងរកទំនិញ | Search + Dropdown | ✅ | ស្វែង SKU / ឈ្មោះ |
| ឃ្លាំង | Custom Dropdown | ✅ | ប្រសិន Multi-Warehouse |
| ស្តុកក្នុងប្រព័ន្ធ | Display Only | — | System Qty (Read-only) |
| ចំនួនរាប់ពិតប្រាកដ | Number | ✅ | Actual Physical Count |
| ភាពខុសគ្នា (Auto) | Display | — | Actual - System = ± X |

**Section 2 — ព័ត៌មានបន្ថែម**

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ប្រភេទ Adjustment | Custom Dropdown | ✅ | Physical Count / Damaged / Expired / Lost / Found |
| លេខ Ref | Text | ⚠️ | ផ្ទៀងផ្ទាត់ Ref ការងារ |
| ចំណាំ / មូលហេតុ | Textarea | ✅ | ទាមទារ — ហាមទុកចោល |
| ភ្ជាប់ Evidence | File Upload | ⚠️ | រូបថតការរាប់ / ឯកសារ |

**Buttons**:
- «ដាក់ស្នើ» → Status = Pending Approval (Warehouse Manager / Admin Approve)
- «រក្សាទុក Draft»
- «បោះបង់»

> **⚠️ Flow**: Warehouse Staff ដាក់ស្នើ → Warehouse Manager / Admin Approve → Stock Auto-Update ។ Warehouse Staff **ហាម Approve ខ្លួនឯង** ។

---

#### Page 4: `catalog.html` — Catalog Reference (Read Only)

**Warehouse Staff** ឃើញ Catalog ដើម្បី **Reference ប៉ុណ្ណោះ** — ដឹង SKU, Unit, Category ។

**ជួរឈរ (Warehouse Staff View)**:

| ជួរឈរ | ឧទាហរណ៍ |
|---|---|
| ឈ្មោះទំនិញ | ប្រេងម៉ាស៊ីន 5L |
| SKU | OIL-5L-001 |
| Barcode | 8850123456789 |
| ប្រភេទ | ប្រេង / ចំណីអាហារ / ឧបករណ៍... |
| ឯកតា | ដប |
| ⋮ | មើល (Read Only) |

❌ **ហាមមានជួរ**: ថ្លៃដើម, ថ្លៃលក់, Margin

---

#### Page 5: `create-catalog.html` — ចុះឈ្មោះ Product ថ្មី (Portal — Minimal)

**ចំណាំ**: Portal version = **Minimal Form** — Warehouse Staff ចុះបញ្ជី Item ថ្មី ដែលទទួលដំបូង ។ Admin ចូល `5-stock/2-catalog/edit-catalog.html` ក្រោយ ដើម្បីបន្ថែម Prices ។

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ឈ្មោះទំនិញ | Text | ✅ | |
| ឈ្មោះ (អង់គ្លេស) | Text | ⚠️ | |
| SKU / លេខកូដ | Text | ✅ | Manual ឬ Auto-generate |
| Barcode | Text | ⚠️ | Scan Input |
| ប្រភេទ | Custom Dropdown | ✅ | Category |
| ឯកតា | Custom Dropdown | ✅ | ដប, ប្រអប់, kg, ដំណ... |
| Reorder Point | Number | ✅ | Min Stock Alert Threshold |
| ឃ្លាំងដំបូង | Custom Dropdown | ✅ | |
| ចំណុចស្តុកចាប់ផ្តើម | Number | ✅ | Opening Balance |
| ចំណាំ | Textarea | ⚠️ | |

❌ **Fields ហាមមាន**: ថ្លៃដើម, ថ្លៃលក់, Margin %, VAT Rate (Admin Manages these)

---

#### Page 6: `movement.html` — ប្រវត្តិចលនាស្តុក

**ការ Trace ទំនិញ** — ប្រើ ស្វែងរក Audit Trail ពេលជម្លោះ ។

**ជួរឈរ**:

| ជួរឈរ | ប្រភេទ | ឧទាហរណ៍ |
|---|---|---|
| ថ្ងៃ/ម៉ោង | DateTime | 20 កញ្ញា 2026, 09:30 |
| ប្រភេទ | Badge | 📥 ចូល / 📤 ចេញ / 🔄 Adjust |
| ទំនិញ | Text | ប្រេងម៉ាស៊ីន 5L |
| Qty ± | Number | +50 / -12 / -2 |
| យោង | Link | PO-2026-0045 / INV-2026-0120 |
| ដោយ | Text | ហ៊ុន ចន្ថា |
| ចំណាំ | Text | GRN ពី ហ៊ុន ត្រេឌីង |

**Filters**:
- ស្វែងរក Item
- Filter Type (IN / OUT / ADJUST / ALL)
- Date Range Picker

❌ **ហាមមាន**: ជួរ Cost, Value, Amount — Qty ប៉ុណ្ណោះ

---

#### Page 7: `create-movement.html` — Manual Movement Record

**ប្រើសម្រាប់ Cases ពិសេស** (Internal Transfer, Sample Out, Repair In, ...)

| Field | ប្រភេទ | Required | ចំណាំ |
|---|---|:---:|---|
| ប្រភេទ Movement | Custom Dropdown | ✅ | ចូល / ចេញ / Transfer / Sample / Return |
| ទំនិញ | Search + Select | ✅ | |
| ចំនួន | Number | ✅ | |
| ឃ្លាំងចេញ / ចូល | Custom Dropdown | ✅ | |
| ថ្ងៃ | Date | ✅ | Default: Today |
| Reference | Text | ⚠️ | INV/PO/Manual Ref |
| ចំណាំ | Textarea | ✅ | មូលហេតុ ទាមទារ |

---

#### Admin Key Pages — `5-stock/` លម្អិត

**`adjust-balance.html` (Admin)** — Full Approve Interface:
```
┌────────────────────────────────────────────────────────┐
│  Stock Adjustment — ប្រេងម៉ាស៊ីន 5L                   │
│  ស្នើ​ដោយ: ហ៊ុន ចន្ថា (Warehouse Staff) — 20/09/2026  │
├──────────────────┬──────────────────┬──────────────────┤
│  ស្តុកប្រព័ន្ធ    │  ស្តុករាប់ពិត    │  ភាពខុស          │
│  24 ដប           │  21 ដប           │  -3 ដប ⚠️         │
├──────────────────┴──────────────────┴──────────────────┤
│  ប្រភេទ: Physical Count | ចំណាំ: ស្ករ 3 ដបខូច         │
│  Evidence: [count_photo.jpg]                           │
├────────────────────────────────────────────────────────┤
│  Cost Impact: -3 × $8.50 = -$25.50  ← Admin ឃើញ     │
├────────────────────────────────────────────────────────┤
│     [✅ អនុម័ត]              [❌ បដិសេធ]              │
└────────────────────────────────────────────────────────┘
```

**`view-balance.html` (Admin)** — Full Profile ជាមួយ Prices:
- ✅ ឃើញ Current Qty, Cost Price, Selling Price
- ✅ ឃើញ Average Cost (Weighted Average)
- ✅ ឃើញ Total Stock Value = Qty × Avg Cost
- ✅ Price History (ប្រវត្តិតម្លៃទិញចូល)

---

## 5. ម៉ាទ្រីសសិទ្ធិ (Permission Matrix)

### 5.1 CRUD Matrix — Warehouse Portal

| Feature | CREATE | READ | UPDATE | DELETE |
|---|:---:|:---:|:---:|:---:|
| **Stock Balance (Qty)** | ⚠️ via GRN/Movement | ✅ Qty Only | ⚠️ via Adjustment | ❌ |
| **Stock Value/Price** | ❌ **ហាម** | ❌ **ហាម** | ❌ **ហាម** | ❌ |
| **GRN (Receiving)** | ✅ | ✅ | ⚠️ Unconfirmed | ❌ |
| **Stock Adjustment** | ✅ (Request) | ✅ | ⚠️ Pending Only | ❌ |
| **Movement Record** | ✅ (Manual) | ✅ | ❌ | ❌ |
| **Catalog (View)** | ❌ → ⚠️ Minimal | ✅ No Price | ❌ | ❌ |
| **Catalog (Price)** | ❌ **ហាម** | ❌ **ហាម** | ❌ **ហាម** | ❌ |
| **Sales Invoices** | ❌ | ❌ | ❌ | ❌ |
| **Purchase Orders** | ❌ | 👁️ Incoming Only | ❌ | ❌ |
| **Financial Data** | ❌ | ❌ **ហាម** | ❌ | ❌ |
| **HR / Payroll** | ❌ | ❌ **ហាម** | ❌ | ❌ |

> **Legend**: ✅ Full | ⚠️ Conditional | 👁️ Limited View | ❌ Forbidden

### 5.2 Module Access Matrix

| Module | Warehouse Staff | ការពន្យល់ |
|---|:---:|---|
| **Dashboard** | ✅ Stock KPIs | Qty, Alerts, Movements |
| **Stock Balance** | ✅ Qty Only | ❌ ហាមមើលតម្លៃ |
| **Stock Catalog** | 👁️ Name+SKU+Unit | ❌ ហាមមើលតម្លៃ |
| **Stock Movement** | ✅ | ❌ ហាមមើល Amount |
| **Adjustment** | ✅ Submit Only | Manager Approves |
| **Purchase Orders** | 👁️ Incoming POs | ដើម្បី Prepare Receiving |
| **Sales Orders** | 👁️ Dispatch Queue | ដើម្បីត្រៀម Pick/Pack |
| **Sales Invoices** | ❌ | ហាមទាំងស្រុង |
| **Accounting** | ❌ | ហាមទាំងស្រុង |
| **HR** | ❌ | ហាមទាំងស្រុង |
| **Reports** | 👁️ Stock Movement | Own Dept Movement Only |
| **Settings** | ❌ | Admin Only |

---

## 6. វដ្តការងារស្នូល (Core Workflows)

### Workflow 1: Receive Goods (ទទួលទំនិញ → GRN → Stock Up)

```
START
  │
  ▼
Supplier ដឹកទំនិញមក
  │
  ▼
Warehouse Staff ចូល dashboard.html
→ ឃើញ Widget: "POs Expecting Arrival Today: [PO-2026-0045]"
→ ឬ ចូល balance.html → Filter "Incoming POs"
  │
  ▼
ចុច PO → ពិនិត្យ PO Details:
  - Supplier: ហ៊ុន ត្រេឌីង
  - Items: ប្រេងម៉ាស៊ីន 5L × 50 ដប
  - ថ្ងៃ Expected: 20 កញ្ញា 2026
  │
  ▼
[Physical Action] Warehouse Staff រាប់ + ពិនិត្យ Quality
  │
  ▼
ចូល create-movement.html → GRN Mode
  │
  ├── ជ្រើស PO Reference: PO-2026-0045
  ├── Record per Line Item:
  │   - ប្រេងម៉ាស៊ីន 5L → Received: 48 ដប (PO: 50) ⚠️
  │   - Rejected: 2 ដប → Reason: "ដប ប្រេះ"
  ├── Upload Photo Evidence
  └── ចំណាំ: "ដប 2 ប្រេះ — បានបង្ហាញ Supplier Driver"
  │
  ▼
ចុច «បញ្ជាក់ GRN»
  │
  ├── ប្រព័ន្ធ Create GRN Record (GRN-2026-031)
  ├── ប្រព័ន្ធ Stock Balance ↑ (+ 48 ដប)
  ├── ប្រព័ន្ធ Update PO Status = "Partial Received"
  ├── ប្រព័ន្ធ Notify Procurement: "GRN-031 submitted — 48/50 received"
  └── Procurement ត្រួតពិនិត្យ 3-Way Match
  │
  ▼
showToast("GRN ត្រូវបានបញ្ជាក់ — ស្តុកត្រូវបានធ្វើបច្ចុប្បន្នភាព")
  │
  ▼
END
```

---

### Workflow 2: Dispatch Goods (ចេញទំនិញ → Sales Order)

```
START
  │
  ▼
Sales Staff Confirm Invoice → Sales Order ផ្ញើ Warehouse
  │
  ▼
Warehouse Staff ចូល dashboard.html
→ ឃើញ Queue: "Dispatch Queue: 3 Orders Pending"
  │
  ▼
ជ្រើស Order: INV-2026-0120
→ ពិនិត្យ Pick List:
  - ប្រេងម៉ាស៊ីន 5L × 10 ដប → Location: A-1-3
  - ទឹកស្ករ 1L × 24 ដំណ → Location: B-2-1
  │
  ▼
[Physical Action] ទៅយកទំនិញ + ពិនិត្យ
  │
  ▼
ចូល create-movement.html → Dispatch Mode
  - Reference: INV-2026-0120
  - Confirm ចំនួន Dispatched (អាចតិចជាង ប្រសិន Stock មិនគ្រប់)
  │
  ▼
ចុច «បញ្ជាក់ Dispatch»
  │
  ├── ប្រព័ន្ធ Stock Balance ↓ (- Qty Dispatched)
  ├── ប្រព័ន្ធ Record Outbound Movement
  └── ប្រព័ន្ធ Notify Sales: "Order INV-0120 dispatched"
  │
  ▼
END
```

---

### Workflow 3: Physical Count + Stock Adjustment

```
START (ការ Count ប្រចាំខែ)
  │
  ▼
Admin / Warehouse Manager បញ្ជា Physical Count Day
  │
  ▼
Warehouse Staff បោះ Count Sheet (Print ពី balance.html)
  │
  ▼
[Physical Action] រាប់ Items ម្តងមួយៗ ជាមួយ Count Sheet
  │
  ▼
ក្រោយ Count ចប់ → ចូល adjust-balance.html
  │
  ▼
Per Item ដែល Variance:
  ├── System Qty: 24 ដប
  ├── Actual Count: 21 ដប
  ├── Variance: -3 ដប
  ├── ប្រភេទ: Physical Count
  ├── ចំណាំ: "ស្ករ 3 ដបខូច — ពាំនាំ ទ Disposal"
  └── Upload: count_sheet_photo.jpg
  │
  ▼
ចុច «ដាក់ស្នើ»
  │
  ├── Status = "Pending Approval"
  └── Notification → Warehouse Manager / Admin
  │
  ▼
Admin / Warehouse Manager Review + Approve
  │
  ├── ✅ Approve → Stock Balance Auto-Update
  └── ❌ Reject → Return to Warehouse Staff + Reason
  │
  ▼
END → Stock Balanced ✅
```

---

### Workflow 4: Damaged / Expired Item Recording

```
START
  │
  ▼
Warehouse Staff ស្គាល់ Item ខូច/ផុតអាយុ
  │
  ▼
ចូល adjust-balance.html
→ ជ្រើស Item
→ ប្រភេទ: "Damaged" ឬ "Expired"
→ Qty: ចំនួនដែលខូច
→ ចំណាំ: "ប្រេងម៉ាស៊ីន 5 ដបរំសៃ — Lot ចេញពី PO-2026-0030"
→ Upload: damage_photo.jpg
  │
  ▼
ដាក់ស្នើ → Pending Approval
  │
  ▼
Admin Approve → Stock ↓ + Write-off
  │
  ▼
Accountant ឃើញ Write-off ក្នុង Accounting Module
(Inventory Loss → P&L Impact — Accountant ជាអ្នក Process)
  │
  ▼
END
```

---

### Workflow 5: Barcode Scanning (Quick Balance Check)

```
START
  │
  ▼
Warehouse Staff ប្រើ Scanner / Phone Camera
→ Scan Barcode Item
  │
  ▼
ប្រព័ន្ធ Show:
┌─────────────────────────────────────┐
│  ប្រេងម៉ាស៊ីន Shell 5L              │
│  SKU: OIL-5L-001                   │
│  ស្តុក: 21 ដប  ← Qty Only          │
│  ឃ្លាំង: A-1-3                      │
│  ស្ថានភាព: 🟢 គ្រប់ (Min: 10)       │
│                                     │
│  ❌ Cost: [HIDDEN]                  │
│  ❌ Price: [HIDDEN]                 │
└─────────────────────────────────────┘
  │
  ▼
Warehouse Staff ឃើញ Info → Action:
→ [+ Movement] → [Adjust] → [View History]
  │
  ▼
END
```

---

## 7. Business Logic — Stock Operations

### 7.1 Stock Update Rules (ច្បាប់ Update ស្តុក)

```
STOCK BALANCE TRIGGERS:

Stock IN (+):
  ├── GRN Confirmed (Warehouse confirms receiving)
  ├── Return from Customer (Sales Return)
  └── Manual Movement IN (Admin/Manager approved)

Stock OUT (-):
  ├── Sales Order Dispatched (Warehouse confirms dispatch)
  ├── Sample Out (Admin approved)
  └── Manual Movement OUT (Admin/Manager approved)

Stock ADJUST (±):
  ├── Physical Count Approved (Manager/Admin)
  ├── Damaged Write-off (Manager/Admin)
  ├── Expired Write-off (Manager/Admin)
  └── Stock Found (Manager/Admin)
```

### 7.2 Average Cost Calculation (FIFO / Weighted Average)

**ចំណាំ**: Warehouse Staff **ហាមមើល** ការគណនានេះ — Admin/Accountant ប៉ុណ្ណោះ ។ ប៉ុន្តែ Architect ត្រូវ Design ឱ្យ Correct ។

```
Method: Weighted Average Cost (Moving Average)

ឧទាហរណ៍:
  ស្តុកចូល #1: 50 ដប @ $8.00 = $400.00
  ស្តុកចូល #2: 30 ដប @ $8.50 = $255.00
  
  Average Cost = ($400 + $255) / (50 + 30) = $655 / 80 = $8.19/ដប
  
  ពេល ចេញ 20 ដប → Cost of Goods Sold = 20 × $8.19 = $163.75

ចំណុចសំខាន់:
  → Warehouse Staff ឃើញ: "ចេញ 20 ដប" ប៉ុណ្ណោះ
  → Accountant ឃើញ: "ចេញ 20 ដប @ $8.19 = $163.75"
```

### 7.3 Reorder Point System

```
Product Configuration (Admin Sets):
  reorder_point: 10 ដប
  reorder_qty:   50 ដប  (Suggested Order Amount)
  
Alert Trigger:
  IF current_qty ≤ reorder_point:
    → Dashboard 🔴 Alert
    → Telegram Notification → Procurement Manager
    → Procurement Dashboard: Reorder Alert Widget
    
Status Badges:
  qty > reorder_point * 1.5  → 🟢 គ្រប់
  reorder_point < qty ≤ reorder_point * 1.5 → 🟡 ជិតអស់
  qty ≤ reorder_point        → 🔴 ត្រូវ Reorder
  qty = 0                    → 🔴🔴 អស់ស្រប
```

### 7.4 Multi-Warehouse Logic (Phase 2)

```
ប្រសិន Multi-Warehouse Enabled:

Product: ប្រេងម៉ាស៊ីន 5L
  ├── ឃ្លាំង A (ភ្នំពេញ):  15 ដប
  ├── ឃ្លាំង B (សៀមរាប):   8 ដប
  └── Total System:        23 ដប

Transfer: ឃ្លាំង A → ឃ្លាំង B
  → Warehouse A Stock ↓
  → Warehouse B Stock ↑
  → Total unchanged (Transfer ≠ Loss/Gain)
```

---

## 8. ទំនាក់ទំនងជាមួយតួនាទីផ្សេង

```
Warehouse Staff
│
├── [RECEIVES GOODS FROM] → Supplier (Physical Delivery)
│   └── Records GRN → Updates Stock
│
├── [NOTIFIES] → Procurement Manager
│   └── GRN ចប់ → Procurement ឃើញ Partial/Full Receipt
│
├── [DISPATCHES TO] → Customer / Sales
│   └── Sales Dispatch Order → Warehouse Pick + Ship
│
├── [REQUESTS REORDER FROM] → Procurement Manager
│   └── "ប្រេងម៉ាស៊ីន ជិតអស់ — ស្នើ PO"
│
├── [SUBMITS ADJUSTMENTS TO] → Warehouse Manager / Admin
│   └── Physical Count Variance → Approval Required
│
└── [FEEDS DATA TO] → Accountant (Indirect)
    └── Stock Movement → COGS Calculation
    └── Write-offs → P&L Impact
```

**Critical Handoffs**:

| Handoff | From | To | Trigger |
|---|---|---|---|
| PO Expected | Procurement | Warehouse | PO Status = Sent |
| GRN Submitted | Warehouse | Procurement | 3-Way Match Trigger |
| Stock Alert | ប្រព័ន្ធ | Procurement | qty ≤ reorder_point |
| Dispatch Ready | Sales | Warehouse | Invoice Confirmed |
| Adjustment Request | Warehouse | Manager/Admin | Physical Count Done |
| Write-off Approved | Manager/Admin | Accountant | P&L Impact |

---

## 9. Data Scope — ឃើញអ្វី? លាក់អ្វី?

```
WAREHOUSE STAFF DATA SCOPE
│
├── ✅ ឃើញ (CAN SEE):
│   ├── Stock Balance (Qty, Unit, SKU, Location)
│   ├── Product Catalog (Name, SKU, Category, Unit)  — ❌ ហាមមើលតម្លៃ
│   ├── Incoming PO List (Supplier, Expected Date, Items, Qty)
│   │      — ❌ ហាមមើល PO Amount / Price
│   ├── Dispatch Orders (Customer Name Hidden or Initials)
│   ├── Movement History (Qty Changes Only)
│   ├── Adjustment History (Own Submissions)
│   └── Reorder Alerts
│
└── ❌ ហាមមើល (CANNOT SEE):
    ├── Any Price / Cost / Selling Price
    ├── Total Stock Value
    ├── COGS / Profit Margin
    ├── PO Total Amount
    ├── Sales Invoice Amount
    ├── Customer Contact Information
    ├── Financial Reports (P&L, Balance Sheet)
    ├── HR / Payroll
    └── Other Tenant Data
```

---

## 10. KPI Dashboard

| # | Widget | ការគណនា | Alert |
|---|---|---|---|
| 1 | 📦 Items ក្នុងស្តុក | COUNT(distinct active products) | — |
| 2 | 🔴 ស្តុកជិតអស់ | COUNT(qty ≤ reorder_point) | 🔴 ≥ 1 |
| 3 | 🔴🔴 ស្តុកអស់ | COUNT(qty = 0) | 🔴 ≥ 1 |
| 4 | 📥 ការទទួល (ថ្ងៃនេះ) | COUNT(GRN today) | — |
| 5 | 📤 ការចេញ (ថ្ងៃនេះ) | COUNT(Dispatch today) | — |
| 6 | 🔄 Adjustments Pending | COUNT(adj pending) | 🟡 ≥ 1 |
| 7 | ⏳ POs Arriving Today | COUNT(PO expected_today) | — |
| 8 | 🚚 Dispatch Queue | COUNT(orders pending dispatch) | 🔴 ≥ 5 |

---

## 11. គំរូ Database Schema

```sql
-- Core Tables for Warehouse Staff Scope

-- 1. Products / Catalog
CREATE TABLE products (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    sku                 VARCHAR(100) NOT NULL,
    barcode             VARCHAR(100),
    name_kh             VARCHAR(255) NOT NULL,
    name_en             VARCHAR(255),
    category_id         UUID REFERENCES product_categories(id),
    unit                VARCHAR(50),       -- ដប, ប្រអប់, kg, pcs
    unit_per_pack       INTEGER DEFAULT 1, -- ប៉ុន្មាន units ក្នុង 1 pack
    reorder_point       DECIMAL(10,3) DEFAULT 0,
    reorder_qty         DECIMAL(10,3) DEFAULT 0,
    description         TEXT,
    image_url           TEXT,
    status              VARCHAR(20) DEFAULT 'active',
    -- PRICE FIELDS (Admin only — API blocks Warehouse Staff access)
    cost_price          DECIMAL(15,4),     -- Last purchase cost
    avg_cost            DECIMAL(15,4),     -- Moving average cost
    selling_price       DECIMAL(15,4),
    selling_price_2     DECIMAL(15,4),     -- Wholesale price
    vat_rate            DECIMAL(5,2) DEFAULT 10,
    created_by          UUID,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Stock Balance (per Warehouse)
CREATE TABLE stock_balances (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    product_id          UUID REFERENCES products(id),
    warehouse_id        UUID REFERENCES warehouses(id),
    qty_on_hand         DECIMAL(10,3) DEFAULT 0,
    qty_reserved        DECIMAL(10,3) DEFAULT 0,   -- Reserved for Sales Orders
    qty_available       DECIMAL(10,3) GENERATED ALWAYS AS (qty_on_hand - qty_reserved) STORED,
    lot_number          VARCHAR(100),   -- Lot Tracking
    expiry_date         DATE,           -- Expiry Tracking
    last_counted_at     TIMESTAMPTZ,
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, product_id, warehouse_id, lot_number)
);

-- 3. Stock Movements (Immutable — Append Only)
CREATE TABLE stock_movements (
    id                  BIGSERIAL PRIMARY KEY,
    tenant_id           UUID REFERENCES tenants(id),
    movement_number     VARCHAR(50),    -- MVT-2026-XXXX
    product_id          UUID REFERENCES products(id),
    warehouse_id        UUID REFERENCES warehouses(id),
    movement_type       VARCHAR(30) NOT NULL,
        -- grn_in | sales_out | adjustment | transfer_in | transfer_out
        -- return_in | sample_out | damaged | expired | found | lost
    qty_change          DECIMAL(10,3) NOT NULL, -- Positive=IN, Negative=OUT
    qty_before          DECIMAL(10,3),  -- Snapshot before
    qty_after           DECIMAL(10,3),  -- Snapshot after
    reference_type      VARCHAR(50),    -- PO / Invoice / GRN / Manual
    reference_id        UUID,
    reference_number    VARCHAR(100),   -- PO-2026-0045 / INV-0120
    -- HIDDEN FROM WAREHOUSE STAFF:
    unit_cost           DECIMAL(15,4),  -- Cost at time of movement
    total_cost          DECIMAL(15,4),  -- = qty × unit_cost
    -- ----
    lot_number          VARCHAR(100),
    notes               TEXT,
    created_by          UUID,
    created_at          TIMESTAMPTZ DEFAULT NOW()
    -- NO UPDATE, NO DELETE on this table!
);

-- 4. Stock Adjustments (Approval Required)
CREATE TABLE stock_adjustments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    adjustment_number   VARCHAR(50),    -- ADJ-2026-XXXX
    product_id          UUID REFERENCES products(id),
    warehouse_id        UUID REFERENCES warehouses(id),
    adjustment_type     VARCHAR(30),
        -- physical_count | damaged | expired | lost | found
    qty_system          DECIMAL(10,3),  -- System Qty at time of request
    qty_actual          DECIMAL(10,3),  -- Warehouse physical count
    qty_variance        DECIMAL(10,3),  -- = actual - system
    reason              TEXT NOT NULL,  -- Mandatory explanation
    evidence_url        TEXT,
    status              VARCHAR(20) DEFAULT 'pending',
        -- pending | approved | rejected
    requested_by        UUID,           -- Warehouse Staff
    approved_by         UUID,           -- Warehouse Manager / Admin
    approved_at         TIMESTAMPTZ,
    rejection_reason    TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Warehouses
CREATE TABLE warehouses (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID REFERENCES tenants(id),
    name                VARCHAR(255) NOT NULL,
    code                VARCHAR(50),
    location            TEXT,
    is_default          BOOLEAN DEFAULT FALSE,
    status              VARCHAR(20) DEFAULT 'active',
    created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 12. Stock Control Logic

### 12.1 API Authorization — Price Hiding

```javascript
// Backend Middleware — Applied on all stock API responses
function applyWarehouseStaffFilter(data, userRole) {
  if (userRole === 'WAREHOUSE_STAFF') {
    // Remove price fields from response
    const HIDDEN_FIELDS = [
      'cost_price', 'avg_cost', 'selling_price',
      'selling_price_2', 'total_cost', 'unit_cost',
      'stock_value', 'margin', 'profit'
    ];
    
    return stripFields(data, HIDDEN_FIELDS);
  }
  return data;
}

// Example API Response Difference:
// Admin gets:    { qty: 24, cost_price: 8.50, total_value: 204.00 }
// WH Staff gets: { qty: 24 }  ← price fields completely removed
```

### 12.2 Adjustment Approval Flow

```
Status Machine:
  draft → pending → approved → (movement created)
                └→ rejected → back to WH Staff
                
Rules:
  - WH Staff: CREATE + Edit (draft/pending)
  - WH Manager: APPROVE / REJECT (pending only)
  - Admin: APPROVE / REJECT (any status override)
  - NOBODY: Delete approved adjustments
```

### 12.3 Stock Integrity Rules

```
Rule 1: Stock cannot go negative
  IF qty_on_hand < qty_requested (dispatch)
  → BLOCK + showToast("ស្តុកមិនគ្រប់ — ស្តុក: 5, ស្នើ: 10")

Rule 2: GRN must reference a PO
  Cannot receive goods without a PO (Phase 1)
  Exception: Admin can create Manual IN Movement

Rule 3: All movements are immutable
  stock_movements table: NO UPDATE, NO DELETE triggers
  
Rule 4: Adjustment requires approval
  Stock balance only changes AFTER admin/manager approval
  
Rule 5: Movement number is unique and sequential
  MVT-YYYY-NNNN per tenant per year
```

---

## 13. អនុសាសន៍ Architect + Prototype Planning

### 13.1 ណែនាំ Design

#### ✅ ណែនាំ 1: API-Level Price Hiding (ហាមតែ CSS/UI)

**ហាម** ប្រើ CSS `display:none` ដើម្បី Hide Price — Warehouse Staff អាច Inspect Element ។
ត្រូវ **Remove Fields ស្រួចស្រួល ពី API Response** — Middleware Level ។

#### ✅ ណែនាំ 2: Barcode Scanner Integration

Portal Warehouse ត្រូវ Support Input Method ទាំង 2:
```
1. Manual Search (Autocomplete Dropdown)
2. Barcode Scanner (USB HID / Mobile Camera)
   → Input Field auto-focus on scan
   → Press Enter → Load Item instantly
```

#### ✅ ណែនាំ 3: GRN ភ្ជាប់ PO លំដាប់

```
Receiving Flow (Strict):
  1. Warehouse Staff ជ្រើស PO Reference
  2. ប្រព័ន្ធ Load PO Items Auto
  3. WH Staff Fill Actual Qty Received
  4. System Highlight Variance Automatically
  5. WH Staff Add Note + Photo
  6. Submit → GRN Created → Stock Updated
```

#### ✅ ណែនាំ 4: Physical Count Mode

```
Phase 2 Feature:
  → Admin Triggers "Count Mode" → Freezes Stock (No IN/OUT)
  → WH Staff Count + Enter Each Item
  → System Auto-generates Adjustment Requests
  → Manager Bulk-Approve
  → "Count Mode" Unlocked
```

#### ✅ ណែនាំ 5: Movement Number Format

```
Format: MVT-YYYY-NNNN
Example: MVT-2026-0001

For GRN Specifically: GRN-YYYY-NNNN  (e.g., GRN-2026-031)
For Adjustments:      ADJ-YYYY-NNNN  (e.g., ADJ-2026-005)
For Dispatch:         DSP-YYYY-NNNN  (e.g., DSP-2026-078)
```

#### ✅ ណែនាំ 6: Lot Number + Expiry Tracking (Phase 2)

```
Feature Flag: lot_tracking = ON/OFF (per Tenant, configured by Admin)

When ON:
  → GRN ត្រូវ Record Lot Number + Expiry Date
  → FIFO / FEFO Stock deduction (First Expiry First Out)
  → Alert ពេល Expiry ≤ 30 days
  
Dashboard Widget (when enabled):
  🕐 Items Expiring in 30 days: 3 items
```

---

### 13.2 ផែនការ Prototype Pages

| # | Page | Layer | Priority | Complexity |
|---|---|---|:---:|:---:|
| 1 | `inventory-staff/dashboard.html` | Portal | 🔴 HIGH | Medium |
| 2 | `inventory-staff/balance.html` | Portal | 🔴 HIGH | Medium |
| 3 | `inventory-staff/movement.html` | Portal | 🔴 HIGH | Low |
| 4 | `inventory-staff/create-movement.html` | Portal | 🔴 HIGH | High (GRN+Dispatch) |
| 5 | `inventory-staff/adjust-balance.html` | Portal | 🟡 MED | Medium |
| 6 | `inventory-staff/catalog.html` | Portal | 🟡 MED | Low |
| 7 | `inventory-staff/create-catalog.html` | Portal | 🟢 LOW | Low (Minimal Form) |
| 8 | `5-stock/1-balance/balance.html` | Admin | 🔴 HIGH | High (+ Prices) |
| 9 | `5-stock/1-balance/adjust-balance.html` | Admin | 🔴 HIGH | High (Approval UI) |
| 10 | `5-stock/1-balance/view-balance.html` | Admin | 🟡 MED | Medium |
| 11 | `5-stock/2-catalog/catalog.html` | Admin | 🔴 HIGH | Medium |
| 12 | `5-stock/2-catalog/create-catalog.html` | Admin | 🔴 HIGH | High (+ Price Fields) |
| 13 | `5-stock/2-catalog/view-catalog.html` | Admin | 🟡 MED | Medium |
| 14 | `5-stock/3-movement/movement.html` | Admin | 🟡 MED | Medium (+ Amounts) |
| 15 | `5-stock/3-movement/view-movement.html` | Admin | 🟢 LOW | Low |

**ណែនាំ**: ចាប់ → Portal `balance.html` (No Price) → `create-movement.html` (GRN) → Admin `balance.html` (+ Price) → `adjust-balance.html` (Approval UI) ។

---

### 13.3 ការ Validate Prototype (Before Moving to Next Role)

- [ ] **Sidebar** Warehouse Portal — Menu: Dashboard, ស្តុក, ចលនា, ការកែ, Catalog
- [ ] **Header** `h-[72px]` ស្មើ Sidebar Header ពិតប្រាកដ
- [ ] **balance.html Portal** — Table Qty Only (**❌ ហាមមានជួរ Cost/Price**)
- [ ] **balance.html Admin** — Table + Cost Price + Total Value columns
- [ ] **create-movement.html** — GRN Mode + Dispatch Mode + Barcode Scan Input
- [ ] **adjust-balance.html Portal** — Form + Upload Evidence + Pending Flow
- [ ] **adjust-balance.html Admin** — Approve/Reject UI + Cost Impact visible
- [ ] **catalog.html Portal** — Read Only (**❌ ហាមមានជួរតម្លៃ**)
- [ ] **create-catalog.html Admin** — Full Form + Price Fields
- [ ] **create-catalog.html Portal** — Minimal Form (**❌ ហាមមាន Price Fields**)
- [ ] **API Price Stripping** — Verify Warehouse Staff API response ❌ cost_price field
- [ ] **Status Badges** — 🟢 គ្រប់ / 🟡 ជិតអស់ / 🔴 អស់
- [ ] **Reorder Alert Widget** ── Dashboard
- [ ] **showToast()** ជំនួស `alert()`
- [ ] **showCustomConfirm()** ជំនួស `confirm()`
- [ ] **ប៊ូតុងត្រឡប់ក្រោយ** `w-10 h-10 rounded-xl` icon-only
- [ ] **ភាសាខ្មែរ 100%** — UI Labels, Placeholders, Toasts
- [ ] **លេខអង់គ្លេស 0-9** — ចំនួន, ថ្ងៃ, Qty

---

## 14. FAQ

**Q: Warehouse Staff ទទួលទំនិញ ហើយ Stock Update ស្វ័យប្រវត្តិ ឬ ត្រូវ Approve មុន?**  
A: **ស្វ័យប្រវត្តិភ្លាម** ពេល Warehouse Staff ចុច «បញ្ជាក់ GRN» ។ Stock Balance Update ភ្លាម — ហាមត្រូវ Approve ។ GRN ត្រូវ Approve ក្នុង context ផ្សេង (Procurement 3-Way Match) ។

**Q: Stock Adjustment ស្វ័យប្រវត្តិ ឬ Approve?**  
A: **ទាមទារ Approve** — Stock Adjustment ត្រូវ Warehouse Manager / Admin Approve ។ Warehouse Staff **ដាក់ស្នើ Request ប៉ុណ្ណោះ** ។ ហេតុ: ការ Adjust Stock = Impact Financial (Cost Write-off) — ត្រូវ Check and Approve ។

**Q: ប្រសិន Stock ដែរ ប៉ុន្តែ Warehouse Staff Count ខុស — ត្រូវ Redo?**  
A: **ចាស** — ប្រសិន GRN Submit ហើយ ចង់ Correct → ត្រូវ Submit Adjustment Request ។ ហាម Edit GRN ដែល Submit រួច (Immutable) ។

**Q: Warehouse Staff ឃើញ Customer ឈ្មោះ ពេល Dispatch?**  
A: **គ្រប់ Strategy** — ក្នុង Prototype Phase 1 Warehouse Staff ឃើញ **Order Reference ប៉ុណ្ណោះ** (INV-2026-0120) ។ Customer full name/contact ហាមមើល ។ ប្រសិន ចាំបាច់ — Admin Configure Customer Display Level ។

**Q: Multi-Warehouse — Warehouse Staff A ឃើញ Stock ឃ្លាំង B ទេ?**  
A: **Admin Configure** — Default: Warehouse Staff ឃើញ **ឃ្លាំងខ្លួន ប៉ុណ្ណោះ** ។ Admin អាច Grant Cross-Warehouse Read Access ប្រសិន needed ។

**Q: Expired Item — Warehouse Staff ត្រូវ Dispose ហើយ Record?**  
A: ✅ Warehouse Staff Submit Adjustment (ប្រភេទ: Expired) + Upload Evidence ។ Admin Approve → Stock ↓ ។ Accountant ឃើញ Inventory Loss Entry ក្នុង Accounting Module ។

**Q: ប្រសិនបើ Item ថ្មី ដែលមិនទាន់ Register ក្នុង Catalog ផ្ញើ​ Delivery មក?**  
A: Warehouse Staff ប្រើ `create-catalog.html` (Portal Minimal Form) ដើម្បី Quick Register ជាមុន ។ Admin ក្រោយ Set Prices ។ ហេតុ: ត្រូវ Record GRN ពិតប្រាកដ ។

---

*ឯកសារនេះតំណាង 100% knowledge base សម្រាប់ Warehouse Staff Role ក្នុង DIGITECHKH BMS*  
*Previous Role: Procurement Manager → [`role_procurement_manager.md`](role_procurement_manager.md)*  
*Next Role: Customer Support → [`role_customer_support.md`](role_customer_support.md)*
