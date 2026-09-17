// Sidebar navigation configuration and interactive active states
const BMS_NAV_ITEMS = {
    'dashboard': {
        title: 'ផ្ទាំងគ្រប់គ្រង',
        subtitle: 'ស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម DIGITECHKH',
        icon: 'fa-border-all',
        parent: null
    },
    'sell-invoices': {
        title: 'វិក្កយបត្រលក់',
        subtitle: 'គ្រប់គ្រងវិក្កយបត្រលក់ និងការចេញវិក្កយបត្រ',
        icon: 'fa-file-invoice-dollar',
        parent: 'menu-sell'
    },
    'sell-prices': {
        title: 'តារាងតម្លៃ',
        subtitle: 'គ្រប់គ្រងតារាងតម្លៃទំនិញ និងសេវាកម្ម',
        icon: 'fa-file-alt',
        parent: 'menu-sell'
    },
    'sell-customers': {
        title: 'បញ្ជីអតិថិជន',
        subtitle: 'គ្រប់គ្រងទិន្នន័យ និងព័ត៌មានទំនាក់ទំនងអតិថិជន',
        icon: 'fa-users',
        parent: 'menu-sell'
    },
    'sell-receipts': {
        title: 'បង្កាន់ដៃទូទាត់',
        subtitle: 'តាមដានការទូទាត់ និងបង្កាន់ដៃទទួលប្រាក់',
        icon: 'fa-credit-card',
        parent: 'menu-sell'
    },
    'buy-invoices': {
        title: 'វិក្កយបត្របញ្ញាទិញ',
        subtitle: 'គ្រប់គ្រងការបញ្ជាទិញ និងវិក្កយបត្រពីអ្នកផ្គត់ផ្គង់',
        icon: 'fa-file-invoice',
        parent: 'menu-buy'
    },
    'buy-suppliers': {
        title: 'អ្នកផ្គត់ផ្គង់',
        subtitle: 'បញ្ជីព័ត៌មាន និងទំនាក់ទំនងអ្នកផ្គត់ផ្គង់',
        icon: 'fa-truck',
        parent: 'menu-buy'
    },
    'buy-expenses': {
        title: 'ការទូទាត់ចំណាយ',
        subtitle: 'កត់ត្រា និងគ្រប់គ្រងការចំណាយអាជីវកម្ម',
        icon: 'fa-money-check-alt',
        parent: 'menu-buy'
    },
    'stock-balance': {
        title: 'តុល្យភាពស្តុក',
        subtitle: 'តាមដានចំនួន និងស្ថានភាពស្តុកទំនិញក្នុងឃ្លាំង',
        icon: 'fa-box',
        parent: 'menu-stock'
    },
    'stock-catalog': {
        title: 'កាតាឡុកទំនិញ',
        subtitle: 'បញ្ជីទំនិញ ផលិតផល និងប្រភេទទំនិញទាំងអស់',
        icon: 'fa-list',
        parent: 'menu-stock'
    },
    'stock-movements': {
        title: 'ចលនាស្តុក',
        subtitle: 'ប្រវត្តិនាំចូល នាំចេញ និងផ្លាស់ប្តូរស្តុក',
        icon: 'fa-clock-rotate-left',
        parent: 'menu-stock'
    },
    'reports-overview': {
        title: 'របាយការណ៍ទូទៅ',
        subtitle: 'ទិដ្ឋភាពទូទៅនៃប្រាក់ចំណេញ ចំណូល និងចំណាយ',
        icon: 'fa-chart-pie',
        parent: 'menu-reports'
    },
    'reports-sales': {
        title: 'របាយការណ៍លក់',
        subtitle: 'ទិន្នន័យវិភាគការលក់ និងអតិថិជនសំខាន់ៗ',
        icon: 'fa-file-invoice-dollar',
        parent: 'menu-reports'
    },
    'reports-purchases': {
        title: 'របាយការណ៍ទិញ',
        subtitle: 'ទិន្នន័យវិភាគការទិញ និងការចំណាយលើអ្នកផ្គត់ផ្គង់',
        icon: 'fa-cart-shopping',
        parent: 'menu-reports'
    },
    'reports-stock': {
        title: 'របាយការណ៍ស្តុក',
        subtitle: 'ទិន្នន័យតម្លៃស្តុក និងការវិភាគប្រាក់ចំណេញតាមមុខទំនិញ',
        icon: 'fa-boxes-stacked',
        parent: 'menu-reports'
    },
    'settings-company': {
        title: 'ព័ត៌មានក្រុមហ៊ុន',
        subtitle: 'ការកំណត់ព័ត៌មានទូទៅ អាសយដ្ឋាន រូបសញ្ញា និងត្រាក្រុមហ៊ុន',
        icon: 'fa-building',
        parent: 'menu-settings'
    },
    'settings-users': {
        title: 'គ្រប់គ្រងអ្នកប្រើ',
        subtitle: 'គ្រប់គ្រងគណនី តួនាទី និងសិទ្ធិប្រើប្រាស់ប្រព័ន្ធ',
        icon: 'fa-users-gear',
        parent: 'menu-settings'
    },
    'settings-tax': {
        title: 'ពន្ធ និងរូបិយប័ណ្ណ',
        subtitle: 'ការកំណត់អត្រាពន្ធ រូបិយប័ណ្ណគោល និងអត្រាប្តូរប្រាក់',
        icon: 'fa-coins',
        parent: 'menu-settings'
    },
    'settings-notifications': {
        title: 'ការជូនដំណឹង',
        subtitle: 'ការកំណត់ការផ្ញើសារដាស់តឿន និងដំណឹងប្រព័ន្ធស្វ័យប្រវត្តិ',
        icon: 'fa-bell',
        parent: 'menu-settings'
    },
    'settings-system': {
        title: 'ប្រព័ន្ធ និងសុវត្ថិភាព',
        subtitle: 'ការបម្រុងទុកទិន្នន័យ ប្រវត្តិប្រតិបត្តិការ និងការថែទាំប្រព័ន្ធ',
        icon: 'fa-sliders',
        parent: 'menu-settings'
    },
    'settings-profile': {
        title: 'កម្រងព័ត៌មានផ្ទាល់ខ្លួន',
        subtitle: 'ការគ្រប់គ្រងព័ត៌មានគណនី សុវត្ថិភាព និងការអនុញ្ញាតផ្ទាល់ខ្លួន',
        icon: 'fa-user-gear',
        parent: null
    },
    'settings-general': {
        title: 'ការកំណត់ប្រព័ន្ធ',
        subtitle: 'ការកំណត់ទូទៅ សិទ្ធិអ្នកប្រើប្រាស់ និងប្រព័ន្ធ',
        icon: 'fa-gear',
        parent: 'menu-settings'
    },
    'reports': {
        title: 'របាយការណ៍ហិរញ្ញវត្ថុ',
        subtitle: 'របាយការណ៍លក់ ចំណូល ចំណាយ និងប្រាក់ចំណេញ',
        icon: 'fa-chart-line',
        parent: null
    },
    'settings': {
        title: 'ការកំណត់ប្រព័ន្ធ',
        subtitle: 'ការកំណត់ទូទៅ សិទ្ធិអ្នកប្រើប្រាស់ និងប្រព័ន្ធ',
        icon: 'fa-gear',
        parent: null
    }
};

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById('icon-' + menuId);
    const btn = document.getElementById('btn-' + menuId);
    
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
        menu.classList.remove('hidden');
        if (icon) {
            icon.classList.add('rotate-90');
        }
        if (btn) {
            btn.classList.add('bg-white/10', 'text-white', 'font-medium');
            btn.classList.remove('text-emerald-100');
        }
    } else {
        menu.classList.add('hidden');
        if (icon) {
            icon.classList.remove('rotate-90');
        }
        // Only remove active style from parent button if none of its child items are currently active
        const hasActiveChild = menu.querySelector('.nav-sub-item.bg-primary');
        if (!hasActiveChild && btn) {
            btn.classList.remove('bg-white/10', 'text-white', 'font-medium');
            btn.classList.add('text-emerald-100');
        }
    }
}

