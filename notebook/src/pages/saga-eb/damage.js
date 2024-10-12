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

const ContentDamage = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          ダメージ計算
        </Typography>
        <StyledTypographySub align='center'>
          Damage
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          90%解析済み。
        </Typography>
      </Typography>
    </Layout>
  )
}
  
export default ContentDamage