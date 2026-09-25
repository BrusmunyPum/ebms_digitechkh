# Internal Auditor — v2 UI/UX Design Plan

> **File:** `documentation/v2/11-internal-auditor.md`
> **Role Folder:** `frontend/roles/11-internal-auditor-executive/`
> **Portal ID:** `iaPortal`
> **Last Updated:** 2026-09-25
> **Archetype:** C — Executive Command & Governance (Read-Only Forensic Variant)

---

## 1. Role Identity

| Property | Value |
|---|---|
| **Archetype** | C — Executive Command & Governance (Read-Only Forensic Variant) |
| **Persona Name** | Forensic Eye |
| **Color Accent** | Rose/Red `#dc2626` |
| **Secondary Accent** | Amber `#d97706` (for warnings) |
| **Background Tone** | Dark Slate `#0f172a` (sidebar) + Cool White `#f8fafc` (content area) |
| **UI Style** | Read-Only Triage — forensic timelines, diff viewers, violation cards |
| **Key Persona** | Senior auditor who investigates financial irregularities, monitors system activity, and produces independent governance reports. Has READ-ONLY access to ALL company data across ALL modules. |

### Critical Identity Rule — READ-ONLY ENFORCEMENT

> **ZERO create/edit/delete buttons anywhere in the entire role UI.**
> Every interactive element is either a filter, a [View] link, or an Export. Even form fields used for filters must be clearly styled as "filter" (not "entry"). The UI must visually communicate that this user observes and reports — they never change data.

---

## 2. Sidebar Navigation (4 Items)

> **v1 → v2 Change:** v1 had 5 sidebar items including a separate `financial-overview`. In v2, financial-overview is **merged into the Reports page** as a dedicated sub-tab. Sidebar reduces to 4 items.

```
Sidebar Header:
  - Logo: DIGITECHKH eBMS
  - Role Label: "សវនករផ្ទៃក្នុង"
  - READ-ONLY badge: persistent pill badge "#dc2626" background — label "READ-ONLY MODE"
    displayed below the role label at all times
  - Subtle left border on sidebar: 3px solid #dc2626
```

| # | ID | Label (Khmer) | Icon | `href` Target File | Badge/Alert |
|---|---|---|---|---|---|
| 1 | `ia-dashboard` | ផ្ទាំងសវនកម្ម | `mdi:shield-search` | `dashboard.html` | — |
| 2 | `ia-audit-trail` | កំណត់ហេតុសវនកម្ម | `mdi:clipboard-text-clock-outline` | `audit-trail/audit-trail.html` | — |
| 3 | `ia-internal-controls` | ការគ្រប់គ្រងផ្ទៃក្នុង | `mdi:shield-alert-outline` | `internal-controls/internal-controls.html` | `alertBadge: true` — red dot badge indicating unacknowledged policy breaches |
| 4 | `ia-reports` | របាយការណ៍សវនកម្ម | `mdi:file-chart-outline` | `reports/reports.html` | — |

**Sidebar Footer:**
- User avatar (initials only — no photo for auditor persona)
- Logout link only
- NO settings, NO profile edit

---

## 3. Pages & Layouts

---

### 3.1 Dashboard — Audit Radar & Anomaly Detection (`dashboard.html`)

**Purpose:** Serves as the auditor's live anomaly radar — surfaces the most critical red flags, recent system activity, and overall system health at a glance.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  READ-ONLY BANNER (full width, amber, persistent)           │
├─────────────────────────────────────────────────────────────┤
│  Page Title + Last Refreshed timestamp (top left)           │
│  [Refresh] button (top right — only action allowed)         │
├──────────────────────────────┬──────────────────────────────┤
│  SECTION A: Red Flag Alerts  │  SECTION B: Live Activity    │
│  (left ~60% width)           │  Feed (right ~40% width)     │
│                              │                              │
│  Alert Card × N (vertical    │  Scrollable log list         │
│  stack, most critical first) │  (last 20 events)            │
│                              │                              │
├──────────────────────────────┴──────────────────────────────┤
│  SECTION C: System Health Snapshot (full width, 4 KPI boxes)│
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Global READ-ONLY Banner
- Position: Fixed to top of content area, below header
- Style: Amber background `#fef3c7`, text `#92400e`, icon `mdi:eye-lock-outline`
- Text (Khmer): `"ទំព័រនេះជាទម្រង់មើលប៉ុណ្ណោះ — គ្មានសិទ្ធិកែប្រែ"`
- This banner appears on **every single page** in this role, never dismissible
- Height: ~40px, compact

#### Section A — Red Flag Alert Cards

This is the most important section on the dashboard. Each card represents an automatically detected anomaly.

**Predefined Alert Types (at minimum 4 categories):**

1. **Invoices Modified or Deleted After Posting**
   - Trigger: Any `UPDATE` or `DELETE` action on a posted/finalized invoice record
   - Severity: `Critical` — red badge
   - Card shows: Alert title (Khmer + English sub-label), count of occurrences (e.g., "3 invoices affected"), most recent timestamp, affected document IDs (truncated list)
   - Footer: `[View in Audit Trail →]` link only

