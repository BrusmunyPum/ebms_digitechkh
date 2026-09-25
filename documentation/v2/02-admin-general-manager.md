# Admin / General Manager — v2 UI/UX Design Plan

> **Role:** Admin / General Manager (អ្នកគ្រប់គ្រងទូទៅ)
> **Portal ID:** `gmPortal`
> **Folder:** `frontend/roles/02-admin-general-manager/`
> **Archetype:** C — Executive Command & Governance
> **Version:** v2 | Last Updated: 2026-09-25

---

## 1. Role Identity

| Attribute         | Value                                                                 |
|-------------------|-----------------------------------------------------------------------|
| **Archetype**     | C — Executive Command & Governance                                    |
| **Color Accent**  | Navy Blue `#0f2b5c`                                                   |
| **UI Style**      | Clean Executive Suite — structured, authoritative, zero clutter       |
| **Persona**       | CEO / Owner / General Manager                                         |
| **Key Behavior**  | Approves decisions; does NOT perform daily data entry                 |
| **Layout Mode**   | Read-heavy with focused action triggers; approval-triage first        |
| **Font Style**    | Semibold headings, regular body; Khmer text must be legible at `16px` |

### Persona Description

The GM opens the portal to quickly understand "what needs my decision today." They are **not** navigating deeply into lists or creating records. Their session flow is:

1. Glance at dashboard → see alerts
2. Act on pending approvals (inline or navigate to approval center)
3. Optionally review team/user settings
4. Exit — session is short, high-signal

The UI must **never bury urgent items** beneath decorative charts or long data tables.

---

## 2. Sidebar Navigation

> **Rule:** Maximum 4 items. No sub-menus. Badge only on approvals. All labels in Khmer.

| # | ID                | Label (Khmer)          | Icon (MDI)                     | Target File                          | Badge / Alert               |
|---|-------------------|------------------------|--------------------------------|--------------------------------------|-----------------------------|
| 1 | `gm-dashboard`    | បញ្ជាការដ្ឋាន          | `mdi:view-dashboard-outline`   | `dashboard.html`                     | None                        |
| 2 | `gm-approvals`    | មជ្ឈមណ្ឌលអនុម័ត        | `mdi:stamper`                  | `approvals/approvals.html`           | **Yes** — pending count pill |
| 3 | `gm-users`        | គណនីបុគ្គលិក           | `mdi:account-group-outline`    | `users/users.html`                   | None                        |
| 4 | `gm-settings`     | ការកំណត់ក្រុមហ៊ុន      | `mdi:cog-outline`              | `settings/settings.html`            | None                        |

### Sidebar Visual Rules

- **Active state:** Left border `4px solid #0f2b5c`, background `#e8edf5`, icon + label navy
- **Inactive state:** Icon + label `#6b7280`, transparent background
- **Badge pill:** Circular red `#dc2626` with white numeral — positioned top-right of icon
- **Sidebar width:** `240px` collapsed to `64px` (icon-only) on screens `< 1280px`
- **Sidebar header:** eBMS logo + role label "អ្នកគ្រប់គ្រងទូទៅ" in small navy caps
- **Sidebar footer:** User avatar, name, logout icon — always visible

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — Executive Command Center (`dashboard.html`)

**Purpose:** Provide the GM with an immediate, single-screen situational overview of pending decisions, financial health indicators, and team performance — enabling action without navigating away.

**Layout:** Vertical stack of 5 horizontal zones. No sidebar overlap. Full-width content area (`w-full` — full viewport width — no max-width constraint per project standards). Top-to-bottom reading flow mirrors decision priority.

```
┌─────────────────────────────────────────────────────┐
│  ZONE 1: Action Triage Banner (full-width, amber)   │
├──────────┬──────────┬──────────┬────────────────────┤
│  KPI 1   │  KPI 2   │  KPI 3   │       KPI 4        │  ZONE 2
├─────────────────────────────────────────────────────┤
│      ZONE 3: Quick Approval Cards (top 3 urgent)    │
├───────────────────────────┬─────────────────────────┤
│  ZONE 4: Period Lock      │  ZONE 5: Team Leaders   │
│  Status                   │  board (top 3)          │
└───────────────────────────┴─────────────────────────┘
```

---

#### Zone 1 — Action Triage Banner

- **Component:** Full-width horizontal strip, `56px` tall
- **Background:** Amber `#f59e0b` when count > 0; muted gray `#e5e7eb` when count = 0
- **Content:**
  - Left side icon: `mdi:bell-alert-outline` (animated pulse if count > 0)
  - Text: `"មាន [X] សំណើរង់ចាំការសម្រេចចិត្ត"` — `[X]` is dynamic from `data.js`
  - Right side: `[ចូលមើល]` button — navy fill, white text, routes to `approvals/approvals.html`
- **Zero-state:** Strip reads `"គ្មានសំណើថ្មីទេ"` in gray, no button shown
- **Rules:**
  - Banner is the FIRST element the GM sees — above KPI cards, always
  - Count must pull from `pendingApprovals.length` in `data.js`
  - Color escalates to red `#dc2626` if any item is overdue > 48 hours

---

#### Zone 2 — KPI Cards (4 cards, equal-width grid)

Layout: `4-column CSS grid`, each card `~320px min-width`, wraps on smaller screens.

**Card 1 — Pending Approvals**

- Icon: `mdi:stamper` in navy
- Label: `"ការអនុម័តរង់ចាំ"`
- Value: Integer count (e.g., `12`)
- Sub-label: `"ចុចដើម្បីមើល"` — entire card is clickable → routes to `approvals/approvals.html`
- Card background: White; left border `4px solid #0f2b5c`

