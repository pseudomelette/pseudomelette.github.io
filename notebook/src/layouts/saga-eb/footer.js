import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const drawerWidth = 256

export const Footer = ({ width }) => {
  return (
    <Box
      sx={{
        width: { xs: '100vw', md: `calc(100vw - ${drawerWidth}px)` , lg: `calc(100vw - ${drawerWidth}px * 2)`},
        minHeight: 80,
        background: `
          linear-gradient(to bottom, #163148bf 0%, #2b4a66 100%),
          repeating-linear-gradient(135deg, #163148 0px, #163148 4px, #2b4a66 4px, #2b4a66 8px)
        `,
        color: '#bfbfbf',
      }}
    >
      <Box sx={{ height:4, borderTop: 1, borderBottom: 1, background: '#163148' }} />
      <Typography variant='body2' align='center' sx={{ mx:'auto' }}>
        <Box sx={{ mt: 1 }}>
          © SQUARE ENIX<br/>
        </Box>
        <Box>
          記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。
        </Box>
      </Typography>
    </Box>
  )
}