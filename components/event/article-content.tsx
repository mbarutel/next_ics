import React, { ReactNode } from "react";

type ArticleContentProps = {
  children: ReactNode;
};

export default function ArticleContent({ children }: ArticleContentProps) {
  return (
    <article className="article-wrapper">
      <div className="article-content">
        {children}
      </div>
    </article>
  );
}
