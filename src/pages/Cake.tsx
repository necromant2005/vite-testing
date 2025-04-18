import { useParams } from 'react-router-dom'
import cakesData from '../data/cakes/cakes.json'
import type { Cake } from '../types/Cake'

const Cake = () => {
  const { id } = useParams()
  const cake = cakesData.cakes.find((cake: Cake) => cake.id === id)

  if (!cake) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h2 className="h4">Cake not found</h2>
          <p className="mb-0">Sorry, we couldn't find the cake you're looking for.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h3 mb-4">{cake.title}</h2>
          <p className="card-text text-muted">{cake.description}</p>
          <h5>{cake.category}</h5>
        </div>
      </div>
    </div>
  )
}

export default Cake 