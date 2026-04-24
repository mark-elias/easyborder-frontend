"use client";
// hooks
import { useRequireCountryAndCity } from "@/src/hooks/useRequireCountryAndCity";
import useCrossings from "@/src/hooks/useCrossings";

function CrossingsPage() {
  const { selectedCountry, selectedCity } = useRequireCountryAndCity();

  const {
    data: crossings,
    isLoading,
    error,
  } = useCrossings(selectedCountry, selectedCity);

  return (
    <h3 className="text-center mt-10 bg-custom-yellow text-black p-2 mx-10 rounded">
      Im currently setting up nginx, docker-compose, and SSL for https... stay
      tuned
    </h3>
  );

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // return (
  //   <main className="p-5 min-h-screen">
  //     <section className="flex flex-col items-center justify-center border">
  //       <h3>Crossings for {selectedCity}</h3>
  //       <p>{selectedCountry}</p>
  //       <p>{selectedCity}</p>
  //       <ul className="">
  //         {crossings?.map((crossing) => (
  //           <li key={crossing._id}>{crossing.portName}</li>
  //         ))}
  //       </ul>
  //     </section>
  //   </main>
  // );
}

export default CrossingsPage;