2. **Sales Recorded Below Cost Price**
   - Trigger: Sale line item where `unit_price < unit_cost`
   - Severity: `Critical` — red badge
   - Card shows: Number of transactions, total financial exposure (KHR/USD), date range of occurrences
   - Footer: `[View Transactions →]` link to audit-trail with pre-applied filter

3. **Large Stock Adjustments Without Authorization**
   - Trigger: Stock adjustment exceeding threshold (e.g., >50 units or >$500 value) with no linked approval record
   - Severity: `Warning` — amber badge
   - Card shows: Number of unauthorized adjustments, total quantity adjusted, warehouse involved
   - Footer: `[View Stock Adjustments →]` link

4. **Login Anomalies**
   - Trigger: >3 failed logins from single user within 1 hour, OR successful login outside of business hours (before 7am or after 9pm), OR login from new IP address
   - Severity: `Warning` — amber badge
   - Card shows: Anomaly description, user(s) affected, time of event, IP address
   - Footer: `[View Login Logs →]` link

**Alert Card Component Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [●Critical] TITLE (bold, Khmer)                     │
│ English sub-label (small, gray)                     │
│ ─────────────────────────────────────────────────── │
│ Description text — concise, factual                 │
│ Affected: [count / list]                            │
│ Detected: [timestamp]                               │
│ ─────────────────────────────────────────────────── │
│                            [View Detail →]          │
└─────────────────────────────────────────────────────┘
```
- Card border-left: 4px solid — red for Critical, amber for Warning
- Background: white with very subtle red/amber tint (`#fff5f5` / `#fffbeb`)
- NO delete/dismiss button on these cards (auditor cannot suppress alerts)
- Cards sorted by severity then recency

#### Section B — Live Activity Feed

- Title: "សកម្មភាពប្រព័ន្ធថ្មីៗ"
- Shows last 20 system events, auto-refreshing every 60 seconds
- Each row in the feed:
  ```
  [COLOR DOT]  [HH:MM]  [Username]  [Action Verb]  [Module]
               [IP address]                          [→]
  ```
  - Color dot: red=delete, amber=edit, green=create, blue=view/login, gray=system/auto
  - Click `[→]` goes to the audit trail detail page for that event
- Feed is a scrollable list with a subtle top fade
- NO pagination — just the latest 20 entries
- Feed container has fixed height with internal scroll

#### Section C — System Health Snapshot

4 KPI stat boxes in a horizontal row:

| Box | Metric | Icon | Color |
|---|---|---|---|
| 1 | Logins Today | `mdi:login` | Blue |
| 2 | Failed Login Attempts | `mdi:shield-lock-outline` | Amber |
| 3 | Data Modifications Today | `mdi:pencil-box-multiple-outline` | Rose |
| 4 | Deletions Today | `mdi:delete-alert-outline` | Red |

Each box: large number, label, small trend arrow (vs yesterday) — text only, no charts.

**Actions Available:**
- `[Refresh]` button (top right) — reloads page data, no mutation
- `[View in Audit Trail →]` links inside alert cards (navigation only)
- `[View Login Logs →]` links inside alert cards (navigation only)

**Rules/Constraints:**
- NO create, edit, or delete buttons anywhere on this page
- Alert cards are generated from read-only query — they cannot be dismissed or marked as resolved from this page
- `last_refreshed` timestamp displayed in top bar (e.g., "Last updated: 23:36:57")
- Page applies CSS class `read-only-mode` on `<body>`

**Files to Create/Modify:**
- `frontend/roles/11-internal-auditor-executive/dashboard.html`

---

### 3.2 Audit Trail — Immutable Audit Timeline (`audit-trail/audit-trail.html`)

**Purpose:** Provides a chronological, immutable, full-system log of every create/read/update/delete action performed by any user, displayed in a timeline format with rich filtering and expandable diff views.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  READ-ONLY BANNER                                           │
├─────────────────────────────────────────────────────────────┤
│  Page Title + Entry Count                                   │
├─────────────────────────────────────────────────────────────┤
│  FILTER BAR (horizontal strip)                              │
│  [Date Range] [Module ▼] [User ▼] [Action Type ▼] [Reset]  │
│  [Export PDF] [Export CSV]  (top right of filter bar)       │
├─────────────────────────────────────────────────────────────┤
│  TIMELINE BODY                                              │
│                                                             │
│  DATE GROUP HEADER — "25 កញ្ញា 2026"                        │
│  │                                                          │
│  ├──● [Entry]                                              │
│  ├──● [Entry]                                              │
│  │                                                          │
│  DATE GROUP HEADER — "24 កញ្ញា 2026"                        │
│  │                                                          │
│  ├──● [Entry]                                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  PAGINATION                                                 │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Filter Bar

All filters are read-mode controls (styled distinctly from data-entry forms):

