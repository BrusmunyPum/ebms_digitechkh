/* ច្រកគ្រប់គ្រងផ្នែកលក់ — Shared runtime
   ផ្ទុក៖ ថតរបារចំហៀងចល័ត, តម្រងកាលបរិច្ឆេទរួម (ស្តង់ដារលេខ 3), ម៉ឺនុយសកម្មភាពជួរតារាង (ស្តង់ដារលេខ 9) */

/* ===== 1. របារចំហៀងចល័តសម្រាប់អេក្រង់តូច (< 1024px) ===== */
function initPortalMobileDrawer() {
    const aside = document.querySelector('aside');
    const header = document.querySelector('header');
    if (!aside || !header) return;

    let backdrop = document.getElementById('bmsMobileBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'bmsMobileBackdrop';
        backdrop.onclick = closePortalDrawer;
        document.body.appendChild(backdrop);
    }

    // ទំព័ររងដែលមានប៊ូតុងត្រឡប់ក្រោយស្រាប់ មិនបញ្ចូលប៊ូតុងម៉ឺនុយទេ ដើម្បីកុំឱ្យក្បាលទំព័ររញ៉េរញ៉ៃ
    const hasBackButton = header.querySelector('a i.fa-arrow-left');
    if (!hasBackButton && !document.getElementById('bmsMobileMenuBtn')) {
        const btn = document.createElement('button');
        btn.id = 'bmsMobileMenuBtn';
        btn.type = 'button';
        btn.title = 'បើកម៉ឺនុយ';
        btn.className = 'lg:hidden w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition border border-slate-200/70 flex-shrink-0 mr-3';
        btn.innerHTML = '<i class="fas fa-bars text-sm"></i>';
        btn.onclick = openPortalDrawer;
        header.insertBefore(btn, header.firstElementChild);
    }

    if (!document.getElementById('bmsSidebarCloseBtn')) {
        const brand = aside.firstElementChild;
        if (brand) {
            const close = document.createElement('button');
            close.id = 'bmsSidebarCloseBtn';
            close.type = 'button';
            close.title = 'បិទម៉ឺនុយ';
            close.className = 'lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition flex-shrink-0 ml-auto';
            close.innerHTML = '<i class="fas fa-xmark text-sm"></i>';
            close.onclick = closePortalDrawer;
            brand.appendChild(close);
        }
    }
}

function openPortalDrawer() {
    const aside = document.querySelector('aside');
    const backdrop = document.getElementById('bmsMobileBackdrop');
    if (aside) aside.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
}

function closePortalDrawer() {
    const aside = document.querySelector('aside');
    const backdrop = document.getElementById('bmsMobileBackdrop');
    if (aside) aside.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
}

/* ===== 2. តម្រងកាលបរិច្ឆេទរួម (ស្តង់ដារលេខ 3) =====
   ទម្រង់ HTML ត្រូវបានបង្កើតចេញពីអនុគមន៍តែមួយ ដូច្នេះគ្រប់ទំព័រទាំងអស់ដូចគ្នាបេះបិទ 100% ដោយស្វ័យប្រវត្តិ */

const MONTH_NAMES_KH = {
    1: 'មករា', 2: 'កុម្ភៈ', 3: 'មីនា', 4: 'មេសា',
    5: 'ឧសភា', 6: 'មិថុនា', 7: 'កក្កដា', 8: 'សីហា',
    9: 'កញ្ញា', 10: 'តុលា', 11: 'វិច្ឆិកា', 12: 'ធ្នូ'
};

const DATE_PRESETS = [
    'ថ្ងៃនេះ', 'ម្សិលមិញ', 'សប្តាហ៍នេះ', 'សប្តាហ៍មុន', 'ខែនេះ',
    'ខែមុន', 'ឆ្នាំនេះ', '7 ថ្ងៃចុងក្រោយ', '14 ថ្ងៃចុងក្រោយ', '30 ថ្ងៃចុងក្រោយ'
];

let rangeStartDate = null;
let rangeEndDate = null;
let selectingRangeStart = false;
let currentPresetName = 'ខែនេះ';
let calCurrentMonth = 9;
let calCurrentYear = 2026;

