"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import { MenuIcon } from "lucide-react"

export const Header = () => {
    return (
        <header className="w-full">
            <Card className="rounded-none">
                <CardContent className="p-5 flex flex-row justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="FSW Barber"
                            width={120}
                            height={22}
                        />
                    </Link>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                    >
                        <MenuIcon size={18} />
                    </Button>
                </CardContent>
            </Card>
        </header>
    )
}