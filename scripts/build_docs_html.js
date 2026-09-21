const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const docsDir = path.join(__dirname, '..', 'documentation');

// 10 Roles Definition
const roles = [
    { key: 'superadmin', name: 'ស៊ុបភើរ អភិបាល', roleEn: 'Super Admin', icon: '👑', file: 'role_superadmin.md', html: 'role_superadmin.html', tag: 'Multi-Tenant' },
    { key: 'procurement_manager', name: 'អ្នកគ្រប់គ្រងលទ្ធកម្ម', roleEn: 'Procurement Manager', icon: '🛒', file: 'role_procurement_manager.md', html: 'role_procurement_manager.html', tag: 'Procure' },
    { key: 'warehouse_staff', name: 'បុគ្គលិកឃ្លាំងទំនិញ', roleEn: 'Warehouse Staff', icon: '👷', file: 'role_warehouse_staff.md', html: 'role_warehouse_staff.html', tag: 'Zero Price' },
    { key: 'customer_support', name: 'ផ្នែកគាំទ្រអតិថិជន', roleEn: 'Customer Support', icon: '🎧', file: 'role_customer_support.md', html: 'role_customer_support.html', tag: 'Support' },
    { key: 'apar_accountant', name: 'គណនេយ្យករចំណាយ និងចំណូល', roleEn: 'AP/AR Accountant', icon: '💰', file: 'role_apar_accountant.md', html: 'role_apar_accountant.html', tag: 'Finance' },
    { key: 'sales_manager', name: 'អ្នកគ្រប់គ្រងផ្នែកលក់', roleEn: 'Sales Manager', icon: '👔', file: 'role_sales_manager.md', html: 'role_sales_manager.html', tag: 'Sales Lead' },
    { key: 'internal_auditor_executive', name: 'សវនករផ្ទៃក្នុង និងថ្នាក់ដឹកនាំ', roleEn: 'Internal Auditor / Executive', icon: '🔍', file: 'role_internal_auditor_executive.md', html: 'role_internal_auditor_executive.html', tag: 'Read-Only' },
    { key: 'sales_executive', name: 'បុគ្គលិកប្រតិបត្តិផ្នែកលក់', roleEn: 'Sales Executive', icon: '💼', file: 'role_sales_executive.md', html: 'role_sales_executive.html', tag: 'Zero Cost' },
    { key: 'admin_general_manager', name: 'អភិបាល និងអ្នកចាត់ការទូទៅ', roleEn: 'Admin / General Manager', icon: '🏛️', file: 'role_admin_general_manager.md', html: 'role_admin_general_manager.html', tag: 'Command' },
    { key: 'warehouse_manager', name: 'អ្នកគ្រប់គ្រងឃ្លាំងស្តុក', roleEn: 'Warehouse Manager', icon: '📦', file: 'role_warehouse_manager.md', html: 'role_warehouse_manager.html', tag: 'Inventory' }
];

