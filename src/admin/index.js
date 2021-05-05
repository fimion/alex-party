import CMS from "netlify-cms"
import styles from '!css-loader?url=false!../style/default.css';
import prismStyles from '!css-loader!prismjs/themes/prism-tomorrow.css';
import htm from 'htm';

const html = htm.bind(h);


import markdownIt from "markdown-it";
import markdownItKatex from "@iktakahiro/markdown-it-katex";
import Prism from "prismjs";

// customize markdown-it
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
CMS.registerPreviewStyle(styles.toString()+`\nbody {background: #000 0 0/200px 200px url("/img/starry-night-noanim.svg");}`, { raw: true });
CMS.registerPreviewStyle(prismStyles.toString(), {raw:true});
CMS.registerPreviewTemplate("posts", PostPreview);


