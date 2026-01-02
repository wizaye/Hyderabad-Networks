export function LocationMap() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight mb-4">
            Visit Us
            <br />
            <span className="font-normal">At Our Showroom</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Located in the heart of Hyderabad, visit our showroom to explore our complete range of authentic Ajanta and
            Orpat clocks.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4741997131982!2d78.4774643!3d17.389016199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977d612c6e45%3A0xc314db2fe6da506f!2sHyderabad%20Network%20(Authorised%20Distributor%20for%20Ajanta%20%26%20Orpat%20Group)!5e0!3m2!1sen!2sin!4v1766897000124!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hyderabad Networks Location"
          />
        </div>
      </div>
    </section>
  )
}


