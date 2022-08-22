/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Taze",
      items: ["taze/introduction", "taze/contributing"]
    },
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/create-editor"]
    }
  ]
};

module.exports = sidebars;
