import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Admonition from "@theme/Admonition";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs">
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <div className="taze-docs-flex-center taze-docs-container-md taze-docs-mx-auto taze-docs-my-md">
        <Admonition type="caution" icon="🚧" title="Caution">
          This project is under active development and some of the APIs may
          change.
        </Admonition>
      </div>
    </Layout>
  );
}