- **Date Range:** Two date pickers — "ចាប់ពីថ្ងៃ" to "ដល់ថ្ងៃ". Default: last 7 days
- **Module Filter** (dropdown, multi-select):
  - Sales (លក់)
  - Purchases (ការទិញ)
  - Stock/Inventory (ស្តុក)
  - Finance (ហិរញ្ញវត្ថុ)
  - Users & Access (អ្នកប្រើប្រាស់)
  - System (ប្រព័ន្ធ)
- **User Filter** (dropdown): list of all system users by name
- **Action Type Filter** (dropdown):
  - CREATE (បង្កើត)
  - UPDATE (កែប្រែ)
  - DELETE (លុប)
  - VIEW / LOGIN (មើល/ចូល)
  - EXPORT (នាំចេញ)
  - SYSTEM (ប្រព័ន្ធ)
- **[Reset Filters]** button — clears all filters back to default
- **[Export PDF]** — exports current filtered view as PDF (audit report format, with header showing auditor name, date range, filter criteria)
- **[Export CSV]** — exports raw data as CSV

> Exports are the ONLY "write" action permitted — they produce a file, not a data mutation.

#### Timeline Body

The audit log is displayed as a **vertical timeline** (NOT a table). Entries grouped by date.

**Date Group Header:**
```
━━━━━━━━━━  25 កញ្ញា 2026  ━━━━━━━━━━
```

**Timeline Entry (collapsed state):**
```
┌───────────────────────────────────────────────────────────┐
│ ● [HH:MM:SS]   [Avatar: Initials]  [Full Name]            │
│   [Date]        [Action description in Khmer]             │
│                                          [Module Badge]   │
│                                          [IP: x.x.x.x]   │
│                              [▼ Expand for details]       │
└───────────────────────────────────────────────────────────┘
```

**Timeline Entry (expanded state — on click):**
```
┌───────────────────────────────────────────────────────────┐
│ ● [HH:MM:SS]   [Avatar]  [Full Name]                      │
│   [Date]        [Action description]                      │
│                                          [Module Badge]   │
│                                          [IP: x.x.x.x]   │
│ ─────────────────────────────────────────────────────── │
│ BEFORE STATE:                                             │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ { "field": "old_value", ... }  [JSON diff — red]    │  │
│ └─────────────────────────────────────────────────────┘  │
│ AFTER STATE:                                              │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ { "field": "new_value", ... }  [JSON diff — green]  │  │
│ └─────────────────────────────────────────────────────┘  │
│                                    [View Full Detail →]   │
└───────────────────────────────────────────────────────────┘
```

**Color Coding of Timeline Dots & Entry Borders:**

| Action Type | Dot Color | Left Border Color | Hex |
|---|---|---|---|
| DELETE | Red | `#dc2626` | `#dc2626` |
| UPDATE/EDIT | Amber | `#d97706` | `#d97706` |
| CREATE | Green | `#16a34a` | `#16a34a` |
| VIEW / LOGIN | Blue | `#2563eb` | `#2563eb` |
| EXPORT | Purple | `#7c3aed` | `#7c3aed` |
| SYSTEM | Gray | `#6b7280` | `#6b7280` |

**Module Badges:**
Small pill badges: Sales (blue), Purchases (violet), Stock (orange), Finance (emerald), Users (rose), System (gray)

**Before/After JSON Diff View:**
- Only appears for UPDATE and DELETE actions
- Red highlighted lines = removed/old values
- Green highlighted lines = added/new values
- Use a monospace font (`font-family: 'Courier New', monospace`)
- The diff is read-only text — no copy-paste prevention (auditors may need to copy)

**Pagination:**
- 50 entries per page
- `[← Previous]` `[Page X of Y]` `[Next →]`
- Jump-to-page input field

**Actions Available:**
- Filter controls (read-only selectors)
- Expand/collapse timeline entries
- `[View Full Detail →]` link per entry → goes to `view-audit-detail.html`
- `[Export PDF]` and `[Export CSV]` — export current filtered set
- Pagination controls

**Rules/Constraints:**
- Audit trail entries are **immutable** — no edit, delete, or modify of any log entry is possible
- Filter state persists in URL query params (shareable filter links)
- Export PDF must embed: auditor name, generation timestamp, filter criteria as report header
- If no filters applied, export is limited to last 30 days to prevent massive file generation
- Page applies CSS class `read-only-mode`
- `[Export CSV]` itself gets logged as an EXPORT action in the audit trail

**Files to Create/Modify:**
- `frontend/roles/11-internal-auditor-executive/audit-trail/audit-trail.html`

---

### 3.3 Audit Detail — Single Audit Entry (`audit-trail/view-audit-detail.html`)

