export default function HomeHighlight() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center cursor-default">
          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              20,000+
            </h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Delegates
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">600+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Speakers
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">20+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Host Cities
            </h3>
          </div>

          <div className="p-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">30+</h2>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
              Years Running
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
