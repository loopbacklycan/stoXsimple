const topTickers = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'NVDA', name: 'Nvidia' },
  { symbol: 'GOOGL', name: 'Google' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'AMD', name: 'AMD' },
  { symbol: 'INTC', name: 'Intel' },
  { symbol: 'BABA', name: 'Alibaba' },
  { symbol: 'BA', name: 'Boeing' },
  { symbol: 'JPM', name: 'JP Morgan' },
  { symbol: 'DIS', name: 'Disney' },
  { symbol: 'UBER', name: 'Uber' },
  { symbol: 'LYFT', name: 'Lyft' },
  { symbol: 'CRM', name: 'Salesforce' },
  { symbol: 'SHOP', name: 'Shopify' },
  { symbol: 'PYPL', name: 'PayPal' },
  { symbol: 'SQ', name: 'Block Inc.' },
  { symbol: 'T', name: 'AT&T' },
  { symbol: 'VZ', name: 'Verizon' },
  { symbol: 'WMT', name: 'Walmart' },
  { symbol: 'COST', name: 'Costco' },
  { symbol: 'MCD', name: "McDonald's" },
  { symbol: 'PEP', name: 'PepsiCo' },
  { symbol: 'KO', name: 'Coca-Cola' },
  { symbol: 'NKE', name: 'Nike' },
  { symbol: 'XOM', name: 'ExxonMobil' },
  { symbol: 'CVX', name: 'Chevron' },
  { symbol: 'GS', name: 'Goldman Sachs' },
  { symbol: 'QQQ', name: 'NASDAQ ETF' },
  { symbol: 'SPY', name: 'S&P 500 ETF' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF' },
  { symbol: 'SOFI', name: 'SoFi Technologies' },
  { symbol: 'PLTR', name: 'Palantir' },
  { symbol: 'ROKU', name: 'Roku' },
  { symbol: 'TWLO', name: 'Twilio' },
  { symbol: 'F', name: 'Ford' },
  { symbol: 'GM', name: 'General Motors' },
  { symbol: 'RIOT', name: 'Riot Platforms' },
  { symbol: 'MARA', name: 'Marathon Digital' },
  { symbol: 'DKNG', name: 'DraftKings' },
  { symbol: 'AAL', name: 'American Airlines' },
  { symbol: 'DAL', name: 'Delta Airlines' },
  { symbol: 'RBLX', name: 'Roblox' },
  { symbol: 'LCID', name: 'Lucid Motors' },
  { symbol: 'NIO', name: 'NIO Inc.' },
  { symbol: 'BYND', name: 'Beyond Meat' },
  { symbol: 'ZM', name: 'Zoom Video Communications' }
];

// Populate ticker dropdown with top stocks
function populateDropdown() {
  const select = document.getElementById('ticker-select');
  topTickers.forEach(t => {
    const option = document.createElement('option');
    option.value = t.symbol;
    option.textContent = `${t.name} (${t.symbol})`;
    select.appendChild(option);
  });
}

// Create a chart container + render chart inside it
async function createChart(ticker) {
  const chartsContainer = document.getElementById('charts-container');

  // Wrapper div for each chart + message
  const wrapper = document.createElement('div');
  wrapper.className = 'chart-wrapper';

  // Chart div
  const chartDiv = document.createElement('div');
  chartDiv.className = 'chart';

  // Message box for loading/errors
  const message = document.createElement('div');
  message.className = 'chart-message';
  message.textContent = `⏳ Loading ${ticker}...`;

  wrapper.appendChild(chartDiv);
  wrapper.appendChild(message);
  chartsContainer.appendChild(wrapper);

  // Create chart instance
  const chart = LightweightCharts.createChart(chartDiv, {
    layout: {
      background: { color: '#1e1e1e' },
      textColor: '#DDD',
    },
    grid: {
      vertLines: { color: '#444' },
      horzLines: { color: '#444' },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    priceScale: {
      borderVisible: false,
    },
  });

  const candleSeries = chart.addCandlestickSeries();

  try {
    // Use CORS proxy to bypass CORS errors
    const url = `https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1mo`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json = await res.json();
    const result = json.chart.result?.[0];
    if (!result) throw new Error('No data found');

    const timestamps = result.timestamp;
    const ohlc = result.indicators.quote[0];

    const formatted = timestamps.map((time, i) => ({
      time: time,
      open: ohlc.open[i],
      high: ohlc.high[i],
      low: ohlc.low[i],
      close: ohlc.close[i],
    }));

    candleSeries.setData(formatted);
    message.textContent = `✅ Loaded ${ticker}`;
  } catch (error) {
    message.textContent = `❌ Error loading ${ticker}: ${error.message}`;
  }
}

// Main initialization
function main() {
  populateDropdown();

  const addBtn = document.getElementById('add-chart-btn');
  const select = document.getElementById('ticker-select');

  addBtn.addEventListener('click', () => {
    const selectedTicker = select.value;
    if (!selectedTicker) return alert('Please select a ticker first');
    createChart(selectedTicker);
  });
}

// Run on page load
window.onload = main;
