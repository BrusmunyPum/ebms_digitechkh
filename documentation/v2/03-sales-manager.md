# Sales Manager — v2 UI/UX Design Plan

> **Role:** Sales Manager (អ្នកគ្រប់គ្រងផ្នែកលក់)
> **Portal ID:** `smPortal`
> **Folder:** `frontend/roles/03-sales-manager/`
> **Archetype:** B — Action & Pipeline Engine
> **Version:** v2 | Last Updated: 2026-09-25

---

## 1. Role Identity

| Attribute         | Value                                                                           |
|-------------------|---------------------------------------------------------------------------------|
| **Archetype**     | B — Action & Pipeline Engine                                                    |
| **Primary Color** | Royal Blue `#1d4ed8`                                                            |
| **Accent Color**  | Amber `#f59e0b` — used exclusively for approval/warning signals                 |
| **UI Style**      | Operational momentum — dense data, fast action, pipeline-first thinking         |
| **Persona**       | Sales Team Leader                                                               |
| **Key Behaviors** | Monitor team quota attainment, approve/reject discounts (5–15% authority range), manage deal pipeline strategy, read AR alerts |
| **Layout Mode**   | Action-dense with pipeline Kanban; leaderboard-driven accountability            |
| **Font Style**    | Semibold section headers; medium body text; Khmer legible at `14px` minimum     |

### Persona Description

The Sales Manager's session flow is:

1. Open dashboard → scan KPIs + urgent approval strip
2. Approve/reject discount requests inline or navigate to Approval Queue
3. Check pipeline for stuck deals
4. Review team performance and credit limit warnings
5. Generate or review reports (on dedicated Reports page — not dashboard)

The UI must **surface deal urgency and team accountability** at every touchpoint. Speed of approval is paramount — discount windows are time-sensitive. The Sales Manager does not manage users, settings, or accounting — those navigation items are absent.

---

## 2. Sidebar Navigation

> **Rule:** 4 items maximum. Labels in Khmer. Badge only on Approvals. Reports tab is last.

| # | ID               | Label (Khmer)              | Icon (MDI)                   | Target File                     | Badge / Alert                |
|---|------------------|----------------------------|------------------------------|---------------------------------|------------------------------|
| 1 | `sm-dashboard`   | ផ្ទាំងគ្រប់គ្រងលក់          | `mdi:chart-pie`              | `dashboard.html`                | None                         |
| 2 | `sm-approvals`   | ជួរអនុម័ត                  | `mdi:stamper`                | `approvals/approvals.html`      | **Yes** — pending count pill |
| 3 | `sm-pipeline`    | បំពង់លំហូរការលក់             | `mdi:sitemap-outline`        | `pipeline/pipeline.html`        | None                         |
| 4 | `sm-reports`     | របាយការណ៍លក់               | `mdi:chart-bar`              | `reports/reports.html`          | None                         |

### Sidebar Visual Rules

- **Active state:** Left border `4px solid #1d4ed8`; background `#e8eef5`; icon + label deep blue
- **Inactive state:** Icon + label `#6b7280`; transparent background
- **Badge pill:** Amber `#f59e0b` background with dark `#1d4ed8` numeral — distinct from GM's red badge
- **Sidebar width:** `240px`; collapses to `64px` icon-only on `< 1280px`
- **Sidebar header:** eBMS logo + role label `"អ្នកគ្រប់គ្រងផ្នែកលក់"` in small deep blue caps
- **Sidebar footer:** User avatar, name, logout icon

---

## 3. Pages & Layouts

---

### 3.1 Sales Operations Dashboard (`dashboard.html`)

**Purpose:** Give the Sales Manager an at-a-glance command view of team revenue attainment, the most urgent pending discount approvals, deal health, and credit risk — enabling fast decisions without navigating away from the dashboard.

**Layout:** Vertical stack of 5 zones. Content area `max-width: 1400px`, centered. Top-to-bottom priority order: team KPIs → urgent approvals → leaderboard → credit warnings.

```
┌─────────────────────────────────────────────────────────────┐
│  ZONE 1: Top KPI Row (3 cards, equal width)                 │
├─────────────────────────────────────────────────────────────┤
│  ZONE 2: Urgent Approval Strip (amber — inline actions)     │
├─────────────────────────────────────────────────────────────┤
│  ZONE 3: Team Leaderboard (ranked list, text only)          │
├─────────────────────────────────────────────────────────────┤
│  ZONE 4: Credit Limit Warning Cards                         │
└─────────────────────────────────────────────────────────────┘
```

---

#### Zone 1 — KPI Cards (3 cards, equal-width 3-column grid)

**Card 1 — Team Revenue vs Target**

- Icon: `mdi:currency-usd` in deep blue
- Label: `"ចំណូលក្រុម / គោលដៅ"`
- Value: `"$XX,XXX / $XX,XXX"` — two figures on one line
- Progress bar: Inline horizontal bar below the values
  - Fill color: Green `#10b981` if ≥ 100%, Amber `#f59e0b` if 80–99%, Red `#dc2626` if < 80%
  - Bar represents `(actualRevenue / targetRevenue) * 100%`
  - Bar height: `8px`, rounded ends, full card width
- Sub-label: Percentage text (e.g., `"87% នៃគោលដៅខែនេះ"`)
- **Not clickable** — informational only
- Card bg: White; left border `4px solid #1d4ed8`

