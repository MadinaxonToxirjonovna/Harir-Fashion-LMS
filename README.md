# HARIR FASHION LMS
### Premium Learning Management System for Sewing, Tailoring & Haute Couture Academy

---

## 1. Overview & Brand Identity

**HARIR FASHION LMS** is a specialized, production-ready educational management system crafted specifically for fashion ateliers, bespoke sewing academies, pattern making workshops, and haute couture training centers.

### Visual Identity & Palette
- **Deep Plum:** `#39243A` (Primary navigation, headers, and luxury accents)
- **Warm Burgundy:** `#7A3548` (Action highlights, badges, and active tab indicators)
- **Soft Champagne:** `#D9C3A3` (Delicate stitching borders, insignia accents, and certificate gold foil)
- **Warm Ivory:** `#FAF7F2` (Background surfaces and certificate bases)
- **Main Text:** `#25232A`
- **Secondary Text:** `#716B73`
- **Surface Borders:** `#E8E0E5`
- **Dark Mode:** Deep plum/charcoal tones (`#151016` / `#211822`) with high-contrast ivory typography.

### Brand Logo & Assets
- Vector brand monogram and logo assets are located in [`public/harir-logo.svg`](public/harir-logo.svg), [`public/favicon.svg`](public/favicon.svg), and [`src/assets/harir-logo.svg`](src/assets/harir-logo.svg).
- If replacing with a custom vector or PNG asset, place the file in `public/harir-logo.svg` preserving the dimensions.

---

## 2. Four Application Roles & Access Control

The platform enforces strict role-based access control across both the UI and database Row-Level Security (RLS):

| Feature / Module | Owner | Administrator | Master Teacher | Student |
| :--- | :---: | :---: | :---: | :---: |
| **Operational Overview Dashboard** | Full | Operational | Assigned Cohorts | Personal Progress |
| **Faculty Compensation & Payroll** | **Visible Only to Owner** | **Masked / Hidden** | **Hidden** | **Hidden** |
| **Student Registration & Transfer** | Full | Full | View Assigned | Forbidden |
| **Attendance Register & Reasons** | Full | Full | Mark Assigned | View Own |
| **Fashion Practical Rubrics & Grades** | Full | View Only | Grade Assigned | View Own Only |
| **Atelier Group Chat (Media & Video)** | Full | Monitored | Assigned Groups | Active Group |
| **Certificate Studio (10 Designs)** | Generate & Issue | Issue Allowed | Review | View Conferred |
| **Audit Logs & Security Trails** | Full Access | No Access | No Access | No Access |

### Critical Security Safeguards
1. **Confidential Payroll & Compensation:** Salary rates, lesson pay calculation, and compensation models are accessible **strictly to the Owner**. Non-owner requests to payroll tables are blocked at the PostgreSQL RLS layer and client context level.
2. **Attendance Truthfulness:** Absence reasons are never fabricated. If an unexcused absence occurs, the system records `Absent — reason not provided`.
3. **Historical Record Preservation:** When transferring a student between cohorts, the previous enrollment is marked `transferred`, preserving historical attendance, rubric scores, and submissions without deletion.

---

## 3. Key Modules

### A. Certificate Studio (10 Distinct A4 Landscape Designs)
Located in `src/components/certificates/`, featuring:
1. **01 — Classic Academic Excellence:** Traditional prestigious double-line ornamental border, academic serif, formal seals.
2. **02 — Modern Minimal Premium:** Contemporary whitespace, plum typography, and burgundy line work.
3. **03 — Royal Gold Edition:** Warm ivory background with champagne gold ornamental filigree.
4. **04 — International Achievement:** Symmetrical composition, ISO/ECTS accreditation details, and verification stamps.
5. **05 — Pattern Making & Technical:** Millimeter ruler border, technical drafting motifs, and geometry accents.
6. **06 — Student Excellence Award:** Medal-inspired graphic with prestigious distinction badge.
7. **07 — Creative Atelier Edition:** Tasteful angular color blocks and fashion runway aesthetic.
8. **08 — Executive Professional Certificate:** Corporate couture diploma layout with restrained decoration.
9. **09 — Signature Luxury Edition:** High-end editorial typography with silk texture motifs.
10. **10 — HARIR FASHION Official Flagship:** The academy's standard credential combining the needle & thread monogram, gold seal, and dual-language accreditation.

