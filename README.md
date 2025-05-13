<img src="https://raw.githubusercontent.com/RobertoFretel/sugo/master/sugo.png?sanitize=true" alt="Hugo" width="565" />

# Overview
Basato su hugo, ma con un concept diverso, Sugo vuole proporre un sistema facilmente esportabile di siti statici attraverso react e tailwind, senza theme ma customizzabile al 100%

```tsx
sugo-site/
├── content/
│   └── blog/
│       └── *.md // i tuoi articoli scritti in markdown
├── public/
│   ├── blog/
│   │   └── *.html // Tutti gli html generati
│   └── stile.css // Gli stili generati da tailwind
├── src/
│   ├── generate.ts // Lo script che parte quando modifichi un post
│   ├── markdown.service.ts
│   ├── render.service.tsx
│   └── main.ts // server http
├── tailwindcss/
│   └── tailwind // Tailwind executable
├── template/
│   ├── blog.tsx
│   └── update.ts // Lo script che parte quando modifichi i template
├── server.ts // MAIN FILE da avviare con bun run server.ts
└── sitemap.config.ts // file di configurazione con default queste cartelle
```

## Come iniziare

Per questo progetto ho usato bun, un runtime js/ts alternativo a nodejs, averlo scarico è requisito per eseguire il server. https://bun.sh/

- Successivamente clona la repo e avvia il server

```sh
git clone https://github.com/RobertoFretel/sugo.git
cd sugo // puoi anche rinominarlo come ti pare
bun install
bun run server.ts
```

Ora semplicemente modifica il template, il markdown.service.ts e aggiungi i post che vuoi!

### Server HTTP

Attualmente è composto da queste routes:

- **GET** /api/: un json contente il titolo e l’url delle pagine presenti
- **GET** /*: file statici serviti dal public

Anche il server è modificabile, ma se si vogliono aggiungere pagine come /index.html per la home ancora non l’ho aggiunta (non dovrebbe essere complicato).
