import React from 'react';
import { 
  FiCloud, FiCode, FiShield, FiActivity, 
  FiDatabase, FiLayers, FiGitBranch, FiZap 
} from 'react-icons/fi';
import { 
  SiKubernetes, SiTerraform, SiDocker, SiGrafana 
} from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi2';

interface SolutionHeroProps {
  title: string;
  description: string;
  category: string;
  technologies?: string[];
  icon?: string;
}

const categoryConfig: Record<string, { 
  gradient: string; 
  icon: React.ComponentType<{ className?: string }>; 
  accentColor: string;
  bgPattern: string;
}> = {
  'cloud-platform': {
    gradient: 'from-blue-600 via-blue-500 to-cyan-400',
    icon: FiCloud,
    accentColor: 'text-blue-400',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
  },
  'engineering': {
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-400',
    icon: FiCode,
    accentColor: 'text-purple-400',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(217, 70, 239, 0.1) 0%, transparent 50%)',
  },
  'devops': {
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
    icon: FiGitBranch,
    accentColor: 'text-emerald-400',
    bgPattern: 'radial-gradient(circle at 25% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
  },
  'security': {
    gradient: 'from-red-600 via-rose-500 to-orange-400',
    icon: FiShield,
    accentColor: 'text-red-400',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
  },
  'observability': {
    gradient: 'from-amber-500 via-orange-500 to-yellow-400',
    icon: FiActivity,
    accentColor: 'text-amber-400',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)',
  },
  'kubernetes': {
    gradient: 'from-blue-600 via-indigo-500 to-blue-400',
    icon: SiKubernetes,
    accentColor: 'text-blue-400',
    bgPattern: 'radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
  },
  'data': {
    gradient: 'from-cyan-600 via-teal-500 to-emerald-400',
    icon: FiDatabase,
    accentColor: 'text-cyan-400',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
  },
  'platform': {
    gradient: 'from-indigo-600 via-purple-500 to-pink-400',
    icon: FiLayers,
    accentColor: 'text-indigo-400',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
  },
};

const defaultConfig = {
  gradient: 'from-primary via-primary/80 to-secondary',
  icon: HiSparkles,
  accentColor: 'text-primary',
  bgPattern: 'radial-gradient(circle at 20% 80%, rgba(var(--p), 0.15) 0%, transparent 50%)',
};

// Technology icon mapping
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'kubernetes': SiKubernetes,
  'k8s': SiKubernetes,
  'eks': SiKubernetes,
  'aks': SiKubernetes,
  'gke': SiKubernetes,
  'terraform': SiTerraform,
  'opentofu': SiTerraform,
  'docker': SiDocker,
  'grafana': SiGrafana,
  'aws': FiCloud,
  'azure': FiCloud,
  'gcp': FiCloud,
  'cloud': FiCloud,
};

function getTechIcon(tech: string): React.ComponentType<{ className?: string }> | null {
  const lowerTech = tech.toLowerCase();
  for (const [key, Icon] of Object.entries(techIconMap)) {
    if (lowerTech.includes(key)) {
      return Icon;
    }
  }
  return null;
}

export function SolutionHero({ title, description, category, technologies = [] }: SolutionHeroProps) {
  const config = categoryConfig[category] || defaultConfig;
  const IconComponent = config.icon;

  return (
    <div className="relative overflow-hidden bg-base-200/50">
      {/* Background decorations */}
      <div 
        className="absolute inset-0 opacity-60" 
        style={{ background: config.bgPattern }}
      />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 animate-float rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} text-white shadow-lg`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wider text-base-content/60">
                {category.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight text-base-content lg:text-5xl xl:text-6xl">
              <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-base-content/70 lg:text-xl">
              {description}
            </p>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-base-content/50">
                  Tecnologias
                </span>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => {
                    const TechIcon = getTechIcon(tech);
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100/80 px-3 py-1.5 text-sm font-medium text-base-content/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/5"
                      >
                        {TechIcon && <TechIcon className={`h-3.5 w-3.5 ${config.accentColor}`} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#desafio" 
                className={`btn btn-primary bg-gradient-to-r ${config.gradient} border-0 text-white shadow-lg hover:shadow-xl`}
              >
                <FiZap className="h-4 w-4" />
                Ver Desafios
              </a>
              <a href="#resultados" className="btn btn-outline">
                Ver Resultados
              </a>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative hidden lg:block">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${config.gradient} opacity-10 blur-2xl`} />
            <div className="relative rounded-3xl border border-base-200 bg-base-100/50 p-8 backdrop-blur-sm">
              {/* Abstract visual representation */}
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${config.gradient} opacity-${10 + (i % 3) * 10} transition-all duration-500 hover:opacity-50`}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transform: `scale(${0.8 + (i % 3) * 0.1})`,
                    }}
                  />
                ))}
              </div>
              
              {/* Center icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} text-white shadow-2xl`}>
                  <IconComponent className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-base-100"
          />
        </svg>
      </div>
    </div>
  );
}

export default SolutionHero;
