// ══════════════════════════════════════════════
//  SAKAYPOINTS — app.js
// ══════════════════════════════════════════════

// ── ROUTE DATA ──
const CLASSES = {
  1: { label: 'Class 1', desc: 'Near Barangays',  color: '#3DBE7A', bg: 'rgba(61,190,122,0.12)', fareRange: '₱13–₱17' },
  2: { label: 'Class 2', desc: 'Far Barangays',   color: '#F5B800', bg: 'rgba(245,184,0,0.12)',  fareRange: '₱18–₱26' },
};

const ROUTES = [
  { name: 'Trancoville Jeep',              barangay: 'Trancoville',           fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Trancoville Modern Jeep',       barangay: 'Trancoville',           fare: 15, pts: 7,  cls: 1, type: 'modern'  },
  { name: 'Mines View Jeep',               barangay: 'Mines View',            fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Mines View Modern Jeep',        barangay: 'Mines View',            fare: 15, pts: 7,  cls: 1, type: 'modern'  },
  { name: 'Aurora Hill Jeep',              barangay: 'Aurora Hill',           fare: 15, pts: 8,  cls: 1, type: 'regular' },
  { name: 'Aurora Hill Modern Jeep',       barangay: 'Aurora Hill',           fare: 17, pts: 9,  cls: 1, type: 'modern'  },
  { name: 'Campo Sioco Jeep',              barangay: 'Campo Sioco',           fare: 14, pts: 6,  cls: 1, type: 'regular' },
  { name: 'Campo Sioco Modern Jeep',       barangay: 'Campo Sioco',           fare: 17, pts: 9,  cls: 1, type: 'modern'  },
  { name: 'Pacdal Jeep',                   barangay: 'Pacdal',                fare: 14, pts: 6,  cls: 1, type: 'regular' },
  { name: 'Pacdal Modern Jeep',            barangay: 'Pacdal',                fare: 17, pts: 9,  cls: 1, type: 'modern'  },
  { name: 'San Vicente/Poliwes Jeep',      barangay: 'San Vicente · Poliwes', fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'San Vicente/Poliwes Modern',    barangay: 'San Vicente · Poliwes', fare: 15, pts: 7,  cls: 1, type: 'modern'  },
  { name: 'Camp 7 Jeep',                   barangay: 'Camp 7',                fare: 15, pts: 8,  cls: 1, type: 'regular' },
  { name: 'Tam-Awan Village Jeep',         barangay: 'Tam-Awan Village',      fare: 15, pts: 8,  cls: 1, type: 'regular' },
  { name: 'Bakakeng Norte/Sur Jeep',       barangay: 'Bakakeng Norte/Sur',    fare: 15, pts: 8,  cls: 1, type: 'regular' },
  { name: 'Guisad Jeep',                   barangay: 'Guisad',                fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Brookside Jeep',                barangay: 'Brookside',             fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Apugan Jeep',                   barangay: 'Apugan',                fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Navy Base Jeep',                barangay: 'Navy Base',             fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Holy Ghost Jeep',               barangay: 'Holy Ghost',            fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'City Camp Jeep',                barangay: 'City Camp',             fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Dagsian Jeep',                  barangay: 'Dagsian',               fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Crystal Cave Jeep',             barangay: 'Crystal Cave',          fare: 13, pts: 5,  cls: 1, type: 'regular' },
  { name: 'Loakan Jeep',                   barangay: 'Loakan',                fare: 18, pts: 9,  cls: 2, type: 'regular' },
  { name: 'Loakan Modern Jeep',            barangay: 'Loakan',                fare: 20, pts: 10, cls: 2, type: 'modern'  },
  { name: 'Kias Jeep',                     barangay: 'Kias',                  fare: 22, pts: 11, cls: 2, type: 'regular' },
  { name: 'Kias Modern Jeep',              barangay: 'Kias',                  fare: 26, pts: 13, cls: 2, type: 'modern'  },
  { name: 'Asin Road Jeep',                barangay: 'Asin Road',             fare: 25, pts: 12, cls: 2, type: 'regular' },
];

// QR code payload format: "SAKAY|{route name}"
const QR_PREFIX = 'SAKAY|';

function ptsTierClass(pts, cls) { return cls === 1 ? 'pts-low' : 'pts-med'; }

// ── APP STATE ──
let points    = 2450;
let ridesUsed = 3;
const MAX_RIDES = 5;
let selectedIdx = 0;

let rideHistory = [
  { type: 'ride',  route: 'Loakan Modern Jeep',         fare: 20, pts: 10, modern: true,  time: 'Today, 10:45 AM'    },
  { type: 'ride',  route: 'Kias Jeep',                  fare: 22, pts: 11, modern: false, time: 'Today, 9:10 AM'     },
  { type: 'ride',  route: 'Trancoville Jeep',            fare: 13, pts: 5,  modern: false, time: 'Today, 8:22 AM'     },
  { type: 'spend', route: 'Redeemed: Jollibee Voucher', fare: null, pts: 3500, modern: false, time: 'Yesterday, 3:00 PM' },
  { type: 'ride',  route: 'Aurora Hill Modern Jeep',     fare: 17, pts: 9,  modern: true,  time: 'Yesterday, 7:30 AM' },
  { type: 'ride',  route: 'Mines View Modern Jeep',      fare: 15, pts: 7,  modern: true,  time: 'Mar 19, 6:15 AM'    },
  { type: 'ride',  route: 'Asin Road Jeep',              fare: 25, pts: 12, modern: false, time: 'Mar 18, 12:00 PM'   },
  { type: 'ride',  route: 'Camp 7 Jeep',                 fare: 15, pts: 8,  modern: false, time: 'Mar 18, 8:05 AM'    },
  { type: 'ride',  route: 'Kias Modern Jeep',            fare: 26, pts: 13, modern: true,  time: 'Mar 17, 2:30 PM'    },
  { type: 'ride',  route: 'Guisad Jeep',                 fare: 13, pts: 5,  modern: false, time: 'Mar 17, 7:00 AM'    },
];

// ── CAMERA STATE ──
let camStream      = null;
let scanLoopId     = null;
let scanCooldown   = false;   // prevents double-scanning same QR

// ── INIT ──
function init() {
  buildRouteDropdown();
  buildRouteReference();
  buildQRGrid();
  renderHistory();
  updateAllUI();
  updatePickerDisplay();
}

// ══════════════════════════════════════════════
//  CAMERA & QR SCANNING
// ══════════════════════════════════════════════

async function startCamera() {
  if (ridesUsed >= MAX_RIDES) { shakeLimitWarning(); return; }

  const video  = document.getElementById('camVideo');
  const idle   = document.getElementById('cameraIdle');
  const overlay = document.getElementById('vfOverlay');
  const statusBar = document.getElementById('camStatusBar');

  // Request rear camera
  try {
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 1280 } },
      audio: false
    });
  } catch (err) {
    showCameraError(err);
    return;
  }

  // Show video feed
  video.srcObject = camStream;
  await video.play();

  idle.style.display       = 'none';
  video.style.display      = 'block';
  overlay.style.display    = 'block';
  statusBar.style.display  = 'flex';

  document.getElementById('camStatusText').textContent = 'Scanning for QR code…';
  scanCooldown = false;
  startScanLoop();
}

