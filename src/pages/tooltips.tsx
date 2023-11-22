import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type TargetRect = {
  left: string,
  right: string,
  top: string,
  bottom: string
}
export function TooltipsContent({tooltipContent, ...rest}) {
  const [targetRect, setTargetRect] = useState<TargetRect>(null)
  const btnRef = useRef()
  return (
    <>
    <button ref={btnRef} {...rest} 
      onPointerEnter={() => {
        const rect = btnRef.current.getBoundingClientRect()
        setTargetRect({
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom
        })
      }}
      onPointerLeave={() => {
        setTargetRect(null)
      }}

    ></button>
    <Tooltips targetRect={targetRect}>{ targetRect != null ? tooltipContent: ''}</Tooltips>
    </>
  )
}

function Tooltips({children, targetRect}) {
  const [pos, setPos] = useState<TargetRect>()
  const refTooltips = useRef()
  useLayoutEffect(() => {
    if (targetRect) {
      setPos({
         ...targetRect,
        bottom: 0,
        top: targetRect.top - refTooltips.current.getBoundingClientRect().height
      })
    }
  })
  return (
    <div 
      ref={refTooltips} 
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: pos?.top,
      }}>
      {children}
    </div>
  )
}