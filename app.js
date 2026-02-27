// ─── STATE ────────────────────────────────────────────────────────────────────
const state = {
  lang: 'en',
  theme: 'dark',
  founderShares: 10_000_000,
  optionPoolPct: 10,
  includeOptionPool: true,
  safes: [],
  rounds: [],
  results: null,
  _id: 0
};
window.state = state; // expose for charts.js

// ─── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  en: {
    tab_input: 'Setup', tab_captable: 'Cap Table', tab_charts: 'Charts', tab_scenarios: 'Scenarios',
    founders_title: '🏢 Founders & Initial Setup', safes_title: '🔐 SAFE Notes', rounds_title: '💰 Priced Rounds',
    lbl_founder_shares: 'Founder Shares', lbl_option_pool: 'Initial Option Pool %',
    lbl_include_pool: 'Include Option Pool',
    add_safe: 'Add SAFE', add_round: 'Add Round', calculate: 'Calculate',
    summary_title: '📊 Quick Summary', summary_hint: 'Fill in your data and click Calculate.',
    captable_title: '📋 Capitalization Table', captable_empty: 'Run a calculation first.',
    chart_ownership: 'Ownership Distribution', chart_dilution: 'Dilution Over Rounds',
    chart_sensitivity: 'Sensitivity: Founder % vs Cap',
    no_safes: 'No SAFEs yet. Add one above.', no_rounds: 'No priced rounds yet.',
    load_btn: 'Load', s1_title: 'Single SAFE → Series A',
    s1_desc: '$500K SAFE, $5M cap, 20% discount → $3M Series A at $10M pre-money',
    s2_title: 'Multiple SAFEs (Pre + Post)',
    s2_desc: '$250K pre-money $3M cap + $500K post-money $6M cap → $5M Series A at $15M pre',
    s3_title: 'Down Round',
    s3_desc: '$1M SAFE at $8M cap → Series A at $5M pre (cap > pre-money, discount wins)',
    whatif_title: '🔮 What-If: Founder % at Different Caps',
    whatif_hint: 'Load a scenario or calculate to see what-if analysis.',
    lbl_name: 'Name', lbl_amount: 'Amount ($)', lbl_cap: 'Valuation Cap ($)', lbl_disc: 'Discount (%)',
    lbl_type: 'Type', lbl_prorata: 'Pro-rata',
    lbl_premoney: 'Pre-money Val ($)', lbl_newmoney: 'New Money ($)', lbl_pool_topup: 'Option Pool Top-up (%)',
    th_stakeholder: 'Stakeholder', th_type: 'Type', th_shares: 'Shares', th_pct: 'Ownership %',
    th_pps: 'PPS', th_value: 'Value ($)', th_bar: '',
    lbl_total_shares: 'Total Shares', lbl_post_val: 'Post-money Val', lbl_founder_pct: 'Founder %',
    lbl_dilution: 'Dilution', lbl_safe_count: 'SAFEs', lbl_rounds_count: 'Rounds',
    founders_row: 'Founders', option_pool_row: 'Option Pool',

    // Formulas section
    formulas_title: '📐 How It\'s Calculated — Formulas & Process',
    pf_founders: 'Set Founders', pf_safe: 'Add SAFEs', pf_round: 'Priced Round', pf_result: 'Cap Table',
    fsec_safe: 'SAFE Conversion', fsec_round: 'Priced Round', fsec_dilution: 'Dilution',
    fn_safe_price: 'SAFE Price (lower wins)', fn_safe_price_note: 'Lower price = more shares for investor',
    fn_safe_shares: 'SAFE Shares', fn_post_safe: 'Post-$ SAFE Ownership', fn_post_safe_note: 'Fixed % locked at investment',
    fn_pps: 'Price Per Share (PPS)', fn_new_shares: 'New Investor Shares', fn_postmoney: 'Post-money Valuation',
    fn_founder_pct: 'Founder Ownership %', fn_pool: 'Option Pool (pre-money)', fn_pool_note: 'Dilutes founders, not investors',
    fn_down: 'Down Round', fn_down_note: 'Discount wins if Pre-$ < Cap',

    // Tooltips
    tip_founder_shares: 'Total shares issued to founders at company formation. Industry standard is 10,000,000. This forms the entire basis of your cap table.',
    tip_option_pool: 'Shares reserved for employee stock options (ESOP). Created before new investment — so founders bear all the dilution, not new investors. Typical: 10–20%.',
    tip_include_pool: 'Turn off to model a round without an option pool. Useful for very early pre-seed rounds or when no formal ESOP exists yet.',
    tip_safe_name: 'Label for this SAFE note. Useful when you have multiple investors.',
    tip_safe_amount: 'Cash investment amount. How much the investor is putting in under this SAFE. Typically $50K–$2M for seed.',
    tip_cap: 'Maximum valuation at which SAFE converts. Lower cap → more dilution for founders. Set 0 for no cap.',
    tip_disc: 'Discount off priced round PPS. E.g., 20% discount: investor pays 80% of Series A price. The better deal (cap or discount) wins.',
    tip_pre_type: 'Pre-money SAFE (YC standard before 2018). Ownership % is determined at conversion. Multiple pre-money SAFEs dilute each other.',
    tip_post_type: 'Post-money SAFE (YC standard from 2018+). Ownership is fixed: Amount ÷ Cap. Investors know exact % from day 1. Multiple post-money SAFEs dilute founders independently.',
    tip_round_name: 'Name of this priced round, e.g. "Series A", "Seed Round".',
    tip_premoney: 'Agreed company value before new investment. Determines the price per share for this round.',
    tip_newmoney: 'Total new investment raised in this priced round from all new investors.',
    tip_pool_topup: 'Additional option pool created PRE-MONEY before this round. This dilutes founders, not new investors (a common VC requirement).',
    // Block tooltips
    tip_block_founders: 'Set the number of founder shares and option pool. These are the baseline of your cap table before any SAFEs or investment rounds.',
    tip_block_safes: 'SAFE (Simple Agreement for Future Equity) notes are the most common early-stage investment instrument. They convert to equity at a priced round.',
    tip_block_rounds: 'A priced round (Series A, B…) is when shares are sold at a fixed price per share. This is when SAFEs convert to equity.',
    tip_block_summary: 'Live summary of the final cap table after all SAFEs convert and all rounds close. Updated each time you click Calculate.',
    tip_block_formulas: 'Step-by-step breakdown of how all calculations work: SAFE conversion price, new investor shares, option pool dilution, and founder ownership.',
    // Block hints
    hint_founders_title: 'Start here',
    hint_founders_body: ' — enter how many shares your company has issued to founders and whether you have an employee stock option pool (ESOP). The standard founding share count is 10,000,000. These numbers form the baseline of your cap table — everything else is calculated relative to them.',
    hint_safes_title: 'What is a SAFE?',
    hint_safes_body: ' — A SAFE (Simple Agreement for Future Equity) is money an investor gives you today in exchange for shares in a future priced round. No interest, no fixed repayment. Add one row per investor. Key fields: ① Amount invested ② Valuation Cap (max price they convert at) ③ Discount % (optional price reduction bonus).',
    hint_rounds_title: 'What is a Priced Round?',
    hint_rounds_body: ' — A priced round (Series A, B…) sets an official share price. At this moment all SAFEs convert to equity. Enter: ① Pre-money valuation (agreed company value before new money) ② New Money (how much is being invested) ③ Option Pool top-up if your term sheet requires one.',
  },
  ru: {
    tab_input: 'Настройки', tab_captable: 'Кап. Таблица', tab_charts: 'Графики', tab_scenarios: 'Сценарии',
    founders_title: '🏢 Основатели & Начало', safes_title: '🔐 SAFE Ноты', rounds_title: '💰 Раунды',
    lbl_founder_shares: 'Акции основателей', lbl_option_pool: 'Начальный пул опционов %',
    lbl_include_pool: 'Включить пул опционов',
    add_safe: 'Добавить SAFE', add_round: 'Добавить раунд', calculate: 'Рассчитать',
    summary_title: '📊 Краткая сводка', summary_hint: 'Введите данные и нажмите «Рассчитать».',
    captable_title: '📋 Таблица капитализации', captable_empty: 'Сначала выполните расчёт.',
    chart_ownership: 'Распределение долей', chart_dilution: 'Разводнение по раундам',
    chart_sensitivity: 'Чувствительность: % основателей vs кэп',
    no_safes: 'Нет SAFE. Добавьте выше.', no_rounds: 'Нет раундов. Добавьте выше.',
    load_btn: 'Загрузить', s1_title: 'Один SAFE → Series A',
    s1_desc: '$500K SAFE, кэп $5M, скидка 20% → $3M Series A при $10M pre-money',
    s2_title: 'Несколько SAFE (Pre + Post)',
    s2_desc: '$250K pre-money кэп $3M + $500K post-money кэп $6M → $5M Series A при $15M pre',
    s3_title: 'Падающий раунд',
    s3_desc: '$1M SAFE кэп $8M → Series A при $5M pre (кэп > pre-money, работает скидка)',
    whatif_title: '🔮 Что-если: % основателей при разных кэпах',
    whatif_hint: 'Загрузите сценарий или выполните расчёт.',
    lbl_name: 'Название', lbl_amount: 'Сумма ($)', lbl_cap: 'Кэп оценки ($)', lbl_disc: 'Скидка (%)',
    lbl_type: 'Тип', lbl_prorata: 'Про-рата',
    lbl_premoney: 'Pre-money оценка ($)', lbl_newmoney: 'Новые деньги ($)', lbl_pool_topup: 'Пополнение пула (%)',
    th_stakeholder: 'Участник', th_type: 'Тип', th_shares: 'Акции', th_pct: 'Доля %',
    th_pps: 'Цена/акция', th_value: 'Стоимость ($)', th_bar: '',
    lbl_total_shares: 'Всего акций', lbl_post_val: 'Post-money', lbl_founder_pct: 'Доля осн.', lbl_dilution: 'Разм.',
    lbl_safe_count: 'SAFE', lbl_rounds_count: 'Раунды',
    founders_row: 'Основатели', option_pool_row: 'Пул опционов',

    // Formulas
    formulas_title: '📐 Как считается — Формулы & Процесс',
    pf_founders: 'Основатели', pf_safe: 'SAFE ноты', pf_round: 'Раунд', pf_result: 'Кап. таблица',
    fsec_safe: 'Конвертация SAFE', fsec_round: 'Прайсед раунд', fsec_dilution: 'Разводнение',
    fn_safe_price: 'Цена SAFE (меньшая выигрывает)', fn_safe_price_note: 'Меньше цена = больше акций у инвестора',
    fn_safe_shares: 'Акции SAFE', fn_post_safe: 'Post-$ SAFE доля', fn_post_safe_note: 'Фиксированный % с момента инвестиции',
    fn_pps: 'Цена за акцию (PPS)', fn_new_shares: 'Акции нового инвестора', fn_postmoney: 'Post-money оценка',
    fn_founder_pct: 'Доля основателей %', fn_pool: 'Пул опционов (до денег)', fn_pool_note: 'Разводняет основателей, не инвесторов',
    fn_down: 'Down Round', fn_down_note: 'Скидка выигрывает если Pre-$ < кэп',

    // Tooltips
    tip_founder_shares: 'Общее число акций выпущенных для основателей при создании компании. Стандарт: 10 000 000 акций. Это основа вашей кап. таблицы.',
    tip_option_pool: 'Акции зарезервированные для опционов сотрудников (ESOP). Создаётся до новых денег — основатели несут всё разводнение, не инвесторы. Обычно 10–20%.',
    tip_include_pool: 'Отключите чтобы смоделировать раунд без пула опционов. Полезно для самых ранних раундов.',
    tip_safe_name: 'Название SAFE ноты. Удобно когда несколько инвесторов.',
    tip_safe_amount: 'Сумма инвестиции. Сколько денег инвестор вкладывает. Обычно $50K–$2M для сида.',
    tip_cap: 'Максимальная оценка конвертации. Чем ниже кэп — тем больше акций у инвестора = больше разводнение. 0 = без кэпа.',
    tip_disc: 'Скидка к цене прайсед раунда. Напр. 20%: инвестор платит 80% от цены Series A. Лучшее условие (кэп или скидка) побеждает.',
    tip_pre_type: 'Pre-money SAFE (стандарт YC до 2018). Доля определяется при конвертации. Несколько pre-money SAFE разводняют друг друга.',
    tip_post_type: 'Post-money SAFE (стандарт YC с 2018). Доля фиксирована: Сумма ÷ Кэп. Инвесторы знают свой % с первого дня. Несколько post-money SAFE независимо разводняют основателей.',
    tip_round_name: 'Название раунда, напр. "Series A", "Сид Раунд".',
    tip_premoney: 'Согласованная стоимость компании до новых инвестиций. Определяет цену акции для этого раунда.',
    tip_newmoney: 'Общий объём новых инвестиций в этом раунде от всех новых инвесторов.',
    tip_pool_topup: 'Дополнительный пул опционов созданный ДО денег перед этим раундом. Разводняет только основателей (типичное требование VC).',
    // Block tooltips
    tip_block_founders: 'Задайте количество акций у основателей и размер опционного пула. Это основа кап. таблицы до любых SAFE или инвестиционных раундов.',
    tip_block_safes: 'SAFE (Simple Agreement for Future Equity) — самый распространённый инструмент ранних инвестиций. Конвертируется в акции при прайсед раунде.',
    tip_block_rounds: 'Прайсед раунд (Series A, B…) — когда акции продаются по фиксированной цене. Именно здесь SAFE конвертируются в акции.',
    tip_block_summary: 'Итоговая сводка кап. таблицы после конвертации всех SAFE и закрытия раундов. Обновляется при нажатии «Рассчитать».',
    tip_block_formulas: 'Пошаговое объяснение всех расчётов: цена конвертации SAFE, акции нового инвестора, разводнение пулом опционов и доля основателей.',
    // Block hints
    hint_founders_title: 'Начни здесь',
    hint_founders_body: ' — введи сколько акций выпущено основателям и есть ли опционный пул для сотрудников. Стандартное количество акций при основании — 10 000 000. Эти числа — база кап. таблицы, всё остальное считается относительно них.',
    hint_safes_title: 'Что такое SAFE?',
    hint_safes_body: ' — SAFE (Simple Agreement for Future Equity) — это деньги от инвестора сейчас в обмен на акции в будущем раунде. Без процентов и погашений. Добавь одну строку на инвестора. Ключевые поля: ① Сумма ② Valuation Cap (максимальная оценка конверсии) ③ Discount % (скидка к цене раунда).',
    hint_rounds_title: 'Что такой Priced Round?',
    hint_rounds_body: ' — Прайсед раунд (Series A, B…) устанавливает официальную цену акции. Именно здесь все SAFE конвертируются. Укажи: ① Pre-money оценка (стоимость до денег) ② New Money (объём инвестиций) ③ Option Pool топ-ап, если требуют term sheetы.',
  }
};
const t = (k) => (i18n[state.lang][k] || k);