function renderDateRangePicker(hostId) {
    const host = document.getElementById(hostId);
    if (!host) return;

    const presetButtons = DATE_PRESETS.map(name => {
        const isDefault = name === 'ខែនេះ';
        const cls = isDefault
            ? 'preset-btn w-full text-left px-3 py-1.5 rounded-lg bg-[#0f2b5c] text-white font-medium shadow-sm transition-colors'
            : 'preset-btn w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-600';
        return `<button class="${cls}" onclick="selectPreset('${name}')">${name}</button>`;
    }).join('');

    host.classList.add('relative');
    host.innerHTML = `
        <span class="text-xs text-slate-400 hidden sm:inline mr-1.5">កាលបរិច្ឆេទ:</span>
        <button onclick="toggleDatePicker(event)" class="h-9 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-xl inline-flex items-center gap-2 shadow-sm transition-all focus:outline-none cursor-pointer">
            <i class="fas fa-calendar-days text-primary text-xs"></i>
            <span id="selectedDateLabel" class="font-medium text-slate-800">1 កញ្ញា - 30 កញ្ញា</span>
            <i class="fas fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ml-0.5" id="datePickerChevron"></i>
        </button>
        <div id="datePickerPopover" onclick="event.stopPropagation()" class="hidden absolute right-0 top-full mt-1.5 w-[480px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 select-none">
            <div class="grid grid-cols-[140px_1fr]">
                <div class="p-3 border-r border-slate-100 space-y-0.5 text-xs">${presetButtons}</div>
                <div class="p-3.5">
                    <div class="flex items-center justify-between mb-2">
                        <button onclick="changeCalendarMonth(-1)" class="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition">
                            <i class="fas fa-chevron-left text-[10px]"></i>
                        </button>
                        <span id="calMonthYearLabel" class="text-xs font-semibold text-slate-800"></span>
                        <button onclick="changeCalendarMonth(1)" class="w-6 h-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition">
                            <i class="fas fa-chevron-right text-[10px]"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-7 gap-y-1 text-center text-[10px] text-slate-400 font-semibold mb-1">
                        <span>ច</span><span>អ</span><span>ព</span><span>ព្រ</span><span>សុ</span><span>ស</span><span>អា</span>
                    </div>
                    <div id="calendarDaysGrid" class="grid grid-cols-7 gap-y-1 text-center text-xs"></div>
                </div>
            </div>
            <div class="flex items-center justify-between gap-2 p-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                    <span id="rangeTagLabel">ខែនេះ</span>
                    <button onclick="clearRangeTag()" class="text-slate-400 hover:text-rose-500 transition"><i class="fas fa-xmark text-[10px]"></i></button>
                </span>
                <div class="flex items-center gap-2">
                    <button onclick="toggleDatePicker(event)" class="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200 text-[11px] font-medium transition">បោះបង់</button>
                    <button onclick="applyDateRange()" class="px-3.5 py-1.5 rounded-lg bg-[#0f2b5c] hover:bg-[#0a1d3f] text-white text-[11px] font-semibold shadow-sm transition">ជ្រើសរើស</button>
                </div>
            </div>
        </div>`;

    selectPreset('ខែនេះ');
}

function toggleDatePicker(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const popover = document.getElementById('datePickerPopover');
    const chevron = document.getElementById('datePickerChevron');
    if (!popover) return;
    if (popover.classList.contains('hidden')) {
        popover.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
        renderCalendarGrid();
    } else {
        popover.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}

function changeCalendarMonth(delta) {
    calCurrentMonth += delta;
    if (calCurrentMonth > 12) { calCurrentMonth = 1; calCurrentYear += 1; }
    else if (calCurrentMonth < 1) { calCurrentMonth = 12; calCurrentYear -= 1; }
    renderCalendarGrid();
}

function updateRangeLabels(btnText, tagText) {
    const btnEl = document.getElementById('selectedDateLabel');
    const tagEl = document.getElementById('rangeTagLabel');
    if (btnEl) btnEl.textContent = btnText;
    if (tagEl) tagEl.textContent = tagText;
}

function highlightPresetButton(name) {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        if (name && btn.textContent.trim() === name) {
            btn.className = 'preset-btn w-full text-left px-3 py-1.5 rounded-lg bg-[#0f2b5c] text-white font-medium shadow-sm transition-colors';
        } else {
            btn.className = 'preset-btn w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-600';
        }
    });
}

