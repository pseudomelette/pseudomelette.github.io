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

const ContentTrade = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          トレード
        </Typography>
        <StyledTypographySub align='center'>
          Trade
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          50%解析済み。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentTrade
