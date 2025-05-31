import { useAuth } from "../context/auth-context";

import { useSession } from "next-auth/react";

export default function Header() {

    const { data: session, status } = useSession();

    const { user } = useAuth();

    console.log(session)
    console.log(user)

    return(
        <header>
            {user ||session ? <p>Você esta logado {user ? user.nome : session?.user?.name} </p> : <p>Você não esta logado</p>}
        </header>
    )
}