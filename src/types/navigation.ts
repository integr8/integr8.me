export interface Frontmatter {
  title: string;
  slug: string;
  description?: string;
  author?: string;
  date?: Date;
  image?: string;
  category?: string;
  tags?: string[];
  related?: string[];
  technologies?: string[];
  [key: string]: unknown;
}

export interface BlogPost extends Frontmatter {
  read_time?: number;
  featured?: boolean;
}

export interface Solution extends Frontmatter {
  icon?: string;
  weight?: number;
}

export interface Case extends Frontmatter {
  client?: string;
  industry?: string;
  challenge?: string;
  results?: CaseResult[];
  quote?: CaseQuote;
  featured?: boolean;
  weight?: number;
}

export interface CaseResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}
