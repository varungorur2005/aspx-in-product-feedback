document.addEventListener('DOMContentLoaded', () => {
  initOppTabs();
  renderOppView('copilot');
  initTableSelection();
  initFeedbackButton();
  initFlyout();
  initOcvModal();
  initGlobalFeedback();
});

// ═══════════════════════════════════════════════
// DATA (realistic ASPX columns from Excel export)
// ═══════════════════════════════════════════════

const copilotColumns = [
  'Tenant Name', 'Tenant ID', 'Tenant Country/Region', 'Tenant Segment',
  'Customer Sub-Segment', 'Industry / Vertical', 'Customer TPID', 'Customer Name',
  'EA Renewal', 'Largest Seat CSP Renewal', 'Dominant SKU Group',
  'Copilot Eligible M365 Seats', 'Copilot Seats Whitespace',
  'Copilot MAU (Licensed)', 'Copilot PAU', 'Copilot Utilization',
  'Adoption Status', 'Free Copilot Chat MAU (Unlicensed)', 'All Copilot MAU',
  'Free to Paid Whitespace', 'All Agents MAU', 'Copilot Opportunity'
];

const e3Columns = [
  'Tenant Name', 'Tenant ID', 'Tenant Country/Region', 'Tenant Segment',
  'Customer Sub-Segment', 'Industry / Vertical', 'TPID', 'Customer Name',
  'EA Renewal', 'Largest Seat CSP Renewal', 'Dominant SKU Group',
  'Total M365 Seat Count', 'Tenant Health', 'Tenant Recommendation',
  'Workload Name', 'MAU', 'PAU', 'Utilization', 'Usage Whitespace',
  'Usage Threshold', 'Workload Health', 'Workload Recommendation'
];

const copilotData = [
  {
    'Tenant Name': 'Fabrikam 123-BE8-8F2', 'Tenant ID': 'D12E2A30-AC07-442C-9A46-EBEEE85BD4D7',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'Enterprise',
    'Customer Sub-Segment': 'Not Available', 'Industry / Vertical': 'Not Available',
    'Customer TPID': '-1271114', 'Customer Name': 'Contoso D4D75557',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': 'Not Available',
    'Dominant SKU Group': 'Not Available',
    'Copilot Eligible M365 Seats': '131,185', 'Copilot Seats Whitespace': '130,895',
    'Copilot MAU (Licensed)': '245', 'Copilot PAU': '290', 'Copilot Utilization': '84%',
    'Adoption Status': 'Failure to Thrive/Adopt',
    'Free Copilot Chat MAU (Unlicensed)': '12,650', 'All Copilot MAU': '12,895',
    'Free to Paid Whitespace': '12360', 'All Agents MAU': '414',
    'Copilot Opportunity': 'Monetize'
  },
  {
    'Tenant Name': 'Fabrikam 123-BFE-B06', 'Tenant ID': 'D12E2A30-D256-4F8E-BD03-8D3687987063',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'Enterprise',
    'Customer Sub-Segment': 'Not Available', 'Industry / Vertical': 'Not Available',
    'Customer TPID': '-1762082', 'Customer Name': 'Contoso 70631041',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': 'Not Available',
    'Dominant SKU Group': 'Not Available',
    'Copilot Eligible M365 Seats': '122,221', 'Copilot Seats Whitespace': '121,971',
    'Copilot MAU (Licensed)': '235', 'Copilot PAU': '250', 'Copilot Utilization': '94%',
    'Adoption Status': 'Failure to Thrive/Adopt',
    'Free Copilot Chat MAU (Unlicensed)': '3,233', 'All Copilot MAU': '3,468',
    'Free to Paid Whitespace': '2983', 'All Agents MAU': 'Not Available',
    'Copilot Opportunity': 'Acquire'
  },
  {
    'Tenant Name': 'Fabrikam 123-CF7-65A', 'Tenant ID': 'D12E2A30-CED6-400C-9B56-FCAC58FF39E8',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'Enterprise',
    'Customer Sub-Segment': 'Not Available', 'Industry / Vertical': 'Not Available',
    'Customer TPID': '-1290446', 'Customer Name': 'Contoso 39E85223',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': 'Not Available',
    'Dominant SKU Group': 'Not Available',
    'Copilot Eligible M365 Seats': '106,580', 'Copilot Seats Whitespace': '103,380',
    'Copilot MAU (Licensed)': '3,150', 'Copilot PAU': '3,200', 'Copilot Utilization': '98%',
    'Adoption Status': 'Healthy',
    'Free Copilot Chat MAU (Unlicensed)': '9,747', 'All Copilot MAU': '12,897',
    'Free to Paid Whitespace': '6547', 'All Agents MAU': '105',
    'Copilot Opportunity': 'Monetize'
  },
  {
    'Tenant Name': 'Fabrikam 123-4E9-8F8', 'Tenant ID': 'D12E2A30-394A-45B3-8B10-53F81F819E3B',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'Enterprise',
    'Customer Sub-Segment': 'Not Available', 'Industry / Vertical': 'Not Available',
    'Customer TPID': '-1255140', 'Customer Name': 'Contoso 9E3B7570',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': 'Not Available',
    'Dominant SKU Group': 'Not Available',
    'Copilot Eligible M365 Seats': '98,971', 'Copilot Seats Whitespace': '96,638',
    'Copilot MAU (Licensed)': '2,189', 'Copilot PAU': '2,333', 'Copilot Utilization': '93%',
    'Adoption Status': 'Healthy',
    'Free Copilot Chat MAU (Unlicensed)': '6,923', 'All Copilot MAU': '9,112',
    'Free to Paid Whitespace': '4590', 'All Agents MAU': '25',
    'Copilot Opportunity': 'Monetize'
  }
];

