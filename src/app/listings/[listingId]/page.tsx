import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import prisma from "@/utils/prisma";

type ListingPageProps = {
  params: {
    listingId: string;
  };
};

export async function generateStaticParams() {
  const listings = await prisma.listing.findMany();
  return listings.map((listing) => ({
    listingId: listing.id.toString(),
  }));
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const listingData = getListingById(params);
  const reservationsData = getReservations(params);
  const currentUserData = getCurrentUser();

  const [listing, reservations, currentUser] = await Promise.all([
    listingData,
    reservationsData,
    currentUserData,
  ]);

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />;
};
export default ListingPage;
