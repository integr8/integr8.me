import React, { useState } from 'react';
import { Icon } from '@components/common/Icon';

export interface TabItem {
  label: string;
  icon?: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveIndex?: number;
  centered?: boolean;
}

export function Tabs({ items, defaultActiveIndex = 0, centered = false }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <div className="flex flex-col">
      <div className={`tabs tabs-boxed ${centered ? 'justify-center' : ''}`}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`tab gap-2 ${activeIndex === index ? 'tab-active' : ''}`}
          >
            {item.icon && <Icon name={item.icon} className="h-4 w-4" />}
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {items[activeIndex] && items[activeIndex].content}
      </div>
    </div>
  );
}