const e3Data = [
  {
    'Tenant Name': 'Fourth Coffee Ltd.', 'Tenant ID': 'A8F21B30-CC01-4D5E-91AA-12345678ABCD',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'SMC',
    'Customer Sub-Segment': 'Corporate', 'Industry / Vertical': 'Retail',
    'TPID': '-1045231', 'Customer Name': 'Fourth Coffee Inc.',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': '03/2027',
    'Dominant SKU Group': 'OE3',
    'Total M365 Seat Count': '485', 'Tenant Health': 'Healthy',
    'Tenant Recommendation': 'Microsoft 365 E3',
    'Workload Name': 'Exchange Online', 'MAU': '412', 'PAU': '485',
    'Utilization': '85%', 'Usage Whitespace': '73',
    'Usage Threshold': 'Above', 'Workload Health': 'Healthy',
    'Workload Recommendation': 'Maintain usage'
  },
  {
    'Tenant Name': 'Graphic Design Institute', 'Tenant ID': 'B2C33A10-DD02-4E6F-82BB-98765432DCBA',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'SMC',
    'Customer Sub-Segment': 'Corporate', 'Industry / Vertical': 'Education',
    'TPID': '-1098776', 'Customer Name': 'Graphic Design Corp.',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': '06/2026',
    'Dominant SKU Group': 'OE1',
    'Total M365 Seat Count': '320', 'Tenant Health': 'Unhealthy',
    'Tenant Recommendation': 'Drive usage before upsell',
    'Workload Name': 'Microsoft Teams', 'MAU': '89', 'PAU': '320',
    'Utilization': '28%', 'Usage Whitespace': '231',
    'Usage Threshold': 'Below', 'Workload Health': 'Unhealthy',
    'Workload Recommendation': 'Drive Teams adoption'
  },
  {
    'Tenant Name': 'Nod Publishers', 'Tenant ID': 'C3D44B20-EE03-4F7G-73CC-11223344EEFF',
    'Tenant Country/Region': 'United States', 'Tenant Segment': 'SMC',
    'Customer Sub-Segment': 'Small Business', 'Industry / Vertical': 'Media',
    'TPID': '-1156432', 'Customer Name': 'Nod Publishing Group',
    'EA Renewal': 'Not Available', 'Largest Seat CSP Renewal': '09/2026',
    'Dominant SKU Group': 'BB',
    'Total M365 Seat Count': '145', 'Tenant Health': 'Healthy',
    'Tenant Recommendation': 'Business Premium',
    'Workload Name': 'SharePoint Online', 'MAU': '118', 'PAU': '145',
    'Utilization': '81%', 'Usage Whitespace': '27',
    'Usage Threshold': 'Above', 'Workload Health': 'Healthy',
    'Workload Recommendation': 'Upsell ready'
  }
];

