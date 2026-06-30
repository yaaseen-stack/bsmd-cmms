import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, ClipboardList, CalendarClock, Boxes, Building2, FileText,
  Plus, AlertTriangle, CheckCircle2, Clock, X, Search, Trash2,
  Printer, ShieldCheck, ChevronRight, Camera,
  Inbox, Phone, Mail, MessageCircle, Share2, AtSign, QrCode, Globe,
  DoorOpen, Send, ArrowRightCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";

/* =========================================================================
   One Realty BSMD — Facilities-Management App (CMMS)
   Single-file build. Operationalises BSMD Operations Manual ORL-FM-SOP-001 v2.0.
   ========================================================================= */

/* ---------- Brand tokens ---------- */
const TEAL = "#0E3D34";   // brand deep teal-green
const GREEN = "#40B974";
const LOGO_SRC = "data:image/png;base64,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";
const AMBER = "#E0A82E";
const RED = "#DC2626";
const INK = "#1E293B";
const MUTED = "#64748B";
const LINE = "#E2E8F0";
const BG = "#F6F8FA";

/* ---------- Domain config ---------- */
const PRIORITIES = ["Emergency", "Urgent", "Normal", "Planned"];
const WO_STATUSES = ["Logged", "Assigned", "In Progress", "On Hold", "Completed", "Signed Off"];
const ASSET_CATS = ["HVAC", "Electrical", "Plumbing", "Fire & Safety", "Lift", "Generator", "Pump", "Other"];

// Maldives weekend (Fri, Sat). getDay(): 0 Sun .. 6 Sat. Change here if needed.
const WEEKEND = [5, 6];

// SLA matrix from the manual's client service-level table (Part 15.6 / Part 5.5).
const SLA = {
  Emergency: { responseMins: 30, resolution: { kind: "mins", value: 30 }, label: "30 min response · immediate make-safe" },
  Urgent: { responseMins: 120, resolution: { kind: "hours", value: 24 }, label: "2 h response · 24 h resolution" },
  Normal: { responseMins: 480, resolution: { kind: "workdays", value: 3 }, label: "8 h response · 3 working days" },
  Planned: { responseMins: null, resolution: { kind: "scheduled" }, label: "Scheduled · as agreed" },
};

// Per-sq-ft management-fee tiers (MVR / sq ft / month) and floor (Part 15.6).
const FEE_FLOOR = 12000;
function feeRate(area) {
  if (area == null) return null;
  if (area <= 10000) return 2.0;
  if (area <= 30000) return 1.85;
  if (area <= 50000) return 1.7;
  return null; // negotiable
}
function monthlyFee(b) {
  if (b.contract_type === "per_unit") return b.monthly_fee_mvr || 0;
  const rate = feeRate(b.managed_area_sqft);
  if (rate == null) return b.monthly_fee_mvr || 0; // >50k → manual entry
  return Math.max(Math.round(b.managed_area_sqft * rate), FEE_FLOOR);
}

// Chargeable markup defaults (Part 15.6).
const MARKUP = { Materials: 15, Equipment: 15, Specialist: 15, Certification: 0, Labour: 0 };
const CHARGE_CATS = ["Materials", "Equipment", "Specialist", "Certification", "Labour"];

// Intake channels for the help desk / ticketing layer (Part 5 — Help Desk & Service Management).
const CHANNELS = ["Phone", "Email", "WhatsApp", "Facebook", "Instagram", "QR Code", "Walk-in", "Web Portal"];
const CHANNEL_META = {
  "Phone": { icon: Phone, color: "#0F766E" },
  "Email": { icon: Mail, color: "#2563EB" },
  "WhatsApp": { icon: MessageCircle, color: "#25D366" },
  "Facebook": { icon: Share2, color: "#1877F2" },
  "Instagram": { icon: AtSign, color: "#C13584" },
  "QR Code": { icon: QrCode, color: GREEN },
  "Walk-in": { icon: DoorOpen, color: "#64748B" },
  "Web Portal": { icon: Globe, color: TEAL },
};
const TICKET_STATUSES = ["New", "Acknowledged", "Converted", "Rejected"];
const ticketStatusColor = (s) => s === "Converted" ? GREEN : s === "Acknowledged" ? "#2563EB" : s === "Rejected" ? MUTED : AMBER;

// Numbering helpers
const pad4 = (n) => String(n).padStart(4, "0");
const yr = () => new Date().getFullYear();
const woNumber = (n) => `ORL-FM-WO-${yr()}-${pad4(n)}`;
const reqNumber = (n) => `ORL-FM-REQ-${yr()}-${pad4(n)}`;

// Preventive-maintenance checklists (Appendix D, CHK-001..005).
const CHECKLISTS = {
  "CHK-001": {
    title: "Daily HVAC Checklist", freq: "Daily", cat: "HVAC",
    items: ["Thermostat display functioning", "Airflow strong and even", "Filters clean and in place",
      "Condensate drain clear — no overflow", "No unusual noise or vibration", "Outdoor unit clean, fan spinning",
      "Refrigerant lines — no frost or oil", "Pressures within normal range"],
  },
  "CHK-002": {
    title: "Weekly Plumbing Checklist", freq: "Weekly", cat: "Plumbing",
    items: ["No visible leaks at fixtures", "Pump pressure within range", "Drains flowing freely",
      "Water tank level normal", "Booster pump cycling correctly", "No water hammer / noise"],
  },
  "CHK-003": {
    title: "Monthly Electrical Checklist", freq: "Monthly", cat: "Electrical",
    items: ["DB panel free of heat / smell", "Breaker labelling correct", "Emergency lights tested",
      "Earthing connections intact", "Phase load balanced", "No exposed / damaged cabling"],
  },
  "CHK-004": {
    title: "Quarterly Utility Checklist", freq: "Quarterly", cat: "Generator",
    items: ["Generator starts on test", "Fuel level adequate, no water", "Lift safety brake test",
      "Fire pump runs and builds pressure", "Water tank cleaned / disinfected this cycle", "Sewage pump auto-start works"],
  },
  "CHK-005": {
    title: "Annual Compliance Checklist", freq: "Annual", cat: "Fire & Safety",
    items: ["Fire-alarm panel certified", "Lift statutory inspection valid", "Generator load test certificate",
      "Electrical installation test certificate", "Water-quality test report on file", "Asset register reconciled"],
  },
};

/* ---------- Users (role demo; no real auth in this build) ---------- */
const USERS = [
  { id: "u1", name: "Yaaseen Rafeeu", role: "Manager" },
  { id: "u2", name: "Isura Basnayake", role: "Supervisor" },
  { id: "u3", name: "Ali Naseer", role: "Technician", trade: "HVAC" },
  { id: "u4", name: "Rifau Hassan", role: "Technician", trade: "Electrical" },
  { id: "u5", name: "Documentation Officer", role: "Admin" },
  { id: "u6", name: "Resident / Client", role: "Client" },
];
const can = {
  createWO: (r) => ["Manager", "Supervisor", "Admin"].includes(r),
  manage: (r) => ["Manager", "Admin"].includes(r),
  signOff: (r) => ["Manager", "Supervisor"].includes(r),
  reports: (r) => ["Manager", "Supervisor", "Admin"].includes(r),
};

/* ---------- Date helpers ---------- */
const DAY = 86400000;
const now = () => Date.now();
const addMins = (t, m) => t + m * 60000;
const addDays = (t, d) => t + d * DAY;
function addMonths(t, n) { const d = new Date(t); d.setMonth(d.getMonth() + n); return d.getTime(); }
function addYears(t, n) { const d = new Date(t); d.setFullYear(d.getFullYear() + n); return d.getTime(); }
function addWorkdays(t, n) {
  let d = new Date(t), added = 0;
  while (added < n) { d = new Date(d.getTime() + DAY); if (!WEEKEND.includes(d.getDay())) added++; }
  return d.getTime();
}
function advance(t, freq) {
  if (freq === "Daily") return addDays(t, 1);
  if (freq === "Weekly") return addDays(t, 7);
  if (freq === "Monthly") return addMonths(t, 1);
  if (freq === "Quarterly") return addMonths(t, 3);
  if (freq === "Annual") return addYears(t, 1);
  return addDays(t, 1);
}
const fmtDate = (t) => t ? new Date(t).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const fmtDT = (t) => t ? new Date(t).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
function humanLeft(target) {
  if (target == null) return "—";
  const diff = target - now();
  const past = diff < 0; const a = Math.abs(diff);
  const h = Math.floor(a / 3600000), m = Math.floor((a % 3600000) / 60000);
  const s = h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : h >= 1 ? `${h}h ${m}m` : `${m}m`;
  return past ? `${s} overdue` : `${s} left`;
}

/* ---------- SLA computation ---------- */
function computeDue(priority, createdAt) {
  const cfg = SLA[priority];
  const responseDue = cfg.responseMins == null ? null : addMins(createdAt, cfg.responseMins);
  let resolutionDue = null;
  const r = cfg.resolution;
  if (r.kind === "mins") resolutionDue = addMins(createdAt, r.value);
  else if (r.kind === "hours") resolutionDue = addMins(createdAt, r.value * 60);
  else if (r.kind === "workdays") resolutionDue = addWorkdays(createdAt, r.value);
  return { responseDue, resolutionDue };
}
function slaState(wo) {
  // Response missed: responded after the target, or no response yet and target already passed.
  const respMiss = wo.response_due_at != null &&
    (wo.responded_at != null ? wo.responded_at > wo.response_due_at : now() > wo.response_due_at);
  // Resolution missed: completed after the target, or not yet complete and target already passed.
  const endRef = wo.completed_at != null ? wo.completed_at : now();
  const resMiss = wo.resolution_due_at != null && endRef > wo.resolution_due_at;
  return { respMiss, resMiss };
}

