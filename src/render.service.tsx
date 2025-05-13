import Markdown from "react-markdown";
import { renderToString } from "react-dom/server";
import Template from "../template/blog"
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

  console.log(html)
  return html
}

export async function writePage (outDir: string, slug: string, html: string) {
  const newSlug = slug.toLowerCase().replaceAll(" ", "-")
  const dir = path.join(outDir, "blog", newSlug, "index.html")
  await Bun.write(dir, html)
}