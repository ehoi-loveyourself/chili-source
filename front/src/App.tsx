import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';

import RouterWrapper from './RouterWrapper';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6 * 10 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <RouterWrapper />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;