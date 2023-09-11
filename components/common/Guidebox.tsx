type GuideBoxProps = {
  text: string;
  link: string;
  textLink: string;
};
export default function GuideBox({ text, link, textLink }: GuideBoxProps) {
  return (
    <div className="flex items-center justify-center text-plum lg:text-lg my-6">
      <div className="h-9 w-2 bg-hibiscus/80 mr-3"></div>
      <span>
        {text}&nbsp;
      </span>
      <a
        href={link}
        className="text-hibiscus/80 transition-all hover:text-elden/90 focus:text-elden/90 flex active:scale-105"
      >
        {" "}
        {textLink}
      </a>
    </div>
  );
}
