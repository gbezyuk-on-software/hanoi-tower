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

function get_intermediate_rod (departure_rod, destination_rod) {
    // исходный массив стержней — просто три цифры
    all_rods = [0, 1, 2]
    
    // отфильтруем departure_rod встроенной функцией
    rods_without_departure = all_rods.filter(function (rod) { return rod != departure_rod })
    
    // отфильтруем destination_rod встроенной функцией
    only_one_rod_left = rods_without_departure.filter(function (rod) { return rod != destination_rod })
    
    // в all_rods должен к этому моменту остаться только один элемент,
    // его и вернём как номер промежуточного стержня:
    return only_one_rod_left[0]
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
        // просто перекладываем один диск
        move(departure_rod, destination_rod);
    }
    if (N == 2) {
        // определим, какой стержень остался для промежуточных действий,
        // учитывая указанные исходный и целевой стержни
        intermediate_rod = get_intermediate_rod(departure_rod, destination_rod)

        // перекладываем маленький диск на промежуточный стержень
        move(departure_rod, intermediate_rod)
        
        // перекладываем большой диск на целевой стержень
        move(departure_rod, destination_rod)
        
        // маленький диск с промежуточного стержня перекладываем на целевой
        move(intermediate_rod, destination_rod)
    }
}