function setActiveNavItem(itemId) {
    if (!itemId || !BMS_NAV_ITEMS[itemId]) {
        itemId = 'dashboard';
    }

    const meta = BMS_NAV_ITEMS[itemId];
    const activeParentId = meta ? meta.parent : null;

    // 1. Reset all top-level items
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-primary', 'text-white', 'shadow-sm', 'font-medium');
        el.classList.add('text-emerald-100', 'hover:bg-white/10', 'hover:text-white', 'font-normal');
    });

    // 2. Reset all sub-items
    document.querySelectorAll('.nav-sub-item').forEach(el => {
        el.classList.remove('bg-primary', 'text-white', 'shadow-sm', 'font-medium');
        el.classList.add('text-emerald-100/75', 'hover:bg-white/10', 'hover:text-white', 'font-normal');
    });

    // 3. Reset inactive parent menu buttons & icons
    const allParentIds = ['menu-sell', 'menu-buy', 'menu-stock', 'menu-reports', 'menu-settings'];
    allParentIds.forEach(pId => {
        if (pId !== activeParentId) {
            const btn = document.getElementById('btn-' + pId);
            const icon = document.getElementById('icon-' + pId);
            const menu = document.getElementById(pId);
            if (btn) {
                btn.classList.remove('bg-white/10', 'text-white', 'font-medium');
                btn.classList.add('text-emerald-100', 'hover:bg-white/10', 'hover:text-white', 'font-normal');
            }
            if (icon) {
                icon.classList.remove('rotate-90');
            }
            if (menu) {
                menu.classList.add('hidden');
            }
        }
    });

    // 4. Activate target item
    const targetEl = document.querySelector(`[data-nav="${itemId}"]`);
    if (targetEl) {
        targetEl.classList.remove('text-emerald-100', 'text-emerald-100/75', 'hover:bg-white/10', 'font-normal');
        targetEl.classList.add('bg-primary', 'text-white', 'shadow-sm', 'font-medium');
    }

    // 5. If item belongs to a parent menu, expand and highlight parent
    if (meta && meta.parent) {
        const parentMenu = document.getElementById(meta.parent);
        const parentIcon = document.getElementById('icon-' + meta.parent);
        const parentBtn = document.getElementById('btn-' + meta.parent);

        if (parentMenu) {
            parentMenu.classList.remove('hidden');
        }
        if (parentIcon) {
            parentIcon.classList.add('rotate-90');
        }
        if (parentBtn) {
            parentBtn.classList.remove('text-emerald-100', 'font-normal');
            parentBtn.classList.add('bg-white/10', 'text-white', 'font-medium');
        }
    }

    // 6. Save in sessionStorage
    try {
        sessionStorage.setItem('bms_active_nav', itemId);
    } catch(e) {}

    // 7. Update empty.html page content if elements exist
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const emptyIcon = document.getElementById('empty-icon');
    const emptyTitle = document.getElementById('empty-title');
    const emptyDesc = document.getElementById('empty-desc');

    if (pageTitle && meta) pageTitle.textContent = meta.title;
    if (pageSubtitle && meta) pageSubtitle.textContent = meta.subtitle;
    if (emptyIcon && meta && meta.icon) emptyIcon.className = `fas ${meta.icon} text-3xl`;
    if (emptyTitle && meta) emptyTitle.textContent = `មិនទាន់មានទិន្នន័យ ${meta.title} នៅឡើយទេ`;
    if (emptyDesc && meta) emptyDesc.textContent = `សូមចុចប៊ូតុង "បង្កើត" ខាងលើដើម្បីបញ្ចូលទិន្នន័យ ${meta.title} ថ្មី`;
    if (meta && document.getElementById('page-title')) {
        document.title = `DIGITECHKH - ${meta.title}`;
    }
}

