type FontSizeKeys = 'xl' | 'lg' | 'md' | 'sl' | 'xs' | 'xxs'
type FontWeightKeys = 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold'
type LineHeightKeys = 'xl' | 'lg' | 'md' | 'sl' | 'xs' | 'xxs'

export const FONT_SIZE: Record<FontSizeKeys, number> = {
  xl: 24,
  lg: 18,
  md: 16,
  sl: 14,
  xs: 12,
  xxs: 10,
}

export const FONT_WEIGHT: Record<FontWeightKeys, string> = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
}

export const LINE_HEIGHT: Record<LineHeightKeys, number> = {
  xl: 32,
  lg: 24,
  md: 24,
  sl: 16,
  xs: 16,
  xxs: 12,
}