**Card 2 — Quotes Pending Approval**

- Icon: `mdi:file-document-edit-outline` in amber
- Label: `"តម្លៃដែលរង់ចាំ"`
- Value: Integer count (e.g., `8`)
- Sub-label: `"ចុចដើម្បីមើល"` — entire card clickable → routes to `approvals/approvals.html`
- Left border: `4px solid #f59e0b` (amber — signals urgency)

**Card 3 — Overdue AR Alerts**

- Icon: `mdi:alert-rhombus-outline` in red
- Label: `"AR ហួសកំណត់"`
- Value: Integer count of customers with overdue balance (e.g., `4`)
- Sub-label: Total overdue amount (e.g., `"$6,200 សរុប"`)
- Left border: `4px solid #dc2626` (red)
- **Alert state:** Card glows with red box-shadow if count > 0

**KPI Card Rules:**
- Cards are equal height (`120px`)
- No ECharts embedded — the progress bar on Card 1 is a pure CSS `<div>`, not a chart library widget
- Card 2 is fully clickable; Cards 1 and 3 are informational only

---

#### Zone 2 — Urgent Approval Strip

- **Component:** Full-width amber-tinted strip showing the top 3 discount approval requests inline
- **Background:** `#fffbeb` (very light amber) with `border: 1px solid #f59e0b`
- **Header bar (inside strip):** `"ការអនុម័តបន្ទាន់"` label left + `"មើលទាំងអស់ →"` text link right → routes to `approvals/approvals.html`

**Approval Mini-Card (horizontal, 3 per row):**

```
[ Sales Rep Avatar ]  [ Customer Name ]          [ Original → Discounted ]
  [Rep Name]          [ Discount: 12% ]          [ $800 → $704 ]
  [Justification excerpt — 1 line]
  [Approve ✔]  [Reject ✘]
```

| Element              | Detail                                                                    |
|----------------------|---------------------------------------------------------------------------|
| Sales Rep Avatar     | 32px circle, initials fallback                                            |
| Rep Name             | Bold `14px`; sub-line: customer name in gray                             |
| Discount %           | Amber pill badge (e.g., `"12%"`)                                         |
| Price delta          | `Original $800 → Discounted $704`; delta in red `(-$96)`                 |
| Justification        | One-line excerpt from rep's note; truncated with ellipsis                |
| [Approve ✔]          | Green filled small button; triggers confirmation modal                    |
| [Reject ✘]           | Red outline small button; triggers reject modal with reason input         |

**Strip Rules:**
- Sorted: highest discount % first (most risk = most urgent)
- If zero pending: strip shows `"គ្មានការអនុម័តបន្ទាន់"` in green with check icon; collapses to minimal height
- After inline action: mini-card fades out (CSS transition); count badge decrements
- Inline [Approve] confirmation modal: `"អ្នកពិតជាចង់អនុម័ត XX% នៅលើ [Customer]?"` with policy reminder line

---

#### Zone 3 — Team Leaderboard

- **Header:** `"ចំណាត់ថ្នាក់ក្រុម (ខែនេះ)"`
- **Layout:** Horizontal row of sales rep cards — scrollable if > 5 reps; 5 max shown before horizontal scroll
- **Per-Rep Card (vertical card):**

  | Element          | Detail                                                              |
  |------------------|---------------------------------------------------------------------|
  | Rank badge       | `#1`, `#2`, `#3` etc. — Gold, Silver, Bronze for top 3            |
  | Avatar           | 48px circle                                                         |
  | Name             | Bold `14px`                                                         |
  | Revenue          | `$XX,XXX` bold                                                      |
  | Quota %          | `XXX%` with color: green ≥ 100%, amber 80–99%, red < 80%           |
  | Trend arrow      | `▲` green (up vs last month) or `▼` red (down vs last month)       |

- **Rules:**
  - Text-only — NO bar chart, NO ECharts
  - Sorted by `monthRevenue` descending
  - Footer link: `"មើលរបាយការណ៍ពេញ →"` → routes to `reports/reports.html`
  - Data: `data.js → salesReps[]` filtered to `role = SALES_EXECUTIVE`, sorted by revenue

---

#### Zone 4 — Credit Limit Warning Cards

- **Header:** `"អតិថិជនជិតហួសដែនឥណទាន"`
- **Layout:** Horizontal scrollable row of warning cards

**Per-Customer Warning Card:**

| Element            | Detail                                                                    |
|--------------------|---------------------------------------------------------------------------|
| Customer name      | Bold `14px`                                                               |
| Credit used        | `"$X,XXX / $X,XXX"` — used / limit                                       |
| Usage bar          | CSS progress bar: Amber if 80–99% used, Red if ≥ 100%                   |
| Usage %            | Percentage text (e.g., `"92% ប្រើប្រាស់"`)                               |
| Assigned rep       | Small avatar + name of responsible sales rep                             |
| Flag icon          | `mdi:flag-outline` amber if approaching; `mdi:flag` red if exceeded      |

**Warning Card Rules:**
- Only shows customers where credit usage ≥ 80%
- Sorted: highest usage % first
- If none: zone collapses with green note `"អតិថិជនទាំងអស់នៅក្នុងដែនឥណទានធម្មតា"`
- Cards are informational — no inline action buttons (action happens via AR module)
- Max 6 cards shown; `"+ [X] ច្រើនទៀត"` link if more

---

#### Dashboard — Actions Summary

