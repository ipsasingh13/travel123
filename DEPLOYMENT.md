# 🌍 Royal Rajasthan Tour - Deployment Guide

This guide outlines the exact steps to take this application from the Google AI Studio development environment to a live, production-ready website running on a custom domain (e.g., `www.rajasthantour.com`).

## Deployment Architecture Flow

`Google AI Studio App` ➔ `Cloud Run Deploy` ➔ `Cloud Run Live URL` ➔ `Custom Domain Mapping` ➔ `Production Website`

---

### Step 1: Prepare the Google AI Studio App
Your app is already configured as a production-ready Node.js + Express + Vite application.
1. Ensure all your latest changes are saved.
2. The `package.json` is equipped with the necessary build scripts (`npm run build` and `npm start`) required for a production server.

### Step 2: Publish / Deploy to Cloud Run (Via AI Studio)
Google AI Studio provides a seamless way to deploy your application to a live server environment hosted on Google Cloud Run.
1. In the AI Studio top navigation bar, locate the **Deploy** or **Publish** button.
2. Select **Deploy to Cloud Run** (or the equivalent publishing option provided by the environment).
3. The system will automatically run `npm run build` to compile the Vite frontend and bundle the backend server.
4. Once completed, you will be provided with a **Live App URL** (e.g., `https://ais-pre-...run.app`). 
5. Test this URL in a new browser tab to verify the application is live on the internet.

### Step 3: Purchase Your Custom Domain
To move away from the temporary `.run.app` or `.ai.studio` URL, you need your own domain.
1. Go to a domain registrar (e.g., [Namecheap](https://www.namecheap.com), [GoDaddy](https://www.godaddy.com), or [Google Domains/Squarespace](https://domains.google)).
2. Purchase your desired domain (e.g., `rajasthantour.com`).

### Step 4: Map Custom Domain to Cloud Run
Now, map the domain you just bought to the live Cloud Run service.

**Option A: Using Google Cloud Console (If you have direct GCP Access)**
1. Go to the [Google Cloud Console](https://console.cloud.google.com).
2. Navigate to **Cloud Run**.
3. Select your deployed service.
4. Click on **Manage Custom Domains** ➔ **Add Mapping**.
5. Follow the prompts to verify domain ownership and update your DNS records (adding the provided A, AAAA, or CNAME records to your registrar's DNS settings).

**Option B: Using a Reverse Proxy / CDN (Cloudflare - Recommended for Startups)**
1. Create a free account on [Cloudflare](https://www.cloudflare.com).
2. Add your custom domain to Cloudflare and change your domain's Nameservers at your registrar (Namecheap/GoDaddy) to point to Cloudflare.
3. In Cloudflare's DNS settings, create a **CNAME record**:
   * **Name:** `@` (or `www`)
   * **Target:** Your Cloud Run URL (e.g., `ais-pre-...run.app` - *strip the `https://`*)
   * **Proxy status:** Proxied (Orange cloud)
4. Go to SSL/TLS settings in Cloudflare and set the encryption mode to **Full (strict)**.

### Step 5: Verify Production 🚀
1. Wait a few minutes for DNS changes to propagate.
2. Visit `https://www.rajasthantour.com` in your browser.
3. The app is now fully live, branded, and running on production infrastructure!

---

### Updating the App in the Future
Whenever you make changes to the code in AI Studio:
1. Click **Deploy / Publish** again in AI Studio.
2. The Cloud Run instance updates automatically.
3. Your custom domain will instantly reflect the new changes without any extra DNS work.
