"use client"
import { MapPinIcon, StarIcon } from "lucide-react"

interface BarberShopResumeProps {
    barbershopName: string
    barbershopAddress: string
}

export const BarberShopResume = ({ barbershopName, barbershopAddress }: BarberShopResumeProps) => {
    return (
        <section className="w-full p-5">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-3xl font-bold">
                    {barbershopName}
                </h1>
                <div className="flex items-center gap-2">
                    <div>
                        <MapPinIcon className="text-primary" />
                    </div>
                    <div>
                        <p className="text-sm md:text-lg">
                            {barbershopAddress}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <StarIcon className="text-primary" />
                    </div>
                    <div>
                        <p className="text-sm md:text-lg">
                            5.0 (899 avaliações)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}