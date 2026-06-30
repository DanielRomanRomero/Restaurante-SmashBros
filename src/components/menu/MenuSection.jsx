import { useState } from 'react'
import MenuItemCard from './MenuItemCard'
import DishDetailModal from './DishDetailModal'

export default function MenuSection({ category, items }) {
  const [selectedItem, setSelectedItem] = useState(null)

  if (!items.length) return null

  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/30">
        <h2 className="font-montserrat font-bold text-headline-md text-secondary-container">{category}</h2>
        <span className="bg-surface-variant text-on-surface-variant text-label-md px-3 py-1 rounded-full">
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            onDetails={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {selectedItem && (
        <DishDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  )
}
