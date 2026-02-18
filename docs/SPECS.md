# SPECS.md

## 1. Technical Stack
*   **Framework**: Next.js 14+ (App Router).
*   **Styling**: Tailwind CSS (Utility-first).
*   **Icons**: Lucide-react (Clean, stroke-based).
*   **Animation**: Framer Motion (Crucial for page transitions, pipeline bars, and typing effects).
*   **Charts**: Recharts or Nivo (Responsive, interactive charts for genomic data).

## 2. Design System (The "Notion" Aesthetic)
*   **Typography**: Inter or System UI (Clean, sans-serif).
*   **Color Palette**:
    *   *Background*: White (`#FFFFFF`) or Soft Gray (`#F7F7F5`).
    *   *Text*: Slate-900 (Primary), Slate-500 (Secondary).
    *   *Accents*: Minimal use. Use specific semantic colors:
        *   *Success*: Emerald-500 (QC Pass).
        *   *Error*: Red-500 (QC Fail).
        *   *Brand*: Indigo-600 or Black (Primary Actions).
*   **Components**:
    *   **Cards**: Flat, thin borders (`border-gray-200`), subtle shadows on hover.
    *   **Layout**: Global Sidebar (Left) + Content Area (Right).

## 3. Directory Structure (Suggested)
/app
  /dashboard
  /ingestion
  /cohort
/components
  /ui (Button, Card, Input)
  /viz (PipelineVisualizer, JupyterCell, KaplanMeierChart)
/data
  mockPatients.ts (The central mock database)