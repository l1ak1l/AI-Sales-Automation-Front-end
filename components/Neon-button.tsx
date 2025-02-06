import * as React from "react"
import { cn } from "@/lib/utils"

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, glowColor = "rgba(147, 51, 234, 0.5)", ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden transition-all hover:scale-105",
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
          style={{
            boxShadow: `0 0 20px ${glowColor}, 0 0 30px ${glowColor}, 0 0 40px ${glowColor}`,
          }}
        />
        {props.children}
      </button>
    )
  }
)
NeonButton.displayName = "NeonButton"

export { NeonButton }