const oppData = {
  copilot: {
    kpis: [
      { value: '6,625', label: 'Tenants' },
      { value: '3%', label: 'Seat Penetration' },
      { value: '83%', label: 'Paid Utilization' },
      { value: '1,781', label: 'Acquire' },
      { value: '1,710', label: 'Monetize' },
      { value: '868', label: 'Grow' },
      { value: '0', label: 'E7 Upsell-ready' },
      { value: '$1,430,000', label: 'Potential Earnings' },
    ],
    columns: copilotColumns,
    rows: copilotData
  },
  e3: {
    kpis: [
      { value: '1,240', label: 'Tenants' },
      { value: '54%', label: 'Paid Utilization' },
      { value: '28,400', label: 'Usage Whitespace' },
      { value: '312', label: 'Upsell Ready' },
      { value: '680', label: 'Unhealthy' },
      { value: '92', label: 'Incentive Eligible' },
      { value: '$420,000', label: 'Potential Earnings' },
    ],
    columns: e3Columns,
    rows: e3Data
  },
  e5: {
    kpis: [
      { value: '890', label: 'Tenants' },
      { value: '61%', label: 'Paid Utilization' },
      { value: '19,200', label: 'Usage Whitespace' },
      { value: '198', label: 'Upsell Ready' },
      { value: '412', label: 'Unhealthy' },
      { value: '78', label: 'At Risk' },
      { value: '$580,000', label: 'Potential Earnings' },
    ],
    columns: e3Columns,
    rows: e3Data
  },
  e5exp: {
    kpis: [
      { value: '520', label: 'Tenants' },
      { value: '78%', label: 'Paid Utilization' },
      { value: '10,400', label: 'Usage Whitespace' },
      { value: '245', label: 'Healthy' },
      { value: '180', label: 'Unhealthy' },
      { value: '42', label: 'Incentive Eligible' },
      { value: '$310,000', label: 'Potential Earnings' },
    ],
    columns: e3Columns,
    rows: e3Data
  }
};

let currentTab = 'copilot';
let selectedRow = null;
let selectedRowData = null;

// ═══════════════════════════════════════════════
// OPPORTUNITY TABS
// ═══════════════════════════════════════════════

function initOppTabs() {
  document.querySelectorAll('.opp-tabs-bar .opp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.opp-tabs-bar .opp-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.opp;
      if (oppData[currentTab]) {
        renderOppView(currentTab);
      }
    });
  });
}

function renderOppView(opp) {
  const data = oppData[opp];
  if (!data) return;

  // KPIs
  const kpiRow = document.getElementById('kpiRow');
  kpiRow.innerHTML = data.kpis.map(k =>
    `<div class="kpi-tile"><span class="kpi-value">${k.value}</span><span class="kpi-label">${k.label}</span></div>`
  ).join('');

  // Table header
  const head = document.getElementById('tableHead');
  head.innerHTML = data.columns.map(c => `<th>${c}</th>`).join('');

  // Table body
  const body = document.getElementById('tableBody');
  body.innerHTML = data.rows.map((row, idx) => {
    const cells = data.columns.map(col => {
      let val = row[col] || '—';
      if (col === 'Tenant Name') {
        val = `<a href="#" class="tenant-link" data-row="${idx}">${val}</a>`;
      } else if (col === 'Copilot Opportunity') {
        const cls = val.toLowerCase();
        val = `<span class="status-badge ${cls}">${val}</span>`;
      } else if (col === 'Adoption Status') {
        const cls = val.includes('Healthy') ? 'healthy' : val.includes('Failure') ? 'unhealthy' : '';
        val = cls ? `<span class="status-badge ${cls}">${val}</span>` : val;
      } else if (col === 'Tenant Health' || col === 'Workload Health') {
        const cls = val.toLowerCase().replace(/\s/g, '-');
        val = `<span class="status-badge ${cls}">${val}</span>`;
      } else if (col === 'All Copilot MAU' && val !== 'Not Available' && val !== '—') {
        val = `<a href="#" class="tenant-link copilot-mau-link" data-row="${idx}">${val}</a>`;
      } else if (col === 'All Agents MAU' && val !== 'Not Available' && val !== '—') {
        val = `<a href="#" class="tenant-link agents-mau-link" data-row="${idx}">${val}</a>`;
      }
      return `<td>${val}</td>`;
    }).join('');
    return `<tr data-row="${idx}">${cells}</tr>`;
  }).join('');

  clearSelection();
  initTableSelection();
}

