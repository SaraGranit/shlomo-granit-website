import '@fontsource/heebo/400.css'
import '@fontsource/heebo/500.css'
import '@fontsource/heebo/600.css'
import '@fontsource/frank-ruhl-libre/400.css'
import '@fontsource/frank-ruhl-libre/500.css'
import './site.css'
import learningPhoto from './assets/learning.jpg'
import { createIcons, ArrowLeft, ArrowUpLeft, BookOpen, Flower2, MessagesSquare, Sprout, Menu, X, ChevronDown, Phone, MessageCircle, ArrowUp, ExternalLink } from 'lucide'
import { metadata, normalizePath, services, site, type Service } from './content'

const path = normalizePath(location.pathname)
const currentService = services.find((service) => service.path === path)
const pageMetadata = metadata(path)
const icon = (name: string, className = '') => `<i data-lucide="${name}" class="${className}" aria-hidden="true"></i>`
const navigation = [{ path: '/', title: 'בית' }, ...services]

document.documentElement.lang = 'he'
document.documentElement.dir = 'rtl'
document.title = pageMetadata.title
document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = pageMetadata.description

function serviceLinks() {
  return services.map((service, index) => `
    <a class="service-link" href="${service.path}">
      <div class="service-top"><span class="service-number">0${index + 1}</span>${icon(service.icon)}</div>
      <h3>${service.title}</h3><p>${service.short}</p>
      <span class="service-more">לפרטים נוספים ${icon('arrow-left')}</span>
    </a>`).join('')
}

function contact(heading = 'כל חיבור מתחיל בשיחה') {
  const phone = site.phone.replace(/[\s()-]/g, '')
  const whatsapp = site.whatsapp.replace(/\D/g, '')
  const hasPhone = /^\+?\d{9,15}$/.test(phone)
  const hasWhatsapp = /^\d{10,15}$/.test(whatsapp)
  return `<section class="contact-band" id="contact" aria-labelledby="contact-heading">
    <div class="container contact-layout">
      <div><span class="eyebrow light">נשמח להיות בקשר</span><h2 id="contact-heading">${heading}</h2>
      <p>לשיעור, לחופה או לשאלה אישית. מתחילים בהיכרות.</p></div>
      <div class="contact-actions"><div class="button-row">
        ${hasPhone ? `<a class="button button-white" href="tel:${phone}">${icon('phone')} לשיחה עם הרב</a>` : `<button class="button button-white" disabled aria-describedby="contact-status">${icon('phone')} לשיחה עם הרב</button>`}
        ${hasWhatsapp ? `<a class="button button-outline-light" href="https://wa.me/${whatsapp}" target="_blank" rel="noopener noreferrer">${icon('message-circle')} הודעה בוואטסאפ</a>` : `<button class="button button-outline-light" disabled aria-describedby="contact-status">${icon('message-circle')} הודעה בוואטסאפ</button>`}
        </div>${!hasPhone || !hasWhatsapp ? '<p class="contact-status" id="contact-status">פרטי הקשר יתעדכנו בקרוב. בשלב זה לא ניתן לשלוח פנייה דרך האתר.</p>' : ''}
      </div>
    </div>
  </section>`
}

