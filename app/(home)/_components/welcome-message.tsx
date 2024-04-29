"use client"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const WelcomeMessage = () => {
    const { data } = useSession()

    return (
        <div className="pt-10 px-5">
            {data?.user ? (
                <h2 className="text-xl">
                    Olá, <strong>{data.user.name}!</strong>
                </h2>
            ) : (
                <h2 className="text-xl">
                    Olá!
                </h2>
            )}
            <div className="flex items-center gap-x-1 text-sm">
                <p className="capitalize">
                    {format(new Date(), "EEEE','", {
                        locale: ptBR
                    })}
                </p>
                <p>
                    {format(new Date(), "dd 'de' MMMM", {
                        locale: ptBR
                    })}.
                </p>
            </div>
        </div>
    )
}