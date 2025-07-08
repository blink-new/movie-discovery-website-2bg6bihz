import { useState, useEffect } from 'react'
import { Search, Star, Clock, TrendingUp } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'

// Mock movie data
const mockMovies = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "Action",
    duration: "136 min",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    poster: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop",
    trending: true,
    popularity: 95
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    duration: "148 min",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://images.unsplash.com/photo-1489599511372-7b4bbe6ed56c?w=400&h=600&fit=crop",
    trending: true,
    popularity: 92
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: "Crime",
    duration: "154 min",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://images.unsplash.com/photo-1489599511372-7b4bbe6ed56c?w=400&h=600&fit=crop",
    trending: false,
    popularity: 89
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    duration: "152 min",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    trending: true,
    popularity: 98
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "Drama",
    duration: "142 min",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man.",
    poster: "https://images.unsplash.com/photo-1489599511372-7b4bbe6ed56c?w=400&h=600&fit=crop",
    trending: false,
    popularity: 87
  },
  {
    id: 6,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Sci-Fi",
    duration: "169 min",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop",
    trending: true,
    popularity: 91
  }
]

const genres = ["All", "Action", "Sci-Fi", "Drama", "Crime", "Comedy", "Horror", "Romance"]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [filteredMovies, setFilteredMovies] = useState(mockMovies)


  useEffect(() => {
    let filtered = mockMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
      return matchesSearch && matchesGenre
    })

    // Sort movies
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'year':
          return b.year - a.year
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return b.popularity - a.popularity
      }
    })

    setFilteredMovies(filtered)
  }, [searchTerm, selectedGenre, sortBy])

  const trendingMovies = mockMovies.filter(movie => movie.trending)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Movie<span className="text-purple-400">Hub</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Next
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Favorite Movie</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore thousands of movies, read reviews, and find your perfect match for tonight's entertainment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 border-white/20">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">
              All Movies
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-white data-[state=active]:bg-purple-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <Dialog key={movie.id}>
                  <DialogTrigger asChild>
                    <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs text-white">{movie.rating}</span>
                          </div>
                          {movie.trending && (
                            <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                              Trending
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-white mb-2">{movie.title}</CardTitle>
                        <CardDescription className="text-gray-300 mb-2">
                          {movie.genre} • {movie.year}
                        </CardDescription>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {movie.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{movie.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="flex items-center mb-4">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="text-xl font-bold">{movie.rating}</span>
                          <span className="text-gray-400 ml-2">({movie.year})</span>
                        </div>
                        <div className="flex items-center mb-4">
                          <Badge className="mr-2">{movie.genre}</Badge>
                          <span className="text-gray-400">{movie.duration}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                        <div className="mt-6">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Add to Watchlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingMovies.map(movie => (
                <Card key={movie.id} className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                        <div className="flex items-center text-white">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{movie.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {movie.description.substring(0, 100)}...
                    </p>
                    <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 MovieHub. Built with passion for cinema lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App