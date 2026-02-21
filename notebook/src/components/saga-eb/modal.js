import * as React from 'react'

import ExpandMore from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Modal from '@mui/material/Modal'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import 'overlayscrollbars/overlayscrollbars.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

export const ColumnModal = ({columnMap, state, onApply, onClose, open}) => {
  const theme = useTheme()
  const [localState, setLocalState] = React.useState(state)
  const [observed, setObserved] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)

  const allSelected = () => (
    localState.length === columnMap.size
  )
  const noneSelected = () => (
    localState.length === 0
  )
  const indeterminate = () => (
    !allSelected() && !noneSelected()
  )

  const handleToggle = (column) => (
    setLocalState(prev => (
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    ))
  )
  const handleToggleAll = () => (
    setLocalState(
      allSelected() ? [...columnMap.keys()].filter(column => columnMap.get(column).mandatory) : [...columnMap.keys()]
    )
  )

  const handleApply = () => {
    onApply(localState)
    onClose()
  }

  const handleClose = (event, reason) => {
    if ( reason !== 'backdropClick') {
      onClose()
    }
  }

  React.useEffect(() => {
    if (open) {
      const stop = (e) => {
        const modal = document.getElementById('columnModal')
        if (!modal || !modal.contains(e.target)) {
          e.preventDefault()
        }
      }

      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.addEventListener('wheel', stop, { passive: false })
      document.addEventListener('touchmove', stop, { passive: false })
      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.removeEventListener('wheel', stop)
        document.removeEventListener('touchmove', stop)
      }
    }
  }, [open])

  React.useEffect(() => {
    if (!initialized) {
      setObserved(!observed)
      if (document.getElementById('columnModal') !== null) {
        OverlayScrollbars(document.getElementById('columnModal'), {
          scrollbars: {
            theme: 'os-theme-dark os-theme-modal',
            clickScroll: true,
          },
        })
        setInitialized(true)
      }
    }
  }, [initialized, observed])

  return (
    <Modal
      disableEscapeKeyDown
      onClose={handleClose}
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            background: '#0000009f',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          color: '#ffffff',
          '&:focus-visible': {
            outline: 'none',
          },
        }}
      >
        <Box sx={{ justifyContent: 'center', pb: 2 }}>
          <Typography
            align='center'
            variant='h6'
            sx={{
              width: '304px',
              height: '36px',
              background: 'linear-gradient(to right, #39648000 0%, #396480 20%, #396480 80%, #39648000 100%)',
              color: '#ffffff',
              lineHeight: '36px',
            }}
          >
            表示カラム設定
          </Typography>
        </Box>
        <Box
          id='columnModal'
          sx={{
            zIndex: theme.zIndex.modal,
            width: '304px',
            overflow: 'hidden',
            overscrollBehavior: 'contain',
            borderRadius: '4px',
          }}
        >
        <Accordion expanded disableGutters onChange={() => {}}>
          <AccordionSummary
            expandIcon={null}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: theme.zIndex.modal + 1,
              paddingLeft: '8px',
              background: '#cccccc',
              '&.MuiButtonBase-root': {
                minHeight: '40px',
                cursor: 'default !important',
              },
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                justifyContent: 'space-between',
                my: 0,
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={allSelected()}
                  indeterminate={indeterminate()}
                  onChange={() => handleToggleAll()}
                  sx={{
                    color: '#163148',
                    cursor: 'pointer',
                    '&.Mui-checked': { color: '#163148' },
                    '&.MuiCheckbox-indeterminate': { color: '#163148' },
                  }}
                />
              }
              label='データ系列'
              sx={{
                padding: '4px 6px',
                borderRadius: '4px',
                background: '#cccccc',
                color: '#163148',
                '&:hover': {
                  filter: 'brightness(1.1)',
                },
              }}
            />
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: '1fr auto 1fr',
                marginLeft: '10px',
                width: '48px',
                textAlign: 'center',
                color: '#163148',
              }}
            >
              <Box>{localState.length}</Box>
              <Box>/</Box>
              <Box>{columnMap.size}</Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ background: '#526f92', color: '#ffffff' }}>
            <FormGroup>
              {[...columnMap.keys()].map((column, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={localState.includes(column)}
                      disabled={columnMap.get(column).mandatory}
                      id={column}
                      onChange={() => handleToggle(column)}
                      sx={{
                        color: '#ffffff',
                        '&.Mui-checked': {
                          color: '#ffffff',
                        },
                        '&.Mui-disabled': {
                          color: '#ffffff5f',
                        },
                      }}
                    />
                  }
                  key={index}
                  label={column}
                  sx={{
                    width: 'fit-content',
                    marginY: '2px',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    background: '#526f92',
                    '&:not(.Mui-disabled):hover': {
                      filter: 'brightness(1.1)',
                    },
                    '& .MuiFormControlLabel-label.Mui-disabled': {
                      color: '#ffffff5f',
                    },
                  }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            zIndex: theme.zIndex.modal - 1,
            pt: 2,
          }}
        >
          <Box
            sx={{
              width: '104px',
              mx: 2,
              filter: `
                drop-shadow(0px 5px 5px #00000033)
                drop-shadow(0px 8px 10px #00000024)
                drop-shadow(0px 3px 14px #0000001f)
              `,
            }}
          >
            <Box
              sx={{
                clipPath: 'polygon(18px 0px, 86px 0px, 104px 18px, 86px 36px, 18px 36px, 0px 18px)',
                height: '36px',
                padding: '1px',
                background: '#f8d36f',
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  clipPath: 'polygon(18px 0px, 84px 0px, 101px 17px, 84px 34px, 18px 34px, 1px 17px)',
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(to bottom, #805f922f 30%, #ab84c22f 70%),
                    linear-gradient(to bottom, #2b4a66)
                  `,
                  color: '#ffffff',
                  '&:hover': {
                    filter: 'brightness(1.2)',
                  },
                }}
              >
                キャンセル
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '104px',
              mx: 2,
              filter: `
                drop-shadow(0px 5px 5px #00000033)
                drop-shadow(0px 8px 10px #00000024)
                drop-shadow(0px 3px 14px #0000001f)
              `,
            }}
          >
            <Box
              sx={{
                clipPath: 'polygon(18px 0px, 86px 0px, 104px 18px, 86px 36px, 18px 36px, 0px 18px)',
                height: '36px',
                padding: '1px',
                background: '#f8d36f',
              }}
            >
              <Button
                onClick={handleApply}
                sx={{
                  clipPath: 'polygon(18px 0px, 84px 0px, 101px 17px, 84px 34px, 18px 34px, 1px 17px)',
                  width: '100%',
                  height: '100%',
                  background: `
                  linear-gradient(to bottom, #805f92cf 30%, #ab84c2cf 70%),
                  linear-gradient(to bottom, #2b4a66)
                  `,
                  color: '#ffffff',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  },
                }}
              >
                適用
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export const FilterModal = ({columnMap, stateMap, onApply, onClose, open}) => {
  const theme = useTheme()
  const [localStateMap, setLocalStateMap] = React.useState(stateMap)
  const [observed, setObserved] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)

  const allSelected = (column) => (
    localStateMap.get(column).length === columnMap.get(column).values.length
  )
  const noneSelected = (column) => (
    localStateMap.get(column).length === 0
  )
  const indeterminate = (column) => (
    !allSelected(column) && !noneSelected(column)
  )

  const handleToggle = (column, value) => (
    setLocalStateMap(prev => {
      const next = new Map(prev)
      return next.set(column, prev.get(column).includes(value) ? prev.get(column).filter(v => v !== value) : [...prev.get(column), value])
    })
  )
  const handleToggleAll = (column) => (
    setLocalStateMap(prev => {
      const next = new Map(prev)
      return next.set(column, allSelected(column) ? [] : columnMap.get(column).values)
    })
  )

  const handleApply = () => {
    onApply(localStateMap)
    onClose()
  }

  const handleClose = (event, reason) => {
    if ( reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose()
    }
  }

  const expandedRef = React.useRef(null)

  if (!initialized) {
    expandedRef.current = new Map(columnMap.keys().map(column => [column, !allSelected(column) && !noneSelected(column)]))
  }

  React.useEffect(() => {
    if (open) {
      const stop = (e) => {
        const modal = document.getElementById('filterModal')
        if (!modal || !modal.contains(e.target)) {
          e.preventDefault()
        }
      }

      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.addEventListener('wheel', stop, { passive: false })
      document.addEventListener('touchmove', stop, { passive: false })
      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.removeEventListener('wheel', stop)
        document.removeEventListener('touchmove', stop)
      }
    }
  }, [open])

  React.useEffect(() => {
    if (!initialized) {
      setObserved(!observed)
      if (document.getElementById('filterModal') !== null) {
        OverlayScrollbars(document.getElementById('filterModal'), {
          overflow: {
            x: 'hidden',
            y: 'scroll',
          },
          scrollbars: {
            theme: 'os-theme-dark os-theme-modal',
            clickScroll: true,
          },
        })
        setInitialized(true)
      }
    }
  }, [initialized, observed])

  return (
    <Modal
      disableEscapeKeyDown
      onClose={handleClose}
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: '#0000009f',
          },
        },
        root: {
          sx: {
            outline: 'none',
            '&:focus-visible': {
              outline: 'none',
            },
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          color: '#ffffff',
          '&:focus-visible': {
            outline: 'none',
          },
        }}
      >
        <Box sx={{ justifyContent: 'center', pb: 2 }}>
          <Typography
            align='center'
            variant='h6'
            sx={{
              width: '304px',
              height: '36px',
              background: 'linear-gradient(to right, #39648000 0%, #396480 20%, #396480 80%, #39648000 100%)',
              color: '#ffffff',
              lineHeight: '36px',
            }}
          >
            フィルタ設定
          </Typography>
        </Box>
        <Box
          id='filterModal'
          sx={{
            zIndex: theme.zIndex.modal,
            width: '304px',
            overflow: 'hidden',
            overscrollBehavior: 'contain',
            borderRadius: '4px',
          }}
        >
        {[...columnMap.keys()].map((column, index) => (
          <Accordion defaultExpanded={expandedRef.current?.get(column)} disableGutters key={index}>
            <AccordionSummary
              expandIcon={<ExpandMore/>}
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: theme.zIndex.modal + 1,
                paddingLeft: '8px',
                background: '#cccccc',
                '&:hover': {
                  filter: 'brightness(1.1)',
                },
                '&:has(.MuiFormControlLabel-root:hover)': {
                  filter: 'brightness(1)',
                },
                '&.Mui-focusVisible': {
                  background: '#cccccc',
                },
                '&.MuiButtonBase-root': {
                  minHeight: '40px',
                },
                '& .MuiAccordionSummary-content': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  my: 0,
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allSelected(column)}
                    indeterminate={indeterminate(column)}
                    onChange={() => handleToggleAll(column)}
                    sx={{
                      color: '#163148',
                      '&.Mui-checked': { color: '#163148' },
                      '&.MuiCheckbox-indeterminate': { color: '#163148' },
                    }}
                  />
                }
                label={columnMap.get(column).label}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                sx={{
                  padding: '4px 6px',
                  borderRadius: '4px',
                  background: '#cccccc',
                  color: '#163148',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  },
                }}
              />
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  gridTemplateColumns: '1fr auto 1fr',
                  marginRight: '10px',
                  width: '48px',
                  textAlign: 'center',
                  color: '#163148',
                }}
              >
                <Box>{localStateMap.get(column).length}</Box>
                <Box>/</Box>
                <Box>{columnMap.get(column).values.length}</Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ background: '#526f92', color: '#ffffff' }}>
              <FormGroup>
                {columnMap.get(column).values.map((value, subindex) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localStateMap.get(column).includes(value)}
                        id={value}
                        onChange={() => handleToggle(column, value)}
                        sx={{ color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }}
                      />
                    }
                    key={subindex}
                    label={value}
                    sx={{
                      width: 'fit-content',
                      marginY: '2px',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      background: '#526f92',
                      '&:hover': {
                        filter: 'brightness(1.1)',
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            zIndex: theme.zIndex.modal - 1,
            pt: 2,
          }}
        >
          <Box
            sx={{
              width: '104px',
              mx: 2,
              filter: `
                drop-shadow(0px 5px 5px #00000033)
                drop-shadow(0px 8px 10px #00000024)
                drop-shadow(0px 3px 14px #0000001f)
              `,
            }}
          >
            <Box
              sx={{
                clipPath: 'polygon(18px 0px, 86px 0px, 104px 18px, 86px 36px, 18px 36px, 0px 18px)',
                height: '36px',
                padding: '1px',
                background: '#f8d36f',
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  clipPath: 'polygon(18px 0px, 84px 0px, 101px 17px, 84px 34px, 18px 34px, 1px 17px)',
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(to bottom, #805f922f 30%, #ab84c22f 70%),
                    linear-gradient(to bottom, #2b4a66)
                  `,
                  color: '#ffffff',
                  '&:hover': {
                    filter: 'brightness(1.2)',
                  },
                }}
              >
                キャンセル
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '104px',
              mx: 2,
              filter: `
                drop-shadow(0px 5px 5px #00000033)
                drop-shadow(0px 8px 10px #00000024)
                drop-shadow(0px 3px 14px #0000001f)
              `,
            }}
          >
            <Box
              sx={{
                clipPath: 'polygon(18px 0px, 86px 0px, 104px 18px, 86px 36px, 18px 36px, 0px 18px)',
                height: '36px',
                padding: '1px',
                background: '#f8d36f',
              }}
            >
              <Button
                onClick={handleApply}
                sx={{
                  clipPath: 'polygon(18px 0px, 84px 0px, 101px 17px, 84px 34px, 18px 34px, 1px 17px)',
                  width: '100%',
                  height: '100%',
                  background: `
                  linear-gradient(to bottom, #805f92cf 30%, #ab84c2cf 70%),
                  linear-gradient(to bottom, #2b4a66)
                  `,
                  color: '#ffffff',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  },
                }}
              >
                適用
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
