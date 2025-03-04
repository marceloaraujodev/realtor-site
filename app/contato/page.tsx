import PropertyContact from "@/components/property/PropertyContact";
import { PropertyProps } from "@/types/propertyType";

export default function Contato({property}: PropertyProps){
  return (
    <>
    <PropertyContact property={property}/>
    </>
  )
 
}