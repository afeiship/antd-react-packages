const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const env = process.env.NODE_ENV;

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Antd React Packages",
  tagline: "Everything about react and antd.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: env === "production" ? "/antd-react-packages/" : "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Documentation",
        logo: {
          alt: "My Site Logo",
          src: "https://tva1.sinaimg.cn/large/008vxvgGgy1h8gc0f5dzuj305k05k74b.jpg",
        },
        items: [
          {
            href: "https://github.com/afeiship/antd-react-packages",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: "top",
      },
    }),
};
