import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

interface Capability {
  icon: string;
  name: string;
  technologies: string[];
}

interface CapabilitiesAccordionProps {
  capabilities: Capability[];
  lang: string;
}

const iconMap: Record<string, string> = {
  cloud: '☁️',
  kubernetes: '🐳',
  code: '📝',
  cicd: '🚀',
  observability: '📊',
  security: '🔐',
  data: '📈',
  database: '💾',
  network: '🌐',
  programming: '💻',
  frontend: '🖥️',
  devex: '👥',
  certification: '🏆',
  testing: '🧪',
};

export function CapabilitiesAccordion({ capabilities, lang }: CapabilitiesAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const INITIAL_SHOW_COUNT = 8;

  const toggleItem = (name: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedItems(newExpanded);
  };

  const toggleShowAll = (name: string) => {
    setShowAll((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredCapabilities = capabilities.filter((cap) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      cap.name.toLowerCase().includes(term) ||
      cap.technologies.some((tech) => tech.toLowerCase().includes(term))
    );
  });

  const expandAll = () => {
    setExpandedItems(new Set(capabilities.map((c) => c.name)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Search and controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder={lang === 'ptbr' ? 'Buscar tecnologia...' : 'Search technology...'}
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={expandAll} className="btn btn-ghost btn-sm">
            {lang === 'ptbr' ? 'Expandir todos' : 'Expand all'}
          </button>
          <button onClick={collapseAll} className="btn btn-ghost btn-sm">
            {lang === 'ptbr' ? 'Colapsar todos' : 'Collapse all'}
          </button>
        </div>
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-sm text-base-content/60">
          {filteredCapabilities.length}{' '}
          {lang === 'ptbr' ? 'categorias encontradas' : 'categories found'}
        </p>
      )}

      {/* Accordion grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredCapabilities.map((cap) => {
          const isExpanded = expandedItems.has(cap.name);
          const shouldShowAll = showAll[cap.name];
          const displayedTechs = shouldShowAll
            ? cap.technologies
            : cap.technologies.slice(0, INITIAL_SHOW_COUNT);
          const hasMore = cap.technologies.length > INITIAL_SHOW_COUNT;

          return (
            <div
              key={cap.name}
              className={`card overflow-hidden border bg-base-100 transition-all duration-300 ${
                isExpanded ? 'border-primary/30 shadow-lg' : 'border-base-300 shadow'
              }`}
            >
              {/* Header - always visible */}
              <button
                onClick={() => toggleItem(cap.name)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-base-200/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{iconMap[cap.icon] || '⚡'}</span>
                  <div>
                    <h3 className="font-semibold">{cap.name}</h3>
                    <p className="text-sm text-base-content/60">
                      {cap.technologies.length} {lang === 'ptbr' ? 'tecnologias' : 'technologies'}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <FiChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </button>

              {/* Expanded content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-base-300 p-4">
                  <div className="flex flex-wrap gap-2">
                    {displayedTechs.map((tech) => (
                      <span
                        key={tech}
                        className={`badge badge-sm transition-all hover:badge-primary ${
                          searchTerm && tech.toLowerCase().includes(searchTerm.toLowerCase())
                            ? 'badge-primary'
                            : 'badge-outline'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {hasMore && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleShowAll(cap.name);
                      }}
                      className="btn btn-ghost btn-xs mt-3 text-primary"
                    >
                      {shouldShowAll
                        ? lang === 'ptbr'
                          ? 'Mostrar menos'
                          : 'Show less'
                        : `${lang === 'ptbr' ? 'Ver mais' : 'Show more'} (+${cap.technologies.length - INITIAL_SHOW_COUNT})`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCapabilities.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-base-content/60">
            {lang === 'ptbr'
              ? 'Nenhuma tecnologia encontrada para sua busca.'
              : 'No technologies found for your search.'}
          </p>
        </div>
      )}
    </div>
  );
}
