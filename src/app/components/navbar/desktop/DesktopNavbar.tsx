"use client";
import React from "react";
import { useNavbarViewModel } from "./useDesktopNavbarViewModel";
import List from "@/app/components/list/List";

const DesktopNavbar = ({ isScrolled }: { isScrolled?: boolean }) => {
  const { navItems } = useNavbarViewModel();

  const listItems = navItems.map((item) => ({ id: item.id, data: item }));

  const renderNavItem = (data: { id: string; label: string }) => (
    <a
      href={`#${data.id}`}
      className="hover:text-[var(--color-primary)] transition-colors"
      style={{ color: !isScrolled ? '#FFFFFF' : undefined }}
    >
      {data.label}
    </a>
  );

  return (
    <div className="flex items-center space-x-8">
      <List<{ id: string; label: string }>
        items={listItems}
        listClassName="flex space-x-6"
        containerClassName=""
        itemClassName=""
        renderItem={renderNavItem}
      />
    </div>
  );
};

export default DesktopNavbar;