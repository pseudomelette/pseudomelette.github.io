import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import {
	StyledTd,
	StyledTh,
} from './layout'

import 'overlayscrollbars/overlayscrollbars.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '1px solid',
  borderColor: '#1f3b53',
  color: '#ffffff',
  background: '#526f92',
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '80vw',
  maxHeight: `calc(80vh - 59px)`,
  color: '#ffffff',
  background: '#526f92',
}))

export const FilterModal = ({columns, filterValues, filterState, onApply, onClose, open}) => {
  const leafColumns = columns.flatMap(parent => parent.children.length === 0 ? [parent] : parent.children)

  const [localFilterState, setLocalFilterState] = React.useState(filterState)
  const [observed, setObserved] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)

  const allSelected = (column) => {
    return localFilterState[column].length === filterValues[column].length
  }
  const noneSelected = (column) => {
    return localFilterState[column].length === 0
  }
  const indeterminate = (column) => {
    return !allSelected(column) && !noneSelected(column)
  }

  const handleToggle = (column, value) => {
    setLocalFilterState(prev => ({
      ...prev,
      [column]: prev[column].includes(value) ? prev[column].filter(v => v !== value) : [...prev[column], value]
    }))
  }
  const handleToggleAll = (column) => {
    setLocalFilterState(prev => ({
      ...prev,
      [column]: allSelected(column) ? [] : filterValues[column]
    }))
  }

  const handleApply = () => {
    onApply(localFilterState)
    onClose()
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
    <Modal open={open} onClose={onClose} slotProps={{ backdrop: { sx: { backgroundColor: '#0000009f' } } }}>
      <StyledBox>
        <StyledTableContainer className='modal-form' sx={{ width: `calc(${leafColumns.map(Column => Column.width).join(' + ')})`, minWidth: `min(300px, calc(${leafColumns.map(Column => Column.width).join(' + ')}))` }}>
          <Table stickyHeader sx={{ width: `calc(${leafColumns.map(Column => Column.width).join(' + ')})` }}>
            <TableHead
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 3,
                '&::before': {
                  position: 'absolute',
                  top: '-1px',
                  width: '100%',
                  height: '1px',
                  background: '#1f3b53',
                  content: '""',
                }
              }}
            >
              <TableRow>
                {columns.map((parent, index) => {
                  if (parent.children.length === 0) {
                    return (
                      <StyledTh key={index} rowSpan={2} sx={{ width: parent.width }}>
                        <FormGroup sx={{ background: '#cccccc', color: '#163148' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={allSelected(parent.key)}
                                indeterminate={indeterminate(parent.key)}
                                onChange={() => handleToggleAll(parent.key)}
                                sx={{
                                  color: '#163148',
                                  '&.Mui-checked': { color: '#163148' },
                                  '&.MuiCheckbox-indeterminate': { color: '#163148'},
                                }}
                              />
                            }
                            label={parent.label}
                          />
                        </FormGroup>
                      </StyledTh>                  
                    )
                  } else {
                    return (
                      <StyledTh align='center' key={index} colSpan={parent.children.length} sx={{ fontSize: '0.8rem' }}>
                        {parent.label}
                      </StyledTh>
                    )
                  }
                })}
              </TableRow>
              <TableRow>
                {columns.flatMap(parent => {
                  if (parent.children.length === 0) {
                    return []
                  } else {
                    return (
                      parent.children.map((child, index) => (
                        <StyledTh key={index} sx={{ width: child.width }}>
                          <FormGroup sx={{ background: '#cccccc', color: '#163148' }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allSelected(child.key)}
                                  indeterminate={indeterminate(child.key)}
                                  onChange={() => handleToggleAll(child.key)}
                                  sx={{
                                    color: '#163148',
                                    '&.Mui-checked': { color: '#163148' },
                                    '&.MuiCheckbox-indeterminate': { color: '#163148'},
                                  }}
                                />
                              }
                              label={child.label}
                            />
                          </FormGroup>
                        </StyledTh>
                      ))
                    )
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {leafColumns.map(column => (
                  <StyledTd key={column.key} sx={{ overflow: 'scroll', overscrollBehavior: 'none', verticalAlign: 'top' }}>
                    <FormGroup>
                      {filterValues[column.key].map((value, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={localFilterState[column.key].includes(value)}
                              id={value}
                              onChange={() => handleToggle(column.key, value)}
                              sx={{ color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }}
                            />
                          }
                          key={index}
                          label={value}
                          sx={{ marginY: '4px', paddingY: '2px' }}
                        />
                      ))}
                    </FormGroup>
                  </StyledTd>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingY: '12px', background: '#1f3b53' }}>
          <Button
            onClick={onClose}
            sx={{
              width: 90,
              border: '1px solid',
              borderColor: '#f8d36f',
              boxShadow: 8,
              background: 'linear-gradient(to bottom, #805f9200 0%, #ab84c200 100%)',
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(to bottom, #805f924f 0%, #ab84c24f 100%)',
              },
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleApply}
            sx={{
              width: 90,
              border: '1px solid',
              borderColor: '#f8d36f',
              boxShadow: 8,
              background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
              color: '#ffffff',
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
