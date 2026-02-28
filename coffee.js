// ─── STATE ────────────────────────────────────────────────────────────────────
const state = {
    lang: 'en',
    theme: 'dark',
    yields: null,
    _farmId: 0,
    farms: [],
    beanPrice: 8,
    cupsPerYear: 100000,
    cupPrice: 5,
    cupPct: 15,
    nftPrimaryQty: 1000,
    nftPrimaryPrice: 100,
    nftPrimaryComm: 5,
    nftSecondaryTx: 500,
    nftSecondaryPrice: 150,
    nftSecondaryRoyalty: 2.5,
    nftQuickQty: 200,
    nftQuickPrice: 200,
    nftQuickComm: 3,
    results: null
};
window.state = state;

// ─── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
    en: {
        tab_farms: 'Farms', tab_sales: 'Sales', tab_nft: 'NFT', tab_results: 'Results',
        farms_title: '🌱 Farms & Yield Setup', sales_title: '☕ Coffee & Cup Sales', nft_title: '🖼️ NFT Revenue',
        costs_title: '💸 Operational Costs & Breakdown', chart_revenue: 'Revenue Sources', chart_sensitivity: 'Yield Sensitivity ($)', table_breakdown: 'Detailed Revenue Breakdown',
        lbl_country: 'Country', lbl_sort: 'Sort', lbl_farms: 'Number of Farms', lbl_trees: 'Trees per Farm', lbl_yield: 'Yield (kg / tree)', lbl_total_trees: 'Total Trees (Calc)',
        lbl_bean_price: 'Price per KG ($)', lbl_total_kg: 'Total Yield KG (Calc)', lbl_cups_year: 'Cups sold per year', lbl_cup_price: 'Price per Cup ($)', lbl_cup_pct: 'Company Cup %',
        lbl_nft_qty: 'Quantity', lbl_nft_price: 'Avg Price ($)', lbl_nft_comm: 'Comm (%)', lbl_nft_tx: 'Transactions', lbl_nft_royalty: 'Royalty (%)',
        sub_grain: 'Wholesale Grain', sub_cups: 'Direct Cup Sales', sub_primary: 'Primary Sales', sub_secondary: 'Secondary Market (Royalties)', sub_quick: 'Quick/Promo Sales',
        lbl_costs: 'Est. Operational Costs', lbl_costs_note: 'Used to calculate net ROI after gross revenue.',
        summary_title: '📊 Quick Summary', summary_hint: 'Fill in your data and click Calculate.',
        scenarios_title: '🎯 Scenarios', calculate: 'Calculate',
        hint_farms_title: 'Yield Generation', hint_farms_body: ' — Average grain yield per tree depends on the country and coffee sort. Select them below to auto-fetch the expected yield, or override it manually.',
        hint_sales_title: 'Revenue Streams', hint_sales_body: ' — Enter your wholesale grain prices and direct-to-consumer cup sales. The company takes a percentage of cup sales as revenue.',
        hint_nft_title: 'Web3 Integration', hint_nft_body: ' — Model revenue from primary mints, secondary market royalties, and quick-sale items. Set the average prices and commission percentages.',
        tip_yield: 'Average yield of green coffee beans per tree per harvest.',
        tip_bean_price: 'Wholesale selling price per kilogram of processed green or roasted beans.',
        tip_cup_pct: 'Your company\'s revenue share from direct consumer cup sales.',
        row_grain: 'Gross Grain Sales', row_cups: 'Cup Revenue Share', row_nft_prim: 'NFT Primary Commissions', row_nft_sec: 'NFT Secondary Royalties', row_nft_quick: 'NFT Quick-sale Commissions',
        row_gross: 'TOTAL GROSS REVENUE', row_costs: 'Operational Costs', row_net: 'NET REVENUE (ROI)'
    },
    ru: {
        tab_farms: 'Фермы', tab_sales: 'Продажи', tab_nft: 'NFT', tab_results: 'Итоги',
        farms_title: '🌱 Фермы и Урожай', sales_title: '☕ Продажи Зерна и Чашек', nft_title: '🖼️ NFT Доходы',
        costs_title: '💸 Операционные Расходы и Детализация', chart_revenue: 'Источники Дохода', chart_sensitivity: 'Чувствительность к Урожаю ($)', table_breakdown: 'Детальная Разборка Доходов',
        lbl_country: 'Страна', lbl_sort: 'Сорт', lbl_farms: 'Кол-во ферм', lbl_trees: 'Деревьев/ферму', lbl_yield: 'Урожай (кг/дерево)', lbl_total_trees: 'Всего деревьев (Расчет)',
        lbl_bean_price: 'Цена за КГ ($)', lbl_total_kg: 'Общий Урожай КГ (Расчет)', lbl_cups_year: 'Чашек в год', lbl_cup_price: 'Цена Чашки ($)', lbl_cup_pct: 'Доля с чашки %',
        lbl_nft_qty: 'Количество', lbl_nft_price: 'Средняя Цена ($)', lbl_nft_comm: 'Комиссия (%)', lbl_nft_tx: 'Транзакций', lbl_nft_royalty: 'Роялти (%)',
        sub_grain: 'Оптовое Зерно', sub_cups: 'Прямые Продажи Чашек', sub_primary: 'Первичные Продажи', sub_secondary: 'Вторичный Рынок (Роялти)', sub_quick: 'Быстрые/Промо Продажи',
        lbl_costs: 'Ож. Операционные Расходы', lbl_costs_note: 'Используется для расчета чистой прибыли (ROI).',
        summary_title: '📊 Краткая сводка', summary_hint: 'Заполните данные и нажмите Рассчитать.',
        scenarios_title: '🎯 Сценарии', calculate: 'Рассчитать',
        hint_farms_title: 'Генерация Урожая', hint_farms_body: ' — Средний урожай зерен с дерева зависит от страны и сорта. Выберите их ниже для авто-заполнения ожидаемого урожая.',
        hint_sales_title: 'Потоки Доходов', hint_sales_body: ' — Укажите оптовые цены на зерно и продажи чашек потребителям. Компания получает процент от продаж чашек.',
        hint_nft_title: 'Web3 Интеграция', hint_nft_body: ' — Моделируйте доходы от первичных минтов, роялти на вторичном рынке и быстрых продаж. Задайте средние цены и комиссии.',
        tip_yield: 'Средний урожай зеленых кофейных зерен с одного дерева за сезон.',
        tip_bean_price: 'Оптовая цена продажи за килограмм обработанных зерен.',
        tip_cup_pct: 'Доля выручки вашей компании от прямых продаж чашек потребителям.',
        row_grain: 'Валовой Доход (Зерно)', row_cups: 'Доля Выручки (Чашки)', row_nft_prim: 'NFT Комиссии Первичные', row_nft_sec: 'NFT Роялти Вторичные', row_nft_quick: 'NFT Быстрые Продажи',
        row_gross: 'ОБЩИЙ ВАЛОВОЙ ДОХОД', row_costs: 'Операционные Расходы', row_net: 'ЧИСТАЯ ПРИБЫЛЬ (ROI)'
    }
};
const t = (k) => (i18n[state.lang][k] || k);

