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
        "getting-started/basic-plugins"
      ]
    }
  ]
};

module.exports = sidebars;
