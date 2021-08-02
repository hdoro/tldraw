import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuIconTriggerButton } from '../shared'
import {
  DashDrawIcon,
  DashDottedIcon,
  DashSolidIcon,
  DashDashedIcon,
  StyleDropdownContent,
  StyleDropdownItem,
} from './shared'
import { DashStyle } from '../../shape'
import { useTLDrawContext } from '../../hooks'
import { Data } from '../../state'

const dashes = {
  [DashStyle.Draw]: <DashDrawIcon />,
  [DashStyle.Solid]: <DashSolidIcon />,
  [DashStyle.Dashed]: <DashDashedIcon />,
  [DashStyle.Dotted]: <DashDottedIcon />,
}

const selectDash = (data: Data) => data.appState.selectedStyle.dash

export const QuickDashSelect = React.memo((): JSX.Element => {
  const { tlstate, useAppState } = useTLDrawContext()
  const dash = useAppState(selectDash)

  const changeDashStyle = React.useCallback(
    (dash: DashStyle) => {
      tlstate.style({ dash })
    },
    [tlstate],
  )

  return (
    <DropdownMenu.Root dir="ltr">
      <DropdownMenuIconTriggerButton label="Dash">{dashes[dash]}</DropdownMenuIconTriggerButton>
      <DropdownMenu.Content sideOffset={8}>
        <DropdownMenu.DropdownMenuRadioGroup
          as={StyleDropdownContent}
          direction="vertical"
          value={dash}
          onValueChange={changeDashStyle}
        >
          {Object.keys(DashStyle).map((dashStyle: DashStyle) => (
            <DropdownMenu.DropdownMenuRadioItem
              as={StyleDropdownItem}
              key={dashStyle}
              isActive={dash === dashStyle}
              value={dashStyle}
            >
              {dashes[dashStyle]}
            </DropdownMenu.DropdownMenuRadioItem>
          ))}
        </DropdownMenu.DropdownMenuRadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
})
