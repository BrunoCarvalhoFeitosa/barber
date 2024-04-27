"use client"
import { Service } from "@prisma/client"
import { BarbershopServiceItem } from "@/app/_components/barbershopPage/barbershop-service-item"
import { useSession } from "next-auth/react"

interface BarbershopServicesProps {
    services: Service[]
    isAuthenticated?: boolean
}

export const BarbershopServices = ({ services, isAuthenticated }: BarbershopServicesProps) => {
    return (
        <section className="p-5">
            <div className="mb-2">
                <h2 className="text-lg font-normal uppercase text-gray-400">
                    Serviços
                </h2>
            </div>
            <div className="pb-3 flex flex-col md:flex-row gap-5 overflow-x-auto custom-scrollbar">
                {services.map((service: Service) => (
                    <BarbershopServiceItem
                        key={service.id}
                        service={service}
                        isAuthenticated={isAuthenticated}
                    />
                ))}
            </div>
        </section>
    )
}