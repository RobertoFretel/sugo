import path from "path"
import process from "process"
import { config } from "../sitemap.config"
import { spawn } from "bun"

const searcher = new Bun.Glob("**/*.md")
const posts = await Array.fromAsync(searcher.scanSync({
  cwd: path.join(process.cwd(), config.contentDir)
}))


for (const post of posts) {
  const sub = spawn({
    cmd: ["bun", "run", "generate", path.join(config.contentDir, post)]
  })

  await sub.exited
}