# SeatSense — Smart Library & Study Space Finder

SeatSense helps students find available library seats, reserve group study rooms, and understand expected library demand. The repository includes a polished Next.js app, a browser-persisted demo mode, an optional Supabase schema for shared data, and an optional Python/FastAPI forecasting service.

## Features

- **Library overview:** seat counts, occupancy breakdown, floor summaries, live-demo status.
- **Seat finder:** searchable/filterable seat map for two floors; reserve available seats.
- **Study rooms:** browse rooms and focus pods with capacity, amenities and availability.
- **Bookings:** create and cancel reservations with date/time conflict checks.
- **Insights:** weekly sample occupancy chart and time/day availability forecast.
- **Demo mode:** works without credentials; bookings and seat changes persist in the current browser via localStorage.
- **Optional integrations:** Supabase schema and Python prediction API included.

> Important: the included availability and forecast data is simulated demo data. It is not connected to physical occupancy sensors. Do not present it as live campus telemetry until sensors and a trusted ingestion pipeline are installed.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Keep the framework preset as **Next.js** and the root directory as `.`.
4. No environment variables are required for demo mode.
5. Click **Deploy**.

The app is deployable on Vercel as-is. Browser demo data is per-browser and is not shared across students.

## Optional: persistent shared data with Supabase

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy the project URL and anon/public key into a local `.env.local` or Vercel Project Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

4. Redeploy after setting Vercel environment variables.

The SQL file is a starter schema. The current UI intentionally remains in local demo mode; wire the CRUD calls to Supabase before using the app as a shared multi-user booking system. Before production, add authenticated student accounts, verified campus email, booking ownership, admin roles, rate limits, server-side conflict prevention/transactions, and stricter Row Level Security policies. Never put a Supabase service-role key in a `NEXT_PUBLIC_` variable.

## Optional: Python prediction API

```bash
cd python-service
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- `GET http://localhost:8000/health`
- `POST http://localhost:8000/predict` with JSON body `{"hour":14,"day_of_week":2,"capacity":54}`

Set `NEXT_PUBLIC_PREDICTION_API_URL` if you later wire the frontend to a separately hosted API. Vercel does not run this Python service as part of the current Next.js deployment.

## GitHub upload

Create an empty GitHub repository named `SeatSense`, then run these commands in this folder:

```bash
git init
git add .
git commit -m "Build SeatSense smart library finder"
git branch -M main
git remote add origin https://github.com/Iksha-Goomber/SeatSense.git
git push -u origin main
```

If you name the repository differently, replace the remote URL. GitHub authentication is handled by Git Credential Manager or the GitHub CLI; never paste a personal access token into source code.

## Suggested next hardware milestone

For a real IoT pilot, use ESP32 + IR/ToF seat sensors (or a privacy-preserving overhead counter), publish MQTT events to a broker, validate/debounce readings, and ingest them into a server-side service. Avoid storing camera footage or identifying students. Use aggregate occupancy counts rather than face recognition.

## Project structure

```text
seatsense/
├── app/                 # Next.js App Router UI and global styles
├── lib/                 # Demo inventory, forecasting logic, Supabase client
├── python-service/      # Optional FastAPI prediction API
├── supabase/            # Starter SQL schema
├── .env.example
└── README.md
```

## License

MIT — see [LICENSE](LICENSE).
