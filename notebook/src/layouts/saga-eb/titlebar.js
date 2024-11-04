import * as React from 'react'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: `
    linear-gradient(135deg, #4eb89adf 32px, #4eb89a5f 96px, #ffffff 50%, #ffffff5f calc(100% - 96px), #ffffff 100%),
    repeating-linear-gradient(#2d8f3d5f, #2d8f3d9f 50%),
    repeating-linear-gradient(45deg, #3f87a600, #3f87a6 40px),
    repeating-linear-gradient(135deg, #4eb89a00, #4eb89a 40px),
    repeating-linear-gradient(135deg, #16314800 0px, #16314800 24px, #163148df 24px, #163148bf 40px, #16314800 56px),
    repeating-linear-gradient(45deg, #2b4a66df 0px, #2b4a66bf 16px, #2b4a6600 56px),
    repeating-linear-gradient(#44757ebf 0px, #44757ebf 50%, #44757e3f 50%, #44757e3f 100%)
  `,
  [theme.breakpoints.down('sm')]: {
    background: `
      linear-gradient(135deg, #4eb89a5f 32px, #ffffffdf 40%, #ffffff7f calc(100% - 64px), #ffffff 100%),
      repeating-linear-gradient(#2d8f3d5f, #2d8f3d9f 50%),
      repeating-linear-gradient(45deg, #3f87a600, #3f87a6 40px),
      repeating-linear-gradient(135deg, #4eb89a00, #4eb89a 40px),
      repeating-linear-gradient(135deg, #16314800 0px, #16314800 24px, #163148df 24px, #163148bf 40px, #16314800 56px),
      repeating-linear-gradient(45deg, #2b4a66df 0px, #2b4a66bf 16px, #2b4a6600 56px),
      repeating-linear-gradient(#44757ebf 0px, #44757ebf 50%, #44757e3f 50%, #44757e3f 100%)
    `,
  },
}))

export const Titlebar = () => {
  return (
    <StyledToolbar
      variant='dense'
      position='fixed'
      sx={{
        color: '#16314a',
        backgroundColor: 'white',
        minHeight: { xs: 64, sm: 48 },
        width: '100%',
      }}
    >
      <Box
        sx={{
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row'},
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
        <Typography variant='h5' component='div' sx={{ paddingLeft: 1, paddingRight: 1, width: 'fit-content', textAlign: 'center', wordBreak: 'keep-all' }}>
          サガ エメラルド ビヨンド
        </Typography>
        <Typography variant='h5' component='div' sx={{ paddingLeft: 1, paddingRight: 1, width: 'fit-content', textAlign: 'center', wordBreak: 'keep-all' }}>
          システム解説
        </Typography>
      </Box>
    </StyledToolbar>
  )
}
