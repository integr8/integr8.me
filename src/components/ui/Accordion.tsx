import React, { useState } from 'react';
import { Icon } from '@components/common/Icon';

export interface AccordionItem {
  title: string;
  icon?: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    const newOpenIndexes = new Set(openIndexes);

    if (!allowMultiple) {
      newOpenIndexes.clear();
    }

    if (newOpenIndexes.has(index)) {
      newOpenIndexes.delete(index);
    } else {
      newOpenIndexes.add(index);
    }

    setOpenIndexes(newOpenIndexes);
  };

  return (
    <div className="join join-vertical w-full">
      {items.map((item, index) => (
        <div key={index} className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="accordion"
            checked={openIndexes.has(index)}
            onChange={() => toggleItem(index)}
          />
          <div className="collapse-title text-lg font-medium flex items-center gap-2">
            {item.icon && <Icon name={item.icon} className="h-5 w-5 text-primary" />}
            {item.title}
          </div>
          <div className="collapse-content">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
