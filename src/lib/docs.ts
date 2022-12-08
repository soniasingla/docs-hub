import { deepStrictEqual } from "assert";
import { existsSync, fstat, readFileSync } from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import { join } from "path";
import { DOCS_DIRECTORY } from "../constants";
import { DocsConfig } from "../types";
import { removeDocsPath } from "./urls";

type DocPathType = {
  slug: string;
  path: string;
};

export async function getDocs(): Promise<DocPathType[]> {
  const paths = await globby(["./**/*.mdx", "./**/**.md"], {
    cwd: DOCS_DIRECTORY,
  });
  return paths.map((path) => ({
    slug: removeDocsPath(path),
    path,
  }));
}

export async function getDocFromSlug(slug: string): Promise<DocPathType> {
  const slugs = await getDocs();
  const slugPath = slugs.find(({ slug: pathSlug }) => pathSlug.includes(slug));
  if (!slugPath) {
    throw new Error(`${slug} not found`);
  }
  return slugPath;
}

export async function getDocPath({ path }: DocPathType) {
  return join(DOCS_DIRECTORY, path);
}

export async function getDocConfig(name: string): Promise<DocsConfig> {
  const docConfigPath = join(DOCS_DIRECTORY, name, "docs.json");
  if (existsSync(docConfigPath)) {
    return JSON.parse(readFileSync(docConfigPath, "utf8"));
  } else {
    throw new Error(`${name} docs.json not found`);
  }
}

export async function getDocContent(path: string) {
  const document = readFileSync(path, "utf8");
  const { data, content } = matter(document);
  return {
    header: data,
    content,
  };
}

export async function getRepositoryLink(config: DocsConfig, doc: DocPathType) {
  return join(config.repository, "/docs/", doc.path);
}

export function splitSlug(slug?: string) {
  return (slug || '').split('/');
}

export function joinSlug(slugs?: string[]) {
  return (slugs || []).join('/');
}