**Purpose:** Shows the complete forensic record of a single audit trail entry — full context, before/after snapshot, device info, and related documents.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  READ-ONLY BANNER                                           │
├─────────────────────────────────────────────────────────────┤
│  [← Back to Audit Trail]       [🖨 Print Record]            │
│  Page Title: "ព័ត៌មានលម្អិតនៃការកត់ត្រា"                      │
├─────────────────────────────────────────────────────────────┤
│  SECTION A: Event Metadata (top, full width, 2-col grid)    │
├────────────────────────────┬────────────────────────────────┤
│  SECTION B: Before State   │  SECTION C: After State        │
│  (left 50%)                │  (right 50%)                   │
├────────────────────────────┴────────────────────────────────┤
│  SECTION D: Related Documents (full width)                  │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**

#### Section A — Event Metadata (2-column grid of labeled fields)

| Label | Field |
|---|---|
| កំណត់ហេតុ ID | Unique audit entry ID (read-only, monospace) |
| ថ្ងៃ និងពេលវេលា | Full datetime (YYYY-MM-DD HH:MM:SS UTC+7) |
| អ្នកប្រើប្រាស់ | Full name + username |
| សកម្មភាព | Action type (CREATE / UPDATE / DELETE / VIEW) with color badge |
| ម៉ូឌុល | Module name with badge |
| ឯកសារ | Record ID / Document number affected |
| អាស័យដ្ឋាន IP | IP address |
| ប្រភេទឧបករណ៍ | User Agent string (browser + OS) |
| វគ្គការប្រើប្រាស់ | Session ID (truncated for display) |

All fields are displayed as **read-only labeled text** — no input boxes.

#### Section B — Before State

- Label: "ស្ថានភាពមុនការផ្លាស់ប្តូរ"
- Shows a formatted JSON block of the record's state before the action
- Changed fields highlighted in red (`#fca5a5` background on those lines)
- Font: monospace
- If action was CREATE (no prior state): show "— គ្មានទិន្នន័យពីមុន —" placeholder
- Box has a subtle red-tinted border: `border: 1px solid #fca5a5`

#### Section C — After State

- Label: "ស្ថានភាពក្រោយការផ្លាស់ប្តូរ"
- Shows formatted JSON block of the record's state after the action
- Changed fields highlighted in green (`#bbf7d0` background on those lines)
- Font: monospace
- If action was DELETE: show "— ទិន្នន័យត្រូវបានលុប —" placeholder with red text
- Box has a subtle green-tinted border: `border: 1px solid #bbf7d0`

#### Section D — Related Documents

- Label: "ឯកសារទាក់ទង"
- Shows any documents linked to this event (e.g., the Invoice, PO, Stock Record that was changed)
- Each linked document displayed as a clickable pill/badge:
  - `[📄 INV-2026-0012 →]` `[📦 PO-2026-0045 →]`
  - Clicking opens the document in VIEW-ONLY mode in that role's relevant page
- If no related documents: "— គ្មានឯកសារទាក់ទង —"

**Actions Available:**
- `[← Back to Audit Trail]` — returns to audit-trail.html (preserving filter state via URL params)
- `[🖨 Print Record]` — browser print dialog, formatted for A4 paper
- Clicking related document links — opens document detail in read-only view

**Rules/Constraints:**
- NO edit, delete, or modify buttons whatsoever
- Print CSS must hide the sidebar, banner, and browser chrome
- This page must be accessible directly via URL (e.g., `view-audit-detail.html?id=12345`)
- Entry ID must be prominently displayed for cross-referencing in audit reports
- Page applies CSS class `read-only-mode`

**Files to Create/Modify:**
- `frontend/roles/11-internal-auditor-executive/audit-trail/view-audit-detail.html`

---

### 3.4 Internal Controls — Policy Compliance & Breaches (`internal-controls/internal-controls.html`)

**Purpose:** Displays automatically detected policy violations, ranks risk areas by frequency and financial impact, and maintains a history of past audit review sessions — all in read-only view.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  READ-ONLY BANNER                                           │
├─────────────────────────────────────────────────────────────┤
│  Page Title: "ការគ្រប់គ្រងផ្ទៃក្នុង"                          │
├─────────────────────────────────────────────────────────────┤
│  SUB-NAV TABS:                                              │
│  [ការរំលោភលើគោលការណ៍] [ការវិភាគហានិភ័យ] [ការត្រួតពិនិត្យ]       │
├─────────────────────────────────────────────────────────────┤
│  TAB CONTENT (changes per selected tab)                     │
└─────────────────────────────────────────────────────────────┘
```

**Sub-Navigation Tabs:**

#### Tab 1 — ការរំលោភលើគោលការណ៍ (Policy Breaches)

**Purpose:** Lists all detected policy violations, sorted by severity and date.

**Layout:** Full-width list of breach cards with filter strip above.

**Filter Strip:**
- Status filter: `ទាំងអស់ | ដែលមិនទាន់ទទួលស្គាល់ | ដែលទទួលស្គាល់រួច`
- Severity filter: `Critical | Warning | Info`
- Date range filter
- Module filter

**Breach Card Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ [●Critical]  ចំណងជើង (Khmer) — e.g., "ការបញ្ចុះតម្លៃលើសកំណត់"  │
│              English subtitle: "Discount exceeded allowed %" │
│ ─────────────────────────────────────────────────────────── │
│ Description: [Concise explanation of the policy rule        │
│              that was violated and what happened]           │
│                                                             │
│ ប្រតិបត្តិករ: [Username / Full Name]    ម៉ូឌុល: [Module Badge] │
│ ថ្ងៃ: [Date & Time]                    ស្ថានភាព: [Badge]     │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│ [View Audit Trail →]              [✓ Acknowledge]           │
└─────────────────────────────────────────────────────────────┘
```

