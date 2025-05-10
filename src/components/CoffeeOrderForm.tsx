// CoffeeOrderForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CoffeeOrder } from '../models/CoffeeOrder';
import coffeeImg from '../assets/coffee.png';
// import './CoffeeOrderForm.css'; // Uncomment if you have styles

interface Props {
  onSubmit: (data: CoffeeOrder) => void;
}

// Coffee configuration per type
const coffeeOptions = {
  espresso: {
    flavors: ['none', 'vanilla', 'lemon tarts', 'orange-infused chocolate'],
    sizes: ['short', 'tall'],
  },
  cappuccino: {
    flavors: ['vanilla', 'caramel', 'mocha/chocolate', 'cinnamon'],
    sizes: ['tall', 'grand'],
  },
  latte: {
    flavors: ['vanilla', 'caramel', 'hazelnut'],
    sizes: ['tall', 'grand'],
  },
  americano: {
    flavors: ['none'],
    sizes: ['short', 'tall', 'grand'],
  },
};

export const CoffeeOrderForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoffeeOrder>();

  const [selectedType, setSelectedType] = useState<keyof typeof coffeeOptions | ''>('');

  const onValid: SubmitHandler<CoffeeOrder> = (data) => {
    onSubmit(data);
    reset();
    setSelectedType(''); // Reset selected type as well
  };

  return (
    <div className="container my-4 p-4 border rounded shadow-sm bg-light">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="text-center mb-4">
          <img src={coffeeImg} alt="Coffee" style={{ maxWidth: '150px' }} />
          <h2 className="mt-3">Order Your Coffee</h2>
        </div>

        {/* Coffee Type */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <select
            id="type"
            className="form-select"
            {...register('type', {
              required: 'Please select a coffee type',
              onChange: (e) => setSelectedType(e.target.value),
            })}
          >
            <option value="">-- Select --</option>
            {Object.keys(coffeeOptions).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.type && (
            <div className="text-danger">{errors.type.message}</div>
          )}
        </div>

        {/* Flavor */}
        <div className="mb-3">
          <label htmlFor="flavor" className="form-label">Flavor:</label>
          <select
            id="flavor"
            className="form-select"
            disabled={!selectedType}
            {...register('flavor', { required: 'Please choose a flavor' })}
          >
            <option value="">-- Select --</option>
            {selectedType &&
              coffeeOptions[selectedType].flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                </option>
              ))}
          </select>
          {errors.flavor && (
            <div className="text-danger">{errors.flavor.message}</div>
          )}
        </div>

        {/* Size */}
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <select
            id="size"
            className="form-select"
            disabled={!selectedType}
            {...register('size', { required: 'Please select a size' })}
          >
            <option value="">-- Select --</option>
            {selectedType &&
              coffeeOptions[selectedType].sizes.map((size) => (
                <option key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </option>
              ))}
          </select>
          {errors.size && (
            <div className="text-danger">{errors.size.message}</div>
          )}
        </div>

        {/* Strength */}
        <div className="mb-3">
          <label htmlFor="strength" className="form-label">Strength (%):</label>
          <input
            id="strength"
            type="number"
            className="form-control"
            {...register('strength', {
              required: 'Please enter strength',
              min: { value: 0, message: 'Strength must be at least 0' },
              max: { value: 100, message: 'Strength cannot exceed 100' },
            })}
          />
          {errors.strength && (
            <div className="text-danger">{errors.strength.message}</div>
          )}
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};


// Removed duplicate declaration of CoffeeOrderForm