// Collision-resistant id generator (replaces Date.now()-based ids).
const uid = (p = "") => p + ((typeof crypto !== "undefined" && crypto.randomUUID)
  ? crypto.randomUUID().slice(0, 12)
  : Date.now().toString(36) + Math.random().toString(36).slice(2, 8));

/* ---------- Storage layer (persistent across sessions) ---------- */
const KEY = "bsmd:data:v1";
const mem = {};
const store = {
  async get(k) {
    try { if (typeof window !== "undefined" && window.storage) { const r = await window.storage.get(k); return r ? r.value : null; } }
    catch (e) { /* missing key throws */ }
    return k in mem ? mem[k] : null;
  },
  // Returns true if the value is safely persisted (or held for the session when no storage API exists),
  // false only when a real storage write fails (e.g. quota) so the UI can warn instead of losing data silently.
  async set(k, v) {
    mem[k] = v;
    try {
      if (typeof window !== "undefined" && window.storage) { await window.storage.set(k, v, false); }
      return true;
    } catch (e) {
      return false;
    }
  },
};

/* ---------- Seed data ---------- */
function seedTickets(t) {
  const tk = (o) => ({ status: "New", acknowledged_at: null, work_order_id: null, asset_id: null, photos: [], ...o });
  const tickets = [
    tk({ id: "t1", ticket_no: "ORL-FM-REQ-2026-0001", channel: "Phone", building_id: "b1", requester_name: "Unit 5B", requester_contact: "+960 777 8810", description: "Water leaking under the kitchen sink, getting worse since morning.", created_at: addMins(t, -40) }),
    tk({ id: "t2", ticket_no: "ORL-FM-REQ-2026-0002", channel: "Facebook", building_id: "b2", requester_name: "Aishath (FB)", requester_contact: "fb.com/aishath", description: "Lift is making a grinding noise on the way up. Is it safe?", created_at: addMins(t, -180) }),
    tk({ id: "t3", ticket_no: "ORL-FM-REQ-2026-0003", channel: "WhatsApp", building_id: "b3", requester_name: "Shop G-2", requester_contact: "+960 990 2231", description: "AC in the shop unit not cooling, customers complaining.", status: "Acknowledged", acknowledged_at: addMins(t, -90), created_at: addMins(t, -150) }),
    tk({ id: "t4", ticket_no: "ORL-FM-REQ-2026-0004", channel: "QR Code", building_id: "b1", asset_id: "a1", requester_name: "Lobby visitor", requester_contact: "—", description: "Lobby AC is dripping water onto the floor.", created_at: addMins(t, -20) }),
    tk({ id: "t5", ticket_no: "ORL-FM-REQ-2026-0005", channel: "Email", building_id: "b2", requester_name: "Building Owner", requester_contact: "owner@email.mv", description: "Please quote for quarterly pest control across all common areas.", created_at: addMins(t, -300) }),
  ];
  return { tickets, reqSeq: 5 };
}
function seed() {
  const t = now();
  const buildings = [
    { id: "b1", code: "RB", name: "Rose Berry Residences", client_name: "One Realty (own)", address: "Ameenee Magu, Malé", contract_type: "per_unit", package: "Medium", monthly_fee_mvr: 20000, managed_area_sqft: null, contact_name: "Front Desk", contact_phone: "+960 330 1135" },
    { id: "b2", code: "MV", name: "Maafannu View Apartments", client_name: "Private Owner", address: "Maafannu, Malé", contract_type: "mgmt_fee", monthly_fee_mvr: null, managed_area_sqft: 18000, contact_name: "Hassan", contact_phone: "+960 777 1234" },
    { id: "b3", code: "SC", name: "Sea Cliff Commercial", client_name: "Sea Cliff Pvt Ltd", address: "Boduthakurufaanu Magu", contract_type: "mgmt_fee", monthly_fee_mvr: null, managed_area_sqft: 7500, contact_name: "Operations", contact_phone: "+960 779 5566" },
  ];
  const assets = [
    { id: "a1", asset_code: "ORL-RB-HVAC-001", building_id: "b1", category: "HVAC", make_model: "Daikin 2.0T Cassette", location: "Lobby", install_date: addYears(t, -3), expected_life_years: 8, status: "active" },
    { id: "a2", asset_code: "ORL-RB-HVAC-002", building_id: "b1", category: "HVAC", make_model: "Midea 1.5T Split", location: "Unit 3A", install_date: addYears(t, -2), expected_life_years: 8, status: "active" },
    { id: "a3", asset_code: "ORL-RB-ELEC-001", building_id: "b1", category: "Electrical", make_model: "Main DB Panel", location: "Plant room", install_date: addYears(t, -3), expected_life_years: 15, status: "active" },
    { id: "a4", asset_code: "ORL-RB-PLMB-001", building_id: "b1", category: "Pump", make_model: "Grundfos Booster", location: "Pump room", install_date: addYears(t, -7), expected_life_years: 8, status: "active" },
    { id: "a5", asset_code: "ORL-MV-LIFT-001", building_id: "b2", category: "Lift", make_model: "Mitsubishi 8-pax", location: "Core", install_date: addYears(t, -5), expected_life_years: 15, status: "active" },
    { id: "a6", asset_code: "ORL-MV-GEN-001", building_id: "b2", category: "Generator", make_model: "Cummins 60kVA", location: "Roof", install_date: addYears(t, -4), expected_life_years: 12, status: "active" },
    { id: "a7", asset_code: "ORL-MV-FIRE-001", building_id: "b2", category: "Fire & Safety", make_model: "Addressable FA Panel", location: "Lobby", install_date: addYears(t, -4), expected_life_years: 10, status: "active" },
    { id: "a8", asset_code: "ORL-SC-HVAC-001", building_id: "b3", category: "HVAC", make_model: "Ducted AHU Zone 1", install_date: addYears(t, -2), location: "Ceiling void", expected_life_years: 10, status: "active" },
    { id: "a9", asset_code: "ORL-SC-ELEC-001", building_id: "b3", category: "Electrical", make_model: "Sub-DB Ground", location: "Riser", install_date: addYears(t, -2), expected_life_years: 15, status: "active" },
    { id: "a10", asset_code: "ORL-SC-PUMP-001", building_id: "b3", category: "Pump", make_model: "Sewage Pump", location: "Basement", install_date: addYears(t, -6), expected_life_years: 7, status: "fault" },
  ];
  const pm = [
    { id: "p1", building_id: "b1", asset_id: "a1", checklist_code: "CHK-001", freq: "Daily", next_due: addDays(t, -1), last_done: addDays(t, -2), active: true },
    { id: "p2", building_id: "b1", asset_id: "a4", checklist_code: "CHK-002", freq: "Weekly", next_due: addDays(t, -1), last_done: addDays(t, -8), active: true },
    { id: "p3", building_id: "b1", asset_id: "a3", checklist_code: "CHK-003", freq: "Monthly", next_due: addDays(t, 4), last_done: addDays(t, -26), active: true },
    { id: "p4", building_id: "b2", asset_id: "a6", checklist_code: "CHK-004", freq: "Quarterly", next_due: addDays(t, 6), last_done: addMonths(t, -3), active: true },
    { id: "p5", building_id: "b2", asset_id: "a7", checklist_code: "CHK-005", freq: "Annual", next_due: addDays(t, 20), last_done: addYears(t, -1), active: true },
    { id: "p6", building_id: "b3", asset_id: "a8", checklist_code: "CHK-001", freq: "Daily", next_due: addDays(t, -1), last_done: addDays(t, -2), active: true },
  ];
  let seq = 0;
  const wn = () => `ORL-FM-WO-${new Date(t).getFullYear()}-${String(++seq).padStart(4, "0")}`;
  const mk = (o) => { const d = computeDue(o.priority, o.created_at); return { wo_no: wn(), photos: [], chargeables: [], ...o, response_due_at: d.responseDue, resolution_due_at: d.resolutionDue }; };
  const workOrders = [
    mk({ id: "w1", building_id: "b3", asset_id: "a10", type: "Emergency", priority: "Emergency", status: "In Progress", title: "Sewage pump tripped — basement flooding risk", description: "Pump not auto-starting, water rising in sump.", reported_by: "Site call", assigned_to: "u4", created_at: addMins(t, -25), responded_at: addMins(t, -10), completed_at: null }),
    mk({ id: "w2", building_id: "b2", asset_id: "a5", type: "Corrective", priority: "Urgent", status: "Assigned", title: "Lift door re-opening intermittently", description: "Door sensor fault reported by resident.", reported_by: "Resident", assigned_to: "u3", created_at: addMins(t, -90), responded_at: addMins(t, -70), completed_at: null }),
    mk({ id: "w3", building_id: "b1", asset_id: "a2", type: "Corrective", priority: "Normal", status: "Signed Off", title: "Unit 3A AC not cooling", description: "Low gas; recharged and leak-checked.", reported_by: "Resident", assigned_to: "u3", created_at: addDays(t, -3), responded_at: addDays(t, -3) + 3600000, completed_at: addDays(t, -2), signed_off_by: "u2",
      chargeables: [
        { id: "c1", category: "Materials", description: "R32 refrigerant + drier", cost_mvr: 1200, markup_pct: 15 },
        { id: "c2", category: "Labour", description: "2 hr recharge + leak test", cost_mvr: 600, markup_pct: 0 },
      ] }),
    mk({ id: "w4", building_id: "b1", asset_id: "a3", type: "Corrective", priority: "Normal", status: "Completed", title: "DB panel hotspot on thermal scan", description: "Loose neutral lug; re-torqued.", reported_by: "PM finding", assigned_to: "u4", created_at: addDays(t, -1), responded_at: addDays(t, -1) + 5400000, completed_at: addMins(t, -120),
      chargeables: [{ id: "c3", category: "Specialist", description: "Thermography contractor", cost_mvr: 1800, markup_pct: 15 }] }),
  ];
  const tk = seedTickets(now());
  return { buildings, assets, pmSchedules: pm, workOrders, tickets: tk.tickets, reqSeq: tk.reqSeq, seq };
}