| Action                      | Trigger                  | Outcome                                                |
|-----------------------------|--------------------------|--------------------------------------------------------|
| Click KPI Card 2            | Mouse click              | Navigate to `approvals/approvals.html`                 |
| Click [មើលទាំងអស់ →]        | Strip link click         | Navigate to `approvals/approvals.html`                 |
| Click [Approve ✔] in strip  | Mouse click              | Confirmation modal → POST approval                     |
| Click [Reject ✘] in strip   | Mouse click              | Reject modal with reason input → POST reject           |
| Click [មើលរបាយការណ៍ពេញ →]  | Leaderboard footer link  | Navigate to `reports/reports.html`                     |

#### Dashboard — Rules & Constraints

- **NO ECharts on this page** — the weekly chart that existed in v1 is moved to `reports/reports.html`
- The inline progress bar in Card 1 is CSS `<div>` only — not an ECharts gauge
- Leaderboard is text-only — no visual bars
- Pending count badge on sidebar and in KPI Card 2 share the same data source
- Page title: `"ផ្ទាំងគ្រប់គ្រងលក់"` in `<title>` tag
- Data source: `data.js → salesReps[], pendingApprovals[], customers[]`
- Responsive: KPI cards stack to 1-column on mobile; approval strip becomes vertically stacked mini-cards

#### Files to Create/Modify

- `frontend/roles/03-sales-manager/dashboard.html` — **MODIFY** (remove ECharts weekly chart, add Zones 1–4)

---

### 3.2 Discount & Credit Approval Queue (`approvals/approvals.html`)

**Purpose:** The Sales Manager's primary worklist for reviewing, approving, rejecting, or counter-offering discount and credit requests submitted by sales executives — within the SM's delegated authority range of 5–15%.

**Layout:** Full-page list view. Sticky filter tabs at top. Card list below.

```
┌──────────────────────────────────────────────────────────────┐
│  Page Header: "ជួរអនុម័ត" + pending count chip              │
├──────────────────────────────────────────────────────────────┤
│  Policy Reminder Banner (always visible, amber tint)         │
├──────────────────────────────────────────────────────────────┤
│  Filter Tabs: [រង់ចាំ] [បានអនុម័ត] [បានបដិសេធ]              │
├──────────────────────────────────────────────────────────────┤
│  Secondary Filters: [Sales Rep ▼] [Customer ▼] [Date ▼]     │
├──────────────────────────────────────────────────────────────┤
│  Approval Card List (scrollable)                             │
└──────────────────────────────────────────────────────────────┘
```

---

#### Section A — Policy Reminder Banner

- **Always visible** at the top of this page — cannot be dismissed
- Background: Light amber `#fffbeb`, border-left `4px solid #f59e0b`
- Icon: `mdi:information-outline`
- Text (3-tier policy, clearly formatted):
  ```
  0 – 5%  →  បុគ្គលិកលក់អនុម័តដោយផ្ទាល់
  5 – 15% →  ស្នើសុំការអនុម័តពីអ្នកគ្រប់គ្រងលក់  ← Your authority range
  > 15%   →  ស្នើសុំការអនុម័តពីអភិបាលទូទៅ
  ```
- `"Your authority range"` label is highlighted with deep blue underline

---

#### Section B — Filter Tabs

| Tab Label      | Filter Logic                             | Badge       |
|----------------|------------------------------------------|-------------|
| រង់ចាំ         | Status = `PENDING` — default active tab  | Count (amber) |
| បានអនុម័ត      | Status = `APPROVED`                      | Count (green) |
| បានបដិសេធ      | Status = `REJECTED`                      | None          |

- Active tab: underline `3px solid #1d4ed8`, label semibold
- Secondary filters (below tabs): Sales Rep dropdown, Customer dropdown, Date range picker

---

#### Section C — Approval Request Cards

Each card represents one discount or credit approval request.

**Card Layout (full-width horizontal):**

```
[ Rep Avatar ]  [ Rep Name ]                    [ Discount % Badge ]
                [ Customer Name ]               [ Original → Discounted ]
                [ Justification note ]          [ Delta amount ]
                [ Submitted: X hours ago ]
                [ View Detail ]  [ Approve ✔ ]  [ Reject ✘ ]  [ Counter ↔ ]
```

**Card Field Definitions:**

| Field                  | Detail                                                                          |
|------------------------|---------------------------------------------------------------------------------|
| Rep Avatar             | 40px circle; initials fallback                                                  |
| Rep Name               | Bold; sub-line: rep's department                                               |
| Customer Name          | Prominent text — who the discount applies to                                   |
| Discount % Badge       | Colored pill — Amber if 5–10%, Red-amber if 11–15%, Red if >15% (escalation)  |
| Original Price         | Strike-through text (e.g., `~~$1,000~~`)                                       |
| Discounted Price       | Bold green text (e.g., `$880`)                                                  |
| Delta Amount           | Red `(-$120)` — loss/concession value                                          |
| Justification          | Verbatim rep note — full text shown (no truncation); max 3 lines, expand link  |
| Date Submitted         | Relative (e.g., `"4 ម៉ោងមុន"`) with full datetime tooltip                     |
| [View Detail]          | Text link → `view-approval.html?id=X` (if approval detail page exists)         |
| [Approve ✔]            | Green filled button                                                             |
| [Reject ✘]             | Red outline button — triggers reject modal                                     |
| [Counter ↔]            | Amber outline button — triggers counter-offer modal                            |