function initSidebarNav() {
    // Attach click listeners to all nav items
    document.querySelectorAll('[data-nav]').forEach(el => {
        el.addEventListener('click', (e) => {
            const navId = el.getAttribute('data-nav');
            if (!navId) return;

            // If user clicked Dashboard
            if (navId === 'dashboard') {
                try { sessionStorage.setItem('bms_active_nav', 'dashboard'); } catch(err){}
                if (window.location.pathname.endsWith('dashboard.html')) {
                    e.preventDefault();
                    setActiveNavItem('dashboard');
                }
                return;
            }

            // If user clicked Sales Invoices
            if (navId === 'sell-invoices') {
                try { sessionStorage.setItem('bms_active_nav', 'sell-invoices'); } catch(err){}
                if (window.location.pathname.endsWith('invoice.html') || window.location.pathname.endsWith('invoices.html')) {
                    e.preventDefault();
                    setActiveNavItem('sell-invoices');
                }
                return;
            }

            // If user clicked Quotes / Price List
            if (navId === 'sell-prices') {
                try { sessionStorage.setItem('bms_active_nav', 'sell-prices'); } catch(err){}
                if (window.location.pathname.endsWith('quote.html') || window.location.pathname.endsWith('quotes.html')) {
                    e.preventDefault();
                    setActiveNavItem('sell-prices');
                }
                return;
            }

            // If user clicked Customers
            if (navId === 'sell-customers') {
                try { sessionStorage.setItem('bms_active_nav', 'sell-customers'); } catch(err){}
                if (window.location.pathname.endsWith('customer.html')) {
                    e.preventDefault();
                    setActiveNavItem('sell-customers');
                }
                return;
            }

            // If user clicked Receipts / Payments
            if (navId === 'sell-receipts') {
                try { sessionStorage.setItem('bms_active_nav', 'sell-receipts'); } catch(err){}
                if (window.location.pathname.endsWith('payment.html')) {
                    e.preventDefault();
                    setActiveNavItem('sell-receipts');
                }
                return;
            }

            // If user clicked Purchase Bills
            if (navId === 'buy-invoices') {
                try { sessionStorage.setItem('bms_active_nav', 'buy-invoices'); } catch(err){}
                if (window.location.pathname.endsWith('bills.html')) {
                    e.preventDefault();
                    setActiveNavItem('buy-invoices');
                }
                return;
            }

            // If user clicked Suppliers
            if (navId === 'buy-suppliers') {
                try { sessionStorage.setItem('bms_active_nav', 'buy-suppliers'); } catch(err){}
                if (window.location.pathname.endsWith('suppliers.html')) {
                    e.preventDefault();
                    setActiveNavItem('buy-suppliers');
                }
                return;
            }

            // If user clicked Disbursements (Expenses)
            if (navId === 'buy-expenses') {
                try { sessionStorage.setItem('bms_active_nav', 'buy-expenses'); } catch(err){}
                if (window.location.pathname.endsWith('disbursement.html')) {
                    e.preventDefault();
                    setActiveNavItem('buy-expenses');
                }
                return;
            }

            // If user clicked Stock Balance
            if (navId === 'stock-balance') {
                try { sessionStorage.setItem('bms_active_nav', 'stock-balance'); } catch(err){}
                if (window.location.pathname.endsWith('balance.html')) {
                    e.preventDefault();
                    setActiveNavItem('stock-balance');
                }
                return;
            }

            // If user clicked Stock Catalog
            if (navId === 'stock-catalog') {
                try { sessionStorage.setItem('bms_active_nav', 'stock-catalog'); } catch(err){}
                if (window.location.pathname.endsWith('catalog.html')) {
                    e.preventDefault();
                    setActiveNavItem('stock-catalog');
                }
                return;
            }

            // If user clicked Stock Movements
            if (navId === 'stock-movements') {
                try { sessionStorage.setItem('bms_active_nav', 'stock-movements'); } catch(err){}
                if (window.location.pathname.endsWith('movement.html')) {
                    e.preventDefault();
                    setActiveNavItem('stock-movements');
                }
                return;
            }

            // If user clicked Reports Overview
            if (navId === 'reports-overview') {
                try { sessionStorage.setItem('bms_active_nav', 'reports-overview'); } catch(err){}
                if (window.location.pathname.includes('/reports/overview/') || window.location.pathname.endsWith('overview.html')) {
                    e.preventDefault();
                    setActiveNavItem('reports-overview');
                }
                return;
            }

            // If user clicked Reports Sales
            if (navId === 'reports-sales') {
                try { sessionStorage.setItem('bms_active_nav', 'reports-sales'); } catch(err){}
                if (window.location.pathname.includes('/reports/sales/') || window.location.pathname.endsWith('sales.html')) {
                    e.preventDefault();
                    setActiveNavItem('reports-sales');
                }
                return;
            }

            // If user clicked Reports Purchases
            if (navId === 'reports-purchases') {
                try { sessionStorage.setItem('bms_active_nav', 'reports-purchases'); } catch(err){}
                if (window.location.pathname.includes('/reports/purchases/') || window.location.pathname.endsWith('purchases.html')) {
                    e.preventDefault();
                    setActiveNavItem('reports-purchases');
                }
                return;
            }

            // If user clicked Reports Stock
            if (navId === 'reports-stock') {
                try { sessionStorage.setItem('bms_active_nav', 'reports-stock'); } catch(err){}
                if (window.location.pathname.includes('/reports/stock/') || window.location.pathname.endsWith('stock.html')) {
                    e.preventDefault();
                    setActiveNavItem('reports-stock');
                }
                return;
            }

            // If user clicked Company Settings
            if (navId === 'settings-company') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-company'); } catch(err){}
                if (window.location.pathname.includes('/settings/company/') || window.location.pathname.endsWith('company.html')) {
                    e.preventDefault();
                    setActiveNavItem('settings-company');
                }
                return;
            }

            // If user clicked User Management
            if (navId === 'settings-users') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-users'); } catch(err){}
                if (window.location.pathname.includes('/settings/users/')) {
                    e.preventDefault();
                    setActiveNavItem('settings-users');
                }
                return;
            }

            // If user clicked Tax Settings
            if (navId === 'settings-tax') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-tax'); } catch(err){}
                if (window.location.pathname.includes('/settings/tax/') || window.location.pathname.endsWith('tax.html')) {
                    e.preventDefault();
                    setActiveNavItem('settings-tax');
                }
                return;
            }

            // If user clicked Notifications Settings
            if (navId === 'settings-notifications') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-notifications'); } catch(err){}
                if (window.location.pathname.includes('/settings/notifications/') || window.location.pathname.endsWith('notifications.html')) {
                    e.preventDefault();
                    setActiveNavItem('settings-notifications');
                }
                return;
            }

            // If user clicked System Settings
            if (navId === 'settings-system') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-system'); } catch(err){}
                if (window.location.pathname.includes('/settings/system/') || window.location.pathname.endsWith('system.html')) {
                    e.preventDefault();
                    setActiveNavItem('settings-system');
                }
                return;
            }

            // If user clicked General Settings / Reports (legacy)
            if (navId === 'settings-general' || navId === 'settings') {
                try { sessionStorage.setItem('bms_active_nav', 'settings-company'); } catch(err){}
                if (window.location.pathname.endsWith('settings.html')) {
                    e.preventDefault();
                    setActiveNavItem('settings-company');
                }
                return;
            }

            if (navId === 'reports') {
                try { sessionStorage.setItem('bms_active_nav', 'reports-overview'); } catch(err){}
                if (window.location.pathname.endsWith('reports.html')) {
                    e.preventDefault();
                    setActiveNavItem('reports-overview');
                }
                return;
            }

            // If currently on empty.html and clicking any empty.html item
            const isAtEmptyPage = window.location.pathname.endsWith('empty.html') || window.location.pathname.endsWith('empty.html/');
            if (isAtEmptyPage) {
                e.preventDefault();
                setActiveNavItem(navId);
                const url = new URL(window.location.href);
                url.searchParams.set('nav', navId);
                window.history.pushState({}, '', url);
            } else {
                try { sessionStorage.setItem('bms_active_nav', navId); } catch(err){}
            }
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        const urlParam = new URLSearchParams(window.location.search).get('nav');
        if (urlParam) {
            setActiveNavItem(urlParam);
        }
    });

    // Initial page load detection
    const urlParam = new URLSearchParams(window.location.search).get('nav');
    let savedNav = null;
    try { savedNav = sessionStorage.getItem('bms_active_nav'); } catch(e) {}

    const normalizedPath = decodeURIComponent(window.location.pathname).replace(/\\/g, '/').toLowerCase();

    const isDashboard = normalizedPath.includes('dashboard.html');
    const isInvoices = (normalizedPath.includes('invoice') || normalizedPath.includes('1-invoice')) && !normalizedPath.includes('bills');
    const isQuotes = normalizedPath.includes('quote') || normalizedPath.includes('2-quote');
    const isCustomers = normalizedPath.includes('customer') || normalizedPath.includes('3-customer');
    const isPayments = normalizedPath.includes('payment') || normalizedPath.includes('4-payment');
    const isBills = normalizedPath.includes('bills') || normalizedPath.includes('1-bills');
    const isSuppliers = normalizedPath.includes('suppliers') || normalizedPath.includes('2-suppliers');
    const isDisbursement = normalizedPath.includes('disbursement') || normalizedPath.includes('3-disbursement');
    const isBalance = normalizedPath.includes('balance') || normalizedPath.includes('1-balance');
    const isCatalog = normalizedPath.includes('catalog') || normalizedPath.includes('2-catalog');
    const isMovement = normalizedPath.includes('movement') || normalizedPath.includes('3-movement');
    
    // Reports sub-pages
    const isReportsOverview = normalizedPath.includes('overview') && (normalizedPath.includes('reports') || normalizedPath.includes('6-reports'));
    const isReportsSales = normalizedPath.includes('sales.html') && (normalizedPath.includes('reports') || normalizedPath.includes('6-reports'));
    const isReportsPurchases = normalizedPath.includes('purchases.html') && (normalizedPath.includes('reports') || normalizedPath.includes('6-reports'));
    const isReportsStock = normalizedPath.includes('stock.html') && (normalizedPath.includes('reports') || normalizedPath.includes('6-reports'));
    const isLegacyReports = normalizedPath.endsWith('/reports.html') && !normalizedPath.includes('overview');

    // Settings sub-pages
    const isCompany = normalizedPath.includes('company') || normalizedPath.includes('1-company');
    const isUsers = normalizedPath.includes('users') || normalizedPath.includes('2-users');
    const isTax = normalizedPath.includes('tax') || normalizedPath.includes('3-tax');
    const isNotifications = normalizedPath.includes('notifications') || normalizedPath.includes('4-notifications');
    const isSystem = normalizedPath.includes('system') || normalizedPath.includes('5-system');
    const isProfile = normalizedPath.includes('profile') || normalizedPath.includes('6-profile');
    const isLegacySettings = normalizedPath.endsWith('/settings.html') && !isCompany && !isUsers && !isTax && !isNotifications && !isSystem && !isProfile;

    let initialNav = urlParam;
    if (!initialNav) {
        if (isDashboard) {
            initialNav = 'dashboard';
        } else if (isInvoices) {
            initialNav = 'sell-invoices';
        } else if (isQuotes) {
            initialNav = 'sell-prices';
        } else if (isCustomers) {
            initialNav = 'sell-customers';
        } else if (isPayments) {
            initialNav = 'sell-receipts';
        } else if (isBills) {
            initialNav = 'buy-invoices';
        } else if (isSuppliers) {
            initialNav = 'buy-suppliers';
        } else if (isDisbursement) {
            initialNav = 'buy-expenses';
        } else if (isBalance) {
            initialNav = 'stock-balance';
        } else if (isCatalog) {
            initialNav = 'stock-catalog';
        } else if (isMovement) {
            initialNav = 'stock-movements';
        } else if (isReportsOverview) {
            initialNav = 'reports-overview';
        } else if (isReportsSales) {
            initialNav = 'reports-sales';
        } else if (isReportsPurchases) {
            initialNav = 'reports-purchases';
        } else if (isReportsStock) {
            initialNav = 'reports-stock';
        } else if (isLegacyReports) {
            initialNav = 'reports-overview';
        } else if (isCompany) {
            initialNav = 'settings-company';
        } else if (isUsers) {
            initialNav = 'settings-users';
        } else if (isTax) {
            initialNav = 'settings-tax';
        } else if (isNotifications) {
            initialNav = 'settings-notifications';
        } else if (isSystem) {
            initialNav = 'settings-system';
        } else if (isProfile) {
            initialNav = 'settings-profile';
        } else if (isLegacySettings) {
            initialNav = 'settings-company';
        } else {
            initialNav = savedNav || 'dashboard';
        }
    }

    setActiveNavItem(initialNav);
}

