export default function HomeHighlight() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center cursor-default">
          <Highlight title="20K+" subtitle="Delegates" />
          <Highlight title="600+" subtitle="Speakers" />
          <Highlight title="20+" subtitle="Host Cities" />
          <Highlight title="30+" subtitle="Years Running" />
        </div>
      </div>
    </section>
  );
}

type HighlightProps = {
  title: string;
  subtitle: string;
};
function Highlight({ title, subtitle }: HighlightProps) {
  return (
    <div className="p-6">
      <h2 className="space_mono text-3xl md:text-5xl lg:text-6xl font-bold">
        {title}
      </h2>
      <h3 className="arvo mt-2 text-xl md:text-2xl font-semibold text-yellow-400">
        {subtitle}
      </h3>
    </div>
  );
}