// ─── TOOLTIP HELPER ───────────────────────────────────────────────────────────
let _globalTip = null;
function _initGlobalTip() {
    if (_globalTip) return;
    _globalTip = document.createElement('div');
    _globalTip.id = 'globalTip';
    _globalTip.style.cssText = [
        'position:fixed', 'z-index:99999', 'pointer-events:none',
        'max-width:280px', 'min-width:180px', 'padding:10px 14px',
        'background:#0d0f1a', 'border:1px solid rgba(124,109,255,.5)',
        'border-radius:8px', 'font-size:.76rem', 'line-height:1.55',
        'color:#e8e8f8', 'box-shadow:0 8px 32px rgba(0,0,0,.7)',
        'display:none', 'white-space:normal', 'word-break:break-word'
    ].join(';');
    document.body.appendChild(_globalTip);

    document.addEventListener('mouseover', e => {
        const wrap = e.target.closest('.tip-wrap[data-tip]');
        if (!wrap) return;
        const key = wrap.dataset.tip;
        _globalTip.textContent = t(key);
        _globalTip.style.display = 'block';
        _positionTip(wrap);
    });
    document.addEventListener('mouseout', e => {
        if (!e.target.closest('.tip-wrap[data-tip]')) return;
        if (!e.relatedTarget || !e.relatedTarget.closest('.tip-wrap[data-tip]')) {
            _globalTip.style.display = 'none';
        }
    });
    document.addEventListener('mousemove', e => {
        if (_globalTip.style.display === 'none') return;
        const wrap = e.target.closest('.tip-wrap[data-tip]');
        if (wrap) _positionTip(wrap);
        else _globalTip.style.display = 'none';
    });
}
function _positionTip(wrap) {
    const rect = wrap.getBoundingClientRect();
    const tipW = 280, tipH = 80;
    let top = rect.top - tipH - 10;
    let left = rect.left + rect.width / 2 - tipW / 2;
    if (top < 8) top = rect.bottom + 10;
    if (left < 8) left = 8;
    if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
    _globalTip.style.top = top + 'px';
    _globalTip.style.left = left + 'px';
}

