# ANTIGRAVITY.md (Master Plan)

## 📍 Module 0: Global Layout & User Profile
**Goal**: Persistent navigation and user management accessible from any page [Source: Memo 19].

### 1. Global Header UI
*   **Position**: Fixed Top-Right corner (Z-index: 50).
*   **Visibility**: Visible on all pages *except* the Landing/Login page.
*   **Component**: **User Avatar Icon** (Circle with user initials, e.g., "DK").

### 2. User Profile Interaction (The Popover/Modal)
*   **Trigger**: Clicking the User Avatar opens a **Profile Settings Modal** (Notion-style styling).
*   **Section A: User Information (Read-Only)**
    *   *Goal*: Display data entered during Sign-up [Source: Memo 17, 18].
    *   *Fields to Display*:
        *   **Name**: First Name + Last Name
        *   **Email**: User email
        *   **Role**: Job Title & Occupation (e.g., "Oncologist")
        *   **Affiliation**: Institution Name
        *   **Focus**: Research/Clinical Focus
*   **Section B: Account Actions**
    *   **Change Password**:
        *   Fields: *Current Password*, *New Password*, *Confirm New Password*.
        *   Action: "Update" button (Simulate success toast).
    *   **Logout**:
        *   Style: Red text or distinct button.
        *   Action: Clear session state and redirect to **Landing Page (Module 1)**.

### 3. Sidebar Navigation (Global) [Source: Memo 19]
*   **Position**: Fixed Left Sidebar.
*   **Items**:
    1.  **Dashboard** (Default Active)
    2.  **Ingestion**
    3.  **Cohort Studio**
*   **Style**: Minimalist, active state highlighted with a soft background color.

## 📍 Module 1: Landing & Authentication (Login-First Flow)
**Goal**: Professional onboarding with a split-state interface (Login vs. Sign-up) [Source: Memo 17].

### 1. UX Logic (State Management)
*   **Default State**: **Login View**. The user must see the Login form first.
*   **Transition**: Provide a "Create an Account" link. Clicking this toggles the view to the **Registration Form** using a smooth Framer Motion transition (e.g., card flip or slide).
*   **Background**: Clean, scientific aesthetic (Notion-style minimal layout).

### 2. View A: Login (Default)
*   **Fields**:
    *   Email
    *   Password
*   **Actions**:
    *   Primary Button: "Log In" (Redirects to Dashboard upon click).
    *   Secondary Link: "New to Inocras? Sign up".

### 3. View B: Registration (Sign Up)
*   **Trigger**: Activated only when the user chooses to sign up.
*   **Required Form Fields** [Source: Memo 17]:
    1.  **Email**
    2.  **First Name** & **Last Name**
    3.  **Job Title**
    4.  **Affiliated Institution**
    5.  **Research / Clinical Focus** (Free text)
*   **Dropdown: Occupation / Industry** [Source: Memo 18] (Must include these exact options):
    *   *Options*: Oncologist, Pathologist, Surgeon, Other Clinician, Biotech/Pharma - Drug Discovery, Biotech/Pharma - Clinical Development, Biotech/Pharma - Business Development, Biotech/Pharma - Others, Diagnostic Company, Academic Researcher, Researcher / Bioinformatician, Investor, Others.
*   **Consents** [Source: Memo 17, 18]:
    *   [Checkbox] Agree to Terms & Conditions.
    *   [Checkbox] Subscribe to Inocras’ monthly newsletter.
*   **Action**: "Create Account" Button (Simulates registration and auto-logins to Dashboard).

### 4. Project Intro (Hero Section)
*   Display a brief project tagline above or beside the form: *"Global Cancer Intelligence Platform: Secure Genomic Analysis & AI Cohort Studio"* [Source: Memo 16].

## 📍 Module 2: Researcher Dashboard
**Goal**: Provide immediate situational awareness of genomic assets and analysis status using a "Notion-style" card layout [Source: Memo 19].

### 1. Layout Strategy (Grid System)
*   **Style**: Bento Grid or Masonry Layout.
*   **Spacing**: Comfortable whitespace (`gap-6`) to maintain the "Scientific yet Accessible" aesthetic.
*   **Background**: Soft gray (`bg-slate-50`) to make white cards pop.

### 2. Section A: Key Metrics (Top Row)
*   **Component**: Stat Cards with Icons.
*   **Card 1: Active Pipeline**
    *   *Label*: "Analyzing Samples"
    *   *Value*: **12** (Animated counter)
    *   *Status*: "Running..." with a pulsing green dot.
*   **Card 2: My Cohort Size**
    *   *Label*: "Total Cases"
    *   *Value*: **1,250**
    *   *Trend*: "+25 this week" (Green text).

