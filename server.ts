import chokidar from "chokidar"
import process from "process"
import { spawn } from "bun"
import { config } from "./sitemap.config"

const watcher = chokidar.watch([config.contentDir, config.templatesDir, "src/render.service.tsx"], {
  ignoreInitial: true,
})

const decoder = new TextDecoder()
const server = spawn({
  cmd: ["bun", "--watch", "src/main.ts"],
  stdout: "pipe"
})

async function background () {
  let index = 1
  for await (const chunck of server.stdout) {
    index++
    process.stdout.write(`x${index}: ${decoder.decode(chunck)}`)
  }
}

background()

watcher.on("all", async (event, path) => {
  if (Bun.file(path).type == "text/markdown") {
    const sub = spawn({
      cmd: ["bun", "run", "generate", path]
    })

    await sub.exited
  } else {
    const sub = spawn({
      cmd: ["bun", "run", "template/update.ts"]
    })

    await sub.exited
  }
  
  const tail = spawn({
    cmd: ["./tailwindcss/tailwind", "-i", "./template/input.css", "-o", "./public/stile.css"],
    stdout: "pipe",
    cwd: process.cwd()
  })
  
  await tail.exited
  process.stdout.write(`${path}\n`)
})

await server.exited