// 9 Tech Specs Definition
const techDocs = [
    { num: '00', name: 'ស្ថាបត្យកម្ម & គំរូទិន្នន័យ', file: '00-SYSTEM-OVERVIEW-AND-ARCHITECTURE.md', html: '00-SYSTEM-OVERVIEW-AND-ARCHITECTURE.html', icon: '🏗️' },
    { num: '01', name: 'លំហូរការងារទាំង 8 វដ្ត', file: '01-END-TO-END-SYSTEM-WORKFLOW.md', html: '01-END-TO-END-SYSTEM-WORKFLOW.html', icon: '🔄' },
    { num: '02', name: 'បញ្ជីសវនកម្មគុណភាព', file: '02-DELIVERY-AUDIT-AND-CHECKLIST.md', html: '02-DELIVERY-AUDIT-AND-CHECKLIST.html', icon: '✅' },
    { num: '03', name: 'សៀវភៅណែនាំប្រតិបត្តិការ', file: '03-USER-OPERATIONAL-GUIDE.md', html: '03-USER-OPERATIONAL-GUIDE.html', icon: '📖' },
    { num: '04', name: 'មេរៀន និងស្តង់ដារបច្ចេកវិទ្យា', file: '04-LEARNINGS-AND-STANDARDS-BENCHMARK.md', html: '04-LEARNINGS-AND-STANDARDS-BENCHMARK.html', icon: '💡' },
    { num: '05', name: 'ប្លង់មេ & ផែនទីបង្ហាញផ្លូវ', file: '05-MASTER-SYSTEM-BLUEPRINT-AND-ENTERPRISE-PLAN.md', html: '05-MASTER-SYSTEM-BLUEPRINT-AND-ENTERPRISE-PLAN.html', icon: '🗺️' },
    { num: '06', name: 'សេចក្តីបញ្ជាក់លម្អិតប្រព័ន្ធ', file: '06-FULL-SYSTEM-SPECIFICATION-AND-TEAM-GUIDE.md', html: '06-FULL-SYSTEM-SPECIFICATION-AND-TEAM-GUIDE.html', icon: '📑' },
    { num: '07', name: 'យុទ្ធសាស្ត្រលក់ & Wow Demo', file: '07-CLIENT-PITCH-AND-SALES-STRATEGY.md', html: '07-CLIENT-PITCH-AND-SALES-STRATEGY.html', icon: '🎯' },
    { num: '08', name: 'លក្ខណៈបច្ចេកទេស Showroom', file: '08-ECOMMERCE-DIGITAL-SHOWROOM-SPECIFICATION.md', html: '08-ECOMMERCE-DIGITAL-SHOWROOM-SPECIFICATION.html', icon: '🛍️' }
];

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\u1780-\u17FF\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

// Custom renderer to assign matching heading IDs
const renderer = {
    heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const rawText = tokens.map(t => t.raw || t.text || '').join('');
        const slug = slugify(rawText);
        return `<h${depth} id="${slug}" class="scroll-mt-24 group">${text} <a href="#${slug}" class="opacity-0 group-hover:opacity-40 hover:!opacity-100 text-slate-400 text-xs ml-2 transition">#</a></h${depth}>\n`;
    }
};

marked.use({ renderer, gfm: true, breaks: true });

function processHtmlContent(rawHtml) {
    // Transform markdown links from .md to .html
    let html = rawHtml.replace(/href="([^"]+)\.md(#?[^"]*)"/g, (match, p1, p2) => {
        return `href="${p1}.html${p2}"`;
    });

    // Style tables
    html = html.replace(/<table>/g, '<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm"><table class="w-full text-left border-collapse text-xs">');
    html = html.replace(/<\/table>/g, '</table></div>');
    html = html.replace(/<thead>/g, '<thead class="bg-[#0f2b5c] text-white">');
    html = html.replace(/<th>/g, '<th class="p-3.5 font-semibold text-white text-xs border-b border-slate-200">');
    html = html.replace(/<td>/g, '<td class="p-3 text-slate-700 border-b border-slate-100 text-xs">');
    html = html.replace(/<tr>/g, '<tr class="hover:bg-slate-50 transition border-b border-slate-100 last:border-0">');

    // Style blockquotes
    html = html.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (match, inner) => {
        if (inner.includes('⚠️')) {
            return `<div class="my-5 p-4 rounded-xl bg-amber-50/90 border-l-4 border-amber-500 text-amber-950 text-xs leading-relaxed shadow-sm">${inner}</div>`;
        } else if (inner.includes('💡')) {
            return `<div class="my-5 p-4 rounded-xl bg-blue-50/90 border-l-4 border-blue-500 text-blue-950 text-xs leading-relaxed shadow-sm">${inner}</div>`;
        } else if (inner.includes('👑') || inner.includes('🎯') || inner.includes('👉')) {
            return `<div class="my-5 p-4 rounded-xl bg-indigo-50/90 border-l-4 border-indigo-500 text-indigo-950 text-xs leading-relaxed shadow-sm">${inner}</div>`;
        } else {
            return `<div class="my-5 p-4 rounded-xl bg-slate-50 border-l-4 border-[#0f2b5c] text-slate-800 text-xs leading-relaxed shadow-sm">${inner}</div>`;
        }
    });

    // Style code blocks (diagrams & code)
    html = html.replace(/<pre><code(?:\s+class="[^"]*")?>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
        return `<div class="my-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md overflow-hidden">
            <div class="px-4 py-2 bg-slate-800/90 text-[11px] font-mono text-slate-400 flex items-center justify-between border-b border-slate-700/60">
                <span class="flex items-center gap-1.5"><i class="fas fa-terminal text-cyan-400"></i> Diagram / Architecture / Schema</span>
                <span class="text-[10px] text-slate-400 font-sans">UTF-8 · Khmer UI</span>
            </div>
            <pre class="p-5 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed"><code>${code}</code></pre>
        </div>`;
    });

    // Style standalone inline code
    html = html.replace(/(?<!<pre[^>]*>[\s\S]*?)<code>([^<]+)<\/code>(?![\s\S]*?<\/pre>)/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-primary font-mono text-xs border border-slate-200/80">$1</code>');

    return html;
}