// ═══════════════════════════════════════════════
// TABLE ROW SELECTION
// ═══════════════════════════════════════════════

function initTableSelection() {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;

  tbody.addEventListener('click', (e) => {
    // Don't select if clicking a link that opens flyout
    if (e.target.closest('.tenant-link')) return;

    const tr = e.target.closest('tr');
    if (!tr) return;

    // Toggle selection
    if (tr.classList.contains('selected')) {
      clearSelection();
    } else {
      document.querySelectorAll('.tenant-table tbody tr.selected').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
      selectedRow = parseInt(tr.dataset.row);
      selectedRowData = oppData[currentTab].rows[selectedRow];
      enableFeedbackButton();
    }
  });
}

function clearSelection() {
  document.querySelectorAll('.tenant-table tbody tr.selected').forEach(r => r.classList.remove('selected'));
  selectedRow = null;
  selectedRowData = null;
  disableFeedbackButton();
}

function enableFeedbackButton() {
  const btn = document.getElementById('giveFeedbackBtn');
  btn.disabled = false;
  document.getElementById('selectedRowHint').classList.remove('hidden');
}

function disableFeedbackButton() {
  const btn = document.getElementById('giveFeedbackBtn');
  btn.disabled = true;
  btn.classList.remove('active');
  document.getElementById('feedbackDropdown').classList.add('hidden');
  document.getElementById('selectedRowHint').classList.add('hidden');
}

// ═══════════════════════════════════════════════
// GIVE FEEDBACK BUTTON & DROPDOWN
// ═══════════════════════════════════════════════

function initFeedbackButton() {
  const btn = document.getElementById('giveFeedbackBtn');
  const dropdown = document.getElementById('feedbackDropdown');

  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    const isOpen = !dropdown.classList.contains('hidden');
    if (isOpen) {
      dropdown.classList.add('hidden');
      btn.classList.remove('active');
    } else {
      dropdown.classList.remove('hidden');
      btn.classList.add('active');
    }
  });

  // Feedback option selection
  dropdown.querySelectorAll('.feedback-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const reason = opt.dataset.reason;
      dropdown.classList.add('hidden');
      btn.classList.remove('active');
      openOcvModal(reason, selectedRowData, 'table');
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.give-feedback-wrapper')) {
      dropdown.classList.add('hidden');
      btn.classList.remove('active');
    }
  });
}

// ═══════════════════════════════════════════════
// FLYOUT PANEL (Tenant details, Copilot MAU, Agents MAU, etc.)
// ═══════════════════════════════════════════════

function initFlyout() {
  const overlay = document.getElementById('flyoutOverlay');
  const panel = document.getElementById('flyoutPanel');
  const closeBtn = document.getElementById('flyoutClose');

  // Click on tenant name links
  document.addEventListener('click', (e) => {
    const tenantLink = e.target.closest('.tenant-link');
    if (!tenantLink) return;
    e.preventDefault();
    const rowIdx = parseInt(tenantLink.dataset.row);
    const rowData = oppData[currentTab].rows[rowIdx];

    if (tenantLink.classList.contains('copilot-mau-link')) {
      openFlyout('copilot-mau', rowData);
    } else if (tenantLink.classList.contains('agents-mau-link')) {
      openFlyout('agents-mau', rowData);
    } else {
      openFlyout('tenant-details', rowData);
    }
  });

  closeBtn.addEventListener('click', closeFlyout);
  overlay.addEventListener('click', closeFlyout);

  // Thumbs up/down
  panel.querySelectorAll('.flyout-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const vote = thumb.dataset.vote;
      const reason = vote === 'up' ? 'positive' : 'negative';
      closeFlyout();
      openOcvModal(reason, currentFlyoutData, 'flyout');
    });
  });
}

let currentFlyoutData = null;

