import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme';

function renderWithRouter(component, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });

  return ({
    ...render(
      <Router history={ history }>
        <ThemeProvider theme={ theme }>
          {component}
        </ThemeProvider>
      </Router>,
    ),
    history,
  });
}

export default renderWithRouter;
