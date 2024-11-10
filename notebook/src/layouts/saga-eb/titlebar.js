import * as React from 'react'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTheme } from '@emotion/react'

export const Titlebar = () => {
  const theme = useTheme() 
  return (
    <Toolbar
      position='fixed'
      variant='dense'
      sx={{
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
          minHeight: 48,
          background: `
            linear-gradient(135deg, #4eb89adf 32px, #4eb89a5f 96px, #ffffff 50%, #ffffff5f calc(100% - 96px), #ffffff 100%),
            repeating-linear-gradient(#2d8f3d1f, #2d8f3d9f 50%),
            repeating-linear-gradient(45deg, #3f87a600, #3f87a6 40px),
            repeating-linear-gradient(135deg, #4eb89a00, #4eb89a 40px),
            repeating-linear-gradient(135deg, #16314800 0px, #16314800 24px, #163148df 24px, #163148bf 40px, #16314800 56px),
            repeating-linear-gradient(45deg, #2b4a66df 0px, #2b4a66bf 16px, #2b4a6600 56px),
            repeating-linear-gradient(#44757ebf 0px, #44757ebf 50%, #44757e3f 50%, #44757e3f 100%)
          `,
        },
        [theme.breakpoints.down('sm')]: {
          minHeight: 64,
          background: `
            linear-gradient(135deg, #4eb89a5f 32px, #ffffffdf 40%, #ffffff7f calc(100% - 64px), #ffffff 100%),
            repeating-linear-gradient(#2d8f3d1f, #2d8f3d9f 50%),
            repeating-linear-gradient(45deg, #3f87a600, #3f87a6 40px),
            repeating-linear-gradient(135deg, #4eb89a00, #4eb89a 40px),
            repeating-linear-gradient(135deg, #16314800 0px, #16314800 24px, #163148df 24px, #163148bf 40px, #16314800 56px),
            repeating-linear-gradient(45deg, #2b4a66df 0px, #2b4a66bf 16px, #2b4a6600 56px),
            repeating-linear-gradient(#44757ebf 0px, #44757ebf 50%, #44757e3f 50%, #44757e3f 100%)
          `,
        },
      }}
    >
      <Typography
        component='div'
        variant='h5'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row'},
          color: '#16314a',
          textAlign: 'center',
          wordBreak: 'keep-all'
        }}
      >
        <Box sx={{ px: 1 }}>
          サガ エメラルド ビヨンド
        </Box>
        <Box sx={{ px: 1 }}>
          システム解説
        </Box>
      </Typography>
    </Toolbar>
  )
}
