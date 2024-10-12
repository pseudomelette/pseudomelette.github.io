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
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
}));

const ContentAbout = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          このサイトについて
        </Typography>
        <StyledTypographySub align='center'>
          About
        </StyledTypographySub>
        <Typography sx={{ marginBottom: 2 }}>
          サガ エメラルド ビヨンドのメカニクスを、主に解析結果に基づいて解説します。
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          メカニクスの解明とは、データ定義・処理ロジックを明らかにし、解釈することと考えます。
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          解析の観点で言えば、データ定義は比較的手軽に抽出できることが多い一方で、処理ロジックは調査難易度の高さから敬遠されることが多いです。
          サガ エメラルド ビヨンド界隈においても状況は同じで、データ定義の情報は早々に流出していても処理ロジックの情報は全くと言って良いほど出回っていません。
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          このサイトでは、データ処理ロジックの解説も試みます。
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          見当違いな解説にはなっていないはずですが、信頼するかどうかはお任せします。
        </Typography>
      </Typography>
    </Layout>
  )
}

export default ContentAbout
