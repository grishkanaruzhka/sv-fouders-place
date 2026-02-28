// ─── CHARTS LOGIC FOR COFFEE CALCULATOR ───────────────────────────────────────
let revenueChartInstance = null;
let sensitivityChartInstance = null;

window.renderCoffeeCharts = function () {
    if (!state.results) return;

    const fontColor = state.theme === 'dark' ? '#aaaacc' : '#5a5a8a';
    const gridColor = state.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const labelColor = state.theme === 'dark' ? '#e8e8f8' : '#12122a';

    Chart.defaults.color = fontColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    renderRevenuePie(labelColor);
    renderSensitivityLine(labelColor, gridColor);
};

function renderRevenuePie(labelColor) {
    const ctx = document.getElementById('revenuePieChart');
    if (!ctx) return;
    if (revenueChartInstance) revenueChartInstance.destroy();

    const r = state.results;
    const values = [r.grainRevenue, r.cupRevenue, r.totalNft];
    const labels = ['Grain Wholesale', 'Cup Sales', 'NFT Revenue'];
    const colors = ['#7c6dff', '#00d2ff', '#ff6b8a'];

    revenueChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { position: 'bottom', labels: { color: labelColor, padding: 15, usePointStyle: true, boxWidth: 8 } },
                tooltip: {
                    backgroundColor: state.theme === 'dark' ? 'rgba(13,15,26,0.95)' : 'rgba(255,255,255,0.95)',
                    titleColor: labelColor,
                    bodyColor: labelColor,
                    borderColor: 'rgba(124,109,255,0.3)',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: (ctx) => ` $${ctx.raw.toLocaleString()} (${(ctx.raw / r.gross * 100).toFixed(1)}%)`
                    }
                }
            }
        }
    });
}

function renderSensitivityLine(labelColor, gridColor) {
    const ctx = document.getElementById('yieldLineChart');
    if (!ctx) return;
    if (sensitivityChartInstance) sensitivityChartInstance.destroy();

    const labels = [];
    const grossData = [];
    const netData = [];

    const baseYieldKg = state.results.yieldKg;
    const multi = [0.5, 0.75, 1.0, 1.25, 1.5]; // Test from -50% to +50% yield

    multi.forEach(m => {
        const y = baseYieldKg * m;
        labels.push(`${y.toLocaleString('en-US', { maximumFractionDigits: 0 })} kg`);

        // Quick recalculation for sensitivity
        const gR = y * state.beanPrice;
        const cR = state.cupsPerYear * state.cupPrice * (state.cupPct / 100);
        const nR = state.results.totalNft;

        const gross = gR + cR + nR;
        const net = gross - (gross * (state.costsPct / 100));

        grossData.push(gross);
        netData.push(net);
    });

    sensitivityChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Gross Revenue ($)',
                    data: grossData,
                    borderColor: '#00d2ff',
                    backgroundColor: 'rgba(0, 210, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#00d2ff',
                    pointBorderWidth: 0,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Net Revenue (ROI)',
                    data: netData,
                    borderColor: '#7c6dff',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.3,
                    pointBackgroundColor: '#7c6dff',
                    pointBorderWidth: 0,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { position: 'top', labels: { color: labelColor, usePointStyle: true, boxWidth: 6 } },
                tooltip: {
                    backgroundColor: state.theme === 'dark' ? 'rgba(13,15,26,0.95)' : 'rgba(255,255,255,0.95)',
                    titleColor: labelColor,
                    bodyColor: labelColor,
                    callbacks: { label: (ctx) => ` $${ctx.raw.toLocaleString()}` }
                }
            },
            scales: {
                x: { grid: { color: gridColor, drawBorder: false }, ticks: { color: fontColor } },
                y: {
                    grid: { color: gridColor, drawBorder: false },
                    ticks: {
                        color: fontColor,
                        callback: (val) => '$' + (val >= 1e6 ? (val / 1e6).toFixed(1) + 'M' : (val / 1e3).toFixed(0) + 'K')
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