/* ---------- PM auto-generation ---------- */
function generatePM(data) {
  const t = now();
  let seq = data.seq || 0;
  const wos = [...data.workOrders];
  const pm = data.pmSchedules.map((s) => {
    if (!s.active) return s;
    let sched = { ...s };
    // create one WO if due and none already open for this cycle
    if (sched.next_due <= t) {
      const exists = wos.some((w) => w.pm_id === sched.id && !["Completed", "Signed Off"].includes(w.status));
      if (!exists) {
        const cl = CHECKLISTS[sched.checklist_code];
        const created = sched.next_due;
        const due = computeDue("Planned", created);
        seq += 1;
        wos.push({
          id: "w_pm_" + sched.id + "_" + seq, wo_no: `ORL-FM-WO-${new Date(t).getFullYear()}-${String(seq).padStart(4, "0")}`,
          building_id: sched.building_id, asset_id: sched.asset_id, pm_id: sched.id,
          type: "Preventive", priority: "Planned", status: "Logged",
          title: `${cl.title} — due`, description: `Scheduled ${sched.freq.toLowerCase()} preventive maintenance (${sched.checklist_code}).`,
          reported_by: "PM scheduler", assigned_to: null, created_at: created,
          response_due_at: due.responseDue, resolution_due_at: due.resolutionDue,
          responded_at: null, completed_at: null, photos: [], chargeables: [], checklist: null,
        });
        let nd = advance(sched.next_due, sched.freq);
        while (nd <= t) nd = advance(nd, sched.freq);
        sched.next_due = nd;
      }
    }
    return sched;
  });
  return { ...data, workOrders: wos, pmSchedules: pm, seq };
}

/* ---------- Small UI primitives ---------- */
function Badge({ children, color = MUTED, solid = false }) {
  return <span style={{
    background: solid ? color : color + "1A", color: solid ? "#fff" : color,
    border: `1px solid ${color}33`, padding: "2px 8px", borderRadius: 999,
    fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block",
  }}>{children}</span>;
}
const priColor = (p) => p === "Emergency" ? RED : p === "Urgent" ? AMBER : p === "Normal" ? "#2563EB" : GREEN;
const statusColor = (s) => s === "Signed Off" ? GREEN : s === "Completed" ? "#16A34A" : s === "In Progress" ? "#2563EB" : s === "On Hold" ? AMBER : s === "Assigned" ? TEAL : MUTED;

