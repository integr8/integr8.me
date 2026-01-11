import React, { useState, useEffect } from 'react';
import { FiList, FiX, FiChevronRight } from 'react-icons/fi';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface SolutionTableOfContentsProps {
  items?: TOCItem[];
}

export function SolutionTableOfContents({ items }: SolutionTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TOCItem[]>(items || []);

  useEffect(() => {
    // Auto-generate TOC from headings if not provided
    if (!items) {
      const headings = document.querySelectorAll('article h2, article h3');
      const generatedItems: TOCItem[] = [];
      
      headings.forEach((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        if (!heading.id) heading.id = id;
        
        generatedItems.push({
          id,
          title: heading.textContent || '',
          level: heading.tagName === 'H2' ? 2 : 3,
        });
      });
      
      setTocItems(generatedItems);
    }
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  // Mobile floating button + drawer
  const mobileContent = (
    <div className="lg:hidden">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg transition-transform hover:scale-105"
        aria-label="Abrir índice"
      >
        <FiList className="h-6 w-6" />
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-base-100 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-base-content">Índice</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-circle btn-ghost btn-sm"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        item.level === 3 ? 'ml-4' : ''
                      } ${
                        activeId === item.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-base-content/70 hover:bg-base-200/50'
                      }`}
                    >
                      <FiChevronRight className={`h-4 w-4 shrink-0 transition-transform ${activeId === item.id ? 'text-primary' : 'text-base-content/40'}`} />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );

  // Desktop sticky sidebar
  const desktopContent = (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <nav className="rounded-2xl border border-base-200 bg-base-100/80 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-base-content/60">
            <FiList className="h-4 w-4" />
            Índice
          </h3>
          <ul className="space-y-1">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                    item.level === 3 ? 'ml-3 text-xs' : ''
                  } ${
                    activeId === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-base-content/60 hover:text-base-content hover:bg-base-200/50'
                  }`}
                >
                  {activeId === item.id && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );

  return (
    <>
      {mobileContent}
      {desktopContent}
    </>
  );
}

export default SolutionTableOfContents;
