"use client";
import React from "react";

type ListItem<T> = {
  id: string | number;
  data: T;
};

type ListProps<T> = {
  items: ListItem<T>[];
  renderItem: (item: T, index: number) => React.ReactNode;
  containerClassName?: string;
  listClassName?: string;
  itemClassName?: string;
};

const List = <T,>({
  items,
  renderItem,
  containerClassName = "",
  listClassName = "",
  itemClassName = "",
}: ListProps<T>) => {
  return (
    <div className={containerClassName}>
      <ul className={listClassName}>
        {items.map((it, idx) => (
          <li key={it.id} className={itemClassName}>
            {renderItem(it.data, idx)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