function Btn({ children, onClick, kind = "primary", disabled, small, type = "button" }) {
  const styles = {
    primary: { background: GREEN, color: "#fff", border: "none" },
    navy: { background: TEAL, color: "#fff", border: "none" },
    ghost: { background: "#fff", color: INK, border: `1px solid ${LINE}` },
    danger: { background: "#fff", color: RED, border: `1px solid ${RED}55` },
  }[kind];
  return <button type={type} onClick={onClick} disabled={disabled} style={{
    ...styles, padding: small ? "5px 10px" : "9px 14px", borderRadius: 8, fontWeight: 600,
    fontSize: small ? 12 : 14, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
    display: "inline-flex", alignItems: "center", gap: 6,
  }}>{children}</button>;
}
function Card({ children, style }) {
  return <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 12, ...style }}>{children}</div>;
}
function Field({ label, children }) {
  return <label style={{ display: "block", marginBottom: 12 }}>
    <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 4 }}>{label}</span>
    {children}
  </label>;
}
const inputStyle = { width: "100%", padding: "9px 10px", borderRadius: 8, border: `1px solid ${LINE}`, fontSize: 14, color: INK, background: "#fff", boxSizing: "border-box" };
function Input(props) { return <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />; }
function Select({ value, onChange, options, placeholder }) {
  return <select value={value ?? ""} onChange={onChange} style={inputStyle}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((o) => typeof o === "string"
      ? <option key={o} value={o}>{o}</option>
      : <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>;
}
function Modal({ title, onClose, children, wide }) {
  return <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0008", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 16, zIndex: 50, overflowY: "auto" }}>
    <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: wide ? 760 : 520, marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${LINE}` }}>
        <strong style={{ color: TEAL, fontSize: 16 }}>{title}</strong>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: MUTED }}><X size={20} /></button>
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  </div>;
}

/* ============================ APP ============================ */
export default function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [userId, setUserId] = useState("u1");
  const [tick, setTick] = useState(0);
  const [storageWarn, setStorageWarn] = useState(false);
  const user = USERS.find((u) => u.id === userId);

  // load + seed + PM auto-gen
  useEffect(() => {
    (async () => {
      let d = await store.get(KEY);
      if (!d) d = seed();
      if (!d.tickets) { const s = seedTickets(now()); d.tickets = s.tickets; d.reqSeq = s.reqSeq; } // migrate older saves
      d = generatePM(d);
      await store.set(KEY, d);
      setData(d);
    })();
  }, []);
  // live clock for SLA countdowns
  useEffect(() => { const i = setInterval(() => setTick((x) => x + 1), 30000); return () => clearInterval(i); }, []);

  const save = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      store.set(KEY, next).then((ok) => { if (!ok) setStorageWarn(true); });
      return next;
    });
  }, []);

  if (!data) return <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: "system-ui", color: MUTED, background: BG }}>
    <img src={LOGO_SRC} alt="One Realty" style={{ height: 40 }} />
    <span>Loading One Realty BSMD…</span>
  </div>;

  const bById = (id) => data.buildings.find((b) => b.id === id);
  const aById = (id) => data.assets.find((a) => a.id === id);
  const uName = (id) => USERS.find((u) => u.id === id)?.name || "Unassigned";

  const isTech = user.role === "Technician";
  const isClient = user.role === "Client";
  const visibleWOs = isTech ? data.workOrders.filter((w) => w.assigned_to === userId) : data.workOrders;
  const newTickets = (data.tickets || []).filter((t) => t.status === "New").length;

  // Client / resident self-service portal — no internal navigation.
  if (isClient) {
    return <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", background: BG, minHeight: "100vh", color: INK }}>
      <TopBar userId={userId} setUserId={setUserId} setTab={setTab} />
      <ClientPortal data={data} save={save} bById={bById} />
      <StorageBanner show={storageWarn} />
    </div>;
  }

  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, show: true },
    { id: "requests", label: "Requests", icon: Inbox, show: !isTech, badge: newTickets },
    { id: "wo", label: isTech ? "My Work Orders" : "Work Orders", icon: ClipboardList, show: true },
    { id: "pm", label: "PM Schedule", icon: CalendarClock, show: !isTech },
    { id: "assets", label: "Assets", icon: Boxes, show: !isTech },
    { id: "buildings", label: "Buildings", icon: Building2, show: !isTech },
    { id: "report", label: "Monthly Report", icon: FileText, show: can.reports(user.role) && !isTech },
  ].filter((n) => n.show);

  const shared = { data, save, bById, aById, uName, user, visibleWOs, setTab, tick };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", background: BG, minHeight: "100vh", color: INK }}>
      <PrintStyles />
      <TopBar userId={userId} setUserId={setUserId} setTab={setTab} />

      {/* Nav */}
      <nav className="no-print" style={{ background: "#fff", borderBottom: `1px solid ${LINE}`, display: "flex", gap: 4, padding: "6px 8px", overflowX: "auto", position: "sticky", top: 50, zIndex: 19 }}>
        {NAV.map((n) => {
          const active = tab === n.id; const Icon = n.icon;
          return <button key={n.id} onClick={() => setTab(n.id)} style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8,
            border: "none", cursor: "pointer", whiteSpace: "nowrap", fontSize: 13, fontWeight: 600,
            background: active ? GREEN + "1A" : "transparent", color: active ? TEAL : MUTED,
          }}><Icon size={16} />{n.label}
            {n.badge > 0 && <span style={{ background: RED, color: "#fff", borderRadius: 999, fontSize: 10, fontWeight: 700, padding: "1px 6px", marginLeft: 2 }}>{n.badge}</span>}
          </button>;
        })}
      </nav>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: 16 }}>
        {tab === "dashboard" && <Dashboard {...shared} />}
        {tab === "requests" && <Requests {...shared} />}
        {tab === "wo" && <WorkOrders {...shared} />}
        {tab === "pm" && <PMSchedule {...shared} />}
        {tab === "assets" && <Assets {...shared} />}
        {tab === "buildings" && <Buildings {...shared} />}
        {tab === "report" && <MonthlyReport {...shared} />}
      </main>
      <footer className="no-print" style={{ textAlign: "center", color: MUTED, fontSize: 11, padding: "18px 0 28px" }}>
        One Realty Pvt Ltd · Redefining Realty · BSMD operations · data saved on this device
      </footer>
      <StorageBanner show={storageWarn} />
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ data, visibleWOs, bById, setTab, user }) {
  const open = visibleWOs.filter((w) => !["Completed", "Signed Off"].includes(w.status));
  const overdue = open.filter((w) => w.resolution_due_at && now() > w.resolution_due_at);
  const emergencies = visibleWOs.filter((w) => w.priority === "Emergency" && w.created_at > addDays(now(), -30));
  const upcomingPM = data.pmSchedules.filter((s) => s.active && s.next_due <= addDays(now(), 7));

  const measured = visibleWOs.filter((w) => ["Completed", "Signed Off"].includes(w.status) && w.resolution_due_at);
  const onTime = measured.filter((w) => (!w.response_due_at || (w.responded_at && w.responded_at <= w.response_due_at)) && w.completed_at <= w.resolution_due_at);
  const compliance = measured.length ? Math.round((onTime.length / measured.length) * 100) : 100;

  const byStatus = WO_STATUSES.map((s) => ({ name: s, value: visibleWOs.filter((w) => w.status === s).length })).filter((d) => d.value > 0);
  const byPri = PRIORITIES.map((p) => ({ name: p, value: visibleWOs.filter((w) => w.priority === p).length })).filter((d) => d.value > 0);

  const newReq = (data.tickets || []).filter((t) => t.status === "New").length;
  const stats = [
    { label: "New requests", value: newReq, color: newReq ? AMBER : GREEN, icon: Inbox, show: user.role !== "Technician" },
    { label: "Open work orders", value: open.length, color: TEAL, icon: ClipboardList, show: true },
    { label: "Overdue (SLA)", value: overdue.length, color: overdue.length ? RED : GREEN, icon: AlertTriangle, show: true },
    { label: "Emergencies · 30d", value: emergencies.length, color: emergencies.length ? RED : MUTED, icon: AlertTriangle, show: true },
    { label: "SLA compliance", value: compliance + "%", color: compliance >= 90 ? GREEN : compliance >= 75 ? AMBER : RED, icon: ShieldCheck, show: true },
  ].filter((s) => s.show);

  return <div>
    <H title="Operations dashboard" sub={`Signed in as ${user.name} · ${user.role}`} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 16 }}>
      {stats.map((s) => {
        const Icon = s.icon;
        return <Card key={s.label} style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>{s.label}</span>
            <Icon size={16} color={s.color} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: s.color, marginTop: 6, letterSpacing: -1 }}>{s.value}</div>
        </Card>;
      })}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 16 }}>
      <Card style={{ padding: 14 }}>
        <strong style={{ color: TEAL, fontSize: 13 }}>Work orders by status</strong>
        <div style={{ height: 180, marginTop: 8 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStatus} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={50} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {byStatus.map((d, i) => <Cell key={i} fill={statusColor(d.name)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card style={{ padding: 14 }}>
        <strong style={{ color: TEAL, fontSize: 13 }}>By priority</strong>
        <div style={{ height: 180, marginTop: 8 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byPri} dataKey="value" nameKey="name" outerRadius={70} label={(e) => `${e.name} (${e.value})`} labelLine={false} fontSize={10}>
                {byPri.map((d, i) => <Cell key={i} fill={priColor(d.name)} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    <Card style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ color: TEAL, fontSize: 13 }}>Preventive maintenance due within 7 days</strong>
        <Btn small kind="ghost" onClick={() => setTab("pm")}>Open schedule <ChevronRight size={14} /></Btn>
      </div>
      {upcomingPM.length === 0 ? <Empty text="Nothing due in the next 7 days." />
        : upcomingPM.map((s) => (
          <Row key={s.id}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{CHECKLISTS[s.checklist_code].title}</div>
              <div style={{ fontSize: 12, color: MUTED }}>{bById(s.building_id)?.name} · {s.checklist_code} · {s.freq}</div>
            </div>
            <Badge color={s.next_due < now() ? RED : AMBER}>{s.next_due < now() ? "Overdue" : "Due " + fmtDate(s.next_due)}</Badge>
          </Row>
        ))}
    </Card>
  </div>;
}

/* ---------- Work Orders ---------- */
function WorkOrders({ data, save, bById, aById, uName, user, visibleWOs, tick }) {
  const [fPri, setFPri] = useState(""); const [fStat, setFStat] = useState(""); const [q, setQ] = useState("");
  const [sel, setSel] = useState(null); const [creating, setCreating] = useState(false);

  let list = [...visibleWOs].sort((a, b) => {
    const ord = { Emergency: 0, Urgent: 1, Normal: 2, Planned: 3 };
    if (ord[a.priority] !== ord[b.priority]) return ord[a.priority] - ord[b.priority];
    return (a.resolution_due_at || Infinity) - (b.resolution_due_at || Infinity);
  });
  if (fPri) list = list.filter((w) => w.priority === fPri);
  if (fStat) list = list.filter((w) => w.status === fStat);
  if (q) list = list.filter((w) => (w.title + w.wo_no + (bById(w.building_id)?.name || "")).toLowerCase().includes(q.toLowerCase()));

  const selWO = sel ? data.workOrders.find((w) => w.id === sel) : null;

  return <div>
    <H title={user.role === "Technician" ? "My work orders" : "Work orders"}
      action={can.createWO(user.role) ? <Btn onClick={() => setCreating(true)}><Plus size={16} />New work order</Btn> : null} />
    <Card style={{ padding: 10, marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ position: "relative", flex: "1 1 160px" }}>
        <Search size={15} color={MUTED} style={{ position: "absolute", left: 9, top: 10 }} />
        <Input placeholder="Search title, no., building" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 30 }} />
      </div>
      <div style={{ width: 140 }}><Select value={fPri} onChange={(e) => setFPri(e.target.value)} options={PRIORITIES} placeholder="All priorities" /></div>
      <div style={{ width: 140 }}><Select value={fStat} onChange={(e) => setFStat(e.target.value)} options={WO_STATUSES} placeholder="All statuses" /></div>
    </Card>

    {list.length === 0 ? <Empty text="No work orders match these filters." /> :
      list.map((w) => {
        const { respMiss, resMiss } = slaState(w);
        const closed = ["Completed", "Signed Off"].includes(w.status);
        return <Card key={w.id} style={{ padding: 12, marginBottom: 8, cursor: "pointer", borderLeft: `4px solid ${priColor(w.priority)}` }}>
          <div onClick={() => setSel(w.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: TEAL }}>{w.title}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{w.wo_no} · {bById(w.building_id)?.name}{w.asset_id ? " · " + aById(w.asset_id)?.asset_code : ""}</div>
              </div>
              <ChevronRight size={18} color={MUTED} style={{ flexShrink: 0 }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
              <Badge color={priColor(w.priority)} solid>{w.priority}</Badge>
              <Badge color={statusColor(w.status)}>{w.status}</Badge>
              <Badge color={MUTED}>{w.type}</Badge>
              {!closed && w.resolution_due_at && <Badge color={resMiss ? RED : AMBER}><Clock size={10} style={{ verticalAlign: -1 }} /> {humanLeft(w.resolution_due_at)}</Badge>}
              {closed && <Badge color={(respMiss || resMiss) ? RED : GREEN}>{(respMiss || resMiss) ? "SLA missed" : "SLA met"}</Badge>}
            </div>
          </div>
        </Card>;
      })}

    {selWO && <WODetail wo={selWO} {...{ data, save, bById, aById, uName, user }} onClose={() => setSel(null)} />}
    {creating && <WOCreate {...{ data, save, user }} onClose={() => setCreating(false)} />}
  </div>;
}

function WODetail({ wo, data, save, bById, aById, uName, user, onClose }) {
  const cl = wo.pm_id ? CHECKLISTS[data.pmSchedules.find((s) => s.id === wo.pm_id)?.checklist_code] : null;
  const update = (patch) => save((p) => ({ ...p, workOrders: p.workOrders.map((w) => w.id === wo.id ? { ...w, ...patch } : w) }));

  const setStatus = (status) => {
    const patch = { status };
    if ((status === "Assigned" || status === "In Progress") && !wo.responded_at) patch.responded_at = now();
    if (status === "Completed" && !wo.completed_at) patch.completed_at = now();
    if (status === "Signed Off") { patch.signed_off_by = user.id; if (!wo.completed_at) patch.completed_at = now(); }
    update(patch);
  };
  const assignTech = (techId) => { const patch = { assigned_to: techId || null }; if (techId && wo.status === "Logged") { patch.status = "Assigned"; if (!wo.responded_at) patch.responded_at = now(); } update(patch); };

  // chargeables
  const [cc, setCc] = useState({ category: "Materials", description: "", cost_mvr: "" });
  const addCharge = () => {
    const cost = Number(cc.cost_mvr);
    if (!cc.description.trim() || !isFinite(cost) || cost < 0) return;
    const item = { id: uid("c_"), category: cc.category, description: cc.description.trim(), cost_mvr: cost, markup_pct: MARKUP[cc.category] };
    update({ chargeables: [...(wo.chargeables || []), item] });
    setCc({ category: "Materials", description: "", cost_mvr: "" });
  };
  const delCharge = (id) => update({ chargeables: wo.chargeables.filter((c) => c.id !== id) });
  const billable = (c) => Math.round(c.cost_mvr * (1 + c.markup_pct / 100));
  const chargeTotal = (wo.chargeables || []).reduce((s, c) => s + billable(c), 0);

  // checklist completion
  const [checks, setChecks] = useState(() => wo.checklist || (cl ? cl.items.map((it) => ({ item: it, result: "", note: "" })) : []));
  const completeChecklist = () => {
    update({ checklist: checks, status: "Completed", completed_at: now(), responded_at: wo.responded_at || now() });
    if (wo.pm_id) save((p) => ({ ...p, pmSchedules: p.pmSchedules.map((s) => s.id === wo.pm_id ? { ...s, last_done: now() } : s) }));
  };

  // photo (downscaled, capped, guarded)
  const PHOTO_CAP = 6;
  const onPhoto = (e) => {
    const file = e.target.files && e.target.files[0]; e.target.value = ""; // allow re-selecting same file
    if (!file) return;
    if (!/^image\//.test(file.type)) { alert("Please choose an image file."); return; }
    if ((wo.photos || []).length >= PHOTO_CAP) { alert(`Up to ${PHOTO_CAP} photos per work order.`); return; }
    const reader = new FileReader();
    reader.onerror = () => alert("Could not read that image.");
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => alert("That image could not be processed.");
      img.onload = () => {
        try {
          const max = 640, scale = Math.min(1, max / Math.max(img.width, img.height));
          const cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(img.width * scale)); cv.height = Math.max(1, Math.round(img.height * scale));
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          const url = cv.toDataURL("image/jpeg", 0.5);
          update({ photos: [...(wo.photos || []), { id: uid("ph_"), url }] });
        } catch (err) { alert("That image could not be processed."); }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const b = bById(wo.building_id); const a = wo.asset_id ? aById(wo.asset_id) : null;
  const { respMiss, resMiss } = slaState(wo);
  const closed = ["Completed", "Signed Off"].includes(wo.status);
  const canEdit = user.role !== "Technician" || wo.assigned_to === user.id;

  return <Modal title={wo.wo_no} onClose={onClose} wide>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
      <Badge color={priColor(wo.priority)} solid>{wo.priority}</Badge>
      <Badge color={statusColor(wo.status)}>{wo.status}</Badge>
      <Badge color={MUTED}>{wo.type}</Badge>
    </div>
    <h3 style={{ margin: "0 0 4px", color: TEAL }}>{wo.title}</h3>
    <p style={{ margin: "0 0 12px", color: INK, fontSize: 14 }}>{wo.description}</p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 8, marginBottom: 12 }}>
      <Info label="Building" value={b?.name} />
      <Info label="Asset" value={a ? `${a.asset_code}` : "—"} />
      <Info label="Reported by" value={wo.reported_by} />
      <Info label="Logged" value={fmtDT(wo.created_at)} />
      <Info label="Response target" value={wo.response_due_at ? fmtDT(wo.response_due_at) : "Scheduled"} warn={respMiss} />
      <Info label="Resolution target" value={wo.resolution_due_at ? fmtDT(wo.resolution_due_at) : "As agreed"} warn={resMiss && !closed} />
    </div>
    <div style={{ marginBottom: 14 }}>
      <Badge color={SLA[wo.priority] ? TEAL : MUTED}>SLA: {SLA[wo.priority].label}</Badge>{" "}
      {!closed && wo.resolution_due_at && <Badge color={resMiss ? RED : AMBER}><Clock size={10} style={{ verticalAlign: -1 }} /> {humanLeft(wo.resolution_due_at)}</Badge>}
      {closed && <Badge color={(respMiss || resMiss) ? RED : GREEN}>{(respMiss || resMiss) ? "SLA missed" : "SLA met"}</Badge>}
    </div>

    {canEdit && <Card style={{ padding: 12, marginBottom: 12, background: BG }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>Update</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {!isTechOnly(user) && <div style={{ minWidth: 170 }}><Select value={wo.assigned_to || ""} onChange={(e) => assignTech(e.target.value)} placeholder="Assign technician…"
          options={USERS.filter((u) => u.role === "Technician").map((u) => ({ value: u.id, label: u.name + (u.trade ? ` (${u.trade})` : "") }))} /></div>}
        {!closed && wo.status !== "In Progress" && <Btn small kind="navy" onClick={() => setStatus("In Progress")}>Start work</Btn>}
        {!closed && wo.status === "In Progress" && <Btn small kind="ghost" onClick={() => setStatus("On Hold")}>Hold</Btn>}
        {!cl && !closed && <Btn small onClick={() => setStatus("Completed")}><CheckCircle2 size={14} />Mark complete</Btn>}
        {wo.status === "Completed" && can.signOff(user.role) && <Btn small kind="navy" onClick={() => setStatus("Signed Off")}><ShieldCheck size={14} />Sign off</Btn>}
      </div>
    </Card>}

    {/* Checklist for PM work orders */}
    {cl && !closed && canEdit && <Card style={{ padding: 12, marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>{cl.title} · {/* code */}{data.pmSchedules.find((s) => s.id === wo.pm_id)?.checklist_code}</div>
      {checks.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${LINE}` }}>
          <span style={{ flex: 1, fontSize: 13 }}>{c.item}</span>
          {["pass", "fail", "na"].map((r) => (
            <button key={r} onClick={() => setChecks(checks.map((x, j) => j === i ? { ...x, result: r } : x))}
              style={{ border: `1px solid ${c.result === r ? (r === "fail" ? RED : r === "pass" ? GREEN : MUTED) : LINE}`, background: c.result === r ? (r === "fail" ? RED : r === "pass" ? GREEN : MUTED) + "22" : "#fff", color: r === "fail" ? RED : r === "pass" ? GREEN : MUTED, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}>{r}</button>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 10 }}>
        <Btn small disabled={checks.some((c) => !c.result)} onClick={completeChecklist}><CheckCircle2 size={14} />Complete checklist &amp; close</Btn>
        {checks.some((c) => !c.result) && <span style={{ fontSize: 11, color: MUTED, marginLeft: 8 }}>Mark every item to close.</span>}
      </div>
    </Card>}
    {cl && closed && wo.checklist && <Card style={{ padding: 12, marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 6 }}>Completed checklist</div>
      {wo.checklist.map((c, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "3px 0" }}>
        <span>{c.item}</span><Badge color={c.result === "fail" ? RED : c.result === "pass" ? GREEN : MUTED}>{(c.result || "—").toUpperCase()}</Badge>
      </div>)}
    </Card>}

    {/* Photos */}
    {canEdit && <Card style={{ padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: TEAL }}>Site photos</span>
        <label style={{ cursor: "pointer", color: GREEN, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Camera size={14} />Add photo<input type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
        </label>
      </div>
      {(wo.photos || []).length === 0 ? <span style={{ fontSize: 12, color: MUTED }}>No photos yet.</span> :
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {wo.photos.map((p) => <img key={p.id} src={p.url} alt="site" style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 8, border: `1px solid ${LINE}` }} />)}
        </div>}
    </Card>}

    {/* Chargeables */}
    <Card style={{ padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>Chargeable items (billed on top of the monthly fee)</div>
      {(wo.chargeables || []).length > 0 && <div style={{ marginBottom: 8 }}>
        {wo.chargeables.map((c) => <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "5px 0", borderBottom: `1px solid ${LINE}` }}>
          <span style={{ flex: 1 }}><Badge color={MUTED}>{c.category}</Badge> {c.description}</span>
          <span style={{ color: MUTED, fontSize: 12, marginRight: 8 }}>MVR {c.cost_mvr.toLocaleString()} +{c.markup_pct}%</span>
          <strong style={{ marginRight: 8 }}>MVR {billable(c).toLocaleString()}</strong>
          {canEdit && <button onClick={() => delCharge(c.id)} style={{ border: "none", background: "none", color: RED, cursor: "pointer" }}><Trash2 size={14} /></button>}
        </div>)}
        <div style={{ textAlign: "right", marginTop: 6, fontWeight: 800, color: TEAL }}>Billable total: MVR {chargeTotal.toLocaleString()}</div>
      </div>}
      {canEdit && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ width: 130 }}><Select value={cc.category} onChange={(e) => setCc({ ...cc, category: e.target.value })} options={CHARGE_CATS} /></div>
        <Input placeholder="Description" value={cc.description} onChange={(e) => setCc({ ...cc, description: e.target.value })} style={{ flex: "1 1 140px" }} />
        <Input placeholder="Cost MVR" type="number" value={cc.cost_mvr} onChange={(e) => setCc({ ...cc, cost_mvr: e.target.value })} style={{ width: 110 }} />
        <Btn small kind="ghost" onClick={addCharge}><Plus size={14} />Add</Btn>
      </div>}
      <div style={{ fontSize: 11, color: MUTED, marginTop: 8 }}>Markup defaults: materials/equipment/specialist +15%, certifications at cost, labour per rate card.</div>
    </Card>
  </Modal>;
}
const isTechOnly = (u) => u.role === "Technician";

