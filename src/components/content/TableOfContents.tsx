import React, { useEffect, useState } from 'react';
import { FiList, FiX, FiChevronRight } from 'react-icons/fi';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  lang: string;
}

export function TableOfContents({ lang }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector('article') || document.querySelector('.prose');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: TOCItem[] = [];

    elements.forEach((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      if (!el.id) el.id = id;

      items.push({
        id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -80% 0%',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile TOC button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-circle btn-primary fixed bottom-6 right-6 z-40 shadow-xl lg:hidden"
        aria-label={lang === 'ptbr' ? 'Índice' : 'Table of Contents'}
      >
        <FiList className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-base-100 p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">{lang === 'ptbr' ? 'Índice' : 'Table of Contents'}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-circle btn-ghost btn-sm"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <nav>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      heading.level === 3 ? 'pl-6' : ''
                    } ${
                      activeId === heading.id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    {activeId === heading.id && <FiChevronRight className="h-3 w-3" />}
                    <span className="line-clamp-2">{heading.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sticky TOC */}
      <aside className="sticky top-24 hidden max-h-[calc(100vh-120px)] w-64 overflow-auto lg:block">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-base-content/50">
          {lang === 'ptbr' ? 'Neste artigo' : 'In this article'}
        </h3>
        <nav>
          <ul className="border-l border-base-300">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full border-l-2 py-2 text-left text-sm transition-all ${
                    heading.level === 3 ? 'pl-6' : 'pl-4'
                  } ${
                    activeId === heading.id
                      ? 'border-primary font-medium text-primary'
                      : 'border-transparent text-base-content/70 hover:border-base-content/30 hover:text-base-content'
                  }`}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
