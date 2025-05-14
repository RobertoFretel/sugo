import path from "path"
import process from "process"
import { config } from "../sitemap.config"
import { generate } from "../src/generate"

const searcher = new Bun.Glob("**/*.md")

export async function updateTemplates () {
  const posts = await Array.fromAsync(searcher.scanSync({
    cwd: path.join(process.cwd(), config.contentDir)
  }))

  for (const post of posts) {
    await generate(post)
  }
}