function WOCreate({ data, save, user, onClose }) {
  const [f, setF] = useState({ title: "", description: "", building_id: data.buildings[0]?.id || "", asset_id: "", type: "Corrective", priority: "Normal", reported_by: "" });
  const assets = data.assets.filter((a) => a.building_id === f.building_id);
  const submit = () => {
    if (!f.title || !f.building_id) return;
    const created = now(); const due = computeDue(f.priority, created);
    const wo = {
      id: uid("w_"),
      building_id: f.building_id, asset_id: f.asset_id || null, type: f.type, priority: f.priority,
      status: "Logged", title: f.title, description: f.description, reported_by: f.reported_by || "Front desk",
      assigned_to: null, created_at: created, response_due_at: due.responseDue, resolution_due_at: due.resolutionDue,
      responded_at: null, completed_at: null, photos: [], chargeables: [],
    };
    save((p) => { const seq = (p.seq || 0) + 1; return { ...p, seq, workOrders: [{ ...wo, wo_no: woNumber(seq) }, ...p.workOrders] }; });
    onClose();
  };
  return <Modal title="New work order" onClose={onClose}>
    <Field label="Title"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. AC not cooling in Unit 3A" /></Field>
    <Field label="Description"><textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} style={{ ...inputStyle, minHeight: 64, resize: "vertical" }} /></Field>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <Field label="Building"><Select value={f.building_id} onChange={(e) => setF({ ...f, building_id: e.target.value, asset_id: "" })} options={data.buildings.map((b) => ({ value: b.id, label: b.name }))} /></Field>
      <Field label="Asset (optional)"><Select value={f.asset_id} onChange={(e) => setF({ ...f, asset_id: e.target.value })} placeholder="None" options={assets.map((a) => ({ value: a.id, label: a.asset_code }))} /></Field>
      <Field label="Type"><Select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} options={["Corrective", "Emergency", "Planned", "Preventive"]} /></Field>
      <Field label="Priority"><Select value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })} options={PRIORITIES} /></Field>
    </div>
    <Field label="Reported by"><Input value={f.reported_by} onChange={(e) => setF({ ...f, reported_by: e.target.value })} placeholder="Resident / front desk / inspection" /></Field>
    <div style={{ background: BG, borderRadius: 8, padding: 10, fontSize: 12, color: MUTED, marginBottom: 12 }}>
      SLA on save: <strong style={{ color: TEAL }}>{SLA[f.priority].label}</strong>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Btn kind="ghost" onClick={onClose}>Cancel</Btn>
      <Btn onClick={submit} disabled={!f.title}>Create work order</Btn>
    </div>
  </Modal>;
}

