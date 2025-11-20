import Image from "next/image";

type PosterProps = {
  src: string;
  alt: string;
};
export default function Poster({ src, alt }: PosterProps) {
  return (
    <div className="relative float-left border border-yellow-400 overflow-hidden hidden mb-3.5 mr-6 md:block h-[280px] w-[200px] md:h-[370px] md:w-[260px] lg:h-[450px] lg:w-[320px] box_shadow rounded-md">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
