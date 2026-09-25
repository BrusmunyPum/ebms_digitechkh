# Super Admin — v2 UI/UX Design Plan

> **Document Version:** 2.0  
> **Last Updated:** 2026-09-25  
> **Role Folder:** `frontend/roles/01-super-admin/`  
> **Portal ID:** `saPortal`  
> **Archetype:** C — Executive Command & Governance  
> **Status:** Active Planning Reference

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | C — Executive Command & Governance |
| **Persona** | Cloud SaaS Platform Operator |
| **Color Accent** | Deep Indigo (`indigo-700` / `#4338CA`) |
| **Secondary Accent** | Slate (`slate-600` / `#475569`) |
| **Background Tone** | Cool white `slate-50` with `slate-100` card borders |
| **UI Style** | Dark command center feel. Dense information hierarchy. Authority-projecting typography. |
| **Key Persona Description** | The Super Admin is **not** a business employee of any tenant company. They are the platform operator — the SaaS provider managing ALL tenant organizations from a central control plane. They never see individual business transactions (invoices, orders, stock). Their world is: tenant health, subscription status, platform security, and onboarding. |

**Design Principle for this Role:**  
Every screen should feel like a mission control room. Data is authoritative. Actions have consequences. The UI must reinforce seriousness — no playful colors, no decorative elements. The deep indigo accent signals authority and system-level access. When the Super Admin takes an action (suspend a company, approve onboarding), the UI must confirm that action clearly and require explicit confirmation for destructive operations.

---

## 2. Sidebar Navigation

The Super Admin sidebar has exactly **4 items**. No sub-items are displayed in the sidebar. Sub-features within each section are handled via tab navigation inside the destination pages.

| # | ID | Label (Khmer) | Icon | href Target | Badge / Alert |
|---|---|---|---|---|---|
| 1 | `sa-dashboard` | ផ្ទាំងបញ្ជាការដ្ឋាន | `mdi:view-dashboard-outline` | `dashboard.html` | — |
| 2 | `sa-companies` | ក្រុមហ៊ុនជាវ | `mdi:domain` | `companies/companies.html` | — |
| 3 | `sa-subscriptions` | កញ្ចប់សេវា | `mdi:credit-card-outline` | `subscriptions/subscriptions.html` | — |
| 4 | `sa-auditlogs` | កំណត់ហេតុសកល | `mdi:clipboard-text-clock-outline` | `audit-logs/audit-logs.html` | Numeric badge — count of unreviewed critical events |

**Sidebar Design Details:**
- **Active item indicator:** 4px left border in `indigo-600` + `bg-indigo-50` background fill.
- **Inactive item text:** `text-slate-600` with `hover:bg-slate-100` on hover.
- **Active item text:** `text-indigo-700 font-semibold`.
- **Icon size:** 20px (w-5 h-5). Icon color matches text color of its state.
- **Badge for audit log item:** Small `rounded-full` pill, `bg-red-500 text-white text-xs font-bold`. Positioned top-right of the icon. Hidden when count is 0.
- **Sidebar brand header:** Height exactly `h-[72px]`. Shows DIGITECHKH logo + "eBMS" wordmark. Background: `indigo-700`. Text: white. No role label in brand header — role label appears in content header area.

---

## 3. Pages & Layouts

---

### Dashboard (`dashboard.html`)

**Purpose:** The Super Admin's action-first command center, showing platform health, critical KPIs, pending onboarding actions, and recent system events — with zero charts.

**Layout:**  
Single-column, full-width content area. Top-to-bottom stacked sections with `gap-6` spacing. No side panels. No columns wider than the content area.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Page title — "ផ្ទាំងបញ្ជាការដ្ឋាន" (`font-semibold text-xl text-slate-800`)
- Left sub: Current date displayed below the title (`text-sm text-slate-400 font-normal`)
- Right: Admin name + avatar chip (read-only, no dropdown from dashboard header — this is only an identity display)

---

**Section A — System Health Status Banner**

A slim full-width bar directly below the content header. Height: `h-14`. Background: `bg-indigo-700` (indigo-toned to match role identity, signals system-level context). Contains three inline metrics separated by vertical dividers:

- **Platform Uptime:** Shows percentage (e.g., `99.98%`). Label: "ភាពដំណើរការប្រព័ន្ធ". Value in `font-bold text-white`.
- **Active Sessions:** Shows count of currently logged-in users across all tenants (e.g., `142`). Label: "វគ្គសកម្ម". Value in `font-bold text-white`.
- **Storage Used:** Shows percentage of total platform storage used (e.g., `67%`). Label: "ទំហំស្តុកទិន្នន័យ". Value in `font-bold text-white`. If > 85%, turns `text-red-300` with a warning icon.

This banner is informational only — no click actions. It reads from `getPlatformKPIs()` in `data.js`.

---

**Section B — 4 KPI Cards**

A horizontal row of 4 equal-width cards. Uses CSS grid: `grid grid-cols-4 gap-6`. Each card: `bg-white rounded-2xl border border-slate-200/70 p-6`.

