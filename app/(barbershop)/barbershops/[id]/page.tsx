"use server"
import { redirect } from "next/navigation"
import { db } from "@/app/_lib/prisma"
import { BarberShopImage } from "@/app/_components/barbershopPage/barbershop-image"
import { BarberShopResume } from "@/app/_components/barbershopPage/barbershop-resume"
import { BarbershopServices } from "@/app/_components/barbershopPage/barbershop-services"

interface BarberShopPageProps {
    params: {
        id: string
    }
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!params.id || !barbershop) {
        return redirect("/404")
    }

    return (
        <main>
            <BarberShopImage barbershopImageUrl={barbershop.imageUrl} barbershopName={barbershop.name} />
            <BarberShopResume barbershopName={barbershop.name} barbershopAddress={barbershop.address} />
            <BarbershopServices services={barbershop.services}  />
        </main>
    )
}
 
export default BarberShopPage