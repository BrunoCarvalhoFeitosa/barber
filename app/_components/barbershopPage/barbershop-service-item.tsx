"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Service } from "@prisma/client"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

interface BarbershopServiceItemProps {
    service: Service
    isAuthenticated?: boolean
}

export const BarbershopServiceItem = ({ service, isAuthenticated }: BarbershopServiceItemProps) => {
    const handleBookingServiceClick = async () => {
        if (!isAuthenticated) {
            return await signIn("google")
        }
    }

    return (
        <Card className="md:min-w-[400px]">
            <CardContent className="p-4 flex items-center gap-4 md:gap-6 w-full">
                <div className="relative w-[100px] h-[100px]">
                    <Image
                        fill
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
                <div className="flex-1">
                    <div className="mb-3">
                        <h3 className="text-lg font-bold">
                            {service.name}
                        </h3>
                        <p className="text-sm">
                            {service.description}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(Number(service.price))}
                        </h4>
                        <Button
                            type="button"
                            variant="secondary"
                            size="default"
                            className={`${!isAuthenticated && "border border-red-700 text-red-500 cursor-not-allowed"}`}
                            onClick={handleBookingServiceClick}
                        >
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}