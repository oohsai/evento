import EventsList from "@/components/EventsList";
import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

export function generateMetaData({ params }: EventPageProps) {
  const city = params.city;
  const cityCap = city.charAt(0).toUpperCase();

  return {
    title: city === "all" ? "All Events" : `Events in ${cityCap}`,
  };
}

type Props = {
  params: {
    city: string;
    page?: string;
  };
};

type EventPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

const pageNumberSchema = z.coerce.number().int().optional();

export default async function Eventspage({
  params,
  searchParams,
}: EventPageProps) {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid Page Number");
  }
  const cityCap = city.charAt(0).toUpperCase();

  return (
    <main className="flex flex-col items-center py-242 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${cityCap + city.slice(1)}`}
      </H1>
      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
