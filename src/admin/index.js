import CMS from "@staticcms/core"
/*import styles from '../styles/global.css?raw';
import prismStyles from 'prismjs/themes/prism-tomorrow.css?raw';
import htm from 'htm';

const html = htm.bind(h);


import markdownIt from "markdown-it";
import Prism from "prismjs";*/

const config = {
  backend: {
    name: 'github',
    repo: 'fimion/alex-party',
    branch: 'master'
  },
  media_folder: "public/uploads",
  public_folder: "/uploads",
  site_url: "https://alex.party",
  display_url: "https://alex.party",
  collections:[
    {
      name: "posts",
      label: "Posts",
      label_singular: "Post",
      folder: "src/pages/posts",
      create: true,
      slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
      summary: "{{year}}/{{month}}/{{day}} - {{title}}",
      sortableFields: ['pubDate'],
      fields:[
          {label: "Title", name: "title", widget: "string"},
          {label: "Publish Date", name: "pubDate", widget: "datetime"},
          {label: "Publish?", name: "draft", widget: "boolean"},
          {label: "Body", name: "body", widget: "markdown"},
          ]
    }
  ]
}

CMS.init({config})


/*// customize markdown-it
const options = {
  html: true,
  typographer: true,
  linkify: true,
  highlight: function (str, lang) {
    const languageString = "language-" + lang;
    if (Prism.languages[lang]) {
      return '<pre class="language-' + lang + '"><code class="language-' + lang + '">' + Prism.highlight(str, Prism.languages[lang], lang) + '</code></pre>';
    } else {
      return '<pre class="language-' + lang + '"><code class="language-' + lang + '">' + Prism.util.encode(str) + '</code></pre>';
    }
  }
};

const customMarkdownIt = new markdownIt(options);

const PostPreview = window.createClass({
      render: function() {
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title']);
        const date = entry.getIn(['data', 'date']);
        const body =  entry.getIn(['data', 'body']);
        const bodyRendered = customMarkdownIt.render(body||'');
        return html`<div class="layout">

                      <header className="header">
                        <h1>
                          <a href="#" className="nav__link home" >Alex.Party</a>
                        </h1>
                        <nav class="nav">
                          <a href="#" className="nav__link" >Home</a>
                          <a href="#" className="nav__link" >About</a>
                        </nav>
                      </header>
                      <main className="content">
                        <section>
                          <article>
                            <h2><a href="#">${title}</a></h2>
                            <div className="sans-serif">
                              <p>${date ? date.toLocaleString() : (new Date()).toLocaleString()}</p>
                              <div dangerouslySetInnerHTML="${{__html:bodyRendered}}"></div>
                            </div>
                          </article>
                        </section>
                      </main>
                    </div>`;
      }
    });
CMS.registerPreviewStyle(styles.toString()+`\nbody {background: #000 0 0/200px 200px url("/img/memphis-design.svg");}`, { raw: true });
CMS.registerPreviewStyle(prismStyles.toString(), {raw:true});
CMS.registerPreviewTemplate("posts", PostPreview);*/