/**
 * Global User Profile Dropdown & Modal Manager
 */
function getPagesRelativePath(targetPage) {
    const rawPath = window.location.pathname.replace(/\\/g, '/');
    const normalized = decodeURIComponent(rawPath).toLowerCase();
    
    // Auto-map unnumbered / shorthand paths to canonical numbered paths
    const PATH_MAP = {
        'settings/users/view-user.html': '7-settings/2-users/view-user.html',
        'settings/profile/profile.html': '7-settings/6-profile/profile.html',
        'settings/company/company.html': '7-settings/1-company/company.html',
        'settings/system/system.html': '7-settings/5-system/system.html',
        'settings/notifications/notifications.html': '7-settings/4-notifications/notifications.html',
        'sales/invoice/invoice.html': '3-sales/1-invoice/invoice.html',
        'stock/balance/balance.html': '5-stock/1-balance/balance.html',
        'sales/customer/customer.html': '3-sales/3-customer/customer.html',
        'buy/bills/bills.html': '4-buy/1-bills/bills.html',
        'login.html': '1-login/login.html'
    };
    const resolvedTarget = PATH_MAP[targetPage] || targetPage;

    const pagesIdx = normalized.indexOf('/pages/');
    if (pagesIdx !== -1) {
        const afterPages = normalized.substring(pagesIdx + 7);
        const parts = afterPages.split('/').filter(p => p.length > 0);
        const depth = Math.max(0, parts.length - 1);
        const prefix = depth === 0 ? './' : '../'.repeat(depth);
        return prefix + resolvedTarget;
    }
    
    if (normalized.includes('/frontend/')) {
        return 'src/pages/' + resolvedTarget;
    }
    return resolvedTarget;
}

/**
 * User Profile Drawer — a full-height slide-over panel anchored to the right edge.
 * Built once and appended to <body> so it is never clipped by header stacking contexts.
 */
function buildProfileDrawerRow(opts) {
    const tag = opts.href ? 'a' : 'button';
    const attrs = opts.href
        ? `href="${opts.href}"`
        : `type="button" onclick="${opts.onclick}"`;

    return `
        <${tag} ${attrs} class="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors group text-left cursor-pointer">
            <i class="fas ${opts.icon} pd-icon text-${opts.tone}-500 w-6 text-center flex-shrink-0 transition-transform group-hover:scale-110"></i>
            <div class="flex-1 min-w-0">
                <div class="pd-title text-slate-700 group-hover:text-slate-900 transition-colors truncate">${opts.title}</div>
                <div class="pd-sub text-slate-400 truncate">${opts.sub}</div>
            </div>
            <i class="fas fa-chevron-right pd-chevron text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"></i>
        </${tag}>
    `;
}

