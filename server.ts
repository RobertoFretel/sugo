const config_path = "./sitemap.config"
const { config } = await import(config_path)

import chokidar from "chokidar"
import process from "process"
import { spawn } from "bun"

import { server } from "./src/main"
import { deletePage } from "./src/render.service"
import { generate } from "./src/generate"
import { updateTemplates } from "./template/update"

const watcher = chokidar.watch(
  [config.contentDir, config.templatesDir, "src/render.service.tsx"],
  { ignoreInitial: true }
)

const serve = server()
console.log(`http://${serve.hostname}:${serve.port}`)

watcher.on("all", async (event, path) => {
  console.log(event)
  if (event != "unlink") {
    if (Bun.file(path).type == "text/markdown") {
      generate(path)
    } else {
      updateTemplates()
    }
  } else {
    await deletePage(path)
  }
  
  const tail = spawn({
    cmd: ["./tailwindcss/tailwind", "-i", "./template/input.css", "-o", "./public/stile.css"],
    stdout: "pipe",
    cwd: process.cwd()
  })
  
  await tail.exited
  process.stdout.write(`${path}\n`)
})
