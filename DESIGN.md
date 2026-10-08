# Rabbi Shlomo Granit - Design Proposal

סטטוס: העיצוב אושר למימוש ב־08.10.2026. המשתמש אישר אתר בעברית ובכיווניות מימין לשמאל.
Version: 1.0 | Date: 2026-10-08
Based on: [SITE_PLAN.md](SITE_PLAN.md)

## 1. Review Materials

- [Home desktop and mobile mockups](design/home.svg).
- [Wedding desktop and mobile mockups](design/weddings.svg).
- The remaining three service layouts are specified in Section 5.

These are static design artifacts, not a working website. All files and review labels are in English. English sample copy explains placement and is not approved publication content. The compositions anticipate a Hebrew RTL website: identity and principal text begin on the right, with navigation and secondary content flowing leftward. English text remains readable left-to-right.

Photo areas are explicitly marked. No stock person represents the rabbi, and no wedding image, testimonial, credential, or contact detail has been invented. The portrait crop and text contrast must be reviewed again with the actual photographs.

## 2. Recommended Direction

A personal, photo-led site with editorial typography, open layouts, quiet green accents, and strong readability. The rabbi's name is the main first-screen signal. Visitors should quickly recognize the four activities and find a relevant contact action.

Use a text wordmark initially. Do not invent a religious emblem or imply an institutional affiliation. Keep headings literal, copy concise, and claims factual.

### Color System

| Role | Value | Usage |
| --- | --- | --- |
| Paper | `#F7F8F5` | Main background |
| White | `#FFFFFF` | Header and alternate content bands |
| Ink | `#252A27` | Main text and headings |
| Secondary ink | `#59655E` | Supporting text on light backgrounds |
| Forest | `#245747` | Primary actions and contact band |
| Pale green | `#EAF0EB` | Quiet supporting sections |
| Brass | `#99702D` | Decorative rules only, not small text |
| Border | `#D5DDD6` | Noninteractive separators |

Keep light surfaces dominant. Avoid an entirely green page, large gold areas, gradients, heavy shadows, and nested cards. White button text on forest must meet WCAG AA contrast. Input outlines and focus indicators require stronger contrast than decorative separators.

### Typography and Spacing

- Proposed production headings: Frank Ruhl Libre, weight 500 or 600.
- Proposed production body: Heebo, weight 400 or 500.
- The static boards use local serif and sans-serif fallbacks when these fonts are unavailable; exact Hebrew font rendering remains a later review item.
- Desktop main heading: 56px; mobile: 36px. Section headings: 32px / 28px. Body: 18px / 17px, line height 1.65. Supporting text: at least 14px.
- Use explicit breakpoint sizes, not viewport-scaled fonts. Letter spacing is zero.
- Use an 8px spacing rhythm, with 24px mobile gutters and 48-64px desktop section padding.
- Maximum content width: 1200px. Text paragraphs should remain comfortably short, around 55-65 characters per line where practical.
- Buttons: at least 48px high; small 4px corner radius. Repeated-item cards, if needed, must not exceed 8px radius.

## 3. Shared Layout

### Header

- Desktop: Text wordmark on the right; five page destinations across the middle; contact action on the left. The wordmark also links Home.
- Mobile: Wordmark on the right; menu icon on the left. Do not squeeze desktop navigation into a small screen.
- Active page uses a visible underline and an accessible current-page state, not color alone.
- Proposed behavior: Header stays in normal flow, avoiding persistent overlays on small screens.
- Production icons should come from Lucide. Menu and other icon-only controls need accessible names; unfamiliar icons also need tooltips.

### Contact and Footer

- Each page ends with an unframed forest contact band, a service-specific heading, and approved telephone and WhatsApp actions.
- Buttons in the boards show proposed labels only and are not connected to real destinations.
- A compact footer contains the wordmark, navigation, and applicable privacy and accessibility links.
- Recommend direct contact for version one. No contact form is included in this design unless separately approved.
- Do not add floating chat controls that cover text or duplicate the primary contact section.

## 4. Home Design

### Desktop

1. Light header, approximately 80px high.
2. Full-width photographic opening, approximately 480-520px high on a standard desktop viewport. The authentic portrait subject sits left of center, with the name and short introduction over clear space on the right. No split media card.
3. A compact four-column service directory with numbered entries, short summaries, separators, and links. Each item leads to its own page.
4. An open biography section with a short introduction and optional secondary photo, only when approved assets exist.
5. Optional featured lecture or testimonial. Omit the entire section until real material is available.
6. Contact band and compact footer.

