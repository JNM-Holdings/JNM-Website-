# JNM Holdings website

Plain HTML, CSS and JavaScript. No build step, no database.

## Run it locally
Open this folder in VS Code, install the Live Server extension, right-click `index.html` and choose Open with Live Server.

## Update the live site (GitHub Pages)
In the terminal:
   git add .
   git commit -m "Redesign website"
   git push
 Wait 1 to 2 minutes, then hard refresh the live site (Ctrl+Shift+R).

## Where things are
- Pages: index, about, services, portfolio, team, contact, maintenance, 404 (.html)
- css/style.css: all styling. Colors are at the top (:root).
- js/main.js: menu, forms, animations. The Formspree link is FORM_ENDPOINT at the top.
- js/portfolio.js: portfolio filters and photo viewer.
- images/: optimized WebP photos. Each has a -full (large) and -card (grid) version.
- assets/logo.svg: logo.

## Portfolio photos
Each card in portfolio.html is one <button class="pcard" ...>. Edit its data-title and data-label
(and the <small> label and <strong> name shown on the card). data-cat must be: residence, mall or
chancery. Add a photo by saving both sizes in images/ (name-full.webp and name-card.webp) and
copying an existing card. When a chancery gets its own photo, remove its name from the
"More chanceries we serve" list (id="chlist") and add a card.

## Contact forms
Both forms post to Formspree (form ID moeepqnz) and arrive in the email that owns that form.
They include required-field checks and a hidden spam trap.

## Still to do before launch
- Confirm which client and embassy names may be shown publicly.
- Check the property names and categories in the portfolio.
- Connect a custom domain (GitHub repo > Settings > Pages > Custom domain).

