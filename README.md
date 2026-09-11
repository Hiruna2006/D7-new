# Leo District 306 D7 Platform

Official digital platform for Leo District 306 D7.

## Production topology

- **Website + Admin:** `https://d7leos.org` — Next.js on Vercel
- **LMS:** `https://lms.d7leos.org` — separate Next.js/Vercel project in `lms-app/`
- **Backend:** Firebase Authentication + Firestore + Firebase Storage
- **Email:** Resend
- **Other integrations:** Google Sheets, reCAPTCHA, Google Analytics, OpenRouter/Hugging Face where configured
- **Supabase:** not used

## Architecture

The codebase follows a **feature-first modular layered architecture**:

`Presentation -> Services -> Repositories -> Firebase / JSON / external APIs`

See `ARCHITECTURE.md` for the full rules and data ownership model.

### Main structure

```text
app/                     Main website routes, admin routes and server APIs
components/              Shared website presentation components
src/
  core/                  Firebase, auth, storage, site config and universal theme
  modules/               Feature modules and their services/repositories/config/data
types/                   Shared domain types
public/                  Fixed/static assets
lms-app/                 Separate LMS Next.js application
firestore.rules          Firestore authorization rules
storage.rules            Firebase Storage authorization rules
```

## Data strategy

- **Firestore:** editable/admin-managed content and user/business records.
- **JSON / typed config:** stable reference data such as navigation, size charts and fallback content.
- **Firebase Storage:** uploaded/dynamic media.
- **Vercel `/public`:** fixed logos, icons and permanent static assets.

React pages should not contain duplicated master-data arrays or direct Firestore queries.

## Universal theme

The single design-token source is:

`src/core/theme/tokens.css`

Both website and LMS Tailwind themes resolve brand utilities through those CSS variables. The current visual design is intentionally preserved.

`src/core/config/site.ts` contains matching hex values only for non-CSS environments such as transactional HTML email.

## Local validation

From the extracted repository root:

```powershell
npm ci
npm run type-check
npm run build
```

Or:

```powershell
npm run validate
```

Then validate the LMS:

```powershell
cd lms-app
npm ci
npm run type-check
npm run build
```

See `VALIDATION_STATUS.md` for the latest validation notes.

## Vercel

### Main website

- Root Directory: repository root
- Build command: `npm run build`
- Domain: `d7leos.org`

### LMS

- Root Directory: `lms-app`
- Build command: `npm run build`
- Domain: `lms.d7leos.org`
- Enable **Include source files outside the Root Directory**, because the LMS intentionally consumes shared repository-level modules.
- `experimental.externalDir` is already enabled.

## Firebase

Both Vercel applications use the same Firebase project.

Review and deploy:

```powershell
firebase deploy --only firestore:rules
firebase deploy --only storage
```

Do not deploy rules until production administrator roles and environment variables have been verified.

## Environment variables

Copy the examples and fill in production values:

- `.env.example`
- `lms-app/.env.example`

Never commit real private keys or service-account JSON to Git.

## Important

Do not run `npm audit fix --force` during stabilization. Resolve build/type errors first, then upgrade dependencies deliberately and retest.
