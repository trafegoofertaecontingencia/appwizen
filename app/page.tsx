"use client";

import Form from "@/app/components/Form";

import { useAuth } from "@/app/context/auth-context";

import { useSession } from "next-auth/react";
import Wellcome from "./components/Wellcome";
import Loading from "./components/Loading";

export default function Home() {
  const { user, loading } = useAuth();

  const { data: session } = useSession();

  

  if (loading) return <Loading />;



  if (!user && !session) return <Wellcome />

  return (
    <div>
      <Form />
    </div>
  );
}