function initUserProfileMenu() {
    const avatarImgs = document.querySelectorAll('header img[alt*="Avatar"], header img[alt*="អ្នកប្រើប្រាស់"], header img[src*="photo-1494790108377"], header button img.rounded-full');
    if (!avatarImgs || avatarImgs.length === 0) return;

    const avatarSrc = avatarImgs[0].getAttribute('src') || '';

    // 1. Backdrop (created once)
    let backdrop = document.getElementById('bmsProfileBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'bmsProfileBackdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
    }

    // 2. Drawer (created once)
    let drawer = document.getElementById('bmsUserProfileDrawer');
    if (!drawer) {
        // Intentionally a <div>, not an <aside>: custom.css applies global `aside`
        // rules (dark-green background, off-canvas transform below 1024px) that
        // are marked !important and would break this panel.
        drawer = document.createElement('div');
        drawer.id = 'bmsUserProfileDrawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-label', 'គណនីរបស់ខ្ញុំ');
        drawer.setAttribute('tabindex', '-1');

        const url = {
            profile: getPagesRelativePath('7-settings/6-profile/profile.html'),
            company: getPagesRelativePath('7-settings/1-company/company.html'),
            users: getPagesRelativePath('7-settings/2-users/users.html'),
            tax: getPagesRelativePath('7-settings/3-tax/tax.html'),
            notifications: getPagesRelativePath('7-settings/4-notifications/notifications.html'),
            system: getPagesRelativePath('7-settings/5-system/system.html')
        };

        // Brand mark is already resolved in the sidebar, so reuse its URL rather
        // than recomputing a relative asset path for every nesting depth.
        const brandLogoSrc = (document.querySelector('aside img[alt="DIGITECHKH"]') || {}).src || '';

        const groupLabel = (text) => `
            <div class="flex items-center gap-2.5 px-3 mb-2">
                <p class="pd-group text-slate-400 font-medium flex-shrink-0">${text}</p>
                <span class="flex-1 h-px bg-slate-100"></span>
            </div>
        `;

        drawer.innerHTML = `
            <!-- Close button — sits outside the panel on the backdrop from 640px up,
                 and tucks back inside the header on phones where there is no room
                 beside it. Placement and colours live in custom.css. -->
            <button type="button" id="bmsProfileDrawerCloseBtn" onclick="closeUserProfileDrawer()"
                class="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer"
                aria-label="បិទផ្ទាំង" title="បិទផ្ទាំង">
                <i class="fas fa-xmark text-sm"></i>
            </button>

            <!-- Drawer Header (matches the global 72px header height) -->
            <div id="bmsProfileDrawerHeader" class="h-[72px] px-4 flex items-center border-b border-slate-100 flex-shrink-0 bg-white transition-shadow">
                <h3 class="pd-head text-slate-800 w-full text-center px-12 truncate">គណនីរបស់ខ្ញុំ</h3>
            </div>

            <!-- Scrollable Body -->
            <div id="bmsProfileDrawerBody" class="flex-1 overflow-y-auto scrollbar-hide">
                <!-- Identity Block -->
                <div class="px-4 py-4 bg-gradient-to-br from-slate-50 via-emerald-50/25 to-white border-b border-slate-100">
                    <div class="flex items-center gap-3.5">
                        <div class="relative flex-shrink-0">
                            <img src="${avatarSrc}" alt="រូបភាពអ្នកប្រើប្រាស់"
                                class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
                            <span class="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="pd-name text-slate-800 truncate">សុខ ចាន់ថន</h4>
                            <p class="pd-email text-slate-500 truncate">chanthon.sok@digitechkh.com</p>
                            <span class="pd-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1.5 rounded-full font-medium bg-emerald-100/80 text-emerald-800">
                                <i class="fas fa-shield-halved pd-chevron"></i> អ្នកគ្រប់គ្រងកំពូល
                            </span>
                        </div>
                        <a href="${url.profile}"
                            class="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary flex items-center justify-center shadow-sm transition-colors flex-shrink-0 cursor-pointer"
                            title="កែប្រែព័ត៌មាន" aria-label="កែប្រែព័ត៌មាន">
                            <i class="fas fa-pen-to-square text-sm"></i>
                        </a>
                    </div>
                </div>

                <!-- Active Company / Branch Context -->
                <div class="mx-4 mt-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 px-3.5 py-3">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                            ${brandLogoSrc
                                ? `<img src="${brandLogoSrc}" alt="រូបសញ្ញាក្រុមហ៊ុន" class="w-full h-full object-contain" />`
                                : `<i class="fas fa-building text-slate-400 text-sm"></i>`}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="pd-title text-slate-700 truncate">ប៊ីអឹមអេស ឌីជីតិច ឯ.ក</div>
                            <div class="pd-sub text-slate-400 truncate">ការិយាល័យកណ្តាល (ភ្នំពេញ)</div>
                        </div>
                    </div>
                </div>

                <!-- Group: Account
                     Tones follow each icon's natural colour so the rows stay
                     scannable: person blue, brass key gold, brass bell orange. -->
                <div class="px-3 pt-5 pb-1">
                    ${groupLabel('គណនី')}
                    ${buildProfileDrawerRow({ href: url.profile, tone: 'blue', icon: 'fa-user', title: 'កម្រងព័ត៌មានផ្ទាល់ខ្លួន', sub: 'ព័ត៌មានគណនី និងការអនុញ្ញាត' })}
                    ${buildProfileDrawerRow({ onclick: 'openChangePasswordModal()', tone: 'amber', icon: 'fa-key', title: 'ប្តូរពាក្យសម្ងាត់', sub: 'សុវត្ថិភាព និងលេខកូដសម្ងាត់' })}
                    ${buildProfileDrawerRow({ href: url.notifications, tone: 'orange', icon: 'fa-bell', title: 'ការជូនដំណឹង', sub: 'កំណត់ការទទួលដំណឹងផ្សេងៗ' })}
                </div>

                <!-- Group: Administration -->
                <div class="px-3 pt-4 pb-5">
                    ${groupLabel('ការគ្រប់គ្រង')}
                    ${buildProfileDrawerRow({ href: url.company, tone: 'slate', icon: 'fa-building', title: 'ព័ត៌មានក្រុមហ៊ុន', sub: 'សាខា អាសយដ្ឋាន និងរូបសញ្ញា' })}
                    ${buildProfileDrawerRow({ href: url.users, tone: 'indigo', icon: 'fa-users-gear', title: 'អ្នកប្រើប្រាស់ និងសិទ្ធិ', sub: 'គ្រប់គ្រងគណនី និងតួនាទី' })}
                    ${buildProfileDrawerRow({ href: url.tax, tone: 'emerald', icon: 'fa-percent', title: 'ការកំណត់ពន្ធ', sub: 'អត្រាអាករ និងលក្ខខណ្ឌគណនា' })}
                    ${buildProfileDrawerRow({ href: url.system, tone: 'violet', icon: 'fa-sliders', title: 'ការកំណត់ប្រព័ន្ធ', sub: 'ភាសា រូបិយប័ណ្ណ និងទម្រង់' })}
                </div>
            </div>

            <!-- Pinned Footer -->
            <div class="relative px-4 py-3.5 border-t border-slate-100 flex-shrink-0 bg-white">
                <!-- Fades the list into the footer while more rows remain below -->
                <div id="bmsProfileScrollFade" class="pointer-events-none absolute left-0 right-0 -top-10 h-10 transition-opacity duration-200"></div>
                <p class="pd-sub text-slate-400 text-center">DIGITECHKH · កំណែ 1.0</p>
            </div>
        `;
        document.body.appendChild(drawer);
    }

    // 3. Open / close helpers
    let lastTrigger = null;
    // Most pages already carry `overflow-hidden` on <body> as part of their
    // h-screen layout, so only unlock what we actually locked.
    let lockedBodyScroll = false;

    window.openUserProfileDrawer = function(trigger) {
        lastTrigger = trigger || null;
        drawer.classList.add('open');
        backdrop.classList.add('active');
        if (!document.body.classList.contains('overflow-hidden')) {
            document.body.classList.add('overflow-hidden');
            lockedBodyScroll = true;
        }
        document.querySelectorAll('header button[aria-controls="bmsUserProfileDrawer"]')
            .forEach(b => b.setAttribute('aria-expanded', 'true'));
        // Move focus into the dialog itself, not onto the close button: focusing a
        // real control programmatically makes Chrome paint its :focus-visible ring
        // even when the panel was opened by mouse or touch.
        setTimeout(() => drawer.focus({ preventScroll: true }), 320);
    };

    window.closeUserProfileDrawer = function() {
        drawer.classList.remove('open');
        backdrop.classList.remove('active');
        if (lockedBodyScroll) {
            document.body.classList.remove('overflow-hidden');
            lockedBodyScroll = false;
        }
        document.querySelectorAll('header button[aria-controls="bmsUserProfileDrawer"]')
            .forEach(b => b.setAttribute('aria-expanded', 'false'));
        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    };

    window.toggleUserProfileDrawer = function(trigger) {
        if (drawer.classList.contains('open')) {
            window.closeUserProfileDrawer();
        } else {
            window.openUserProfileDrawer(trigger);
        }
    };

    // 4. Wire every header avatar button to the drawer
    avatarImgs.forEach(img => {
        const btn = img.closest('button');
        if (!btn) return;

        btn.setAttribute('aria-haspopup', 'dialog');
        btn.setAttribute('aria-controls', 'bmsUserProfileDrawer');
        btn.setAttribute('aria-expanded', 'false');
        btn.style.cursor = 'pointer';

        btn.onclick = function(e) {
            e.stopPropagation();
            window.toggleUserProfileDrawer(btn);
        };
    });

    // 5. Close on backdrop click, on ESC, and after navigating away
    backdrop.onclick = () => window.closeUserProfileDrawer();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            window.closeUserProfileDrawer();
        }
    });

    drawer.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', () => window.closeUserProfileDrawer());
    });

    // 6. Keep Tab focus inside the panel while it is open (modal dialog behaviour)
    drawer.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusable = Array.from(
            drawer.querySelectorAll('a[href], button:not([disabled])')
        ).filter(el => el.offsetParent !== null);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // 7. Scroll affordances: lift the header once scrolled, and fade the list
    //    into the footer while more rows remain below (scrollbars are hidden
    //    application-wide, so these are the only "there is more" cues).
    const drawerBody = drawer.querySelector('#bmsProfileDrawerBody');
    const drawerHeader = drawer.querySelector('#bmsProfileDrawerHeader');
    const scrollFade = drawer.querySelector('#bmsProfileScrollFade');

    const syncDrawerScrollCues = () => {
        if (!drawerBody) return;
        if (drawerHeader) {
            drawerHeader.classList.toggle('is-scrolled', drawerBody.scrollTop > 4);
        }
        if (scrollFade) {
            const atEnd = drawerBody.scrollTop + drawerBody.clientHeight >= drawerBody.scrollHeight - 4;
            scrollFade.classList.toggle('is-hidden', atEnd);
        }
    };

    if (drawerBody) {
        drawerBody.addEventListener('scroll', syncDrawerScrollCues);
        window.addEventListener('resize', syncDrawerScrollCues);
        // Run once the drawer has laid out so the fade starts in the right state
        setTimeout(syncDrawerScrollCues, 0);
        drawer.addEventListener('transitionend', syncDrawerScrollCues);
    }
}