function stopCamera() {
  if (camStream) {
    camStream.getTracks().forEach(t => t.stop());
    camStream = null;
  }
  if (scanLoopId) { cancelAnimationFrame(scanLoopId); scanLoopId = null; }

  const video   = document.getElementById('camVideo');
  const idle    = document.getElementById('cameraIdle');
  const overlay = document.getElementById('vfOverlay');
  const statusBar = document.getElementById('camStatusBar');

  video.srcObject      = null;
  video.style.display  = 'none';
  overlay.style.display   = 'none';
  statusBar.style.display = 'none';
  idle.style.display   = 'flex';

  // Remove any error state
  const wrap = document.getElementById('cameraWrap');
  wrap.querySelectorAll('.camera-error').forEach(e => e.remove());
  wrap.classList.remove('qr-found');
}

function startScanLoop() {
  const video  = document.getElementById('camVideo');
  const canvas = document.getElementById('camCanvas');
  const ctx    = canvas.getContext('2d', { willReadFrequently: true });

  function tick() {
    if (!camStream || scanCooldown) { scanLoopId = requestAnimationFrame(tick); return; }
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
      if (code) {
        handleQRCode(code.data);
      }
    }
    scanLoopId = requestAnimationFrame(tick);
  }
  scanLoopId = requestAnimationFrame(tick);
}

