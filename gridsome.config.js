// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Alex.Party',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
        '@gridsome/remark-prismjs',
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        remark: {
          plugins: [
            // ...local plugins
            '@gridsome/remark-prismjs',
          ]
        }
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`
      }
    },
    {
      use: `gridsome-plugin-rss`,
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Alex.Party',
          feed_url: 'https://alex.party/rss.xml',
          site_url: 'https://alex.party',
        },
        feedItemOptions: node => {
          console.log(Object.keys(node));
          return {
            title: node.title,
            description: `${node.content}\n<p>Originally Posted as <a href="https://alex.party${node.path}">${node.title}</a> at alex.party</p>`,
            date: node.date,
            url: 'https://alex.party'+node.path,
            author: 'Alex Riviere',
            custom_elements: [{
              published: new Date(node.date).toUTCString(),
            }]
          }
        },
        output: {
          dir: './static',
          name: 'rss.xml',
        },
      }
    }
  ],
  templates:{
    Post:'/posts/:year-:month-:day-:title'
  }
}
