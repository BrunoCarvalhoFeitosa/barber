import { db } from "@/app/_lib/prisma"
import { BarbershopItem } from "@/app/_components/homePage/barbershop-item"

interface BarbershopProps {
    title: string
}

export const Barbershop = async ({ title }: BarbershopProps) => {
    const barbershops = await db.barbershop.findMany({})

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