import { BarbershopItem } from "./barbershop-item"
import { Barbershop } from "@prisma/client"

interface BarbershopProps {
    title: string
    barbershops: Barbershop[]
}

export const Barbershops = ({ title, barbershops }: BarbershopProps) => {
    return (
        <section className="w-full px-5 mt-6">
            <div className="mb-2">
                <h2 className="text-lg font-normal uppercase text-gray-400">
                    {title}
                </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto custom-scrollbar">
                {barbershops.map((barbershop) => (
                    <BarbershopItem
                        key={barbershop.id}
                        barbershop={barbershop}
                    />
                ))}
            </div>
        </section>
    )
}