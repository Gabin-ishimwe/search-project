"use client";
import { useSession } from "next-auth/react";
const Page = () => {
  const { data: session } = useSession();
  console.log(session);
  return <div>Admin homepage</div>;
};

export default Page;
