import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      short: z.string(),
      exhibit: z.string(),
      org: z.string(),
      year: z.string(),
      order: z.number(),
      problem: z.string(),
      role: z.string(),
      stack: z.array(z.string()),
      findings: z.array(z.string()),
      diagram: z.enum(['dashboard', 'aad', 'eiam', 'scanner']),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCaption: z.string().optional(),
      redacted: z.boolean().default(false),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string() }))
        .default([]),
      repo: z.string().url().optional(),
      status: z.string().optional(),
    }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, posts };