**Card States:**

| State       | Visual                                                                  |
|-------------|-------------------------------------------------------------------------|
| Default     | White bg, `border: 1px solid #e5e7eb`                                   |
| Urgent      | Left border `4px solid #dc2626` (submitted > 24h ago)                   |
| Hover       | `bg: #f8fafc`, subtle shadow lift                                        |
| Approved    | (History tab) `bg: #f0fdf4`; green left border; greyed action buttons  |
| Rejected    | (History tab) `bg: #fef2f2`; red left border; greyed action buttons    |

---

#### Section D — Action Modals

**Approve Modal:**
- Title: `"អនុម័ត [X%] ដំណោះស្រាយ — [Customer Name]"`
- Body: Summary of what is being approved
- Optional note textarea: `"មតិ (ស្រេចចិត្ត)"`, 3 rows
- Buttons: `[✔ បញ្ជាក់ការអនុម័ត]` green / `[បោះបង់]` text link

**Reject Modal:**
- Title: `"បដិសេធ — [Customer Name]"`
- Required reason textarea: `"ហេតុផល (តម្រូវ)"`, 4 rows, min 10 chars enforced
- Buttons: `[✘ បញ្ជាក់ការបដិសេធ]` red / `[បោះបង់]` text link

**Counter-Offer Modal:**
- Title: `"ស្នើដំណោះស្រាយប្រឆាំង — [Customer Name]"`
- Input: `"ការបញ្ចុះតម្លៃដែលបានអនុញ្ញាត"` — number input `%` — must be ≤ 15%
- Note textarea: `"ពន្យល់ជូនបុគ្គលិក"` — required
- Buttons: `[↔ ផ្ញើការស្នើ]` amber / `[បោះបង់]` text link
- Validation: counter % cannot exceed SM's 15% authority ceiling

---

#### Section E — Escalation Rules (Visible in Card)

If a request is for > 15% discount:
- Card shows an escalation notice: `"⚠ ការបញ្ចុះតម្លៃនេះហួសអំណាចរបស់អ្នក — ត្រូវការការអនុម័តពី GM"`
- `[Approve]` and `[Counter]` buttons are **disabled** (grayed out with tooltip: `"ស្នើទៅ GM"`)
- `[Escalate to GM]` button replaces `[Approve]` — amber fill — routes request to GM approval queue

---

#### Approval Queue — Actions

| Action              | Trigger          | Outcome                                                          |
|---------------------|------------------|------------------------------------------------------------------|
| Tab switch          | Click tab        | Filter list by status                                            |
| Filter dropdowns    | Dropdown select  | Narrow list by rep / customer / date                             |
| [Approve ✔]         | Card button      | Approve modal → POST approval with optional note                 |
| [Reject ✘]          | Card button      | Reject modal → POST rejection with required reason               |
| [Counter ↔]         | Card button      | Counter modal → POST counter-offer %                             |
| [Escalate to GM]    | Card button (>15%)| Routes request to `gmPortal` pending approvals queue            |
| [View Detail]       | Card text link   | Navigate to detail view                                          |

#### Approval Queue — Rules & Constraints

- SM can only approve discounts in the 5–15% range
- Requests < 5%: should not appear in this queue (handled by sales exec directly)
- Requests > 15%: appear in queue but action buttons disabled; escalation only
- Reject reason is mandatory (min 10 characters)
- Counter-offer % ceiling = 15% (SM authority max) — client-side and logic validation
- Page title: `"ជួរអនុម័ត — អ្នកគ្រប់គ្រងផ្នែកលក់"`

#### Files to Create/Modify

- `frontend/roles/03-sales-manager/approvals/approvals.html` — **CREATE**

---

### 3.3 Sales Kanban Pipeline (`pipeline/pipeline.html`)

**Purpose:** Visual Kanban board representing the team's full deal pipeline — showing each active opportunity's stage, value, assigned rep, and age — enabling the SM to identify stuck deals and guide strategy.

**Layout:** Full-width horizontal Kanban board. Sticky header with filters + summary bar. Columns scroll horizontally if needed.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Page Header: "បំពង់លំហូរការលក់"                                    │
│  Filter Bar: [Sales Rep ▼] [Date Range ▼] [Value Range ▼] [ច្រោះ]  │
├──────────────────────────────────────────────────────────────────────┤
│  Summary Bar: [Lead: $X,XXX] [Quote Sent: $X,XXX] [Nego: $X,XXX]   │
│               [Won: $X,XXX] [Lost: —]                               │
├──────────────────────────────────────────────────────────────────────┤
│  Kanban Board                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌────────┐  │
│  │  Lead    │  │ Quote    │  │ Negoti-  │  │  Won   │  │  Lost  │  │
│  │          │  │ Sent     │  │ ation    │  │        │  │        │  │
│  │ [Card]   │  │ [Card]   │  │ [Card]   │  │ [Card] │  │ [Card] │  │
│  │ [Card]   │  │ [Card]   │  │ [Card]   │  │        │  │        │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  └────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Section A — Filter Bar

| Filter         | Component            | Options                                              |
|----------------|----------------------|------------------------------------------------------|
| Sales Rep      | Multi-select dropdown | All sales execs from `data.js → salesReps[]`        |
| Date Range     | Date picker (from/to) | Deal creation date range                            |
| Value Range    | Dual slider          | $0 — $100,000+                                       |
| [ច្រោះ]        | Apply button         | Reloads Kanban with filtered cards                   |
| [កំណត់ថ្មី]    | Reset button         | Clears all filters                                   |

