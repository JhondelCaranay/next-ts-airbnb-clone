import prisma from "@/utils/prisma";

export type IListingsParams = {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
};

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    console.log("====================================");
    console.log("params", params);
    console.log("====================================");

    const listings = await prisma.listing.findMany({
      // where: query,
      where: {
        userId: userId || undefined,
        category: category || undefined,
        roomCount: {
          gte: Number(roomCount) || undefined,
        },
        guestCount: {
          gte: Number(guestCount) || undefined,
        },
        bathroomCount: {
          gte: Number(bathroomCount) || undefined,
        },
        locationValue: locationValue || undefined,
        NOT: {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
