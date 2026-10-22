// Infinite horizontal ticker. Content is duplicated so the -50% loop is seamless.
export default function Marquee({ children, className = '', speed = 'normal', reverse = false }) {
  const duration = { slow: '70s', normal: '40s', fast: '22s' }[speed]
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="flex shrink-0 animate-marquee"
        style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
