const path = require('path')
const fs = require('fs')

const getAllMdFile = dir => {
  return fs
    .readdirSync(dir)
    .slice(0, -1)
    .map(file => {
      return file.slice(0, file.length - 3)
    })
}

const sortFunc = (a, b) => +a.split('-')[0] - +b.split('-')[0]

const easyChildren = getAllMdFile('docs/solution/easy')
const mediumChildren = getAllMdFile('docs/solution/medium')
const difficultChildren = getAllMdFile('docs/solution/difficult')
easyChildren.sort(sortFunc)
mediumChildren.sort(sortFunc)
difficultChildren.sort(sortFunc)

const weekChildren = getAllMdFile('docs/week')
weekChildren.sort((a, b) => +b - +a)
weekChildren.unshift('')

module.exports = {
  base: '/',
  title: 'Cattle',
  description: '前端数据结构与算法',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href:
          'https://w3fun-1253290453.cos.ap-chengdu.myqcloud.com/cattle/meta/cattle-16.png',
      },
    ],
  ],
  theme: '@vuepress/theme-default',
  themeConfig: {
    nav: [
      { text: '从这里开始', link: '/art/' },
      { text: '周计划', link: '/week/' },
      {
        text: '题库',
        items: [
          { text: '精选', link: '/solution/top/' },
          { text: '简单', link: '/solution/easy/' },
          { text: '中等', link: '/solution/medium/' },
          { text: '困难', link: '/solution/difficult/' },
        ],
      },
      { text: 'Lodash', link: '/lodash/' },
      { text: '关于', link: '/about/' },
    ],
    sidebarDepth: 3,
    sidebar: {
      '/art/': [
        {
          title: '从这里开始',
          collapsable: false,
          children: [''],
        },
        {
          title: '数据结构（正在更新 ...）',
          collapsable: false,
          children: [
            'array',
            'string',
            'linked-list',
            'queue',
            'stack',
            'hash',
            'heap',
            'tree',
            'graph',
            'math',
            'bit-manipulation',
          ],
        },
        {
          title: '算法（正在更新 ...）',
          collapsable: false,
          children: [
            'sort',
            'binary-search',
            'greedy',
            'dynamic-programming',
            'divide-conquer',
            'back-tracking',
          ],
        },
      ],
      '/solution/easy/': [
        {
          title: '简单题索引（正在更新 ...）',
          collapsable: false,
          children: easyChildren,
        },
      ],
      '/solution/medium/': [
        {
          title: '中等题索引（正在更新 ...）',
          collapsable: false,
          children: mediumChildren,
        },
      ],
      '/solution/difficult/': [
        {
          title: '困难题索引（正在更新 ...）',
          collapsable: false,
          children: difficultChildren,
        },
      ],
      '/week/': [
        {
          title: '周计划',
          collapsable: false,
          children: weekChildren,
        },
      ],
    },
    lastUpdated: '最近更新',
    repo: 'swpuLeo/cattle',
    docs: 'gh-pages',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '帮助本站改善此页面！',
  },
  plugins: [
    '@vuepress/register-components',
    {
      componentsDir: './components',
    },
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-134130074-2',
      },
    ],
    {
      '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
          message: '网站内容更新啦 [啤酒]',
          buttonText: '立即刷新',
        },
      },
    },
  ],
  markdown: {
    extendMarkdown: md => {
      md.set({ linkify: true }), md.use(require('markdown-it-katex'))
    },
    toc: {
      includeLevel: [2, 3, 4, 5, 6],
    },
  },
}
