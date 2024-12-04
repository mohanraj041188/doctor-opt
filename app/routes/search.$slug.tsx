import { useParams, useLoaderData } from "@remix-run/react";
import type { MetaFunction, json, LoaderFunction } from "@remix-run/node";
import DoctorOverview from "~/components/Overview/Overview";

export const loader: LoaderFunction = async ({ params }) => {
  const { symbol } = params;
  // const response = await fetch(`https://api.example.com/stocks/${symbol}`);
  // const data = await response.json();
  const { slug } = params;
  const originalText = slug.replace(/-/g, " ");
  return { slug, originalText };
}

export const meta: MetaFunction = () => {
  const { slug } = useParams();
  return [
    { title: `Best ${slug.replace(/-/g, " ")} In Chennai - Instant Appointment Booking, View Fees, Feedbacks | DocOct` },
    { name: "description", content: `Best ${slug.replace(/-/g, " ")} in Chennai. Book Doctor&#x27;s Appointment Online, View Fees, User feedbacks, Address &amp; Phone Numbers of ${slug.replace(/-/g, " ")} in Chennai | DocOct` },
  ];
};

export default function SearchResult() {
  const { slug } = useParams();
  const stockData = useLoaderData();

  return (
    <>
      <DoctorOverview name={slug.replace(/-/g, " ")} />
    </>
  );
}
