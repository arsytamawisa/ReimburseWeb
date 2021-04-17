export function convert_to_rupiah(number) {
    var number_string = number.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return `Rp. ${rupiah},-`
}

export function convert_to_money(number) {
    var number_string = number.toString(),
        sisa = number_string.length % 3,
        money = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        var separator = sisa ? '.' : '';
        money += separator + ribuan.join('.');
    }
    return money
}

export function convert_date_format(date) {
    var parts = date.split("-")
    let tahun = parts[0]
    let bulan = parts[1]
    let tanggal = parts[2]

    switch (bulan) {
        case "01":
            bulan = "Januari"
            break;
        case "02":
            bulan = "Februari"
            break;
        case "03":
            bulan = "Maret"
            break;
        case "04":
            bulan = "April"
            break;
        case "05":
            bulan = "Mei"
            break;
        case "06":
            bulan = "Juni"
            break;
        case "07":
            bulan = "Juli"
            break;
        case "08":
            bulan = "Agustus"
            break;
        case "09":
            bulan = "September"
            break;
        case "10":
            bulan = "Oktober"
            break;
        case "11":
            bulan = "November"
            break;
        case "12":
            bulan = "Desember"
            break;
        default:
            break;
    }

    return `${tanggal} ${bulan} ${tahun}`
}