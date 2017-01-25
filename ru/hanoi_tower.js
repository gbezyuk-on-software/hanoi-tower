function move (departure_rod, destination_rod) {
    // 1. снять диск со стержня departure_rod
    // (то есть удалить его из массива hanoi_1[departure_rod])
    // 2. положить снятый диск на destination_rod
    // (то есть добавить его к массиву hanoi_1[destination_rod])
}

function solve_hanoi (N, departure_rod, destination_rod) {
    if (N == 1) {
        move(departure_rod, destination_rod);
        // изменилось только лишь то, что мы заменили константы 1 и 3
        // на параметры departure_rod и destination_rod
    }
}