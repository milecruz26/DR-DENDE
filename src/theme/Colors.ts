// type ColorShadeKeys = 'deeper' | 'deep' | 'darker' | 'dark' | 'base' | 'light' | 'lighter'
// type ColorPalette = Record<ColorShadeKeys, string>
// type ColorPalettes = {
//   PRIMARY: ColorPalette
//   SECONDARY: ColorPalette
//   TERTIARY: ColorPalette
//   INFO: ColorPalette
//   SUCESS: ColorPalette
//   WARNING: ColorPalette
//   ATTENTION: ColorPalette
//   ERROR: ColorPalette
//   NEUTRAL: ColorPalette
// }
// type ColorKeys = keyof ColorPalettes
export default {
  primary: {
    deep: '#c64619',
    darker: '#e06320',
    dark: '#e67f2d',
    base: '#eca25d',
    light: '#f2c695',
    lighter: '#f9e4cc',
  },
  SECONDARY: {
    deep: '#283f2d',
    darker: '##2f4c34',
    dark: '#365d3d',
    base: '#4A824C',
    light: '#9AC49C',
    lighter: '#E0F0E2',
  },
  TERTIARY: {
    deep: '#f98d07',
    darker: '#ffb120',
    dark: '#ffc84a',
    base: '#ffde88',
    light: '#fff0c8',
    lighter: '#fffaeb',
  },
  INFO: {
    deeper: '#0042eb',
    deep: '##065dff',
    darker: '#1e7fff',
    dark: '#83c6ff',
    base: '#b5dbff',
    light: '#d6eaff',
    lighter: '#edf6ff',
  },
  SUCESS: {
    deeper: '#0C491B',
    deep: '#167E30',
    darker: '#28dc55',
    dark: '#48e06e',
    base: '#baf8c9',
    light: '#dcfce3',
    lighter: '#f0fdf2',
  },
  WARNING: {
    deeper: '#842918',
    deep: '#C12F14',
    darker: '#F8593B',
    dark: '#FF7E66',
    base: '#FFBFB3',
    light: '#FFDFD9',
    lighter: '#FFEFEC',
  },
  ATTENTION: {
    deeper: '#734704',
    deep: '#985F0A',
    darker: '#CE8D2C',
    dark: '#FFDE88',
    base: '#FFE9B0',
    light: '#FFF4D7',
    lighter: '#FFF9EB',
  },
  ERROR: {
    deeper: '#B31935',
    deep: '#FF385C',
    darker: '#FF607D',
    dark: '#FF889D',
    base: '#FFB0BE',
    light: '#FFD7DE',
    lighter: '#FFEBEF',
  },
  NEUTRAL: {
    deeper: '#191919',
    deep: '#454545',
    darker: '#636363',
    dark: '#888888',
    base: '#D1D1D1',
    light: '#E7E7E7',
    light150: '#F5F5F5',
    lighter: '#FDFDFD',
  },
};