function handleDateClick(year, month, day) {
    const clickedDate = new Date(year, month - 1, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (!selectingRangeStart || (rangeStartDate && rangeEndDate)) {
        rangeStartDate = clickedDate;
        rangeEndDate = null;
        selectingRangeStart = true;
        currentPresetName = null;
        const tagEl = document.getElementById('rangeTagLabel');
        if (tagEl) tagEl.textContent = `${day} ${MONTH_NAMES_KH[month]} (សូមជ្រើសថ្ងៃបញ្ចប់)`;
    } else {
        if (clickedDate < rangeStartDate) {
            rangeEndDate = rangeStartDate;
            rangeStartDate = clickedDate;
        } else {
            rangeEndDate = clickedDate;
        }
        selectingRangeStart = false;

        const sD = rangeStartDate.getDate();
        const sM = MONTH_NAMES_KH[rangeStartDate.getMonth() + 1];
        const eD = rangeEndDate.getDate();
        const eM = MONTH_NAMES_KH[rangeEndDate.getMonth() + 1];
        const rangeText = `${sD} ${sM} - ${eD} ${eM}`;
        updateRangeLabels(rangeText, rangeText);
    }

    highlightPresetButton(null);
    renderCalendarGrid();
}

function renderCalendarGrid() {
    const grid = document.getElementById('calendarDaysGrid');
    const monthLabel = document.getElementById('calMonthYearLabel');
    if (!grid) return;

    monthLabel.textContent = `${MONTH_NAMES_KH[calCurrentMonth]} ${calCurrentYear}`;
    grid.innerHTML = '';

    const daysInMonth = new Date(calCurrentYear, calCurrentMonth, 0).getDate();
    const firstDayIndex = new Date(calCurrentYear, calCurrentMonth - 1, 1).getDay();
    const leadingBlanks = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let i = 0; i < leadingBlanks; i++) {
        grid.appendChild(document.createElement('span'));
    }

    let effectiveStart = rangeStartDate ? new Date(rangeStartDate) : null;
    let effectiveEnd = rangeEndDate ? new Date(rangeEndDate) : null;
    if (effectiveStart) effectiveStart.setHours(0, 0, 0, 0);
    if (effectiveEnd) effectiveEnd.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
        const currentD = new Date(calCurrentYear, calCurrentMonth - 1, d);
        currentD.setHours(0, 0, 0, 0);

        const isStart = effectiveStart && currentD.getTime() === effectiveStart.getTime();
        const isEnd = effectiveEnd && currentD.getTime() === effectiveEnd.getTime();
        const isInRange = effectiveStart && effectiveEnd && currentD > effectiveStart && currentD < effectiveEnd;

        const cell = document.createElement('div');
        cell.className = 'flex items-center justify-center cursor-pointer h-7';
        cell.onclick = () => handleDateClick(calCurrentYear, calCurrentMonth, d);

        if (isStart && isEnd) {
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isStart && effectiveEnd) {
            cell.className += ' bg-slate-100 rounded-l-full';
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isStart && !effectiveEnd) {
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs ring-2 ring-primary/30 shadow">${d}</span>`;
        } else if (isEnd) {
            cell.className += ' bg-slate-100 rounded-r-full';
            cell.innerHTML = `<span class="w-7 h-7 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs shadow">${d}</span>`;
        } else if (isInRange) {
            cell.className += ' bg-slate-100 text-slate-800 font-medium text-xs';
            cell.innerHTML = `<span>${d}</span>`;
        } else {
            cell.className += ' rounded-lg hover:bg-slate-100 text-slate-700 transition text-xs';
            cell.innerHTML = `<span>${d}</span>`;
        }

        grid.appendChild(cell);
    }
}

