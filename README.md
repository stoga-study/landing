# Stoga.study landing page

Static Next.js site for https://stoga.study. It follows Stoga.study Brand Guidelines v1.0.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Deploy on Vercel

1. Push this folder to a Git repo and import it in Vercel. The framework is detected as Next.js, and no settings are needed.
2. Add the `stoga.study` domain under Project → Settings → Domains.
3. Security headers and caching come from `vercel.json`.

## Where things live

- `app/globals.css`: design tokens (light and dark) and every component style
- `app/page.tsx`: landing page sections
- `components/demo/`: the interactive upload-to-study preview and its sample data
- `components/Plans.tsx`, `components/Funding.tsx`: plans, BYOK settings preview, fair use, ledger
- `app/privacy/page.tsx`: plain-language privacy draft

## Placeholders to replace before launch

- **Funding ledger** (`components/Funding.tsx`): costs, funding and the 91% figure are sample numbers.
- **Allowances** (`components/Plans.tsx`): 50 messages a day and 10 uploads a month are planned figures.
- **Not connected yet:** donations, Unlimited checkout, accounts, file reading, generation and live tutor answers. All of them are labelled in the UI.
- **Privacy page:** still a draft that needs legal review (FERPA, PA rules, parental consent).
- **Seal:** `public/seal.png` is a small raster. Swap in the vector seal once the school approves it.

## License

The code is released under the [MIT License](LICENSE).

The Conestoga High School seal (`public/seal.png`, `app/icon.png` and `app/apple-icon.png`) and the Conestoga name belong to Conestoga High School. They are **not** covered by the MIT License and may not be reused without the school's permission. Stoga.study is not an official service of Conestoga High School or the Tredyffrin/Easttown School District.
