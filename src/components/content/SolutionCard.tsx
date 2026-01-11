import React from 'react';
import { FiArrowRight, FiCloud } from 'react-icons/fi';
import {
  SiKubernetes,
  SiTerraform,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiHelm,
  SiAmazonwebservices,
  SiGooglecloud,
  SiGithubactions,
  SiGitlab,
  SiArgo,
  SiJenkins,
} from 'react-icons/si';
import {
  HiOutlineCloud,
  HiOutlineCode,
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineUsers,
  HiOutlineServer,
} from 'react-icons/hi';

interface SolutionCardProps {
  title: string;
  description?: string;
  icon: string;
  technologies?: string[];
  href: string;
  lang: string;
  featured?: boolean;
}

// Solution-specific colors and gradients
const solutionStyles: Record<string, { gradient: string; iconColor: string; bgColor: string }> = {
  kubernetes: {
    gradient: 'from-blue-500 to-indigo-600',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  'cloud-architecture': {
    gradient: 'from-sky-500 to-cyan-500',
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
  },
  'devops-cicd': {
    gradient: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  devsecops: {
    gradient: 'from-red-500 to-rose-500',
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  'observability-sre': {
    gradient: 'from-purple-500 to-violet-500',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  'platform-engineering': {
    gradient: 'from-orange-500 to-amber-500',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  'software-engineering': {
    gradient: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  'data-engineering': {
    gradient: 'from-teal-500 to-cyan-500',
    iconColor: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
  },
  'developer-experience': {
    gradient: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  default: {
    gradient: 'from-primary to-secondary',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
};

// Technology icons mapping
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  terraform: SiTerraform,
  docker: SiDocker,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  helm: SiHelm,
  aws: SiAmazonwebservices,
  gcp: SiGooglecloud,
  azure: FiCloud,
  'github actions': SiGithubactions,
  gitlab: SiGitlab,
  argocd: SiArgo,
  argo: SiArgo,
  jenkins: SiJenkins,
};

// Main solution icons
const solutionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  kubernetes: SiKubernetes,
  CloudIcon: HiOutlineCloud,
  CodeIcon: HiOutlineCode,
  CogIcon: HiOutlineCog,
  ShieldCheckIcon: HiOutlineShieldCheck,
  ChartBarIcon: HiOutlineChartBar,
  LightningBoltIcon: HiOutlineLightningBolt,
  DatabaseIcon: HiOutlineDatabase,
  UsersIcon: HiOutlineUsers,
  ServerIcon: HiOutlineServer,
};

export function SolutionCard({
  title,
  description,
  icon,
  technologies = [],
  href,
  lang,
  featured = false,
}: SolutionCardProps) {
  // Determine styling based on solution key from href
  const solutionKey = href.split('/').pop()?.replace('.mdx', '') || 'default';
  const style = solutionStyles[solutionKey] || solutionStyles.default;
  const IconComponent = solutionIcons[icon] || HiOutlineCog;

  return (
    <a
      href={href}
      className={`group card relative overflow-hidden border bg-base-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        featured ? 'border-primary/50 shadow-xl shadow-primary/10' : 'border-base-300 shadow-lg'
      }`}
    >
      {/* Gradient header strip */}
      <div className={`h-2 w-full bg-gradient-to-r ${style.gradient}`} />

      {/* Featured badge */}
      {featured && (
        <div className="absolute right-4 top-6">
          <span className="badge badge-primary badge-sm">
            {lang === 'ptbr' ? 'Popular' : 'Popular'}
          </span>
        </div>
      )}

      <div className="card-body items-center pt-8 text-center">
        {/* Large icon with background */}
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${style.bgColor}`}
        >
          <IconComponent className={`h-10 w-10 ${style.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="card-title mt-6 text-xl">{title}</h3>

        {/* Description */}
        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-base-content/70">{description}</p>
        )}

        {/* Technology badges with icons */}
        {technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {technologies.slice(0, 4).map((tech) => {
              const TechIcon = techIcons[tech.toLowerCase()];
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-xs font-medium transition-colors group-hover:bg-base-300"
                >
                  {TechIcon && <TechIcon className="h-3 w-3" />}
                  {tech}
                </span>
              );
            })}
            {technologies.length > 4 && (
              <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="card-actions mt-6">
          <span
            className={`flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3 ${style.iconColor}`}
          >
            {lang === 'ptbr' ? 'Explorar solução' : 'Explore solution'}
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${style.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
    </a>
  );
}
