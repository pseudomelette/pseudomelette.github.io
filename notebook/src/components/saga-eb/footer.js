import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: `calc(100dvw - 256px)` , lg: `calc(100dvw - 256px * 2)`},
        minHeight: 80,
        p: 1,
        background: '#1f3b53',
        color: '#b7b7b7',
      }}
    >
      <Typography align='center' variant='body2' sx={{ mx: 'auto' }}>
        <Box>
          © SQUARE ENIX
        </Box>
        <Box>
          記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。
        </Box>
      </Typography>
    </Box>
  )
}
