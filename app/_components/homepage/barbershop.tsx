import { db } from "@/app/_lib/prisma"
import { BarberShopItem } from "@/app/_components/homepage/barbershop-item"

interface BarberShopProps {
    title: string
}

export const BarberShop = async ({ title }: BarberShopProps) => {
    const barbershops = await db.barbershop.findMany({})

    return (
        <section className="w-full px-5 mt-6">
            <h2 className="mb-2 text-lg font-normal uppercase text-gray-400">
                {title}
            </h2>
            <div className="flex gap-4 overflow-x-auto custom-scrollbar">
                {barbershops.map((barbershop) => (
                    <BarberShopItem
                        key={barbershop.id}
                        barbershop={barbershop}
                    />
                ))}
            </div>
        </section>
    )
}