function home() {
  return `<section class="home-hero" aria-labelledby="home-title">
    <img class="hero-photo" src="${learningPhoto}" alt="" fetchpriority="high" width="1800" height="1200" />
    <div class="container hero-inner"><div class="hero-copy">
      <span class="eyebrow"><span class="small-rule"></span> תורה. קהילה. משפחה.</span>
      <h1 id="home-title"><span>הרב</span>שלמה גרנית</h1>
      <p class="hero-intro">תורה שמאירה את הדרך.<br />הקשבה שמחברת בין אנשים.</p>
      <p class="hero-detail">שיעורים והרצאות, עריכת חופות וליווי אישי<br class="desktop-break" /> ברגעים החשובים של החיים.</p>
      <div class="button-row"><a class="button button-primary" href="#contact">נעים להכיר ${icon('arrow-left')}</a><a class="text-link" href="#activities">תחומי הפעילות ${icon('arrow-left')}</a></div>
    </div></div><span class="photo-caption">צילום להמחשה</span>
  </section>
  <section class="activities section" id="activities" aria-labelledby="activities-title"><div class="container">
    <div class="section-heading"><div><span class="eyebrow">בכל שלב, לכל שאלה</span><h2 id="activities-title">נפגשים בדרך שלכם</h2></div><p>ארבעה תחומי עשייה.<br />מקום אחד לתורה, להקשבה ולחיבור.</p></div>
    <div class="service-grid">${serviceLinks()}</div>
  </div></section>
  <section class="about section" id="about" aria-labelledby="about-title"><div class="container about-layout">
    <div class="about-heading"><span class="eyebrow">נעים להכיר</span><h2 id="about-title">תורה, קהילה<br />וקירוב לבבות.</h2><span class="about-signature">הרב שלמה גרנית</span></div>
    <div class="about-copy"><p class="lead">בוגר ישיבת חברון, עוסק בהוראה, בלימוד תורה ובחיבור בין אנשים לעולם ההלכה והמעשה.</p>
    <p>דרכו התורנית כוללת הוראה בישיבה לצעירים ״תפארת ברוך״ בירושלים, לימודי הלכה בישיבת מיר ועשייה תורנית בבית שמש. במסגרת פעילותו בשלומי שבגליל המערבי, הוא מוסר שיעורים ומשתתף בחיי הקהילה.</p>
    <p>לצד שיעורי התורה וההרצאות, הרב עוסק בעריכת חופות, בייעוץ ובגישור ובנושאי שלום בית וחינוך.</p>
    <button class="text-link" id="source-open" type="button">עוד על הרקע התורני ${icon('arrow-up-left')}</button></div>
  </div></section>
  <section class="invitation section"><div class="container invitation-layout"><span class="eyebrow">להיפגש. ללמוד. להתקרב.</span><h2>לפעמים, הדרך מתחילה<br />בשאלה אחת טובה.</h2><a class="text-link" href="/lectures/">לשיעורים ולהרצאות ${icon('arrow-left')}</a></div></section>
  ${contact()}`
}

function servicePage(service: Service) {
  const wedding = service.path === '/weddings/'
  return `<section class="service-hero ${wedding ? 'wedding-hero' : ''}"><div class="container">
    <nav class="breadcrumb" aria-label="מיקום באתר"><a href="/">בית</a><span aria-hidden="true">/</span><span>${service.title}</span></nav>
    <div class="service-hero-content"><span class="eyebrow">${service.eyebrow}</span><h1>${service.title}</h1><p class="lead">${service.intro}</p><a class="button button-primary" href="#contact">${service.action} ${icon('arrow-left')}</a></div>
    <div class="service-emblem" aria-hidden="true">${icon(service.icon)}</div>
  </div></section>
  <section class="section service-content"><div class="container"><div class="section-heading"><div><span class="eyebrow">${wedding ? 'לקראת התחלה משותפת' : 'מרחב למפגש'}</span><h2>${service.sectionTitle}</h2></div></div>
    <div class="content-grid ${wedding ? 'process-grid' : ''}">${service.sections.map((section, index) => `<article class="content-item"><span class="step-number">0${index + 1}</span><h3>${section.title}</h3><p>${section.text}</p></article>`).join('')}</div>
    ${wedding ? '<p class="section-note">השלבים הם מסגרת כללית לתיאום. היקף הליווי והמועד כפופים לבירור ולאישור אישי.</p>' : ''}
  </div></section>
  <section class="faq-section section"><div class="container faq-layout"><div><span class="eyebrow">לפני שנפגשים</span><h2>אולי רציתם לשאול</h2><p>כמה פרטים שיעזרו<br />להתחיל את השיחה.</p></div>
    <div class="faq-list">${service.questions.map((item) => `<details><summary>${item.question}${icon('chevron-down')}</summary><p>${item.answer}</p></details>`).join('')}</div>
  </div></section>
  <section class="related-section"><div class="container"><h2>עוד מתחומי הפעילות</h2><div class="related-links">${services.filter((entry) => entry.path !== service.path).map((entry) => `<a href="${entry.path}">${entry.title}${icon('arrow-left')}</a>`).join('')}</div></div></section>
  ${contact(service.contact)}`
}