/**
 * Change Password Modal Dialog
 */
function openChangePasswordModal() {
    // Close the profile drawer first so the modal is not stacked on top of it
    if (typeof window.closeUserProfileDrawer === 'function') {
        window.closeUserProfileDrawer();
    }

    let modal = document.getElementById('bmsChangePasswordModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'bmsChangePasswordModal';
        modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 select-none';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <!-- Modal Header -->
                <div class="p-5 px-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                            <i class="fas fa-key"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-slate-800">ប្តូរពាក្យសម្ងាត់</h3>
                            <p class="text-xs text-slate-400 mt-0.5">កំណត់ពាក្យសម្ងាត់ថ្មីដើម្បីសុវត្ថិភាពគណនី</p>
                        </div>
                    </div>
                    <button onclick="closeChangePasswordModal()" class="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition shadow-sm border border-slate-100">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <form id="bmsChangePasswordForm" onsubmit="event.preventDefault(); submitChangePassword();" class="p-6 space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">ពាក្យសម្ងាត់បច្ចុប្បន្ន <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <input type="password" id="currentPasswordInput" required placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន..." class="w-full text-xs font-normal text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-10 transition" />
                            <button type="button" onclick="togglePasswordVisibility('currentPasswordInput', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <i class="fas fa-eye text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">ពាក្យសម្ងាត់ថ្មី <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <input type="password" id="newPasswordInput" required minlength="6" placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី (យ៉ាងតិច 6 ខ្ទង់)..." class="w-full text-xs font-normal text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-10 transition" />
                            <button type="button" onclick="togglePasswordVisibility('newPasswordInput', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <i class="fas fa-eye text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1.5">បញ្ជាក់ពាក្យសម្ងាត់ថ្មី <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <input type="password" id="confirmPasswordInput" required minlength="6" placeholder="បញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់ថ្មីម្ដងទៀត..." class="w-full text-xs font-normal text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-10 transition" />
                            <button type="button" onclick="togglePasswordVisibility('confirmPasswordInput', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <i class="fas fa-eye text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div class="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                        <button type="button" onclick="closeChangePasswordModal()" class="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                            បោះបង់
                        </button>
                        <button type="submit" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark shadow-sm transition flex items-center gap-2">
                            <i class="fas fa-check"></i> រក្សាទុកពាក្យសម្ងាត់
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.remove('hidden');
    }
}

