import Image from "next/image";

export default function SpinningBackground() {
  return (
    <div className="overflow-hidden relative h-full rounded-lg z-10">
      <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="relative h-[90rem] w-[90rem] md:h-[72rem] md:w-[72rem] rounded-full overflow-hidden">
          <Image
            src="/assets/images/header-bg.svg"
            alt="Conference Aboriginal Art"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover z-10 opacity-20 grayscale animate-[spin_20s_linear_infinite]"
          />
        </div>
      </div>
    </div>
  );
}
