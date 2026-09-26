/**
 * DIGITECHKH BMS - ច្រកគណនេយ្យករបំណុល និងការទារប្រាក់ (AP/AR Accountant Store)
 * គ្រប់គ្រងចរន្តសាច់ប្រាក់ប្រចាំថ្ងៃ, បង្កាន់ដៃទទួលប្រាក់ AR (Official Receipts),
 * ប័ណ្ណចំណាយទូទាត់ AP (Payment Vouchers), ពន្ធកាត់ទុក WHT, និងផ្ទៀងផ្ទាត់ 3-Way Match។
 */

const BMS_APAR_STORAGE_KEY = 'bms_apar_store_v1';

const INITIAL_APAR_STORE = {
    kpis: {
        totalLiquidity: 42180.00,
        totalAR: 18240.00,
        overdueAR: 3120.00,
        totalAP: 12600.00,
        pendingVouchersCount: 3,
        arAgingChart: {
            brackets: ['1-30 ថ្ងៃ', '31-60 ថ្ងៃ', '61-90 ថ្ងៃ', '> 90 ថ្ងៃ'],
            amounts: [10200, 4920, 2120, 1000]
        },
        dailyCashFlow: {
            days: ['20 កញ្ញា', '21 កញ្ញា', '22 កញ្ញា', '23 កញ្ញា', '24 កញ្ញា', '25 កញ្ញា'],
            cashIn: [3200, 4500, 2800, 5100, 3900, 4200],
            cashOut: [2100, 1800, 3400, 2900, 2500, 3100]
        }
    },

    receipts: [
        {
            id: 'REC-2026-0145',
            invoiceId: 'INV-2026-0120',
            customerName: 'ហេង វិច្ឆិកា (ក្រុមហ៊ុន អេប៊ីស៊ី)',
            date: '2026-09-24',
            paymentMethod: 'KHQR បាគង',
            bankRef: 'BKG-99283741',
            amount: 450.00,
            currency: 'USD',
            status: 'verified',
            receivedBy: 'អ៊ុំ ម៉ានី (AP/AR)',
            note: 'ទូទាត់តាមការស្កេនបាគង KHQR ជោគជ័យ'
        },
        {
            id: 'REC-2026-0144',
            invoiceId: 'INV-2026-0118',
            customerName: 'ក្រុមហ៊ុន ភ្នំពេញ ត្រេឌីង ឯ.ក',
            date: '2026-09-23',
            paymentMethod: 'ធនាគារ អេប៊ីអេ (ABA)',
            bankRef: 'ABA-00918234',
            amount: 1200.00,
            currency: 'USD',
            status: 'verified',
            receivedBy: 'អ៊ុំ ម៉ានី (AP/AR)',
            note: 'ផ្ទេរតាមគណនីចរន្ត ABA USD'
        },
        {
            id: 'REC-2026-0143',
            invoiceId: 'INV-2026-0115',
            customerName: 'សណ្ឋាគារ ភ្នំពេញ ហ្គ្រេន',
            date: '2026-09-22',
            paymentMethod: 'ធនាគារ កាណាឌីយ៉ា',
            bankRef: 'CAN-88771122',
            amount: 2450.00,
            currency: 'USD',
            status: 'verified',
            receivedBy: 'អ៊ុំ ម៉ានី (AP/AR)',
            note: 'ទូទាត់វិក្កយបត្រកុំព្យូទ័រយួរដៃ'
        },
        {
            id: 'REC-2026-0142',
            invoiceId: 'INV-2026-0112',
            customerName: 'ហាងលក់រាយ ត្រីលក្ខណ៍',
            date: '2026-09-21',
            paymentMethod: 'សាច់ប្រាក់សុទ្ធ',
            bankRef: 'CSH-0038',
            amount: 320.00,
            currency: 'USD',
            status: 'verified',
            receivedBy: 'អ៊ុំ ម៉ានី (AP/AR)',
            note: 'បង់ប្រាក់ផ្ទាល់នៅការិយាល័យ'
        }
    ],

    vouchers: [
        {
            id: 'DIS-2026-0089',
            vendorName: 'ក្រុមហ៊ុន ហ៊ុន ត្រេឌីង ឯ.ក',
            billId: 'BILL-2026-0044',
            poId: 'PO-2026-0044',
            date: '2026-09-24',
            category: 'ទិញទំនិញចូលស្តុក',
            grossAmount: 3377.00,
            whtRate: 0,
            whtAmount: 0.00,
            netAmount: 3377.00,
            paymentMethod: 'ធនាគារ អេប៊ីអេ (ABA USD)',
            bankAccount: '001 234 567',
            status: 'pending', // pending, approved, paid
            preparer: 'អ៊ុំ ម៉ានី (AP/AR)',
            reviewer: 'ទៀង វណ្ណារ៉ា (Chief Acct)',
            approver: 'លី ហាក់សេង (GM)',
            note: 'ទូទាត់ Dell UltraSharp 27" Monitors'
        },
        {
            id: 'DIS-2026-0088',
            vendorName: 'ក្រុមហ៊ុន ស៊ីងហ្គាពួរ អេឡិចត្រូនិច ត្រេឌីង',
            billId: 'BILL-2026-0043',
            poId: 'PO-2026-0043',
            date: '2026-09-21',
            category: 'ទិញទំនិញចូលស្តុក',
            grossAmount: 6820.00,
            whtRate: 0,
            whtAmount: 0.00,
            netAmount: 6820.00,
            paymentMethod: 'ធនាគារ អេប៊ីអេ (ABA USD)',
            bankAccount: '002 998 112',
            status: 'approved',
            preparer: 'អ៊ុំ ម៉ានី (AP/AR)',
            reviewer: 'ទៀង វណ្ណារ៉ា (Chief Acct)',
            approver: 'លី ហាក់សេង (GM)',
            note: 'ទូទាត់ Dell XPS 15 ចំនួន 4 គ្រឿង'
        },
        {
            id: 'DIS-2026-0087',
            vendorName: 'ក្រុមហ៊ុន សេវាកម្មបច្ចេកវិទ្យា ខ្មែរ IT',
            billId: 'BILL-2026-0040',
            poId: '-',
            date: '2026-09-19',
            category: 'សេវាកម្មដំឡើងបណ្តាញ',
            grossAmount: 2000.00,
            whtRate: 15,
            whtAmount: 300.00,
            netAmount: 1700.00,
            paymentMethod: 'ធនាគារ កាណាឌីយ៉ា',
            bankAccount: '100 889 001',
            status: 'approved',
            preparer: 'អ៊ុំ ម៉ានី (AP/AR)',
            reviewer: 'ទៀង វណ្ណារ៉ា (Chief Acct)',
            approver: 'លី ហាក់សេង (GM)',
            note: 'កាត់ពន្ធកាត់ទុក WHT 15% ($300.00) ស្របច្បាប់'
        },
        {
            id: 'DIS-2026-0086',
            vendorName: 'ម្ចាស់អគារជួលការិយាល័យ ឫស្សីកែវ',
            billId: 'BILL-2026-0038',
            poId: '-',
            date: '2026-09-15',
            category: 'ថ្លៃជួលការិយាល័យ & ឃ្លាំង',
            grossAmount: 1500.00,
            whtRate: 10,
            whtAmount: 150.00,
            netAmount: 1350.00,
            paymentMethod: 'ធនាគារ អេស៊ីលីដា',
            bankAccount: '010 334 556',
            status: 'paid',
            preparer: 'អ៊ុំ ម៉ានី (AP/AR)',
            reviewer: 'ទៀង វណ្ណារ៉ា (Chief Acct)',
            approver: 'លី ហាក់សេង (GM)',
            note: 'កាត់ពន្ធកាត់ទុក WHT 10% ($150.00) បានផ្ទេរប្រាក់រួច'
        }
    ],

    upcomingReceivables: [
        { customer: 'សាលាអន្តរជាតិ បាយ័ន', invoiceId: 'INV-2026-0125', dueDate: '2026-09-28', amount: 3150.00, status: 'due_soon' },
        { customer: 'ក្រុមហ៊ុន ដំរី មេឌា ឯ.ក', invoiceId: 'INV-2026-0123', dueDate: '2026-09-26', amount: 1620.00, status: 'due_today' },
        { customer: 'ហាងកុំព្យូទ័រ រស្មី ទំនើប', invoiceId: 'INV-2026-0110', dueDate: '2026-09-18', amount: 1850.00, status: 'overdue' }
    ]
};

function getAPARStore() {
    try {
        const raw = localStorage.getItem(BMS_APAR_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to parse APAR store from localStorage:', e);
    }
    localStorage.setItem(BMS_APAR_STORAGE_KEY, JSON.stringify(INITIAL_APAR_STORE));
    return JSON.parse(JSON.stringify(INITIAL_APAR_STORE));
}

function saveAPARStore(store) {
    try {
        localStorage.setItem(BMS_APAR_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Failed to save APAR store to localStorage:', e);
    }
}