function closeChangePasswordModal() {
    const modal = document.getElementById('bmsChangePasswordModal');
    if (modal) {
        modal.classList.add('hidden');
        const form = document.getElementById('bmsChangePasswordForm');
        if (form) form.reset();
    }
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

function submitChangePassword() {
    const current = document.getElementById('currentPasswordInput')?.value;
    const newPass = document.getElementById('newPasswordInput')?.value;
    const confirmPass = document.getElementById('confirmPasswordInput')?.value;

    if (!current || !newPass || !confirmPass) {
        if (typeof showToast === 'function') {
            showToast('សូមបំពេញព័ត៌មានឱ្យបានគ្រប់ជ្រុងជ្រោយ!', 'warning');
        }
        return;
    }

    if (newPass !== confirmPass) {
        if (typeof showToast === 'function') {
            showToast('ពាក្យសម្ងាត់ថ្មី និងការបញ្ជាក់ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ!', 'error');
        }
        return;
    }

    if (newPass.length < 6) {
        if (typeof showToast === 'function') {
            showToast('ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 6 ខ្ទង់!', 'warning');
        }
        return;
    }

    closeChangePasswordModal();
    if (typeof showToast === 'function') {
        showToast('ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្ដូរដោយជោគជ័យ!', 'success');
    }
}

/**
 * Notification feed (mock). `text` may carry <b> for the emphasised fragment and
 * <v> for a value that should take the item's own colour.
 */
const BMS_NOTIFICATIONS = [
    {
        target: 'invoice', tone: 'emerald', icon: 'fa-file-invoice-dollar', unread: true,
        text: 'វិក្កយបត្រ <b>#INV-2026-0042</b> ត្រូវបានទូទាត់ជោគជ័យ <v>$12,800.00</v>',
        time: '10 នាទីមុន'
    },
    {
        target: 'stock', tone: 'amber', icon: 'fa-triangle-exclamation', unread: true,
        text: 'ស្តុកទំនិញ <b>iPhone 15 Pro Max</b> ជិតអស់ពីស្តុក នៅសល់តែ <v>3 គ្រឿង</v>',
        time: '45 នាទីមុន'
    },
    {
        target: 'customer', tone: 'blue', icon: 'fa-user-plus', unread: true,
        text: 'អតិថិជនថ្មី <b>សុខ វណ្ណា</b> បានចុះឈ្មោះចូលក្នុងប្រព័ន្ធ',
        time: '2 ម៉ោងមុន'
    },
    {
        target: 'bills', tone: 'violet', icon: 'fa-file-invoice', unread: true,
        text: 'វិក្កយបត្រទិញ <b>#BILL-2026-004</b> ត្រូវបានអនុម័តដោយប្រធានផ្នែក',
        time: '4 ម៉ោងមុន'
    }
];

function buildNotifRow(n, urls) {
    const body = n.text
        .replace(/<b>/g, '<span class="nf-strong text-slate-800">').replace(/<\/b>/g, '</span>')
        .replace(/<v>/g, `<span class="nf-strong text-${n.tone}-700">`).replace(/<\/v>/g, '</span>');

    return `
        <a href="${urls[n.target]}" class="nf-row ${n.unread ? 'is-unread' : ''} relative flex items-start gap-3.5 px-4 py-3 hover:bg-slate-50 transition-colors group">
            <i class="fas ${n.icon} nf-icon text-${n.tone}-500 w-5 text-center flex-shrink-0 mt-0.5"></i>
            <div class="flex-1 min-w-0">
                <p class="nf-text text-slate-600">${body}</p>
                <span class="nf-time text-slate-400 block mt-1">${n.time}</span>
            </div>
            <span class="notif-dot w-2 h-2 rounded-full bg-${n.tone}-500 mt-1.5 flex-shrink-0"></span>
        </a>
    `;
}

/**
 * Global Notifications Dropdown Manager
 */
function initGlobalNotifications() {
    const bellIcons = document.querySelectorAll('header i.fa-bell, header .fa-bell');
    if (!bellIcons || bellIcons.length === 0) return;

    bellIcons.forEach(icon => {
        // Prevent matching bell icons inside the flyout itself
        if (icon.closest('#bmsNotificationFlyout')) return;

        const btn = icon.closest('button');
        if (!btn || btn.id === 'bmsTabNotifsBtn') return;

        // Wrap button in relative container if not already wrapped
        let wrapper = btn.parentElement;
        if (!wrapper.classList.contains('notif-wrapper')) {
            wrapper = document.createElement('div');
            wrapper.className = 'relative inline-flex items-center notif-wrapper';
            btn.parentNode.insertBefore(wrapper, btn);
            wrapper.appendChild(btn);
        }

        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.style.cursor = 'pointer';

        // Check if notification flyout exists
        let flyout = wrapper.querySelector('#bmsNotificationFlyout');
        if (!flyout) {
            flyout = document.createElement('div');
            flyout.id = 'bmsNotificationFlyout';
            flyout.className = 'hidden absolute right-0 top-full mt-2.5 w-[400px] sm:w-[420px] max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[9999] overflow-hidden transform transition-all duration-200 select-none';

            const invoiceUrl = getPagesRelativePath('3-sales/1-invoice/invoice.html');
            const stockUrl = getPagesRelativePath('5-stock/1-balance/balance.html');
            const customerUrl = getPagesRelativePath('3-sales/3-customer/customer.html');
            const billsUrl = getPagesRelativePath('4-buy/1-bills/bills.html');
            const allNotifsUrl = getPagesRelativePath('7-settings/4-notifications/notifications.html');

            // Mirror BMSActionTracker's tab classes so switching tabs doesn't resize
            // them. Fall back to the same strings if the tracker hasn't loaded —
            // an empty fallback would render the tabs completely unstyled.
            const TAB_BASE = 'bms-nf-tab flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap overflow-hidden border-b-2 transition-colors';
            const TAB_ACTIVE = (window.BMSActionTracker && window.BMSActionTracker.TAB_ACTIVE)
                || TAB_BASE + ' is-active border-primary text-primary bg-primary/5';
            const TAB_INACTIVE = (window.BMSActionTracker && window.BMSActionTracker.TAB_INACTIVE)
                || TAB_BASE + ' border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70';

            flyout.innerHTML = `
                <!-- Segmented Tabs (Action Timeline vs Notifications) -->
                <div class="flex items-stretch border-b border-slate-100 bg-slate-50/60" role="tablist">
                    <button type="button" role="tab" aria-selected="true" id="bmsTabActionsBtn" onclick="window.BMSActionTracker && window.BMSActionTracker.switchTab('actions')"
                        class="${TAB_ACTIVE}">
                        <i class="fas fa-clock-rotate-left nf-tab-icon flex-shrink-0"></i>
                        <span class="truncate">ដំណើរការសកម្មភាព</span>
                        <span id="bmsActionCountBadge" class="nf-chip px-1.5 py-0.5 rounded-full font-semibold bg-slate-200/70 text-slate-600 flex-shrink-0">3</span>
                    </button>
                    <button type="button" role="tab" aria-selected="false" id="bmsTabNotifsBtn" onclick="window.BMSActionTracker && window.BMSActionTracker.switchTab('notifications')"
                        class="${TAB_INACTIVE}">
                        <i class="fas fa-bell nf-tab-icon flex-shrink-0"></i>
                        <span class="truncate">ការជូនដំណឹង</span>
                        <span id="bmsNotifCountBadge" class="nf-chip px-1.5 py-0.5 rounded-full font-semibold bg-rose-500 text-white flex-shrink-0">4</span>
                    </button>
                    <button type="button" id="bmsMarkAllReadBtn" onclick="markAllNotificationsAsRead()"
                        class="px-3.5 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-100/70 border-b-2 border-transparent transition-colors cursor-pointer flex-shrink-0"
                        title="សម្គាល់ថាបានអានទាំងអស់" aria-label="សម្គាល់ថាបានអានទាំងអស់">
                        <i class="fas fa-check-double nf-tab-icon"></i>
                    </button>
                </div>

                <!-- Tab 1: Action Timeline List -->
                <div id="bmsActionTimelineList" class="nf-list divide-y divide-slate-50 max-h-96 overflow-y-auto scrollbar-hide">
                    <!-- Injected dynamically by BMSActionTracker -->
                </div>

                <!-- Tab 2: Notification List -->
                <div id="bmsNotificationItemsList" class="nf-list divide-y divide-slate-50 max-h-96 overflow-y-auto scrollbar-hide hidden">
                    ${BMS_NOTIFICATIONS.map(n => buildNotifRow(n, {
                        invoice: invoiceUrl, stock: stockUrl, customer: customerUrl, bills: billsUrl
                    })).join('')}
                </div>

                <!-- Fades the last row into the panel edge while more remain below -->
                <div id="bmsNotifScrollFade" class="pointer-events-none absolute left-0 right-0 bottom-0 h-9 transition-opacity duration-200"></div>
            `;
            wrapper.appendChild(flyout);

            // Scrollbars are hidden application-wide, so the bottom fade is the
            // only cue that more rows exist below the fold.
            flyout.querySelectorAll('.nf-list').forEach(listEl => {
                listEl.addEventListener('scroll', () => window.syncNotifScrollFade());
            });
        }

        // Toggle click handler
        btn.onclick = function(e) {
            e.stopPropagation();
            const isHidden = flyout.classList.contains('hidden');
            
            // Close the profile drawer if open
            if (typeof window.closeUserProfileDrawer === 'function') {
                window.closeUserProfileDrawer();
            }
            // Close other notification flyouts
            document.querySelectorAll('#bmsNotificationFlyout').forEach(f => {
                f.classList.add('hidden');
                if (f.parentElement) f.parentElement.classList.remove('z-50');
            });

            if (isHidden) {
                flyout.classList.remove('hidden');
                btn.setAttribute('aria-expanded', 'true');
                wrapper.classList.add('z-50');
                if (window.BMSActionTracker) {
                    window.BMSActionTracker.renderTimeline('bmsActionTimelineList');
                    window.BMSActionTracker.updateBadge();
                }
                window.syncNotifScrollFade();
            } else {
                flyout.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
                wrapper.classList.remove('z-50');
            }
        };
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#bmsNotificationFlyout') && !e.target.closest('.notif-wrapper')) {
            document.querySelectorAll('#bmsNotificationFlyout').forEach(f => {
                f.classList.add('hidden');
                if (f.parentElement) f.parentElement.classList.remove('z-50');
            });
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('#bmsNotificationFlyout').forEach(f => {
                f.classList.add('hidden');
                if (f.parentElement) f.parentElement.classList.remove('z-50');
            });
        }
    });
}

