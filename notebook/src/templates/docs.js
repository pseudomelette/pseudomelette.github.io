import * as React from 'react'
import { graphql } from 'gatsby'

import { SagaEbTemplate, SagaEbHead } from '../layouts/saga-eb/main'

export const PageTemplate = ({ data, children }) => {
  switch (data.mdx.frontmatter.slug.split('/')[1]) {
    case 'saga-eb':
    default:
      return <SagaEbTemplate data={data}>{children}</SagaEbTemplate>
  }
}

export const Head = ({ data }) => {
  switch (data.mdx.frontmatter.slug.split('/')[1]) {
    case 'saga-eb':
    default:
      return <SagaEbHead data={data} />
  }
}

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: {eq: $slug } }) {
      frontmatter {
        title
        subtitle
        slug
      }
      tableOfContents(maxDepth: 2)
    }
  }
`

export default PageTemplate
