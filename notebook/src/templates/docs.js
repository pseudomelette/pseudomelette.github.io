import * as React from 'react'
import { graphql } from 'gatsby'

import { SagaEbTemplate, SagaEbHead } from '../layouts/saga-eb/main'

export const PageTemplate = ({ data, children, pageContext }) => {
  switch (pageContext.layout) {
    case 'saga-eb':
      return <SagaEbTemplate data={data}>{children}</SagaEbTemplate>
    default:
      return <>{children}</>
  }
}

export const Head = ({ data, pageContext }) => {
  switch (pageContext.layout) {
    case 'saga-eb':
      return <SagaEbHead data={data} />
    default:
      return <></>
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
