import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import 'overlayscrollbars/overlayscrollbars.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '212px',
  translate: '-50% -50%',
  overflow: 'hidden',
  overscrollBehavior: 'none',
  color: '#ffffff',
  background: '#526f92',
  boxShadow: 24,
}))

export const FilterModal = ({column, label, onApply, onClose, selectedValues, valueGroups}) => {
  const [localSelectedValues, setLocalSelectedValues] = React.useState(selectedValues)
  const [observed, setObserved] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)

  const allSelected = localSelectedValues.length === valueGroups[column].length
  const noneSelected = localSelectedValues.length === 0
  const indeterminate = !allSelected && !noneSelected

  const handleToggle = (selectedValue) => {
    setLocalSelectedValues(prev => prev.includes(selectedValue) ? prev.filter(value => value !== selectedValue) : [...prev, selectedValue])
  }

  const handleToggleAll = () => {
    setLocalSelectedValues(allSelected ? [] : valueGroups[column])
  }

  React.useEffect(() => {
    if (!initialized) {
      setObserved(!observed)
      if (document.querySelector('.modal-form') !== null) {
        OverlayScrollbars(document.querySelector('.modal-form'), {
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
    <Modal open onClose={onClose}>
      <StyledBox>
        <FormGroup
          sx={{
            py: 1,
            pl: 2,
            borderWidth: '2px 2px 0px 2px',
            borderStyle: 'solid',
            borderColor: '#2b4a66',
            background: '#cccccc',
            color: '#163148',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={handleToggleAll}
                sx={{color: '#163148', '&.Mui-checked': { color: '#163148' }, '&.MuiCheckbox-indeterminate': { color: '#163148'} }}
              />
            }
            label={label}
          />
        </FormGroup>
        <Box className='modal-form' sx={{ overflow: 'scroll', overscrollBehavior: 'none', border: '2px solid', borderColor: '#2b4a66' }}>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              px: 2,
              py: 1,
              height: '50vh'
            }}
          >
            {valueGroups[column].map((value, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localSelectedValues.includes(value)}
                    id={value}
                    onChange={() => handleToggle(value)}
                    sx={{ py: 1, color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }}
                  />
                }
                key={index}
                label={value}
                sx={{ pr: 2 }}
              />
            ))}
          </FormGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1, background: '#1f3b53' }}>
          <Button
            onClick={onClose}
            sx={{
              width: 90,
              border: '1px solid',
              borderColor: '#f8d36f',
              boxShadow: 8,
              color: '#ffffff',
              background: 'linear-gradient(to bottom, #805f9200 0%, #ab84c200 100%)',
              '&:hover': {
                background: 'linear-gradient(to bottom, #805f924f 0%, #ab84c24f 100%)',
              },
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={() => onApply(column, localSelectedValues)}
            sx={{
              width: 90,
              border: '1px solid',
              borderColor: '#f8d36f',
              boxShadow: 8,
              color: '#ffffff',
              background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
              '&:hover': {
                background: 'linear-gradient(to bottom, #805f92 0%, #ab84c2 100%)',
              },
            }}
          >
            OK
          </Button>
        </Box>
      </StyledBox>
    </Modal>
  )
}