| Card # | Metric Label (Khmer) | Data Source | Icon | Color Accent |
|---|---|---|---|---|
| 1 | ក្រុមហ៊ុនសកម្ម | Count of tenants with status `active` | `mdi:domain` | `indigo-600` |
| 2 | ការជាវជិតផុតកំណត់ | Count of subscriptions expiring within 7 days | `mdi:clock-alert-outline` | `amber-500` |
| 3 | ក្រុមហ៊ុនត្រូវបានផ្អាក | Count of tenants with status `suspended` | `mdi:domain-off` | `red-500` |
| 4 | កំហុសប្រព័ន្ធ | Count of system error events in last 24h | `mdi:alert-circle-outline` | `red-600` |

Each card layout (top-to-bottom):
1. Icon (w-10 h-10, in a `rounded-xl` colored background chip matching the card's accent color at 10% opacity)
2. Metric label: `text-sm font-medium text-slate-500`
3. Value: `text-3xl font-semibold text-slate-800` (Arabic numeral always)
4. Trend indicator: Small arrow icon + percentage change from yesterday. `text-xs font-medium`. Green up arrow if positive, red down arrow if negative.
5. "View more" link text at bottom right: `text-xs text-indigo-600 hover:underline` — links to the relevant list page. (This is the only clickable element on a KPI card.)

**No click-to-expand on the card body itself.** Only the "view more" link is interactive.

---

**Section C — Quick Action Buttons**

A horizontal strip of 3 action buttons. Container: `bg-white rounded-2xl border border-slate-200/70 p-6`. Section label above buttons: "សកម្មភាពរហ័ស" (`text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4`).

| # | Button Label (Khmer) | Icon | Action | Style |
|---|---|---|---|---|
| 1 | + បង្កើតក្រុមហ៊ុនថ្មី | `mdi:plus-circle-outline` | Navigate to `companies/create-company.html` | Primary — `bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl h-10 px-5 font-semibold` |
| 2 | បន្តការជាវ | `mdi:credit-card-refresh-outline` | Navigate to `subscriptions/subscriptions.html` with `?action=renew` param pre-selecting renewal tab | Secondary — `bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl h-10 px-5 font-medium` |
| 3 | មើលកំណត់ហេតុប្រព័ន្ធ | `mdi:clipboard-text-search-outline` | Navigate to `audit-logs/audit-logs.html` | Secondary — same style as button 2 |

Buttons are left-aligned with `gap-3` between them. The row does NOT stretch buttons to fill width — buttons are content-sized.

---

**Section D — Urgent Task Queue (Pending Onboarding Verification)**

A white card (`bg-white rounded-2xl border border-slate-200/70 p-6`) below the Quick Actions strip.

Section header:
- Left: "ក្រុមហ៊ុនកំពុងរង់ចាំការផ្ទៀងផ្ទាត់" (`font-semibold text-slate-800`)
- Right: Count badge (e.g., "3 ស្នើសុំ") in `bg-amber-100 text-amber-700 rounded-full px-3 py-0.5 text-sm font-medium`
- Far right: "មើលទាំងអស់" link → navigates to `companies/companies.html?status=pending`

Queue list (up to 10 items, no pagination here):  
Each item is a horizontal row with `py-4 border-b border-slate-100 last:border-b-0 flex items-center gap-4`:

1. **Company avatar:** `w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm` — shows 2-letter company initial.
2. **Company info (flex column):**
   - Company name: `font-semibold text-slate-800 text-sm`
   - Registered date + plan type: `text-xs text-slate-400` (e.g., "បានចុះឈ្មោះ ០៥/០៩/២០២៦ · Starter")
3. **Status chip:** `bg-amber-50 text-amber-600 rounded-full px-2.5 py-0.5 text-xs font-medium` — label: "កំពុងរង់ចាំ"
4. **Approve button:** `bg-indigo-600 text-white rounded-xl h-8 px-4 text-xs font-semibold hover:bg-indigo-700` — label: "អនុម័ត"  
   - Clicking Approve triggers a **custom confirmation dialog** (not `confirm()`): "តើអ្នកចង់អនុម័តក្រុមហ៊ុន [Name] មែនទេ?" with [យល់ព្រម] [បោះបង់] buttons.  
   - On confirm: sends API call, updates status, removes item from queue with a smooth slide-out animation, shows a success toast.
5. **View link:** `text-xs text-slate-400 hover:text-indigo-600 ml-2` — "មើលលម្អិត" → navigates to `companies/view-company.html?id=XXX`

Empty state: When queue is empty, show centered illustration (subtle indigo icon) + text "មិនមានស្នើសុំចាំការផ្ទៀងផ្ទាត់ទេ" (`text-slate-400 text-sm`).

---

**Section E — Recent Activity Feed**

A white card below the Urgent Task Queue. Shows the last 5 system-level events.

Section header: "សកម្មភាពចុងក្រោយ" (`font-semibold text-slate-800`)

Each feed item (plain list, no table structure):
- Row: `flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0`
- Left: Color-coded dot (`w-2 h-2 rounded-full mt-1.5`) — green for creates, amber for edits, red for deletions/suspensions, `slate-300` for read/login events.
- Middle: Event description text (`text-sm text-slate-700`) + actor info below (`text-xs text-slate-400` — e.g., "ដោយ admin@digitechkh.com")
- Right: Timestamp (`text-xs text-slate-400`) — relative format (e.g., "១០ នាទីមុន") for events today; absolute date otherwise.

"មើលកំណត់ហេតុទាំងអស់" link at bottom of card → navigates to `audit-logs/audit-logs.html`.

**Data source:** `getAuditLogs({ limit: 5, role: 'super-admin' })` from `data.js`.

---

**Rules & Constraints for Dashboard:**
- NO ECharts, NO chart library imports on this page.
- NO date range filter — all data reflects current state / last 24 hours.
- NO modals opened from this page — all actions navigate to full pages or use the inline custom confirmation dialog for the Approve action.
- KPI cards cap: exactly 4. Never add a 5th card.
- Urgent queue: shows max 10 items. "View all" link for overflow.
- The status banner values (uptime, sessions, storage) should be refreshed every 60 seconds via a lightweight polling interval (no full page reload).

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/dashboard.html` — **REBUILD** (remove existing ECharts, apply v2 Action-First layout)

---

### Company List (`companies/companies.html`)

**Purpose:** The master list of all tenant companies registered on the platform, with search, status filtering, and row-level management actions.

**Layout:**  
Full-width content area. Content header bar at top. Filter strip below header. Full-width table filling remaining vertical space.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Page title — "ក្រុមហ៊ុនជាវ" (`font-semibold text-xl text-slate-800`)
- Right: Primary action button — "[+ ចុះឈ្មោះក្រុមហ៊ុនថ្មី]" (`bg-indigo-600 text-white rounded-xl h-10 px-5 font-semibold hover:bg-indigo-700`)

---

**Section A — Search & Filter Strip**

Positioned directly below the content header. Contains:
1. **Search bar** (left-anchored): `w-72` input with magnifying glass icon. Placeholder: "ស្វែងរកឈ្មោះ, លេខ TIN...". Searches against: company name (KH), company name (EN), TIN, company code.
2. **Status filter tabs** (right of search, separated by spacer): Tab strip with 4 tabs:
   - "ទាំងអស់" (All)
   - "សកម្ម" (Active) — shows count badge
   - "ជិតផុតកំណត់" (Expiring) — shows count badge in `amber-500`
   - "ត្រូវបានផ្អាក" (Suspended) — shows count badge in `red-500`
   
   Active tab: `border-b-2 border-indigo-600 text-indigo-700 font-semibold`. Inactive: `text-slate-500 hover:text-slate-700`.

---

**Section B — Company Table**

Full-width table (`w-full`). No horizontal scroll unless content genuinely overflows. Sticky table header.

| Column | Content | Width | Notes |
|---|---|---|---|
| Company Code | Short alphanumeric code (e.g., `COMP-0042`) | `w-32` | `font-mono text-xs text-slate-500` |
| ឈ្មោះក្រុមហ៊ុន | Avatar initial + company name (KH) + company name (EN) below | flex-1 | Avatar: `w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs` centered initial |
| លេខ TIN | Tax ID number | `w-36` | `font-mono text-sm` |
| កញ្ចប់ | Plan badge chip | `w-28` | Chip styles: Starter=`slate`, Professional=`sky`, Enterprise=`violet` — each `rounded-full px-2.5 py-0.5 text-xs font-medium` |
| អ្នកប្រើ | "X / Y" format (used / quota) | `w-24` | `text-sm text-slate-600`. If used ≥ 90% of quota, show value in `text-amber-600 font-semibold` |
| ផុតកំណត់ | Expiry date `DD/MM/YYYY` | `w-32` | If ≤ 7 days, show in `text-red-600 font-semibold` with a warning icon |
| ស្ថានភាព | Status badge | `w-28` | Active=`bg-emerald-50 text-emerald-700`, Expiring=`bg-amber-50 text-amber-700`, Suspended=`bg-red-50 text-red-700` |
| — | ⋮ action menu | `w-12` | Right-aligned ellipsis button |

**⋮ Action Menu items per row:**
- "មើលលម្អិត" → `view-company.html?id=X`
- "កែប្រែ" → `edit-company.html?id=X`
- Divider line
- "បន្តការជាវ" → opens inline renewal flow (navigates to `subscriptions/subscriptions.html?company=X&action=renew`)
- "ផ្អាក / ធ្វើឲ្យសកម្ម" → Custom confirmation dialog. If currently Active, action is "Suspend". If Suspended, action is "Activate". Color of confirm button changes accordingly (red for Suspend, green for Activate).

**Row styling:**
- `hover:bg-slate-50` on each row.
- Selected rows (future bulk action support): `bg-indigo-50`.
- Table header row: `bg-slate-50 border-b border-slate-200`. Header text: `text-xs font-semibold text-slate-500 uppercase tracking-wide`.

---

**Section C — Pagination**

Standard custom pagination component at the bottom. Shows: "បង្ហាញ X–Y នៃ Z លទ្ធផល" + Previous/Next buttons + page number buttons.

---

**Rules & Constraints:**
- Status filter tabs drive the table query — switching tabs re-fetches with `{ status: 'active' | 'expiring' | 'suspended' | null }`.
- No inline Edit/Delete/Activate buttons visible on the row — all actions are in ⋮ menu only.
- "Expiring" tab shows companies with `daysUntilExpiry <= 7`.
- Table is sortable by: Company Name, Expiry Date, User Count (click column header to toggle ASC/DESC).
- Data source: `getTenants({ status, search, page, sort })` from `data.js`.

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/companies/companies.html` — **REBUILD** with v2 table standards

---

### Register New Company (`companies/create-company.html`)

**Purpose:** Full-page form for the Super Admin to register a new tenant company on the platform.

**Layout:**  
Content header with back button + page title. Below: single-column form with grouped card sections. Save button in the page header (right side) AND at the bottom of the form.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Back button (standard — `w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70` with `mdi:arrow-left` icon) + Page title "ចុះឈ្មោះក្រុមហ៊ុនថ្មី" (`font-semibold text-xl text-slate-800`)
- Right: Save button — "បង្កើតក្រុមហ៊ុន" (`bg-indigo-600 text-white rounded-xl h-10 px-6 font-semibold hover:bg-indigo-700`)

---

**Form Card 1 — ព័ត៌មានក្រុមហ៊ុន (Company Information)**

Card: `bg-white rounded-2xl border border-slate-200/70 p-6`  
Section title: `text-base font-semibold text-slate-800 mb-6`

Fields in a 2-column grid (`grid grid-cols-2 gap-6`):

| Field Label (Khmer) | Field Type | Validation | Notes |
|---|---|---|---|
| ឈ្មោះក្រុមហ៊ុន (ខ្មែរ) | text input | Required | Khmer company name |
| ឈ្មោះក្រុមហ៊ុន (អង់គ្លេស) | text input | Required | English company name |
| លេខ TIN | text input | Required, unique | Tax ID — validates format on blur |
| លេខទំនាក់ទំនង | text input | Required | Phone number |
| អាសយដ្ឋាន | textarea (span full width) | Required | Full address |
| រូបភាពក្រុមហ៊ុន (Logo) | file upload input | Optional | Accepts PNG/JPG. Shows preview thumbnail after selection. Custom styled upload area — not native file input. Drag-and-drop supported. |

---

**Form Card 2 — ទំនាក់ទំនងអ្នកទទួលខុសត្រូវ (Contact Person / Company Admin)**

Fields in a 2-column grid:

| Field Label (Khmer) | Field Type | Validation |
|---|---|---|
| ឈ្មោះពេញ | text input | Required |
| ទំនាក់ទំនង | text input | Required — phone or email |
| អ៊ីមែល (Admin Account) | email input | Required, unique across platform |
| តួនាទី | text input | e.g., "ប្រធានក្រុមហ៊ុន" |

---

**Form Card 3 — ជ្រើសរើសកញ្ចប់សេវា (Subscription Plan Selector)**

Full-width card. Contains 3 horizontal **radio-style plan cards** side by side (`grid grid-cols-3 gap-4`).

Each plan card:
- Border: default `border-2 border-slate-200 rounded-2xl p-5`. When selected: `border-indigo-600 bg-indigo-50`.
- Plan name: `font-bold text-slate-800 text-base`
- Price: `text-2xl font-bold text-indigo-700` (e.g., `$49/ខែ`)
- Feature list: bulleted list of 4–5 plan features (`text-sm text-slate-600`)
- User quota: `"អ្នកប្រើប្រាស់: X នាក់"` (`text-sm font-medium text-slate-700`)
- Selected state indicator: Checkmark icon in `indigo-600` top-right corner of card

Plans:
- **Starter** — basic features, 10 users
- **Professional** — full features, 50 users
- **Enterprise** — full features + priority support, unlimited users

---

**Form Card 4 — គណនីAdmin ដំបូង (Initial Admin Account)**

Fields in a 2-column grid:

| Field Label (Khmer) | Field Type | Validation |
|---|---|---|
| ឈ្មោះអ្នកប្រើ | text input | Required, auto-suggested from email |
| ពាក្យសម្ងាត់ | password input | Required, min 8 chars, show/hide toggle |
| បញ្ជាក់ពាក្យសម្ងាត់ | password input | Required, must match |
| តួនាទី | read-only text | Pre-filled as "Admin / General Manager" — cannot be changed at creation |

---

**Save Button (Bottom)**

Full-width area below last card: right-aligned "បង្កើតក្រុមហ៊ុន" button (same style as header). "បោះបង់" secondary button left of it.

---

**Rules & Constraints:**
- TIN must be validated as unique — show inline error if duplicate detected.
- Admin email must be unique across the entire platform.
- Plan selection is required — form cannot submit without a plan selected.
- Logo upload: max 2MB, PNG/JPG only. Client-side validation.
- All validation errors shown as inline messages below the field (`text-xs text-red-500 mt-1`), not as alert dialogs.
- No `alert()` or `confirm()` anywhere on this page.

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/companies/create-company.html` — **NEW FILE**

---

### Edit Company (`companies/edit-company.html`)

**Purpose:** Full-page pre-filled form allowing the Super Admin to modify an existing tenant company's information and settings.

**Layout:**  
Identical structure to `create-company.html` but with pre-populated field values. Additionally includes a **Danger Zone** section at the very bottom.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Back button (standard) + Page title "កែប្រែក្រុមហ៊ុន — [Company Name]"
- Right: Save button — "រក្សាទុកការផ្លាស់ប្ដូរ" (`bg-indigo-600 text-white rounded-xl h-10 px-6 font-semibold`)

---

**Form Cards 1–4:**  
Same layout and fields as `create-company.html` but all fields are pre-filled with existing data.

- **Plan selector:** Shows currently selected plan highlighted. Changing plan updates fields dynamically (e.g., user quota display).
- **Logo upload:** Shows current logo thumbnail with "ផ្លាស់ប្ដូររូបភាព" button overlay on hover.
- **Admin Account section (Card 4):** Password fields are empty (not pre-filled for security). A note appears: "ទុកប្នចេញប្រសិនបើអ្នកមិនចង់ផ្លាស់ប្ដូរពាក្យសម្ងាត់". If left blank, password is not changed.

---

**Danger Zone Card** (bottom, after all form cards)

Card styling: `bg-white rounded-2xl border-2 border-red-200 p-6`  
Section title: "តំបន់គ្រោះថ្នាក់" (`font-semibold text-red-600 mb-4`)  
Section subtitle: `text-sm text-slate-500 mb-6` — "សកម្មភាពទាំងនេះមិនអាចត្រឡប់វិញបានទេ។ សូមអានដោយប្រុងប្រយ័ត្ន។"

Two actions in a row:

1. **ផ្អាកក្រុមហ៊ុន (Suspend Company)**
   - Button: `border border-amber-400 text-amber-600 hover:bg-amber-50 rounded-xl h-10 px-5 font-medium`
   - If company is already suspended, button reads "ធ្វើឲ្យក្រុមហ៊ុនសកម្ម" in green tones instead.
   - Click triggers custom confirmation dialog: "ការផ្អាកនឹងបិទការចូលប្រើប្រាស់ទាំងអស់សម្រាប់ក្រុមហ៊ុននេះ..."

2. **លុបក្រុមហ៊ុន (Delete Company)**
   - Button: `border border-red-400 text-red-600 hover:bg-red-50 rounded-xl h-10 px-5 font-medium`
   - Click triggers a two-step custom confirmation:
     - Step 1: Warning dialog explaining consequences.
     - Step 2: User must type the company name exactly to confirm deletion. A text input appears with placeholder: "វាយឈ្មោះក្រុមហ៊ុនដើម្បីបញ្ជាក់". Delete button stays disabled until name matches.
   - This is a hard delete — the UI must make clear this is irreversible.

---

**Rules & Constraints:**
- Company code is **read-only** on the edit page — it cannot be changed after creation.
- Changing the subscription plan on the edit page does NOT immediately renew/extend — it only changes the plan type. Renewal is a separate action via the subscriptions page.
- Deleting a company requires name-match confirmation. Backend also requires this as a second factor.
- If company has any `active` users, the suspend confirmation must also show: "ក្រុមហ៊ុននេះមាន [X] អ្នកប្រើប្រាស់សកម្ម។ ការចូលប្រើប្រាស់ទាំងអស់នឹងបិទ។"

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/companies/edit-company.html` — **NEW FILE**

---

### Company Detail View (`companies/view-company.html`)

**Purpose:** Read-only comprehensive view of a single tenant company, organized into tabs for different data categories.

**Layout:**  
Content header bar + Company identity hero section + Tab strip + Tab content area.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Back button (standard) + Page title "ព័ត៌មានលម្អិតក្រុមហ៊ុន"
- Right: Two action buttons — "[កែប្រែ]" (`border border-slate-300 text-slate-700 rounded-xl h-10 px-5`) + "[បន្តការជាវ]" (`bg-indigo-600 text-white rounded-xl h-10 px-5`)

---

**Company Identity Hero Section**

A white card (`bg-white rounded-2xl border border-slate-200/70 p-6 mb-6`) below the header. Uses a horizontal flex layout:

- **Left:** Large company logo/avatar (`w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-2xl` — shows 2-letter initial if no logo)
- **Center (flex column):**
  - Company name (KH): `font-bold text-xl text-slate-800`
  - Company name (EN): `font-medium text-slate-500`
  - TIN: `text-sm text-slate-400 font-mono`
- **Right:** Status badge (large) + Plan badge + Expiry date info

---

**Tab Navigation Strip**

Positioned below the hero section. 4 tabs:

| # | Tab Label (Khmer) | Content |
|---|---|---|
| 1 | ព័ត៌មានទូទៅ | General company info display |
| 2 | អ្នកប្រើប្រាស់ | Users list table for this company |
| 3 | ប្រវត្តិការជាវ | Subscription history table |
| 4 | កំណត់ហេតុ | Activity log for this company |

Tab strip styling: `border-b border-slate-200`. Active tab: `border-b-2 border-indigo-600 text-indigo-700 font-semibold -mb-px`. Inactive: `text-slate-500 hover:text-slate-700 pb-3 px-4`.

---

**Tab 1 — ព័ត៌មានទូទៅ (General Info)**

Displays all company fields in a structured read-only format. Two-column grid of labeled data pairs:

- ឈ្មោះក្រុមហ៊ុន (ខ្មែរ) / ឈ្មោះក្រុមហ៊ុន (អង់គ្លេស)
- លេខ TIN / លេខទំនាក់ទំនង
- អាសយដ្ឋាន (full width)
- ថ្ងៃចុះឈ្មោះ / ថ្ងៃផុតកំណត់ការជាវ
- ឈ្មោះអ្នកទំនាក់ទំនង / អ៊ីមែលអ្នកទំនាក់ទំនង
- កញ្ចប់សេវា / ចំនួនអ្នកប្រើប្រាស់ (used / quota)

Each data pair: label in `text-sm text-slate-500`, value in `text-sm font-medium text-slate-800`.

---

**Tab 2 — អ្នកប្រើប្រាស់ (Users)**

A table of all users within this company. Columns:

| Column | Content |
|---|---|
| ឈ្មោះ | User full name + avatar initial |
| តួនាទី | Role badge (e.g., "Sales Executive", "Cashier") |
| ការចូលចុងក្រោយ | Last login timestamp |
| ស្ថានភាព | Active / Inactive / Locked badge |

No create/edit/delete actions on this tab — read-only for Super Admin. Users are managed within the tenant's own admin portal.

---

**Tab 3 — ប្រវត្តិការជាវ (Subscription History)**

A table of all subscription events for this company. Columns:

| Column | Content |
|---|---|
| ថ្ងៃ | Date of subscription event |
| ប្រភេទ | Event type: "ចុះឈ្មោះ" / "បន្ត" / "ធ្វើឲ្យប្រសើរ" / "ផ្អាក" |
| កញ្ចប់ | Plan type at that event |
| រយៈពេល | Duration (e.g., "១ ឆ្នាំ") |
| ចំនួនទឹកប្រាក់ | Amount paid (USD) |
| ស្ថានភាព | Paid / Pending / Refunded |

---

**Tab 4 — កំណត់ហេតុ (Activity Log for this Company)**

Displays a timeline of all system events related to this company. Same styling as the main audit log page but filtered to this company only.

Each entry: timestamp + action description + actor (user or "system") + IP address.

Color coding: red for deletions/suspensions, amber for edits, green for creates, `slate-400` for login/read events.

---

**Rules & Constraints:**
- All content on this page is **read-only**. No inline editing.
- Tab content loads dynamically on tab click — do not load all 4 tabs simultaneously.
- The "[කែប្រែ]" button in the header navigates to `edit-company.html?id=X`.
- "[បន្តការជាវ]" navigates to `subscriptions/subscriptions.html?company=X&action=renew`.
- Data source: `getTenants({ id })`, `getTenantUsers({ tenantId })`, `getSubscriptionHistory({ tenantId })`, `getAuditLogs({ tenantId })` from `data.js`.

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/companies/view-company.html` — **NEW FILE**

---

### Subscription Plans & Analytics (`subscriptions/subscriptions.html`)

**Purpose:** The Super Admin's analytics hub for subscription revenue, tenant distribution by plan, and MRR trends. **This is the designated ECharts page for this role** — charts are intentionally placed here, not on the dashboard.

**Layout:**  
Content header bar + Plan overview card strip + ECharts section + Subscription table below.

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Page title — "កញ្ចប់សេវា & វិភាគការជាវ"
- Right: Date range filter (custom component — start/end date inputs) + Export CSV button

---

**Section A — Plan Overview Cards**

3 horizontal cards in `grid grid-cols-3 gap-6`. Each card represents one plan tier.

Each plan card (`bg-white rounded-2xl border border-slate-200/70 p-6`):
- Plan name badge at top (colored by plan: Starter=slate, Professional=sky, Enterprise=violet)
- Monthly price: `text-3xl font-bold text-slate-800`
- Feature bullet list: `text-sm text-slate-500`
- Active tenant count: `text-2xl font-semibold text-indigo-700` + label "ក្រុមហ៊ុនសកម្ម"
- Monthly revenue contribution: `text-sm font-medium text-emerald-600`
- "មើលទាំងអស់" link → filters the subscription table below to this plan

---

**Section B — ECharts Combined Chart**

A white card (`bg-white rounded-2xl border border-slate-200/70 p-6`). Contains a single ECharts instance with a combined bar + line chart:

- **Bar chart:** Monthly Recurring Revenue (MRR) in USD — one bar per month for the selected date range.  
  - Y-axis (left): Revenue in USD  
  - Bar color: `indigo-500` gradient fill  
  - Tooltip: shows exact MRR for the hovered month

- **Line chart (overlaid):** Tenant count — active tenants at end of each month.  
  - Y-axis (right): Count of tenants  
  - Line color: `emerald-500`, smooth curve, filled area below line at 15% opacity  
  - Data points: dots at each month

- Chart title: "ចំណូលប្រចាំខែ & ចំនួនក្រុមហ៊ុន" — displayed above the chart  
- Legend: Below chart title, showing "MRR (USD)" and "ចំនួនក្រុមហ៊ុន"  
- Responsive: chart resizes with container width

---

**Section C — Subscription Table**

Full-width table listing all subscriptions. Default sorted by expiry date ASC (soonest expiring first).

| Column | Content |
|---|---|
| ក្រុមហ៊ុន | Company name + avatar |
| កញ្ចប់ | Plan badge |
| ថ្ងៃចាប់ផ្ដើម | Subscription start date |
| ថ្ងៃផុតកំណត់ | Expiry date (red if ≤ 7 days) |
| ចំណូល/ខែ | Monthly fee (USD) |
| ស្ថានភាព | Active / Expiring / Suspended / Cancelled badge |
| — | ⋮ action menu |

**⋮ Actions:** "មើលក្រុមហ៊ុន" → view-company.html | "បន្តការជាវ" → renewal flow | "ផ្អាក" → suspend confirmation

---

**Rules & Constraints:**
- Date range filter drives both the ECharts data AND the subscription table filter.
- ECharts must only initialize after data is fetched — do not render with empty/placeholder data.
- If `?company=X&action=renew` query params are present (from other pages linking here), pre-filter the table to that company and scroll to the table.
- Chart and table both respect the selected date range.
- Export button exports the current filtered table as CSV (client-side generation, no server round-trip).
- Data source: `getPlatformKPIs({ dateRange })`, `getTenants({ plan, dateRange, page })` from `data.js`.

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/subscriptions/subscriptions.html` — **REBUILD** (was previously a plain list — add ECharts and plan cards)

---

### Global Audit Log (`audit-logs/audit-logs.html`)

**Purpose:** A searchable, filterable timeline of all system-wide security and activity events across all tenant companies — the Super Admin's primary governance and security monitoring tool.

**Layout:**  
Content header bar + Filter row + Timeline log list (not a table).

---

**Content Header Bar** (`h-[72px] px-6 flex-shrink-0`)
- Left: Page title — "កំណត់ហេតុសកល" + Alert badge (count of critical/unreviewed events in `bg-red-500 text-white rounded-full px-2 text-xs font-bold`)
- Right: Export CSV button (`border border-slate-300 text-slate-700 rounded-xl h-10 px-5 font-medium` with download icon)

---

**Section A — Filter Row**

A white card (`bg-white rounded-2xl border border-slate-200/70 p-4`) with filters in a horizontal flex row:

1. **Date range filter** (custom component): Start date / End date inputs. Default: last 7 days.
2. **Action Type dropdown** (custom, not native `<select>`): Options: "ទាំងអស់" / "បង្កើត" / "កែប្រែ" / "លុប" / "ចូលប្រព័ន្ធ" / "ផ្អាក" / "អនុម័ត". Each option has a color dot matching the timeline color coding.
3. **Company dropdown** (custom): Searchable dropdown of all tenant companies. Default: "ក្រុមហ៊ុនទាំងអស់".
4. **User dropdown** (custom): Searchable dropdown of all platform users (across all tenants). Default: "អ្នកប្រើប្រាស់ទាំងអស់".
5. **[អនុវត្ត] button**: Applies all filters. Styled as `bg-indigo-600 text-white rounded-xl h-10 px-5 font-medium`.
6. **[ជម្រះ] button**: Resets all filters to defaults. `text-slate-500 hover:text-slate-700 h-10 px-3`.

---

**Section B — Timeline Log List**

A white card (`bg-white rounded-2xl border border-slate-200/70 p-6`). Displays log entries in a **vertical timeline** format, NOT a standard table.

Timeline component structure:
- Left: A vertical line (`border-l-2 border-slate-200`) running top to bottom. At each entry, a colored circle (`w-3 h-3 rounded-full`) is on the line.
- Right: Entry content.

Each log entry:

```
[●] [timestamp] — [action verb in Khmer]
    [user name] · [company name] · [IP address]
    [optional detail text if action has context, e.g., "ផ្លាស់ប្ដូរពី Active → Suspended"]
```

Color coding for timeline dots:

| Action Category | Dot Color | Tailwind Class |
|---|---|---|
| Create (បង្កើត) | Green | `bg-emerald-500` |
| Edit (កែប្រែ) | Amber | `bg-amber-500` |
| Delete (លុប) | Red | `bg-red-500` |
| Suspend / Deactivate | Red-orange | `bg-orange-500` |
| Login / Logout | Slate | `bg-slate-400` |
| Approve (អនុម័ត) | Indigo | `bg-indigo-500` |
| System error | Dark red | `bg-red-700` |

Each entry background:
- Critical actions (Delete, Suspend): `bg-red-50` tinted row
- Edits: `bg-amber-50` tinted row
- Creates: no background tint (white)
- Reads/logins: no background tint (white)

---

**Section C — Load More**

At the bottom of the timeline, a "បង្ហាញបន្ថែម" button loads the next page of results (infinite scroll style, but button-triggered rather than automatic). Shows "Showing X of Y events" count above the button.

---

**Rules & Constraints:**
- Log entries are **read-only**. No editing, deletion, or flagging UI is present for the Super Admin (audit logs are immutable).
- Date range filter is required — default to last 7 days to prevent loading millions of records.
- The sidebar badge count for this nav item = count of `severity: 'critical'` events in the last 24h that have not been "viewed" (a simple localStorage-based read tracking is acceptable for v2).
- Export exports the current filtered result set as CSV.
- Timeline loads 50 entries per page.
- Data source: `getAuditLogs({ dateRange, actionType, tenantId, userId, page })` from `data.js`.

**Files to Create/Modify:**
- `frontend/roles/01-super-admin/audit-logs/audit-logs.html` — **REBUILD** (was previously a plain table — rebuild as timeline)

---

## 4. UI Identity Details

| Property | Specification |
|---|---|
| **Primary Color** | Deep Indigo — `indigo-700` (#4338CA) |
| **Accent / CTA** | `indigo-600` (#4F46E5) for buttons, active states |
| **Hover State** | `indigo-700` (#4338CA) for primary buttons |
| **Background** | `slate-50` (#F8FAFC) — cool white page background |
| **Card Background** | Pure white `#FFFFFF` with `border border-slate-200/70` |
| **Sidebar Background** | `indigo-700` (#4338CA) — dark indigo, full height |
| **Sidebar Active Item** | `bg-indigo-600/50` + left border `border-l-4 border-white` |
| **Sidebar Text** | `text-indigo-100` inactive, `text-white font-semibold` active |
| **Sidebar Icon** | `text-indigo-300` inactive, `text-white` active |
| **Status Badge Colors** | Active=emerald, Expiring=amber, Suspended=red, Draft=slate |
| **Font Weight Usage** | Page titles: `font-semibold` / Section headings: `font-semibold` / Table data: `font-medium text-slate-700` / Labels: `font-normal text-slate-500` / KPI values: `font-semibold text-slate-800` |
| **Unique Design Element** | Dark indigo sidebar (not slate — unlike other Archetype C roles). The sidebar itself has the role's deepest color. This signals the Super Admin is at the root authority level — not inside a business context. |
| **Shadow Usage** | Cards use no `shadow-*` class — borders only (`border border-slate-200/70`). Subtle and flat. |
| **Border Radius** | Cards: `rounded-2xl`. Buttons: `rounded-xl`. Input fields: `rounded-xl`. Avatars: `rounded-xl` (square-ish, not circular). |

---

## 5. Developer Notes

### `portal.js` Changes Required

The Super Admin portal (`saPortal`) nav configuration already reflects the v2 plan structure with minor updates needed:

- **Update nav label** for item 4: change from `"Audit Logs"` to `"កំណត់ហេតុសកល"` if not already in Khmer.
- **Add `alertBadge: true`** property to the audit-logs nav item in the config. The badge count value should be populated from `getPlatformKPIs().criticalEventCount`.
- **Confirm `href` paths** match the sub-folder structure: `companies/companies.html`, `subscriptions/subscriptions.html`, `audit-logs/audit-logs.html`.
- **Role color config:** Ensure `saPortal.accentColor = 'indigo'` is set so shared components (KPI cards, buttons, active states) pick up the correct color token.

### ECharts Migration

| Page | v1 Status | v2 Action |
|---|---|---|
| `dashboard.html` | Has ECharts revenue/tenant charts | **REMOVE** all ECharts. Delete chart container divs and ECharts import. Keep only KPI cards and action components. |
| `subscriptions/subscriptions.html` | Was a plain subscription list | **ADD** ECharts here. This is the intentional home for all charts for this role. Import ECharts only on this page. |

### Files — Rebuild vs Keep

| File | Action | Reason |
|---|---|---|
| `dashboard.html` | **REBUILD** | Remove ECharts, apply Action-First layout, add system health banner, restructure KPI cards |
| `companies/companies.html` | **REBUILD** | Apply v2 table standards (⋮ menu, filter tabs, no inline buttons) |
| `companies/create-company.html` | **NEW** | Does not exist in v1 |
| `companies/edit-company.html` | **NEW** | Does not exist in v1 |
| `companies/view-company.html` | **NEW** | Does not exist in v1 — was previously a modal or inline expand |
| `subscriptions/subscriptions.html` | **REBUILD** | Add ECharts, plan cards, date range filter |
| `audit-logs/audit-logs.html` | **REBUILD** | Convert table to timeline layout, add advanced filter row |

### `data.js` Functions Needed

The following functions must be implemented or updated in `data.js` to support the Super Admin pages:

```
getTenants({ status?, search?, page?, sort?, plan?, dateRange?, id? })
  Returns: array of tenant objects | single tenant object (when id provided)
  Fields: id, code, nameKH, nameEN, tin, phone, address, logo, plan, 
          userCount, userQuota, subscriptionStart, subscriptionExpiry, 
          status, contactName, contactEmail, adminEmail, createdAt

getPlatformKPIs({ dateRange? })
  Returns: {
    activeTenantCount,
    expiringSubscriptionCount,   // ≤ 7 days
    suspendedTenantCount,
    systemErrorCount,            // last 24h
    criticalEventCount,          // unreviewed critical events (for badge)
    uptimePercent,               // platform uptime %
    activeSessionCount,          // current active sessions across all tenants
    storageUsedPercent,          // storage utilization %
    mrrByMonth: [{ month, revenue, tenantCount }]
  }

getAuditLogs({ dateRange?, actionType?, tenantId?, userId?, page?, limit? })
  Returns: {
    total,
    page,
    logs: [{ id, timestamp, actionType, actionVerb, userId, userName, 
              userEmail, tenantId, tenantName, ipAddress, severity, detail }]
  }

getTenantUsers({ tenantId })
  Returns: array of { id, name, role, lastLogin, status }

getSubscriptionHistory({ tenantId })
  Returns: array of { date, eventType, plan, duration, amount, status }
```

### Shared Component Dependencies

The following shared components must be available and imported on the relevant pages:

| Component | Used On | Notes |
|---|---|---|
| Custom date range picker | `subscriptions.html`, `audit-logs.html` | Must not use native `<input type="date">` |
| Custom dropdown (searchable) | `audit-logs.html` (3 dropdowns) | Replace any native `<select>` in existing code |
| Custom confirmation dialog | `companies.html`, `edit-company.html` | Replaces `confirm()` — must accept a message prop and return Promise |
| Toast notification | All pages | Success/error feedback for actions |
| Custom pagination | `companies.html`, `subscriptions.html` | Standard pagination component |
| KPI card component | `dashboard.html` | Reusable across roles — parameterized by color token |
| Timeline list component | `audit-logs.html` | May be unique to this role — extract to shared if Auditor role needs it too |

---

*End of Super Admin v2 Design Plan*
