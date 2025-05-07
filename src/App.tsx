
import { useState } from 'react';
import { CoffeeOrderForm } from './components/CoffeeOrderForm';
import { CoffeeOrder } from './models/CoffeeOrder';
import './App.css';

function App() {
  const [order, setOrder] = useState<CoffeeOrder | null>(null);

  return (
    <div className="app-container">
      <CoffeeOrderForm onSubmit={setOrder} />

      {order && (
        <div className="order-summary">
          <h3>Your Coffee Order:</h3>
          <ul>
            <li><strong>Type:</strong> {order.type}</li>
            <li><strong>Flavor:</strong> {order.flavor}</li>
            <li><strong>Size:</strong> {order.size}</li>
            <li><strong>Strength:</strong> {order.strength}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;