function handleQRCode(data) {
  if (scanCooldown) return;
  if (!data.startsWith(QR_PREFIX)) {
    // Not a SakayPoints QR — flash status
    document.getElementById('camStatusText').textContent = '⚠️ Not a SakayPoints QR code';
    setTimeout(() => {
      if (document.getElementById('camStatusText'))
        document.getElementById('camStatusText').textContent = 'Scanning for QR code…';
    }, 2000);
    return;
  }

  const routeName = data.slice(QR_PREFIX.length);
  const route = ROUTES.find(r => r.name === routeName);

  if (!route) {
    document.getElementById('camStatusText').textContent = '⚠️ Unknown route QR';
    setTimeout(() => {
      if (document.getElementById('camStatusText'))
        document.getElementById('camStatusText').textContent = 'Scanning for QR code…';
    }, 2000);
    return;
  }

  // Valid QR — award points
  scanCooldown = true;
  document.getElementById('cameraWrap').classList.add('qr-found');

  // Auto-select the scanned route in picker
  const idx = ROUTES.indexOf(route);
  selectedIdx = idx;
  updatePickerDisplay();
  buildRouteDropdown();

  setTimeout(() => {
    stopCamera();
    earnPoints(route);
    document.getElementById('cameraWrap').classList.remove('qr-found');
    scanCooldown = false;
  }, 400);
}

function showCameraError(err) {
  const idle = document.getElementById('cameraIdle');
  idle.style.display = 'none';

  const wrap = document.getElementById('cameraWrap');
  const existing = wrap.querySelector('.camera-error');
  if (existing) existing.remove();

  let msg = 'Could not access camera.';
  if (err.name === 'NotAllowedError')   msg = 'Camera permission denied. Please allow camera access in your browser settings.';
  if (err.name === 'NotFoundError')     msg = 'No camera found on this device.';
  if (err.name === 'NotSupportedError') msg = 'Camera not supported on this browser. Try Chrome or Safari.';

  const el = document.createElement('div');
  el.className = 'camera-error';
  el.innerHTML = `
    <div class="camera-error-icon">📷</div>
    <div class="camera-error-msg">${msg}</div>
    <button class="camera-retry-btn" onclick="retryCameraStart()">Try Again</button>
  `;
  wrap.appendChild(el);
}

function retryCameraStart() {
  const wrap = document.getElementById('cameraWrap');
  wrap.querySelectorAll('.camera-error').forEach(e => e.remove());
  document.getElementById('cameraIdle').style.display = 'flex';
  startCamera();
}

// ══════════════════════════════════════════════
//  EARN POINTS (shared between camera scan & any future triggers)
// ══════════════════════════════════════════════
function earnPoints(route) {
  if (ridesUsed >= MAX_RIDES) { shakeLimitWarning(); return; }
  const c = CLASSES[route.cls];
  const isModern = route.type === 'modern';
  ridesUsed++;
  points += route.pts;

  const d = new Date(); let h = d.getHours(), m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  rideHistory.unshift({
    type: 'ride', route: route.name, fare: route.fare,
    pts: route.pts, modern: isModern,
    time: `Today, ${h}:${String(m).padStart(2,'0')} ${ampm}`
  });

  document.getElementById('successPts').textContent      = `+${route.pts} PTS`;
  document.getElementById('successRoute').textContent    = route.name;
  document.getElementById('successKm').textContent       = `${c.label} · ₱${route.fare} fare · ${route.barangay}`;
  document.getElementById('successJeepIcon').textContent = isModern ? '🚐' : '🚌';
  document.getElementById('scanSuccess').classList.add('show');

  updateAllUI();
  renderHistory();
}

