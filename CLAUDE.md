# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A **static HTML/CSS/JS prototype** of DIGITECHKH's Business Management System (BMS) — sales, purchasing, stock, reporting and settings, entirely in Khmer.

There is no build system, no `package.json`, no bundler, no tests, and no backend. Pages are plain HTML files opened directly in a browser, styled by the Tailwind Play CDN and a hand-written `custom.css`.

`docs/` describes the **future** production system (Angular 22 + Spring Boot 4.1 + PostgreSQL, modular monolith). None of it is implemented. Treat `docs/` as design intent for a later rewrite, not as a description of the current code. `docs/RUNBOOK.md` in particular documents operations for a system that does not exist yet.

## Running it

```bash
open frontend/index.html                       # redirects to the login page
python3 -m http.server 8000 --directory frontend   # or serve it, then open localhost:8000
```

No build, lint, or test commands exist. Verification is visual: open the page in a browser.

## Mandatory project standards

Two files define non-negotiable rules and **must be read before changing any page**:

- [GEMINI.md](GEMINI.md) — the authoritative standards document (13 rules)
- [.ai/ui-rules.md](.ai/ui-rules.md) — an earlier, overlapping subset

Key rules, condensed (the source files are authoritative):

| Rule | Requirement |
|---|---|
| Language | **100% pure Khmer** in all UI text *and in all explanatory replies to the user*. No mixed English words, none in parentheses. |
| Numerals | Always Arabic numerals (`0-9`), never Khmer numerals — dates, money, codes, phone, percentages, quantities. |
| Header alignment | Sidebar brand block and content `<header>` are both exactly `h-[72px] px-6 flex-shrink-0` so the divider line runs straight across. |
| No native UI | Never `<select>`, `window.alert()`, `window.confirm()`, or native tooltips. Use the custom dropdown, `showToast()`, `showCustomConfirm()`. |
| No modals for CRUD | Create / Edit / View Detail must be **dedicated full pages**, never dialogs. |
| Back button | Icon-only, byte-identical across every sub-page (see GEMINI.md §5 for the exact markup). No text label, no divider. |
| Full width | `<main>` content uses `w-full`. Never `max-w-* mx-auto`. |
| Table actions | A single `⋮` button opening a floating action menu — never a row of inline buttons. |
| Typography | `Kantumruy Pro`; headings `font-semibold`, table rows and list names `font-medium`; avoid `text-slate-900/800` in tables, prefer `text-slate-700/600`. |
| Date range filter | Every date filter must be byte-identical to the one in `invoice.html` (see GEMINI.md §3 for markup and function names). |
| Document tables | No "discount" column. Financial summary order: subtotal → down payment → special discount → VAT 10% → grand total. |
| Printing | Official documents print A4-clean via `@media print`; hide sidebar/header/buttons, `page-break-inside: avoid` on rows and signature blocks. |

## Layout of the pages

`frontend/src/pages/` is numbered to match the sidebar's workflow order:

```
1-login/  2-home/  3-sales/  4-buy/  5-stock/  6-reports/  7-settings/
```

Each module has numbered feature subfolders (`3-sales/1-invoice/`, `3-sales/2-quote/`, …), and each feature subfolder holds up to four pages: `[feature].html` (list), `create-[feature].html`, `edit-[feature].html`, `view-[feature].html`. Never put a page loose in a module root.

`pages/empty.html` is a placeholder whose title/subtitle/icon are filled in at runtime by `setActiveNavItem()` from the `BMS_NAV_ITEMS` table.

## Architecture: how a page is assembled

Every page is a **self-contained document** — there are no includes or templates. A typical page contains, inline:

1. The Tailwind Play CDN `<script>` plus an inline `tailwind.config` defining the brand palette (`primary: #24692D`, `primary-dark: #1b5223`, `btn-navy: #16255c`, …)
2. Google Fonts (Kantumruy Pro) + Font Awesome 6.4
3. A link to `styles/custom.css`
4. A ~153-line `<aside>` sidebar, copied verbatim into the page
5. A `<header class="... h-[72px] ...">` with title, subtitle, search, bell icon and avatar
6. Page content, with hard-coded mock data in the markup
7. A page-local `<script>` for that page's behaviour
8. `<script src=".../ui-components.js">` then `<script src=".../sidebar.js">` at the end of `<body>`

### Shared runtime layer (`frontend/src/scripts/`)

These are classic scripts declaring globals — no modules, no imports. Everything is called from `onclick=` attributes in the HTML.

