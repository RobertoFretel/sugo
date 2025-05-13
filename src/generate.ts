import { config } from "../sitemap.config";
import { getPages } from "./markdown.service";
import { writePage } from "./render.service";

async function generate () {
  const posts = await getPages()

  for (const post of posts) {
    await writePage(config.outputDir, post.slug, post.html);
  }

}

await generate()