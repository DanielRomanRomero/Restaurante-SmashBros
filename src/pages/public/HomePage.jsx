import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import MenuItemCard from '../../components/menu/MenuItemCard'
import { useMenuItems } from '../../hooks/useMenuItems'

export default function HomePage() {
  const { items } = useMenuItems()
  const featured = items.slice(0, 3)

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600"
          alt="Smash Bros Burger"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-16 py-24">
          <p className="text-label-md text-secondary-container uppercase tracking-widest mb-4">
            Urban Luxury Street Food
          </p>
          <h1 className="font-montserrat font-black text-headline-xl text-on-surface leading-none mb-6">
            LA REVOLUCIÓN<br />DEL <span className="text-primary-container">SMASH</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg mb-10">
            Carne fresca aplastada a la perfección. Cada burger es una obra de arte urbana.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/reservar"
              className="bg-primary-container text-on-surface font-montserrat font-bold text-label-md px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-glow-active transition-all"
            >
              Reservar Mesa
            </Link>
            <Link
              to="/menu"
              className="border border-secondary-container text-secondary-container font-montserrat font-bold text-label-md px-8 py-4 rounded-xl hover:bg-secondary-container/10 transition-all"
            >
              Ver Carta
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      {featured.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 md:px-16 py-24">
          <div className="flex items-end gap-4 mb-2">
            <h2 className="font-montserrat font-black text-headline-lg text-on-surface">
              Top <span className="text-secondary-container">Smashed</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-primary-container rounded-full mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.length >= 1 && (
              <div className="md:col-span-1">
                <MenuItemCard item={featured[0]} />
              </div>
            )}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featured.slice(1).map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-label-md text-primary-container hover:gap-4 transition-all"
            >
              Ver toda la carta
              <span className="material-symbols-outlined text-[1.8rem]">arrow_forward</span>
            </Link>
          </div>
        </section>
      )}

      {/* About */}
      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label-md text-secondary-container uppercase tracking-widest mb-4">Nuestra historia</p>
              <h2 className="font-montserrat font-black text-headline-lg text-on-surface mb-6">
                Más que una <span className="text-primary-container">burger</span>
              </h2>
              <div className="border-l-2 border-secondary-container pl-6 mb-6">
                <p className="text-body-lg text-on-surface-variant">
                  Nacimos con una obsesión: crear la smash burger perfecta. Carne de primera, técnica impecable, sabores que no olvidarás.
                </p>
              </div>
              <p className="text-body-md text-on-surface-variant mb-8">
                Cada ingrediente está elegido con cuidado. Cada burger, aplastada en el momento exacto. Bienvenido a la revolución.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-label-md text-primary-container border-b border-primary-container pb-0.5 hover:gap-4 transition-all"
              >
                Explorar el menú
                <span className="material-symbols-outlined text-[1.8rem]">arrow_forward</span>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=700"
                alt="Cocina Smash Bros"
                className="rounded-xl w-full grayscale hover:grayscale-0 transition-all duration-700 border border-outline-variant/20 rotate-1"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