**Card 2 — Today's Revenue**

- Icon: `mdi:cash-multiple` in emerald green
- Label: `"ចំណូលថ្ងៃនេះ"`
- Value: Currency string (e.g., `$12,450.00`)
- Sub-label: Comparison vs. yesterday (`"+8% vs ម្សិលមិញ"`) — text only, no chart
- Card background: White; left border `4px solid #10b981`

**Card 3 — Overdue AR Total**

- Icon: `mdi:alert-circle-outline` in red
- Label: `"AR ហួសកំណត់"`
- Value: Currency string (e.g., `$5,800.00`)
- Sub-label: Customer count contributing (e.g., `"3 អតិថិជន"`)
- Card background: White; left border `4px solid #dc2626`
- **Alert state:** If value > threshold defined in `settings`, card glows with red shadow

**Card 4 — Active Staff Online**

- Icon: `mdi:account-check-outline` in teal
- Label: `"បុគ្គលិកកំពុងប្រើប្រាស់"`
- Value: Integer (e.g., `7 / 15`)
- Sub-label: `"7 នាក់លើ 15 នាក់"`
- Card background: White; left border `4px solid #0d9488`
- **Note:** Value is illustrative/static in prototype; designed for future live session tracking

**Card Rules:**
- All 4 cards same height (`120px`)
- Hover state: slight `box-shadow` elevation, cursor pointer on Card 1
- No ECharts embedded in any card — numbers only

---

#### Zone 3 — Quick Approval Cards (Top 3 Urgent Pending Items)

- **Purpose:** Allow the GM to approve or reject the 3 most urgent pending items without leaving the dashboard
- **Layout:** Horizontal row of 3 cards; if fewer than 3 pending, show 1–2 cards + "empty" placeholder
- **Sort rule:** Ordered by oldest submission date first (most urgent = longest waiting)

**Each Quick Approval Card contains:**

| Element             | Detail                                                              |
|---------------------|---------------------------------------------------------------------|
| Requester info      | Small avatar circle + name (e.g., `"វ៉ា សុខា"`) + role badge      |
| Request type badge  | Colored pill: `បញ្ចុះតម្លៃ` (blue), `ចំណាយ` (orange), `កែស្តុក` (purple) |
| Amount / Summary    | Bold value (e.g., `"$320 — បញ្ចុះ 12%"`) or description text      |
| Date submitted      | Relative time (e.g., `"2 ថ្ងៃមុន"`)                               |
| Actions             | Two buttons: `[✔ អនុម័ត]` (green) and `[✘ បដិសេធ]` (red outline) |
| Detail link         | `"មើលលម្អិត →"` text link → routes to `approvals/view-approval.html?id=X` |

**Card Rules:**
- Each card: `white background`, `border: 1px solid #e5e7eb`, rounded `8px`
- Card width: equal thirds of content zone
- After inline Approve/Reject action: card fades out (CSS transition) and count badge decrements
- Clicking `[✔ អនុម័ត]` triggers a confirmation modal: `"អ្នកពិតជាចង់អនុម័តសំណើនេះ?"` with `[បន្ត]` / `[បោះបង់]`
- If zero pending items: Zone 3 collapses to a single row with icon `mdi:check-circle` and `"គ្មានការអនុម័តបន្ទាន់"` in green

---

#### Zone 4 — Financial Period Lock Status

- **Layout:** Left half of bottom row, card-style box
- **Content:**
  - Header: `"ស្ថានភាពរបាយការណ៍ហិរញ្ញវត្ថុ"`
  - Current period label (e.g., `"ខែសីហា 2026"`)
  - Status badge: `OPEN` (green pill) or `LOCKED` (red pill with lock icon)
  - If OPEN: Show `[ចាក់សោកាលបរិច្ឆេទ]` button — navy fill — triggers confirmation modal
  - If LOCKED: Show `[បើកម្តងទៀត]` button — amber — requires re-confirmation
- **Rules:**
  - Period lock state is read from `data.js → accountingPeriods[]`
  - Only GM role can toggle period lock; button is invisible to all other roles
  - Confirmation modal for lock action: `"ការចាក់សោបានបិទការកែប្រែទិន្នន័យហិរញ្ញវត្ថុ។ តើអ្នកប្រាកដទេ?"` with `[ចាក់សោ]` / `[បោះបង់]`

---

#### Zone 5 — Team Performance Leaderboard

- **Layout:** Right half of bottom row, card-style box
- **Header:** `"ចំណាត់ថ្នាក់ក្រុមលក់ (ខែនេះ)"`
- **Content:** Ordered list of top 3 sales representatives

  | Rank | Name              | Revenue       | Quota %     |
  |------|-------------------|---------------|-------------|
  | 🥇 1 | [Name]            | `$XX,XXX`     | `XXX%`      |
  | 🥈 2 | [Name]            | `$XX,XXX`     | `XXX%`      |
  | 🥉 3 | [Name]            | `$XX,XXX`     | `XXX%`      |

- **Rules:**
  - Text-only list — NO bar chart, NO ECharts
  - Revenue value formatted as USD currency string
  - Quota % shows color: green if ≥ 100%, amber if 80–99%, red if < 80%
  - Footer link: `"មើលរបាយការណ៍ពេញ →"` — links to Sales Manager Reports page (cross-portal link, opens in same tab with role context)
  - Data source: `data.js → salesReps[]` sorted by `monthRevenue` descending

---

#### Dashboard — Actions Summary