**Predefined Breach Types (prototype examples):**

| Breach | Severity | Description |
|---|---|---|
| Discount > allowed % | Warning | Discount applied exceeded role permission cap |
| Invoice voided after payment received | Critical | Invoice cancelled despite linked payment record |
| Stock movement without authorization | Critical | Goods moved or adjusted without linked approval |
| Price below cost at sale | Critical | Sale price set below recorded cost price |
| Failed approval bypass | Critical | Document moved to next stage without proper approval step |
| User access after hours | Warning | System accessed outside configured business hours |

**Status Badges:**
- `ដែលមិនទាន់ទទួលស្គាល់` — Red pill background
- `ដែលទទួលស្គាល់រួច` — Gray pill background
- `ដែលកំពុងស៊ើបអង្កេត` — Amber pill background

**[✓ Acknowledge] Button — Special Rule:**
- This is the **ONLY action button** in the entire Internal Auditor role that is not a pure navigation link
- Function: Marks the breach as "Acknowledged" (i.e., "I have seen this") — this does NOT edit the breach record or the underlying data
- It only writes a `acknowledged_by` + `acknowledged_at` field to the breach notification record
- After clicking: the status badge changes to "ដែលទទួលស្គាល់រួច", button becomes disabled/grayed
- Visually styled as a secondary/outline button (not a primary CTA) to reinforce its limited scope

#### Tab 2 — ការវិភាគហានិភ័យ (Risk Analysis)

**Purpose:** Ranks the top risk areas by frequency of violations and estimated financial impact.

**Layout:** List of risk items with visual progress bars (CSS-only, no ECharts).

**Risk Item Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ #1  ការបញ្ចុះតម្លៃដែលមិនត្រូវបានអនុញ្ញាត                        │
│     Unauthorized Discounting                                │
│                                                             │
│ ហានិភ័យ:   [●●●●●] High                                      │
│ ប្រេកង់:   [████████░░] 42 violations (last 90 days)         │
│ ផលប៉ះពាល់: ~$2,400 estimated financial exposure              │
│ ម៉ូឌុល:   [Sales]                                           │
│                           [View Related Breaches →]         │
└─────────────────────────────────────────────────────────────┘
```

- The "frequency" bar is a plain CSS `<div>` width percentage bar — NOT ECharts
- The "risk level" is shown as filled dots (●●●●○ = 4/5 high)
- Items sorted by a combined risk score (frequency × financial impact)
- Maximum 10 risk items shown
- "Last 90 days" is the default analysis window — configurable via dropdown at top

#### Tab 3 — ការត្រួតពិនិត្យ (Review History)

**Purpose:** Archives past internal audit review sessions and their findings.

**Layout:** Chronological list of review session cards.

**Review Session Card:**
```
┌─────────────────────────────────────────────────────────────┐
│ ការត្រួតពិនិត្យ #045   Q3 2026 Financial Audit                │
│ ─────────────────────────────────────────────────────────── │
│ ថ្ងៃចាប់ផ្តើម: 2026-07-01    ថ្ងៃបញ្ចប់: 2026-09-01             │
│ ត្រួតពិនិត្យដោយ: [Auditor Name]                               │
│                                                             │
│ ការរកឃើញ: 7 issues identified (3 Critical, 4 Warning)         │
│ ស្ថានភាព: [●Closed]                                          │
│                                                             │
│                              [View Findings Report →]       │
└─────────────────────────────────────────────────────────────┘
```

- Review sessions are created externally (or by admin) — auditor cannot create one here
- `[View Findings Report →]` opens a PDF or read-only findings document
- Status options: `Open`, `In Progress`, `Closed`

**Actions Available (across all tabs):**
- Tab switching (Tab 1 / 2 / 3)
- Filter controls (Tab 1 and Tab 2)
- `[View Audit Trail →]` links on breach cards → navigates to pre-filtered audit trail
- `[✓ Acknowledge]` on unacknowledged breach cards (limited write as described above)
- `[View Related Breaches →]` in Tab 2 → filters Tab 1 to that risk area
- `[View Findings Report →]` in Tab 3

**Rules/Constraints:**
- `alertBadge` in sidebar reflects count of unacknowledged breaches in Tab 1
- Alert badge number updates when breaches are acknowledged
- Auditor CANNOT create, edit, or delete breach records — they are system-generated
- Auditor CANNOT create review sessions — this is the Admin/GM responsibility
- Page applies CSS class `read-only-mode`

**Files to Create/Modify:**
- `frontend/roles/11-internal-auditor-executive/internal-controls/internal-controls.html`

---

### 3.5 Reports — Forensic Financial Analytics (`reports/reports.html`)

**Purpose:** Provides comprehensive financial analytics, ratio analysis, and year-over-year comparisons with ECharts visualizations — this is the ONLY page in this role that includes charts. Also contains the Financial Overview content merged from v1's separate page.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  READ-ONLY BANNER                                           │
├─────────────────────────────────────────────────────────────┤
│  Page Title: "របាយការណ៍សវនកម្ម"                               │
├─────────────────────────────────────────────────────────────┤
│  GLOBAL FILTER BAR:                                         │
│  [Date Range] [Period ▼: Month/Quarter/Year] [Reset]        │
│  [Export PDF]  (top right — no CSV for financial reports)   │
├─────────────────────────────────────────────────────────────┤
│  SUB-NAV TABS:                                              │
│  [របាយការណ៍ហិរញ្ញវត្ថុ] [ការវិភាគអនុប្បាត] [ការប្រៀបធៀបអតីតកាល]    │
├─────────────────────────────────────────────────────────────┤
│  TAB CONTENT                                                │
└─────────────────────────────────────────────────────────────┘
```

