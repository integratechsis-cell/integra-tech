import { LucideIcon, Monitor, Database, Wrench, Shield, Server, Code } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'capacitacion',
    title: 'Capacitación TIC',
    description: 'Formación especializada en tecnologías de la información para empresas y particulares.',
    icon: Monitor,
    features: [
      'Cursos de ofimática avanzada',
      'Seguridad informática básica',
      'Herramientas colaborativas',
      'Gestión de proyectos tecnológicos'
    ]
  },
  {
    id: 'analisis-datos',
    title: 'Análisis de Datos',
    description: 'Transformamos tus datos en información valiosa para la toma de decisiones estratégicas.',
    icon: Database,
    features: [
      'Visualización de datos (Power BI, Tableau)',
      'Limpieza y procesamiento de datos',
      'Informes automatizados',
      'Consultoría en inteligencia de negocios'
    ]
  },
  {
    id: 'reparacion',
    title: 'Reparación Hardware/Software',
    description: 'Servicio técnico especializado para equipos de cómputo y dispositivos móviles.',
    icon: Wrench,
    features: [
      'Mantenimiento preventivo y correctivo',
      'Instalación de sistemas operativos',
      'Recuperación de datos',
      'Actualización de componentes'
    ]
  },
  {
    id: 'desarrollo',
    title: 'Desarrollo de Software',
    description: 'Soluciones a medida para optimizar los procesos de tu negocio.',
    icon: Code,
    features: [
      'Desarrollo web y móvil',
      'Integración de sistemas',
      'Automatización de procesos',
      'Soporte y mantenimiento'
    ]
  }
];
