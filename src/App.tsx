import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
// import './components/Layout.css'
import Home from './pages/Home'

import Cake from './pages/Cake'
import CakeCategory from './pages/CakeCategory'

import Recipe from './pages/Recipe.tsx'
import RecipeCategory from './pages/RecipeCategory'
import Recipes from './pages/Recipes'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cakes/:categoryName/:id" element={<Cake />} />
        <Route path="/cakes/:categoryName" element={<CakeCategory />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/recipes/:categoryName" element={<RecipeCategory />} />
      </Routes>
    </Layout>
  )
}

export default App
