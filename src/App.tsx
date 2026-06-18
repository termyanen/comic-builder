import { Toolbar } from './components/Toolbar/Toolbar';
import { ComicGrid } from './components/ComicGrid/ComicGrid';
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <h1>[ PIXEL COMIC BUILDER ]</h1>
      <Toolbar />
      <ComicGrid />
      <EditorSidebar />
    </div>
  );
}
