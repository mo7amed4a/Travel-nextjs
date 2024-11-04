import "./globals.css";
import UserContextProvider from "@/Context/Usercontext";
import { Flowbite } from "flowbite-react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "3M Tourism",
  description:
    "Discover unforgettable journeys with our travel website, where you can easily book domestic and international trips tailored to your needs. Explore a variety of travel packages, from sightseeing tours to unique adventures, and enjoy the best travel destinations around the globe. With our customized travel plans and expert consultations, planning your next vacation has never been easier. Experience the joy of travel with affordable hotel reservations, discounted flight tickets, and family-friendly vacation options. Start your adventure today!",
  keywords:
    "Tour Booking, Domestic and International Trips, Travel Packages, Sightseeing Tours, Best Travel Destinations, Customized Travel Plans, Trip Planning, Explore Tourist Attractions, Hotel Reservations, Unique Travel Experiences, Cruise Tours, Family Vacations, Discount Flight Tickets, Adventure Travel, Travel Consultations",
};

export default function RootLayout({ children }) {
  const customTheme = {
    button: {
      color: {
        primary: "bg-primary-500 hover:bg-primary-500 text-white font-bold",
      },
    },
  };
  return (
    // <DataContextProvider>

    <UserContextProvider>
      <Flowbite theme={{ theme: customTheme }}>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
          </head>
          <body className={` antialiased`}>
            <NextTopLoader color="#f4b335" />
            <Toaster position="top-center" />
            {children}
          </body>
        </html>
      </Flowbite>
    </UserContextProvider>
    // </DataContextProvider>
  );
}
