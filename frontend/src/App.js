import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> {/*By putting this outside routes it means it will be displayed on everypage */}
        <div className="pages">
          <Routes> {/* We define our applicaiton routes */}
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; // finally we export the App component so it can be used in other parts of our application
