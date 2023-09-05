type GuideBoxProps = {
  text: string;
  link: string;
  textLink: string;
};
export default function GuideBox({ text, link, textLink }: GuideBoxProps) {
  return (
    <div className="flex items-center justify-center text-metal_gray lg:text-lg mt-6">
      <div className="h-9 w-2 bg-blue-400/80 mr-3"></div>
      <span className="text-stone-600">
        {text}&nbsp;
      </span>
      <a
        href={link}
        className="text-blue-400/80 transition-all hover:text-pink-400/70 focus:text-pink-400/70 flex active:scale-105"
      >
        {" "}
        {textLink}
      </a>
    </div>
  );
}
