import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '/src/assets/3.4.1'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserContextProvider from './component/contexts/UserContextProvider.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient()}>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </QueryClientProvider>
)
