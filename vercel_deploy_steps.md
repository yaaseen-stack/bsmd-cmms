# Deploy BSMD CMMS to Vercel (Free)

## Step 1: Create a GitHub account (if you don't have one)
- Go to github.com, sign up free

## Step 2: Create a repo and upload the HTML file
- On GitHub, click **New repository**
- Name it `bsmd-cmms`
- Click **Create repository**
- Click **uploading an existing file**
- Drag `bsmd_cmms.html` into the box
- Commit

## Step 3: Deploy to Vercel
- Go to **vercel.com**
- Sign up with GitHub
- Click **Import Project**
- Select your `bsmd-cmms` repo
- Click **Deploy**

**Done.** Vercel will give you a URL like `https://bsmd-cmms-abc123.vercel.app`

Share that link with your team. Everyone gets the app on their phone or desktop, no install.

---

## Alternative: Deploy directly from your computer (no GitHub)

**Install Node.js** (nodejs.org, LTS version)

### Create a local project folder

```bash
mkdir bsmd-app
cd bsmd-app
```

### Create `package.json`
Save this as `package.json`:
```json
{
  "name": "bsmd-cmms",
  "version": "1.0.0",
  "scripts": {
    "start": "npx http-server .",
    "build": "echo 'Static site, no build needed'"
  }
}
```

### Add the HTML file
Save `bsmd_cmms.html` in that folder

### Run locally
```bash
npx http-server .
```

Then open `http://localhost:8080` in your browser

---

## Option 3: Production Supabase build (next step)

Once you're happy with this prototype, migrate to:
- **Backend:** Supabase (PostgreSQL + real auth + row-level security)
- **Frontend:** Next.js on Vercel
- **Multi-user:** Technicians, supervisors, managers with enforced permissions
- **Audit log:** Every action tracked
- **Real-time sync:** Changes across devices
- **Offline mode:** Progressive Web App (PWA)

I can build this in ~4 hours if you say yes.

---

## Quick reference: what you have

| File | What it is | How to use |
|------|-----------|-----------|
| `bsmd_cmms.html` | Standalone, complete app | Open in browser, no server |
| `bsmd_cmms.jsx` | React source code | For developers / deployment |
| `One_Realty_BSMD_Manual.docx` | Operations manual | Read, print, reference |
| `BSMD_CMMS_Build_Prompt.md` | Full spec for the Next.js build | For future production version |

---

## First steps

**Right now (5 minutes):**
1. Download `bsmd_cmms.html`
2. Open in browser
3. Create a test work order, ticket, acknowledge a request
4. Reload the page — your data is still there

**This week (optional):**
- Share the HTML with your team via Dropbox/drive or deploy to Vercel
- Collect feedback on the workflow

**Next phase (if you want multi-user + cloud):**
- I build the Supabase + Next.js version with real auth, audit trail, and mobile app

---

## Notes

- **No internet needed after first load** (once React + libraries cache in your browser)
- **Browser storage is secure within the device** — data doesn't leave your phone/computer unless you export
- **Backups:** You can export your data from the app (future feature) or just take a screenshot of the reports
- **Mobile-friendly:** The app is fully responsive; use it on phone/tablet just like desktop

---

Questions? Tell me if you hit any issues or want me to walk you through the deploy.