function openFlyout(type, rowData) {
  currentFlyoutData = rowData;
  const overlay = document.getElementById('flyoutOverlay');
  const panel = document.getElementById('flyoutPanel');
  const title = document.getElementById('flyoutTitle');
  const body = document.getElementById('flyoutBody');

  overlay.classList.remove('hidden');
  panel.classList.remove('hidden');

  if (type === 'tenant-details') {
    title.textContent = rowData['Tenant Name'];
    body.innerHTML = renderTenantDetailsFlyout(rowData);
  } else if (type === 'copilot-mau') {
    title.textContent = 'All Copilot MAU';
    body.innerHTML = renderCopilotMauFlyout(rowData);
  } else if (type === 'agents-mau') {
    title.textContent = 'All Agents MAU';
    body.innerHTML = renderAgentsMauFlyout(rowData);
  }
}

function closeFlyout() {
  document.getElementById('flyoutOverlay').classList.add('hidden');
  document.getElementById('flyoutPanel').classList.add('hidden');
  // Reset thumb votes
  document.querySelectorAll('.flyout-thumb').forEach(t => t.classList.remove('voted'));
}

function renderTenantDetailsFlyout(data) {
  return `
    <table class="flyout-info-table">
      <tr><td>Tenant ID:</td><td>${data['Tenant ID'] || '—'}</td></tr>
      <tr><td>TPID:</td><td>${data['Customer TPID'] || data['TPID'] || '—'}</td></tr>
      <tr><td>Claims:</td><td>—</td></tr>
      <tr><td>Claimed workloads:</td><td>—</td></tr>
    </table>
    <h4 class="flyout-section-title">Subscriptions</h4>
    <table class="flyout-info-table">
      <tr><td>Sku Name</td><td>Status</td></tr>
      <tr><td>WINDOWS 10/11 ENTERPRISE E3</td><td>Active</td></tr>
      <tr><td>PROJECT PLAN 5</td><td>Active</td></tr>
      <tr><td>PROJECT PLAN 3</td><td>Active</td></tr>
      <tr><td>MICROSOFT TEAMS ROOMS PRO</td><td>Active</td></tr>
      <tr><td>MICROSOFT TEAMS SHARED DEVICES</td><td>Active</td></tr>
    </table>
  `;
}

function renderCopilotMauFlyout(data) {
  return `
    <p style="font-size:13px;color:#616161;margin-bottom:16px;">The total Copilot MAU encompassing licensed and unlicensed users. Additionally, included below is a breakdown of Copilot usage. Unless specified in the metric, MAU can include licensed and unlicensed users. <a href="#" style="color:#0078d4;">Learn more ↗</a></p>
    <table class="flyout-info-table">
      <tr><td><strong>Metric Name</strong></td><td><strong>MAU</strong></td></tr>
      <tr><td>All Copilot MAU</td><td>${data['All Copilot MAU'] || '—'}</td></tr>
      <tr><td>Free Copilot MAU (Unlicensed)</td><td>${data['Free Copilot Chat MAU (Unlicensed)'] || '—'}</td></tr>
      <tr><td>Copilot MAU (Licensed)</td><td>${data['Copilot MAU (Licensed)'] || '—'}</td></tr>
      <tr><td>Copilot in Teams</td><td>248</td></tr>
      <tr><td>Copilot in Outlook</td><td>4,850</td></tr>
      <tr><td>Copilot in Word</td><td>88</td></tr>
      <tr><td>Copilot in Excel</td><td>43</td></tr>
      <tr><td>Copilot in Powerpoint</td><td>67</td></tr>
      <tr><td>Copilot in Engage</td><td>Not available</td></tr>
      <tr><td>Copilot in OneNote</td><td>4</td></tr>
      <tr><td>Sales Copilot (CRM)</td><td>Not available</td></tr>
    </table>
  `;
}

function renderAgentsMauFlyout(data) {
  return `
    <p style="font-size:13px;color:#616161;margin-bottom:16px;">All Agents MAU provides the total usage of agents all up across any application and user. The table below gives a more granular breakdown of licensed, unlicensed, and agent MAU by extension/application type. <a href="#" style="color:#0078d4;">Learn more ↗</a></p>
    <table class="flyout-info-table">
      <tr><td><strong>Agent Extension Type</strong></td><td><strong>Licensed Agent MAU</strong></td></tr>
      <tr><td>All Up</td><td>13</td></tr>
      <tr><td>Agents in Copilot Chat</td><td>13</td></tr>
      <tr><td>Connectors</td><td>0</td></tr>
      <tr><td>Plugin (Actions)</td><td>0</td></tr>
      <tr><td>Custom Engine Copilot</td><td>4</td></tr>
    </table>
    <h4 class="flyout-section-title">Data Definitions</h4>
    <p style="font-size:12px;color:#616161;line-height:1.6;">
      <strong>Agents in Copilot Chat:</strong> Agents that appear within the Copilot Chat experience.<br><br>
      <strong>Connectors:</strong> Graph connectors that integrate external data sources into Microsoft Graph.<br><br>
      <strong>Plugin (Actions):</strong> Actions for an agent to interact with other systems.<br><br>
      <strong>Custom Engine Copilot:</strong> Fully custom Copilots built using Copilot Studio.
    </p>
  `;
}

