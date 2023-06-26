import { useRef, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

export default function UseLayoutEffectExample() {
  return (
    <div>
      <p>
        The puprpose of useLayoutEffect is to let your component use layout
        information for rendering:
        <ol>
          <li>Render the initial content.</li>
          <li>Measure the layout before the browser repaints the screen.</li>
          <li>
            Render the final content using the layout information you've read.
          </li>
        </ol>
      </p>
      <p>
        React guarantees that the code inside useLayoutEffect and any state
        updates scheduled inside it will be processed before the browser
        repaints the screen. This lets you render the tooltip, measure it, and
        re-render the tooltip again without the user noticing the first extra
        render. In other words, useLayoutEffect blocks the browser from
        painting.
      </p>
      <p style={{ color: 'red' }}>
        However it's not fully working. For all details see{' '}
        <a href='https://react.dev/reference/react/useLayoutEffect'>
          React docs
        </a>
        .
      </p>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  )
}

function ButtonWithTooltip({ tooltipContent, ...rest }: any) {
  const [targetRect, setTargetRect] = useState<any>(null)
  const buttonRef = useRef(null)
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = (buttonRef.current as any).getBoundingClientRect()
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          })
        }}
        onPointerLeave={() => {
          setTargetRect(null)
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
      )}
    </>
  )
}

function TooltipContainer({ children, x, y, contentRef }: any) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div
        ref={contentRef}
        className='tooltip'
      >
        {children}
      </div>
    </div>
  )
}

function Tooltip({ children, targetRect }: any) {
  const ref = useRef(null)
  const [tooltipHeight, setTooltipHeight] = useState(0)

  // This artificially slows down rendering
  let now = performance.now()
  while (performance.now() - now < 10) {
    // Do nothing for a bit...
  }

  useLayoutEffect(() => {
    const { height } = (ref.current as any).getBoundingClientRect()
    setTooltipHeight(height)
  }, [])

  let tooltipX = 0
  let tooltipY = 0
  if (targetRect !== null) {
    tooltipX = targetRect.left
    tooltipY = targetRect.top - tooltipHeight
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom
    }
  }

  return createPortal(
    <TooltipContainer
      x={tooltipX}
      y={tooltipY}
      contentRef={ref}
    >
      {children}
    </TooltipContainer>,
    document.body
  )
}