/**
 * Shows the bottom fade on whichever list is visible, but only while it can
 * still be scrolled further. Exposed globally so BMSActionTracker can call it
 * after re-rendering the timeline or switching tabs.
 */
window.syncNotifScrollFade = function() {
    document.querySelectorAll('#bmsNotificationFlyout').forEach(flyout => {
        const fade = flyout.querySelector('#bmsNotifScrollFade');
        if (!fade) return;

        const list = [...flyout.querySelectorAll('.nf-list')]
            .find(el => !el.classList.contains('hidden'));

        if (!list) {
            fade.classList.add('is-hidden');
            return;
        }

        const atEnd = list.scrollTop + list.clientHeight >= list.scrollHeight - 4;
        fade.classList.toggle('is-hidden', atEnd);
    });
};

function markAllNotificationsAsRead() {
    // Clear the unread tint and the per-row dots
    document.querySelectorAll('#bmsNotificationFlyout .nf-row').forEach(row => row.classList.remove('is-unread'));
    document.querySelectorAll('.notif-dot').forEach(dot => dot.classList.add('hidden'));

    // Fade the tab counter down to a neutral zero
    const badge = document.getElementById('bmsNotifCountBadge');
    if (badge) {
        badge.textContent = '0';
        badge.className = 'nf-chip px-1.5 py-0.5 rounded-full font-semibold bg-slate-200/70 text-slate-500 flex-shrink-0';
    }

    // Drop the pulsing indicator on the header bells
    document.querySelectorAll('header button .animate-ping').forEach(ping => {
        if (ping.parentElement) ping.parentElement.remove();
    });

    if (typeof showToast === 'function') {
        showToast('បានសម្គាល់ការជូនដំណឹងទាំងអស់ថាបានអានរួចរាល់!', 'success');
    }
}

// Global toggle shortcut if referenced
window.toggleNotifications = function() {
    const flyout = document.querySelector('#bmsNotificationFlyout');
    if (flyout) {
        const isHidden = flyout.classList.contains('hidden');
        document.querySelectorAll('#bmsNotificationFlyout').forEach(f => {
            if (isHidden) f.classList.remove('hidden');
            else f.classList.add('hidden');
        });
    }
};

/**
 * Global Mobile Sidebar Drawer & Backdrop Manager
 * Enables smooth off-canvas drawer on mobile (< 1024px) with auto-injected hamburger button
 */
function initMobileSidebarDrawer() {
    const sidebar = document.querySelector('aside');
    if (!sidebar) return;

    // 1. Ensure Backdrop exists
    let backdrop = document.getElementById('bmsMobileBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'bmsMobileBackdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
    }

    // ECharts auto-resize handler
    const triggerChartResize = () => {
        if (window.echarts) {
            document.querySelectorAll('div[_echarts_instance_]').forEach(div => {
                const chart = window.echarts.getInstanceByDom(div);
                if (chart) chart.resize();
            });
        }
    };

    // Drawer state helpers
    const openDrawer = () => {
        sidebar.classList.add('mobile-open');
        backdrop.classList.add('active');
        document.body.classList.add('overflow-hidden');
        setTimeout(triggerChartResize, 300);
    };

    const closeDrawer = () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        setTimeout(triggerChartResize, 300);
    };

    // Close on backdrop click
    backdrop.onclick = closeDrawer;

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
            closeDrawer();
        }
    });

    // Close on resize to desktop (>= 1024px)
    window.addEventListener('resize', () => {
        triggerChartResize();
        if (window.innerWidth >= 1024 && sidebar.classList.contains('mobile-open')) {
            closeDrawer();
        }
    });

    // Close on navigation click inside sidebar
    sidebar.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeDrawer();
            }
        });
    });

    // 2. Add Mobile Close Button inside Sidebar Brand Container (if not present)
    let closeBtn = sidebar.querySelector('#bmsSidebarCloseBtn');
    if (!closeBtn) {
        const brandContainer = sidebar.querySelector('.h-\\[72px\\]') || sidebar.firstElementChild;
        if (brandContainer) {
            closeBtn = document.createElement('button');
            closeBtn.id = 'bmsSidebarCloseBtn';
            closeBtn.type = 'button';
            closeBtn.className = 'ml-auto w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex lg:hidden items-center justify-center transition cursor-pointer flex-shrink-0 shadow-sm';
            closeBtn.setAttribute('aria-label', 'បិទម៉ឺនុយ');
            closeBtn.title = 'បិទម៉ឺនុយ';
            closeBtn.innerHTML = '<i class="fas fa-xmark text-base"></i>';
            closeBtn.onclick = closeDrawer;
            brandContainer.appendChild(closeBtn);
        }
    }

    // 3. Inject Hamburger button into Header (if not present)
    const header = document.querySelector('header');
    if (header) {
        // If this page already has a standard back button (Create/Edit/View sub-pages),
        // do not clutter the mobile header with a hamburger button.
        const existingBackBtn = header.querySelector('a i.fa-arrow-left, a[title*="ត្រឡប់"]');
        let menuBtn = document.getElementById('bmsMobileMenuToggle');
        if (existingBackBtn) {
            if (menuBtn) menuBtn.remove();
        } else {
            if (!menuBtn) {
                menuBtn = document.createElement('button');
                menuBtn.id = 'bmsMobileMenuToggle';
                menuBtn.type = 'button';
                menuBtn.className = 'w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex lg:hidden items-center justify-center border border-slate-200/80 transition-colors cursor-pointer flex-shrink-0 shadow-sm mr-2.5';
                menuBtn.setAttribute('aria-label', 'បើកម៉ឺនុយ');
                menuBtn.title = 'បើកម៉ឺនុយ';
                menuBtn.innerHTML = '<i class="fas fa-bars text-base"></i>';

                menuBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (sidebar.classList.contains('mobile-open')) {
                        closeDrawer();
                    } else {
                        openDrawer();
                    }
                };

                // Find where to insert in header
                const firstChild = header.firstElementChild;
                if (firstChild) {
                    if (firstChild.classList.contains('flex')) {
                        firstChild.insertBefore(menuBtn, firstChild.firstChild);
                    } else {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial header-left-wrapper';
                        header.insertBefore(wrapper, firstChild);
                        wrapper.appendChild(menuBtn);
                        wrapper.appendChild(firstChild);
                    }
                } else {
                    header.appendChild(menuBtn);
                }
            } else {
                menuBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (sidebar.classList.contains('mobile-open')) {
                        closeDrawer();
                    } else {
                        openDrawer();
                    }
                };
            }
        }
    }

    // Expose toggle globally
    window.toggleMobileSidebar = () => {
        if (sidebar.classList.contains('mobile-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };
}

// Attach listeners on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSidebarNav();
        initUserProfileMenu();
        initGlobalNotifications();
        initMobileSidebarDrawer();
    });
} else {
    initSidebarNav();
    initUserProfileMenu();
    initGlobalNotifications();
    initMobileSidebarDrawer();
}
