// Pre-renders the Vite site (dev server must run on :5173) into ../../static-site as plain HTML/CSS/JS.
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '../..')
const { chromium } = require(path.join(root, 'website/node_modules/playwright-core'))
const dist = path.join(root, 'website/dist')
const out = path.join(root, 'static-site')
const siteUrl = 'https://shlomogranit.com/'

const routes = [
  ['/', 'index.html', '1.0'],
  ['/weddings/', 'weddings.html', '0.9'],
  ['/lectures/', 'lectures.html', '0.9'],
  ['/counseling-mediation/', 'counseling-mediation.html', '0.8'],
  ['/family-education/', 'family-education.html', '0.8'],
  ['/privacy/', 'privacy.html', '0.2'],
  ['/accessibility/', 'accessibility.html', '0.2'],
]
const pageFor = Object.fromEntries(routes.map(([route, file]) => [route, file]))
const urlFor = (file) => file === 'index.html' ? siteUrl : siteUrl + file

for (const dir of ['css', 'fonts', 'images', 'js']) fs.mkdirSync(path.join(out, dir), { recursive: true })

const assets = fs.readdirSync(path.join(dist, 'assets'))
for (const file of assets.filter((f) => /\.woff2?$/.test(f))) fs.copyFileSync(path.join(dist, 'assets', file), path.join(out, 'fonts', file))
for (const name of ['learning', 'rabbi-profile', 'wedding']) {
  const file = assets.find((f) => f.startsWith(name + '-') && f.endsWith('.jpg'))
  fs.copyFileSync(path.join(dist, 'assets', file), path.join(out, 'images', name + '.jpg'))
}
fs.copyFileSync(path.join(dist, 'favicon.svg'), path.join(out, 'favicon.svg'))
const css = fs.readFileSync(path.join(dist, 'assets', assets.find((f) => f.endsWith('.css'))), 'utf8')
fs.writeFileSync(path.join(out, 'css', 'style.css'), css.replaceAll('url(/assets/', 'url(../fonts/'))

const today = new Date().toISOString().slice(0, 10)
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`)
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([, file, priority]) => `  <url><loc>${urlFor(file)}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`)

const escapeAttr = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': siteUrl + '#rabbi',
      name: 'הרב שלמה גרנית',
      alternateName: 'Rabbi Shlomo Granit',
      jobTitle: 'רב קהילה, עורך חופות, מגשר ויועץ',
      url: siteUrl,
      image: siteUrl + 'images/rabbi-profile.jpg',
      telephone: '+972-52-710-2016',
      email: 'shagranit@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'שלומי', addressCountry: 'IL' },
      knowsAbout: ['עריכת חופות וקידושין', 'הלכה', 'שיעורי תורה', 'גישור', 'שלום בית', 'חינוך ילדים'],
      sameAs: ['https://www.kolhalashon.com/he/regularSite/ravs/902016/1/1'],
    },
    {
      '@type': 'WebSite',
      '@id': siteUrl + '#website',
      url: siteUrl,
      name: 'הרב שלמה גרנית',
      inLanguage: 'he-IL',
      publisher: { '@id': siteUrl + '#rabbi' },
    },
  ],
}

;(async () => {
  const browser = await chromium.launch({ channel: 'msedge' })
  const page = await browser.newPage()
  for (const [route, file] of routes) {
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' })
    const data = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]').content,
      app: document.querySelector('#app').innerHTML,
    }))
    const app = data.app
      .replace(/src="[^"]*\/(learning|rabbi-profile|wedding)[^"]*\.jpg[^"]*"/g, 'src="images/$1.jpg"')
      .replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (match, target, hash = '') => pageFor[target] ? `href="${pageFor[target]}${hash}"` : match)
    const url = urlFor(file)
    const image = siteUrl + (file === 'weddings.html' ? 'images/wedding.jpg' : 'images/rabbi-profile.jpg')
    const html = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.title}</title>
    <meta name="description" content="${escapeAttr(data.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="he_IL" />
    <meta property="og:site_name" content="הרב שלמה גרנית" />
    <meta property="og:title" content="${escapeAttr(data.title)}" />
    <meta property="og:description" content="${escapeAttr(data.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#245747" />
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <link rel="stylesheet" href="css/style.css" />${file === 'index.html' ? `
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
  </head>
  <body>
    <div id="app">${app}</div>
    <script src="js/script.js"></script>
  </body>
</html>
`
    fs.writeFileSync(path.join(out, file), html)
    console.log('wrote', file)
  }
  await browser.close()
})()
