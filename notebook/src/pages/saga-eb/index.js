import * as React from "react"

import Seo from "../../components/seo"
import ContentAbout from './about'

const SecondPage = () => (
  <ContentAbout />
)

export const Head = () => <Seo title="Page two" />

export default SecondPage