"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { PropertyBasicInfo } from "./form/PropertyBasicInfo";
import { PropertyDetails } from "./form/PropertyDetails";
import { PropertyFeatures } from "./form/PropertyFeatures";
import { PropertyImages } from "./form/PropertyImages";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { FormData } from "@/types/formTypes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PropertyFormProp } from "@/types/propertyType";
import { usePathname } from "next/navigation";
import { siteUrl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useProperty } from "@/app/context/PropertyContext";
import { handleImageUpload } from "@/utils/compressImages";

const tabOrder = ["basic", "details", "features", "images"];

export default function PropertyForm({ existingProperty }: PropertyFormProp) {
  const { addProperty, fetchProperties } = useProperty();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(tabOrder[0]); // Start at "basic"

  useEffect(() => {
    console.log("this is active tab", activeTab);
  }, [activeTab]);

  const methods = useForm<FormData>({
    // form default values should be empty strings
    // defaultValues: {
    //   title: "",
    //   location: "",
    //   price: "",
    //   description: "",
    //   propertyType: undefined,
    //   bedrooms: "",
    //   bathrooms: "",
    //   garage: "",
    //   totalArea: "",
    //   privateArea: "",
    //   features: [], // Initialize as an empty array
    //   images: [], // Initialize as an empty array
    // },
    // thos below are just for testing purposes
    defaultValues: {
      title: 'Apartamento vista mar avenida Atlântica',
      location: 'Centro, Balneário Camboriú',
      price: '5000000',
      description: 'lindo apartamento completo, vista pro mar',
      // propertyType: undefined,
      bedrooms: '4',
      bathrooms: '5',
      garage: '3',
      suites: 2,
      condominio: 800,
      listingType: 'aluguel',
      propertyType: 'Casa',
      totalArea: '120',
      privateArea: '120',
      features: [], // Initialize as an empty array
      images: [],   // Initialize as an empty array
    },
    mode: "onBlur",
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
  const isEditingForm = pathname.includes("/update/");

  // pre loads the data from property props when the user is editing
  useEffect(() => {
    if (existingProperty) {
      console.log('existing property:', existingProperty);
      console.log('existing property:', existingProperty.propertyType);
      reset({
        title: existingProperty.title || "",
        location: existingProperty.location || "",
        price: existingProperty.price?.toString() || "",
        description: existingProperty.description || "",
        propertyType: existingProperty.propertyType || '',
        bedrooms: existingProperty.bedrooms?.toString() || "",
        bathrooms: existingProperty.bathrooms?.toString() || "",
        garage: existingProperty.garage?.toString() || "",
        totalArea: existingProperty.totalArea?.toString() || "",
        privateArea: existingProperty.privateArea?.toString() || "",
        listingType: existingProperty.listingType,
        cover: existingProperty.cover,
        suites: existingProperty.suites,
        condominio: existingProperty.condominio,
        images:
          existingProperty.images?.map((image) => ({
            imgId: image.id, // Convert 'id' to 'imgId'
            file: undefined, // No File object available for existing images
            url: image.url,
            cover: image.cover,
          })) || [],
        features: existingProperty.features?.map((feature) => {
          return {
            name: feature.name,
          };
        }), // or however you want to initialize features
      });
    }

  }, [existingProperty, reset]);


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log('this is data from on submit', data)

    console.log("formData before submittion", data);
    const formData = new FormData();

    // Append non-file fields
    Object.entries(data).forEach(([key, value]) => {
      // console.log('----', key, value);
      if (key !== "images") {
        formData.append(key, value);
      }
    });

    // Append features as separate strings
    data.features?.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature.name); // Append each feature's name
    });

    // Append images with their IDs
    data.images?.forEach((image, index) => {
      // Always include the image id
      formData.append(`images[${index}][id]`, image.imgId);
      formData.append(`images[${index}][url]`, image.url || "");

      // If there is a new file, include it…
      if (image.file) {
        formData.append(`images[${index}][image]`, image.file);
      }
    });

    //
    if (data.images) {
      // Process images in parallel
      const compressedImages = await Promise.all(
        data.images.map(async (image) => {
          if (!image.file) return image;
           // Check the file size (in bytes)
          const fileSizeInKB = image.file.size / 1024; // Convert from bytes to KB
          if (fileSizeInKB > 600){
            try {
              const compressedFile = await handleImageUpload(image.file);
              return { ...image, file: compressedFile };
            } catch (error) {
              console.error("Compression failed for image:", error);
              return image; // Fallback to original
            }
          }else{
            return image;
          }
        })
      );

      // Append compressed images to FormData
      compressedImages.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}][id]`, image.imgId);
          formData.append(`images[${index}][image]`, image.file);
        }
      });
    }

    try {
      const endpoint = isEditingForm
        ? `/api/propriedades/update/${existingProperty?.propertyId}`
        : `/api/propriedades/create`;
      const method = isEditingForm ? "PATCH" : "POST";

      // make this request url dynamic so I can send create or edit requests
      const res = await axios({
        method,
        url: siteUrl + endpoint,
        data: formData, // Send form data as FormData object
        headers: {
          "Content-Type": "multipart/form-data", // Specify content type
        },
      });

      if (res.status === 200) {
        addProperty(res.data);
        fetchProperties();
        toast({
          title: "Propriedade salva!",
          description: "Propriedade salva com sucesso!",
        });

        router.push("/propriedades");
      }
    } catch (error: any) {
       // Check if the error has a message and use it
      const errorMessage = error?.message || error?.toString() || 'Ocorreu um erro desconhecido.';
      toast({
        title: "Tente novament!",
        description: `Não foi possivel salvar a propriedade. Error: ${errorMessage}`,
      });
      console.error("Error saving property:", error);
    }
  };

  // tab navigation
  const handleTabNavigation = (direction: "next" | "prev") => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (direction === "next" && currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  return (
    <FormProvider {...methods}>
      {" "}
      {/* Wrap everything inside FormProvider */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
      {/* Tabs is what controls the navigation with its  */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger disabled value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger disabled value="details">Detalhes</TabsTrigger>
            <TabsTrigger disabled value="features">Características</TabsTrigger>
            <TabsTrigger disabled value="images">Imagens</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <PropertyBasicInfo register={register} errors={errors} setValue={setValue} />
            <div className="flex justify-end mt-4">
              <Button type="button" onClick={() => handleTabNavigation("next")}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <PropertyDetails register={register} errors={errors} />
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={() => handleTabNavigation("prev")}>
                Previous
              </Button>
              <Button type="button" onClick={() => handleTabNavigation("next")}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <PropertyFeatures register={register} control={control} />
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={() => handleTabNavigation("prev")}>
                Previous
              </Button>
              <Button type="button" onClick={() => handleTabNavigation("next")}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <PropertyImages register={register} control={control} />
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={() => handleTabNavigation("prev")}>
                Previous
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {activeTab === "images" && (
          <div className="flex justify-end">
            {isEditingForm ? (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Edição"}
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Propriedade"}
              </Button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