function dismissSuccess() {
  document.getElementById('scanSuccess').classList.remove('show');
}

function shakeLimitWarning() {
  const w = document.querySelector('.limit-warning');
  w.style.animation = 'none'; w.offsetHeight; w.style.animation = 'shake 0.4s ease';
}

// ══════════════════════════════════════════════
//  QR SHEET (driver-side printable QR codes)
// ══════════════════════════════════════════════
function buildQRGrid() {
  const grid = document.getElementById('qrGrid');
  grid.innerHTML = '';

  ROUTES.forEach(r => {
    const payload = QR_PREFIX + r.name;
    const card = document.createElement('div');
    card.className = 'qr-card';

    const modernChip = r.type === 'modern'
      ? `<span class="qr-modern-chip">MODERN</span>` : '';

    card.innerHTML = `
      <div class="qr-code-wrap" id="qr-${r.name.replace(/[^a-z0-9]/gi,'_')}"></div>
      <div class="qr-route-name">${r.name}${modernChip}</div>
      <div class="qr-route-fare">₱${r.fare} fare · +${r.pts} pts</div>
    `;
    grid.appendChild(card);

    // Generate QR after DOM insert
    setTimeout(() => {
      const wrap = card.querySelector('.qr-code-wrap');
      if (wrap && typeof QRCode !== 'undefined') {
        new QRCode(wrap, {
          text: payload,
          width: 160, height: 160,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M,
        });
      }
    }, 0);
  });
}

function openQRSheet() {
  document.getElementById('qrSheetBackdrop').classList.add('open');
  document.getElementById('qrSheet').classList.add('open');
}

function closeQRSheet() {
  document.getElementById('qrSheetBackdrop').classList.remove('open');
  document.getElementById('qrSheet').classList.remove('open');
}

// ══════════════════════════════════════════════
//  ROUTE PICKER
// ══════════════════════════════════════════════
function buildRouteDropdown() {
  let html = '';
  [1, 2].forEach(cls => {
    const c = CLASSES[cls];
    html += `<div style="padding:8px 18px 4px;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;letter-spacing:2px;color:${c.color};text-transform:uppercase;background:${c.bg};border-bottom:1px solid rgba(255,255,255,0.04)">${c.label} — ${c.desc}</div>`;
    ROUTES.filter(r => r.cls === cls).forEach(r => {
      const i = ROUTES.indexOf(r);
      const isModern = r.type === 'modern';
      const badge = isModern ? `<span style="font-size:9px;font-family:'Barlow Condensed',sans-serif;font-weight:700;color:#fff;background:#3A9BDC;border-radius:4px;padding:1px 5px;margin-left:5px">MODERN</span>` : '';
      html += `<div class="route-option${i === selectedIdx ? ' selected' : ''}" onclick="selectRoute(${i})">
        <div class="ro-left">
          <span style="font-size:18px">${isModern ? '🚐' : '🚌'}</span>
          <div>
            <div class="ro-name" style="display:flex;align-items:center;gap:2px">${r.name}${badge}</div>
            <div class="ro-km" style="color:${c.color};opacity:0.8">${r.barangay} · ₱${r.fare} fare</div>
          </div>
        </div>
        <span class="ro-pts-badge ${ptsTierClass(r.pts, r.cls)}">+${r.pts} pts</span>
      </div>`;
    });
  });
  document.getElementById('routeDropdown').innerHTML = html;
}

