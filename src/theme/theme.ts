const baseInteractiveElementStyle = {
  borderColor: 'main',
  borderStyle: 'solid',
  borderWidth: 2,
  width: '100%',
}

const baseButtonStyle = {
  ...baseInteractiveElementStyle,
  fontSize: 2,
  px: [2, 3, 4],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default {
  colors: {
    main: '#4F4F4F',
    text: '#333333',
    invertedText: '#FFFFFF',
    background: '#F2F2F2',
    backgroundDimmed: '#454545',
    backgroundOutline: '#F2F2F2',
    backgroundOutlineDimmed: '#E3E3E3',
    expense: '#BE5043',
    income: '#59B08F',
    modes: {
      dark: {
        main: '#F2F2F2',
        text: '#BDBDBD',
        invertedText: '#4F4F4F',
        background: '#4F4F4F',
        backgroundDimmed: '#D6D6D6',
        backgroundOutlineDimmed: '#454545',
        expense: '#BE5043',
        income: '#59B08F',
      },
    },
  },
  fonts: {
    body: '"Nunito Sans"',
    heading: '"Nunito Sans"',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    lighter: 200,
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
  },
  breakpoints: ['40em', '64em', '70em', '130em'],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: {
    default: 4,
    circle: 99999,
  },
  buttons: {
    anchor: {
      bg: 'transparent',
      color: 'text',
      cursor: 'pointer',
      margin: 0,
      padding: 0,
      outline: 'none',
      textDecoration: 'underline',
    },
    primary: {
      ...baseButtonStyle,
      ':hover': {
        bg: 'backgroundDimmed',
      },
      color: 'invertedText',
      bg: 'main',
    },
    outline: {
      ...baseButtonStyle,
      ':hover': {
        bg: 'backgroundOutlineDimmed',
      },
      color: 'text',
      bg: 'transparent',
    },
  },
  forms: {
    input: {
      ...baseInteractiveElementStyle,
    },
    error: {
      color: 'expense',
    },
  },
  text: {
    logo: {
      main: {
        fontSize: 48,
      },
      bigLetter: {
        fontSize: 52,
      },
    },
    heading: {
      fontFamily: 'heading',
      fontSize: [4, 5, 5],
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    inputTitle: {
      fontSize: 1,
    },
  },
  styles: {
    root: {
      bg: 'background',
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'text',
    },
  },
}
