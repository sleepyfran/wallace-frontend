import React from 'react'
import { Route } from 'react-router-dom'
import { ThemeProvider } from 'theme-ui'

import Routes from './routes'
import Theme from './theme/theme'

const App: React.FC = () => (
  <ThemeProvider theme={Theme}>
    {Routes.map(route => (
      <Route
        className="content"
        component={route.component}
        exact={route.exact}
        key={route.id}
        path={route.path}
      />
    ))}
  </ThemeProvider>
)

export default App
