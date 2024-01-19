import CMS from "@staticcms/core";
import React from "react";
import "@staticcms/core/dist/main.css";
import styles from "../styles/global.css?raw";
import prismStyles from "prismjs/themes/prism-tomorrow.css?raw";

import MarkdownIt from "markdown-it";
import Prism from "prismjs";

// customize markdown-it
const options = {
  html: true,
  typographer: true,
  linkify: true,
  highlight: function (str, lang) {
    const languageString = "language-" + lang;
    if (Prism.languages[lang]) {
      return (
        '<pre class="language-' +
        lang +
        '"><code class="language-' +
        lang +
        '">' +
        Prism.highlight(str, Prism.languages[lang], lang) +
        "</code></pre>"
      );
    } else {
      return (
        '<pre class="language-' +
        lang +
        '"><code class="language-' +
        lang +
        '">' +
        Prism.util.encode(str) +
        "</code></pre>"
      );
    }
  },
};

const customMarkdownIt = new MarkdownIt(options);

const PostPreview = (props) => {
  const entry = props.entry;
  const title = entry?.data?.title;
  const date = entry?.data?.pubDate;
  const body = entry?.data?.body;
  const style = entry?.data?.style;
  const bodyRendered = customMarkdownIt.render(body || "");
  return (
    <div className="layout">
      <header className="header">
        <h1>
          <a href="#" className="nav__link home">
            Alex.Party
          </a>
        </h1>
        <nav className="nav">
          <a href="#" className="nav__link">
            Home
          </a>
          <a href="#" className="nav__link">
            About
          </a>
        </nav>
      </header>
      <main className="content">
        {(style && style!=="") && <style>{`@scope{${style}}`}</style>}
        <section>
          <article>
            <h2>
              <a href="#">{title}</a>
            </h2>
            <div className="sans-serif">
              <p>
                {new Intl.DateTimeFormat("en-us").format(
                  date ? new Date(date) : new Date()
                )}
              </p>
              <div dangerouslySetInnerHTML={{ __html: bodyRendered }}></div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};
CMS.registerPreviewStyle(prismStyles.toString(), { raw: true });
CMS.registerPreviewStyle(
  styles.toString() +
    `\nbody {background: #000 0 0/200px 200px url("/img/memphis-design.svg");}`,
  { raw: true }
);

CMS.registerPreviewTemplate("posts", PostPreview);

CMS.init({
  config: {
    backend: {
      name: "github",
      repo: "fimion/alex-party",
      branch: "master",
    },

    logo_url: "/favicon.svg",
    media_folder: "public/uploads",
    public_folder: "/uploads",
    site_url: "https://alex.party",
    display_url: "https://alex.party",
    collections: [
      {
        name: "posts",
        label: "Posts",
        label_singular: "Post",
        folder: "src/pages/posts",
        create: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        summary: "{{pubDate}} - {{title}} - Draft: {{draft}}",
        sortable_fields: {
          fields: ["pubDate"],
          default: {
            field: "pubDate",
            direction: "Descending",
          },
        },
        fields: [
          {
            name: "layout",
            label: "Layout",
            widget: "hidden",
            default: "../../layouts/BlogPost.astro",
          },
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "pubDate", widget: "datetime" },
          { label: "Draft", name: "draft", widget: "boolean", default: true },
          {
            label: "RSS Only",
            name: "rssOnly",
            widget: "boolean",
            default: false,
          },
          { label: "Body", name: "body", widget: "markdown" },
          { label: "Style", name: "style", widget: "code", default:"", default_language:"css"},
        ],
      },
    ],
  },
});
