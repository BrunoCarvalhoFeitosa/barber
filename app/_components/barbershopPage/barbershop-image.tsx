"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { HeaderSideMenu } from "@/app/_components/common/header-side-menu"
import { AlignLeftIcon, ChevronLeftIcon } from "lucide-react"

interface BarberShopImageProps {
    barbershopImageUrl: string
    barbershopName: string
}

export const BarberShopImage = ({ barbershopImageUrl, barbershopName }: BarberShopImageProps) => {
    const router = useRouter()

    const handleBackPageClick = () => {
        router.replace("/")
    }

    return (
        <section>
            <div className="relative w-full h-[250px] md:h-[60dvh] overflow-hidden">
                <Image
                    src={barbershopImageUrl}
                    alt={barbershopName}
                    fill
                    className="w-full h-full object-cover brightness-[0.18] transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleBackPageClick}
                    >
                        <ChevronLeftIcon size={25} />
                    </Button>
                </div>
                <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="w-10 h-10"
                            >
                                <AlignLeftIcon size={25} />
                            </Button>
                        </SheetTrigger>
                        <HeaderSideMenu />
                    </Sheet>
                </div>
            </div>
        </section>
    )
}