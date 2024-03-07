export type MyBreakPointType = "xs" | "sm" | "md" | "lg" | "xl"

export type MyBreakPointsType = {
    [key in MyBreakPointType]?: MyBreakPointType
}