// ─── TOOLTIP HELPER ───────────────────────────────────────────────────────────
// Single global floating tooltip — never clipped by overflow:hidden
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
  // Keep inside viewport
  if (top < 8) top = rect.bottom + 10;
  if (left < 8) left = 8;
  if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
  _globalTip.style.top = top + 'px';
  _globalTip.style.left = left + 'px';
}

const tip = (key) =>
  `<span class="tip-wrap" data-tip="${key}"><span class="tip-icon">?</span></span>`;


// ─── CALCULATIONS ─────────────────────────────────────────────────────────────
function calcCapTable() {
  const founderShares = state.founderShares;
  const usePool = state.includeOptionPool;
  const initOptionShares = usePool ? Math.round(founderShares * state.optionPoolPct / 100) : 0;
  let optionShares = initOptionShares;
  let totalShares = founderShares + optionShares;

  const stages = [{
    label: 'Initial Cap Table',
    founderShares, optionShares, totalShares,
    safeRows: [], investorShares: 0, newMoney: 0,
    preMoney: null, postMoney: null, pps: null,
  }];

  let pendingSafes = [...state.safes];

  for (const round of state.rounds) {
    // Option pool top-up (pre-money)
    const topupPct = (usePool && round.optionPoolTopup) ? round.optionPoolTopup : 0;
    if (topupPct > 0) {
      const target = Math.round(totalShares * topupPct / (100 - topupPct));
      const topup = Math.max(0, target - optionShares + initOptionShares);
      optionShares += topup;
      totalShares += topup;
    }

    const preMoney = round.preMoneyVal;
    const pps = preMoney / totalShares;
    const safeRows = [];
    let totalSafeShares = 0;

    for (const safe of pendingSafes) {
      let safePrice;
      if (safe.type === 'post') {
        const ownershipFraction = safe.amount / safe.cap;
        const approxShares = Math.round(totalShares * ownershipFraction / (1 - ownershipFraction));
        safePrice = safe.amount / approxShares;
        const shares = approxShares;
        safeRows.push({ ...safe, safePrice, shares, usedMethod: 'post-money fixed' });
        totalSafeShares += shares;
      } else {
        const capPrice = safe.cap > 0 ? safe.cap / totalShares : Infinity;
        const discPrice = safe.discount > 0 ? pps * (1 - safe.discount / 100) : Infinity;
        safePrice = Math.min(
          capPrice < Infinity ? capPrice : Infinity,
          discPrice < Infinity ? discPrice : Infinity
        );
        if (!isFinite(safePrice)) safePrice = pps;
        const usedMethod = (capPrice <= discPrice) ? 'cap' : 'discount';
        const shares = Math.round(safe.amount / safePrice);
        safeRows.push({ ...safe, safePrice, shares, usedMethod });
        totalSafeShares += shares;
      }
    }

    totalShares += totalSafeShares;
    const investorShares = Math.round(round.newMoney / pps);
    totalShares += investorShares;
    const postMoney = preMoney + round.newMoney;

    stages.push({
      label: round.name || `Priced Round`,
      founderShares, optionShares, totalShares,
      safeRows, investorShares, newMoney: round.newMoney,
      preMoney, postMoney, pps,
    });

    pendingSafes = [];
  }

  return stages;
}

