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

const ContentRankup = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          技・術のランクアップ
        </Typography>
        <StyledTypographySub align='center'>
          Rank up
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          調査完了。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentRankup