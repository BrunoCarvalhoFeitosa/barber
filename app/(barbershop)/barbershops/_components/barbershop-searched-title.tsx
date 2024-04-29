"use client"

interface BarbershopTitleProps {
    searchParams?: string | undefined
}

export const BarbershopSearchedTitle = ({ searchParams }: BarbershopTitleProps) => {
    return (
        <div className="py-6 px-5 mb-2">
            <h1 className="text-xl font-bold">
                Resultados para &quot;{searchParams}&quot;
            </h1>
        </div>
    )
}