// ─── RENDER HELPERS ───────────────────────────────────────────────────────────
const fmt = {
  shares: (n) => n.toLocaleString('en-US'),
  pct: (n) => n.toFixed(2) + '%',
  money: (n) => {
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
    return '$' + n.toFixed(0);
  },
  pps: (n) => '$' + n.toFixed(4)
};

const COLORS = ['#7c6dff', '#00d2ff', '#ff6b8a', '#ffd700', '#00e676', '#ff9800', '#c084fc', '#34d399', '#f472b6', '#60a5fa', '#a78bfa', '#fb923c'];
function colorFor(i) { return COLORS[i % COLORS.length]; }

function miniBar(pct, color) {
  return `<div class="mini-bar-bg"><div class="mini-bar" style="width:${Math.min(pct, 100)}%;background:${color}"></div></div>`;
}

// ─── RENDER: QUICK SUMMARY ────────────────────────────────────────────────────
function renderSummary() {
  const el = document.getElementById('quickSummary');
  if (!state.results || !state.results.length) {
    el.innerHTML = `<div class="empty-state">${t('summary_hint')}</div>`; return;
  }
  const last = state.results[state.results.length - 1];
  const founderPct = (last.founderShares / last.totalShares) * 100;
  const initFounderPct = (state.founderShares / state.results[0].totalShares) * 100;
  const diluted = initFounderPct - founderPct;

  let html = `<div class="sum-grid">
    <div class="sum-item"><div class="sum-lbl">${t('lbl_total_shares')}</div><div class="sum-val">${fmt.shares(last.totalShares)}</div></div>
    <div class="sum-item"><div class="sum-lbl">${t('lbl_founder_pct')}</div><div class="sum-val">${founderPct.toFixed(1)}%</div></div>
    <div class="sum-item"><div class="sum-lbl">${t('lbl_dilution')}</div><div class="sum-val red">${diluted.toFixed(1)}%</div></div>
    <div class="sum-item"><div class="sum-lbl">${t('lbl_post_val')}</div><div class="sum-val">${last.postMoney ? fmt.money(last.postMoney) : '—'}</div></div>
  </div>`;

  if (last.pps) {
    const rows = buildOwnershipRows(last);
    html += `<div class="ownership-list">`;
    rows.forEach((r, i) => {
      html += `<div class="own-row">
        <div class="own-dot" style="background:${colorFor(i)}"></div>
        <div class="own-name">${r.name}</div>
        ${miniBar(r.pct, colorFor(i))}
        <div class="own-pct">${r.pct.toFixed(1)}%</div>
      </div>`;
    });
    html += `</div>`;
  }
  el.innerHTML = html;
}