// ═══════════════════════════════════════════════
// OCV FEEDBACK MODAL
// ═══════════════════════════════════════════════

function initOcvModal() {
  document.getElementById('ocvClose').addEventListener('click', closeOcvModal);
  document.getElementById('ocvCancel').addEventListener('click', closeOcvModal);
  document.getElementById('ocvOverlay').addEventListener('click', closeOcvModal);
  document.getElementById('ocvSubmit').addEventListener('click', submitFeedback);
}

function openOcvModal(reason, rowData, source) {
  const modal = document.getElementById('ocvModal');
  const overlay = document.getElementById('ocvOverlay');
  const reasonBadge = document.getElementById('ocvReasonBadge');
  const contextDetails = document.getElementById('ocvContextDetails');
  const columnsGrid = document.getElementById('ocvColumnsGrid');
  const columnsSection = document.getElementById('ocvColumnsSection');

  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');

  // Set reason badge
  const reasonLabels = {
    incorrect: 'Incorrect data',
    missing: 'Missing data',
    outdated: 'Outdated data',
    mismatch: "Data doesn't match my records",
    other: 'Other',
    general: 'General Feedback',
    positive: 'Positive Feedback',
    negative: 'Needs Improvement'
  };
  reasonBadge.textContent = reasonLabels[reason] || reason;
  reasonBadge.setAttribute('data-reason', reason);

  // Context
  if (source === 'general') {
    contextDetails.innerHTML = `
      <div class="ctx-item"><span class="ctx-key">Source:</span><span class="ctx-val">ASPX Platform — Overall Experience</span></div>
      <div class="ctx-item"><span class="ctx-key">Page:</span><span class="ctx-val">Growth Opportunities</span></div>
      <div class="ctx-item"><span class="ctx-key">Tab:</span><span class="ctx-val">${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} Opportunities</span></div>
    `;
    columnsSection.classList.add('hidden');
  } else if (rowData) {
    const tenantName = rowData['Tenant Name'] || '—';
    contextDetails.innerHTML = `
      <div class="ctx-item"><span class="ctx-key">Source:</span><span class="ctx-val">${source === 'flyout' ? 'Flyout Panel' : 'Data Table'}</span></div>
      <div class="ctx-item"><span class="ctx-key">Tab:</span><span class="ctx-val">${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} Opportunities</span></div>
      <div class="ctx-item"><span class="ctx-key">Tenant:</span><span class="ctx-val">${tenantName}</span></div>
    `;

    // Show columns grid with pre-captured data
    columnsSection.classList.remove('hidden');
    const columns = oppData[currentTab].columns;
    const displayCols = columns.slice(0, 12); // Show first 12 columns
    columnsGrid.innerHTML = displayCols.map(col => {
      const val = rowData[col] || '—';
      return `<div class="ocv-col-item"><div class="col-label">${col}</div><div class="col-value">${val}</div></div>`;
    }).join('');
  }

  // Reset textarea
  document.getElementById('ocvComments').value = '';
}

function closeOcvModal() {
  document.getElementById('ocvModal').classList.add('hidden');
  document.getElementById('ocvOverlay').classList.add('hidden');
}

function submitFeedback() {
  closeOcvModal();
  showToast();
}

function showToast() {
  const toast = document.getElementById('ocvToast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

// ═══════════════════════════════════════════════
// GLOBAL FEEDBACK (top-right nav button)
// ═══════════════════════════════════════════════

function initGlobalFeedback() {
  document.getElementById('globalFeedbackBtn').addEventListener('click', () => {
    openOcvModal('general', null, 'general');
  });
}
