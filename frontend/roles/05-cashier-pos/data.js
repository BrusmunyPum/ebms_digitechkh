/* ច្រកគិតលុយលក់រាយ (POS) — ឃ្លាំងទិន្នន័យសាកល្បង

   ⚠️ គោលការណ៍សុវត្ថិភាពតឹងរ៉ឹង (Shift-Locked Data)
   ឯកសារនេះផ្ទុកតែប្រតិបត្តិការនៃ "វេនបច្ចុប្បន្នថ្ងៃនេះ" ប៉ុណ្ណោះ។
   គ្មានប្រវត្តិលក់ពីវេនមុន គ្មានចំណូលប្រចាំខែ ឬប្រចាំឆ្នាំ និងគ្មាន
   ថ្លៃដើមទិញឡើយ។ ហាមបញ្ចូលទិន្នន័យទាំងនោះចូលក្នុងឯកសារនេះជាដាច់ខាត។ */

const BMS_TODAY = new Date(2026, 8, 3, 14, 20);

const MONTHS_KH = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

/* អត្រាប្តូរប្រាក់ប្រើក្នុងវេននេះ */
const FX_RATE = 4100;

/* វេនបច្ចុប្បន្ន */
const SHIFT = {
    id: 'SHIFT-2026-0903-A',
    cashier: 'ចន្ទ មករា',
    initials: 'ចម',
    terminal: 'POS-01',
    branch: 'សាខាកណ្តាល ភ្នំពេញ',
    openedAt: '2026-09-03T07:30',
    openingFloatUSD: 200,
    openingFloatKHR: 400000
};

const CATEGORIES = [
    { id: 'all', label: 'ទាំងអស់', icon: 'fa-border-all' },
    { id: 'drink', label: 'ភេសជ្ជៈ', icon: 'fa-bottle-water' },
    { id: 'snack', label: 'អាហារសម្រន់', icon: 'fa-cookie-bite' },
    { id: 'household', label: 'របស់ប្រើប្រាស់', icon: 'fa-basket-shopping' },
    { id: 'stationery', label: 'សម្ភារសិក្សា', icon: 'fa-pen-ruler' },
    { id: 'electronic', label: 'អេឡិចត្រូនិក', icon: 'fa-plug' }
];

