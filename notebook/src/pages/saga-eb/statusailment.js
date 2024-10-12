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

const ContentStatusAilment = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          状態異常
        </Typography>
        <StyledTypographySub align='center'>
          Status Ailment
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          50%解析済み。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentStatusAilment