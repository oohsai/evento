import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventoEvent } from "./types";
import { PrismaClient } from "@prisma/client";
import prisma from "./db";
import { notFound } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getEvents(city: string, page = 1) {
  const capCity = city.charAt(0).toUpperCase() + city.substring(1);

  const eventData = await prisma.eventtoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capCity,
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });
  let totalCount;
  if (city == "all") {
    totalCount = await prisma.eventtoEvent.count();
  } else {
    totalCount = await prisma.eventtoEvent.count({
      where: {
        city: capCity,
      },
    });
  }

  return { eventData, totalCount };
}

export async function getEvent(slug: string) {
  const event = await prisma.eventtoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
}
