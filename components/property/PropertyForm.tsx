'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { PropertyBasicInfo } from './form/PropertyBasicInfo';
import { PropertyDetails } from './form/PropertyDetails';
import { PropertyFeatures } from './form/PropertyFeatures';
import { PropertyImages } from './form/PropertyImages';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { FormData } from '@/types/formTypes';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PropertyFormProp } from '@/types/propertyType';
import { usePathname } from 'next/navigation';
import { siteUrl } from '@/config';
import { useToast } from '@/hooks/use-toast';

export default function PropertyForm({
  existingProperty,
}: PropertyFormProp) {
  const { toast } = useToast();


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
    //   totalArea: '',
    //   privateArea: '',
    //   features: [], // Initialize as an empty array
    //   images: [], // Initialize as an empty array
    // },
    // thos below are just for testing purposes
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
    mode: 'onBlur',
  });
  // console.log('this is property', existingProperty);

  // register the methods for react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const router = useRouter();

  // grabs the url path and checks if the form is being edit
  const pathname = usePathname();
  const isEditingForm = pathname.includes('/update/');

  // pre loads the data from property props when the user is editing
  useEffect(() => {
    if (existingProperty) {
      reset({
        title: existingProperty.title || '',
        location: existingProperty.location || '',
        price: existingProperty.price?.toString() || '',
        description: existingProperty.description || '',
        propertyType: existingProperty.propertyType || undefined,
        bedrooms: existingProperty.bedrooms?.toString() || '',
        bathrooms: existingProperty.bathrooms?.toString() || '',
        garage: existingProperty.garage?.toString() || '',
        totalArea: existingProperty.totalArea?.toString() || '',
        privateArea: existingProperty.privateArea?.toString() || '',
        listingType: existingProperty.listingType,
        cover: existingProperty.cover,
        suites: existingProperty.suites,
        condominio: existingProperty.condominio,
        images:
          existingProperty.images?.map((image) => ({
            imgId: image.id, // Convert 'id' to 'imgId'
            file: undefined, // No File object available for existing images
            url: image.url
          })) || [],
        features: existingProperty.features?.map((feature) => {
          return {
            name: feature.name,
          };
        }), // or however you want to initialize features
      });
    }
  }, [existingProperty, reset]);

  // is submiting is not really being used, but have already sert up for in case I neee it

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('this is data from on submit', data)

    const formData = new FormData();

    // append non-file data
    console.log('this is data-=-=-', data);
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
      console.log('===', image, index);
      if(image.file){
        formData.append(`images[${index}][id]`, image.imgId); // Append ID
        formData.append(`images[${index}][image]`, image.file); // Append File
      }
    });

    // console.log('this is data image after appending ids', data.images);

    try {
      const endpoint = isEditingForm
        ? `/api/propriedades/update/${existingProperty?.propertyId}`
        : `/api/propriedades/create`;
      const method = isEditingForm ? 'PATCH' : 'POST';

      console.log('this is the endpoint', endpoint)

      // make this request url dynamic so I can send create or edit requests
      const res = await axios({
        method,
        url: siteUrl + endpoint,
        data: formData, // Send form data as FormData object
        headers: {
          'Content-Type': 'multipart/form-data', // Specify content type
        },
      });

      if (res.status === 200) {
        router.push('/propriedades');
        toast({
          title: 'Propriedade salva!',
          description: 'Propriedade salva com sucesso!',
        });
      }
      console.log('this is data that will be sent to backend', data);
    } catch (error) {
      toast({
        title: 'Tente novament!',
        description: 'Não foi possivel salvar a propriedade.',
      });
      console.error('Error saving property:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      {' '}
      {/* Wrap everything inside FormProvider */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <PropertyBasicInfo
              register={register}
              errors={errors}
              setValue={setValue}
            />
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
          {isEditingForm ? (
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Edição'}
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Propriedade'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