| Action                    | Trigger                          | Outcome                                      |
|---------------------------|----------------------------------|----------------------------------------------|
| Click KPI Card 1          | Mouse click                      | Navigate to `approvals/approvals.html`       |
| Click [ចូលមើល] in Banner  | Mouse click                      | Navigate to `approvals/approvals.html`       |
| Click [អនុម័ត] on card    | Mouse click                      | Confirmation modal → POST approval action    |
| Click [បដិសេធ] on card    | Mouse click                      | Reject modal with reason input → POST reject |
| Click [ចាក់សោកាលបរិច្ឆេទ]| Mouse click                      | Confirmation modal → lock period             |
| Click [មើលលម្អិត]         | Mouse click                      | Navigate to `view-approval.html?id=X`        |

#### Dashboard — Rules & Constraints

- **NO ECharts on this page** — all data represented as numbers, text, and inline progress bars only
- KPI data reads from `data.js` — no live API calls in prototype
- Pending count on banner and sidebar badge must stay in sync (same data source)
- Leaderboard limited to top 3 — no pagination, no "show more" on dashboard
- Page title: `"បញ្ជាការដ្ឋាន — អ្នកគ្រប់គ្រងទូទៅ"` in `<title>` tag
- Responsive: all 4 KPI cards stack to 2-column on tablet, 1-column on mobile

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/dashboard.html` — **MODIFY** (remove ECharts, add 5 zones)

---

### 3.2 Approval Center (`approvals/approvals.html`)

**Purpose:** Central hub where the GM reviews, approves, rejects, or bulk-processes all types of pending business approval requests from across the system.

**Layout:** Full-width two-panel structure. Left: filter sidebar (`260px` fixed). Right: approval item list (scrollable, card-based).

```
┌────────────────────────────────────────────────────────────┐
│  Page Header: "មជ្ឈមណ្ឌលអនុម័ត" + pending count chip      │
├──────────────┬─────────────────────────────────────────────┤
│  Filter      │  Tab Bar: ទាំងអស់ | បញ្ចុះ | ចំណាយ |       │
│  Sidebar     │           កែស្តុក | ប្រាក់ខ្ចី | ប្រវត្តិ │
│              ├─────────────────────────────────────────────┤
│  - Date      │  [ ] Bulk Select Bar (appears when ≥1 item  │
│    Range     │      is checked)                            │
│  - Requester │  ┌──────────────────────────────────────┐  │
│  - Amount    │  │  Approval Item Card #1               │  │
│    Range     │  ├──────────────────────────────────────┤  │
│  - Dept      │  │  Approval Item Card #2               │  │
│              │  ├──────────────────────────────────────┤  │
│  [ច្រោះ]    │  │  Approval Item Card #3               │  │
│  [កំណត់ថ្មី] │  └──────────────────────────────────────┘  │
└──────────────┴─────────────────────────────────────────────┘
```

---

#### Section A — Filter Sidebar

| Filter             | Component                | Options                                   |
|--------------------|--------------------------|-------------------------------------------|
| Date Range         | Date picker (from/to)    | Default: last 30 days                     |
| Requester          | Searchable dropdown      | All staff names from `data.js → users[]`  |
| Amount Range       | Dual-handle slider       | $0 — $50,000                              |
| Department         | Checkbox list            | Sales, Procurement, Finance, Warehouse    |

- `[ច្រោះ]` button: Apply filters — reloads card list
- `[កំណត់ថ្មី]` button: Clear all filters to defaults

---

#### Section B — Tab Bar (Approval Type Filters)

| Tab Label   | Filter Logic                                    | Badge |
|-------------|--------------------------------------------------|-------|
| ទាំងអស់    | No type filter — all pending items               | Count |
| បញ្ចុះតម្លៃ | Type = `DISCOUNT`                               | Count |
| ចំណាយ      | Type = `EXPENSE`                                 | Count |
| កែស្តុក     | Type = `STOCK_ADJUSTMENT`                       | Count |
| ប្រាក់ខ្ចី  | Type = `CREDIT_EXTENSION`                       | Count |
| ប្រវត្តិ    | Show approved/rejected items (history tab)       | None  |

- Active tab: underline `3px solid #0f2b5c`, label bold
- Tab badge: small gray pill showing count per type

---

#### Section C — Bulk Select Bar

- Appears as a sticky bar below tabs when ≥ 1 checkbox is checked
- Content: `"[X] ធាតុបានជ្រើស"` + `[✔ អនុម័តទាំងអស់]` (green) + `[✘ បដិសេធទាំងអស់]` (red outline)
- Bulk actions trigger a single confirmation modal listing all selected items

---

#### Section D — Approval Item Cards

Each card in the list represents one pending approval request.

**Card Layout (horizontal, full-width):**

```
[ ☐ ] [ Avatar ] [Requester Name]        [Type Badge]    [Amount]       [Date]
                  [Role/Dept subtitle]                   [Details line]
                                          [View Detail]  [Approve ✔]  [Reject ✘]
```

**Card Fields:**