**Sub-Navigation Tabs:**

#### Tab 1 — របាយការណ៍ហិរញ្ញវត្ថុ (Financial Reports)

*This tab incorporates the content previously on the standalone `financial-overview.html` (v1).*

**Layout:** Two-column: P&L on left, Balance Sheet on right (or stacked on mobile).

**P&L Summary (read-only view):**
```
┌─────────────────────────────────────────────────────┐
│ របាយការណ៍ចំណូល-ចំណាយ (Income Statement)               │
│ Period: [selected period]                           │
│ ─────────────────────────────────────────────────── │
│ Revenue (ចំណូល)              $XXX,XXX               │
│   Sales Revenue              $XXX,XXX               │
│   Other Income               $XXX,XXX               │
│ ─────────────────────────────────────────────────── │
│ COGS (តម្លៃទំនិញដែលបានលក់)  ($XXX,XXX)              │
│ Gross Profit (ប្រាក់ចំណេញសរុប) $XXX,XXX             │
│ Operating Expenses           ($XXX,XXX)             │
│ Net Profit (ប្រាក់ចំណេញសុទ្ធ) $XXX,XXX              │
│ ─────────────────────────────────────────────────── │
│ Gross Margin %: XX.X%        Net Margin %: XX.X%   │
└─────────────────────────────────────────────────────┘
```

**Balance Sheet (read-only view):**
```
┌─────────────────────────────────────────────────────┐
│ តារាងតុល្យការ (Balance Sheet)                         │
│ As of: [selected end date]                          │
│ ─────────────────────────────────────────────────── │
│ ASSETS (អាស័យ)                                       │
│   Current Assets             $XXX,XXX               │
│   Fixed Assets               $XXX,XXX               │
│   Total Assets               $XXX,XXX               │
│ ─────────────────────────────────────────────────── │
│ LIABILITIES (បំណុល)                                  │
│   Current Liabilities        $XXX,XXX               │
│   Total Liabilities          $XXX,XXX               │
│ ─────────────────────────────────────────────────── │
│ EQUITY (មូលធន)               $XXX,XXX               │
└─────────────────────────────────────────────────────┘
```

**ECharts — Revenue vs Expenses Trend (Bar Chart):**
- Chart ID: `#ia-revenue-expense-chart`
- Type: Grouped Bar Chart (Revenue bars in blue, Expense bars in rose/red)
- X-axis: Months (or Quarters depending on period selector)
- Y-axis: Amount (KHR / USD toggle)
- Tooltip: shows exact figures on hover
- Legend: "ចំណូល" (Revenue) | "ចំណាយ" (Expenses)
- Chart placed BELOW the P&L and Balance Sheet tables

#### Tab 2 — ការវិភាគអនុប្បាត (Ratio Analysis)

**Financial Ratios Table:**

| Ratio Name (Khmer) | Ratio Name (EN) | Formula | Current Value | Benchmark | Status |
|---|---|---|---|---|---|
| ភាគរយចំណេញសរុប | Gross Margin % | Gross Profit / Revenue × 100 | XX.X% | >30% | ✓/✗ |
| ភាគរយចំណេញសុទ្ធ | Net Margin % | Net Profit / Revenue × 100 | XX.X% | >10% | ✓/✗ |
| អនុប្បាតចរន្ត | Current Ratio | Current Assets / Current Liabilities | X.XX | >1.5 | ✓/✗ |
| អនុប្បាតរហ័ស | Quick Ratio | (Current Assets − Inventory) / Current Liabilities | X.XX | >1.0 | ✓/✗ |
| ចំណូលទ្រព្យសម្បត្តិ | Return on Assets | Net Profit / Total Assets × 100 | XX.X% | >5% | ✓/✗ |

