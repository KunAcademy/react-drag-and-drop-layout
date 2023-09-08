import React from 'react';
import { DraggingItemInterface } from './interface';

interface DraggingItemPropsInterface  {
  item: DraggingItemInterface
}

const DraggingItem: React.FC<DraggingItemPropsInterface> = ({ item }) => {
  return (
    <div>
      hello
    </div>
  )
}