- **A4 Print Specifications:** Uses `@page { size: A4 landscape; margin: 0; }` with exact `297mm × 210mm` canvas. Automatically hides all buttons, sidebars, and editor controls during browser printing.
- **QR Code Verification:** Automatically embeds a scannable QR verification placeholder linking to `https://harirfashion.uz/verify/[ID]`.
- **Dual Language:** Instant switch between English and Uzbek certificate texts.

### B. Practical Sewing Rubric (1.0 to 5.0 Scale)
Evaluates atelier-specific skills:
- **Measurement Precision:** Accuracy of anatomical landmarks.
- **Pattern Drafting Accuracy:** Dart manipulation, grainlines, and bodice curves.
- **Cutting Precision:** Grain alignment and clean seam allowances.
- **Machine Handling:** Industrial lockstitch and serger tension mastery.
- **Seam Quality:** French seams, bias binding, and stitch cleanliness.
- **Fitting & Silhouette:** Ease allowances on mannequin and live fitting.
- **Finishing & Hemming:** Blind hemming and lining insertion.
- **Pressing (VTO):** Steam shaping and molded seam flattening.

### C. Real In-App Group Chat
- Supports text, fashion emoji palette, photo uploads, voice note simulation, and video uploads.
- **Video Restriction:** Enforces standard rectangular aspect ratio with a **hard 60-second limit** in client validation.
- Reply-to-message threading, sender role badges, and timestamps.

### D. Four Languages & Arabic RTL Support
- Supported: **Uzbek (`uz`)**, **Russian (`ru`)**, **English (`en`)**, and **Arabic (`ar`)**.
- When Arabic is selected, the application automatically switches `document.documentElement.dir = "rtl"`, with proper layout mirroring for sidebars, tables, forms, and message bubbles.

---

## 4. Local Installation & Development

### Prerequisites
- Node.js `v18+` (Tested on `v22.22.3`)
- npm `v9+` (Tested on `10.9.8`)

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite
npm test

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 5. Supabase Database Setup & Deployment

1. Create a new project in [Supabase](https://supabase.com).
2. Go to **SQL Editor** in your Supabase Dashboard.
3. Open [`supabase/migrations/20261029_initial_schema.sql`](supabase/migrations/20261029_initial_schema.sql) and execute the entire script to create:
   - All enum types (`user_role`, `attendance_status`, `enrollment_status`, `message_type`).
   - Tables (`profiles`, `programs`, `courses`, `groups`, `enrollments`, `lesson_sessions`, `student_attendance`, `grades`, `group_messages`, `compensation_rules`, `pay_periods`, `payroll_entries`, `audit_logs`, `certificates`, `student_portfolio_items`, etc.).
   - Explicit Row-Level Security (RLS) policies for all roles.
4. Execute [`supabase/seed.sql`](supabase/seed.sql) to populate realistic demo courses, cohorts, instructors, and compensation entries.
5. Create two private storage buckets in **Storage**:
   - `harir-group-media` (for atelier chat uploads)
   - `harir-portfolio-images` (for student garment showcases)
6. Copy your project URL and anon public key to `.env` based on [`.env.example`](.env.example).

---

## 6. Vercel Frontend Deployment

1. Push this repository to GitHub or GitLab.
2. In [Vercel](https://vercel.com), click **Add New Project** and select this repository.
3. In **Build and Output Settings**, Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the environment variables:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-public-key`
5. Click **Deploy**.

---

## 7. Testing & Verification Checklist

- [x] **Owner Bootstrap & Role Security:** Owner has full control; sensitive payroll tables are hidden from Administrator, Teacher, and Student.
- [x] **Group Transfers:** Historical attendance, grades, and submissions are preserved when switching cohorts.
- [x] **Absence Recording:** Does not invent absence reasons; accurately marks unexcused absences.
- [x] **Video Duration:** Client immediately detects and rejects videos longer than 60 seconds.
- [x] **Fashion Rubrics:** Clamps grades to the 1.0–5.0 scale with granular criteria.
- [x] **Certificates:** Exactly 10 distinct A4 landscape designs with printable CSS (`@page { size: A4 landscape; margin: 0; }`).
- [x] **Language & RTL:** Seamless switching between Uzbek, Russian, English, and Arabic (RTL).
- [x] **Theme Persistence:** Light and dark mode support with localStorage persistence.