const fmt = {
    money: (n) => {
        if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
        if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
        if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
        return '$' + n.toFixed(0);
    },
    num: (n) => n.toLocaleString('en-US'),
    pct: (n) => n.toFixed(1) + '%'
};

// ─── INITIALIZATION & FETCH ───────────────────────────────────────────────────
function loadYields() {
    state.yields = {
        "Colombia": {
            "Bourbon": 0.16,
            "Pink Bourbon": 0.18,
            "Caturra": 0.24,
            "Castillo": 0.24,
            "Colombia (var.)": 0.24,
            "Typica": 0.14,
            "Tabi": 0.15,
            "Geisha": 0.07
        },
        "Panama": {
            "Geisha": 0.07,
            "Sidra": 0.13,
            "Catuaí": 0.21,
            "Typica": 0.14
        },
        "Kenya": {
            "SL28": 0.21,
            "SL34": 0.21,
            "K7": 0.18,
            "Ruiru 11": 0.24,
            "Batian": 0.28
        },
        "Ethiopia": {
            "Yirgacheffe": 0.10,
            "Sidama": 0.13,
            "Guji": 0.08,
            "74110 JARC": 0.18,
            "74158 JARC": 0.18,
            "75227 Hybrid Series": 0.32
        }
    };
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function renderAdminPanel() {
    const container = document.getElementById('adminPanelContainer');
    if (!container) return;

    let html = '<table><thead><tr><th>Country</th><th>Sort</th><th>Yield (kg)</th><th>Action</th></tr></thead><tbody>';

    for (const country in state.yields) {
        for (const sort in state.yields[country]) {
            const y = state.yields[country][sort];
            const escC = String(country).replace(/'/g, "\\'");
            const escS = String(sort).replace(/'/g, "\\'");

            html += `<tr>
                <td class="td-name">${country}</td>
                <td>${sort}</td>
                <td class="td-mono"><input type="number" step="0.01" value="${y}" onchange="updateAdminYield('${escC}', '${escS}', this.value)" style="width:80px; text-align:right;"></td>
                <td style="text-align:right;"><button class="btn btn-sm btn-outline" style="color:var(--err);border-color:var(--err)" onclick="deleteAdminYield('${escC}', '${escS}')">✕</button></td>
            </tr>`;
        }
    }

    html += `<tr style="border-top: 1px solid var(--bdr);">
        <td><input type="text" id="adminNewCountry" placeholder="Country" style="width:100%;"></td>
        <td><input type="text" id="adminNewSort" placeholder="Sort" style="width:100%;"></td>
        <td class="td-mono"><input type="number" step="0.01" id="adminNewYield" placeholder="0.20" style="width:80px; text-align:right;"></td>
        <td style="text-align:right;"><button class="btn btn-sm btn-primary" onclick="addAdminYield()">Add</button></td>
    </tr>`;

    html += '</tbody></table>';
    container.innerHTML = html;
}

window.updateAdminYield = function (country, sort, val) {
    const num = parseFloat(val);
    if (!isNaN(num) && state.yields[country]) {
        state.yields[country][sort] = num;
        renderFarms();
        autoCalc();
    }
};

window.deleteAdminYield = function (country, sort) {
    if (state.yields[country] && state.yields[country][sort]) {
        delete state.yields[country][sort];
        if (Object.keys(state.yields[country]).length === 0) {
            delete state.yields[country];
        }
        renderAdminPanel();
        renderFarms();
        autoCalc();
    }
};

window.addAdminYield = function () {
    const c = document.getElementById('adminNewCountry').value.trim();
    const s = document.getElementById('adminNewSort').value.trim();
    const y = parseFloat(document.getElementById('adminNewYield').value);

    if (c && s && !isNaN(y) && y > 0) {
        if (!state.yields[c]) state.yields[c] = {};
        state.yields[c][s] = y;
        renderAdminPanel();
        renderFarms();
        autoCalc();
    }
};

// ─── FARM DYNAMICS ────────────────────────────────────────────────────────────
function addFarm(country = 'Colombia', sort = 'Bourbon', trees = 10000) {
    const id = ++state._farmId;
    let yieldPerTree = 1.8;
    if (state.yields && state.yields[country] && state.yields[country][sort]) {
        yieldPerTree = state.yields[country][sort];
    }
    state.farms.push({ id, country, sort, trees, yieldPerTree });
    renderFarms();
    autoCalc();
}

function removeFarm(id) {
    state.farms = state.farms.filter(f => f.id !== id);
    renderFarms();
    autoCalc();
}

function updateFarm(id, field, val) {
    const farm = state.farms.find(f => f.id === id);
    if (!farm) return;
    farm[field] = val;

    if (field === 'country' || field === 'sort') {
        if (state.yields && state.yields[farm.country] && state.yields[farm.country][farm.sort]) {
            farm.yieldPerTree = state.yields[farm.country][farm.sort];
        }
        renderFarms();
    }
    autoCalc();
}

function renderFarms() {
    const container = document.getElementById('farmsContainer');
    if (!container) return;

    let html = '';
    state.farms.forEach((f, idx) => {
        const countryOpts = Object.keys(state.yields || {}).map(c =>
            `<option value="${c}" ${c === f.country ? 'selected' : ''}>${c}</option>`
        ).join('');

        const sortOpts = (state.yields && state.yields[f.country])
            ? Object.keys(state.yields[f.country]).map(s => `<option value="${s}" ${s === f.sort ? 'selected' : ''}>${s}</option>`).join('')
            : `<option value="${f.sort}">${f.sort}</option>`;

        html += `<div class="item-card" id="farm-${f.id}">
            <div class="item-hdr">
                 <span class="item-name">Farm #${idx + 1}</span>
                 <button class="delbtn" onclick="removeFarm(${f.id})">✕</button>
            </div>
            <div class="frow">
                <div class="fg">
                    <label><span data-i18n="lbl_country">Country</span></label>
                    <select class="f-select" onchange="updateFarm(${f.id}, 'country', this.value)">${countryOpts}</select>
                </div>
                <div class="fg">
                    <label><span data-i18n="lbl_sort">Sort</span></label>
                    <select class="f-select" onchange="updateFarm(${f.id}, 'sort', this.value)">${sortOpts}</select>
                </div>
            </div>
            <div class="frow">
                <div class="fg">
                    <label><span data-i18n="lbl_trees">Trees per Farm</span></label>
                    <input type="number" value="${f.trees}" min="1" step="100" oninput="updateFarm(${f.id}, 'trees', +this.value)">
                </div>
                <div class="fg">
                    <label>
                        <span data-i18n="lbl_yield">Yield (kg green beans / tree)</span>
                    </label>
                    <input type="number" value="${f.yieldPerTree}" min="0.01" step="0.01" oninput="updateFarm(${f.id}, 'yieldPerTree', +this.value)">
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
    applyI18n();
}

// ─── BIND INPUTS ──────────────────────────────────────────────────────────────
const binds = ['beanPrice', 'cupsPerYear', 'cupPrice', 'cupPct', 'nftPrimaryQty', 'nftPrimaryPrice', 'nftPrimaryComm', 'nftSecondaryTx', 'nftSecondaryPrice', 'nftSecondaryRoyalty', 'nftQuickQty', 'nftQuickPrice', 'nftQuickComm'];

binds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => {
            if (el.type === 'number' || el.type === 'range') state[id] = parseFloat(el.value) || 0;
            autoCalc();
        });
    }
});

function syncInputs() {
    binds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = state[id];
    });
}

// ─── CALCULATION PROCESS ──────────────────────────────────────────────────────
function calculate() {
    let totalTrees = 0;
    let yieldKg = 0;

    state.farms.forEach(f => {
        totalTrees += f.trees;
        yieldKg += (f.trees * f.yieldPerTree);
    });

    // Update global calculation readouts safely if they exist
    const treesDisplay = document.getElementById('totalTreesCalc');
    if (treesDisplay) treesDisplay.value = fmt.num(totalTrees);

    const yieldDisplay = document.getElementById('totalYieldCalc');
    if (yieldDisplay) yieldDisplay.value = fmt.num(Math.round(yieldKg)) + ' kg';

    const grainRevenue = yieldKg * state.beanPrice;
    const cupRevenue = state.cupsPerYear * state.cupPrice * (state.cupPct / 100);

    const nftPrim = state.nftPrimaryQty * state.nftPrimaryPrice * (state.nftPrimaryComm / 100);
    const nftSec = state.nftSecondaryTx * state.nftSecondaryPrice * (state.nftSecondaryRoyalty / 100);
    const nftQuick = state.nftQuickQty * state.nftQuickPrice * (state.nftQuickComm / 100);

    const totalNft = (nftPrim + nftSec + nftQuick) || 0;
    const gross = (parseInt(grainRevenue) + parseInt(cupRevenue) + parseInt(totalNft)) || 0;
    const net = gross;

    let marginValue = 0;
    if (gross > 0) marginValue = 100;

    const cupAprValue = grainRevenue > 0 ? (cupRevenue / grainRevenue * 100) : 0;
    const apr = marginValue;

    state.results = {
        grainRevenue, cupRevenue, nftPrim, nftSec, nftQuick, totalNft, gross, net, yieldKg, totalTrees, apr, cupAprValue, marginValue
    };

    renderSummary();
    renderTable();

    const chartsTab = document.getElementById('tab-results');
    if (chartsTab && chartsTab.classList.contains('active')) {
        if (window.renderCoffeeCharts) window.renderCoffeeCharts();
    }
}

function autoCalc() {
    calculate();
}

// ─── RENDERERS ────────────────────────────────────────────────────────────────
function renderSummary() {
    const el = document.getElementById('quickSummary');
    if (!state.results) return;
    const r = state.results;

    let html = `<div class="sum-grid">
    <div class="sum-item"><div class="sum-lbl">Net (ROI)</div><div class="sum-val">${fmt.money(r.net)}</div></div>
    <div class="sum-item"><div class="sum-lbl">Net Margin</div><div class="sum-val c-a1">${r.marginValue.toFixed(1)}%</div></div>
    <div class="sum-item"><div class="sum-lbl">Cup Yield (APR)</div><div class="sum-val c-purple">+${r.cupAprValue.toFixed(1)}%</div></div>
    <div class="sum-item"><div class="sum-lbl">Cup Yield ($)</div><div class="sum-val c-purple">${fmt.money(r.cupRevenue)}</div></div>
    <div class="sum-item"><div class="sum-lbl">Gross Revenue</div><div class="sum-val c-green">${fmt.money(r.gross)}</div></div>
    <div class="sum-item"><div class="sum-lbl">NFT Revenue</div><div class="sum-val c-purple">${fmt.money(r.totalNft)}</div></div>
    <div class="sum-item"><div class="sum-lbl">Total Coffee</div><div class="sum-val c-blue">${fmt.num(r.yieldKg)} kg</div></div>
    <div class="sum-item"><div class="sum-lbl">Total Coffee ($)</div><div class="sum-val c-blue">${fmt.money(r.grainRevenue)}</div></div>
  </div>`;
    el.innerHTML = html;
}

function renderTable() {
    const el = document.getElementById('revenueTableContainer');
    if (!state.results) return;
    const r = state.results;

    const html = `<table>
    <thead><tr><th>Source</th><th>Amount ($)</th><th>% of Gross</th></tr></thead>
    <tbody>
      <tr><td>${t('row_grain')}</td><td class="td-mono">${fmt.money(r.grainRevenue)}</td><td>${fmt.pct(r.grainRevenue / r.gross * 100)}</td></tr>
      <tr><td>${t('row_cups')}</td><td class="td-mono">${fmt.money(r.cupRevenue)}</td><td>${fmt.pct(r.cupRevenue / r.gross * 100)}</td></tr>
      <tr><td>${t('row_nft_prim')}</td><td class="td-mono">${fmt.money(r.nftPrim)}</td><td>${fmt.pct(r.nftPrim / r.gross * 100)}</td></tr>
      <tr><td>${t('row_nft_sec')}</td><td class="td-mono">${fmt.money(r.nftSec)}</td><td>${fmt.pct(r.nftSec / r.gross * 100)}</td></tr>
      <tr><td>${t('row_nft_quick')}</td><td class="td-mono">${fmt.money(r.nftQuick)}</td><td>${fmt.pct(r.nftQuick / r.gross * 100)}</td></tr>
      <tr style="font-weight:bold; border-top:1px solid var(--bdr);"><td class="c-green">${t('row_gross')}</td><td class="td-mono c-green">${fmt.money(r.gross)}</td><td>100%</td></tr>
      <tr style="font-weight:bold; font-size:1.1em; border-top:1px solid var(--bdr);"><td>${t('row_net')}</td><td class="td-mono c-a1">${fmt.money(r.net)}</td><td>—</td></tr>
      <tr style="font-weight:bold; color: var(--accent1);"><td>APR / Net Margin</td><td class="td-mono">${r.apr.toFixed(1)}%</td><td>—</td></tr>
    </tbody>
  </table>`;
    el.innerHTML = html;
}

const scenarios = {
    colombia: () => {
        state.farms = []; state._farmId = 0;
        addFarm('Colombia', 'Castillo', 100000);
        state.beanPrice = 15; state.cupsPerYear = 100000; state.cupPrice = 4.5; state.cupPct = 10;
        state.nftPrimaryQty = 100000; state.nftPrimaryPrice = 15;
        state.nftSecondaryTx = 0; state.nftSecondaryPrice = 0; state.nftSecondaryRoyalty = 0;
        state.nftQuickQty = 0; state.nftQuickPrice = 0; state.nftQuickComm = 0;
    }
};



// ─── TABS & DRAWER & I18N ─────────────────────────────────────────────────────
function switchTab(name) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    document.querySelector(`[data-tab="${name}"]`).classList.add('active');

    const wrapper = document.getElementById('inputViewsWrapper');
    if (wrapper) wrapper.style.display = (name === 'results') ? 'none' : '';

    if (name === 'results' && window.renderCoffeeCharts) window.renderCoffeeCharts();
}

function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = i18n[state.lang][key];
        if (val) el.textContent = val;
    });
}

function openMenu() {
    document.getElementById('appDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    document.getElementById('appDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

let adminPanelOpen = false;
window.toggleAdminPanel = function () {
    const body = document.getElementById('adminPanelBody');
    const icon = document.getElementById('adminToggleBtn');
    adminPanelOpen = !adminPanelOpen;
    body.style.display = adminPanelOpen ? '' : 'none';
    icon.style.transform = adminPanelOpen ? '' : 'rotate(-90deg)';
};

// ─── APP BOOTSTRAP ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        try { if (tg.requestFullscreen) tg.requestFullscreen(); } catch (e) { }

        // Bind safe area insets dynamically (Telegram 7.7+)
        function updateSafeArea() {
            let topInset = 0;
            let bottomInset = 0;

            const insets = tg.contentSafeAreaInsets || tg.safeAreaInset;
            if (insets) {
                topInset = insets.top;
                bottomInset = insets.bottom;
            }

            // Force minimum top inset for TMA to prevent header overlap
            topInset = Math.max(100, topInset);

            document.documentElement.style.setProperty('--tg-safe-area-inset-top', topInset + 'px');
            document.documentElement.style.setProperty('--tg-safe-area-inset-bottom', bottomInset + 'px');
        }
        updateSafeArea();
        tg.onEvent('contentSafeAreaChanged', updateSafeArea);
        tg.onEvent('safeAreaChanged', updateSafeArea);
        tg.onEvent('viewportChanged', () => { if (tg.isExpanded) updateSafeArea(); });

        if (tg.colorScheme) {
            state.theme = tg.colorScheme;
        }
    }

    // Override with localStorage if exists
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme) {
        state.theme = savedTheme;
    }

    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';

    // Collapsible hint blocks (Admin Instructions)
    document.querySelectorAll('.block-hint').forEach((hint, idx) => {
        hint.style.position = 'relative';
        hint.style.cursor = 'pointer';

        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '⌃';
        toggleBtn.className = 'hint-close-btn';
        toggleBtn.style.transition = 'transform 0.3s ease';
        hint.appendChild(toggleBtn);

        const body = hint.querySelector('.hint-body');
        let isCollapsed = sessionStorage.getItem(`collapsed_hint_${idx}`) === 'true';

        if (isCollapsed && body) {
            body.style.display = 'none';
            toggleBtn.style.transform = 'rotate(180deg)';
        }

        hint.onclick = () => {
            if (!body) return;
            isCollapsed = !isCollapsed;
            if (isCollapsed) {
                body.style.display = 'none';
                toggleBtn.style.transform = 'rotate(180deg)';
                sessionStorage.setItem(`collapsed_hint_${idx}`, 'true');
            } else {
                body.style.display = 'inline';
                toggleBtn.style.transform = 'rotate(0deg)';
                sessionStorage.removeItem(`collapsed_hint_${idx}`);
            }
        };
    });

    _initGlobalTip();
    loadYields();
    renderAdminPanel();

    document.getElementById('addFarmBtn').onclick = () => addFarm();

    // Default init empty state
    if (state.farms.length === 0) addFarm('Colombia', 'Bourbon', 10000);

    syncInputs();
    calculate();
    applyI18n();

    document.getElementById('calcBtn').onclick = calculate;
    document.getElementById('tabNav').querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => switchTab(btn.dataset.tab);
    });

    document.querySelectorAll('.scenario-card').forEach(btn => {
        btn.onclick = () => {
            const scen = btn.closest('.scenario-card').dataset.scenario;
            if (scenarios[scen]) {
                scenarios[scen]();
                syncInputs();
                calculate();
            }
        };
    });

    document.getElementById('langBtn').onclick = () => {
        state.lang = state.lang === 'en' ? 'ru' : 'en';
        document.getElementById('langBtn').textContent = state.lang.toUpperCase();
        applyI18n(); renderTable();
    };
    document.getElementById('themeBtn').onclick = () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('app_theme', state.theme);
        const chartsTab = document.getElementById('tab-results');
        if (chartsTab && chartsTab.classList.contains('active') && window.renderCoffeeCharts) window.renderCoffeeCharts();
    };
});