### Mobile

- Use a separately approved portrait crop. Keep the name, face, and primary action visible without overlap.
- Opening height should adapt to shorter screens so the start of the service directory remains visible; avoid a full-screen hero.
- Stack service entries as four roomy rows with simple separators, not a carousel.
- Keep biography and contact sections in the same reading order as desktop.
- Long text and buttons may increase section height; do not fix content heights to the mockup dimensions.

## 5. Service Page Designs

All four pages share the header, typography, contact band, and footer. Their content structures differ according to the visitor's task rather than repeating identical promotional cards.

| Page | Opening | Main content | Closing action |
| --- | --- | --- | --- |
| Classes and Lectures | Literal title, concise introduction, approved teaching photo when available | Topic list supplied by the rabbi; audience and format details; optional playable recording; practical questions | Request a class or lecture |
| Wedding Ceremonies | Wide approved ceremony photo, literal title, brief introduction | Approved approach; proposed four-step coordination sequence; practical questions; optional approved testimonial | Ask about your wedding date |
| Counseling and Mediation | Quiet pale-green title section; no sensitive client photography | Distinct counseling and mediation sections; verified scope and qualifications; meeting process; practical questions | Request an introductory conversation |
| Marital Harmony and Education | Quiet light title section; optional approved portrait rather than identifiable family imagery | Separate marital-harmony and parenting/education sections; confirmed topics; initial-contact process; practical questions | Make a family-related inquiry |

### Wedding Mockup Details

- The board demonstrates the shared service-page design in desktop and mobile layouts.
- The proposed process is inquiry, introduction, preparation, and ceremony. The rabbi must verify it before publication.
- Desktop process steps read from right to left; mobile steps read from top to bottom.
- Practical questions use full-width accordion rows with chevrons. Only approved answers will be published.
- The date action starts an inquiry; it must never imply that a date has been booked or confirmed.

### Content and Interaction States

- Links: Underline on hover and keyboard focus. Focus must remain clearly visible.
- Primary button: Forest default, darker forest hover, contrasting focus outline; pressed state must not change layout.
- Mobile menu: Vertical list below the header; toggle exposes expanded state. Close on selection or Escape and restore focus to the toggle when appropriate. Keep it in document flow rather than covering content.
- Accordions: Collapsed initially; keyboard-operable heading button, explicit expanded state, and stable chevron placement. Multiple answers may remain open.
- Recordings: Show an approved poster and play control. Load third-party playback only according to the privacy decision, never autoplay.
- Missing optional media or testimonials: Remove the section rather than publishing placeholder content.
- No live form, booking flow, animations, or menu behavior is implemented in the design artifacts.

## 6. Photography Brief

- Home: Real portrait of Rabbi Shlomo Granit, clear expression, natural lighting, wide composition, subject toward the left, usable clear space on the right for Hebrew text.
- Supply a mobile-friendly alternative crop; do not crop away the face or obscure it with a title.
- Wedding: Real photograph from an authorized ceremony, with couple and photographer permissions and an uncluttered text area.
- Lectures: Real teaching photo with appropriate permissions for identifiable participants.
- Do not use darkening or blur that prevents visitors from seeing the rabbi or the activity. Text placement and local contrast treatment must be chosen after seeing the image.

## 7. Review and Verification

- Static SVGs will be checked for valid XML, English-only labels, and visual layout issues. SVG drawings are review artifacts, not proposed hero illustrations or production assets.
- Desktop and mobile artboards establish composition; implementation must separately test actual responsive behavior, zoom, keyboard use, and Hebrew text wrapping.
- Mockups do not establish legal compliance, actual contact delivery, image permissions, or final text-over-photo contrast.
- No dependencies, website framework, server, deployment, or external services will be set up before approval.

## 8. Approval Gate

Please approve or request changes to:

1. The light, forest-green, serif-led visual direction.
2. The home desktop and mobile compositions.
3. The wedding desktop and mobile compositions and the other service-page structures.
4. Direct telephone and WhatsApp contact without an initial form.
5. Whether the public website should be Hebrew/RTL while all project files and review documents remain English.

Design approval permits the next agreed implementation step, not deployment or publication of unverified material. If Hebrew is chosen, its content source must be agreed without silently changing the English-file requirement.

רישום אישור: המשתמש אישר את הכיוון העיצובי וביקש להתחיל במימוש בעברית. האישור אינו אישור לפרסום פרטי קשר או מידע שלא אומת.