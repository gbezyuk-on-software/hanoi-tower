function move (departure_rod, destination_rod) {
    top_disk = hanoi_2[departure_rod].shift() // снимаем диск сверху со стержня departure_rod
    hanoi_2[destination_rod].unshift(top_disk) // кладём его сверху на стержень destination_rod
}

function solve_hanoi (N, departure_rod, destination_rod) {
    if (N == 1) {
        move(departure_rod, destination_rod);
        // изменилось только лишь то, что мы заменили константы 1 и 3
        // на параметры departure_rod и destination_rod
    }
}