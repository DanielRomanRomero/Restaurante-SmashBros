export default function MenuItemCard({ item, onDetails }) {
  return (
    <article className="bg-surface-container-high rounded-xl shadow-lg overflow-hidden hover:shadow-glow-card hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative h-64 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[6rem] text-outline-variant">lunch_dining</span>
          </div>
        )}
        {item.badge && (
          <span className="absolute top-4 right-4 bg-primary-container text-on-surface text-label-md px-3 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-montserrat font-bold text-headline-md text-on-surface">{item.name}</h3>
          <span className="font-montserrat font-bold text-price-display text-secondary-container whitespace-nowrap">
            {Number(item.price).toFixed(2)}€
          </span>
        </div>
        {item.description && (
          <p className="text-body-md text-on-surface-variant mb-4 flex-1 line-clamp-2">{item.description}</p>
        )}
        <button
          onClick={onDetails}
          className="mt-auto flex items-center justify-center gap-2 bg-primary-container text-on-surface text-label-md font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[1.8rem]">info</span>
          Ver detalles
        </button>
      </div>
    </article>
  )
}
