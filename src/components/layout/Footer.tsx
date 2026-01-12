import React from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { SOCIAL_LINKS } from '@lib/constants';

interface Solution {
  slug: string;
  title: string;
}

interface FooterProps {
  lang: string;
  solutions?: Solution[];
  showCTA?: boolean;
}

export function Footer({ lang, solutions = [], showCTA = false }: FooterProps) {
  const t = {
    solutions: lang === 'ptbr' ? 'Soluções' : 'Solutions',
    company: lang === 'ptbr' ? 'Empresa' : 'Company',
    about: lang === 'ptbr' ? 'Sobre Nós' : 'About Us',
    capabilities: lang === 'ptbr' ? 'Capacidades' : 'Capabilities',
    howWeWork: lang === 'ptbr' ? 'Como Trabalhamos' : 'How We Work',
    cases: 'Cases',
    blog: 'Blog',
    contact: lang === 'ptbr' ? 'Contato' : 'Contact',
    resources: lang === 'ptbr' ? 'Recursos' : 'Resources',
    connect: lang === 'ptbr' ? 'Conecte-se' : 'Connect',
    rights: lang === 'ptbr' ? 'Todos os direitos reservados.' : 'All rights reserved.',
    privacy: lang === 'ptbr' ? 'Privacidade' : 'Privacy',
    terms: lang === 'ptbr' ? 'Termos' : 'Terms',
    description:
      lang === 'ptbr'
        ? 'Consultoria técnica em DevOps, Cloud, Kubernetes, Platform Engineering, Observabilidade, DevSecOps e Dados/AI.'
        : 'Technical consulting across DevOps, Cloud, Kubernetes, Platform Engineering, Observability, DevSecOps, and Data/AI.',
    cta: lang === 'ptbr' ? 'Pronto para começar?' : 'Ready to start?',
    ctaButton: lang === 'ptbr' ? 'Fale Conosco' : 'Contact Us',
  };

  return (
    <footer className="border-t border-base-300 bg-base-200">
      {/* Compact CTA - only show when explicitly requested */}
      {showCTA && (
        <div className="border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center text-base-content/70 sm:text-left">
                {lang === 'ptbr'
                  ? 'Vamos transformar sua infraestrutura juntos.'
                  : "Let's transform your infrastructure together."}
              </p>
              <a href={`/${lang}/contato`} className="btn btn-primary btn-sm gap-2">
                {t.ctaButton}
                <FiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <a href={`/${lang}/`} className="mb-4 inline-block">
              <img src="/images/logo.png" alt="Integr8" className="h-10 w-auto grayscale" />
            </a>
            <p className="mb-6 text-sm leading-relaxed text-base-content/70">{t.description}</p>
            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-square btn-ghost btn-sm hover:bg-primary/10 hover:text-primary"
                aria-label="Email"
              >
                <FiMail className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-square btn-ghost btn-sm hover:bg-primary/10 hover:text-primary"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-square btn-ghost btn-sm hover:bg-primary/10 hover:text-primary"
                aria-label="GitHub"
              >
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-base-content">
              {t.solutions}
            </h4>
            <ul className="space-y-2">
              {solutions.length > 0 ? (
                solutions.map((solution) => (
                  <li key={solution.slug}>
                    <a
                      href={`/${lang}/solucoes/${solution.slug}`}
                      className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                      {solution.title}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a
                    href={`/${lang}/solucoes`}
                    className="text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    {lang === 'ptbr' ? 'Ver todas' : 'View all'}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-base-content">
              {t.company}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`/${lang}/sobre`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.about}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/capacidades`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.capabilities}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/como-trabalhamos`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.howWeWork}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/contato`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-base-content">
              {t.resources}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`/${lang}/cases`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.cases}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/blog`}
                  className="group inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary"></span>
                  {t.blog}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-base-content/60 md:flex-row">
            <p>
              © {new Date().getFullYear()} Integr8. {t.rights}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-primary">
                {t.privacy}
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                {t.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
