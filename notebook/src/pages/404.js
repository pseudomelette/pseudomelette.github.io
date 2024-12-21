import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

import * as styles from '../components/index.module.css'

const NotFoundPage = () => (
  <Layout>
    <div
      className={styles.textCenter}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>404: Not Found</h1>
      <p>Curiosity as well as care killed the cat.</p>
    </div>
  </Layout>
)

export const Head = () => <Seo title='404: Not Found'/>

export default NotFoundPage
