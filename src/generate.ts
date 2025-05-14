import { config } from "../sitemap.config";
import { getPage } from "./markdown.service";
import { writePage, renderPage, renderHome } from "./render.service";

export async function generate (page: string) {
  const post = await getPage(page)

  const html = renderPage(post.content, post.data)
  await writePage(config.outputDir, post.slug, "blog", html);

  const home = await renderHome()
  await writePage(config.outputDir, config.homeDir, "", home)
}