---

#### Section B — Summary Bar

Sticky bar below filter row. Shows total pipeline value per stage:

| Stage       | Display                                           |
|-------------|---------------------------------------------------|
| Lead        | `"Lead: $XX,XXX (X deals)"`                       |
| Quote Sent  | `"Quote Sent: $XX,XXX (X deals)"`                 |
| Negotiation | `"Negotiation: $XX,XXX (X deals)"`                |
| Won         | `"Won ✔: $XX,XXX"` — green text                   |
| Lost        | `"Lost ✘: $XX,XXX"` — red text (informational)    |

- Background: Deep blue `#1e3a8a` bar; white text; stage values in amber `#f59e0b` for Won
- Total row: `"Pipeline Total: $XXX,XXX"` rightmost

---

#### Section C — Kanban Columns

**5 Swimlane Columns:**

| Column ID     | Label               | Column Accent Color     | Deal Exit Condition             |
|---------------|---------------------|-------------------------|---------------------------------|
| `LEAD`        | Lead                | Gray `#9ca3af`          | Qualified → move to Quote Sent |
| `QUOTE_SENT`  | Quote Sent          | Blue `#3b82f6`          | Accepted → Negotiation         |
| `NEGOTIATION` | Negotiation         | Amber `#f59e0b`         | Deal signed → Won              |
| `WON`         | Won ✔               | Green `#10b981`         | Terminal — read-only            |
| `LOST`        | Lost ✘              | Red `#dc2626`           | Terminal — read-only            |

**Column Layout:**
- Column header: Stage label + card count badge + total value
- Column body: Scrollable vertically; fixed column width `220px`; cards stack top-to-bottom
- `Won` and `Lost` columns: cards are read-only — no move actions

---

#### Section D — Deal Cards

Each Kanban card represents one deal/opportunity.

**Card Layout:**

```
┌────────────────────────────────────┐
│  [Customer Name]       [Rep Avatar]│
│  $X,XXX               [Rep Name]  │
│  ─────────────────────────────────│
│  ⏱ X days in stage                │
│  🏷 [Next Action Tag]              │
│  [Move Stage ▶]                    │
└────────────────────────────────────┘
```

**Card Fields:**

| Field            | Detail                                                                         |
|------------------|--------------------------------------------------------------------------------|
| Customer Name    | Bold `14px`; first line of card                                                |
| Deal Value       | `$X,XXX` — bold amber; right-aligned with rep avatar                          |
| Rep Avatar       | 28px circle; rep name tooltip on hover                                         |
| Days in Stage    | `"⏱ X ថ្ងៃ"` — color: gray if < 7 days, amber if 7–14 days, red if > 14 days |
| Next Action Tag  | Pill badge: `"ហៅទូរស័ព្ទ"`, `"ផ្ញើតម្លៃ"`, `"ប្រជុំ"`, `"ផ្ទៀងផ្ទាត់"`, etc.  |
| [Move Stage ▶]  | Dropdown button: lists next valid stages → moves card on select               |

**Card States:**

| State      | Visual                                                    |
|------------|-----------------------------------------------------------|
| Default    | White bg, `border: 1px solid #e5e7eb`, rounded `8px`      |
| Hover      | Shadow lift, cursor grab (future drag-and-drop ready)     |
| Stuck deal | Red left border `4px solid #dc2626` (> 14 days in stage)  |
| Won        | Green bg `#f0fdf4`, lock icon — no move options          |
| Lost       | `bg: #fef2f2`, lock icon — no move options               |

---

#### Section E — Stage Move Action

Clicking `[Move Stage ▶]` opens an inline dropdown:

- Lists available next stages (e.g., from `LEAD`: can move to `QUOTE_SENT` or `LOST`)
- Select stage → confirmation tooltip: `"ផ្លាស់ទីទៅ [Stage Name]?"` → confirm → card animates to target column
- Cards in `WON` and `LOST` are locked; no stage move available

**Future Enhancement Note (v3 scope — plan now, build later):**

> Drag-and-drop card reordering within a column and drag-to-stage-change is planned for v3. In v2, stage movement is via the `[Move Stage ▶]` dropdown only. Cards should have `data-draggable="false"` in v2 HTML to allow future JS hook-in without HTML refactoring.

---

#### Pipeline — Actions

| Action                     | Trigger              | Outcome                                               |
|----------------------------|----------------------|-------------------------------------------------------|
| Apply filters              | [ច្រោះ] button       | Reload board with filtered deal cards                 |
| Reset filters              | [កំណត់ថ្មី] button   | Show all deals                                        |
| [Move Stage ▶] dropdown    | Card button          | Inline confirmation → move card to target column      |
| Click customer name        | Card title click     | Navigate to customer detail (if customer page exists) |

#### Pipeline — Rules & Constraints

- SM sees ALL reps' deals; individual Sales Exec sees only their own (filter enforced by portal role)
- `WON` and `LOST` are terminal — no move from those columns
- Days-in-stage counter starts from when the card last moved to current stage
- Cards with > 14 days in `NEGOTIATION` trigger red styling + alert flag
- Summary bar recalculates on filter apply
- Page title: `"បំពង់លំហូរការលក់"`
- Data source: `data.js → deals[]`

