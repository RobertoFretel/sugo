import { config } from "../sitemap.config";
import { getPage } from "./markdown.service";
import { writePage, renderPage } from "./render.service";
import process from "process";

async function generate () {
  const page = process.argv[2]

  if (page == undefined) throw Error;
  const post = await getPage(page)
  const html = renderPage(post.content, post.data)
  await writePage(config.outputDir, post.slug, html);
}

await generate()
