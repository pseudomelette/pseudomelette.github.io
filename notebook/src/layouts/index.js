import * as React from 'react'

import { SagaEBLayout } from '../components/saga-eb/layout'

const layout = ({ children, pageContext }) => {
  if (pageContext.layout === 'saga-eb') {
    return <SagaEBLayout>{children}</SagaEBLayout>
  }
  return <>{children}</>
}

export default layout