"use client";
import React from "react";
import { useNavbarViewModel } from "./useDesktopNavbarViewModel";
import List from "@/app/components/list/List";

const DesktopNavbar = ({ isScrolled }: { isScrolled?: boolean }) => {
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
            className="hover:text-[var(--color-primary)] transition-colors"
            style={{ color: !isScrolled ? '#FFFFFF' : undefined }}
          >
            {data.label}
          </a>
        )}
      />
    </div>
  );
};

export default DesktopNavbar;