function extractToc(markdown) {
    const toc = [];
    const lines = markdown.split('\n');
    lines.forEach(line => {
        const h2Match = line.match(/^##\s+(.+)$/);
        const h3Match = line.match(/^###\s+(.+)$/);
        if (h2Match) {
            const title = h2Match[1].trim();
            const slug = slugify(title);
            toc.push({ level: 2, title, slug });
        } else if (h3Match) {
            const title = h3Match[1].trim();
            const slug = slugify(title);
            toc.push({ level: 3, title, slug });
        }
    });
    return toc;
}

function generateRoleHtml(role, index) {
    const mdPath = path.join(docsDir, role.file);
    if (!fs.existsSync(mdPath)) return;

    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const toc = extractToc(mdContent);
    const parsedHtml = marked.parse(mdContent);
    const styledHtml = processHtmlContent(parsedHtml);

    const prevRole = index > 0 ? roles[index - 1] : roles[roles.length - 1];
    const nextRole = index < roles.length - 1 ? roles[index + 1] : roles[0];

    const tocHtml = toc.map(item => {
        const pl = item.level === 3 ? 'pl-4 text-[11px] text-slate-500' : 'font-semibold text-xs text-slate-700';
        return `<a href="#${item.slug}" class="block py-1 ${pl} hover:text-primary transition truncate" title="${item.title}">${item.title}</a>`;
    }).join('\n');

    const roleDropdownOptions = roles.map(r => {
        const selected = r.key === role.key ? 'selected' : '';
        return `<option value="${r.html}" ${selected}>${r.icon} ${r.name} (${r.roleEn})</option>`;
    }).join('\n');

    const htmlContent = `<!DOCTYPE html>
<html lang="km" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${role.icon} ${role.name} (${role.roleEn}) — ការសិក្សាស៊ីជម្រៅ | DIGITECHKH BMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Kantumruy Pro', 'sans-serif'],
                    },
                    colors: {
                        primary: '#0f2b5c',
                        primaryHover: '#0a1d3f',
                        accent: '#2563eb',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Kantumruy Pro', sans-serif;
            color: #334155;
            background-color: #f8fafc;
        }
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        h1, h2, h3, h4 { color: #0f172a; font-weight: 700; }
        h1 { font-size: 1.8rem; line-height: 2.35rem; margin-bottom: 1.25rem; }
        h2 { font-size: 1.35rem; line-height: 1.85rem; margin-top: 2.25rem; margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; }
        h3 { font-size: 1.1rem; line-height: 1.5rem; margin-top: 1.75rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 0.85rem; line-height: 1.8; font-size: 0.95rem; }
        ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; font-size: 0.95rem; }
        ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; font-size: 0.95rem; }
        li { margin-bottom: 0.35rem; line-height: 1.7; }
        hr { border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
        @media print {
            .no-print { display: none !important; }
            body { background-color: #ffffff; color: #000; }
            .print-container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; }
            table, pre, blockquote, .rounded-xl, .rounded-2xl { page-break-inside: avoid; }
        }
    </style>
</head>
<body class="antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col justify-between">

    <!-- Top Sticky Control Bar -->
    <header class="no-print fixed top-0 left-0 right-0 h-16 bg-primary text-white z-50 px-4 sm:px-8 flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
            <a href="index.html" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-2 text-xs font-semibold">
                <i class="fas fa-arrow-left"></i> <span class="hidden sm:inline">មជ្ឈមណ្ឌលឯកសារ</span>
            </a>
            <span class="text-white/30 hidden sm:inline">|</span>
            <div class="flex items-center gap-2">
                <span class="text-xl">${role.icon}</span>
                <span class="font-bold text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-xs">${role.name}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-cyan-200 hidden md:inline">${role.tag}</span>
            </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
            <!-- Role Switcher -->
            <div class="relative">
                <select onchange="window.location.href=this.value" class="h-9 pl-3 pr-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:bg-[#0a1d3f] transition appearance-none cursor-pointer">
                    ${roleDropdownOptions}
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-3 text-[10px] text-white/60 pointer-events-none"></i>
            </div>

            <!-- Interactive Guide Link -->
            <a href="DIGITECHKH-Roles-And-Permissions-Interactive-Guide.html?role=${role.key}" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition hidden lg:flex items-center gap-1.5 shadow-sm">
                <i class="fas fa-table-cells"></i> ផ្ទាំងអន្តរកម្ម & ម៉ាទ្រីស
            </a>

            <!-- Print Button -->
            <button onclick="window.print()" class="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer">
                <i class="fas fa-print"></i> <span class="hidden sm:inline">បោះពុម្ព A4</span>
            </button>
        </div>
    </header>

    <!-- Reading Container -->
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div class="flex flex-col lg:flex-row gap-8 items-start">

            <!-- Left Table of Contents Sidebar -->
            <aside class="no-print lg:w-72 flex-shrink-0 sticky top-24 hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span class="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fas fa-list-ul text-primary"></i> មាតិកាឯកសារ
                    </span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-accent">TOC</span>
                </div>
                <div class="space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                    ${tocHtml}
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <a href="DIGITECHKH-Roles-And-Permissions-Interactive-Guide.html?role=${role.key}" class="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-between transition border border-slate-200">
                        <span>មើលក្នុងផ្ទាំងអន្តរកម្ម</span>
                        <i class="fas fa-up-right-from-square text-[10px] text-slate-400"></i>
                    </a>
                    <a href="${role.file}" class="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-[11px] font-normal flex items-center justify-between transition border border-slate-200">
                        <span>មើលឯកសារដើម (.md)</span>
                        <i class="fas fa-file-code text-[10px]"></i>
                    </a>
                </div>
            </aside>

            <!-- Main Document Body -->
            <main class="print-container flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-12 min-w-0 max-w-4xl mx-auto">

                <!-- Breadcrumb -->
                <div class="no-print flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap pb-4 border-b border-slate-100">
                    <a href="index.html" class="hover:text-primary transition flex items-center gap-1">
                        <i class="fas fa-home"></i> មជ្ឈមណ្ឌលឯកសារ
                    </a>
                    <span>/</span>
                    <a href="DIGITECHKH-Roles-And-Permissions-Interactive-Guide.html" class="hover:text-primary transition">
                        តួនាទីទាំង 10
                    </a>
                    <span>/</span>
                    <span class="text-slate-800 font-semibold">${role.name}</span>
                </div>

                <!-- Document Rendered HTML -->
                <article class="prose prose-slate max-w-none">
                    ${styledHtml}
                </article>

                <!-- Next / Previous Role Navigation Bar -->
                <div class="no-print mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="${prevRole.html}" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition group flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                            ${prevRole.icon}
                        </div>
                        <div class="min-w-0">
                            <div class="text-[10px] text-slate-400 font-medium">← តួនាទីមុន</div>
                            <div class="text-xs font-bold text-slate-800 group-hover:text-primary transition truncate">${prevRole.name}</div>
                        </div>
                    </a>

                    <a href="${nextRole.html}" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition group flex items-center justify-end text-right gap-3">
                        <div class="min-w-0">
                            <div class="text-[10px] text-slate-400 font-medium">តួនាទីបន្ទាប់ →</div>
                            <div class="text-xs font-bold text-slate-800 group-hover:text-primary transition truncate">${nextRole.name}</div>
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                            ${nextRole.icon}
                        </div>
                    </a>
                </div>

            </main>
        </div>
    </div>

    <!-- Footer -->
    <footer class="no-print bg-white border-t border-slate-200 py-6 px-8 text-center text-xs text-slate-500">
        <p>រក្សាសិទ្ធិគ្រប់យ៉ាង © 2026 ក្រុមហ៊ុន ឌីជីថេក ខេអេច (DIGITECHKH Co., Ltd.) · ព្រះរាជាណាចក្រកម្ពុជា</p>
    </footer>

</body>
</html>`;

    const outPath = path.join(docsDir, role.html);
    fs.writeFileSync(outPath, htmlContent, 'utf8');
    console.log(`✓ Generated Role HTML: ${role.html}`);
}

function generateTechHtml(techDoc, index) {
    const mdPath = path.join(docsDir, techDoc.file);
    if (!fs.existsSync(mdPath)) return;

    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const toc = extractToc(mdContent);
    const parsedHtml = marked.parse(mdContent);
    const styledHtml = processHtmlContent(parsedHtml);

    const prevDoc = index > 0 ? techDocs[index - 1] : techDocs[techDocs.length - 1];
    const nextDoc = index < techDocs.length - 1 ? techDocs[index + 1] : techDocs[0];

    const tocHtml = toc.map(item => {
        const pl = item.level === 3 ? 'pl-4 text-[11px] text-slate-500' : 'font-semibold text-xs text-slate-700';
        return `<a href="#${item.slug}" class="block py-1 ${pl} hover:text-primary transition truncate" title="${item.title}">${item.title}</a>`;
    }).join('\n');

    const techDropdownOptions = techDocs.map(d => {
        const selected = d.num === techDoc.num ? 'selected' : '';
        return `<option value="${d.html}" ${selected}>${d.num}. ${d.name}</option>`;
    }).join('\n');

    const htmlContent = `<!DOCTYPE html>
<html lang="km" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${techDoc.num}. ${techDoc.name} — ឯកសារបច្ចេកទេស | DIGITECHKH BMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Kantumruy Pro', 'sans-serif'],
                    },
                    colors: {
                        primary: '#0f2b5c',
                        primaryHover: '#0a1d3f',
                        accent: '#2563eb',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Kantumruy Pro', sans-serif;
            color: #334155;
            background-color: #f8fafc;
        }
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        h1, h2, h3, h4 { color: #0f172a; font-weight: 700; }
        h1 { font-size: 1.8rem; line-height: 2.35rem; margin-bottom: 1.25rem; }
        h2 { font-size: 1.35rem; line-height: 1.85rem; margin-top: 2.25rem; margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; }
        h3 { font-size: 1.1rem; line-height: 1.5rem; margin-top: 1.75rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 0.85rem; line-height: 1.8; font-size: 0.95rem; }
        ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; font-size: 0.95rem; }
        ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; font-size: 0.95rem; }
        li { margin-bottom: 0.35rem; line-height: 1.7; }
        hr { border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
        @media print {
            .no-print { display: none !important; }
            body { background-color: #ffffff; color: #000; }
            .print-container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; }
            table, pre, blockquote, .rounded-xl, .rounded-2xl { page-break-inside: avoid; }
        }
    </style>
</head>
<body class="antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col justify-between">

    <!-- Top Sticky Control Bar -->
    <header class="no-print fixed top-0 left-0 right-0 h-16 bg-primary text-white z-50 px-4 sm:px-8 flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
            <a href="index.html" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-2 text-xs font-semibold">
                <i class="fas fa-arrow-left"></i> <span class="hidden sm:inline">មជ្ឈមណ្ឌលឯកសារ</span>
            </a>
            <span class="text-white/30 hidden sm:inline">|</span>
            <div class="flex items-center gap-2">
                <span class="text-xl">${techDoc.icon}</span>
                <span class="font-bold text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-xs">${techDoc.num}. ${techDoc.name}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-emerald-300 hidden md:inline">Technical Spec</span>
            </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
            <!-- Tech Doc Switcher -->
            <div class="relative">
                <select onchange="window.location.href=this.value" class="h-9 pl-3 pr-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:bg-[#0a1d3f] transition appearance-none cursor-pointer">
                    ${techDropdownOptions}
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-3 text-[10px] text-white/60 pointer-events-none"></i>
            </div>

            <!-- Print Button -->
            <button onclick="window.print()" class="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer">
                <i class="fas fa-print"></i> <span class="hidden sm:inline">បោះពុម្ព A4</span>
            </button>
        </div>
    </header>

    <!-- Reading Container -->
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div class="flex flex-col lg:flex-row gap-8 items-start">

            <!-- Left Table of Contents Sidebar -->
            <aside class="no-print lg:w-72 flex-shrink-0 sticky top-24 hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span class="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fas fa-list-ul text-primary"></i> មាតិកាឯកសារ
                    </span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-accent">TOC</span>
                </div>
                <div class="space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                    ${tocHtml}
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <a href="${techDoc.file}" class="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-[11px] font-normal flex items-center justify-between transition border border-slate-200">
                        <span>មើលឯកសារដើម (.md)</span>
                        <i class="fas fa-file-code text-[10px]"></i>
                    </a>
                </div>
            </aside>

            <!-- Main Document Body -->
            <main class="print-container flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-12 min-w-0 max-w-4xl mx-auto">

                <!-- Breadcrumb -->
                <div class="no-print flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap pb-4 border-b border-slate-100">
                    <a href="index.html" class="hover:text-primary transition flex items-center gap-1">
                        <i class="fas fa-home"></i> មជ្ឈមណ្ឌលឯកសារ
                    </a>
                    <span>/</span>
                    <span class="text-slate-500">ឯកសារបច្ចេកទេស</span>
                    <span>/</span>
                    <span class="text-slate-800 font-semibold">${techDoc.name}</span>
                </div>

                <!-- Document Rendered HTML -->
                <article class="prose prose-slate max-w-none">
                    ${styledHtml}
                </article>

                <!-- Next / Previous Doc Navigation Bar -->
                <div class="no-print mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="${prevDoc.html}" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition group flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                            ${prevDoc.icon}
                        </div>
                        <div class="min-w-0">
                            <div class="text-[10px] text-slate-400 font-medium">← ឯកសារមុន</div>
                            <div class="text-xs font-bold text-slate-800 group-hover:text-primary transition truncate">${prevDoc.name}</div>
                        </div>
                    </a>

                    <a href="${nextDoc.html}" class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition group flex items-center justify-end text-right gap-3">
                        <div class="min-w-0">
                            <div class="text-[10px] text-slate-400 font-medium">ឯកសារបន្ទាប់ →</div>
                            <div class="text-xs font-bold text-slate-800 group-hover:text-primary transition truncate">${nextDoc.name}</div>
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                            ${nextDoc.icon}
                        </div>
                    </a>
                </div>

            </main>
        </div>
    </div>

    <!-- Footer -->
    <footer class="no-print bg-white border-t border-slate-200 py-6 px-8 text-center text-xs text-slate-500">
        <p>រក្សាសិទ្ធិគ្រប់យ៉ាង © 2026 ក្រុមហ៊ុន ឌីជីថេក ខេអេច (DIGITECHKH Co., Ltd.) · ព្រះរាជាណាចក្រកម្ពុជា</p>
    </footer>

</body>
</html>`;

    const outPath = path.join(docsDir, techDoc.html);
    fs.writeFileSync(outPath, htmlContent, 'utf8');
    console.log(`✓ Generated Tech HTML: ${techDoc.html}`);
}

// Generate all 10 roles
console.log('Generating HTML for 10 roles...');
roles.forEach((role, idx) => {
    generateRoleHtml(role, idx);
});

// Generate all 9 tech specs
console.log('Generating HTML for 9 technical specifications...');
techDocs.forEach((doc, idx) => {
    generateTechHtml(doc, idx);
});

console.log('Finished compiling all 19 HTML documentation files successfully!');
