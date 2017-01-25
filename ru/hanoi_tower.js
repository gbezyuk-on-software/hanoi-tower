function is_move_possible (departure_rod, destination_rod) {
    if (departure_rod.length == 0) {
        // если исходный стержень пуст, перекладывать нечего — ход запрещён
        return false;
    }
    // до этой точки в коде мы дойдём только если исходный стержень не пуст
    if (destination_rod.length == 0) {
        // если целевой стержень пуст, а перекладывать есть что — ход вполне неплох!
        return true;
    }
    // до этой точки мы дойдём только если как исходный, так и целевой стержни не пусты
    // ход возможен, если на целевом стержне верхний диск больше (по номеру), чем на исходном
    return destination_rod[0] > departure_rod[0];
}

function move (departure_rod, destination_rod) {
    // ранее описанные действия по перекладыванию диска будем выполнять только если это разрешено правилами
    if (is_move_possible(departure_rod, destination_rod)) {
        top_disk = hanoi_2[departure_rod].shift() // снимаем диск сверху со стержня departure_rod
        hanoi_2[destination_rod].unshift(top_disk) // кладём его сверху на стержень destination_rod
    }
}

function solve_hanoi (N, departure_rod, destination_rod) {
    if (N == 1) {
        move(departure_rod, destination_rod);
        // изменилось только лишь то, что мы заменили константы 1 и 3
        // на параметры departure_rod и destination_rod
    }
}