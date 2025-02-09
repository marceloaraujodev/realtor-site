'use client';
import { useForm, SubmitHandler, FormProvider  } from 'react-hook-form';
import { PropertyBasicInfo } from './form/PropertyBasicInfo';
import { PropertyDetails } from './form/PropertyDetails';
import { PropertyFeatures } from './form/PropertyFeatures';
import { PropertyImages } from './form/PropertyImages';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FormData } from '@/types/formTypes';
import axios from 'axios'





export function PropertyForm() {
  const methods = useForm<FormData>({
    // form default values should be empty strings
    defaultValues: {
      title: 'Apartamento vista mar avenida Atlântica',
      location: 'Centro, Balneário Camboriú',
      price: '5000000',
      description: 'lindo apartamento completo, vista pro mar',
      propertyType: undefined,
      bedrooms: '4',
      bathrooms: '5',
      garage: '3',
      area: '120',
      totalArea: '120',
      privateArea: '120',
      features: [], // Initialize as an empty array
      images: [],   // Initialize as an empty array
    },
    mode: 'onBlur'
  });
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
    try {
      const res = await axios.post('/api/propriedades/create', data);
      if (res.status === 200) {
        alert('Propriedade salva com sucesso!');
      }
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