import listingPlaceholder from "../../images/listing-placeholder.jpg";
const listings = [
  {
    id: "32",
    slug: "elegans-csaladi-haz-a-belvarosban",
    title: "Elegáns családi ház a belvárosban",
    address: "Debrecen, Belváros, Piac utca 45.",
    price: 125000000,
    image: listingPlaceholder.src,
    imageAlt: "Elegáns családi ház a belvárosban",
    rooms: 5,
    area: 180,
    terraceArea: 20,
    gardenArea: 5,
    floor: 1,
    propertyType: "house",
    transactionType: "sale",
    description:
      "Kiváló elhelyezkedésű, gondosan felújított családi ház a belváros szívében. Tágas szobák, modern konyha, összkomfortos fürdőszobák. Csendes, nyugodt környezet, közel minden szolgáltatáshoz.",
    link: "",
    extra: "Hatalmas kert",
  },
  {
    id: "33",
    slug: "modern-lakas-a-belvarosban",
    title: "Modern lakás a belvárosban",
    address: "Debrecen, Belváros, Egyetem tér 12.",
    price: 45000000,
    image: listingPlaceholder.src,
    imageAlt: "Elegáns családi ház a belvárosban",
    rooms: 5,
    area: 180,
    terraceArea: 20,
    gardenArea: 5,
    floor: 1,
    propertyType: "apartment",
    transactionType: "sale",
    description:
      "Kiváló elhelyezkedésű, gondosan felújított családi ház a belváros szívében. Tágas szobák, modern konyha, összkomfortos fürdőszobák. Csendes, nyugodt környezet, közel minden szolgáltatáshoz.",
    link: "",
    extra: "Hatalmas kert",
  },
];

listings.forEach((listing) => {
  listing.link = `${listing.id}-${listing.slug}`;
});

export function GET({ request }: { request: Request }) {
  const u = new URL(listingPlaceholder.src, request.url);
  const a = u.toString();
  console.log(a);
  listings[0].image = a;

  return new Response(
    JSON.stringify({
      listings,
    }),
  );
}
