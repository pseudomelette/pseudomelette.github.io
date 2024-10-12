import React from "react"

import Layout from "./layout"
import {
  StyledTypographySub,
  StyledTypographyH6,
  StyledTypographyH7,
  StyledMathT,
  StyledTh,
  StyledTd,
} from "./layout"
import Typography from '@mui/material/Typography';

const ContentGlimmer = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          ひらめき
        </Typography>
        <StyledTypographySub align='center'>
          Glimmer
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          50%解析済み。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentGlimmer