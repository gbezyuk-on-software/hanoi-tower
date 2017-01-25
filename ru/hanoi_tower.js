function is_move_possible (departure_rod, destination_rod) {
    if (departure_rod.length == 0) {
        console.log('move is impossible because the departure rod is empty')
        // если исходный стержень пуст, перекладывать нечего — ход запрещён
        return false;
    }
    // до этой точки в коде мы дойдём только если исходный стержень не пуст
    if (destination_rod.length == 0) {
        console.log('move is possible because the destination rod is empty')
        // если целевой стержень пуст, а перекладывать есть что — ход вполне неплох!
        return true;
    }
    // до этой точки мы дойдём только если как исходный, так и целевой стержни не пусты
    // ход возможен, если на целевом стержне верхний диск больше (по номеру), чем на исходном
    console.log('move is', destination_rod[0] > departure_rod[0] ? 'possible' : 'impossible',
                'because destination_rod[0] > departure_rod[0] is', destination_rod[0] > departure_rod[0])
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
    // действия по перекладыванию диска будем выполнять только если это разрешено правилами
    if (is_move_possible(departure_rod, destination_rod)) {
        console.log('moving from',  departure_rod, 'to', destination_rod, 'on state', JSON.stringify(hanoi))
        top_disk = hanoi[departure_rod].shift() // снимаем диск сверху со стержня departure_rod
        console.log('top disk is', top_disk)
        hanoi[destination_rod].unshift(top_disk) // кладём его сверху на стержень destination_rod
        console.log('result state is', JSON.stringify(hanoi))
    } else {
        console.log('move',  departure_rod, destination_rod, 'on', JSON.stringify(hanoi), 'is considered impossible')
    }
}

function solve_hanoi (N, departure_rod, destination_rod) {
    console.log('solve_hanoi for N = ', N, 'departure_rod = ', departure_rod, 'destination_rod = ', destination_rod)
    if (N == 1) {
        console.log('we are in the branch N == 1')
        // просто перекладываем один диск
        move(departure_rod, destination_rod);
    }
    // для всех N > 1
    else {
        console.log('we are in the branch N > 1')
        // определим, какой стержень остался для промежуточных действий,
        // учитывая указанные исходный и целевой стержни
        intermediate_rod = get_intermediate_rod(departure_rod, destination_rod)

        // перекладываем верхнюю пирамидку из 2 дисков на промежуточный стержень
        solve_hanoi(N - 1, departure_rod, intermediate_rod)
        
        // перекладываем самый большой диск на целевой стержень
        move(departure_rod, destination_rod)
        
        // пирамидку с промежуточного стержня перекладываем на целевой
        solve_hanoi(N - 1, intermediate_rod, destination_rod)
    }
}