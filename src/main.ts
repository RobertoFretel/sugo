import serveStatic from "serve-static-bun";
import { config } from "../sitemap.config";
import path from "path"

const searcher = new Bun.Glob("**/*.html")
const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/": {
      GET: async (req) => {
        const { origin } = new URL(req.url)

        const pages = await Array.fromAsync(searcher.scan({
          cwd: path.join(process.cwd(), config.outputDir)
        }))

        return Response.json(pages.map(page => ({
          title: page.split("/").reverse()[0],
          url: path.join(origin, page)
        })))
      },
      POST: () => Response.error()
    }
  },
  fetch: serveStatic("public"),
})

console.log(`Server iniziato a http://localhost:${server.port}`)