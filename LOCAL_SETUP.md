# Running Shelf locally

The exported project connects to your live Base44 backend (APIs + database) when run locally — no separate server setup is needed.

## Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure a file named **`.env.local`** exists in the project root (this is usually included in the export). If it's missing, create it with exactly this content:

   ```env
   VITE_BASE44_APP_ID=6a599b9b52283ff45c4532b0
   VITE_BASE44_APP_BASE_URL=https://base44.app
   VITE_BASE44_FUNCTIONS_VERSION=preview
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal (default `http://localhost:5173`).

## Notes
- `VITE_BASE44_FUNCTIONS_VERSION=preview` points at the currently-deployed preview functions. After you **Publish** the app in Base44, you can change this to `production` for the stable build.
- The Open Library book search and your saved-book database work the same locally as they do online — they call your Base44 backend over the cloud using the app id above.