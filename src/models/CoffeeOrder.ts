export interface CoffeeOrder {
  type: 'espresso' | 'cappuccino' | 'latte' | 'americano';
  flavor: 'none' | 'vanilla' | 'caramel' | 'hazelnut';
  size: 'short' | 'tall' | 'grand';
  strength: number; // 0–100
}
