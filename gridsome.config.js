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
          ]
        }
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
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
        feedItemOptions: node => ({
          title: node.title,
          description: `<p>${node.excerpt}</p><p><a href="https://alex.party${node.path}">Read more at Alex.Party</a></p>`,
          date: node.date,
          url: 'https://alex.party'+node.path,
          author: 'Alex Riviere',
          custom_elements: [{
            published: new Date(node.date).toUTCString(),
          }]
        }),
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
