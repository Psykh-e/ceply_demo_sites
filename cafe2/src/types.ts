export type CategoryId = 'all' | 'espresso' | 'cold-brew' | 'pour-over' | 'lattes' | 'bakery' | 'beans';

export interface MenuItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  price: number;
  description: string;
  notes: string[];
  origin?: string;
  strength?: number; // 1 to 5
  image: string;
  badges?: string[];
  isPopular?: boolean;
  calories?: number;
  dietary?: string[]; // e.g., ['Vegan', 'Gluten-Free', 'Dairy-Free']
}

export interface CustomDrinkOption {
  size: 'Small' | 'Medium' | 'Large';
  milk: 'Whole Milk' | 'Oat Milk (+ $0.75)' | 'Almond Milk (+ $0.75)' | 'Pistachio Milk (+ $1.00)' | 'None';
  sweetness: 'Unsweetened (0%)' | 'Light (25%)' | 'Standard (100%)' | 'Extra Sweet';
  shots: number; // 1, 2, 3
  notes?: string;
}

export interface OrderItem {
  id: string; // unique order item id
  menuItem: MenuItem;
  customization: CustomDrinkOption;
  quantity: number;
  itemTotalPrice: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  favoriteDrink: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambiance' | 'barista' | 'roastery' | 'drinks' | 'pastries';
  image: string;
  caption: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Main Bar' | 'Window Lounge' | 'Patio Garden' | 'Private Tasting Corner';
  specialRequests?: string;
}
