import { SeriesPanel } from './components/SeriesPanel/SeriesPanel';
import { Toolbar } from './components/Toolbar/Toolbar';
import { ComicGrid } from './components/ComicGrid/ComicGrid';
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <SeriesPanel />
      <div className="main-content">
        <div className="main-header">
          <span className="app-title">[ PIXEL COMIC BUILDER ]</span>
          <Toolbar />
        </div>
        <ComicGrid />
      </div>
      <EditorSidebar />
    </div>
  );
}