#### Files to Create/Modify

- `frontend/roles/03-sales-manager/pipeline/pipeline.html` — **MODIFY** (redesign from list to true Kanban layout; add summary bar; add move-stage dropdown)

---

### 3.4 Sales Analytics & Reports (`reports/reports.html`)

**Purpose:** Dedicated analytics page — the ONLY page in the Sales Manager portal where ECharts is used. Provides full chart-based sales performance review, team comparison, and conversion funnel analysis.

**Layout:** Full-width. Sticky filter bar at top. Chart sections stacked vertically below. KPI summary table at bottom.

```
┌──────────────────────────────────────────────────────────────────┐
│  Page Header: "របាយការណ៍លក់"    [Export CSV]  [Print]            │
├──────────────────────────────────────────────────────────────────┤
│  Filter Bar: [Date Range ▼]  [Sales Rep ▼]  [Department ▼]       │
├──────────────────────────────────────────────────────────────────┤
│  CHART SECTION 1: Monthly Revenue Bar + Target Line              │
├──────────────────────────────────────────────────────────────────┤
│  CHART SECTION 2: Sales Rep Performance (Grouped Bar or Radar)   │
├──────────────────────────────────────────────────────────────────┤
│  CHART SECTION 3: Quote-to-Invoice Conversion Funnel             │
├──────────────────────────────────────────────────────────────────┤
│  KPI Summary Table (by sales rep)                                │
└──────────────────────────────────────────────────────────────────┘
```

---

#### Section A — Filter Bar (Sticky)

| Filter         | Component              | Options                                                |
|----------------|------------------------|--------------------------------------------------------|
| Date Range     | Date picker (from/to)  | Presets: This Month, Last 3 Months, This Year, Custom  |
| Sales Rep      | Multi-select dropdown  | All reps; default = All                                |
| Department     | Dropdown               | Sales only (locked to Sales for this portal)           |
| [ជ្រើសយក]     | Apply button           | Reload all 3 charts + KPI table                        |

- Filter bar is sticky — remains visible when scrolling through charts
- Active filter state: chips shown below filter bar (e.g., `[Jan–Jun 2026 ×] [Rep: All ×]`)

---

#### Section B — Chart 1: Monthly Revenue Bar Chart (ECharts)

**Chart Type:** ECharts `bar` series with `line` series overlay

**Chart Title:** `"ចំណូលប្រចាំខែ — ក្រុមលក់"`

| Series          | Type   | Style                                        |
|-----------------|--------|----------------------------------------------|
| Actual Revenue  | Bar    | Deep blue `#1d4ed8` fill; rounded top corners |
| Monthly Target  | Line   | Amber `#f59e0b` dashed line; circle markers  |

**Axes:**
- X-axis: Month labels (e.g., `"មករា", "កុម្ភៈ", ...`)
- Y-axis: Currency values in USD; formatted as `$X,XXX`
- Tooltip: On hover — `"ខែ: [Month] | ចំណូល: $X,XXX | គោលដៅ: $X,XXX | [+/-] X%"`

**Chart Options:**
- Zoom: X-axis range slider at bottom (ECharts `dataZoom`)
- Legend: `"ចំណូលពិត"` (blue) + `"គោលដៅ"` (amber) — top-right
- Grid: Light gray horizontal grid lines only; no vertical lines

---

#### Section C — Chart 2: Sales Rep Performance (ECharts)

**Chart Type:** ECharts `bar` (grouped) — recommended primary; Radar chart as secondary option

**Recommended: Grouped Bar Chart**

- **Chart Title:** `"ដំណើរការបុគ្គលិកលក់"`
- X-axis: Sales rep names
- Y-axis: USD revenue
- Series groups per bar:
  - `"ចំណូលខែនេះ"` — Deep blue `#1d4ed8`
  - `"គោលដៅ"` — Amber `#f59e0b`
- Tooltip: Shows both values + quota % attainment
- Each rep's bars side-by-side; reps on X-axis

**Alternative: Radar Chart** (toggle button to switch)

- Axes: Revenue, Quota %, Conversion Rate, Avg Deal Value, Deals Closed
- Each rep = one radar polygon in distinct color
- Useful for multi-dimensional performance comparison
- Toggle button: `[📊 Grouped Bar]` / `[🕸 Radar]` — switches chart type on click without page reload

---

#### Section D — Chart 3: Quote-to-Invoice Conversion Funnel (ECharts)

**Chart Type:** ECharts `funnel`

**Chart Title:** `"អត្រាបំប្លែងការដកស្រង់ → វិក្កយបត្រ"`

| Funnel Stage          | Label (Khmer)               | Value            |
|-----------------------|-----------------------------|------------------|
| Quotes Created        | "ការដកស្រង់ដែលបានបង្កើត"    | e.g., 120 |
| Quotes Sent to Client | "ផ្ញើទៅអតិថិជន"             | e.g., 98  |
| Client Responded      | "អតិថិជនឆ្លើយតប"            | e.g., 74  |
| Invoice Issued        | "វិក្កយបត្របានចេញ"          | e.g., 52  |
| Payment Received      | "បានទទួលការទូទាត់"          | e.g., 45  |

- Funnel narrows top-to-bottom; each stage shows count + conversion rate vs. previous
- Colors: Gradient from deep blue at top to amber at bottom
- Tooltip: Stage label + count + `"[XX%] នៃដំណាក់កាលមុន"`