### 3. Section B: Cohort Demographics (Visual Analytics) [Source: Memo 19]
*   **Requirement**: Visualize the distribution of the user's current cohort using **Recharts** or **Nivo**.
*   **Chart 1: Cancer Type Distribution (Bar Chart)**
    *   *Data*: Gastric Cancer (450), Lung Adenocarcinoma (300), Colorectal Cancer (200), Others (300).
    *   *Style*: Minimalist bars, tooltip on hover.
*   **Chart 2: Gender Distribution (Donut Chart)**
    *   *Data*: Male (60%), Female (40%).
    *   *Center Label*: Total count.
*   **Chart 3: Age Distribution (Histogram/Area Chart)**
    *   *X-Axis*: Age Groups (20s, 30s, ... 80s).
    *   *Y-Axis*: Count.
    *   *Insight*: Peak at 50-60s.

### 4. Section C: Activity Center (Bottom Row)
*   **Card 1: Recent Notifications (Alerts)** [Source: Memo 19]
    *   *UI*: List of actionable cards.
    *   *Item 1 (Success)*: "Batch Upload #2402 Completed. 25/25 files ready." (Green border).
    *   *Item 2 (Info)*: "New Nature citation added to CUBRICS database." (Blue border).
*   **Card 2: Ongoing Queries (Progress)**
    *   *UI*: List with Progress Bars.
    *   *Item*: "Query: Stage III vs IV Survival Analysis" -> **Running (78%)**.
    *   *Item*: "Ingestion: Sample_PK_092" -> **Alignment (BWA) in progress**.
*   **Card 3: History Log**
    *   *UI*: Timeline style (vertical line).
    *   *Entries*:
        *   "Exported VCF Bundle (2 hours ago)"
        *   "Modified Filter: 'EGFR Positive' (Yesterday)"
        *   "Login from New Device (3 days ago)"

### 5. Mock Data Assets (For Module 2)
*   *Directive*: Use this exact data to render the dashboard charts.
    ```javascript
    export const DASHBOARD_DATA = {
      cancerDist: [
        { name: 'Gastric', count: 450, color: '#0F172A' }, // Slate-900
        { name: 'Lung', count: 300, color: '#334155' },    // Slate-700
        { name: 'Colorectal', count: 200, color: '#475569' }, // Slate-600
        { name: 'Others', count: 300, color: '#94A3B8' }    // Slate-400
      ],
      ageDist: [
        { age: '20s', count: 50 }, { age: '30s', count: 120 },
        { age: '40s', count: 280 }, { age: '50s', count: 350 },
        { age: '60s', count: 300 }, { age: '70s+', count: 150 }
      ]
    };
    ```


## 📍 Module 3: Ingestion & Pipeline (Dual Channel)
**Goal**: Provide a dual-pathway (Data vs. Specimen) for accessing the "Standardized Cancer Genome Pipeline" (Citation: 2026 Nature, XX) [Source: Platform Spec 4].

### 1. Global Visual & Policy Standards
*   **Pipeline Badge**: A prominent Gold/Blue badge at the top: *"Standardized Cancer Genome Pipeline (Nature 2026, XX)"* [Source: 4].
*   **Terms & Conditions Modal**: Before any upload, users must agree:
    1.  "Metadata and VCF results will be used for the Initiative's follow-up analysis."
    2.  "Uploaded FASTQ/BAM/CRAM files are strictly deleted after processing."
*   **Data Responsibility Warning**: Display a notice: *"You are responsible for obtaining necessary IRB approval when submitting additional medical data."*

### 2. Channel A: FASTQ Submission (Digital)
#### A-1. Metadata & OMOP-CDM
*   **Required Fields**: Age, Sex, Cancer Type, Pathological Subtype.
*   **Medical Data Integration**: Provide a distinct link/button: *"Link additional medical data via OMOP-CDM"*.

#### A-2. Single Case Upload [Source: 4.1.1]
*   **Input**: Drag & Drop zone specifically requesting a **Tumor-Normal Pair** (2 files).
*   **Logic**:
    *   **QC Failure**: If quality is low, show a **QC Report Card** detailing the reason (e.g., "Low Read Depth").
    *   **QC Success**: Transition to **Progress Bar**.
        *   *Visual*: Show pipeline stages (Alignment -> Variant Calling).
    *   **Output**: "Download VCF Bundle (.zip)" button upon completion.

#### A-3. Cohort (Multi-cases) Upload [Source: 4.1.2]
*   **Input**:
    *   **File Uploader**: Bulk upload capability.
    *   **Naming Guide**: Text hint: *"Ensure filenames are paired (e.g., Sample_01_Tumor.fastq / Sample_01_Normal.fastq)."*
    *   **Metadata Import**: Provide two options:
        1.  Interactive Table UI.
        2.  **"Upload CSV/Excel"** button for bulk metadata.
