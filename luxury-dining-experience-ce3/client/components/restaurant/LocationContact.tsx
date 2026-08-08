import RevealText from "./RevealText";

export default function LocationContact() {
  return (
    <section
      id="location"
      className="relative grid grid-cols-1 gap-16 border-t border-white/10 px-6 py-28 sm:px-14 sm:py-40 md:grid-cols-12"
    >
      <div className="md:col-span-5">
        <p className="mb-6 font-sans text-[11px] uppercase tracking-widest2 text-gold">
          Location &amp; Contact
        </p>
        <h2 className="font-display text-display-2 leading-[1.02] text-ivory">
          <RevealText text="Find us in" />
          <br />
          <RevealText text="Saint-Germain." delay={0.1} className="italic text-gold" />
        </h2>

        <dl className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-10">
          <div>
            <dt className="font-sans text-xs uppercase tracking-widest2 text-ivory/40">
              Address
            </dt>
            <dd className="mt-2 font-serif text-xl font-light text-ivory/80">
              18 Rue des Étoiles, 75006 Paris, France
            </dd>
          </div>
          <div>
            <dt className="font-sans text-xs uppercase tracking-widest2 text-ivory/40">
              Hours
            </dt>
            <dd className="mt-2 font-serif text-xl font-light text-ivory/80">
              Tuesday &ndash; Saturday, 7:00pm &ndash; 11:00pm
            </dd>
          </div>
          <div>
            <dt className="font-sans text-xs uppercase tracking-widest2 text-ivory/40">
              Contact
            </dt>
            <dd className="mt-2 font-serif text-xl font-light text-ivory/80">
              +33 1 42 00 00 00 <br />
              reservations@aurelian.restaurant
            </dd>
          </div>
        </dl>

        <a
          href="https://www.google.com/maps/search/?api=query=18+Rue+des+Etoiles+Paris"
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest2 text-gold"
        >
          Get Directions
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>

      <div
        data-cursor="image"
        className="relative aspect-[4/5] overflow-hidden md:col-span-6 md:col-start-7"
      >
        <img
          src="https://images.unsplash.com/photo-1519690889869-e705e59f72e1?auto=format&fit=crop&w=1400&q=80"
          alt="Night view of the Aurelian building exterior in Paris"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
      </div>
    </section>
  );
}
