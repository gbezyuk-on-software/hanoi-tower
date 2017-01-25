function move (departure_rod, destination_rod) {
    hanoi_1[departure_rod] = []
    hanoi_1[destination_rod] = [1]
    // тупо донельзя, но для задачи размера 1 — сойдёт и так
}

function solve_hanoi (N, departure_rod, destination_rod) {
    if (N == 1) {
        move(departure_rod, destination_rod);
        // изменилось только лишь то, что мы заменили константы 1 и 3
        // на параметры departure_rod и destination_rod
    }
}