- **`ui-components.js`** — `showToast()`, `showCustomConfirm()` (Promise-based), the floating dropdown engine (`openFloatingDropdown` / `closeFloatingDropdown` / `closeAllFloatingDropdowns`), custom select/customer/product pickers, and the single-date picker (`initSingleDatePicker`, `renderSingleDatePickerGrid`, …). It installs global `click`, `scroll`, `resize` and `keydown` listeners to close popovers.
- **`sidebar.js`** — `BMS_NAV_ITEMS` (nav id → Khmer title, subtitle, icon, parent menu), `toggleMenu()`, `setActiveNavItem()`, the user-profile dropdown, the global notification flyout, the change-password modal, and the mobile drawer. It self-initialises on load.
- **`action-tracker.js`** — **dead file. No page loads it; do not edit it.** The live `window.BMSActionTracker` is a second, near-identical copy inlined at the bottom of `ui-components.js` (guarded by `if (window.BMSActionTracker) return;`). Edit that copy. It is an in-memory demo activity feed that resets on refresh; `showToast()` auto-records into it when the message matches Khmer action keywords (`បាន|រក្សាទុក|អនុម័ត|…`).
- **`main.js`** — nearly empty leftover; not a real entry point.

Only `ui-components.js` and `sidebar.js` are ever loaded by a page, in that order. Anything else in `scripts/` is unreferenced.

### Things `sidebar.js` injects at runtime — do not hand-write them into pages

`initUserProfileMenu()`, `initGlobalNotifications()` and `initMobileSidebarDrawer()` find existing elements by heuristic and build the rest of the DOM themselves:

- The **user profile drawer** (`#bmsUserProfileDrawer`) — a full-height slide-over on the right edge, plus its backdrop `#bmsProfileBackdrop`. Both are appended to `<body>`, not to the header, so no header stacking context can clip them. Any `header button img.rounded-full` (or an avatar whose `alt` mentions Avatar / អ្នកប្រើប្រាស់) becomes its trigger. It is a `<div>` on purpose: `custom.css` applies `aside { background: #1b5223 !important }` and an off-canvas `aside` transform below 1024px, which would wreck it. Controlled by `openUserProfileDrawer()` / `closeUserProfileDrawer()` / `toggleUserProfileDrawer()`; goes full-screen under 640px.
- The **notification flyout** (`#bmsNotificationFlyout`) is created next to any `header i.fa-bell`. Two tabs — the BMSActionTracker timeline and a mock notification feed (`BMS_NOTIFICATIONS` + `buildNotifRow()` in `sidebar.js`) — plus a mark-all-read action. Its tab classes live on `BMSActionTracker.TAB_ACTIVE` / `.TAB_INACTIVE` so the initial markup and `switchTab()` cannot drift apart.
- The **mobile hamburger, drawer backdrop and sidebar close button** are injected automatically. The hamburger is deliberately *skipped* on pages whose header already contains the standard back button (`a i.fa-arrow-left`).

Consequence: changing the header's avatar or bell markup can silently break these features. Keep the recognisable hooks.

`getPagesRelativePath(target)` computes `../` depth from the current URL so injected links work from any nesting level. Use it for any link generated in JS.

### Active nav state

`setActiveNavItem(id)` fully derives the sidebar's active item, expanded parent menu and chevron rotation from `data-nav` attributes. **The active-state classes hand-written into each page's sidebar copy are redundant** — they are the reason the 56 sidebar copies are not byte-identical. Prefer letting the script own active state.

## Known duplication — check before editing

There is no shared layout, so single logical changes fan out across many files. Before a "small" edit, know the blast radius:

| Duplicated thing | Copies |
|---|---|
| The `<aside>` sidebar (~153 lines) | 56 pages |
| Inline `tailwind.config` brand palette | 57 pages |
| Tailwind Play CDN `<script>` | 57 pages |
| Date-range picker markup + JS (`toggleDatePicker`, `renderCalendarGrid`, …) | 17 pages |
| Hot-linked Unsplash avatar `photo-1494790108377…` | 56 pages |
| `onclick=` handlers in markup | ~1,300 |

When asked to change navigation, brand colour, the date picker or the header, **apply it to every copy** (a scripted `sed`/`ripgrep` pass is usually right) or explicitly propose extracting it into a shared script first.

## `custom.css` gotchas

`frontend/src/styles/custom.css` (~2,400 lines) does more than add classes:

- It **overrides Tailwind's type scale globally with `!important`** — `.text-xs` renders at 14.5px, `.text-sm` at 15.5px, `.text-base` at 16.5px, and matching `[class*="text-xs"]` catches arbitrary values too. Tailwind size class names therefore do **not** mean their usual sizes; never debug a font-size problem without checking here first. Consequence: a component built from `text-xs` titles over `text-[11px]` subtitles renders both at the same size and loses its hierarchy. To restore hierarchy in one component without touching the global scale, add ID-scoped rules (higher specificity + `!important`) — see the `#bmsUserProfileDrawer .pd-*` block at the end of the file for the pattern.
- It softens `text-slate-900/800` and `text-gray-900/800` globally.
- It hides all scrollbars globally while preserving scrolling (GEMINI.md §7).
- It holds the `@media print` rules and the `< 1024px` off-canvas drawer rules (`aside.mobile-open`, `#bmsMobileBackdrop.active`).

## Data

All data is fake and hard-coded in the markup or in JS literals. There is no persistence beyond `sessionStorage` (`bms_active_nav`) and the in-memory action tracker. Per GEMINI.md §10, prices are modelled as varying by customer tier / contract and by supplier — reflect that in any pricing UI rather than showing one fixed price per product.
