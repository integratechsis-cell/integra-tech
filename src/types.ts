export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'perifericos' | 'suministros' | 'hardware' | 'software' | 'capacitacion';
  stock: number;
  image: string;
  specifications?: Record<string, string>;
  isActive: boolean;
  discount?: number;
  isPromotion?: boolean;
  costPrice?: number;
  profitMargin?: number;
}

export interface CartItem extends Product {
  quantity: number;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'student' | 'super_admin' | 'editor' | 'inventory' | 'marketing';
  isAuthenticated: boolean;
  createdAt?: string;
  isBanned?: boolean;
}

export interface Grade {
  userId: string;
  courseId: string;
  grade: number | null;
  feedback?: string;
  assignedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoFile?: File; // For local preview/upload simulation
  duration: string;
}

export interface Course extends Product {
  modules?: CourseModule[];
  enrolledStudents?: string[]; // Array of user IDs
}

export interface Invoice {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    idType: string;
    idNumber: string;
  };
  createdAt: string;
  invoiceNumber: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  shipping_address: any;
  created_at: string;
  payment_method: string;
  items?: any[];
}
