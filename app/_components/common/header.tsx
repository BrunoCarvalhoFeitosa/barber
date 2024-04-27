"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { HeaderSideMenu } from "@/app/_components/common/header-side-menu"
import { AlignLeftIcon } from "lucide-react"

export const Header = () => {
    return (
        <header className="w-full">
            <Card className="rounded-none">
                <CardContent className="p-5 flex flex-row justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="FSW Barber"
                            width={150}
                            height={32}
                        />
                    </Link>
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
                </CardContent>
            </Card>
        </header>
    )
}