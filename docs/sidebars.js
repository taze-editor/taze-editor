/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Taze",
      collapsed: false,
      items: ["taze/introduction", "taze/contributing"]
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/installation",
        "getting-started/create-editor",
        "getting-started/basic-plugins",
        "getting-started/create-toolbar"
      ]
    },
    {
      type: "category",
      label: "Plugins",
      collapsed: false,
      items: [
        "plugins/introduction",
        {
          type: "category",
          label: "Basic Elements",
          collapsed: false,
          items: [
            "plugins/basic-elements/headings"
            // "plugins/basic-elements/blockquote"
          ]
        },
        {
          type: "category",
          label: "Decorators",
          collapsed: false,
          items: ["plugins/search-highlight-plugin"]
        }
      ]
    }
  ]
};

module.exports = sidebars;
