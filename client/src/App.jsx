import { AuthContextProvider } from '../context/AuthContextProvider';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  )
}

export default App;
