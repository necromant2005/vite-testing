import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../Home';

// Mock the JSON data
vi.mock('../data/cakes/cakes.json', () => ({
  default: {
    cakes: [
      {
        id: 'chocolate-delight',
        title: 'Chocolate Delight',
        description: 'Rich chocolate cake with layers of creamy chocolate ganache and chocolate shavings',
        category: 'chocolate'
      },
      {
        id: 'vanilla-dream',
        title: 'Vanilla Dream',
        description: 'Classic vanilla sponge cake with buttercream frosting and fresh berries',
        category: 'vanilla'
      },
      {
        id: 'red-velvet',
        title: 'Red Velvet',
        description: 'Moist red velvet cake with cream cheese frosting and decorative piping',
        category: 'red-velvet'
      },
      {
        id: 'carrot-cake',
        title: 'Carrot Cake',
        description: 'Spiced carrot cake with walnuts, topped with cream cheese frosting',
        category: 'specialty'
      },
      {
        id: 'lemon-drizzle',
        title: 'Lemon Drizzle',
        description: 'Zesty lemon cake with a sweet lemon glaze and candied lemon slices',
        category: 'fruit'
      }
    ]
  }
}));

vi.mock('../data/recipes/recipes.json', () => ({
  default: {
    recipes: [
      {
        id: 'recipe1',
        title: 'Classic Chocolate Chip Cookies',
        description: 'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
        category: 'desserts'
      },
      {
        id: 'recipe2',
        title: 'Vegetable Stir Fry',
        description: "A quick and healthy vegetable stir fry that's perfect for weeknight dinners.",
        category: 'main-dishes'
      },
      {
        id: 'recipe3',
        title: 'Creamy Mushroom Pasta',
        description: 'A rich and creamy pasta dish with sautéed mushrooms and garlic.',
        category: 'main-dishes'
      },
      {
        id: 'recipe4',
        title: 'Blueberry Muffins',
        description: 'Moist and fluffy muffins bursting with fresh blueberries.',
        category: 'desserts'
      },
      {
        id: 'recipe5',
        title: 'Greek Salad',
        description: 'A refreshing Mediterranean salad with crisp vegetables and feta cheese.',
        category: 'salads'
      }
    ]
  }
}));

// Wrapper component with Router
const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  it('renders the main headings', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Our Delicious Cakes')).toBeInTheDocument();
    expect(screen.getByText('Our Tasty Recipes')).toBeInTheDocument();
  });

  it('renders the descriptions', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Discover our handcrafted selection of premium cakes')).toBeInTheDocument();
    expect(screen.getByText('Explore our collection of delicious recipes')).toBeInTheDocument();
  });

  it('renders all cake cards with correct links', () => {
    renderWithRouter(<Home />);
    
    // Check cake titles and descriptions
    expect(screen.getByText('Chocolate Delight')).toBeInTheDocument();
    expect(screen.getByText('Rich chocolate cake with layers of creamy chocolate ganache and chocolate shavings')).toBeInTheDocument();
    expect(screen.getByText('Vanilla Dream')).toBeInTheDocument();
    expect(screen.getByText('Classic vanilla sponge cake with buttercream frosting and fresh berries')).toBeInTheDocument();

    // Check cake links
    const cakeLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('/cakes/')
    );
    expect(cakeLinks).toHaveLength(5);
    expect(cakeLinks[0]).toHaveAttribute('href', '/cakes/chocolate/chocolate-delight');
    expect(cakeLinks[1]).toHaveAttribute('href', '/cakes/vanilla/vanilla-dream');
  });

  it('renders all recipe cards with correct links', () => {
    renderWithRouter(<Home />);
    
    // Check recipe titles and descriptions
    expect(screen.getByText('Classic Chocolate Chip Cookies')).toBeInTheDocument();
    expect(screen.getByText('Soft and chewy chocolate chip cookies that are perfect for any occasion.')).toBeInTheDocument();
    expect(screen.getByText('Vegetable Stir Fry')).toBeInTheDocument();
    expect(screen.getByText("A quick and healthy vegetable stir fry that's perfect for weeknight dinners.")).toBeInTheDocument();

    // Check recipe links
    const recipeLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('/recipes/')
    );
    expect(recipeLinks).toHaveLength(5);
    expect(recipeLinks[0]).toHaveAttribute('href', '/recipes/desserts/recipe1');
    expect(recipeLinks[1]).toHaveAttribute('href', '/recipes/main-dishes/recipe2');
  });

  it('applies correct styling classes', () => {
    renderWithRouter(<Home />);
    
    // Check container and grid classes
    const container = screen.getByRole('main', { hidden: true });
    expect(container).toHaveClass('container', 'py-5');
    
    // Check card styling
    const cards = screen.getAllByTestId('card');
    cards.forEach(card => {
      expect(card).toHaveClass('card', 'h-100', 'shadow-sm');
    });

    // Check link styling
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('text-decoration-none');
    });
  });
}); 