# Okoro Emmanuel Nzube, Data Analyst Portfolio

A Next.js App Router portfolio for a Lagos-based data analyst. The editorial layout is designed around sourced evidence, clear business questions and restrained chart animation.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, result placeholders, featured work and contact links |
| `/about` | Background and working approach |
| `/skills` | Methods, tools and communication |
| `/projects` | Filterable case study index |
| `/projects/[slug]` | Case study structure and sources |
| `/research` | Independent research briefs, election evidence and scenario explorer |
| `/dashboard-lab` | Filterable charts and table using synthetic sample data |
| `/how-i-work` | Analysis and verification workflow |
| `/insights` | Three short marketing and sales analytics notes |
| `/resume` | PDF viewer and download when a resume file is supplied |
| `/contact` | Contact form and profile links |

## Folder structure

```text
app/
  about/                 About page
  api/contact/           Resend-backed serverless form handler
  contact/               Contact form page
  dashboard-lab/         Interactive sample dashboard page
  how-i-work/             Workflow and verification page
  insights/               Editorial notes
  projects/[slug]/        Data-driven case study template
  research/               Independent research and interactive election scenarios
  resume/                 Conditional PDF viewer
  skills/                 Skills grouped by practice
  globals.css             Design tokens, base styles and reduced motion
  layout.tsx              Shared layout and SEO metadata
  sitemap.ts, robots.ts   Search engine routes
components/
  ui/chart.tsx            Small chart container following shadcn/ui conventions
  dashboard.tsx           Filter state, KPIs, Recharts and sortable table
  hero-scene.tsx          Animated SVG hero
  ounjefood-story.tsx     Sticky chart and scroll-linked story steps
  project-filter.tsx      Client-side theme filter
  project-card.tsx        Editorial project preview
  contact-form.tsx        Accessible contact form
  ...                     Shared navigation, theme, KPI, headings and footer
data/
  projects.json           Server-loaded project content and citations
  dashboard-sample.json   Clearly labelled synthetic demo rows
public/
  emmanuel-nzube-cv.pdf   Add the approved CV to enable the PDF viewer
```

## Components and visual system

- Tailwind CSS 3 with theme tokens in `tailwind.config.ts`; shared CSS variables are in `app/globals.css`.
- `components.json` provides shadcn/ui project configuration. The chart wrapper is a small local `ChartContainer`; chart rendering uses Recharts. Native form controls avoid unnecessary UI dependencies.
- Palette: near-black `#0B0B0D`, wine `#7A1F2B`, wine text `#D0586C`, soft off-white `#F1EDED`, border `#2A2A30`, success `#3E9B73`, warning `#C79A3B`; political charts use neutral candidate colors.
- Inter and Space Grotesk variable fonts are bundled locally through Fontsource packages; there are no runtime font requests to third parties.
- Layout uses numbered sections, asymmetric columns, thin rules, small radii and minimal shadows. No stock imagery is included. The portrait remains an explicit placeholder.
- Light and dark themes use CSS variables and a persisted theme toggle. `prefers-reduced-motion` disables non-essential transitions and animation.

## Animation and chart patterns

- The hero draws a red SVG line on entry and shifts it only a few pixels with pointer movement. Reduced-motion users see the completed static line.
- KPI figures enter view once; supplied values are placeholders until verified results are provided.
- `OunjeFoodStory` uses a sticky chart beside scroll steps. Intersection Observer selects each stage. The bars are explicitly illustrative and do not claim client results.
- Recharts line, bar and donut charts animate once on mount and respect `useReducedMotion`. Titles describe a finding and update with the dashboard filters. All dashboard data is synthetic.
- The tool strip pauses on hover or keyboard focus. Page entry uses a small fade and rise, without a blocking loading state.

## Data loading and evidence

Project data and dashboard JSON live in `/data`. The 2023 state results are in `data/election-2023.csv`; the research route validates and aggregates them on the server before passing required values to interactive client components. The project detail route generates static paths from the project index.

Every project needs a source citation and publication review. The Online Retail and Bank Marketing cases cite their UCI Machine Learning Repository datasets. The Nigeria market case links to the World Bank indicator endpoint; select a period, validate observations and describe the indicator before publishing a finding. OunjeFood is marked confidential and requires approved data wording, permission and verified results. Do not publish customer or vendor identifiers.

Replace `[ADD REAL RESULT]` and other bracketed prompts with substantiated outcomes. The Dashboard Lab data is synthetic, not a result or market estimate. The marketing dataset has no spend or revenue fields, so it cannot support an ROI calculation. The election scenario explorer uses a common 26.71% national turnout reference because zone-level register denominators were not included; it is a what-if tool, not a forecast. Four-candidate state shares are not a substitute for complete state valid-vote totals.

## Contact form configuration

The form uses the Resend HTTP API on a Next.js serverless route. Resend has a free plan; configure an account, API key and a verified sender domain before production. Add these environment variables to local `.env.local` and Vercel:

```text
RESEND_API_KEY=
CONTACT_EMAIL=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

`RESEND_FROM_EMAIL` must be a sender permitted by the Resend account. The route returns a visible configuration error when values are absent and does not report a false success.

## Local setup

```bash
npm install
npm run dev
```

Check types with `npm run lint` and create a production build with `npm run build`.

## Vercel free-tier deployment checklist

1. Push the project to a Git provider and import it into Vercel.
2. Keep the framework preset as Next.js and use the default build command, `npm run build`.
3. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` in the Vercel project settings. Use a verified sending domain.
4. Add the approved CV at `public/emmanuel-nzube-cv.pdf`; rebuild to enable the viewer and download link.
5. Replace the portrait placeholder, email and social profile links with Emmanuel’s approved details.
6. Replace every result placeholder with checked, publishable evidence. Confirm data permissions and anonymise confidential records.
7. Verify public dataset licences and cite the exact indicators, periods and transformations on each case study.
8. Test every route, mobile navigation, theme toggle, filters, table sorting, reduced-motion mode, keyboard focus and contact-form error/success states.
9. Run Lighthouse on a production deployment. Confirm accessibility, contrast, image usage and Core Web Vitals before sharing the URL.
10. Set the production site URL and inspect `/sitemap.xml`, `/robots.txt`, page titles and social previews.

The requested red is configured as `#D6212B`. Check it against the current Redwire Group logo before presenting the site as brand-matched, since no logo file was supplied.