function togglePicker() {
  const btn = document.getElementById('routePickerBtn');
  const dd  = document.getElementById('routeDropdown');
  const open = dd.classList.toggle('open');
  btn.classList.toggle('open', open);
}

function selectRoute(idx) {
  selectedIdx = idx;
  document.querySelectorAll('.route-option').forEach((el, i) => el.classList.toggle('selected', i === idx));
  document.getElementById('routeDropdown').classList.remove('open');
  document.getElementById('routePickerBtn').classList.remove('open');
  updatePickerDisplay();
}

function updatePickerDisplay() {
  const r = ROUTES[selectedIdx];
  const c = CLASSES[r.cls];
  const isModern = r.type === 'modern';
  document.getElementById('pickerRouteIcon').textContent = isModern ? '🚐' : '🚌';
  document.getElementById('pickerRouteName').textContent = r.name;
  document.getElementById('pickerRoutePts').textContent  = `+${r.pts} PTS`;
  document.getElementById('previewPts').textContent      = `+${r.pts} PTS`;
  document.getElementById('previewRoute').textContent    = r.name;
  document.getElementById('previewKm').textContent       = `${c.label} · ₱${r.fare} fare · ${r.barangay}`;
}

// ══════════════════════════════════════════════
//  UPDATE UI
// ══════════════════════════════════════════════
function updateAllUI() {
  ['homePoints','rewardsPoints'].forEach(id => document.getElementById(id).textContent = points.toLocaleString());

  document.querySelectorAll('#homeRideDots .ride-dot').forEach((d,i) => d.classList.toggle('filled', i < ridesUsed));
  document.getElementById('homeDailyCount').textContent = `${ridesUsed} / 5`;
  const rem = MAX_RIDES - ridesUsed;
  document.getElementById('homeRidesSub').textContent = rem > 0
    ? `${rem} more ride${rem > 1 ? 's' : ''} available today • Resets midnight`
    : 'Daily limit reached • Resets midnight 🌙';

  document.querySelectorAll('#scanDots .slb-dot').forEach((d,i) => d.classList.toggle('filled', i < ridesUsed));
  const sc = document.getElementById('scanLimitCount');
  sc.textContent = `${ridesUsed} / 5`;
  sc.style.color = ridesUsed >= 5 ? 'var(--red)' : 'var(--gold)';

  document.getElementById('tierBarText').textContent = `${points.toLocaleString()} / 3,000 pts needed`;

  // If limit reached, disable camera start
  const startBtn = document.getElementById('cameraStartBtn');
  if (startBtn) {
    startBtn.disabled = ridesUsed >= MAX_RIDES;
    startBtn.style.opacity = ridesUsed >= MAX_RIDES ? '0.5' : '1';
  }
}

// ══════════════════════════════════════════════
//  RENDER HISTORY
// ══════════════════════════════════════════════
function renderHistory() {
  document.getElementById('homeRidesList').innerHTML = rideHistory.slice(0,6).map(item => {
    const isRide = item.type === 'ride';
    return `<div class="ride-item">
      <div class="ride-icon">${isRide ? (item.modern ? '🚐' : '🚌') : '🎁'}</div>
      <div class="ride-info">
        <div class="ride-route">${item.route}</div>
        <div class="ride-time">${item.time}${isRide && item.fare ? ` · ₱${item.fare}` : ''}</div>
      </div>
      <div class="ride-pts" style="${isRide ? '' : 'color:var(--muted)'}">
        ${isRide ? `+${item.pts} pts` : `−${item.pts} pts`}
      </div>
    </div>`;
  }).join('') + '<div style="height:16px"></div>';

  document.getElementById('historyList').innerHTML = rideHistory.map(item => {
    const isRide = item.type === 'ride';
    return `<div class="history-item">
      <div class="hist-icon ${isRide ? 'jeep' : 'redeem'}">${isRide ? (item.modern ? '🚐' : '🚌') : '🎁'}</div>
      <div class="hist-info">
        <div class="hist-route">${item.route}</div>
        <div class="hist-time">${item.time}${isRide && item.fare ? ` · ₱${item.fare} fare` : ''}</div>
      </div>
      <div class="hist-pts ${isRide ? 'earn' : 'spend'}">${isRide ? `+${item.pts}` : `−${item.pts}`}</div>
    </div>`;
  }).join('');

  const earned = rideHistory.filter(x=>x.type==='ride').reduce((s,x)=>s+x.pts,0);
  const spent  = rideHistory.filter(x=>x.type==='spend').reduce((s,x)=>s+x.pts,0);
  document.getElementById('histTotalRides').textContent = rideHistory.filter(x=>x.type==='ride').length;
  document.getElementById('histPtsEarned').textContent  = earned.toLocaleString();
  document.getElementById('histPtsSpent').textContent   = spent.toLocaleString();
}

