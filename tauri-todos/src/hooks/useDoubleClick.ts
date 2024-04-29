import { MouseEventHandler, MouseEvent, EventHandler } from 'react'

type ClickEvent = EventHandler<MouseEvent<HTMLLIElement>> | null

export function useDoubleClick(onClick: ClickEvent, onDoubleClick: ClickEvent): MouseEventHandler<HTMLLIElement> {
  let clicks: number[] = []
  let timeout: number

  return (event) => {
    clicks.push(new Date().getTime())

    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
        if (onDoubleClick) {
          onDoubleClick(event)
        }
      } else if (onClick) {
        onClick(event)
      }
      clicks = []
    }, 250)
  }
}
