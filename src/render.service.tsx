import { renderToString } from "react-dom/server";
import { config } from "../sitemap.config";
import Template from "../template/blog"
import Markdown from "react-markdown";
import { rm } from "node:fs/promises";
import App from "../template";
import path from "path";

export function renderPage (content: string, data: { [key: string]: any }) {
  const { titolo: title, author } = data
  const html = renderToString(
    <Template title={title} author={author}>
      <Markdown children={content} components={{
        p: ({ children }) => <p className="my-2">{children}</p>,
        blockquote: ({ children }) => <blockquote className="px-4 font-thin">{children}</blockquote>,
        h1: ({ children }) => <h1 className="font-black text-6xl">{children}</h1>,
        h2: ({ children }) => <h2 className="font-bold text-3xl">{children}</h2>,
        h3: ({ children }) => <h3 className="font-bold text-2xl">{children}</h3>,
        h4: ({ children }) => <h4 className="font-semibold text-xl">{children}</h4>,
      }} />
    </Template>
  )
  
  return html
}

export async function renderHome () {
  const html = renderToString(
    <html className="w-full h-full m-0 p-0">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sugo</title>
      <link rel="stylesheet" href="/stile.css" />
    </head>
    <body className="w-full h-full m-0 p-0">
      <div id="app" className="w-full h-full">
        <App />
      </div>
      <script type="module" src="./home/hidrate.js"></script>
    </body>
    </html>
  )

  await Bun.build({
    outdir: path.join(config.outputDir, config.homeDir),
    entrypoints: ["./src/hidrate.tsx"],
  })
  return html
}

export async function writePage (outDir: string, slug: string, subdir:string, html: string) {
  const newSlug = slug.toLowerCase().replaceAll(" ", "-")
  const dir = path.join(outDir, subdir, newSlug, "index.html")
  await Bun.write(dir, html)
}

export async function deletePage (filepath: string) {
  const { name, dir } = path.parse(filepath)
  const file = path.join(
    "public",
    dir.split("/").reverse()[0] as string,
    name.toLowerCase().replaceAll(" ", "-")
  )

  await rm(file, { recursive: true, force: true })
}