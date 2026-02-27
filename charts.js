// charts.js — Chart.js visualizations for SAFE Calculator

let ownershipChartInst = null;
let dilutionChartInst = null;
let sensitivityChartInst = null;

const CHART_COLORS = [
    '#7c6dff', '#00d2ff', '#ff6b8a', '#ffd700',
    '#00e676', '#ff9800', '#c084fc', '#34d399',
    '#f472b6', '#60a5fa', '#a78bfa', '#fb923c'
];

function getChartDefaults() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
        textColor: isDark ? '#8888b0' : '#5a5a8a',
        gridColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
        bgColor: isDark ? '#0d0f1a' : '#ffffff',
    };
}

function destroyChart(inst) {
    if (inst) { try { inst.destroy(); } catch (e) { } }
    return null;
}

// Set explicit size on canvas before creating chart
function prepCanvas(id, w, h) {
    const c = document.getElementById(id);
    if (!c) return null;
    c.width = w;
    c.height = h;
    c.style.width = w + 'px';
    c.style.height = h + 'px';
    return c;
}

function renderCharts() {
    renderOwnershipChart();
    renderDilutionChart();
    renderSensitivityChart();
}

// ─── PIE: Ownership Distribution ─────────────────────────────────────────────
function renderOwnershipChart() {
    ownershipChartInst = destroyChart(ownershipChartInst);

    const canvas = prepCanvas('ownershipChart', 380, 300);
    if (!canvas) return;
    if (!window.state || !state.results || !state.results.length) return;

    const last = state.results[state.results.length - 1];
    const rows = buildOwnershipRows(last);
    const cfg = getChartDefaults();

    ownershipChartInst = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: rows.map(r => r.name),
            datasets: [{
                data: rows.map(r => +r.pct.toFixed(2)),
                backgroundColor: rows.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
                borderColor: cfg.bgColor,
                borderWidth: 3,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: false,
            animation: { duration: 600 },
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: cfg.textColor,
                        font: { family: 'Inter', size: 11 },
                        padding: 12,
                        boxWidth: 12,
                        boxHeight: 12,
                    }
                },
                tooltip: {
                    callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed.toFixed(2)}%` }
                }
            }
        }
    });
}

// ─── LINE: Dilution Over Rounds ───────────────────────────────────────────────
function renderDilutionChart() {
    dilutionChartInst = destroyChart(dilutionChartInst);

    const canvas = prepCanvas('dilutionChart', 420, 300);
    if (!canvas) return;
    if (!window.state || !state.results || state.results.length < 1) return;

    const cfg = getChartDefaults();
    const labels = state.results.map(s => s.label);

    const founderData = state.results.map(s => +((s.founderShares / s.totalShares) * 100).toFixed(2));
    const optionData = state.results.map(s => +((s.optionShares / s.totalShares) * 100).toFixed(2));

    const datasets = [
        {
            label: 'Founders',
            data: founderData,
            borderColor: '#7c6dff',
            backgroundColor: 'rgba(124,109,255,0.12)',
            fill: true, tension: 0.35,
            pointRadius: 5, pointHoverRadius: 8, borderWidth: 2.5,
        },
        {
            label: 'Option Pool',
            data: optionData,
            borderColor: '#00d2ff',
            backgroundColor: 'rgba(0,210,255,0.08)',
            fill: true, tension: 0.35,
            pointRadius: 5, pointHoverRadius: 8, borderWidth: 2.5,
        }
    ];

    const lastStage = state.results[state.results.length - 1];
    (lastStage.safeRows || []).forEach((safe, i) => {
        const safeData = state.results.map(s => {
            const row = (s.safeRows || []).find(r => r.id === safe.id);
            return row ? +((row.shares / s.totalShares) * 100).toFixed(2) : 0;
        });
        datasets.push({
            label: safe.name || 'SAFE',
            data: safeData,
            borderColor: CHART_COLORS[i + 2],
            backgroundColor: 'transparent',
            tension: 0.35, pointRadius: 5, pointHoverRadius: 8,
            borderWidth: 2, borderDash: [5, 3],
        });
    });

    dilutionChartInst = new Chart(canvas, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: false,
            animation: { duration: 600 },
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: {
                    ticks: { color: cfg.textColor, font: { family: 'Inter', size: 11 } },
                    grid: { color: cfg.gridColor }
                },
                y: {
                    min: 0, max: 100,
                    ticks: { color: cfg.textColor, font: { family: 'Inter', size: 11 }, callback: v => v + '%' },
                    grid: { color: cfg.gridColor }
                }
            },
            plugins: {
                legend: { labels: { color: cfg.textColor, font: { family: 'Inter', size: 11 }, boxWidth: 14 } },
                tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` } }
            }
        }
    });
}

// ─── LINE: Sensitivity — Founder % vs Valuation Cap ──────────────────────────
function renderSensitivityChart() {
    sensitivityChartInst = destroyChart(sensitivityChartInst);

    const canvas = prepCanvas('sensitivityChart', 900, 220);
    if (!canvas) return;
    if (!window.state || !state.safes.length || !state.rounds.length) return;

    const cfg = getChartDefaults();
    const caps = [0.5e6, 1e6, 2e6, 3e6, 5e6, 7.5e6, 10e6, 15e6, 20e6, 30e6];
    const labels = caps.map(c => '$' + (c / 1e6).toFixed(1) + 'M');

    const founderPcts = caps.map(cap => {
        const origSafes = state.safes;
        state.safes = state.safes.map(s => ({ ...s, cap }));
        const result = calcCapTable();
        state.safes = origSafes;
        const last = result[result.length - 1];
        return +((last.founderShares / last.totalShares) * 100).toFixed(2);
    });

    sensitivityChartInst = new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Founder Ownership %',
                data: founderPcts,
                borderColor: '#7c6dff',
                backgroundColor: 'rgba(124,109,255,0.15)',
                fill: true, tension: 0.4,
                pointRadius: 5, pointHoverRadius: 9,
                pointBackgroundColor: '#7c6dff',
                borderWidth: 2.5,
            }]
        },
        options: {
            responsive: false,
            animation: { duration: 600 },
            scales: {
                x: {
                    title: { display: true, text: 'SAFE Valuation Cap', color: cfg.textColor, font: { size: 11, family: 'Inter' } },
                    ticks: { color: cfg.textColor, font: { family: 'Inter', size: 10 } },
                    grid: { color: cfg.gridColor }
                },
                y: {
                    title: { display: true, text: 'Founder %', color: cfg.textColor, font: { size: 11, family: 'Inter' } },
                    ticks: { color: cfg.textColor, font: { family: 'Inter', size: 11 }, callback: v => v + '%' },
                    grid: { color: cfg.gridColor }
                }
            },
            plugins: {
                legend: { labels: { color: cfg.textColor, font: { family: 'Inter', size: 11 } } },
                tooltip: { callbacks: { label: ctx => ` Founder: ${ctx.parsed.y.toFixed(1)}%` } }
            }
        }
    });
}