| Field           | Detail                                                                   |
|-----------------|--------------------------------------------------------------------------|
| Checkbox        | Left edge — enables bulk selection                                       |
| Avatar          | 36px circle with initials fallback                                       |
| Requester Name  | Bold, `16px`; sub-line shows role + department                           |
| Type Badge      | Colored pill: `បញ្ចុះតម្លៃ` navy, `ចំណាយ` amber, `កែស្តុក` purple, etc. |
| Amount          | Bold right-aligned (e.g., `$450.00` or `DiscountL 12%`)                 |
| Details line    | One-line summary (e.g., `"ទំនិញ: A4 Paper — Customer: ស្ត្រីចា"``)      |
| Date Submitted  | Relative (e.g., `"3 ម៉ោងមុន"`) with tooltip showing exact datetime      |
| [View Detail]   | Text link → `view-approval.html?id=X`                                   |
| [Approve ✔]    | Green filled button — triggers inline confirmation                       |
| [Reject ✘]     | Red outline button — triggers reject modal with reason textbox           |

**Card States:**

| State      | Visual                                                |
|------------|-------------------------------------------------------|
| Default    | White bg, `border: 1px solid #e5e7eb`                 |
| Hover      | `bg: #f8fafc`, subtle shadow                          |
| Overdue    | Left border `4px solid #dc2626`, red timestamp text   |
| Selected   | `bg: #eff6ff`, checkbox checked, blue border          |
| Processing | Spinner overlay on buttons after click                |

---

#### Section E — History Tab

Visible when "ប្រវត្តិ" tab is active.

| Column           | Content                                            |
|------------------|----------------------------------------------------|
| Request Type     | Type badge                                         |
| Requester        | Name + avatar                                      |
| Amount/Details   | Summary                                            |
| Decision         | `អនុម័ត` (green) or `បដិសេធ` (red) badge          |
| Decided By       | Approver name (always GM in this portal)           |
| Decision Date    | Full datetime                                      |
| Note             | Truncated note text with expand tooltip            |

- Default sorted: newest decisions first
- Searchable by requester name (inline search bar above history list)

---

#### Approval Center — Actions

| Action                   | Trigger           | Outcome                                        |
|--------------------------|-------------------|------------------------------------------------|
| Tab switch               | Click tab         | Filter card list by type                       |
| Apply filters            | Click [ច្រោះ]     | Reload list with filter params                 |
| Select checkbox          | Click checkbox    | Adds to bulk selection; shows bulk bar         |
| Bulk Approve             | Bulk bar button   | Confirmation modal → approve all selected      |
| Inline [Approve]         | Card button       | Confirmation modal → approve single item       |
| Inline [Reject]          | Card button       | Modal with reason textarea → reject            |
| [View Detail]            | Card link         | Navigate to `view-approval.html?id=X`          |

#### Approval Center — Rules & Constraints

- Only pending items shown in default tabs (not history)
- GM can approve ALL request types; no type is locked from this role
- Rejected items require a reason string (minimum 10 characters enforced client-side)
- Bulk approve: maximum 20 items at once to prevent misfire
- History tab is read-only — no actions available
- Page title: `"មជ្ឈមណ្ឌលអនុម័ត"` in `<title>` tag

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/approvals/approvals.html` — **CREATE**

---

### 3.3 Approval Detail (`approvals/view-approval.html`)

**Purpose:** Display the full context of a single approval request so the GM can make an informed decision, add a note, and record the outcome with an audit trail.

**Layout:** Single-column, document-style. `max-width: 860px`, centered. Print-friendly.

```
┌──────────────────────────────────────────────────┐
│  Back link ← "ត្រឡប់ទៅមជ្ឈមណ្ឌលអនុម័ត"           │
│  Document Header (Type + ID + Status badge)      │
├──────────────────────────────────────────────────┤
│  Section A: Document Detail Panel                │
│  (full invoice / quote / expense details)        │
├──────────────────────────────────────────────────┤
│  Section B: Approval Timeline                    │
├──────────────────────────────────────────────────┤
│  Section C: GM Decision Panel                    │
│  (note textarea + action buttons)                │
└──────────────────────────────────────────────────┘
```

---

#### Section A — Document Detail Panel

Renders the **full business document** associated with the approval request. Content varies by type:

| Request Type       | Document Rendered                                                        |
|--------------------|--------------------------------------------------------------------------|
| `DISCOUNT`         | Quote/Invoice line items, original price, proposed discounted price, delta |
| `EXPENSE`          | Expense category, amount, receipt/attachment thumbnail, submitter notes  |
| `STOCK_ADJUSTMENT` | Product name, original qty, adjusted qty, reason code, warehouse         |
| `CREDIT_EXTENSION` | Customer name, current credit limit, requested new limit, AR balance     |

- All figures displayed in `KHR` and `USD` dual-format where applicable
- Attachment thumbnails: click to open in lightbox (image) or new tab (PDF)
- Panel has a light gray `#f9fafb` background to distinguish from decision section

---

#### Section B — Approval Timeline

Vertical stepper showing the life of the request:

```
  ●  ដាក់ស្នើ — [Requester Name] — [Datetime]
     Note: "[Optional requester note]"

  ●  រង់ចាំការអនុម័ត — (current step, highlighted navy)

  ○  (placeholder) អនុម័ត / បដិសេធ — (future step, grayed)
```

- Each node: circle icon (filled = completed, outlined = future), label, actor name, timestamp
- If request passed through an intermediate approver (e.g., Sales Manager pre-approved before GM), those steps are also shown
- Timeline is read-only on this page

---

#### Section C — GM Decision Panel

- **Header:** `"ការសម្រេចចិត្ត"`
- **Note Textarea:**
  - Label: `"មតិយោបល់ (ស្រេចចិត្ត)"`
  - Placeholder: `"បញ្ចូលមតិ មុនពេលអនុម័ត ឬ បដិសេធ..."`
  - Rows: 4; max 500 characters; character counter shown
- **Action Buttons (horizontal, right-aligned):**

  | Button                        | Style                   | Action                                                        |
  |-------------------------------|-------------------------|---------------------------------------------------------------|
  | `[✔ អនុម័តជាមួយមតិ]`         | Green filled            | POST approval with note content                               |
  | `[✘ បដិសេធជាមួយហេតុផល]`       | Red filled              | POST rejection — note textarea becomes **required** (min 10 chars) |
  | `[↩ ស្នើសុំការកែប្រែ]`        | Amber outline           | POST revision request — note required, status set to REVISION |

- **Locked State:** If approval already decided (from history), all buttons are replaced with a read-only decision badge + timestamp + approver note (green/red box)

#### Approval Detail — Rules & Constraints

- URL parameter `?id=X` used to load approval data from `data.js → pendingApprovals[]`
- If `id` not found or status is not `PENDING`, show read-only view with decision banner
- Rejection note is mandatory — enforce client-side before POST
- Revision request must include a note explaining what needs to change
- Page title: `"លម្អិតការអនុម័ត #[ID]"`

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/approvals/view-approval.html` — **CREATE**

---

### 3.4 Team Accounts (`users/users.html`)

**Purpose:** Allow the GM to view, add, edit, and deactivate all staff accounts and role assignments across the organization.

**Layout:** Full-width. Top toolbar + filter bar + data table. Secondary tab for Role Matrix.

```
┌──────────────────────────────────────────────────────────┐
│  Page Header: "គណនីបុគ្គលិក"    [+ បន្ថែមបុគ្គលិកថ្មី]  │
├──────────────────────────────────────────────────────────┤
│  Tab: [បញ្ជីបុគ្គលិក] | [ម៉ាទ្រីសតួនាទី]                 │
├──────────────────────────────────────────────────────────┤
│  Filter Row: [Role ▼] [Department ▼] [Status ▼] [🔍]    │
├──────────────────────────────────────────────────────────┤
│  Staff Table (main content area)                         │
└──────────────────────────────────────────────────────────┘
```

---

#### Section A — Staff Table (Tab 1: បញ្ជីបុគ្គលិក)

**Column definitions:**

| Column         | Width   | Content                                                          |
|----------------|---------|------------------------------------------------------------------|
| Avatar         | 48px    | Circular image; initials fallback with color-coded background    |
| ឈ្មោះ          | 200px   | Full name bold + email sub-line in gray                          |
| តួនាទី         | 150px   | Role badge pill (color-coded per role — see UI Identity section) |
| នាយកដ្ឋាន      | 140px   | Department name text                                             |
| ចូលប្រើចុងក្រោយ | 160px  | Relative datetime (e.g., `"1 ម៉ោងមុន"`)                         |
| ស្ថានភាព       | 100px   | Toggle switch: Active (green) / Inactive (gray)                  |
| ⋮ Menu         | 60px    | Dropdown: [កែប្រែ] [ផ្លាស់ប្ដូរពាក្យសម្ងាត់] [លុប]             |

**Filter Row:**

| Filter       | Type                | Options                                                              |
|--------------|---------------------|----------------------------------------------------------------------|
| Role         | Multi-select dropdown | All roles in the system (from `portal.js` role registry)           |
| Department   | Dropdown            | Sales, Procurement, Finance, Warehouse, Management                   |
| Status       | Toggle              | Active / Inactive / All                                              |
| Search       | Text input          | Searches by name or email — real-time filter                         |

**Table Rules:**
- Default sort: by last login, most recent first
- Row hover: `bg: #f8fafc`
- Status toggle: immediate visual update; no page reload needed
- Deactivating an account that is currently logged in shows a warning: `"អ្នកប្រើប្រាស់នេះកំពុងប្រើប្រាស់ប្រព័ន្ធ"`
- Delete action: confirmation modal required; hard-delete not allowed if user has transaction history (soft-delete / deactivate only)
- Pagination: 20 rows per page; page controls at bottom

---

#### Section B — Role Assignment Matrix (Tab 2: ម៉ាទ្រីសតួនាទី)

**Purpose:** Visual grid showing which roles have access to which system modules — allows GM to audit permissions at a glance.

**Layout:** Fixed header table, horizontally scrollable

- **Rows:** System modules (e.g., Sales, Invoicing, Procurement, Approvals, Reports, Settings)
- **Columns:** All roles (Cashier, Sales Executive, Sales Manager, Procurement Officer, Chief Accountant, Warehouse, Admin, Internal Auditor, GM)
- **Cell:** `✔` (green) = has access, `—` (gray) = no access, `⚠` (amber) = limited access

**Rules:**
- Matrix is **read-only** — GM can see but not edit directly from this view
- Editing permissions requires going to individual user via ⋮ menu → [កែប្រែ]
- Scrollable horizontally for narrow screens; row headers sticky-left

---

#### Team Accounts — Actions

| Action                    | Trigger                 | Outcome                                                 |
|---------------------------|-------------------------|---------------------------------------------------------|
| [+ បន្ថែមបុគ្គលិកថ្មី]   | Button click            | Navigate to `create-user.html`                          |
| [កែប្រែ] in ⋮ menu       | Dropdown click          | Navigate to `edit-user.html?id=X`                       |
| [ផ្លាស់ប្ដូរពាក្យសម្ងាត់] | Dropdown click         | Modal with new password + confirm fields                 |
| [លុប] in ⋮ menu          | Dropdown click          | Confirmation modal → soft-delete (deactivate)           |
| Status Toggle             | Toggle switch           | Immediate active/inactive status change                  |
| Tab switch                | Click tab               | Switch between Staff List and Role Matrix views          |

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/users/users.html` — **MODIFY** (add Role Matrix tab, filter row)

---

### 3.5 Create / Edit Staff Account (`users/create-user.html` & `users/edit-user.html`)

**Purpose:** Form page for adding a new staff member or editing an existing one, including role assignment and permission configuration.

**Layout:** Centered single-column form, `max-width: 720px`. Card-style with section dividers.

```
┌────────────────────────────────────────────┐
│  Back link ← "ត្រឡប់" | Page title         │
│  Section 1: Personal Information           │
│  Section 2: Role & Department              │
│  Section 3: Account & Password             │
│  Section 4: Access Permissions             │
│  [Save]  [Cancel]                          │
└────────────────────────────────────────────┘
```

---

#### Section 1 — Personal Information

| Field      | Input Type           | Validation                                   |
|------------|----------------------|----------------------------------------------|
| ឈ្មោះពេញ  | Text input           | Required, min 2 chars                        |
| អ៊ីមែល    | Email input          | Required, unique check against `data.js`     |
| ទូរស័ព្ទ   | Phone input          | Optional, numeric only, 9–12 digits          |
| រូបភាព    | File upload (image)  | Optional; preview shown after select; max 2MB |

---

#### Section 2 — Role & Department

| Field          | Input Type          | Notes                                             |
|----------------|---------------------|---------------------------------------------------|
| តួនាទី         | Single-select dropdown | Populated from role registry in `portal.js`    |
| នាយកដ្ឋាន      | Single-select dropdown | Sales, Procurement, Finance, Warehouse, Mgmt  |

- Selecting a role updates a "Default Permissions Preview" area below — reads from role template
- GM can override individual permissions using checkboxes in Section 4

---

#### Section 3 — Account & Password

| Field                | Input Type       | Validation                                              |
|----------------------|------------------|---------------------------------------------------------|
| ឈ្មោះអ្នកប្រើ       | Text             | Auto-filled from email; editable; must be unique        |
| ពាក្យសម្ងាត់          | Password         | Required for create; optional for edit (blank = no change) |
| បញ្ជាក់ពាក្យសម្ងាត់  | Password confirm  | Must match; shown only when password field has value    |

---

#### Section 4 — Access Permissions Checkboxes

Grouped by module. Each row: `[Module Name] — [Read ☑] [Write ☑] [Delete ☑] [Approve ☑]`

**Modules listed:**

- Sales & Quotation
- Invoice & Billing
- Purchase & Procurement
- Inventory / Warehouse
- Approval Workflows
- Financial Reports
- System Settings
- User Management

**Rules:**
- Default checkbox state auto-fills from selected Role template
- GM can manually override any permission for this individual user
- "Approve" checkbox only available for roles with approval capability
- Delete permission checkbox requires GM to click an "unlock" toggle first (safety guard)

---

#### Create/Edit — Actions

| Action        | Button                  | Outcome                                              |
|---------------|-------------------------|------------------------------------------------------|
| Save          | `[រក្សាទុក]` navy fill  | Validate → save to data → redirect to `users.html`   |
| Cancel        | `[បោះបង់]` text link    | Discard changes → back to `users.html`               |
| Photo upload  | File input trigger      | Preview image in avatar circle                       |
| Role change   | Dropdown selection      | Auto-update permission checkboxes with role defaults |

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/users/create-user.html` — **CREATE**
- `frontend/roles/02-admin-general-manager/users/edit-user.html` — **CREATE**

---

### 3.6 Company Settings (`settings/settings.html`)

**Purpose:** Unified tabbed settings page replacing the previously separate company-profile and system-settings pages, giving the GM a single destination for all configuration.

**Layout:** Full-width. Sticky horizontal tab bar + scrollable tab content below.

```
┌──────────────────────────────────────────────────────────────┐
│  Page Header: "ការកំណត់ក្រុមហ៊ុន"                           │
├──────────────────────────────────────────────────────────────┤
│  Tab Bar: [ព័ត៌មានក្រុមហ៊ុន] [ការកំណត់ប្រព័ន្ធ]             │
│           [ការជូនដំណឹង]      [ចាក់សោការិយបរិច្ឆេទ]         │
├──────────────────────────────────────────────────────────────┤
│  Active Tab Content Area                                     │
│  [Save Changes] button — fixed at bottom right               │
└──────────────────────────────────────────────────────────────┘
```

---

#### Tab 1 — ព័ត៌មានក្រុមហ៊ុន (Company Information)

| Field                    | Input Type        | Notes                                          |
|--------------------------|-------------------|------------------------------------------------|
| Logo                     | Image upload      | Preview in `160×80px` box; accepted: PNG, JPG; max 5MB |
| ឈ្មោះក្រុមហ៊ុន (ខ្មែរ)  | Text input        | Required                                       |
| Company Name (English)   | Text input        | Required                                       |
| លេខអត្តសញ្ញាណពន្ធ (TIN) | Text input        | Numeric, formatted as `XXX-XXX-XXX`            |
| អាសយដ្ឋាន               | Textarea          | Multi-line; 3 rows                             |
| ទូរស័ព្ទ                | Phone input       | Formatted                                      |
| អ៊ីមែល                  | Email input       | Company contact email                          |
| វែបសៃដ៍                 | URL input         | Optional                                       |

---

#### Tab 2 — ការកំណត់ប្រព័ន្ធ (System Settings)

| Setting                    | Input Type            | Notes                                              |
|----------------------------|-----------------------|----------------------------------------------------|
| រូបិយប័ណ្ណ (Primary)       | Dropdown              | USD, KHR, THB                                      |
| អត្រាប្ដូររូបិយប័ណ្ណ       | Number input          | KHR per 1 USD (e.g., `4120`)                       |
| អត្រាពន្ធ VAT              | Number input + %      | Default 10%                                        |
| លេខបញ្ជាណែនាំវិក្កយបត្រ   | Text input            | Prefix (e.g., `INV-`, `eBMS-`)                     |
| ខែចាប់ផ្ដើមមូលនិធិ         | Month/Year picker     | Fiscal year start month                            |
| ខ្នាតរបស់ក្រដាស (Print)    | Dropdown              | A4, Letter, Receipt (80mm)                         |
| ភាសា UI                    | Dropdown              | ខ្មែរ (default), English                           |

---

#### Tab 3 — ការជូនដំណឹង (Notification Settings)

| Setting                          | Input Type        | Notes                                           |
|----------------------------------|-------------------|-------------------------------------------------|
| Telegram Bot Token               | Password-style input | Masked; `[Test Connection]` button alongside |
| Telegram Chat ID (GM)            | Text input        | GM's personal Telegram chat ID                  |
| Telegram Group ID (Team)         | Text input        | Optional — team notification group              |
| ជូនដំណឹង: ការអនុម័តថ្មី         | Toggle            | Notify GM when new approval is submitted        |
| ជូនដំណឹង: AR ហួសកំណត់           | Toggle            | Notify when AR overdue > X days                 |
| ជូនដំណឹង: ស្តុកទាប              | Toggle            | Notify when stock < reorder point               |
| ជូនដំណឹង: ការចុះឈ្មោះអ្នកប្រើ  | Toggle            | Notify when new user is created                 |
| AR Overdue Threshold (days)      | Number input      | Default: 30 days                                |

- `[Test Connection]` button: Sends test Telegram message to configured Chat ID; shows success/error inline
- All toggles: immediate visual feedback; saved only on `[Save Changes]` click

---

#### Tab 4 — ចាក់សោការិយបរិច្ឆេទ (Period Lock Management)

**Purpose:** GM manages which accounting periods are open or locked, preventing modification of historical financial data.

**Layout:** Table listing periods, each with lock status and action.

| Column           | Content                                                         |
|------------------|-----------------------------------------------------------------|
| ខែ/ឆ្នាំ         | Period label (e.g., `"ខែសីហា 2026"`)                           |
| ស្ថានភាព         | `OPEN` (green badge) / `LOCKED` (red badge with lock icon)      |
| ចាក់សោដោយ        | Name of approver who locked (or `—` if open)                    |
| កាលបរិច្ឆេទចាក់   | DateTime locked (or `—` if open)                                |
| សកម្មភាព         | `[ចាក់សោ]` if OPEN → confirmation modal; `[បើកម្តងទៀត]` if LOCKED |

**Rules:**
- Periods listed: current month + previous 12 months
- Future months shown as `—` (cannot pre-lock)
- Locking a period prevents any new or edited transactions for that period across ALL roles
- Unlocking requires stronger confirmation: modal with typed confirmation text `"UNLOCK"`
- Only GM role sees this tab; tab is hidden from all other portal roles
- Each lock/unlock action appended to an audit log (displayed below table as read-only list)

**Audit Log (below period table):**

| Column       | Content                              |
|--------------|--------------------------------------|
| ការសម្រេច   | `ចាក់សោ` or `បើក`                   |
| ខែ/ឆ្នាំ     | Period affected                      |
| ដោយ          | Actor name                           |
| កាលបរិច្ឆេទ  | Exact datetime                       |

---

#### Settings — Actions

| Action                      | Trigger                  | Outcome                                               |
|-----------------------------|--------------------------|-------------------------------------------------------|
| Tab switch                  | Click tab label          | Show relevant settings section                        |
| [Save Changes]              | Fixed bottom-right button | Validate all fields in active tab → save to data.js  |
| Logo upload                 | File input               | Preview immediately in placeholder box               |
| [Test Connection] (Telegram)| Button click             | Async test → inline success/error message            |
| [ចាក់សោ] period             | Button click             | Confirmation modal → lock period                     |
| [បើកម្តងទៀត] period        | Button click             | Strong confirmation modal (type "UNLOCK") → unlock   |

#### Settings — Rules & Constraints

- `[Save Changes]` saves only the currently active tab — not all tabs at once
- Tab 4 (Period Lock) is visible **only** to GM role — hidden in CSS for all other portals
- TIN field: formatted validation (must match `XXX-XXX-XXX` or similar local format)
- VAT rate: 0–100% numeric range only
- Logo file upload: client-side preview before save; actual save updates `data.js → company.logo`
- Tab URL hash: `settings.html#company`, `settings.html#system`, `settings.html#notifications`, `settings.html#periods` — allows direct deep-linking

#### Files to Create/Modify

- `frontend/roles/02-admin-general-manager/settings/settings.html` — **CREATE** (replaces `company-profile.html` and `system-settings.html`)
- Remove or archive: `settings/company-profile.html`, `settings/system-settings.html`

---

## 4. UI Identity Details

| Attribute            | Value                                                                     |
|----------------------|---------------------------------------------------------------------------|
| **Primary Color**    | Navy Blue `#0f2b5c`                                                       |
| **Accent Color**     | Amber `#f59e0b` (for alerts, triage banner, warning states)               |
| **Background Tone**  | Light gray `#f1f5f9` page background; white `#ffffff` card surfaces       |
| **Text Primary**     | Dark slate `#1e293b`                                                      |
| **Text Secondary**   | Medium gray `#6b7280`                                                     |
| **Success**          | Emerald `#10b981`                                                         |
| **Error / Danger**   | Red `#dc2626`                                                             |
| **Border**           | `#e5e7eb` — light, neutral                                                |

### Typography

| Usage             | Weight    | Size        |
|-------------------|-----------|-------------|
| Page Title        | `700`     | `24px`      |
| Section Header    | `600`     | `18px`      |
| Card Label        | `600`     | `14px`      |
| Body / Data       | `400`     | `14px`      |
| Sub-label / Help  | `400`     | `12px` gray |
| KPI Values        | `700`     | `28px`      |

- Khmer font: `Hanuman` or `Kantumruy Pro` — must render cleanly at `14px` and above
- English fallback: `Inter` or `system-ui`

### Unique Design Elements (Archetype C Signature)

1. **Triage-first layout** — the most urgent action is always the first visible element on every page
2. **Approval card with inline action** — approval decisions can be made without deep navigation
3. **Period lock as primary governance tool** — Tab 4 in settings is the GM's financial control lever, not an afterthought
4. **Confirmation modals on every destructive/approval action** — enforces deliberate decision-making
5. **Read-only enforcement** — GM does not create invoices, POs, or stock adjustments; those buttons are absent from this portal
6. **Navy authority palette** — clean, corporate, no decorative gradients; solid fills only
7. **Role badge color coding** — each role has a distinct badge color in the user table for instant visual scanning

---

## 5. Developer Notes

### `portal.js` Configuration Changes Required

```
// gmPortal nav — UPDATED v2 (4 items, merged settings)
gmPortal.nav = [
  { id: 'gm-dashboard',  label: 'បញ្ជាការដ្ឋាន',        icon: 'mdi:view-dashboard-outline', href: 'dashboard.html' },
  { id: 'gm-approvals',  label: 'មជ្ឈមណ្ឌលអនុម័ត',      icon: 'mdi:stamper',                href: 'approvals/approvals.html', badge: true },
  { id: 'gm-users',      label: 'គណនីបុគ្គលិក',         icon: 'mdi:account-group-outline',  href: 'users/users.html' },
  { id: 'gm-settings',   label: 'ការកំណត់ក្រុមហ៊ុន',    icon: 'mdi:cog-outline',            href: 'settings/settings.html' }
];

// REMOVE from gmPortal.nav:
// - company-profile nav item
// - system-settings nav item (both merged into settings/settings.html)
```

### `data.js` Fields Required

```
// Pending approvals (drives dashboard badge + banner count)
pendingApprovals: [
  {
    id: 'APV-001',
    type: 'DISCOUNT' | 'EXPENSE' | 'STOCK_ADJUSTMENT' | 'CREDIT_EXTENSION',
    requesterId: 'USR-XXX',
    requesterName: 'string',
    requesterRole: 'string',
    amount: 0.00,
    summary: 'string',
    dateSubmitted: 'ISO datetime',
    isOverdue: true | false,
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION',
    approverNote: 'string | null',
    decisionDate: 'ISO datetime | null'
  }
]

// Accounting periods (drives Zone 4 + Tab 4 in settings)
accountingPeriods: [
  {
    periodId: 'P-2026-08',
    label: 'ខែសីហា 2026',
    status: 'OPEN' | 'LOCKED',
    lockedBy: 'string | null',
    lockedAt: 'ISO datetime | null'
  }
]

// Sales reps for leaderboard (Zone 5)
salesReps: [
  {
    id: 'USR-XXX',
    name: 'string',
    monthRevenue: 0.00,
    monthTarget: 0.00,
    quotaPercent: 0.0
  }
]

// Company settings (drives Tab 1–3 in settings)
company: {
  nameKH: 'string',
  nameEN: 'string',
  tin: 'string',
  address: 'string',
  phone: 'string',
  email: 'string',
  website: 'string',
  logo: 'path/to/logo.png'
}

systemSettings: {
  primaryCurrency: 'USD' | 'KHR',
  exchangeRate: 4120,
  vatRate: 10,
  invoicePrefix: 'INV-',
  fiscalYearStart: 1,
  paperSize: 'A4',
  language: 'km' | 'en'
}

notifications: {
  telegramBotToken: 'string',
  telegramChatIdGM: 'string',
  telegramGroupId: 'string',
  onNewApproval: true,
  onAROverdue: true,
  onLowStock: true,
  onNewUser: false,
  arOverdueThresholdDays: 30
}
```

### Shared Components Used

| Component                   | Source                            | Used On                                 |
|-----------------------------|-----------------------------------|-----------------------------------------|
| Sidebar shell               | `components/sidebar.html`         | All pages                               |
| Confirmation modal          | `components/modal-confirm.html`   | Approval cards, period lock, delete     |
| Avatar circle               | `components/avatar.html`          | User table, approval cards              |
| Status badge/pill           | `components/badge.html`           | Approval types, user roles, AR status   |
| Date range picker           | `components/date-picker.html`     | Approval filter sidebar                 |
| File upload + preview       | `components/file-upload.html`     | Settings Tab 1, create/edit user        |
| Pagination controls         | `components/pagination.html`      | User table, approval history            |

### Files to Create (Summary)

| File                                                        | Action    |
|-------------------------------------------------------------|-----------|
| `approvals/approvals.html`                                  | CREATE    |
| `approvals/view-approval.html`                              | CREATE    |
| `users/create-user.html`                                    | CREATE    |
| `users/edit-user.html`                                      | CREATE    |
| `settings/settings.html`                                    | CREATE    |
| `dashboard.html`                                            | MODIFY    |
| `users/users.html`                                          | MODIFY    |

### Files to Archive / Remove

| File                              | Action     | Reason                                        |
|-----------------------------------|------------|-----------------------------------------------|
| `settings/company-profile.html`   | ARCHIVE    | Merged into `settings/settings.html` Tab 1    |
| `settings/system-settings.html`   | ARCHIVE    | Merged into `settings/settings.html` Tab 2    |

---

*Document end — Admin / General Manager v2 UI/UX Design Plan*
