import * as React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header
    style={{
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
    }}
  >
    <Link
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
      to='/'
    >
      {siteTitle}
    </Link>
  </header>
)

export default Header