function informationPage() {
  if (path === '/privacy/') return `<section class="section prose container"><span class="eyebrow">מידע באתר</span><h1>פרטיות</h1><p class="lead">האתר אינו כולל טופס לאיסוף פניות, חשבונות משתמשים או כלי ניתוח ומעקב.</p><h2>גלישה וקישורים חיצוניים</h2><p>הגופנים והתמונות נטענים מתוך האתר. ספק האחסון עשוי לשמור נתוני גישה טכניים לצורכי תפעול ואבטחה. כאשר יופעלו קישורי קשר, מעבר לשירות חיצוני כגון וואטסאפ יהיה כפוף למדיניות הפרטיות שלו.</p><h2>מידע אישי</h2><p>אין להעביר מסמכים או מידע משפחתי רגיש לפני בירור התאמת הפנייה ודרך ההתקשרות. פרטי הקשר ומדיניות ההפעלה הסופית יעודכנו לפני פרסום האתר.</p><a class="text-link" href="/">חזרה לעמוד הבית ${icon('arrow-left')}</a></section>`
  if (path === '/accessibility/') return `<section class="section prose container"><span class="eyebrow">מידע באתר</span><h1>נגישות</h1><p class="lead">האתר תוכנן לתמוך בגלישה באמצעות מקלדת, בהגדלת טקסט ובתצוגה מותאמת לנייד.</p><h2>התאמות באתר</h2><p>קישור לדילוג לתוכן, כותרות מסודרות, סימון מיקוד, תפריט נגיש ושאלות נפוצות הנפתחות באמצעות מקלדת. תנועה מצומצמת כשמוגדרת העדפה לכך במכשיר.</p><h2>מצב הבדיקה ופנייה</h2><p>האתר נמצא בהכנה וטרם עבר ביקורת נגישות מלאה. אין באמור הצהרה על עמידה מאומתת בתקן. ערוץ לפניות בנושאי נגישות יפורסם עם השלמת פרטי הקשר.</p><a class="text-link" href="/">חזרה לעמוד הבית ${icon('arrow-left')}</a></section>`
  return `<section class="section prose container"><span class="eyebrow">404</span><h1>העמוד לא נמצא</h1><p class="lead">ייתכן שהכתובת השתנתה. אפשר לחזור לעמוד הבית ולהמשיך משם.</p><a class="button button-primary" href="/">לעמוד הבית ${icon('arrow-left')}</a></section>`
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main-content">דילוג לתוכן</a>
  <header class="site-header" id="top"><div class="container header-inner">
    <a class="wordmark" href="/" aria-label="הרב שלמה גרנית — עמוד הבית"><span class="wordmark-title">הרב שלמה גרנית</span><span class="wordmark-subtitle">תורה · קהילה · משפחה</span></a>
    <button class="menu-toggle" type="button" aria-label="פתיחת תפריט" aria-expanded="false" aria-controls="main-nav">${icon('menu', 'menu-open-icon')}${icon('x', 'menu-close-icon')}</button>
    <nav class="main-nav" id="main-nav" aria-label="ניווט ראשי">${navigation.map((entry) => `<a href="${entry.path}" ${path === entry.path ? 'aria-current="page"' : ''}>${entry.title}</a>`).join('')}</nav>
    <a class="header-contact" href="${path === '/' || currentService ? '#contact' : '/#contact'}">יצירת קשר ${icon('arrow-up-left')}</a>
  </div></header>
  <main id="main-content" tabindex="-1">${path === '/' ? home() : currentService ? servicePage(currentService) : informationPage()}</main>
  <footer class="site-footer"><div class="container footer-main"><a class="wordmark" href="/"><span class="wordmark-title">הרב שלמה גרנית</span><span class="wordmark-subtitle">תורה שמחברת. שיחה שמקרבת.</span></a><nav aria-label="ניווט בתחתית האתר">${services.map((entry) => `<a href="${entry.path}">${entry.title}</a>`).join('')}</nav><a class="back-top" href="#top" aria-label="חזרה לראש העמוד" title="חזרה לראש העמוד">${icon('arrow-up')}</a></div>
    <div class="container footer-bottom"><span>© ${new Date().getFullYear()} הרב שלמה גרנית</span><span class="preview-label">גרסת הכנה · התוכן ופרטי הקשר ממתינים לאישור סופי</span><div><a href="/privacy/">פרטיות</a><a href="/accessibility/">נגישות</a></div></div>
  </footer>
  <dialog id="source-dialog" aria-labelledby="source-title"><div class="dialog-top"><span class="eyebrow">נעים להכיר</span><button class="icon-button" id="source-close" aria-label="סגירת החלון" title="סגירה">${icon('x')}</button></div><h2 id="source-title">הרקע התורני</h2>
    <p>לפי המידע שנמסר לצורך הכנת האתר, הרב שלמה גרנית הוא בוגר ישיבת חברון. בשנים 2019–2022 לימד בישיבה לצעירים ״תפארת ברוך״ בירושלים ולמד הלכה בכולל של ישיבת מיר.</p>
    <p>בהמשך פעל בבית שמש כראש כולל ערב, היה פעיל במסגרת ״לב לאחים״ ובבתי הוראה. עוד נמסר כי בשנת 2024 החל לשמש כמורה הוראה בבית הוראה בבני ברק בראשות הרב עמרם פריד.</p>
    <p>המידע כולל הסמכת ״יורה יורה״, מעבר בחינות רב עיר והסמכה בתחום מראות טהרה והלכות נידה מטעם בית ההוראה של הרב ישראל גנס. מעבר בחינות אינו מעיד כשלעצמו על מינוי לתפקיד רב עיר.</p>
    <p>עוד צוין שחיבוריו מתפרסמים בעלון ״ראשית חכמה״, ושבשנת תשע״ו זכה בפרס חיבור תורני בקריית יערים.</p>
    <p class="source-note">הפרטים מבוססים על טקסט שסופק להכנת האתר וטרם אומתו באופן עצמאי. יש לאשר תפקידים והסמכות לפני פרסום.</p><a class="text-link" href="${site.source}" target="_blank" rel="noopener noreferrer">לגרסת המקור שצוינה ${icon('external-link')}</a>
  </dialog>`

createIcons({ icons: { ArrowLeft, ArrowUpLeft, BookOpen, Flower2, MessagesSquare, Sprout, Menu, X, ChevronDown, Phone, MessageCircle, ArrowUp, ExternalLink }, attrs: { 'aria-hidden': 'true', 'stroke-width': 1.6 } })

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!
const mainNav = document.querySelector<HTMLElement>('#main-nav')!
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'פתיחת תפריט')
  mainNav.classList.remove('is-open')
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true'
  menuButton.setAttribute('aria-expanded', String(expanded))
  menuButton.setAttribute('aria-label', expanded ? 'סגירת תפריט' : 'פתיחת תפריט')
  mainNav.classList.toggle('is-open', expanded)
})
mainNav.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) closeMenu()
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu()
    menuButton.focus()
  }
})
matchMedia('(min-width: 1081px)').addEventListener('change', closeMenu)
const dialog = document.querySelector<HTMLDialogElement>('#source-dialog')!
document.querySelector('#source-open')?.addEventListener('click', () => dialog.showModal())
document.querySelector('#source-close')?.addEventListener('click', () => dialog.close())
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect()
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close()
})
