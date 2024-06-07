export default function HomeHighlight() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">500+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Delegates
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">100+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Speakers
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">4+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Locations
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">11+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Years Running
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
