# D7 Platform Architecture

## Deployment topology

- **Main website + administration:** `https://d7leos.org` — Vercel project rooted at this repository root.
- **LMS:** `https://lms.d7leos.org` — separate Vercel project rooted at `lms-app/`.
- Both applications use the **same Firebase project** for Authentication, Firestore and Storage.
- There is **no Supabase dependency**.

The existing visual design is intentionally preserved. This refactor changes code/data boundaries rather than redesigning the website.

## Architectural style

The project uses a **feature-first modular layered architecture**:

`Presentation (app/components) -> Services -> Repositories -> Firebase / JSON / external APIs`

### Rules

1. Pages and visual components do not query Firestore directly.
2. Firebase access lives in repository/core infrastructure files.
3. Business operations are exposed through services.
4. Editable business content uses Firestore where appropriate.
5. Stable reference/configuration data uses JSON or typed config modules.
6. Uploaded/dynamic media uses Firebase Storage; fixed brand assets can remain in `public/`.
7. Shared business data has one canonical source.
8. Brand colours are never embedded in page JSX; they resolve through design tokens.
9. Client-side guards are UX only. Firestore/Storage Rules and server-side token verification are the security boundary.

## Source layout

```text
app/                         Main Next.js website routes and API routes
components/                  Shared website presentation components
src/
  core/
    auth/                    Shared authorization / OTP infrastructure
    config/                  Site and non-CSS server configuration
    firebase/                Firebase client/admin initialization
    storage/                 Firebase Storage service
    theme/                   Universal D7 design tokens
  modules/
    about/
    admin/
    all-rounders/
    ascent/
    chatbot/
    city-to-soil/
    clubs/
    council/
    courses/
    home/
    kpi/
    merchandise/
    navigation/
    projects/
    reports/
    users/
lms-app/                     Independent Next.js LMS application
public/                      Fixed website assets only
```

## Data ownership

### JSON / typed configuration
Use this for stable data that should change rarely and does not justify a database read:

- Navigation structure
- Merchandise sizes and size chart
- Merchandise product catalogue (until a product CMS is required)
- KPI event reference lists
- Project category definitions
- Course difficulty definitions
- Static fallback content

All of these are still consumed through services/config modules rather than imported into pages as ad-hoc constants.

### Firestore
Use Firestore for content/records that administrators or users need to update without redeploying:

- `siteContent/council` — Council CMS content
- `projects`
- `newsletters`
- `allRoundersHighlights`
- `courses`
- `users`
- `kpiProfiles`
- `evaluations`
- `merch_orders`

The Council JSON file is a seed/fallback so the site remains resilient if Firestore content has not been seeded yet. Public Council and admin Council now use the same service/data model.

### Firebase Storage
Recommended paths:

```text
website/projects/
website/council/
website/ascent/
website/all-rounders/
lms/thumbnails/
lms/resources/
lms/certificates/
users/{uid}/
merch_receipts/              private, server-only
```

Fixed logos/icons/decorative assets may remain in `public/` and are served by Vercel.

## Theme system

The universal theme source is:

`src/core/theme/tokens.css`

Tailwind aliases in both applications map to these CSS variables. For example:

- `bg-burgundy` -> `--brand-burgundy`
- `text-gold` -> `--brand-gold`
- `bg-fuchsia` -> `--brand-fuchsia`

Changing a brand colour in `tokens.css` changes the website and LMS consistently without editing page components. `src/core/config/site.ts` contains matching hex values only for environments where CSS variables do not exist, such as transactional HTML email.

## LMS deployment

Create a second Vercel project from the same Git repository:

- Root Directory: `lms-app`
- Domain: `lms.d7leos.org`
- Add the same Firebase web/admin environment variables.
- Enable Vercel's **Include source files outside the Root Directory** option for the LMS project because it intentionally consumes the repository-level shared `src/`, `lib/`, and `types/` modules. `experimental.externalDir` is enabled in `lms-app/next.config.js`.

The main route `/lms` redirects to `NEXT_PUBLIC_LMS_URL`.

In Firebase Authentication add these authorized domains:

- `d7leos.org`
- `www.d7leos.org`
- `lms.d7leos.org`
- relevant Vercel preview domains used during testing

## Firebase rules

- `firestore.rules` is included and denies unknown collections by default.
- `storage.rules` is included; merchandise receipts are server-only/private.
- Admin/trainer writes require the corresponding role in `users/{uid}.role`.
- Assign initial administrator roles in Firestore before relying on the admin UI. No source-code hardcoded admin email bypass remains.

Deploy rules with Firebase CLI after reviewing them against the production Firebase project.

## Vercel projects

### Main website
- Build command: `npm run build`
- Root: repository root
- Production domain: `d7leos.org`

### LMS
- Build command: `npm run build`
- Root: `lms-app`
- Production domain: `lms.d7leos.org`

## Migration principle

The refactor intentionally avoids a visual rewrite. Existing page composition, animations and responsive layouts are retained while data sources and infrastructure are extracted behind stable services. Future modules should follow the same boundaries instead of adding Firebase queries or master-data arrays directly to React pages.
