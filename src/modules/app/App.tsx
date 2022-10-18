import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { MantineProvider } from './providers/MantineProvider';

export const App = () => {
  return (
    <ReactQueryProvider>
      <MantineProvider>
        <div>App</div>
      </MantineProvider>
    </ReactQueryProvider>
  );
};
