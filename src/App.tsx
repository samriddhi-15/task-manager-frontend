import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { Layout } from './components/Layout';
import { TaskPage } from './pages/TaskPage';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Layout>
          <TaskPage />
        </Layout>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
