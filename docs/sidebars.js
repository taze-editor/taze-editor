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
        "plugins/customization",
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
          items: ["plugins/decorators/search-highlight-plugin"]
        }
      ]
    },
    {
      type: "category",
      label: "Components",
      collapsed: false,
      items: ["components/balloon-toolbar"]
    },
    {
      type: "html",
      value: `<div class='taze-docs-mt-sidebar-custom-link theme-doc-sidebar-item-category theme-doc-sidebar-item-level-1 menu__list-item menu__link'>
              Drag & Drop <button class='taze-docs-sidebar-soon-button'>soon</button>
              </div>`
    },
    {
      type: "html",
      value: `<div class='taze-docs-mt-sidebar-custom-link theme-doc-sidebar-item-category theme-doc-sidebar-item-level-1 menu__list-item menu__link'>
              Media Embeds <button class='taze-docs-sidebar-soon-button'>soon</button>
              </div>`
    }
  ]
};

module.exports = sidebars;
