import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

import * as styles from '../components/index.module.css'

const links = [
  {
    text: 'SaGa Emerald Beyond',
    url: 'saga-eb',
    description:
      'サガ エメラルド ビヨンドの調査ノート',
  },
]

const IndexPage = () => (
  <Layout>
    <div className={styles.textCenter}>
      <h1>
        Welcome to Pomelette Nest!
      </h1>
    </div>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}`}
          >
            {link.text} ↗
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title='Home'/>

export default IndexPage