---

#### Section E — KPI Summary Table

Tabular summary below all charts. One row per sales rep.

**Columns:**

| Column                | Detail                                                            |
|-----------------------|-------------------------------------------------------------------|
| ឈ្មោះ                 | Rep name + small avatar                                           |
| ការដកស្រង់ (Quotes)    | Count of quotes issued in period                                  |
| វិក្កយបត្រ (Invoices)  | Count converted to invoice                                        |
| អត្រាបំប្លែង           | `(Invoices / Quotes) × 100%` — color coded                       |
| ចំណូល                 | Total revenue USD                                                 |
| គោលដៅ                 | Target amount USD                                                 |
| (%គោលដៅ)              | `(Revenue / Target) × 100%` — progress bar inline                |
| ប្រាក់ខែ Estimate      | Commission estimate `(Revenue × commission_rate)` — italic gray  |

**Table Rules:**
- Default sort: Revenue descending
- Sortable by clicking column header (toggle asc/desc)
- Totals row at bottom: summed columns in bold
- Pagination: 15 rows per page (useful when many reps)
- Commission rate read from `data.js → commissionRates[]` by role

---

#### Reports — Actions

| Action                    | Trigger                  | Outcome                                                |
|---------------------------|--------------------------|--------------------------------------------------------|
| Apply filters             | [ជ្រើសយក] button         | Reload all 3 ECharts + KPI table with filtered data    |
| [Export CSV]              | Header button            | Download KPI table as `.csv`                           |
| [Print]                   | Header button            | Browser print dialog; charts render in print-safe mode |
| Chart toggle (Chart 2)    | `[Grouped Bar]/[Radar]`  | Switch chart type without page reload                  |
| Sort table column         | Column header click      | Client-side sort toggle                                |
| ECharts X-axis zoom       | Range slider drag        | Zoom into specific month range on Chart 1              |

#### Reports — Rules & Constraints

- **ECharts IS used here** — this is the designated analytics page
- All 3 charts plus KPI table must respect the same filter state
- Chart rendering: ECharts must render after DOM is ready; use `echarts.init()` in `DOMContentLoaded`
- Print mode: ECharts charts must render as static SVG images in print layout
- CSV export: exports the KPI table data only (not chart image)
- Commission estimate column: shown as informational only; disclaimer text below table: `"*តម្លៃប្រាក់ខែគ្រាន់តែជាការប៉ាន់ស្មាន"`
- Page title: `"របាយការណ៍លក់ — អ្នកគ្រប់គ្រងផ្នែកលក់"`

#### Files to Create/Modify

- `frontend/roles/03-sales-manager/reports/reports.html` — **MODIFY** (add all 3 ECharts; add KPI table; add filter bar; migrate charts from dashboard)

---

## 4. UI Identity Details

| Attribute            | Value                                                                    |
|----------------------|--------------------------------------------------------------------------|
| **Primary Color**    | Royal Blue `#1d4ed8`                                                     |
| **Accent Color**     | Amber `#f59e0b` — approval signals, targets, warnings                    |
| **Success**          | Emerald `#10b981` — Won deals, approved, on-target                       |
| **Danger**           | Red `#dc2626` — overdue AR, stuck deals, rejected, exceeded credit       |
| **Background Tone**  | Light gray `#f1f5f9`; card surfaces white `#ffffff`                      |
| **Text Primary**     | Dark slate `#1e293b`                                                     |
| **Text Secondary**   | Gray `#6b7280`                                                           |
| **Border**           | `#e5e7eb`                                                                |
| **Column Headers**   | `#f8fafc` sticky — slightly off-white                                    |

### Typography

| Usage             | Weight  | Size     |
|-------------------|---------|----------|
| Page Title        | `700`   | `22px`   |
| Section Header    | `600`   | `18px`   |
| Card Title        | `600`   | `14px`   |
| Body / Data       | `400`   | `14px`   |
| Sub-label / Help  | `400`   | `12px`   |
| KPI Values        | `700`   | `26px`   |
| Deal Value        | `700`   | `16px` amber |

- Khmer font: `Hanuman` or `Kantumruy Pro`
- English / numbers: `Inter` or `system-ui`

### Unique Design Elements (Archetype B Signature)

1. **Amber as urgency language** — all approval-related elements use amber as their base color; it signals "action needed" without the aggression of red
2. **Kanban pipeline as the strategic lens** — the pipeline is a first-class navigation item, not buried in a submenu; SM thinks in stages
3. **Policy reminder always visible** — the discount authority policy banner cannot be dismissed, preventing authority overreach
4. **Team-first data presentation** — all data is shown at team level first (not individual self); SM's job is team accountability
5. **ECharts isolated to Reports page** — dashboard is intentionally chart-free; data density comes from structured cards and lists
6. **Escalation pathway built in** — the counter-offer and escalate-to-GM buttons are first-class UI elements, not afterthoughts
7. **Trend arrows on leaderboard** — a single `▲`/`▼` arrow conveys momentum without requiring a chart

---

## 5. Developer Notes

### `portal.js` Configuration Notes

