const baseButtonStyle = {
  borderColor: 'main',
  borderStyle: 'solid',
  borderWidth: 2,
  fontSize: 2,
  px: [2, 3, 4],
  width: '100%',
}

const baseButtonHoverStyle = {
  bg: 'backgroundDimmed',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default {
  colors: {
    main: '#4F4F4F',
    text: '#333333',
    invertedText: '#FFFFFF',
    background: '#F2F2F2',
    backgroundDimmed: '#BDBDBD',
    expense: '#BE5043',
    income: '#59B08F',
    modes: {
      dark: {
        main: '#F2F2F2',
        text: '#BDBDBD',
        invertedText: '#4F4F4F',
        background: '#4F4F4F',
        backgroundDimmed: '#BDBDBD',
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
  breakpoints: ['40em', '64em', '78em'],
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
    primary: {
      ...baseButtonStyle,
      ':hover': {
        ...baseButtonHoverStyle,
      },
      color: 'invertedText',
      bg: 'main',
    },
    outline: {
      ...baseButtonStyle,
      ':hover': {
        ...baseButtonHoverStyle,
        color: 'invertedText',
      },
      color: 'text',
      bg: 'transparent',
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
      color: 'text',
      fontFamily: 'heading',
      fontSize: [4, 5, 5],
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  },
  styles: {
    root: {
      bg: 'background',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'text',
    },
  },
}