*   **Process Logic (The "10+ File Rule")**:
    *   **Trigger**: If total files > 10.
    *   **Action**: Initiate **Random Sampling QC**.
        *   System randomly selects 1-2 files.
        *   *Condition (Fail)*: If sample fails, **Stop the entire batch** and show an Error Modal.
        *   *Condition (Pass)*: Proceed to full batch processing.

### 3. Channel B: Specimen Submission (Physical) [Source: 4.2]
*   **Header Notice (Info Alert)**:
    *   *"Analysis performed at CLIA Lab. For a CLIA Report, an HCP prescription is required. Please contact the Lab Manager."*
*   **Submission Form**:
    *   **Pickup Request**: Date picker, Location address.
    *   **Metadata**: Age, Sex, Cancer Type, Pathological Subtype.
    *   **OMOP-CDM**: Link for additional medical data.
*   **Post-Submission Action**:
    *   **ID Generation**: Automatically generate and display a tracking ID (e.g., `SP-2026-KR-009`).
*   **Tracking UI (Progress Bar)**:
    *   Display a 5-step horizontal tracker with estimated dates:
    1.  **Pickup Kit Sent** (Est. Date)
    2.  **Received**
    3.  **Sequencing**
    4.  **Pipeline Analysis**
    5.  **Email Alert Sent**


## 📍 Module 4: Cohort Studio (AI Co-Scientist & Analytics)
**Goal**: A unified environment for managing cohort statistics and performing AI-driven comparative analysis without requiring manual coding [Source: Platform Spec 3].

### 1. Cohort Dashboard (The Landing View) [Source: 3.1]
*   **Layout**: A 2x2 Comparative Grid displaying "Key Demographics" (Total Cases, Cancer Type, Gender, Age Distribution) for each dataset.
*   **Visuals**: Use **Recharts/Nivo** to render mini-charts (Donut/Bar) within each card.
    1.  **CUBRICS Data**:
        *   *Badge*: *"Verified WGS (Nature 2025, XX)"*.
        *   *Stats*: Total 12,000 cases.
    2.  **TCGA WGS Data**: Standard benchmark reference.
    3.  **My Active Cohort**: Real-time stats of the user's uploaded/selected cases.
    4.  **Shared Cohorts**: Data shared by other researchers with permission.

### 2. Analysis Interface (Split-Pane Studio) [Source: 3.2]
*   **Layout**: Fixed Split View - **Left Panel (Chat/Builder)** (40%) / **Right Panel (Jupyter/Code)** (60%).
*   **History Sidebar**: Collapsible list showing "Recent Analysis Sessions" [Source: 3.3].

#### Component A: Natural Language & Dynamic Builder (Left Panel)
*   **Input**: Chat interface where users can type natural language queries.
*   **Scenario**: User types *"Compare the HRD Score between Stage III and Stage IV Gastric Cancer patients."*
*   **Function**: The AI interprets this and automatically generates filters/code.

#### Component B: Code-based Interface (Right Panel - The "Ghost Writer")
*   **Concept**: Provide a "Transparent verification process" where the AI writes code in front of the user [Source: 3.2].
*   **Animation Logic**:
    1.  **Trigger**: Upon receiving the query from the Left Panel.
    2.  **Creation**: A new Jupyter cell is created.
    3.  **Typing Effect**: Simulate character-by-character typing of the Python code (Pandas/Lifelines libraries).
        *   *Code Content*: Load Cohort -> Filter Stage III/IV -> T-test Calculation -> Plotting Logic.
    4.  **Execution**: Auto-run the cell (Spinner animates).
    5.  **Rendering**:
        *   **Table**: Statistical results (P-value).
        *   **Graph**: Render an interactive **Kaplan-Meier Survival Curve** or **Oncoprint** (Mutation Frequency) using Recharts.

### 3. Agentic AI Features (Co-Scientist)
*   **Role**: The AI acts as a research assistant that autonomously designs the query and selects the appropriate statistical method (e.g., T-test, Log-rank test).
*   **Visual Feedback**: Show "Thinking" steps in the chat: *1. Identifying Groups -> 2. Selecting Log-rank test -> 3. Generating Python Code...*

### 4. Export & Compliance [Source: 3.3]
*   **Trigger**: Clicking the "Export Result" or "Download Report" button.
*   **Security Visualization**:
    *   **Blocking Action**: Display a Modal/Overlay.
    *   **Animation**: A scanning radar or progress bar with the text: **"AI scanning for PII (Personally Identifiable Information)..."**.
    *   **Outcome**: Only after the scan "Passes" (Mock delay 2s), allow the file download.
