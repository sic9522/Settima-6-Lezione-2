# 🛍️ EpiShop

Applicazione web di e-commerce sviluppata come esercizio didattico. Permette agli utenti di sfogliare un catalogo di prodotti, visualizzarne i dettagli e aggiungere articoli al carrello.

---

## 📋 Indice

- [🧰 Tecnologie utilizzate](#-tecnologie-utilizzate)
- [📁 Struttura del progetto](#-struttura-del-progetto)
- [✨ Funzionalità](#-funzionalità)
- [⚙️ Logica JavaScript](#%EF%B8%8F-logica-javascript)
- [📱 Layout responsivo](#-layout-responsivo)
- [🚀 Come eseguire](#-come-eseguire)

---

## 🧰 Tecnologie utilizzate

- 🌐 **HTML5** — struttura della pagina
- 🎨 **[Bootstrap 5.3.8](https://getbootstrap.com/docs/5.3/)** — layout responsivo, componenti UI (navbar, carousel, card, modal)
- ⚡ **JavaScript (Vanilla)** — logica interattiva del carrello
- 🖌️ **CSS personalizzato** — [`assets/css/style.css`](assets/css/style.css)

---

## 📁 Struttura del progetto

```
Settima-6-Lezione-2/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── javascript/
│   │   └── script.js
│   └── img/
│       ├── sneakers.webp
│       ├── borsacity.webp
│       └── t-shirt.webp
└── README.md
```

---

## ✨ Funzionalità

### 🔗 Navbar
- Logo/nome del sito **EpiShop** a sinistra
- Link di navigazione: **Prodotti**, **Offerte**, **Contatti**
- Pulsante **🛒 Carello** che apre il modal del carrello
- Navbar responsiva con hamburger menu su schermi piccoli (< md) — [documentazione Bootstrap Navbar](https://getbootstrap.com/docs/5.3/components/navbar/)

### 🎠 Carousel
Slideshow automatico con tre slide promozionali — [documentazione Bootstrap Carousel](https://getbootstrap.com/docs/5.3/components/carousel/):
1. 🌸 **Saldi di primavera** — offerte fino al 50% di sconto
2. 🆕 **Nuova collezione** — nuovi arrivi della settimana
3. 🚚 **Spedizioni gratis** — sopra i 50€

### 📂 Sidebar categorie *(visibile solo su schermi xl)*
Elenco delle categorie disponibili:
- 👟 Scarpe
- 👕 T-shirt
- 👜 Borse
- 💍 Accessori

### 🏷️ Catalogo prodotti
Tre prodotti in evidenza con badge **-30%**:

| 🛍️ Prodotto | 💶 Prezzo |
|---|---|
| 👟 Sneakers Nike | € 89,00 |
| 👜 Borsa Balenciaga | € 2.500,00 |
| 👕 T-shirt con logo | € 19,90 |

Ogni prodotto è presentato in una [card Bootstrap](https://getbootstrap.com/docs/5.3/components/card/) con immagine, nome, prezzo e pulsante **Dettagli**.

### 🔍 Modal dettaglio prodotto
Al click su "Dettagli" si apre un [modal Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/) con:
- 🖼️ Immagine ingrandita del prodotto
- 📝 Descrizione e disponibilità taglie
- 💶 Prezzo
- ✅ Pulsante **Aggiungi al carello**

### 🛒 Carrello
- Accessibile dal link "Carello" in navbar (apre `modal4`)
- Mostra la lista degli articoli aggiunti tramite `<ul id="cartList">`
- Ogni articolo aggiunto appare come voce nella lista

---

## ⚙️ Logica JavaScript

File: [`assets/javascript/script.js`](assets/javascript/script.js)

```js
const carelloAdd = document.querySelectorAll('.carelloAdd')
const cartList = document.getElementById('cartList')

carelloAdd.forEach(button => {
    button.addEventListener('click', () => {
        const li = document.createElement('li')
        li.textContent = 'prodotto aggiunto'
        cartList.appendChild(li)

        const openModal = document.querySelector('.modal.show')
        bootstrap.Modal.getInstance(openModal).hide()
    })
})
```

**Funzionamento:**
1. 🔎 Seleziona tutti i pulsanti con classe `.carelloAdd`
2. ➕ Al click crea un elemento `<li>` con testo "prodotto aggiunto" e lo inserisce nel `cartList`
3. ❌ Recupera il modal attualmente aperto (`.modal.show`) e lo chiude tramite le [API JavaScript di Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/#via-javascript)

---

## 📱 Layout responsivo

Basato sul [sistema a griglia di Bootstrap](https://getbootstrap.com/docs/5.3/layout/grid/):

| 📐 Breakpoint | 🖥️ Comportamento |
|---|---|
| `xs / sm` | Navbar collassata, prodotti in colonna singola, sidebar nascosta |
| `md` | Prodotti su 2 colonne, hamburger menu |
| `xl` | Sidebar categorie visibile, prodotti su 3 colonne, navbar espansa |

---

## 🚀 Come eseguire

Aprire [`index.html`](index.html) direttamente nel browser. Non richiede server o dipendenze locali — Bootstrap viene caricato via [CDN jsDelivr](https://www.jsdelivr.com/).
