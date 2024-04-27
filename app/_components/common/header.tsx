"use client"
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { AlignLeftIcon, CalendarIcon, HomeIcon, LogOutIcon, UserCircle2Icon } from "lucide-react"

export const Header = () => {
    const { data } = useSession()

    const handleLogoutClick = () => {
        signOut()
    }

    const handleLoginClick = async () => {
        await signIn("google")
    }

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
                        <SheetContent className="p-0">
                            <SheetHeader className="p-5 text-left border-b border-secondary">
                                <SheetTitle>
                                    Menu
                                </SheetTitle>
                            </SheetHeader>
                            {data?.user ? (
                                <div className="py-6 px-5 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={data.user?.image ?? ""} />
                                        </Avatar>
                                        <h3 className="font-bold">
                                            {data.user.name}
                                        </h3>
                                    </div>
                                    <div>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="default"
                                            onClick={handleLogoutClick}
                                        >
                                            <LogOutIcon size={18} />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="pt-6 pb-3 px-5">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold">
                                                Olá, faça seu login!
                                            </h3>
                                        </div>
                                        <div className="w-full">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="default"
                                                className="pl-2 flex justify-start items-center gap-2 w-full"
                                                onClick={handleLoginClick}
                                            >
                                                <div>
                                                    <UserCircle2Icon />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm">
                                                        Fazer login
                                                    </h3>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="px-5 flex flex-col gap-3">
                                <Link href="/" className="w-full">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="default"
                                        className="flex justify-start items-center gap-2 w-full"
                                    >
                                        <div>
                                            <HomeIcon size={18} />
                                        </div>
                                        <div>
                                            <span>
                                                Início
                                            </span>
                                        </div>
                                    </Button>
                                </Link>
                                {data?.user && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="default"
                                        className="flex justify-start items-center gap-2"
                                    >
                                        <div>
                                            <CalendarIcon size={18} />
                                        </div>
                                        <div>
                                            <span>
                                                Agendamentos
                                            </span>
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    )
}