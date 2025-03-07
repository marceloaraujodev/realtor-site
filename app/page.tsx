
import Home from "./HomeClient";
import { PropertyProvider } from "./context/PropertyContext";

async function fetchProperties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/propriedades`, {
    cache: "no-store", // Ensures fresh data every time
  });

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export default async function App() {
  const properties = await fetchProperties();
  // console.log("🚀 [SERVER] Fetched properties:", properties);


  return (
    <PropertyProvider initialProperties={properties}>
      <Home properties={properties}/>
    </PropertyProvider>
  );
}