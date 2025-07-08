import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'

// Mock recipe data
const mockRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    description: "Classic Italian pasta with eggs, cheese, pancetta, and pepper.",
    ingredients: ["spaghetti", "eggs", "cheese", "pancetta", "pepper"],
    instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all with pepper.",
    image: "https://images.unsplash.com/photo-1604908177522-1a1a7a7a7a7a?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Chicken Tacos",
    cuisine: "Mexican",
    mealType: "Lunch",
    description: "Soft tortillas filled with spicy chicken, salsa, and fresh veggies.",
    ingredients: ["chicken", "tortillas", "salsa", "lettuce", "tomato"],
    instructions: "Cook chicken with spices. Warm tortillas. Assemble with salsa and veggies.",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Avocado Toast",
    cuisine: "American",
    mealType: "Breakfast",
    description: "Toasted bread topped with mashed avocado, salt, pepper, and lemon.",
    ingredients: ["bread", "avocado", "salt", "pepper", "lemon"],
    instructions: "Toast bread. Mash avocado with salt, pepper, lemon. Spread on toast.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Sushi Platter",
    cuisine: "Japanese",
    mealType: "Dinner",
    description: "Assorted sushi rolls with fresh fish, rice, and seaweed.",
    ingredients: ["rice", "fish", "seaweed", "soy sauce", "wasabi"],
    instructions: "Prepare sushi rice. Slice fish. Roll with seaweed. Serve with soy sauce and wasabi.",
    image: "https://images.unsplash.com/photo-1562158070-1a1a7a7a7a7a?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Pancakes",
    cuisine: "American",
    mealType: "Breakfast",
    description: "Fluffy pancakes served with syrup and butter.",
    ingredients: ["flour", "milk", "eggs", "syrup", "butter"],
    instructions: "Mix ingredients. Cook on griddle. Serve with syrup and butter.",
    image: "https://images.unsplash.com/photo-1505253210343-1a1a7a7a7a7a?w=400&h=300&fit=crop"
  }
]

const cuisines = ["All", "Italian", "Mexican", "American", "Japanese"]
const mealTypes = ["All", "Breakfast", "Lunch", "Dinner"]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedMealType, setSelectedMealType] = useState('All')
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes)

  useEffect(() => {
    const filtered = mockRecipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine
      const matchesMealType = selectedMealType === 'All' || recipe.mealType === selectedMealType
      return matchesSearch && matchesCuisine && matchesMealType
    })
    setFilteredRecipes(filtered)
  }, [searchTerm, selectedCuisine, selectedMealType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">
              Recipe<span className="text-green-400">Finder</span>
            </h1>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-green-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap gap-4">
        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisines.map(cuisine => (
              <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMealType} onValueChange={setSelectedMealType}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Meal Type" />
          </SelectTrigger>
          <SelectContent>
            {mealTypes.map(meal => (
              <SelectItem key={meal} value={meal}>{meal}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <Dialog key={recipe.id}>
              <DialogTrigger asChild>
                <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardContent className="p-4">
                    <CardTitle className="text-white mb-1">{recipe.title}</CardTitle>
                    <CardDescription className="text-gray-300 mb-2">
                      {recipe.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-600 text-white">{recipe.cuisine}</Badge>
                      <Badge className="bg-green-800 text-white">{recipe.mealType}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="bg-green-900 border-green-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">{recipe.title}</DialogTitle>
                </DialogHeader>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside mb-4">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <p className="whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Add to Favorites
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 RecipeFinder. Made with love for foodies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
