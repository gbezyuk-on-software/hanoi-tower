function is_move_possible (departure_rod_index, destination_rod_index) {
    // сами списки дисков на стержнях мы можем получить по их индексам
    departure_rod = hanoi[departure_rod_index]
    destination_rod = hanoi[destination_rod_index]

    // вот здесь добавляем ещё одну отладку:
    // console.log('is_move_possible debug information:')
    // console.log('departure_rod:', departure_rod)
    // console.log('departure_rod.length:', departure_rod.length)
    // console.log('destination_rod:', destination_rod)
    // console.log('destination_rod.length:', destination_rod.length)

    if (departure_rod.length == 0) {
        //console.log('move is impossible because the departure rod is empty')
        // если исходный стержень пуст, перекладывать нечего — ход запрещён
        return false;
    }
    // до этой точки в коде мы дойдём только если исходный стержень не пуст
    if (destination_rod.length == 0) {
        //console.log('move is possible because the destination rod is empty')
        // если целевой стержень пуст, а перекладывать есть что — ход вполне неплох!
        return true;
    }
    // до этой точки мы дойдём только если как исходный, так и целевой стержни не пусты
    // ход возможен, если на целевом стержне верхний диск больше (по номеру), чем на исходном
    //console.log('move is', destination_rod[0] > departure_rod[0] ? 'possible' : 'impossible',
    //            'because destination_rod[0] > departure_rod[0] is', destination_rod[0] > departure_rod[0])
    return destination_rod[0] > departure_rod[0];
}

function get_intermediate_rod_index (departure_rod_index, destination_rod_index) {
    // console.log('we are now inside get_intermediate_rod_index with params', departure_rod_index, destination_rod_index)

    // исходный массив стержней — просто три цифры
    all_rods_indexes = [0, 1, 2]
    // console.log('all_rods_indexes', all_rods_indexes)
    
    // отфильтруем departure_rod встроенной функцией
    rod_indexess_without_departure = all_rods_indexes.filter(function (rod_index) { return rod_index != departure_rod_index })
    // console.log('rod_indexess_without_departure', rod_indexess_without_departure)
    
    // отфильтруем destination_rod встроенной функцией
    only_one_rod_index_left = rod_indexess_without_departure.filter(function (rod_index) { return rod_index != destination_rod_index })
    // console.log('only_one_rod_index_left', only_one_rod_index_left)
    
    // в all_rods должен к этому моменту остаться только один элемент,
    // его и вернём как номер промежуточного стержня:
    // console.log('expected to be returned:', only_one_rod_index_left[0])
    return only_one_rod_index_left[0]
}

function move (departure_rod_index, destination_rod_index) {
    // действия по перекладыванию диска будем выполнять только если это разрешено правилами
    if (is_move_possible(departure_rod_index, destination_rod_index)) {
        console.log('moving from',  departure_rod_index, 'to', destination_rod_index, 'on state', JSON.stringify(hanoi))
        top_disk = hanoi[departure_rod_index].shift() // снимаем диск сверху со стержня departure_rod
        console.log('top disk is', top_disk)
        hanoi[destination_rod_index].unshift(top_disk) // кладём его сверху на стержень destination_rod
        console.log('result state is', JSON.stringify(hanoi))
    } else {
        console.log('move',  departure_rod_index, destination_rod_index, 'on', JSON.stringify(hanoi), 'is considered impossible')
    }
}

function solve_hanoi (N, departure_rod_index, destination_rod_index) {
    console.log('solve_hanoi for N = ', N, 'departure_rod_index = ',
                departure_rod_index, 'destination_rod_index = ', destination_rod_index)
    if (N == 1) {
        console.log('we are in the branch N == 1')
        // просто перекладываем один диск
        move(departure_rod_index, destination_rod_index);
    }
    // для всех N > 1
    else {
        console.log('we are in the branch N > 1')
        // определим, какой стержень остался для промежуточных действий,
        // учитывая указанные исходный и целевой стержни
        // ВОТ ЗДЕСЬ добавилось ключевое слово var
        var intermediate_rod_index = get_intermediate_rod_index(departure_rod_index, destination_rod_index)

        // перекладываем верхнюю пирамидку из 2 дисков на промежуточный стержень
        solve_hanoi(N - 1, departure_rod_index, intermediate_rod_index)
        
        // перекладываем самый большой диск на целевой стержень
        move(departure_rod_index, destination_rod_index)
        
        // пирамидку с промежуточного стержня перекладываем на целевой
        solve_hanoi(N - 1, intermediate_rod_index, destination_rod_index)
    }
}