// ══════════════════════════════════════════════
//  ROUTE REFERENCE (Profile)
// ══════════════════════════════════════════════
function buildRouteReference() {
  let html = '';
  [1, 2].forEach(cls => {
    const c = CLASSES[cls];
    html += `<div style="padding:10px 18px 6px;background:${c.bg};display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.06)">
      <span style="font-size:14px">${cls===1?'🟢':'🟡'}</span>
      <div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;color:${c.color}">${c.label.toUpperCase()} — ${c.fareRange}</div>
        <div style="font-size:11px;color:var(--muted)">${c.desc}</div>
      </div>
    </div>`;
    ROUTES.filter(r => r.cls === cls).forEach(r => {
      const isModern = r.type === 'modern';
      const badge = isModern ? `<span style="font-size:9px;font-family:'Barlow Condensed',sans-serif;font-weight:700;color:#fff;background:#3A9BDC;border-radius:4px;padding:1px 5px;margin-left:5px;vertical-align:middle">MODERN</span>` : '';
      html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-bottom:1px solid rgba(255,255,255,0.03)">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:15px">${isModern ? '🚐' : '🚌'}</span>
          <div>
            <div style="font-size:13px;font-weight:500">${r.name}${badge}</div>
            <div style="font-size:11px;color:var(--muted)">${r.barangay} · ₱${r.fare} fare</div>
          </div>
        </div>
        <span class="ro-pts-badge ${ptsTierClass(r.pts, r.cls)}" style="font-family:'Bebas Neue',sans-serif;font-size:15px">+${r.pts} pts</span>
      </div>`;
    });
  });
  document.getElementById('routeReference').innerHTML = html;
}

// ══════════════════════════════════════════════
//  REDEEM
// ══════════════════════════════════════════════
function redeemItem(btn, cost, name) {
  if (points < cost) {
    btn.textContent = 'Not enough!'; btn.classList.add('disabled');
    setTimeout(() => { btn.textContent = 'Redeem'; btn.classList.remove('disabled'); }, 2000);
    return;
  }
  points -= cost;
  rideHistory.unshift({ type: 'spend', route: `Redeemed: ${name}`, pts: cost, modern: false, fare: null, time: 'Just now' });
  updateAllUI(); renderHistory();
  btn.textContent = '✓ Done!'; btn.style.background = 'var(--green)';
  setTimeout(() => { btn.textContent = 'Redeem'; btn.style.background = ''; }, 2500);
}

// ══════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════
function switchTab(id, btn) {
  // Stop camera when leaving scan tab
  if (id !== 'scan') stopCamera();

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');

  if (id !== 'scan') {
    document.getElementById('routeDropdown').classList.remove('open');
    document.getElementById('routePickerBtn').classList.remove('open');
  }
}

function goToScan() { switchTab('scan', document.querySelectorAll('.nav-item')[1]); }

// ── Shake keyframe ──
const _s = document.createElement('style');
_s.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}`;
document.head.appendChild(_s);

init();
