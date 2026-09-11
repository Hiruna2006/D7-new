# Validation Status

## Revision 2 fixes

This revision addresses the errors reported from the first local validation run:

- Main TypeScript check no longer includes the independent `lms-app` project.
- All Rounders month index typing is corrected.
- Ascent Firestore timestamp normalization accepts raw Firestore timestamps safely.
- LMS admin uses the centralized course difficulty config correctly.
- City to Soil expert types now match the JSON data consumed by the unchanged UI.
- Project Firestore timestamps are normalized with safe type narrowing.
- Project services are split into explicit client/server entrypoints.
- `firebase-admin` is no longer re-exported through a service imported by browser code, fixing the `fs` / `http2` / `net` webpack failure.
- LMS TypeScript checks only its own source plus shared modules that it actually imports.
- Shared modules used by the LMS no longer depend on the main app's `@/` path alias internally.
- The protected KPI evaluations endpoint is now `/api/kpi/evaluations` rather than being placed under `/api/public`.

## Run from the extracted project root

You are already in the correct directory when PowerShell shows something like:

`...\D7Website-refactored>`

Do **not** run `cd D7Website-master`.

### Main website

```powershell
npm ci
npm run type-check
npm run build
```

Or after dependencies are installed:

```powershell
npm run validate
```

### LMS

```powershell
cd lms-app
npm ci
npm run type-check
npm run build
```

Or:

```powershell
npm run validate
```

Then return to the repository root with:

```powershell
cd ..
```

## Important

The packaging environment cannot reliably access the npm registry, so this ZIP is source-corrected against the reported compiler/build failures but is not being falsely labelled as build-certified. The next local validation output is the source of truth.

Do not run `npm audit fix --force` while we are stabilizing the refactor; it can introduce breaking dependency changes. We will handle dependency/security upgrades after both applications build cleanly.