/* កាតាឡុកទំនិញ — មានតែតម្លៃលក់រាយ គ្មានថ្លៃដើមទិញឡើយ */
const PRODUCTS = [
    { sku: '8850001', barcode: '8850001', name: 'ទឹកសុទ្ធ វិតាល 500ml', category: 'drink', price: 0.50, unit: 'ដប', stock: 240, icon: 'fa-bottle-water', tone: 'sky' },
    { sku: '8850002', barcode: '8850002', name: 'កាហ្វេកំប៉ុង នេស្ការ្វេ', category: 'drink', price: 1.25, unit: 'កំប៉ុង', stock: 96, icon: 'fa-mug-hot', tone: 'amber' },
    { sku: '8850003', barcode: '8850003', name: 'ទឹកក្រូច មីរិនដា 1.5L', category: 'drink', price: 1.75, unit: 'ដប', stock: 64, icon: 'fa-wine-bottle', tone: 'orange' },
    { sku: '8850004', barcode: '8850004', name: 'ទឹកដោះគោ ដាច់ឡាក់', category: 'drink', price: 2.10, unit: 'ប្រអប់', stock: 48, icon: 'fa-glass-water', tone: 'blue' },

    { sku: '8860001', barcode: '8860001', name: 'នំប៉័ង សាំងវិច', category: 'snack', price: 1.50, unit: 'ដុំ', stock: 35, icon: 'fa-bread-slice', tone: 'amber' },
    { sku: '8860002', barcode: '8860002', name: 'ដំឡូងបំពង លេយ៍', category: 'snack', price: 1.20, unit: 'កញ្ចប់', stock: 120, icon: 'fa-cookie-bite', tone: 'yellow' },
    { sku: '8860003', barcode: '8860003', name: 'សូកូឡា ស្នីកគ័រ', category: 'snack', price: 0.95, unit: 'ដុំ', stock: 150, icon: 'fa-candy-cane', tone: 'rose' },
    { sku: '8860004', barcode: '8860004', name: 'នំខេក ចម្រុះរសជាតិ', category: 'snack', price: 2.50, unit: 'ប្រអប់', stock: 28, icon: 'fa-cake-candles', tone: 'pink' },

    { sku: '8870001', barcode: '8870001', name: 'សាប៊ូបោកខោអាវ 1kg', category: 'household', price: 3.40, unit: 'កញ្ចប់', stock: 52, icon: 'fa-soap', tone: 'emerald' },
    { sku: '8870002', barcode: '8870002', name: 'ក្រដាសអនាម័យ 10 ដុំ', category: 'household', price: 4.20, unit: 'កញ្ចប់', stock: 40, icon: 'fa-toilet-paper', tone: 'slate' },
    { sku: '8870003', barcode: '8870003', name: 'ថ្នាំដុសធ្មេញ ខូលហ្គេត', category: 'household', price: 1.80, unit: 'ដប', stock: 88, icon: 'fa-tooth', tone: 'cyan' },
    { sku: '8870004', barcode: '8870004', name: 'សាប៊ូងូតទឹក ឡាក់ស៍', category: 'household', price: 2.75, unit: 'ដប', stock: 60, icon: 'fa-pump-soap', tone: 'purple' },

    { sku: '8880001', barcode: '8880001', name: 'សៀវភៅសរសេរ 100 ទំព័រ', category: 'stationery', price: 0.75, unit: 'ក្បាល', stock: 200, icon: 'fa-book', tone: 'blue' },
    { sku: '8880002', barcode: '8880002', name: 'ប៊ិច ខៀវ ដំណក់', category: 'stationery', price: 0.35, unit: 'ដើម', stock: 320, icon: 'fa-pen', tone: 'indigo' },
    { sku: '8880003', barcode: '8880003', name: 'ខ្មៅដៃ 2B កញ្ចប់ 12', category: 'stationery', price: 1.60, unit: 'កញ្ចប់', stock: 75, icon: 'fa-pencil', tone: 'amber' },

    { sku: '8890001', barcode: '8890001', name: 'ថ្មពិល AA កញ្ចប់ 4', category: 'electronic', price: 2.40, unit: 'កញ្ចប់', stock: 66, icon: 'fa-battery-full', tone: 'lime' },
    { sku: '8890002', barcode: '8890002', name: 'ខ្សែសាក USB-C 1m', category: 'electronic', price: 3.90, unit: 'ខ្សែ', stock: 44, icon: 'fa-plug', tone: 'violet' },
    { sku: '8890003', barcode: '8890003', name: 'អំពូល LED 9W', category: 'electronic', price: 2.20, unit: 'គ្រាប់', stock: 58, icon: 'fa-lightbulb', tone: 'yellow' }
];

/* ប្រតិបត្តិការដែលបានបញ្ចប់ក្នុងវេននេះប៉ុណ្ណោះ */
const SHIFT_SALES = [
    {
        id: 'RCP-0903-0001', time: '2026-09-03T07:52',
        items: [{ sku: '8850001', qty: 4 }, { sku: '8860002', qty: 2 }],
        pay: { usdCash: 5.00, khrCash: 0, khqr: 0 }
    },
    {
        id: 'RCP-0903-0002', time: '2026-09-03T08:15',
        items: [{ sku: '8870001', qty: 1 }, { sku: '8870003', qty: 2 }],
        pay: { usdCash: 0, khrCash: 30000, khqr: 0 }
    },
    {
        id: 'RCP-0903-0003', time: '2026-09-03T08:47',
        items: [{ sku: '8890002', qty: 1 }, { sku: '8890001', qty: 2 }],
        pay: { usdCash: 0, khrCash: 0, khqr: 8.70 }
    },
    {
        id: 'RCP-0903-0004', time: '2026-09-03T09:30',
        items: [{ sku: '8860001', qty: 3 }, { sku: '8850002', qty: 3 }, { sku: '8860003', qty: 2 }],
        pay: { usdCash: 11.00, khrCash: 0, khqr: 0 }
    },
    {
        id: 'RCP-0903-0005', time: '2026-09-03T10:12',
        items: [{ sku: '8880001', qty: 10 }, { sku: '8880002', qty: 12 }],
        pay: { usdCash: 5.00, khrCash: 30000, khqr: 0 }
    },
    {
        id: 'RCP-0903-0006', time: '2026-09-03T11:05',
        items: [{ sku: '8870002', qty: 2 }, { sku: '8870004', qty: 1 }],
        pay: { usdCash: 0, khrCash: 0, khqr: 11.15 }
    },
    {
        id: 'RCP-0903-0007', time: '2026-09-03T12:40',
        items: [{ sku: '8850003', qty: 2 }, { sku: '8860004', qty: 1 }],
        pay: { usdCash: 7.00, khrCash: 0, khqr: 0 }
    },
    {
        id: 'RCP-0903-0008', time: '2026-09-03T13:25',
        items: [{ sku: '8890003', qty: 4 }, { sku: '8880003', qty: 2 }],
        pay: { usdCash: 0, khrCash: 50000, khqr: 0 }
    },
    {
        id: 'RCP-0903-0009', time: '2026-09-03T14:02',
        items: [{ sku: '8850004', qty: 3 }, { sku: '8860003', qty: 4 }],
        pay: { usdCash: 4.00, khrCash: 0, khqr: 6.10 }
    }
];

