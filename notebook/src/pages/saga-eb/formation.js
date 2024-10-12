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

const ContentFormation = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          陣形効果
        </Typography>
        <StyledTypographySub align='center'>
          Formation
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          未調査。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentFormation