import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { Product, Course, User, Grade, Invoice } from '../types';
import { courses as staticCourses } from '../data/courses'; // Import static courses
import { products as staticProducts } from '../data/products'; // Import static products
import toast from 'react-hot-toast';

interface DataContextType {
  products: Product[];
  courses: Course[];
  users: User[];
  grades: Grade[];
  orders: any[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  updateUserRole: (userId: string, role: 'admin' | 'user' | 'student') => Promise<void>;
  assignGrade: (grade: Grade) => Promise<void>;
  createOrder: (order: Invoice, userId: string | undefined) => Promise<void>;
  createStudent: (email: string, password: string, name: string, role?: string) => Promise<void>;
  enrollUserInCourse: (userId: string, courseId: string) => Promise<void>;
  unenrollUserFromCourse: (userId: string, courseId: string) => Promise<void>;
  toggleUserStatus: (userId: string, isBanned: boolean) => Promise<void>;
  resetUserPassword: (userId: string, newPassword: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const refreshData = async () => {
    await Promise.all([
      fetchProducts(),
      fetchCourses(),
      fetchUsers(),
      fetchGrades(),
      fetchOrders()
    ]);
  };

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      const formattedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: parseFloat(p.price),
        category: p.category,
        stock: p.stock,
        image: p.image_url,
        specifications: p.specifications,
        isActive: p.is_active,
        isPromotion: p.is_promotion || false,
        discount: p.discount ? Number(p.discount) : 0,
        costPrice: p.cost_price ? Number(p.cost_price) : 0,
        profitMargin: p.profit_margin ? Number(p.profit_margin) : 0
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static if backend fails
      const staticProductsMapped: Product[] = staticProducts.map(p => ({ ...p }));
      setProducts(staticProductsMapped);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      const formattedCourses: Course[] = data.map((c: any) => ({
        id: c.id,
        name: c.title,
        description: c.description,
        price: parseFloat(c.price),
        category: 'capacitacion',
        stock: 999,
        image: c.image_url,
        isActive: c.is_active,
        specifications: {
          'Duración': c.duration,
          'Modalidad': c.modality,
          'Nivel': c.level
        },
        modules: c.modules?.map((m: any) => ({
          id: m.id,
          title: m.title,
          description: m.content,
          duration: m.duration || '',
          videoUrl: m.video_url,
        })) || []
      }));
      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback
      const staticCoursesMapped: Course[] = staticCourses.map(p => ({ ...p, modules: [] }));
      setCourses(staticCoursesMapped);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      const formattedUsers: User[] = data.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.full_name,
        role: u.role,
        isAuthenticated: false,
        isBanned: !u.is_active,
        createdAt: u.created_at
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchGrades = async () => {
    try {
      const data = await api.getGrades();
      setGrades(data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Exception fetching orders:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProduct = async (product: Product) => {
    try {
      await api.createProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          image_url: product.image,
          specifications: product.specifications,
          isActive: product.isActive,
          is_promotion: product.isPromotion,
          discount: product.discount,
          cost_price: product.costPrice,
          profit_margin: product.profitMargin
      });
      toast.success('Producto creado');
      fetchProducts();
    } catch (error) {
      toast.error('Error al crear producto');
      console.error(error);
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await api.updateProduct(product.id, {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          image_url: product.image,
          specifications: product.specifications,
          isActive: product.isActive,
          is_promotion: product.isPromotion,
          discount: product.discount,
          cost_price: product.costPrice,
          profit_margin: product.profitMargin
      });
      toast.success('Producto actualizado');
      fetchProducts();
    } catch (error) {
      toast.error('Error al actualizar producto');
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.deleteProduct(id);
      toast.success('Producto eliminado');
      fetchProducts();
    } catch (error) {
      toast.error('Error al eliminar producto');
    }
  };

  // Course mutations - placeholders as they are not fully implemented in this demo backend
  // but we keep the signatures to avoid breaking the UI
  const addCourse = async (course: Course) => {
    toast.success('Función de crear curso no implementada en backend demo');
  };

  const updateCourse = async (course: Course) => {
    toast.success('Función de actualizar curso no implementada en backend demo');
  };

  const deleteCourse = async (id: string) => {
    toast.success('Función de eliminar curso no implementada en backend demo');
  };

  const updateUserRole = async (userId: string, role: 'admin' | 'user' | 'student') => {
    try {
      await api.updateUserRole(userId, role);
      toast.success('Rol actualizado');
      fetchUsers();
    } catch (error) {
      toast.error('Error al actualizar rol');
    }
  };

  const assignGrade = async (grade: Grade) => {
      // Placeholder - API doesn't have assignGrade yet
      toast.success('Asignar nota: Implementación pendiente en backend');
  };

  const createOrder = async (order: Invoice, userId: string | undefined) => {
    try {
      // Determine payment method from invoice data or default
      // Note: The backend expects 'payment_method' in the body
      // We need to pass the payment method selected in Checkout
      
      await api.createOrder({
          user_id: userId,
          total: order.total,
          items: order.items,
          shipping_address: order.customerInfo,
          payment_method: 'Wompi / Card' 
      });

      // --- WhatsApp Notification ---
      try {
        const companyPhone = '573227579082'; // Your number
        const customerName = order.customerInfo.name;
        const total = order.total.toLocaleString();
        
        // Build message
        let message = `🔔 *NUEVA COMPRA REALIZADA*\n\n`;
        message += `👤 *Cliente:* ${customerName}\n`;
        message += `💰 *Total:* $${total}\n`;
        message += `📦 *Productos:*\n`;
        
        order.items.forEach(item => {
           message += `- ${item.name} (x${item.quantity})\n`;
        });
        
        message += `\n📄 *Factura:* ${order.id}\n`;
        message += `✅ *Estado:* Pagado (Wompi)`;

        // Encode for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${companyPhone}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab (or background if possible, but browsers block background tabs)
        // Since we are in the browser, the best way is to open it for the user to hit send,
        // OR better: Just log it here. To send AUTOMATICALLY without user interaction requires a Paid WhatsApp API (Twilio/Meta).
        // For this requirement, we will simulate it or open the link.
        
        // Option A: Open link (User has to click send) - Most reliable for free
        window.open(whatsappUrl, '_blank');
        
      } catch (waError) {
        console.error("Error generating WhatsApp link", waError);
      }
      // -----------------------------

      fetchOrders();
      if (userId) fetchGrades();
    } catch (e) {
      console.error('Exception in createOrder:', e);
    }
  };

  const createStudent = async (email: string, password: string, name: string, role: string = 'student') => {
    try {
      await api.register(email, password, name, role);
      toast.success(role === 'student' ? 'Estudiante creado exitosamente' : 'Usuario creado exitosamente');
      fetchUsers();
    } catch (error: any) {
      toast.error(`Error al crear usuario: ${error.error || error.message}`);
    }
  };

  const enrollUserInCourse = async (userId: string, courseId: string) => {
     try {
       await api.enrollUser(userId, courseId);
       toast.success('Estudiante inscrito exitosamente');
       fetchGrades(); // Refresh enrollments
     } catch (error) {
       toast.error('Error al inscribir al estudiante');
     }
  };

  const unenrollUserFromCourse = async (userId: string, courseId: string) => {
     try {
       await api.unenrollUser(userId, courseId);
       toast.success('Estudiante desinscrito exitosamente');
       fetchGrades(); // Refresh enrollments
     } catch (error) {
       toast.error('Error al desinscribir al estudiante');
     }
  };

  const toggleUserStatus = async (userId: string, isBanned: boolean) => {
    try {
      await api.toggleUserStatus(userId, !isBanned); // isBanned=true means is_active=false
      toast.success(isBanned ? 'Usuario bloqueado' : 'Usuario desbloqueado');
      fetchUsers();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  const resetUserPassword = async (userId: string, newPassword: string) => {
    try {
      await api.resetUserPassword(userId, newPassword);
      toast.success('Contraseña actualizada exitosamente');
    } catch (error) {
      toast.error('Error al restablecer contraseña');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
        const res = await api.deleteUser(userId);
        if (res.message) toast.success(res.message);
        else toast.success('Usuario eliminado exitosamente');
        fetchUsers();
    } catch (error) {
        toast.error('Error al eliminar usuario');
    }
  };

  return (
    <DataContext.Provider value={{
      products,
      courses,
      users,
      grades,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      addCourse,
      updateCourse,
      deleteCourse,
      updateUserRole,
      assignGrade,
      createOrder,
      createStudent,
      enrollUserInCourse,
      unenrollUserFromCourse,
      toggleUserStatus,
      resetUserPassword,
      deleteUser,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
