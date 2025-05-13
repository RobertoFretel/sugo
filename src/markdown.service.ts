
import matter from "gray-matter";
import path from "path"
import { renderPage } from "./render.service";

export async function getPage (filepath: string) {
  const raw = await Bun.file(filepath).text()
  const { content, data } = matter(raw)
    
  return {
    slug: path.parse(filepath).name,
    data: data,
    content
  }

}