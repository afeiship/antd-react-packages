import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "antd-components",
    id: "antd-components",
    Svg: require("../assets/images/01.png").default,
    description: <>Antd wrapped components.</>,
  },
  {
    title: "antd-form-builder",
    id: "antd-form-builder",
    Svg: require("../assets/images/02.png").default,
    description: <>A wrapper for antd-form-builder.</>,
  },
];

function Feature({ Svg, title, id, description }) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <img src={Svg} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <footer className="text--center">
        <Link
          className="button button--secondary button--sm"
          to={useBaseUrl(`docs/${id}/01-get-started`)}
        >
          Documentation
        </Link>
      </footer>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
