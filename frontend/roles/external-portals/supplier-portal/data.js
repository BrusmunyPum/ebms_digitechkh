/**
 * DIGITECHKH BMS - ច្រកអ្នកផ្គត់ផ្គង់ស្វ័យសេវា (Supplier Self-Service Portal Data)
 * Data Scope: អ្នកផ្គត់ផ្គង់ម្នាក់ៗឃើញតែការបញ្ជាទិញ (PO), វិក្កយបត្រ (Bills) និងការទូទាត់របស់ខ្លួនប៉ុណ្ណោះ។
 */

const SUPPLIER_PORTAL_STORAGE_KEY = 'digitechkh_bms_supplier_portal_data_v1';

const DEFAULT_SUPPLIER_PORTAL_DATA = {
    profile: {
        id: 'SUPP-0012',
        companyName: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
        contactName: 'លោក ហ៊ុន ម៉េងហុង',
        phone: '012 345 678',
        email: 'huntrading@example.com',
        tin: 'K003-90188234',
        address: 'ផ្ទះលេខ 88 មហាវិថីព្រះមុនីវង្ស សង្កាត់វត្តភ្នំ ខណ្ឌដូនពេញ រាជធានីភ្នំពេញ',
        tier: 'ដៃគូយុទ្ធសាស្ត្រកម្រិតមាស',
        bankName: 'ធនាគារ អេប៊ីអេ',
        bankAccount: '001 234 567',
        buyerCompany: 'ក្រុមហ៊ុន ឌីជីថេក ខេអេច ឯ.ក (DIGITECHKH CO., LTD.)',
        buyerContact: 'ហុង ដារ៉ា (អ្នកគ្រប់គ្រងលទ្ធកម្ម)'
    },

    kpis: {
        totalRevenue: 28450.00,
        pendingPaymentAmount: 3377.00,
        paidThisMonth: 8910.00,
        activeOrdersCount: 2
    },

    purchaseOrders: [
        {
            id: 'PO-2026-0045',
            date: '2026-09-25',
            expectedDelivery: '2026-09-30',
            description: 'ការបញ្ជាទិញគ្រឿងបន្លាស់កុំព្យូទ័រ និងសម្ភារៈការិយាល័យ',
            paymentTerm: 'ទូទាត់ក្នុងរយៈពេល 15 ថ្ងៃ',
            items: [
                { name: 'Logitech MX Master 3S Mouse', qty: 25, unit: 'គ្រឿង', unitPrice: 85.00 },
                { name: 'Logitech MX Mechanical Keyboard', qty: 10, unit: 'គ្រឿង', unitPrice: 120.00 }
            ],
            subtotal: 3325.00,
            vatRate: 0,
            totalAmount: 3325.00,
            status: 'pending', // pending, confirmed, in_delivery, completed, rejected
            deliveryStatus: 'preparing',
            billed: false,
            note: 'ទំនិញថ្មីសុទ្ធ 100% ធានាពីក្រុមហ៊ុន 1 ឆ្នាំពេញ'
        },
        {
            id: 'PO-2026-0044',
            date: '2026-09-22',
            expectedDelivery: '2026-09-27',
            description: 'ការបញ្ជាទិញអេក្រង់កុំព្យូទ័រ Dell UltraSharp',
            paymentTerm: 'ទូទាត់ក្នុងរយៈពេល 30 ថ្ងៃ',
            items: [
                { name: 'Dell UltraSharp 27" 4K Monitor (U2723QE)', qty: 6, unit: 'គ្រឿង', unitPrice: 510.00 },
                { name: 'Dell Single Monitor Arm MSA20', qty: 2, unit: 'គ្រឿង', unitPrice: 158.50 }
            ],
            subtotal: 3377.00,
            vatRate: 0,
            totalAmount: 3377.00,
            status: 'confirmed',
            deliveryStatus: 'delivered',
            billed: true,
            billId: 'BILL-2026-0044',
            note: 'បានប្រគល់ទំនិញចូលឃ្លាំងកណ្តាលរួចរាល់'
        },
        {
            id: 'PO-2026-0041',
            date: '2026-09-10',
            expectedDelivery: '2026-09-15',
            description: 'ការបញ្ជាទិញអង្គចងចាំ RAM DDR5 សម្រាប់ម៉ាស៊ីនមេ',
            paymentTerm: 'ទូទាត់ក្នុងរយៈពេល 15 ថ្ងៃ',
            items: [
                { name: 'Kingston Server Premier DDR5 4800MHz 32GB', qty: 20, unit: 'ដើម', unitPrice: 95.00 },
                { name: 'Thermal Paste Arctic MX-4 (4g)', qty: 10, unit: 'បំពង់', unitPrice: 19.00 }
            ],
            subtotal: 2090.00,
            vatRate: 0,
            totalAmount: 2090.00,
            status: 'completed',
            deliveryStatus: 'delivered',
            billed: true,
            billId: 'BILL-2026-0041',
            note: 'បានទូទាត់ប្រាក់រួចរាល់'
        }
    ],

    bills: [
        {
            id: 'BILL-2026-0044',
            poId: 'PO-2026-0044',
            date: '2026-09-23',
            dueDate: '2026-10-08',
            description: 'វិក្កយបត្រថ្លៃអេក្រង់ Dell UltraSharp 27" ចំនួន 6 គ្រឿង',
            grossAmount: 3377.00,
            whtRate: 0,
            whtAmount: 0.00,
            netAmount: 3377.00,
            paymentMethod: 'ធនាគារ អេប៊ីអេ',
            bankAccount: '001 234 567',
            status: 'pending_payment', // pending_approval, pending_payment, paid
            paidDate: null,
            note: 'រង់ចាំនីតិវិធីបើកសាច់ប្រាក់ពី DIGITECHKH'
        },
        {
            id: 'BILL-2026-0041',
            poId: 'PO-2026-0041',
            date: '2026-09-12',
            dueDate: '2026-09-27',
            description: 'វិក្កយបត្រថ្លៃ RAM DDR5 32GB ចំនួន 20 ដើម',
            grossAmount: 2090.00,
            whtRate: 0,
            whtAmount: 0.00,
            netAmount: 2090.00,
            paymentMethod: 'ធនាគារ អេប៊ីអេ',
            bankAccount: '001 234 567',
            status: 'paid',
            paidDate: '2026-09-24',
            note: 'បានទទួលប្រាក់រួចរាល់តាមប័ណ្ណចំណាយ DIS-2026-0089'
        }
    ],

    deliveries: [
        {
            id: 'DO-2026-0082',
            poId: 'PO-2026-0045',
            carrier: 'ក្រុមហ៊ុន ភ្នំពេញ ឡូជីស្ទិក',
            driverName: 'ជា ពិសិដ្ឋ (098 765 432)',
            trackingNo: 'PPL-889921',
            date: '2026-09-26',
            destination: 'ឃ្លាំងកណ្តាល DIGITECHKH អគារ 128 មហាវិថីសហព័ន្ធរុស្ស៊ី',
            status: 'in_transit', // preparing, in_transit, delivered
            estimatedArrival: '2026-09-27 10:00 ព្រឹក'
        },
        {
            id: 'DO-2026-0079',
            poId: 'PO-2026-0044',
            carrier: 'រថយន្តដឹកជញ្ជូនផ្ទាល់ខ្លួន',
            driverName: 'ហេង សុវណ្ណ (012 998 877)',
            trackingNo: 'HT-0044',
            date: '2026-09-24',
            destination: 'ឃ្លាំងកណ្តាល DIGITECHKH អគារ 128 មហាវិថីសហព័ន្ធរុស្ស៊ី',
            status: 'delivered',
            estimatedArrival: 'បានប្រគល់រួចរាល់'
        }
    ]
};

function getSupplierStore() {
    try {
        const raw = localStorage.getItem(SUPPLIER_PORTAL_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to parse supplier store:', e);
    }
    localStorage.setItem(SUPPLIER_PORTAL_STORAGE_KEY, JSON.stringify(DEFAULT_SUPPLIER_PORTAL_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_SUPPLIER_PORTAL_DATA));
}

function saveSupplierStore(store) {
    try {
        localStorage.setItem(SUPPLIER_PORTAL_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Failed to save supplier store:', e);
    }
}

function acceptPO(poId) {
    const store = getSupplierStore();
    const po = store.purchaseOrders.find(p => p.id === poId);
    if (po) {
        po.status = 'confirmed';
        saveSupplierStore(store);
        return true;
    }
    return false;
}

function rejectPO(poId) {
    const store = getSupplierStore();
    const po = store.purchaseOrders.find(p => p.id === poId);
    if (po) {
        po.status = 'rejected';
        saveSupplierStore(store);
        return true;
    }
    return false;
}
