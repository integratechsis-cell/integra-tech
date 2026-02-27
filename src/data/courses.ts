import { Product } from '../types';

export const courses: Product[] = [
  {
    id: 'excel-basico',
    name: 'Microsoft Excel: Nivel Básico',
    description: 'Domina los fundamentos de Excel. Aprende a crear hojas de cálculo, fórmulas simples y formato de celdas.',
    price: 80000,
    category: 'capacitacion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1543286386-713df548e9cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '10 horas',
      'Modalidad': 'Virtual',
      'Nivel': 'Principiante',
      'Certificado': 'Sí'
    }
  },
  {
    id: 'excel-intermedio',
    name: 'Microsoft Excel: Nivel Intermedio',
    description: 'Lleva tus habilidades al siguiente nivel. Tablas dinámicas, funciones lógicas y gráficos avanzados.',
    price: 120000,
    category: 'capacitacion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '15 horas',
      'Modalidad': 'Virtual',
      'Nivel': 'Intermedio',
      'Certificado': 'Sí'
    }
  },
  {
    id: 'excel-avanzado',
    name: 'Microsoft Excel: Nivel Avanzado',
    description: 'Conviértete en un experto. Macros, VBA, Power Query y análisis de datos complejo.',
    price: 180000,
    category: 'capacitacion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '20 horas',
      'Modalidad': 'Virtual',
      'Nivel': 'Avanzado',
      'Certificado': 'Sí'
    }
  },
  {
    id: 'informatica-basica',
    name: 'Informática Básica y Herramientas de Oficina',
    description: 'Aprende a usar el computador, internet, correo electrónico y el paquete Office desde cero.',
    price: 90000,
    category: 'capacitacion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '25 horas',
      'Modalidad': 'Virtual',
      'Nivel': 'Básico',
      'Certificado': 'Sí'
    }
  },
  {
    id: 'auditoria-iso-17025',
    name: 'Auditoría Interna ISO/IEC 17025:2017',
    description: 'Curso especializado para auditores en laboratorios de ensayo y calibración. Normativa y técnicas de auditoría.',
    price: 450000,
    category: 'capacitacion',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '40 horas',
      'Modalidad': 'Virtual/En vivo',
      'Nivel': 'Profesional',
      'Certificado': 'Sí (Auditor Interno)'
    }
  },
  {
    id: 'ciberseguridad-basica',
    name: 'Introducción a la Ciberseguridad',
    description: 'Protege tu información y aprende los principios del hacking ético y seguridad informática.',
    price: 200000,
    category: 'capacitacion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isActive: true,
    specifications: {
      'Duración': '15 horas',
      'Modalidad': 'Virtual',
      'Nivel': 'Intermedio',
      'Certificado': 'Sí'
    }
  }
];
