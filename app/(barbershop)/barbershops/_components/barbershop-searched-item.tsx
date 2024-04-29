"use client"
import { Barbershop } from "@prisma/client"
import { BarbershopItem } from "@/app/_components/common/barbershop-item"

interface BarbershopSearchedItemProps {
    barbershops: Barbershop[]
}

export const BarbershopSearchedItem = ({ barbershops }: BarbershopSearchedItemProps) => {
    return (
        <div className="px-5 flex justify-between md:justify-start flex-wrap gap-4 w-full">
            {barbershops.map((barbershop: Barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
        </div>
    )
}