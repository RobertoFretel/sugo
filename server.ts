import chokidar from "chokidar"
import process from "process"
import { spawnSync, spawn, readableStreamToText } from "bun"

const watcher = chokidar.watch(["content", "template", "src/render.service.tsx"], {
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

watcher.on("all", async () => {
  spawn({
    cmd: ["bun", "run", "generate"]
  })

  const { stdout } = spawn({
    cmd: ["./tailwindcss/tailwind", "-i", "./template/input.css", "-o", "./public/stile.css"],
    stdout: "pipe",
    cwd: process.cwd()
  })

  const res = await readableStreamToText(stdout)
  process.stdout.write(res)
})

await server.exited