**Status column:** Green checkmark if above benchmark, red cross if below.

**Chart Type:** Grouped Bar Chart (Horizontal)
- Chart ID: `#ia-ratio-bar-chart`
- Type: `bar` with `orient: 'horizontal'`
- Y-axis: Financial ratios (Current Ratio, Quick Ratio, Debt-to-Equity, Gross Margin %, Net Margin %)
- X-axis: Value
- Each ratio has 2 bars side-by-side: "This Period" (violet/teal) vs "Benchmark" (slate-300)
- If ratio is below benchmark — bar color turns Red `#dc2626` automatically
- Tooltip: shows exact value + benchmark + variance
- Title: "ការប្រៀបធៀបសន្ទស្សន៍អត្ថន័យហិរញ្ញវត្ថុ"

```javascript
// Grouped Bar Chart
xAxis: { type: 'value' },
yAxis: {
  type: 'category',
  data: ['Current Ratio', 'Quick Ratio', 'Debt/Equity', 'Gross Margin', 'Net Margin']
},
series: [
  { name: 'This Period', type: 'bar', data: [...], itemStyle: { color: '#dc2626' } },
  { name: 'Benchmark', type: 'bar', data: [...], itemStyle: { color: '#94a3b8' } }
]
```

**Why Grouped Bar vs Radar:**
- Grouped Bar is more readable for exact value comparison
- Radar (spider web) makes it hard to compare numeric values precisely
- Auditors need precision, not just visual shape

#### Tab 3 — ការប្រៀបធៀបអតីតកាល (Historical Comparison)

**Period Selector:**
- Toggle: `Year-over-Year (YoY)` | `Month-over-Month (MoM)` | `Quarter-over-Quarter (QoQ)`

**ECharts — Line Chart (YoY Trend):**
- Chart ID: `#ia-historical-line-chart`
- Type: Multi-line chart
- Lines: Revenue (blue), COGS (orange), Gross Profit (green), Net Profit (rose)
- X-axis: Time periods (months for MoM, quarters for QoQ, years for YoY)
- Y-axis: Amount (KHR / USD toggle)
- Tooltip: All four values shown on hover with formatted numbers
- Data zoom slider at bottom for panning

**Summary Comparison Table (below chart):**

| Metric | Current Period | Previous Period | Change | % Change |
|---|---|---|---|---|
| Revenue | $XXX,XXX | $XXX,XXX | +$X,XXX | +X.X% ↑ |
| COGS | $XXX,XXX | $XXX,XXX | −$X,XXX | −X.X% ↓ |
| Gross Profit | $XXX,XXX | $XXX,XXX | +$X,XXX | +X.X% ↑ |
| Net Profit | $XXX,XXX | $XXX,XXX | +$X,XXX | +X.X% ↑ |

- Positive change: green text with ↑ arrow
- Negative change: red text with ↓ arrow

**Actions Available (across all tabs):**
- Tab switching
- Global Date Range + Period filters
- `[Export PDF]` — exports current tab as formatted PDF report
- ECharts tooltip interactions (hover only — no click-to-filter on charts)
- USD/KHR toggle on applicable charts

**Rules/Constraints:**
- Financial data is read-only — no inline editing of any figures
- Export PDF must include: auditor name, report title, date range, generation timestamp
- CSV export is NOT available on this page (financial statements are not raw data exports)
- ECharts may be used freely on this page — this is the designated reports page
- Page applies CSS class `read-only-mode`

**Files to Create/Modify:**
- `frontend/roles/11-internal-auditor-executive/reports/reports.html`
- Remove/redirect: `frontend/roles/11-internal-auditor-executive/financial-overview.html` (v1) — merge content into reports tab

---

## 4. UI Identity Details

| Property | Value |
|---|---|
| **Primary Color** | Rose Red `#dc2626` |
| **Secondary/Warning** | Amber `#d97706` |
| **Success/Safe** | Emerald `#16a34a` |
| **Sidebar Background** | Dark Slate `#0f172a` |
| **Sidebar Text** | Slate `#94a3b8` (inactive) / White (active) |
| **Sidebar Active Item** | Left border `4px solid #dc2626` + background `#1e293b` |
| **Content Background** | Cool White `#f8fafc` |
| **Card Background** | White `#ffffff` with `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` |
| **Font — Headings** | `font-weight: 700` — Battambang (Khmer) / Inter (Latin) |
| **Font — Body** | `font-weight: 400` |
| **Font — Labels** | `font-weight: 600`, `font-size: 0.75rem`, `text-transform: uppercase`, `letter-spacing: 0.05em` |
| **Monospace (diff/JSON)** | `Courier New, Consolas, monospace` |

### Unique Design Elements — What Makes This Role Distinct

1. **Persistent READ-ONLY Banner:** The amber banner at the top of every page is unique to this role — it visually communicates the auditor's observational role at all times.

