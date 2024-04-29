"use client"
import { Barbershop } from "@prisma/client"

interface BarbershopTitleProps {
    searchParams?: string | undefined
    barbershops: Barbershop[]
}

export const BarbershopSearchedTitle = ({ searchParams, barbershops }: BarbershopTitleProps) => {
    return (
        <div className="py-6 px-5 mb-2">
            <h1 className="text-xl font-bold">
                Resultados para &quot;{searchParams}&quot;
            </h1>
            <p className="text-sm text-gray-400">
                {barbershops.length} resultados encontrados.
            </p>
        </div>
    )
}