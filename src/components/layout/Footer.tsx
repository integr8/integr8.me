import React from 'react';
import { Icon } from '@components/common/Icon';
import { loadSiteConfig } from '@lib/toml';
import { SOCIAL_LINKS } from '@lib/constants';

interface Solution {
  slug: string;
  title: string;
}

interface FooterProps {
  lang: string;
  solutions?: Solution[];
}

export function Footer({ lang, solutions = [] }: FooterProps) {
  const config = loadSiteConfig();

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
    description: lang === 'ptbr' 
      ? 'Consultoria técnica em DevOps, Cloud, Kubernetes, Platform Engineering, Observabilidade, DevSecOps e Dados/AI. Transformamos desafios de infraestrutura em vantagem competitiva.'
      : 'Technical consulting across DevOps, Cloud, Kubernetes, Platform Engineering, Observability, DevSecOps, and Data/AI. We turn infrastructure challenges into competitive advantage.',
    cta: lang === 'ptbr' ? 'Pronto para começar?' : 'Ready to start?',
    ctaButton: lang === 'ptbr' ? 'Fale Conosco' : 'Contact Us',
  };

  return (
    <footer className="bg-base-200 border-t border-base-300">
      {/* CTA Section */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-base-content">{t.cta}</h3>
              <p className="text-sm text-base-content/70">
                {lang === 'ptbr' 
                  ? 'Vamos conversar sobre como podemos ajudar sua empresa'
                  : "Let's talk about how we can help your company"}
              </p>
            </div>
            <a href={`/${lang}/contato`} className="btn btn-primary gap-2">
              <Icon name="ChatBubbleLeftRightIcon" className="h-5 w-5" />
              {t.ctaButton}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <a href={`/${lang}/`} className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                I8
              </div>
              <span className="text-xl font-bold text-base-content">Integr8</span>
            </a>
            <p className="text-sm text-base-content/70 leading-relaxed mb-6">
              {t.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-square hover:bg-primary/10 hover:text-primary"
                aria-label="Email"
              >
                <Icon name="EnvelopeIcon" className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-square hover:bg-primary/10 hover:text-primary"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-square hover:bg-primary/10 hover:text-primary"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icon name="RocketLaunchIcon" className="h-4 w-4 text-primary" />
              {t.solutions}
            </h4>
            <ul className="space-y-2">
              {solutions.length > 0 ? (
                solutions.map((solution) => (
                  <li key={solution.slug}>
                    <a 
                      href={`/${lang}/solucoes/${solution.slug}`} 
                      className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                      {solution.title}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a href={`/${lang}/solucoes`} className="text-sm text-base-content/70 hover:text-primary transition-colors">
                    {lang === 'ptbr' ? 'Ver todas' : 'View all'}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icon name="BuildingOffice2Icon" className="h-4 w-4 text-primary" />
              {t.company}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`/${lang}/sobre`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  {t.about}
                </a>
              </li>
              <li>
                <a 
                  href={`/${lang}/capacidades`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  {t.capabilities}
                </a>
              </li>
              <li>
                <a 
                  href={`/${lang}/como-trabalhamos`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  {t.howWeWork}
                </a>
              </li>
              <li>
                <a 
                  href={`/${lang}/contato`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icon name="BookOpenIcon" className="h-4 w-4 text-primary" />
              {t.resources}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`/${lang}/cases`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  {t.cases}
                </a>
              </li>
              <li>
                <a 
                  href={`/${lang}/blog`} 
                  className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
            <p>© {new Date().getFullYear()} Integr8. {t.rights}</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                {t.privacy}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
