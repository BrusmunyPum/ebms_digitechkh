/**
 * DIGITECHKH - Action Process Tracker (BMSActionTracker)
 * Records user actions and workflow processes in real-time for prototype demonstrations.
 * State is stored in memory and naturally resets back to default on browser refresh (F5).
 */

(function(window) {
    'use strict';

    const BMS_DEFAULT_ACTIONS = [
        {
            id: 'ACT-003',
            type: 'approve',
            title: 'បានអនុម័តប័ណ្ណចំណាយ EXP-2026-0018',
            detail: 'អនុម័តដោយ សុខ ចាន់ថន • $450.00',
            time: '09:45',
            badge: 'បានអនុម័ត',
            badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200/60',
            icon: 'fa-circle-check',
            iconBg: 'bg-blue-50 text-blue-600'
        },
        {
            id: 'ACT-002',
            type: 'invoice',
            title: 'ចេញវិក្កយបត្រ INV-2026-0042',
            detail: 'អតិថិជន: ហេង វិច្ឆិកា • $12,800.00',
            time: '09:15',
            badge: 'វិក្កយបត្រ',
            badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
            icon: 'fa-file-invoice-dollar',
            iconBg: 'bg-emerald-50 text-emerald-600'
        },
        {
            id: 'ACT-001',
            type: 'system',
            title: 'ប្រព័ន្ធត្រូវបានចាប់ផ្ដើមដោយជោគជ័យ',
            detail: 'ម៉ាស៊ីនបម្រើ និងមូលដ្ឋានទិន្នន័យដំណើរការធម្មតា',
            time: '08:30',
            badge: 'ប្រព័ន្ធ',
            badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
            icon: 'fa-server',
            iconBg: 'bg-indigo-50 text-indigo-600'
        }
    ];

    const BMSActionTracker = {
        // In-memory actions list (Resets to default on page refresh / reload)
        actions: JSON.parse(JSON.stringify(BMS_DEFAULT_ACTIONS)),
        activeTab: 'actions', // 'actions' or 'notifications'

        // Record a new action
        record: function(opts) {
            if (!opts) return;

            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;

            let defaultIcon = 'fa-check';
            let defaultIconBg = 'bg-emerald-50 text-emerald-600';
            let defaultBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
            let defaultBadge = 'ជោគជ័យ';

            if (opts.type === 'error' || opts.type === 'danger' || opts.type === 'reject') {
                defaultIcon = 'fa-xmark';
                defaultIconBg = 'bg-rose-50 text-rose-600';
                defaultBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200/60';
                defaultBadge = 'បានបដិសេធ';
            } else if (opts.type === 'warning') {
                defaultIcon = 'fa-triangle-exclamation';
                defaultIconBg = 'bg-amber-50 text-amber-600';
                defaultBadgeClass = 'bg-amber-50 text-amber-700 border border-amber-200/60';
                defaultBadge = 'ជូនដំណឹង';
            } else if (opts.type === 'approve' || opts.type === 'approve_all') {
                defaultIcon = 'fa-circle-check';
                defaultIconBg = 'bg-emerald-50 text-emerald-600';
                defaultBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
                defaultBadge = 'បានអនុម័ត';
            } else if (opts.type === 'delete') {
                defaultIcon = 'fa-trash-can';
                defaultIconBg = 'bg-rose-50 text-rose-600';
                defaultBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200/60';
                defaultBadge = 'បានលុប';
            } else if (opts.type === 'create') {
                defaultIcon = 'fa-plus';
                defaultIconBg = 'bg-emerald-50 text-emerald-600';
                defaultBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
                defaultBadge = 'បានបង្កើត';
            }

            const newAction = {
                id: 'ACT-' + Date.now().toString().slice(-4),
                type: opts.type || 'success',
                title: opts.title || 'សកម្មភាពថ្មី',
                detail: opts.detail || 'ប្រតិបត្តិដោយ សុខ ចាន់ថន',
                time: opts.time || currentTime,
                badge: opts.badge || defaultBadge,
                badgeClass: opts.badgeClass || defaultBadgeClass,
                icon: opts.icon || defaultIcon,
                iconBg: opts.iconBg || defaultIconBg,
                isNew: true
            };

            this.actions.unshift(newAction);

            // Update UI timeline if open or rendered
            this.renderTimeline();
            this.updateBadge();

            // Highlight notification bell
            this.triggerBellIndicator();

            // Dispatch global event
            window.dispatchEvent(new CustomEvent('bmsActionRecorded', { detail: newAction }));

            return newAction;
        },

        // Get all actions
        getHistory: function() {
            return this.actions;
        },

        // Reset to original default mock data
        resetToDefault: function() {
            this.actions = JSON.parse(JSON.stringify(BMS_DEFAULT_ACTIONS));
            this.renderTimeline();
            this.updateBadge();

            // If on approvals page, reset approval rows
            if (typeof window.resetApprovalsToDefault === 'function') {
                window.resetApprovalsToDefault();
            }

            if (typeof window.showToast === 'function') {
                window.showToast('ទិន្នន័យ និងប្រវត្តិនៃសកម្មភាពត្រូវបានកំណត់ទៅសភាពដើមវិញ!', 'info');
            }

            window.dispatchEvent(new CustomEvent('bmsActionReset'));
        },

        // Switch tabs between Action Timeline and Notifications
        switchTab: function(tabName) {
            this.activeTab = tabName;
            const tabActionsBtn = document.getElementById('bmsTabActionsBtn');
            const tabNotifsBtn = document.getElementById('bmsTabNotifsBtn');
            const actionContainer = document.getElementById('bmsActionTimelineList');
            const notifContainer = document.getElementById('bmsNotificationItemsList');

            if (tabName === 'actions') {
                if (tabActionsBtn) {
                    tabActionsBtn.className = 'flex-1 py-2 text-xs font-semibold text-primary border-b-2 border-primary bg-primary/5 transition flex items-center justify-center gap-1.5 cursor-pointer';
                }
                if (tabNotifsBtn) {
                    tabNotifsBtn.className = 'flex-1 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent transition flex items-center justify-center gap-1.5 cursor-pointer';
                }
                if (actionContainer) actionContainer.classList.remove('hidden');
                if (notifContainer) notifContainer.classList.add('hidden');
                this.renderTimeline();
            } else {
                if (tabActionsBtn) {
                    tabActionsBtn.className = 'flex-1 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 border-b-2 border-transparent transition flex items-center justify-center gap-1.5 cursor-pointer';
                }
                if (tabNotifsBtn) {
                    tabNotifsBtn.className = 'flex-1 py-2 text-xs font-semibold text-primary border-b-2 border-primary bg-primary/5 transition flex items-center justify-center gap-1.5 cursor-pointer';
                }
                if (actionContainer) actionContainer.classList.add('hidden');
                if (notifContainer) notifContainer.classList.remove('hidden');
            }
        },

        // Update count badges
        updateBadge: function() {
            const badge = document.getElementById('bmsActionCountBadge');
            if (badge) {
                const count = this.actions.length;
                badge.textContent = `${count}`;
            }
        },

        // Trigger bell pulsing indicator
        triggerBellIndicator: function() {
            const bellPings = document.querySelectorAll('header button .animate-ping');
            bellPings.forEach(p => {
                if (p.parentElement) p.parentElement.style.display = 'flex';
            });
        },

        // Render timeline DOM inside the flyout
        renderTimeline: function(containerId = 'bmsActionTimelineList') {
            const container = document.getElementById(containerId);
            if (!container) return;

            if (this.actions.length === 0) {
                container.innerHTML = `
                    <div class="py-12 text-center text-slate-400">
                        <i class="fas fa-clipboard-list text-3xl mb-2 opacity-30"></i>
                        <p class="text-xs font-medium">មិនទាន់មានសកម្មភាពត្រូវបានកត់ត្រានៅឡើយទេ</p>
                    </div>
                `;
                return;
            }

            let html = '';
            this.actions.forEach((act, idx) => {
                const isLast = idx === this.actions.length - 1;
                const newPulse = act.isNew 
                    ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-100 text-emerald-800 ml-1.5 animate-pulse">ទើបធ្វើ</span>' 
                    : '';

                html += `
                    <div class="relative flex items-start gap-3 p-3 px-4 hover:bg-slate-50/90 transition group">
                        <!-- Connecting Line -->
                        ${!isLast ? '<div class="absolute left-[30px] top-10 bottom-0 w-px bg-slate-100 group-hover:bg-slate-200 transition"></div>' : ''}
                        
                        <!-- Icon -->
                        <div class="w-8 h-8 rounded-xl ${act.iconBg} flex items-center justify-center text-xs flex-shrink-0 z-10 shadow-xs ring-2 ring-white">
                            <i class="fas ${act.icon}"></i>
                        </div>

                        <!-- Details -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-1 mb-0.5">
                                <h5 class="text-xs font-semibold text-slate-800 truncate">${act.title}</h5>
                                <span class="text-[10px] text-slate-400 flex-shrink-0 font-medium">${act.time}</span>
                            </div>
                            <p class="text-[11px] text-slate-500 truncate leading-tight">${act.detail}</p>
                            <div class="mt-1.5 flex items-center gap-1.5">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-medium ${act.badgeClass}">${act.badge}</span>
                                ${newPulse}
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
            this.updateBadge();
        }
    };

    window.BMSActionTracker = BMSActionTracker;

})(window);
