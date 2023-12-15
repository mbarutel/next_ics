import Image from "next/image";

export default function SpinningBackground() {
  return (
    <div className="overflow-hidden relative h-full rounded-lg">
      <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="relative h-[72rem] w-[72rem] rounded-full overflow-hidden">
          <Image
            src="/assets/images/header-bg.svg"
            alt="Conference Aboriginal Art"
            fill
            className="object-cover z-10 opacity-20 grayscale animate-[spin_10s_linear_infinite]"
          />
        </div>
      </div>
    </div>
  );
}

