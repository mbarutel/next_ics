type GuideBoxProps = {
  text: string;
  link: string;
  textLink: string;
};
export default function GuideBox({ text, link, textLink }: GuideBoxProps) {
  return (
    <div className="flex items-center justify-center text-plum lg:text-lg my-6 capitalize">
      <div className="h-9 w-2 mr-3"></div>
      <span className="text-stone-500">
        {text}&nbsp;
      </span>
      <a
        href={link}
        className="text-orange-500 transition-all hover:text-sky-500/90 focus:text-sky-500/90 flex active:scale-95"
      >
        {" "}
        {textLink}
      </a>
    </div>
  );
}
