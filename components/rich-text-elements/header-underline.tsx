type HeaderUnderlineProps = {
  children: React.ReactNode;
};

export default function HeaderUnderline({ children }: HeaderUnderlineProps) {
  return (
    <div className="mb-1">
      {children}
      <div className="bg-yellow-400 h-2.5 w-24 -mt-0.5 box_shadow" />
    </div>
  );
}
