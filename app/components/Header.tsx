import { useAuth } from "../context/auth-context"

export default function Header() {

    const { user } = useAuth();

    return(
        <header>
            {user ? <p>Você esta logado {user?.email} </p>: <p>Você não esta logado</p>}
        </header>
    )
}