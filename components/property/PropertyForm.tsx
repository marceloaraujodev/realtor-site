'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider  } from 'react-hook-form';
import { PropertyBasicInfo } from './form/PropertyBasicInfo';
import { PropertyDetails } from './form/PropertyDetails';
import { PropertyFeatures } from './form/PropertyFeatures';
import { PropertyImages } from './form/PropertyImages';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { FormData } from '@/types/formTypes';
import { useRouter } from 'next/navigation';
import axios from 'axios'

export default function PropertyForm() {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
  const methods = useForm<FormData>({
    // form default values should be empty strings
    // defaultValues: {
    //   title: '',
    //   location: '',
    //   price: '',
    //   description: '',
    //   propertyType: undefined,
    //   bedrooms: '',
    //   bathrooms: '',
    //   garage: '',
    //   area: '',
    //   totalArea: '',
    //   privateArea: '',
    //   features: [], // Initialize as an empty array
    //   images: [],   // Initialize as an empty array
    // },
    defaultValues: {
      title: 'Apartamento vista mar avenida Atlântica',
      location: 'Centro, Balneário Camboriú',
      price: '5000000',
      description: 'lindo apartamento completo, vista pro mar',
      propertyType: undefined,
      bedrooms: '4',
      bathrooms: '5',
      garage: '3',
      totalArea: '120',
      privateArea: '120',
      features: [], // Initialize as an empty array
      images: [],   // Initialize as an empty array
    },
    mode: 'onBlur'
  });

  const router = useRouter();

  useEffect(() => {
    if (isRedirecting) {
      router.push('/propriedades');
    }
  }, [isRedirecting]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors},
  } = methods;

  // is submiting is not really being used, but have already sert up for in case I neee it

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    if(!data.propertyType ){
      alert('Selecione o tipo do imóvel')
      return;
    }

    const formData = new FormData();
    // append non-file data
    console.log('this is data-=-=-', data)
    // Append non-file fields
    Object.entries(data).forEach(([key, value]) => {
      console.log('----', key, value);
      if (key !== 'images') {
        formData.append(key, value);
      }
    });

     // Append features as separate strings
    data.features?.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature.name); // Append each feature's name
    });

    // Append images with their IDs
    data.images?.forEach((image, index) => {
      console.log('===', image, index)
      formData.append(`images[${index}][id]`, image.imgId); // Append ID
      formData.append(`images[${index}][image]`, image.file); // Append File
    });

    try {
      const res = await axios.post('http://localhost:3000/api/propriedades/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify content type
        },
      });
      if (res.status === 200) {
        alert('Propriedade salva com sucesso!');
        setIsRedirecting(true); // Redirect to properties list after successful save
      }
      console.log('this is data that will be sent to backend', data)
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <FormProvider {...methods}> {/* Wrap everything inside FormProvider */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
        <TabsTrigger value="details">Detalhes</TabsTrigger>
        <TabsTrigger value="features">Características</TabsTrigger>
        <TabsTrigger value="images">Imagens</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <PropertyBasicInfo register={register} errors={errors} setValue={setValue} />
      </TabsContent>

      <TabsContent value="details">
        <PropertyDetails register={register} errors={errors} />
      </TabsContent>

      <TabsContent value="features">
        <PropertyFeatures register={register} control={control} />
      </TabsContent>

      <TabsContent value="images">
        <PropertyImages register={register} control={control} />
      </TabsContent>
    </Tabs>

    <div className="flex justify-end">
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Propriedade'}
      </Button>
    </div>
  </form>
  </FormProvider>
  );
}