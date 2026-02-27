import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  email: yup.string().email('Email inválido').required('Email es requerido'),
  phone: yup.string().required('Teléfono es requerido'),
  address: yup.string().required('Dirección es requerida'),
  idType: yup.string().required('Tipo de documento es requerido'),
  idNumber: yup.string().required('Número de documento es requerido'),
}).required();

export interface InvoiceFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  idType: string;
  idNumber: string;
}

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
  initialData?: Partial<InvoiceFormData>;
  hideSubmitButton?: boolean;
  id?: string;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, initialData, hideSubmitButton, id }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<InvoiceFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: initialData,
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
          <select
            {...register('idType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          >
            <option value="">Seleccione...</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="NIT">NIT</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PASSPORT">Pasaporte</option>
          </select>
          {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
          <input
            type="text"
            {...register('idNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          />
          {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-DEFAULT focus:ring-brand-DEFAULT sm:text-sm border p-2"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
      </div>

      {!hideSubmitButton && (
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-DEFAULT hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT transition-colors"
          >
            Generar Vista Previa
          </button>
        </div>
      )}
    </form>
  );
};
