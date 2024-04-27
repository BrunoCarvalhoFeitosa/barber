import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/homepage/search"
import { BookingItem } from "@/app/_components/common/booking-item"
import { BarberShop } from "@/app/_components/homepage/barbershop";

const HomePage = async () => {
    return (
        <div>
            <Header />
            <main className="pb-10">
                <Search />
                <BookingItem title="Agendamentos" />
                <BarberShop title="Recomendados" />
                <BarberShop title="Populares" />
            </main>
        </div>
    );
}

export default HomePage