```
// smPortal nav — v2 (no change to structure; redesign internal pages only)
smPortal.nav = [
  { id: 'sm-dashboard',  label: 'ផ្ទាំងគ្រប់គ្រងលក់',   icon: 'mdi:chart-pie',         href: 'dashboard.html' },
  { id: 'sm-approvals',  label: 'ជួរអនុម័ត',            icon: 'mdi:stamper',           href: 'approvals/approvals.html', badge: true },
  { id: 'sm-pipeline',   label: 'បំពង់លំហូរការលក់',      icon: 'mdi:sitemap-outline',   href: 'pipeline/pipeline.html' },
  { id: 'sm-reports',    label: 'របាយការណ៍លក់',          icon: 'mdi:chart-bar',         href: 'reports/reports.html' }
];

// Badge data binding for sm-approvals:
smPortal.badgeSource = 'pendingApprovals.filter(a => a.status === "PENDING" && a.assignedTo === "SM").length';
```

### `data.js` Fields Required

```
// Deals / pipeline data
deals: [
  {
    id: 'DEAL-001',
    customerName: 'string',
    customerId: 'CUST-XXX',
    value: 0.00,
    stage: 'LEAD' | 'QUOTE_SENT' | 'NEGOTIATION' | 'WON' | 'LOST',
    assignedRepId: 'USR-XXX',
    createdAt: 'ISO datetime',
    stageChangedAt: 'ISO datetime',
    daysInStage: 0,
    nextAction: 'string',
    notes: 'string'
  }
]

// Discount approval requests (SM queue — subset of pendingApprovals)
pendingApprovals: [
  {
    id: 'APV-XXX',
    type: 'DISCOUNT',
    requesterId: 'USR-XXX',
    requesterName: 'string',
    customerId: 'CUST-XXX',
    customerName: 'string',
    originalPrice: 0.00,
    discountedPrice: 0.00,
    discountPercent: 0.0,
    justification: 'string',
    dateSubmitted: 'ISO datetime',
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COUNTER',
    assignedTo: 'SM' | 'GM',
    counterPercent: 0.0 | null,
    approverNote: 'string | null'
  }
]

// Customer credit data (credit limit warnings)
customers: [
  {
    id: 'CUST-XXX',
    name: 'string',
    creditLimit: 0.00,
    creditUsed: 0.00,
    creditPercent: 0.0,
    assignedRepId: 'USR-XXX'
  }
]

// Sales reps (leaderboard, filter options)
salesReps: [
  {
    id: 'USR-XXX',
    name: 'string',
    role: 'SALES_EXECUTIVE',
    monthRevenue: 0.00,
    monthTarget: 0.00,
    quotaPercent: 0.0,
    trendVsLastMonth: 'UP' | 'DOWN' | 'FLAT',
    quotesIssued: 0,
    invoicesConverted: 0,
    conversionRate: 0.0
  }
]

// Commission rates
commissionRates: [
  {
    role: 'SALES_EXECUTIVE',
    rate: 0.05  // 5% example
  }
]
```

### ECharts Usage Notes

- **Library:** ECharts v5.x — load via CDN or local copy in `assets/js/echarts.min.js`
- **Init pattern:** `echarts.init(document.getElementById('chart-container'))` inside `DOMContentLoaded`
- **Chart 1 (`bar` + `line`):** Use `series: [{type:'bar'}, {type:'line', yAxisIndex:0}]`
- **Chart 2 toggle:** Use a boolean flag `isRadar` toggled on button click; call `chart.setOption(radarConfig)` or `chart.setOption(barConfig)` accordingly
- **Chart 3 (`funnel`):** Use `series: [{type:'funnel', sort:'descending', label:{show:true, formatter:'{b}: {c}'}}]`
- **Responsive:** Call `chart.resize()` on `window.resize` event; also on sidebar collapse toggle
- **Print mode:** `chart.getDataURL({type:'svg'})` → inject into a `<img>` tag shown only in `@media print`

### Shared Components Used

| Component                  | Source                            | Used On                                 |
|----------------------------|-----------------------------------|-----------------------------------------|
| Sidebar shell              | `components/sidebar.html`         | All pages                               |
| Confirmation modal         | `components/modal-confirm.html`   | Approval actions, stage moves           |
| Reject modal (with input)  | `components/modal-reject.html`    | Reject + counter-offer actions          |
| Avatar circle              | `components/avatar.html`          | Approval cards, leaderboard, deal cards |
| Status badge/pill          | `components/badge.html`           | Approval types, deal stages             |
| CSS progress bar           | `components/progress-bar.html`    | KPI Card 1 (revenue), credit warnings   |
| Date range picker          | `components/date-picker.html`     | Reports filter, approvals filter        |
| Pagination controls        | `components/pagination.html`      | KPI table in reports                    |
| ECharts wrapper            | `components/chart-wrapper.html`   | Reports page only (3 charts)            |

### Files to Modify (Summary)

| File                                                       | Action   | Key Changes                                              |
|------------------------------------------------------------|----------|----------------------------------------------------------|
| `dashboard.html`                                           | MODIFY   | Remove ECharts weekly chart; add 4 zones per spec        |
| `pipeline/pipeline.html`                                   | MODIFY   | Redesign from list view to Kanban columns + summary bar  |
| `reports/reports.html`                                     | MODIFY   | Add all 3 ECharts; add KPI summary table; add filters    |

### Files to Create

| File                                                       | Action   | Notes                                                    |
|------------------------------------------------------------|----------|----------------------------------------------------------|
| `approvals/approvals.html`                                 | CREATE   | Full approval queue per spec                             |

---

*Document end — Sales Manager v2 UI/UX Design Plan*
