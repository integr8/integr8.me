import { defineCollection, z } from 'astro:content';

const solutionCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    icon: z.string(),
    weight: z.number().optional(),
    technologies: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
  }),
});

const caseCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    challenge: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    weight: z.number().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    read_time: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  solutions: solutionCollection,
  cases: caseCollection,
  blog: blogCollection,
};
