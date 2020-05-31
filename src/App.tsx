import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'theme-ui'

import RestoreAuth from './auth/restore-auth/RestoreAuth'
import Routes from './routes'
import Store from './shared/store/store'
import Theme from './theme/theme'

const App: React.FC = () => (
  <Provider store={Store}>
    <ThemeProvider theme={Theme}>
      <RestoreAuth>
        <Switch>
          {Routes.map(route => (
            <Route
              className="content"
              component={route.component}
              exact={route.exact}
              key={route.id}
              path={route.path}
            />
          ))}
        </Switch>
      </RestoreAuth>
    </ThemeProvider>
  </Provider>
)

export default App
