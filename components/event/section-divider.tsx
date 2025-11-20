export default function SectionDivider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
    </div>
  );
}
