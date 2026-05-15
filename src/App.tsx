import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { TaskListPage } from './pages/TaskListPage';
import { TemplateLibraryPage } from './pages/TemplateLibraryPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/templates" element={<TemplateLibraryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;