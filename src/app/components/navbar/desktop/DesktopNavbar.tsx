"use client";
import React from "react";
import { useNavbarViewModel } from "./useDesktopNavbarViewModel";
import List from "@/app/components/list/List";

const DesktopNavbar = () => {
  const { navItems } = useNavbarViewModel();

  return (
    <div className="flex items-center space-x-8">
      <List<{ id: string; label: string }>
        items={navItems.map((item) => ({ id: item.id, data: item }))}
        listClassName="flex space-x-6"
        containerClassName=""
        itemClassName=""
        renderItem={(data) => (
          <a
            href={`#${data.id}`}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            {data.label}
          </a>
        )}
      />
    </div>
  );
};

export default DesktopNavbar;