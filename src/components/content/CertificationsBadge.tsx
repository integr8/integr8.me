import React from 'react';
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiKubernetes,
  SiTerraform,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiHelm,
  SiJenkins,
  SiGithubactions,
} from 'react-icons/si';
import { FiAward, FiShield, FiCheckCircle, FiCloud, FiRefreshCw } from 'react-icons/fi';
import { HiAcademicCap, HiSparkles } from 'react-icons/hi2';

interface Certification {
  name: string;
  category?: string;
}

interface CertificationsBadgeProps {
  title?: string;
  certifications: Certification[] | Record<string, string[]>;
}

// Icon mapping for certifications
const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  aws: SiAmazonwebservices,
  azure: FiCloud,
  gcp: SiGooglecloud,
  google: SiGooglecloud,
  kubernetes: SiKubernetes,
  cka: SiKubernetes,
  ckad: SiKubernetes,
  cks: SiKubernetes,
  terraform: SiTerraform,
  docker: SiDocker,
  grafana: SiGrafana,
  prometheus: SiPrometheus,
  helm: SiHelm,
  argo: FiRefreshCw,
  gitops: FiRefreshCw,
  jenkins: SiJenkins,
  github: SiGithubactions,
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: SiAmazonwebservices,
  security: FiShield,
  devops: SiGithubactions,
  platform: SiKubernetes,
  framework: HiSparkles,
  compliance: FiCheckCircle,
};

function getCertIcon(name: string): React.ComponentType<{ className?: string }> {
  const lowerName = name.toLowerCase();
  for (const [key, Icon] of Object.entries(certIconMap)) {
    if (lowerName.includes(key)) {
      return Icon;
    }
  }
  return FiAward;
}

function getCategoryIcon(category: string): React.ComponentType<{ className?: string }> {
  const lowerCategory = category.toLowerCase();
  for (const [key, Icon] of Object.entries(categoryIconMap)) {
    if (lowerCategory.includes(key)) {
      return Icon;
    }
  }
  return HiAcademicCap;
}

export function CertificationsBadge({
  title = 'Certificações',
  certifications,
}: CertificationsBadgeProps) {
  // Handle both array and object formats
  const isGrouped = !Array.isArray(certifications);

  if (isGrouped) {
    const groups = certifications as Record<string, string[]>;

    return (
      <div className="my-8">
        {title && (
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
              <HiAcademicCap className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold text-base-content">{title}</h3>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(groups).map(([category, certs], groupIndex) => {
            const CategoryIcon = getCategoryIcon(category);

            return (
              <div
                key={groupIndex}
                className="rounded-2xl border border-base-200 bg-base-100 p-6 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-2">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                  <h4 className="font-bold text-base-content">{category}</h4>
                </div>

                <div className="space-y-3">
                  {certs.map((cert, certIndex) => {
                    const CertIcon = getCertIcon(cert);
                    return (
                      <div
                        key={certIndex}
                        className="flex items-center gap-3 rounded-xl bg-base-200/30 p-3 transition-colors hover:bg-base-200/50"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-base-100 text-primary">
                          <CertIcon className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-base-content/80">{cert}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Simple array format
  const certList = certifications as Certification[];

  return (
    <div className="my-8">
      {title && (
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <HiAcademicCap className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold text-base-content">{title}</h3>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {certList.map((cert, index) => {
          const certName = typeof cert === 'string' ? cert : cert.name;
          const CertIcon = getCertIcon(certName);

          return (
            <div
              key={index}
              className="group flex items-center gap-2 rounded-full border border-base-200 bg-base-100 px-4 py-2 transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <CertIcon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium text-base-content/80">{certName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CertificationsBadge;