/* ក្រដាសប្រាក់សម្រាប់រាប់សាច់ប្រាក់បិទវេន */
const USD_NOTES = [100, 50, 20, 10, 5, 1];
const KHR_NOTES = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100];

/* ===== អនុគមន៍ធ្វើទ្រង់ទ្រាយ ===== */

function fmtUSD(amount) {
    return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtKHR(amount) {
    return Number(Math.round(amount)).toLocaleString('en-US') + ' ៛';
}

function toKHR(usd) {
    return usd * FX_RATE;
}

function toUSD(khr) {
    return khr / FX_RATE;
}

function fmtKhDate(iso) {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTHS_KH[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtTime(iso) {
    const d = new Date(iso);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function getProduct(sku) {
    return PRODUCTS.find(p => p.sku === sku);
}

function findByBarcode(code) {
    const q = String(code).trim().toLowerCase();
    return PRODUCTS.find(p => p.barcode === q)
        || PRODUCTS.find(p => p.name.toLowerCase().includes(q));
}

/* ===== ការគណនាវិក្កយបត្រ ===== */

function lineTotal(line) {
    const p = getProduct(line.sku);
    return p ? p.price * line.qty : 0;
}

/* អតប 10% រួមបញ្ចូលក្នុងតម្លៃលក់រាយរួចហើយ ដូច្នេះត្រូវបំបែកចេញវិញ */
function saleTotals(items) {
    const gross = items.reduce((sum, it) => sum + lineTotal(it), 0);
    const net = gross / 1.10;
    return {
        qty: items.reduce((sum, it) => sum + it.qty, 0),
        net,
        vat: gross - net,
        gross
    };
}

function paidTotal(pay) {
    return pay.usdCash + toUSD(pay.khrCash) + pay.khqr;
}

function payMethodLabel(pay) {
    const parts = [];
    if (pay.usdCash > 0) parts.push('សាច់ប្រាក់ USD');
    if (pay.khrCash > 0) parts.push('សាច់ប្រាក់ ៛');
    if (pay.khqr > 0) parts.push('KHQR បាគង');
    if (!parts.length) return 'មិនកំណត់';
    return parts.length > 1 ? 'បែងចែក៖ ' + parts.join(' + ') : parts[0];
}

/* ===== ប្រតិបត្តិការក្នុងវេន (រួមទាំងអ្វីដែលបានលក់ក្នុងវេនបច្ចុប្បន្ន) ===== */

const SALES_KEY = 'pos_shift_sales';

function loadNewSales() {
    try {
        return JSON.parse(sessionStorage.getItem(SALES_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveSale(sale) {
    const all = loadNewSales();
    all.push(sale);
    try {
        sessionStorage.setItem(SALES_KEY, JSON.stringify(all));
    } catch (e) {
        // វេនឯកជន ឬការផ្ទុកត្រូវបានបិទ — ការលក់នៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

/* ប្រតិបត្តិការទាំងអស់ក្នុងវេននេះ — ថ្មីមុនគេ */
function shiftSales() {
    return SHIFT_SALES.concat(loadNewSales())
        .sort((a, b) => new Date(b.time) - new Date(a.time));
}

function nextReceiptNumber() {
    const n = SHIFT_SALES.length + loadNewSales().length + 1;
    return `RCP-0903-${String(n).padStart(4, '0')}`;
}

/* ===== កន្ត្រកទំនិញបច្ចុប្បន្ន ===== */

const CART_KEY = 'pos_cart';

function loadCart() {
    try {
        return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(items) {
    try {
        sessionStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
        // មិនអាចរក្សាទុក — កន្ត្រកនៅរស់ត្រឹមទំព័របច្ចុប្បន្ន
    }
}

function clearCart() {
    try {
        sessionStorage.removeItem(CART_KEY);
    } catch (e) {
        // មិនអាចសម្អាត — មិនប៉ះពាល់ដំណើរការទេ
    }
}

/* ការទូទាត់ KHQR ដែលកំពុងរង់ចាំ (បញ្ជូនរវាងទំព័រ) */
const PENDING_KEY = 'pos_pending_khqr';

function savePendingPayment(data) {
    try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(data));
    } catch (e) {
        // មិនអាចរក្សាទុក
    }
}

function loadPendingPayment() {
    try {
        return JSON.parse(sessionStorage.getItem(PENDING_KEY));
    } catch (e) {
        return null;
    }
}

function clearPendingPayment() {
    try {
        sessionStorage.removeItem(PENDING_KEY);
    } catch (e) {
        // មិនអាចសម្អាត
    }
}

/* ===== សង្ខេបវេន (X/Z Report) ===== */

function shiftSummary() {
    const sales = shiftSales();
    const totals = sales.reduce((acc, s) => {
        const t = saleTotals(s.items);
        acc.gross += t.gross;
        acc.net += t.net;
        acc.vat += t.vat;
        acc.usdCash += s.pay.usdCash;
        acc.khrCash += s.pay.khrCash;
        acc.khqr += s.pay.khqr;
        acc.qty += t.qty;
        return acc;
    }, { gross: 0, net: 0, vat: 0, usdCash: 0, khrCash: 0, khqr: 0, qty: 0 });

    return {
        ...totals,
        count: sales.length,
        avgTicket: sales.length ? totals.gross / sales.length : 0,
        expectedUSD: SHIFT.openingFloatUSD + totals.usdCash,
        expectedKHR: SHIFT.openingFloatKHR + totals.khrCash
    };
}

/* មុខទំនិញលក់ដាច់ក្នុងវេន */
function topSellers(limit = 5) {
    const tally = {};
    shiftSales().forEach(s => {
        s.items.forEach(it => {
            tally[it.sku] = (tally[it.sku] || 0) + it.qty;
        });
    });
    return Object.keys(tally)
        .map(sku => ({ product: getProduct(sku), qty: tally[sku] }))
        .filter(r => r.product)
        .sort((a, b) => b.qty - a.qty)
        .slice(0, limit);
}

/* ផ្លាកលេខក្នុងម៉ឺនុយចំហៀង (ហៅដោយ portal.js) */
function totalPending() {
    return shiftSales().length;
}

/* ===== កូដ KHQR បាគង (គំរូសាកល្បង) ===== */

const MERCHANT = {
    name: 'DIGITECHKH RETAIL',
    account: 'digitechkh@aclb',
    city: 'PHNOM PENH',
    tin: 'K001-901234567'
};

function buildKhqrPayload(receiptId, amount) {
    const amt = Number(amount).toFixed(2);
    return [
        '00020101',
        `0212${MERCHANT.account}`,
        '5303840',
        `54${String(amt.length).padStart(2, '0')}${amt}`,
        '5802KH',
        `59${String(MERCHANT.name.length).padStart(2, '0')}${MERCHANT.name}`,
        `60${String(MERCHANT.city.length).padStart(2, '0')}${MERCHANT.city}`,
        `62${String(receiptId.length + 4).padStart(2, '0')}01${String(receiptId.length).padStart(2, '0')}${receiptId}`
    ].join('');
}
