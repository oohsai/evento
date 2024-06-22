import EventCard from "./EventCard";
import { getEvents } from "@/lib/utils";
import PaginationControls from "./PaginationControls";

type EventListProps = {
  city: string;
  page: number;
};

export default async function EventsList({ city, page }: EventListProps) {
  const { eventData, totalCount } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";
  return (
    <section className="flex flex-wrap gap-10 justify-center">
      {eventData.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
