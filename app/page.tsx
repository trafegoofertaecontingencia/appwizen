"use client"

import Form from "@/app/components/Form";

import { useAuth } from "@/app/context/auth-context";

import { useSession } from "next-auth/react";
import Wellcome from "./components/Wellcome";

export default function Home() {

  const { user } = useAuth();

  const { data: session } = useSession();

if (!user && !session) return <Wellcome />

  return (
    <div>
      <Form />
    </div>
  );
}