/* ---------- PM Schedule ---------- */
function PMSchedule({ data, bById, aById }) {
  const rows = [...data.pmSchedules].sort((a, b) => a.next_due - b.next_due);
  return <div>
    <H title="Preventive maintenance schedule" sub="Work orders are generated automatically when a schedule falls due." />
    {rows.map((s) => {
      const cl = CHECKLISTS[s.checklist_code]; const overdue = s.next_due < now();
      return <Card key={s.id} style={{ padding: 12, marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700, color: TEAL, fontSize: 14 }}>{cl.title}</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{bById(s.building_id)?.name}{s.asset_id ? " · " + aById(s.asset_id)?.asset_code : ""} · {s.checklist_code}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Badge color={s.freq === "Daily" ? TEAL : MUTED}>{s.freq}</Badge>{" "}
            <Badge color={overdue ? RED : GREEN}>{overdue ? "Due now" : "Next " + fmtDate(s.next_due)}</Badge>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>Last done {fmtDate(s.last_done)}</div>
          </div>
        </div>
      </Card>;
    })}
  </div>;
}

/* ---------- Assets ---------- */
function Assets({ data, save, bById, user }) {
  const [q, setQ] = useState(""); const [fault, setFault] = useState(null);
  let list = data.assets;
  if (q) list = list.filter((a) => (a.asset_code + a.make_model + (bById(a.building_id)?.name || "")).toLowerCase().includes(q.toLowerCase()));
  const replYear = (a) => new Date(a.install_date).getFullYear() + a.expected_life_years;
  const soon = (a) => replYear(a) <= new Date().getFullYear() + 1;

  const reportFault = (a) => {
    const base = { id: uid("t_"), channel: "QR Code", building_id: a.building_id, asset_id: a.id, requester_name: "QR scan", requester_contact: "—", description: `Fault reported via asset QR for ${a.make_model} (${a.asset_code}).`, status: "New", acknowledged_at: null, work_order_id: null, created_at: now(), photos: [] };
    save((p) => { const seq = (p.reqSeq || 0) + 1; return { ...p, reqSeq: seq, tickets: [{ ...base, ticket_no: reqNumber(seq) }, ...(p.tickets || [])] }; });
    setFault(a.asset_code);
  };

  return <div>
    <H title="Asset register" sub="ORL-FM-REG-001" />
    <Card style={{ padding: 10, marginBottom: 12, position: "relative" }}>
      <Search size={15} color={MUTED} style={{ position: "absolute", left: 18, top: 19 }} />
      <Input placeholder="Search assets" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 30 }} />
    </Card>
    {fault && <Card style={{ padding: 10, marginBottom: 12, borderLeft: `4px solid ${GREEN}`, background: GREEN + "12" }}>
      <span style={{ fontSize: 13, color: TEAL }}>Service request logged for <strong>{fault}</strong> (channel: QR Code). It is now in the Requests inbox for triage.</span>
    </Card>}
    {list.map((a) => (
      <Card key={a.id} style={{ padding: 12, marginBottom: 8, borderLeft: `4px solid ${a.status === "fault" ? RED : LINE}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700, color: TEAL, fontSize: 14 }}>{a.asset_code}</div>
            <div style={{ fontSize: 13 }}>{a.make_model}</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{bById(a.building_id)?.name}{a.location ? " · " + a.location : ""}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Badge color={a.status === "fault" ? RED : GREEN}>{a.status === "fault" ? "Fault" : "Active"}</Badge>{" "}
            <Badge color={a.category === "Fire & Safety" ? RED : TEAL}>{a.category}</Badge>
            <div style={{ fontSize: 11, color: soon(a) ? AMBER : MUTED, marginTop: 4, fontWeight: soon(a) ? 700 : 400 }}>
              Replace ~{replYear(a)}{soon(a) ? " · due soon" : ""}
            </div>
            <div style={{ marginTop: 6 }}><Btn small kind="ghost" onClick={() => reportFault(a)}><AlertTriangle size={13} />Report fault (QR)</Btn></div>
          </div>
        </div>
      </Card>
    ))}
  </div>;
}

/* ---------- Buildings ---------- */
function Buildings({ data, bById }) {
  return <div>
    <H title="Buildings &amp; clients" sub="Monthly management fee is calculated from area and tier (Part 15.6)." />
    {data.buildings.map((b) => {
      const fee = monthlyFee(b); const rate = b.contract_type === "mgmt_fee" ? feeRate(b.managed_area_sqft) : null;
      const floored = b.contract_type === "mgmt_fee" && rate != null && b.managed_area_sqft * rate < FEE_FLOOR;
      return <Card key={b.id} style={{ padding: 14, marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700, color: TEAL, fontSize: 15 }}>{b.name}</div>
            <div style={{ fontSize: 12, color: MUTED }}>{b.client_name} · {b.address}</div>
            <div style={{ marginTop: 6 }}>
              <Badge color={b.contract_type === "mgmt_fee" ? GREEN : TEAL}>
                {b.contract_type === "mgmt_fee" ? "Management fee (per sq ft)" : "Per-unit package" + (b.package ? " · " + b.package : "")}
              </Badge>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: MUTED }}>Monthly fee</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: TEAL }}>MVR {fee.toLocaleString()}</div>
            {b.contract_type === "mgmt_fee" && <div style={{ fontSize: 11, color: MUTED }}>
              {b.managed_area_sqft?.toLocaleString()} sq ft {rate ? `× ${rate.toFixed(2)}` : "· negotiable"}{floored ? ` · floored at ${FEE_FLOOR.toLocaleString()}` : ""}
            </div>}
          </div>
        </div>
      </Card>;
    })}
  </div>;
}

/* ---------- Monthly Report ---------- */
function MonthlyReport({ data, bById, uName }) {
  const months = useMemo(() => {
    const arr = []; const d = new Date(); d.setDate(1);
    for (let i = 0; i < 6; i++) { arr.push({ value: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString("en-GB", { month: "long", year: "numeric" }) }); d.setMonth(d.getMonth() - 1); }
    return arr;
  }, []);
  const [bid, setBid] = useState(data.buildings[0]?.id || "");
  const [mon, setMon] = useState(months[0].value);
  const [yy, mm] = mon.split("-").map(Number);
  const start = new Date(yy, mm, 1).getTime(); const end = new Date(yy, mm + 1, 1).getTime();
  const b = bById(bid);

  const inScope = data.workOrders.filter((w) => w.building_id === bid && w.created_at >= start && w.created_at < end);
  const pmDone = inScope.filter((w) => w.type === "Preventive" && ["Completed", "Signed Off"].includes(w.status));
  const corrDone = inScope.filter((w) => w.type !== "Preventive" && ["Completed", "Signed Off"].includes(w.status));
  const openWO = data.workOrders.filter((w) => w.building_id === bid && !["Completed", "Signed Off"].includes(w.status));
  const emerg = inScope.filter((w) => w.priority === "Emergency");
  const measured = inScope.filter((w) => ["Completed", "Signed Off"].includes(w.status) && w.resolution_due_at);
  const onTime = measured.filter((w) => (!w.response_due_at || (w.responded_at && w.responded_at <= w.response_due_at)) && w.completed_at <= w.resolution_due_at);
  const compliance = measured.length ? Math.round(onTime.length / measured.length * 100) : 100;
  const charge = inScope.flatMap((w) => (w.chargeables || []).map((c) => ({ ...c, wo: w.wo_no })));
  const chargeTotal = charge.reduce((s, c) => s + Math.round(c.cost_mvr * (1 + c.markup_pct / 100)), 0);

  const monthLabel = months.find((m) => m.value === mon)?.label;

  return <div>
    <div className="no-print">
      <H title="Monthly client report" sub="ORL-FM-TPL-002" action={<Btn kind="navy" onClick={() => window.print()}><Printer size={16} />Print / Save PDF</Btn>} />
      <Card style={{ padding: 10, marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}><Select value={bid} onChange={(e) => setBid(e.target.value)} options={data.buildings.map((b) => ({ value: b.id, label: b.name }))} /></div>
        <div style={{ flex: "1 1 160px" }}><Select value={mon} onChange={(e) => setMon(e.target.value)} options={months} /></div>
      </Card>
    </div>

    <div id="print-area">
      <Card style={{ padding: 22 }}>
        {/* letterhead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `3px solid ${GREEN}`, paddingBottom: 12, marginBottom: 16 }}>
          <div>
            <img src={LOGO_SRC} alt="One Realty" style={{ height: 38 }} />
            <div style={{ fontSize: 11, color: GREEN, fontWeight: 600, marginTop: 4, fontStyle: "italic" }}>Redefining Realty</div>
            <div style={{ fontSize: 12, color: TEAL, fontWeight: 600, marginTop: 2 }}>Building Services &amp; Maintenance Department</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 11, color: MUTED }}>
            <div style={{ fontWeight: 700, color: TEAL }}>Monthly Maintenance Report</div>
            <div>ORL-FM-TPL-002</div><div>{monthLabel}</div>
          </div>
        </div>
        <div style={{ marginBottom: 14, fontSize: 13 }}>
          <strong style={{ color: TEAL }}>{b?.name}</strong> — {b?.client_name}<br />
          <span style={{ color: MUTED }}>{b?.address} · Monthly fee MVR {monthlyFee(b).toLocaleString()}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
          {[
            ["PM completed", pmDone.length, GREEN], ["Corrective completed", corrDone.length, TEAL],
            ["Open work orders", openWO.length, openWO.length ? AMBER : GREEN], ["Emergency callouts", emerg.length, emerg.length ? RED : MUTED],
            ["SLA compliance", compliance + "%", compliance >= 90 ? GREEN : AMBER],
          ].map(([l, v, c]) => <div key={l} style={{ border: `1px solid ${LINE}`, borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 11, color: MUTED }}>{l}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
          </div>)}
        </div>

        <ReportTable title="Work completed this month" rows={[...pmDone, ...corrDone]} bById={bById} />
        {openWO.length > 0 && <ReportTable title="Open / carried-forward work orders" rows={openWO} bById={bById} open />}

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginBottom: 6 }}>Chargeable items (in addition to the monthly fee)</div>
          {charge.length === 0 ? <div style={{ fontSize: 13, color: MUTED }}>No chargeable items this period.</div> :
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr style={{ background: TEAL, color: "#fff" }}>
                {["WO", "Category", "Description", "Cost", "Billable"].map((h) => <th key={h} style={{ textAlign: "left", padding: "6px 8px" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {charge.map((c, i) => <tr key={i} style={{ borderBottom: `1px solid ${LINE}` }}>
                  <td style={{ padding: "5px 8px" }}>{c.wo}</td><td style={{ padding: "5px 8px" }}>{c.category}</td>
                  <td style={{ padding: "5px 8px" }}>{c.description}</td>
                  <td style={{ padding: "5px 8px" }}>MVR {c.cost_mvr.toLocaleString()} +{c.markup_pct}%</td>
                  <td style={{ padding: "5px 8px", fontWeight: 700 }}>MVR {Math.round(c.cost_mvr * (1 + c.markup_pct / 100)).toLocaleString()}</td>
                </tr>)}
                <tr><td colSpan={4} style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700 }}>Total chargeable</td>
                  <td style={{ padding: "6px 8px", fontWeight: 800, color: TEAL }}>MVR {chargeTotal.toLocaleString()}</td></tr>
              </tbody>
            </table>}
        </div>

        <div style={{ marginTop: 20, paddingTop: 10, borderTop: `1px solid ${LINE}`, fontSize: 10, color: MUTED, textAlign: "center" }}>
          One Realty Private Limited · Ma. Fas Eri, 7th Floor, Ameenee Magu, Malé 20205 · T +960 330 1131 · M +960 778 2515 · info@onerealty.mv · www.onerealty.mv · Reg. C-0117/2016
        </div>
      </Card>
    </div>
  </div>;
}
function ReportTable({ title, rows, bById, open }) {
  if (rows.length === 0) return null;
  return <div style={{ marginTop: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginBottom: 6 }}>{title}</div>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead><tr style={{ background: BG }}>
        {["WO", "Title", "Priority", open ? "Status" : "Completed"].map((h) => <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: TEAL }}>{h}</th>)}
      </tr></thead>
      <tbody>
        {rows.map((w) => <tr key={w.id} style={{ borderBottom: `1px solid ${LINE}` }}>
          <td style={{ padding: "5px 8px", whiteSpace: "nowrap" }}>{w.wo_no.split("-").slice(-1)}</td>
          <td style={{ padding: "5px 8px" }}>{w.title}</td>
          <td style={{ padding: "5px 8px" }}>{w.priority}</td>
          <td style={{ padding: "5px 8px" }}>{open ? w.status : fmtDate(w.completed_at)}</td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}

/* ---------- shared bits ---------- */
function H({ title, sub, action }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14, gap: 8, flexWrap: "wrap" }}>
    <div>
      <h2 style={{ margin: 0, color: TEAL, fontSize: 20, letterSpacing: -0.4 }}>{title}</h2>
      {sub && <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{sub}</div>}
    </div>
    {action}
  </div>;
}
function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${LINE}`, gap: 8 }}>{children}</div>;
}
function Info({ label, value, warn }) {
  return <div style={{ background: BG, borderRadius: 8, padding: "7px 10px" }}>
    <div style={{ fontSize: 11, color: MUTED }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: warn ? RED : INK }}>{value || "—"}</div>
  </div>;
}
function Empty({ text }) {
  return <Card style={{ padding: 28, textAlign: "center", color: MUTED, fontSize: 14 }}>{text}</Card>;
}
/* ---------- Top bar (shared) ---------- */
function TopBar({ userId, setUserId, setTab }) {
  return <header style={{ background: TEAL, color: "#fff", padding: "9px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }} className="no-print">
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{ background: "#fff", borderRadius: 9, padding: "6px 10px", display: "flex", alignItems: "center" }}>
        <img src={LOGO_SRC} alt="One Realty" style={{ height: 22, display: "block" }} />
      </div>
      <div style={{ lineHeight: 1.15, borderLeft: "1px solid #ffffff33", paddingLeft: 11 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>BSMD</div>
        <div style={{ fontSize: 10, color: GREEN, fontWeight: 600 }}>Redefining Realty</div>
      </div>
    </div>
    <select value={userId} onChange={(e) => { setUserId(e.target.value); setTab("dashboard"); }}
      style={{ background: "#ffffff1f", color: "#fff", border: "1px solid #ffffff3d", borderRadius: 8, padding: "6px 8px", fontSize: 12, maxWidth: 190 }}>
      {USERS.map((u) => <option key={u.id} value={u.id} style={{ color: INK }}>{u.name} · {u.role}</option>)}
    </select>
  </header>;
}

/* ---------- Channel badge ---------- */
function ChannelTag({ channel }) {
  const m = CHANNEL_META[channel] || { icon: Inbox, color: MUTED };
  const Icon = m.icon;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: m.color + "1A", color: m.color, border: `1px solid ${m.color}33`, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
    <Icon size={11} />{channel}
  </span>;
}

/* ---------- Requests (help desk inbox + triage) ---------- */
function Requests({ data, save, bById, aById, user }) {
  const [fChan, setFChan] = useState(""); const [fStat, setFStat] = useState("New");
  const [q, setQ] = useState(""); const [sel, setSel] = useState(null); const [logging, setLogging] = useState(false);

  let list = [...(data.tickets || [])].sort((a, b) => b.created_at - a.created_at);
  if (fChan) list = list.filter((t) => t.channel === fChan);
  if (fStat) list = list.filter((t) => t.status === fStat);
  if (q) list = list.filter((t) => (t.description + t.ticket_no + t.requester_name + (bById(t.building_id)?.name || "")).toLowerCase().includes(q.toLowerCase()));
  const selT = sel ? data.tickets.find((t) => t.id === sel) : null;

  return <div>
    <H title="Service requests" sub="Client requests from every channel land here, then convert into work orders."
      action={<Btn onClick={() => setLogging(true)}><Plus size={16} />Log a request</Btn>} />

    {/* channel summary */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {CHANNELS.map((c) => {
        const n = (data.tickets || []).filter((t) => t.channel === c && t.status === "New").length;
        const m = CHANNEL_META[c]; const Icon = m.icon;
        return <div key={c} onClick={() => { setFChan(fChan === c ? "" : c); setFStat(""); }} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 9px", borderRadius: 8, border: `1px solid ${fChan === c ? m.color : LINE}`, background: fChan === c ? m.color + "14" : "#fff", fontSize: 12, fontWeight: 600, color: TEAL }}>
          <Icon size={13} color={m.color} />{c}{n > 0 && <span style={{ background: m.color, color: "#fff", borderRadius: 999, fontSize: 10, padding: "0 6px" }}>{n}</span>}
        </div>;
      })}
    </div>

    <Card style={{ padding: 10, marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ position: "relative", flex: "1 1 160px" }}>
        <Search size={15} color={MUTED} style={{ position: "absolute", left: 9, top: 10 }} />
        <Input placeholder="Search requests" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 30 }} />
      </div>
      <div style={{ width: 150 }}><Select value={fStat} onChange={(e) => setFStat(e.target.value)} options={TICKET_STATUSES} placeholder="All statuses" /></div>
    </Card>

    {list.length === 0 ? <Empty text="No requests match these filters." /> :
      list.map((t) => {
        const wo = t.work_order_id ? data.workOrders.find((w) => w.id === t.work_order_id) : null;
        return <Card key={t.id} style={{ padding: 12, marginBottom: 8, cursor: "pointer", borderLeft: `4px solid ${(CHANNEL_META[t.channel] || {}).color || MUTED}` }}>
          <div onClick={() => setSel(t.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{t.description}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{t.ticket_no} · {bById(t.building_id)?.name} · {t.requester_name}</div>
              </div>
              <ChevronRight size={18} color={MUTED} style={{ flexShrink: 0 }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
              <ChannelTag channel={t.channel} />
              <Badge color={ticketStatusColor(t.status)}>{t.status}</Badge>
              {wo && <Badge color={statusColor(wo.status)}>{wo.wo_no.split("-").slice(-1)} · {wo.status}</Badge>}
              <span style={{ fontSize: 11, color: MUTED }}>{fmtDT(t.created_at)}</span>
            </div>
          </div>
        </Card>;
      })}

    {selT && <TicketDetail ticket={selT} {...{ data, save, bById, aById }} onClose={() => setSel(null)} />}
    {logging && <TicketCreate {...{ data, save }} onClose={() => setLogging(false)} />}
  </div>;
}

function TicketDetail({ ticket, data, save, bById, aById, onClose }) {
  const [cType, setCType] = useState("Corrective");
  const [cPri, setCPri] = useState(ticket.channel === "QR Code" ? "Urgent" : "Normal");
  const [cTitle, setCTitle] = useState(ticket.description.slice(0, 70));
  const linkedWO = ticket.work_order_id ? data.workOrders.find((w) => w.id === ticket.work_order_id) : null;

  const setStatus = (status, extra = {}) => save((p) => ({ ...p, tickets: p.tickets.map((t) => t.id === ticket.id ? { ...t, status, ...extra } : t) }));
  const acknowledge = () => setStatus("Acknowledged", { acknowledged_at: now() });
  const reject = () => { setStatus("Rejected"); onClose(); };

  const convert = () => {
    const created = now(); const due = computeDue(cPri, created); const woId = uid("w_");
    const wo = {
      id: woId, building_id: ticket.building_id, asset_id: ticket.asset_id || null,
      type: cType, priority: cPri, status: "Logged", title: cTitle || "Service request",
      description: `${ticket.description}\n\nOrigin: ${ticket.channel} — ${ticket.requester_name}${ticket.requester_contact && ticket.requester_contact !== "—" ? " (" + ticket.requester_contact + ")" : ""}`,
      reported_by: `${ticket.channel} — ${ticket.requester_name}`, assigned_to: null, created_at: created,
      response_due_at: due.responseDue, resolution_due_at: due.resolutionDue, responded_at: null, completed_at: null,
      photos: ticket.photos || [], chargeables: [], ticket_id: ticket.id,
    };
    save((p) => { const seq = (p.seq || 0) + 1; return { ...p, seq, workOrders: [{ ...wo, wo_no: woNumber(seq) }, ...p.workOrders], tickets: p.tickets.map((t) => t.id === ticket.id ? { ...t, status: "Converted", work_order_id: woId, acknowledged_at: t.acknowledged_at || created } : t) }; });
    onClose();
  };

  return <Modal title={ticket.ticket_no} onClose={onClose}>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10, alignItems: "center" }}>
      <ChannelTag channel={ticket.channel} />
      <Badge color={ticketStatusColor(ticket.status)}>{ticket.status}</Badge>
    </div>
    <p style={{ margin: "0 0 12px", fontSize: 14 }}>{ticket.description}</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8, marginBottom: 14 }}>
      <Info label="Building" value={bById(ticket.building_id)?.name} />
      <Info label="Asset" value={ticket.asset_id ? aById(ticket.asset_id)?.asset_code : "—"} />
      <Info label="Requester" value={ticket.requester_name} />
      <Info label="Contact" value={ticket.requester_contact} />
      <Info label="Received" value={fmtDT(ticket.created_at)} />
      <Info label="Acknowledged" value={ticket.acknowledged_at ? fmtDT(ticket.acknowledged_at) : "Not yet"} warn={!ticket.acknowledged_at} />
    </div>

    {ticket.status === "Converted" && linkedWO &&
      <Card style={{ padding: 12, background: GREEN + "10", borderColor: GREEN + "55" }}>
        <div style={{ fontSize: 13, color: TEAL }}>Converted to work order <strong>{linkedWO.wo_no}</strong> <Badge color={statusColor(linkedWO.status)}>{linkedWO.status}</Badge></div>
        <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>Track and update it under Work Orders.</div>
      </Card>}

    {ticket.status === "Rejected" && <Card style={{ padding: 12, color: MUTED, fontSize: 13 }}>This request was rejected / closed without a work order.</Card>}

    {["New", "Acknowledged"].includes(ticket.status) && <>
      {ticket.status === "New" && <div style={{ marginBottom: 12 }}><Btn kind="ghost" small onClick={acknowledge}><CheckCircle2 size={14} />Acknowledge to client</Btn></div>}
      <Card style={{ padding: 12, background: BG }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>Convert to work order</div>
        <Field label="Work order title"><Input value={cTitle} onChange={(e) => setCTitle(e.target.value)} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Type"><Select value={cType} onChange={(e) => setCType(e.target.value)} options={["Corrective", "Emergency", "Planned"]} /></Field>
          <Field label="Priority"><Select value={cPri} onChange={(e) => setCPri(e.target.value)} options={PRIORITIES} /></Field>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 8, padding: 9, fontSize: 12, color: MUTED, marginBottom: 12 }}>
          SLA on convert: <strong style={{ color: TEAL }}>{SLA[cPri].label}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <Btn kind="danger" onClick={reject}>Reject</Btn>
          <Btn onClick={convert}><ArrowRightCircle size={16} />Create work order</Btn>
        </div>
      </Card>
    </>}
  </Modal>;
}

function TicketCreate({ data, save, onClose }) {
  const [f, setF] = useState({ channel: "Phone", building_id: data.buildings[0]?.id || "", requester_name: "", requester_contact: "", description: "" });
  const submit = () => {
    if (!f.description || !f.building_id) return;
    const base = { id: uid("t_"), channel: f.channel, building_id: f.building_id, asset_id: null, requester_name: f.requester_name || "Caller", requester_contact: f.requester_contact || "—", description: f.description, status: "New", acknowledged_at: null, work_order_id: null, created_at: now(), photos: [] };
    save((p) => { const seq = (p.reqSeq || 0) + 1; return { ...p, reqSeq: seq, tickets: [{ ...base, ticket_no: reqNumber(seq) }, ...(p.tickets || [])] }; });
    onClose();
  };
  return <Modal title="Log a service request" onClose={onClose}>
    <Field label="Channel — how did this request arrive?">
      <Select value={f.channel} onChange={(e) => setF({ ...f, channel: e.target.value })} options={CHANNELS} />
    </Field>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <Field label="Building"><Select value={f.building_id} onChange={(e) => setF({ ...f, building_id: e.target.value })} options={data.buildings.map((b) => ({ value: b.id, label: b.name }))} /></Field>
      <Field label="Requester name"><Input value={f.requester_name} onChange={(e) => setF({ ...f, requester_name: e.target.value })} placeholder="Unit / name / handle" /></Field>
    </div>
    <Field label="Contact (phone, email, handle)"><Input value={f.requester_contact} onChange={(e) => setF({ ...f, requester_contact: e.target.value })} /></Field>
    <Field label="What do they need?"><textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} /></Field>
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Btn kind="ghost" onClick={onClose}>Cancel</Btn>
      <Btn onClick={submit} disabled={!f.description}>Log request</Btn>
    </div>
  </Modal>;
}

