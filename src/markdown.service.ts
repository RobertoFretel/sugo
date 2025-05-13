
import matter from "gray-matter";
import path from "path"
import { config } from "../sitemap.config";
import { renderPage } from "./render.service";

export async function getPages () {
  const searcher = new Bun.Glob("**/*.md")
  const dir = path.join(config.contentDir, "blog")

  const files = await Array.fromAsync(searcher.scan(dir))
  const res = files.map(async file => {
    const raw = await Bun.file(path.join(dir, file)).text()
    const { content, data } = matter(raw)
    const html = renderPage(content, data)
    
    return {
      slug: file.replace(".md", ""),
      data: data,
      html
    }
  })

  return Promise.all(res)
}