function buildOwnershipRows(stage) {
  const rows = [];
  rows.push({ name: t('founders_row'), shares: stage.founderShares, pct: (stage.founderShares / stage.totalShares) * 100 });
  if (stage.optionShares > 0)
    rows.push({ name: t('option_pool_row'), shares: stage.optionShares, pct: (stage.optionShares / stage.totalShares) * 100 });
  (stage.safeRows || []).forEach(s => rows.push({ name: s.name || 'SAFE', shares: s.shares, pct: (s.shares / stage.totalShares) * 100 }));
  if (stage.investorShares > 0) rows.push({ name: stage.label + ' Investors', shares: stage.investorShares, pct: (stage.investorShares / stage.totalShares) * 100 });
  return rows;
}

// ─── RENDER: CAP TABLE ────────────────────────────────────────────────────────
function renderCapTable() {
  if (!state.results) {
    document.getElementById('capTableContainer').innerHTML = `<div class="empty-state" style="padding:40px">${t('captable_empty')}</div>`;
    return;
  }

  let html = `<table><thead><tr>
    <th>${t('th_stakeholder')}</th><th>${t('th_type')}</th>
    <th>${t('th_shares')}</th><th>${t('th_pct')}</th>
    <th>${t('th_pps')}</th><th>${t('th_value')}</th><th>${t('th_bar')}</th>
  </tr></thead><tbody>`;

  let colorIdx = 0;
  state.results.forEach((stage, si) => {
    html += `<tr class="tr-stage"><td colspan="7">📌 ${stage.label}${stage.postMoney ? ' — Post-money: ' + fmt.money(stage.postMoney) : ''}</td></tr>`;
    colorIdx = 0;
    const ci = (i) => colorFor(i);

    const fPct = (stage.founderShares / stage.totalShares) * 100;
    const fVal = stage.pps ? stage.founderShares * stage.pps : null;
    html += buildRow(t('founders_row'), 'Equity', stage.founderShares, fPct, stage.pps, fVal, 'c-green', ci(colorIdx++));

    if (stage.optionShares > 0) {
      const oPct = (stage.optionShares / stage.totalShares) * 100;
      html += buildRow(t('option_pool_row'), 'Options', stage.optionShares, oPct, null, null, 'c-blue', ci(colorIdx++));
    }

    (stage.safeRows || []).forEach(s => {
      const sPct = (s.shares / stage.totalShares) * 100;
      const sVal = stage.pps ? s.shares * stage.pps : null;
      const tag = s.type === 'post' ? '<span class="tag tag-post">Post-$</span>' : '<span class="tag tag-pre">Pre-$</span>';
      html += buildRow(s.name || 'SAFE', tag, s.shares, sPct, s.safePrice, sVal, 'c-pink', ci(colorIdx++));
    });

    if (stage.investorShares > 0) {
      const iPct = (stage.investorShares / stage.totalShares) * 100;
      const iVal = stage.pps ? stage.investorShares * stage.pps : null;
      html += buildRow('New Investors', `<span class="tag tag-priced">Series</span>`, stage.investorShares, iPct, stage.pps, iVal, 'c-purple', ci(colorIdx++));
    }

    html += `<tr style="font-weight:700;border-top:1px solid var(--bdr)">
      <td class="td-name">TOTAL</td><td>—</td>
      <td class="td-mono">${fmt.shares(stage.totalShares)}</td>
      <td class="pct-col">100.00%</td>
      <td>${stage.pps ? fmt.pps(stage.pps) : '—'}</td>
      <td>${stage.postMoney ? fmt.money(stage.postMoney) : '—'}</td><td></td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('capTableContainer').innerHTML = html;
}

function buildRow(name, type, shares, pct, pps, val, cls, color) {
  return `<tr>
    <td class="td-name">${name}</td>
    <td>${type}</td>
    <td class="td-mono">${fmt.shares(shares)}</td>
    <td class="pct-col ${cls}">${fmt.pct(pct)}</td>
    <td class="td-mono">${pps ? fmt.pps(pps) : '—'}</td>
    <td class="td-mono">${val ? fmt.money(val) : '—'}</td>
    <td>${miniBar(pct, color)}</td>
  </tr>`;
}

// ─── RENDER: SAFE ITEM ────────────────────────────────────────────────────────
function renderSafe(safe) {
  return `<div class="item-card" id="safe-${safe.id}">
    <div class="item-hdr">
      <span class="item-name">${safe.name || 'SAFE'}</span>
      <button class="delbtn" onclick="removeSafe(${safe.id})">✕</button>
    </div>
    <div class="type-pills">
      <button class="tpill ${safe.type === 'pre' ? 'active' : ''}" onclick="setSafeType(${safe.id},'pre')">Pre-money${tip('tip_pre_type')}</button>
      <button class="tpill ${safe.type === 'post' ? 'active' : ''}" onclick="setSafeType(${safe.id},'post')">Post-money${tip('tip_post_type')}</button>
    </div>
    <div class="frow">
      <div class="fg"><label>${t('lbl_name')}${tip('tip_safe_name')}</label>
        <input type="text" value="${safe.name}" oninput="updateSafe(${safe.id},'name',this.value)">
      </div>
      <div class="fg"><label>${t('lbl_amount')}${tip('tip_safe_amount')}</label>
        <input type="number" value="${safe.amount}" min="0" oninput="updateSafe(${safe.id},'amount',+this.value)">
      </div>
    </div>
    <div class="frow">
      <div class="fg"><label>${t('lbl_cap')} (0 = no cap)${tip('tip_cap')}</label>
        <input type="number" value="${safe.cap}" min="0" oninput="updateSafe(${safe.id},'cap',+this.value)">
      </div>
      <div class="fg"><label>${t('lbl_disc')} (0 = no disc.)${tip('tip_disc')}</label>
        <input type="number" value="${safe.discount}" min="0" max="50" oninput="updateSafe(${safe.id},'discount',+this.value)">
      </div>
    </div>
  </div>`;
}

function renderRound(round) {
  return `<div class="item-card" id="round-${round.id}">
    <div class="item-hdr">
      <span class="item-name">${round.name || 'Priced Round'}</span>
      <button class="delbtn" onclick="removeRound(${round.id})">✕</button>
    </div>
    <div class="frow">
      <div class="fg"><label>${t('lbl_name')}${tip('tip_round_name')}</label>
        <input type="text" value="${round.name}" oninput="updateRound(${round.id},'name',this.value)">
      </div>
      <div class="fg"><label>${t('lbl_pool_topup')}${tip('tip_pool_topup')}</label>
        <input type="number" value="${round.optionPoolTopup}" min="0" max="30" step="0.5" oninput="updateRound(${round.id},'optionPoolTopup',+this.value)">
      </div>
    </div>
    <div class="frow">
      <div class="fg"><label>${t('lbl_premoney')}${tip('tip_premoney')}</label>
        <input type="number" value="${round.preMoneyVal}" min="0" oninput="updateRound(${round.id},'preMoneyVal',+this.value)">
      </div>
      <div class="fg"><label>${t('lbl_newmoney')}${tip('tip_newmoney')}</label>
        <input type="number" value="${round.newMoney}" min="0" oninput="updateRound(${round.id},'newMoney',+this.value)">
      </div>
    </div>
  </div>`;
}

function refreshSafesList() {
  const el = document.getElementById('safesList');
  el.innerHTML = state.safes.length ? state.safes.map(renderSafe).join('') : `<div class="empty-state">${t('no_safes')}</div>`;
}
function refreshRoundsList() {
  const el = document.getElementById('roundsList');
  el.innerHTML = state.rounds.length ? state.rounds.map(renderRound).join('') : `<div class="empty-state">${t('no_rounds')}</div>`;
}

// ─── STATE MUTATORS ───────────────────────────────────────────────────────────
function addSafe() {
  state.safes.push({ id: ++state._id, name: `SAFE ${state.safes.length + 1}`, amount: 500000, cap: 5000000, discount: 20, type: 'pre' });
  refreshSafesList(); autoCalc();
}
function removeSafe(id) {
  state.safes = state.safes.filter(s => s.id !== id); refreshSafesList(); autoCalc();
}
function setSafeType(id, type) {
  const s = state.safes.find(s => s.id === id); if (s) { s.type = type; refreshSafesList(); autoCalc(); }
}
function updateSafe(id, key, val) {
  const s = state.safes.find(s => s.id === id); if (s) { s[key] = val; autoCalc(); }
}
function addRound() {
  state.rounds.push({ id: ++state._id, name: `Series ${String.fromCharCode(64 + state.rounds.length + 1)}`, preMoneyVal: 10000000, newMoney: 3000000, optionPoolTopup: 5 });
  refreshRoundsList(); autoCalc();
}
function removeRound(id) {
  state.rounds = state.rounds.filter(r => r.id !== id); refreshRoundsList(); autoCalc();
}
function updateRound(id, key, val) {
  const r = state.rounds.find(r => r.id === id); if (r) { r[key] = val; autoCalc(); }
}

function autoCalc() {
  if (state.safes.length > 0 || state.rounds.length > 0) calculate();
}

function calculate() {
  try {
    state.founderShares = parseInt(document.getElementById('founderShares').value) || 10_000_000;
    state.optionPoolPct = parseFloat(document.getElementById('optionPoolPct').value) || 10;
    state.includeOptionPool = document.getElementById('includeOptionPool').checked;
    state.results = calcCapTable();
    renderSummary();
    renderCapTable();
    renderWhatIf();
    // Re-render charts only if the charts tab is active
    const chartsTab = document.getElementById('tab-charts');
    if (chartsTab && chartsTab.classList.contains('active')) {
      requestAnimationFrame(() => requestAnimationFrame(() => renderCharts()));
    }
    showToast('✓ Calculated!');
  } catch (e) {
    showToast('⚠ Error: ' + e.message);
    console.error(e);
  }
}

// ─── EXPORT CSV ────────────────────────────────────────────────────────────────
function exportCSV() {
  if (!state.results) { showToast('Run a calculation first'); return; }
  let csv = 'Stage,Stakeholder,Type,Shares,Ownership%,PPS,Value\n';
  state.results.forEach(stage => {
    const add = (name, type, shares, pps, val) => {
      const pct = (shares / stage.totalShares * 100).toFixed(2);
      csv += `"${stage.label}","${name}","${type}",${shares},${pct}%,${pps ? pps.toFixed(4) : ''},${val ? val.toFixed(0) : ''}\n`;
    };
    add(t('founders_row'), 'Equity', stage.founderShares, stage.pps, stage.pps ? stage.founderShares * stage.pps : null);
    if (stage.optionShares > 0) add(t('option_pool_row'), 'Options', stage.optionShares, null, null);
    (stage.safeRows || []).forEach(s => add(s.name || 'SAFE', s.type + '-SAFE', s.shares, s.safePrice, stage.pps ? s.shares * stage.pps : null));
    if (stage.investorShares > 0) add('New Investors', 'Priced', stage.investorShares, stage.pps, stage.pps ? stage.investorShares * stage.pps : null);
  });
  const a = document.createElement('a');
  a.href = 'data:text/csv,' + encodeURIComponent(csv);
  a.download = 'cap-table.csv'; a.click();
  showToast('CSV exported!');
}

// ─── WHAT-IF TABLE ─────────────────────────────────────────────────────────────
function renderWhatIf() {
  if (!state.results || state.rounds.length === 0) return;
  const caps = [1e6, 2e6, 3e6, 5e6, 7.5e6, 10e6, 15e6, 20e6];
  const safesToTest = state.safes.slice(0, 3);
  if (!safesToTest.length) {
    document.getElementById('whatifTable').innerHTML = `<div class="empty-state" style="padding:32px">${t('whatif_hint')}</div>`; return;
  }

  let html = `<table><thead><tr><th>Cap ($M)</th>`;
  safesToTest.forEach(s => { html += `<th>${s.name} shares</th>`; });
  html += `<th>Founder %</th></tr></thead><tbody>`;

  caps.forEach(cap => {
    html += `<tr><td class="td-mono c-gold">$${(cap / 1e6).toFixed(1)}M</td>`;
    const tempSafes = safesToTest.map(s => ({ ...s, cap }));
    const origSafes = state.safes;
    state.safes = tempSafes;
    const tempResult = calcCapTable();
    state.safes = origSafes;
    const last = tempResult[tempResult.length - 1];
    tempSafes.forEach((s, i) => {
      const sr = (last.safeRows || []).find(r => r.id === s.id);
      html += `<td class="td-mono">${sr ? fmt.shares(sr.shares) : '—'}</td>`;
    });
    const fPct = (last.founderShares / last.totalShares) * 100;
    const color = fPct > 60 ? 'c-green' : fPct > 40 ? 'c-blue' : 'c-pink';
    html += `<td class="pct-col ${color}">${fPct.toFixed(1)}%</td></tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('whatifTable').innerHTML = html;
}

// ─── SCENARIOS ─────────────────────────────────────────────────────────────────
const scenarios = {
  single: () => {
    state.safes = [{ id: ++state._id, name: 'Seed SAFE', amount: 500000, cap: 5000000, discount: 20, type: 'pre' }];
    state.rounds = [{ id: ++state._id, name: 'Series A', preMoneyVal: 10000000, newMoney: 3000000, optionPoolTopup: 5 }];
    document.getElementById('founderShares').value = 10000000;
    document.getElementById('optionPoolPct').value = 10;
    document.getElementById('includeOptionPool').checked = true;
    state.includeOptionPool = true;
  },
  multi: () => {
    state.safes = [
      { id: ++state._id, name: 'SAFE 1 (Pre)', amount: 250000, cap: 3000000, discount: 0, type: 'pre' },
      { id: ++state._id, name: 'SAFE 2 (Post)', amount: 500000, cap: 6000000, discount: 0, type: 'post' },
    ];
    state.rounds = [{ id: ++state._id, name: 'Series A', preMoneyVal: 15000000, newMoney: 5000000, optionPoolTopup: 7 }];
    document.getElementById('founderShares').value = 10000000;
    document.getElementById('optionPoolPct').value = 10;
    document.getElementById('includeOptionPool').checked = true;
    state.includeOptionPool = true;
  },
  down: () => {
    state.safes = [{ id: ++state._id, name: 'Seed SAFE', amount: 1000000, cap: 8000000, discount: 20, type: 'pre' }];
    state.rounds = [{ id: ++state._id, name: 'Series A', preMoneyVal: 5000000, newMoney: 2000000, optionPoolTopup: 5 }];
    document.getElementById('founderShares').value = 10000000;
    document.getElementById('optionPoolPct').value = 10;
    document.getElementById('includeOptionPool').checked = true;
    state.includeOptionPool = true;
  }
};

function loadScenario(name) {
  state.safes = []; state.rounds = []; state._id = 0;
  scenarios[name]();
  refreshSafesList(); refreshRoundsList();
  calculate();
  switchTab('input');
  showToast('Scenario loaded!');
}

// ─── FORMULAS TOGGLE ──────────────────────────────────────────────────────────
let formulasOpen = true;
function toggleFormulas() {
  const body = document.getElementById('formulasBody');
  const icon = document.getElementById('formulasIcon');
  formulasOpen = !formulasOpen;
  body.style.display = formulasOpen ? '' : 'none';
  icon.style.transform = formulasOpen ? '' : 'rotate(-90deg)';
}

// ─── OPTION POOL VISIBILITY ───────────────────────────────────────────────────
function syncPoolVisibility() {
  const checked = document.getElementById('includeOptionPool').checked;
  const group = document.getElementById('optionPoolGroup');
  if (group) group.style.opacity = checked ? '1' : '0.35';
}

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// ─── TABS ──────────────────────────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
  if (name === 'charts') requestAnimationFrame(() => requestAnimationFrame(() => renderCharts()));
}

// ─── APPLY i18n ───────────────────────────────────────────────────────────────
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = i18n[state.lang][key];
    if (val) el.textContent = val;
  });
  // Refresh dynamic tooltip boxes
  document.querySelectorAll('.tip-box[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = i18n[state.lang][key];
    if (val) el.textContent = val;
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Attempt true fullscreen (available in newer Telegram versions)
    try {
      if (tg.requestFullscreen) {
        tg.requestFullscreen();
      }
    } catch (e) {
      console.log('Fullscreen not supported:', e);
    }

    // Default theme based on Telegram WebApp
    if (tg.colorScheme) {
      state.theme = tg.colorScheme;
      document.documentElement.setAttribute('data-theme', state.theme);
      document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
    }
  }

  _initGlobalTip();
  applyI18n();

  document.getElementById('addSafeBtn').onclick = addSafe;
  document.getElementById('addRoundBtn').onclick = addRound;
  document.getElementById('calcBtn').onclick = calculate;
  document.getElementById('exportCsvBtn').onclick = exportCSV;

  document.getElementById('founderShares').oninput = autoCalc;
  document.getElementById('optionPoolPct').oninput = autoCalc;

  document.getElementById('includeOptionPool').onchange = function () {
    state.includeOptionPool = this.checked;
    syncPoolVisibility();
    autoCalc();
  };

  document.getElementById('tabNav').querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => switchTab(btn.dataset.tab);
  });

  document.getElementById('langBtn').onclick = () => {
    state.lang = state.lang === 'en' ? 'ru' : 'en';
    document.getElementById('langBtn').textContent = state.lang.toUpperCase();
    applyI18n();
    refreshSafesList(); refreshRoundsList(); renderSummary(); renderCapTable(); renderWhatIf();
  };
  document.getElementById('themeBtn').onclick = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
    const chartsTab = document.getElementById('tab-charts');
    if (chartsTab && chartsTab.classList.contains('active')) renderCharts();
  };

  document.querySelectorAll('.scenario-card button').forEach(btn => {
    btn.onclick = () => loadScenario(btn.closest('.scenario-card').dataset.scenario);
  });

  syncPoolVisibility();
  // Load default example
  loadScenario('single');
});

// ─── APP MENU DRAWER ──────────────────────────────────────────────────────────
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
// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
