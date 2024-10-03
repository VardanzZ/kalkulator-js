const readline = require("readline-sync");

let ulangi = true;
let history = []; // Menyimpan riwayat kalkulasi
let previousResult = null; // Menyimpan hasil kalkulasi terakhir

while (ulangi) {
    let angkaPertama = previousResult !== null ? previousResult : readline.question("Masukkan Angka Pertama: ");
    
    // Cek jika hasil sebelumnya digunakan
    if (previousResult !== null) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === "y") {
            angkaPertama = previousResult;
        } else {
            angkaPertama = readline.question("Masukkan Angka Pertama: ");
        }
    }

    const operator = readline.question("Pilih operator (+, -, *, /, %): ");
    let angkaKedua = readline.question("Masukkan Angka Kedua: ");

    const requiredOperator = ["+", "-", "*", "/", "%"];

    // Validasi input
    if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
        console.log("Inputan anda tidak valid");
    } else if (!requiredOperator.includes(operator)) {
        console.log("Pilih sesuai operator yang tersedia");
    } else {
        // Memastikan angkaKedua adalah angka sebelum digunakan
        angkaKedua = parseFloat(angkaKedua);

        // Penanganan untuk pembagian
        if (operator === "/" && angkaKedua === 0) {
            console.log("Angka kedua tidak boleh 0. Silakan masukkan angka kedua lagi.");
            angkaKedua = readline.question("Masukkan Angka Kedua: ");
            angkaKedua = parseFloat(angkaKedua); // Mengkonversi input baru ke angka
        }

        const hasil = processHasil(parseFloat(angkaPertama), operator, angkaKedua);
        if (typeof hasil === "string") {
            console.log(hasil); // Tampilkan pesan kesalahan jika ada
        } else {
            console.log(`Hasil: ${hasil}`);
            previousResult = hasil; // Simpan hasil untuk kalkulasi berikutnya
            history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`); // Simpan riwayat
        }
    }

    const ulang = readline.question("Apakah ingin mengulang? (y/n): ");
    if (ulang.toLowerCase() === "n") {
        ulangi = false;
        console.log("Riwayat Kalkulasi:");
        showHistory();
    }
}

function processHasil(angkaPertama, operator, angkaKedua) {
    switch (operator) {
        case "+":
            return angkaPertama + angkaKedua;
        case "-":
            return angkaPertama - angkaKedua;
        case "*":
            return angkaPertama * angkaKedua;
        case "/":
            return angkaPertama / angkaKedua; // Pembagian tidak lagi menangani 0 di sini
        case "%":
            return angkaPertama % angkaKedua;
        default:
            return "Operator tidak dikenali.";
    }
}

function showHistory() {
    if (history.length === 0) {
        console.log("Tidak ada riwayat kalkulasi.");
    } else {
        history.forEach((entry, index) => {
            console.log(`${index + 1}: ${entry}`);
        });
    }
}