function selectPreset(name) {
    currentPresetName = name;
    selectingRangeStart = false;

    const seed = {
        'ថ្ងៃនេះ':          [9, new Date(2026, 8, 3),  new Date(2026, 8, 3),  '3 កញ្ញា'],
        'ម្សិលមិញ':          [9, new Date(2026, 8, 2),  new Date(2026, 8, 2),  '2 កញ្ញា'],
        'សប្តាហ៍នេះ':        [9, new Date(2026, 8, 1),  new Date(2026, 8, 7),  '1 កញ្ញា - 7 កញ្ញា'],
        'សប្តាហ៍មុន':        [8, new Date(2026, 7, 24), new Date(2026, 7, 30), '24 សីហា - 30 សីហា'],
        'ខែនេះ':            [9, new Date(2026, 8, 1),  new Date(2026, 8, 30), '1 កញ្ញា - 30 កញ្ញា'],
        'ខែមុន':            [8, new Date(2026, 7, 1),  new Date(2026, 7, 31), '1 សីហា - 31 សីហា'],
        'ឆ្នាំនេះ':          [9, new Date(2026, 0, 1),  new Date(2026, 11, 31), 'ឆ្នាំ 2026'],
        '7 ថ្ងៃចុងក្រោយ':    [9, new Date(2026, 7, 28), new Date(2026, 8, 3),  '28 សីហា - 3 កញ្ញា'],
        '14 ថ្ងៃចុងក្រោយ':   [9, new Date(2026, 7, 21), new Date(2026, 8, 3),  '21 សីហា - 3 កញ្ញា'],
        '30 ថ្ងៃចុងក្រោយ':   [9, new Date(2026, 7, 5),  new Date(2026, 8, 3),  '5 សីហា - 3 កញ្ញា']
    }[name];

    if (seed) {
        calCurrentMonth = seed[0];
        rangeStartDate = seed[1];
        rangeEndDate = seed[2];
        updateRangeLabels(seed[3], seed[3]);
    }

    highlightPresetButton(name);
    renderCalendarGrid();
}

function clearRangeTag() {
    currentPresetName = 'ទាំងអស់';
    rangeStartDate = null;
    rangeEndDate = null;
    selectingRangeStart = false;
    updateRangeLabels('ទាំងអស់', 'ទាំងអស់');
    highlightPresetButton(null);
    renderCalendarGrid();
}

function applyDateRange() {
    if (selectingRangeStart && rangeStartDate && !rangeEndDate) {
        rangeEndDate = new Date(rangeStartDate);
        selectingRangeStart = false;
        const text = `${rangeStartDate.getDate()} ${MONTH_NAMES_KH[rangeStartDate.getMonth() + 1]}`;
        updateRangeLabels(text, text);
    }
    toggleDatePicker();
    const label = document.getElementById('selectedDateLabel');
    showToast('បានអនុវត្តតម្រងកាលបរិច្ឆេទ៖ ' + (label ? label.textContent : ''), 'info');
    notifyRangeChanged();
}

function getSelectedRange() {
    return { start: rangeStartDate, end: rangeEndDate };
}

function notifyRangeChanged() {
    if (typeof window.onDateRangeApplied === 'function') {
        window.onDateRangeApplied(getSelectedRange());
    }
}

/* ===== 3. ម៉ឺនុយសកម្មភាពជួរតារាង (ស្តង់ដារលេខ 9) ===== */
function toggleRowActionMenu(event, menuId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const menu = document.getElementById(menuId);
    if (!menu) return;

    if (menu.dataset.floatingActive === 'true') {
        closeFloatingDropdown(menu);
    } else {
        openFloatingDropdown(btn, menu);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initPortalMobileDrawer();

    document.addEventListener('click', (e) => {
        const popover = document.getElementById('datePickerPopover');
        if (popover && !popover.classList.contains('hidden') && !popover.contains(e.target)) {
            const trigger = e.target.closest('button');
            const isTrigger = trigger && trigger.querySelector('#selectedDateLabel');
            if (!isTrigger) {
                popover.classList.add('hidden');
                const chevron = document.getElementById('datePickerChevron');
                if (chevron) chevron.classList.remove('rotate-180');
            }
        }
    });
});