/* ---------- Client / resident self-service portal ---------- */
function ClientPortal({ data, save, bById }) {
  const [f, setF] = useState({ building_id: data.buildings[0]?.id || "", requester_name: "", requester_contact: "", description: "" });
  const [mine, setMine] = useState([]); // ticket ids submitted this session
  const [justSent, setJustSent] = useState(null);

  const submit = () => {
    if (!f.requester_name || !f.description) return;
    const newId = uid("t_"); let newNo = null;
    const base = { id: newId, channel: "Web Portal", building_id: f.building_id, asset_id: null, requester_name: f.requester_name, requester_contact: f.requester_contact || "—", description: f.description, status: "New", acknowledged_at: null, work_order_id: null, created_at: now(), photos: [] };
    save((p) => { const seq = (p.reqSeq || 0) + 1; newNo = reqNumber(seq); return { ...p, reqSeq: seq, tickets: [{ ...base, ticket_no: newNo }, ...(p.tickets || [])] }; });
    setMine((m) => [newId, ...m]); setJustSent(newNo);
    setF({ ...f, description: "" });
  };
  const myTickets = (data.tickets || []).filter((t) => mine.includes(t.id));

  return <div style={{ maxWidth: 560, margin: "0 auto", padding: 16 }}>
    <div style={{ textAlign: "center", marginBottom: 6 }}>
      <img src={LOGO_SRC} alt="One Realty" style={{ height: 34, marginTop: 10 }} />
      <h2 style={{ color: TEAL, margin: "10px 0 2px", fontSize: 22 }}>Request building maintenance</h2>
      <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>This is what residents and clients see when they scan a building QR code or open your request link — no login needed.</p>
    </div>

    {justSent && <Card style={{ padding: 12, margin: "14px 0", borderLeft: `4px solid ${GREEN}`, background: GREEN + "12" }}>
      <div style={{ fontSize: 14, color: TEAL, fontWeight: 600 }}>Request received — reference {justSent}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Our maintenance team will acknowledge it shortly. You can track it below.</div>
    </Card>}

    <Card style={{ padding: 16, marginBottom: 16 }}>
      <Field label="Which building?"><Select value={f.building_id} onChange={(e) => setF({ ...f, building_id: e.target.value })} options={data.buildings.map((b) => ({ value: b.id, label: b.name }))} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Your name / unit"><Input value={f.requester_name} onChange={(e) => setF({ ...f, requester_name: e.target.value })} placeholder="e.g. Unit 4B" /></Field>
        <Field label="Contact"><Input value={f.requester_contact} onChange={(e) => setF({ ...f, requester_contact: e.target.value })} placeholder="Phone or email" /></Field>
      </div>
      <Field label="What's the problem?"><textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="Describe the issue and where it is" /></Field>
      <Btn onClick={submit} disabled={!f.requester_name || !f.description}><Send size={16} />Send request</Btn>
    </Card>

    {myTickets.length > 0 && <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginBottom: 8 }}>My requests</div>
      {myTickets.map((t) => {
        const wo = t.work_order_id ? data.workOrders.find((w) => w.id === t.work_order_id) : null;
        const stage = t.status === "Converted" ? (wo && ["Completed", "Signed Off"].includes(wo.status) ? "Resolved" : "Work in progress")
          : t.status === "Acknowledged" ? "Acknowledged by team" : t.status === "Rejected" ? "Closed" : "Received";
        const col = stage === "Resolved" ? GREEN : stage === "Closed" ? MUTED : AMBER;
        return <Card key={t.id} style={{ padding: 12, marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>{t.description}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{t.ticket_no} · {bById(t.building_id)?.name} · {fmtDT(t.created_at)}</div></div>
            <Badge color={col}>{stage}</Badge>
          </div>
        </Card>;
      })}
    </div>}
  </div>;
}

function StorageBanner({ show }) {
  if (!show) return null;
  return <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: RED, color: "#fff", padding: "9px 14px", fontSize: 12, textAlign: "center", zIndex: 60 }}>
    Couldn't save the latest change to this device (storage full or blocked). Recent edits are kept for this session only — export anything important and free up space.
  </div>;
}

function PrintStyles() {
  return <style>{`
    @media print {
      .no-print { display: none !important; }
      body { background: #fff !important; }
      #print-area { position: absolute; left: 0; top: 0; width: 100%; }
      #print-area .recharts-surface { }
    }
    * { -webkit-tap-highlight-color: transparent; }
  `}</style>;
}
