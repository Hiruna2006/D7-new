# Revision 2 Patch Notes

This revision was created from the first refactored ZIP after local validation reported 72 TypeScript errors and a webpack failure.

## Compiler fixes

- Excluded `lms-app/` from the main website TypeScript project.
- Corrected All Rounders month typing.
- Corrected raw Firestore timestamp typing for Ascent.
- Imported `COURSE_DIFFICULTIES` from the centralized course config.
- Corrected City to Soil expert types to match the JSON source.
- Added safe Firestore Timestamp narrowing in the Projects server page.

## Server/client boundary fix

The previous `project.service.ts` re-exported both the browser Firestore repository and the Firebase Admin server repository. A client component importing that barrel caused webpack to traverse `firebase-admin`, producing `fs`, `http2`, and `net` resolution failures.

It is now split into:

- `project.service.client.ts`
- `project.service.server.ts`

Browser code imports only the client service; server pages import only the server service.

## LMS separation fixes

- LMS TypeScript config no longer includes the entire parent source tree.
- Shared files reachable from LMS imports no longer rely internally on the main app's `@/` alias.
- External shared-module imports remain supported through `experimental.externalDir`.
- Vercel deployment documentation explicitly calls out **Include source files outside the Root Directory**.

## KPI API cleanup

The protected KPI admin endpoint moved from:

`/api/public/kpi-evaluations`

to:

`/api/kpi/evaluations`

It still requires a Firebase ID token and an authorized admin role.

## Validation

Run `npm run validate` in the repository root and again inside `lms-app/` after `npm ci`.
