import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero */}
      <section className="bg-surface-container-lowest py-16 text-center">
        <p className="text-label-md text-secondary-container uppercase tracking-widest mb-2">Estamos aquí para ti</p>
        <h1 className="font-montserrat font-black text-headline-lg text-on-surface">
          <span className="text-primary-container">Contacto</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-3 max-w-lg mx-auto">
          ¿Tienes alguna pregunta o necesitas ayuda? Escríbenos o llámanos.
        </p>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Info de contacto */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-montserrat font-bold text-headline-md text-on-surface mb-6">Información de contacto</h2>
              <div className="w-16 h-0.5 bg-primary-container rounded-full mb-8" />
            </div>

            <ContactItem
              icon="location_on"
              label="Dirección"
              value="Calle Gran Vía, 42"
              detail="28013 Madrid, España"
            />
            <ContactItem
              icon="phone"
              label="Teléfono"
              value="+34 91 123 45 67"
              detail="Lun–Dom · 12:00 – 23:00"
            />
            <ContactItem
              icon="mail"
              label="Email"
              value="hola@smashbrosburger.es"
              detail="Respondemos en menos de 24h"
            />
            <ContactItem
              icon="schedule"
              label="Horario"
              value="Comida: 13:00 – 16:00"
              detail="Cena: 20:00 – 23:00"
            />
          </div>

          {/* Mapa */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-montserrat font-bold text-headline-md text-on-surface mb-6">Cómo llegarnos</h2>
              <div className="w-16 h-0.5 bg-primary-container rounded-full mb-8" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-outline-variant/30 shadow-lg h-[420px]">
              <iframe
                title="Ubicación Smash Bros Burger"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.405695370882!2d-3.7037902!3d40.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229bc1ca0c6b3%3A0x5cc82e2a14c8a88f!2sGran%20V%C3%ADa%2C%2042%2C%2028013%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function ContactItem({ icon, label, value, detail }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[2.2rem] text-primary-container">{icon}</span>
      </div>
      <div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-montserrat font-bold text-headline-sm text-on-surface">{value}</p>
        {detail && <p className="text-body-md text-on-surface-variant mt-0.5">{detail}</p>}
      </div>
    </div>
  )
}