2. **Sidebar Red Accent Border:** The `3px solid #dc2626` left border running the full height of the sidebar is a subtle but constant reminder of the forensic/security nature of this role. All other roles have no such sidebar border.

3. **"READ-ONLY MODE" Pill in Sidebar Header:** Placed directly below the role label, this rose/red pill badge is always visible regardless of which page is active.

4. **Timeline Layout for Audit Trail:** Unlike other roles that use tables or Kanban boards, the Internal Auditor uses a vertical timeline — communicating that chronology and sequence of events are the primary axis of analysis.

5. **JSON Diff Viewer:** The before/after state diff using colored JSON blocks (red/green line highlighting) is unique to this role and communicates technical forensic depth.

6. **Color-Coded Action Dots:** The red/amber/green/blue dot system on the timeline gives instant visual classification of action severity across hundreds of log entries.

7. **CSS `read-only-mode` class:** Applied globally on `<body>` — in the stylesheet, this class must hide or disable any elements with class `btn-create`, `btn-edit`, `btn-delete`, or `data-action="write"` if any shared components are accidentally included.

---

## 5. Developer Notes

### `portal.js` Config Changes

```
// v1 iaPortal nav (5 items) → v2 (4 items)
// REMOVE: financial-overview nav item
// ADD: merge financial-overview content into reports/reports.html as Tab 1

iaPortal.nav = [
  { id: 'ia-dashboard',         href: 'dashboard.html',                          label: 'ផ្ទាំងសវនកម្ម',           icon: 'mdi:shield-search' },
  { id: 'ia-audit-trail',       href: 'audit-trail/audit-trail.html',            label: 'កំណត់ហេតុសវនកម្ម',       icon: 'mdi:clipboard-text-clock-outline' },
  { id: 'ia-internal-controls', href: 'internal-controls/internal-controls.html', label: 'ការគ្រប់គ្រងផ្ទៃក្នុង', icon: 'mdi:shield-alert-outline', alertBadge: true },
  { id: 'ia-reports',           href: 'reports/reports.html',                    label: 'របាយការណ៍សវនកម្ម',     icon: 'mdi:file-chart-outline' },
]
```

### `data.js` Fields Needed

The following data structures are needed for prototype demo data:

```
auditTrail[]          — id, userId, userName, actionType, module, recordId, 
                        timestamp, ipAddress, userAgent, sessionId, 
                        beforeState (JSON obj), afterState (JSON obj)

redFlagAlerts[]       — id, type, severity, title_km, description_km, 
                        count, latestTimestamp, affectedIds[], auditTrailRef

policyBreaches[]      — id, type, severity, title_km, description_km, 
                        responsibleUser, module, detectedAt, status, 
                        acknowledgedBy, acknowledgedAt

riskAreas[]           — id, name_km, name_en, riskLevel (1–5), 
                        violationCount, estimatedExposure, module, period

reviewSessions[]      — id, title, periodStart, periodEnd, auditorName, 
                        findings[], status

systemHealth{}        — loginsToday, failedLoginsToday, 
                        dataModificationsToday, deletionsToday

financialSummary{}    — revenue, cogs, grossProfit, netProfit, 
                        operatingExpenses, totalAssets, totalLiabilities,
                        currentAssets, currentLiabilities, equity, period

financialTrend[]      — period, revenue, cogs, grossProfit, netProfit
```

### Shared Component Usage

- **Alert/Warning Banner:** Extract READ-ONLY banner as a shared component `_readonly-banner.html` — included via JS `fetch()` or template literal in each page's `<script>` section
- **Export Button:** Use shared export utility — `exportPDF(elementId, filename, metadata)` — metadata must include auditor name and timestamp
- **JSON Diff Viewer:** Implement as a standalone JS function `renderJsonDiff(before, after, containerId)` — shared across audit-trail.html and view-audit-detail.html
- **ECharts:** Only loaded on `reports/reports.html` — do NOT include the ECharts script tag on dashboard, audit-trail, or internal-controls pages

### Read-Only Enforcement CSS

```css
body.read-only-mode .btn-create,
body.read-only-mode .btn-edit,
body.read-only-mode .btn-delete,
body.read-only-mode [data-action="write"],
body.read-only-mode [data-action="create"],
body.read-only-mode [data-action="update"],
body.read-only-mode [data-action="delete"] {
  display: none !important;
}
```

Apply `class="read-only-mode"` on the `<body>` tag of every page in this role folder.

### Audit Trail Immutability (Future Backend Note)

When building the real backend:
- Audit trail table must have NO `UPDATE` or `DELETE` endpoints — INSERT only
- The audit trail itself must be stored in a separate, append-only log store
- Consider cryptographic hashing (SHA-256) of each log entry at write time for tamper-evidence
- The `[✓ Acknowledge]` on policy breaches writes to a SEPARATE `breach_acknowledgements` table — it never modifies the original breach record

---

*End of Document — Internal Auditor (Role 11) v2 UI/UX Design Plan*
*DIGITECHKH eBMS — Planning Document — For Developer Use Only*
