# ⚡ IoT Electricity Monitoring Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-22B5BF?logo=chartdotjs&logoColor=white)](https://recharts.org)
[![Termux](https://img.shields.io/badge/Built_on-Termux-000000?logo=terminal&logoColor=white)](https://termux.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)](https://github.com/aritofureda/iot-dashboard/pulls)

---

> Dashboard admin untuk monitoring konsumsi listrik IoT secara real-time. Dibangun dengan React + Vite, dirancang untuk skala 10–100 device/meter.

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 📊 **Dashboard** | Overview real-time: total kWh, estimasi biaya, device online, alert aktif |
| 🔌 **Device List** | Tabel semua meter dengan filter status & pencarian |
| 📈 **Device Detail** | Gauge real-time (Watt, Volt, Ampere) + grafik historis (harian/mingguan/bulanan) |
| 🚨 **Alerts** | Monitoring threshold + riwayat alert + konfigurasi batas per device |
| 📑 **Reports** | Laporan konsumsi + export PDF & Excel |
| ⚙️ **Settings** | Nama dashboard, tarif Rp/kWh, interval refresh, timezone |

## 🖼️ Tampilan

```
Login              → Dashboard Overview
                     ├─ KPI Cards (4)
                     ├─ Grafik Konsumsi 24 Jam
                     └─ Tabel Status Device
                          └─ Klik → Device Detail
                                   ├─ Gauge Real-time
                                   ├─ Grafik Histori
                                   └─ KPI Device
Device List        → Filter + Search → Detail
Alerts             → Alert Aktif / Riwayat / Threshold Config
Reports            → Filter Device + Tanggal → Export PDF/Excel
Settings           → Konfigurasi Umum
```

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 + Inter Font |
| Charts | Recharts |
| Table | TanStack Table v8 |
| State | Zustand |
| HTTP | Axios |
| Date | date-fns |
| Export | xlsx (Excel) + jsPDF (PDF) |
| Icons | lucide-react |

## 🚀 Cara Jalankan

```bash
# Clone
git clone https://github.com/aritofureda/iot-dashboard.git
cd iot-dashboard

# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

Buka `http://localhost:5173` di browser. Login dummy: klik **Masuk** (tanpa isi form).

## 📂 Struktur Proyek

```
src/
├── api/            # Mock data & API layer
├── components/
│   ├── ui/         # Button, Card, Badge, Modal, Input, Select, Table
│   └── feedback/   # LoadingSpinner, EmptyState, ErrorMessage
├── features/
│   ├── auth/       # Login page
│   ├── dashboard/  # Overview + chart + device table
│   ├── devices/    # List, detail, gauge, history chart
│   ├── alerts/     # Alert list, threshold config
│   ├── reports/    # Report table, chart, export
│   └── settings/   # Settings form
├── hooks/          # useDevices, useDeviceDetail, useAlerts, useReports
├── layouts/        # Sidebar, Topbar, MainLayout
├── store/          # Zustand stores (alertStore, settingsStore)
└── utils/          # formatEnergy, formatCurrency, formatDate
```

## 🎨 Design System

- **Style:** Flat/Solid — tanpa gradient, glassmorphism, atau shadow berlebihan
- **Sidebar:** `#1E293B` (dark), lebar 240px
- **Content:** `#F8FAFC`, padding 24px
- **Primary:** `#2563EB` | **Success:** `#16A34A` | **Danger:** `#DC2626` | **Warning:** `#D97706`
- **Responsive:** Desktop ≥1280px, Tablet 768–1279px (sidebar collapsible)

## 🔌 Integrasi IoT

Untuk integrasi dengan hardware nyata (ESP32 + sensor SCT-013 / ZMPT101B):

1. Ganti `src/api/axiosInstance.js` — `baseURL` -> `http://localhost:3000/api`
2. Ganti `src/api/mockData.js` — endpoint real
3. Tambah WebSocket di hooks untuk data real-time

## 📄 Lisensi

[MIT](LICENSE) © 2026 [aritofureda](https://github.com/aritofureda)

---

**Built with ❤️ on Termux**
