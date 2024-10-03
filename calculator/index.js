const readline = require('readline-sync');

// Array untuk menyimpan riwayat hasil kalkulasi
let history = [];

function ProcessHasil(inputanPertama, inputanKedua, Operator) {
    switch (Operator) {
        case "+":
            return inputanPertama + inputanKedua;
        case "-":
            return inputanPertama - inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
        case "/":
            if (inputanKedua === 0) {
                return "Error: Angka kedua tidak boleh bernilai 0. Masukkan angka yang benar.";
            }
            return inputanPertama / inputanKedua;
        case "%":
            return inputanPertama % inputanKedua;
        default:
            return "Operator tidak dikenal";
    }
}

// Fungsi untuk menampilkan riwayat kalkulasi
function displayHistory() {
    if (history.length === 0) {
        console.log("Belum ada riwayat kalkulasi.");
    } else {
        console.log("Riwayat Kalkulasi:");
        history.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry}`);
        });
    }
}

while (true) {
    let usePreviousResult = false;
    let AngkaPertama;
    
    // Jika ada riwayat, tawarkan untuk menggunakan hasil kalkulasi sebelumnya
    if (history.length > 0) {
        const usePrevious = readline.question("Apakah ingin menggunakan hasil kalkulasi sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === 'y') {
            displayHistory();
            const resultChoice = parseInt(readline.question("Pilih nomor hasil yang ingin digunakan: ")) - 1;
            if (resultChoice >= 0 && resultChoice < history.length) {
                // Extract angka pertama dari riwayat
                const selectedHistory = history[resultChoice].split(' ')[2]; // Mengambil angka pertama dari riwayat
                AngkaPertama = parseFloat(selectedHistory);
                usePreviousResult = true;
            } else {
                console.log("Pilihan tidak valid, lanjutkan dengan angka baru.");
                usePreviousResult = false;
            }
        }
    }

    // Jika tidak menggunakan hasil sebelumnya, minta angka pertama
    if (!usePreviousResult) {
        AngkaPertama = parseFloat(readline.question("Masukan angka Pertama : "));
    }

    const Operator = readline.question("Pilih Operator (+, -, *, /, %) : ");
    let AngkaKedua = parseFloat(readline.question("Masukan Angka Kedua : "));

    const requiredOperator = ["+", "-", "*", "/", "%"];

    if (isNaN(AngkaPertama) || isNaN(AngkaKedua)) {
        console.log("Inputan Anda tidak valid.");
    } else if (!requiredOperator.includes(Operator)) {
        console.log("Pilih sesuai Operator yang tersedia.");
    } else {
        let hasil = ProcessHasil(AngkaPertama, AngkaKedua, Operator);
        
        // Jika pembagian dengan nol, minta input angka kedua yang baru
        while (hasil === "Error: Angka kedua tidak boleh bernilai 0. Masukkan angka yang benar.") {
            console.log(hasil);
            AngkaKedua = parseFloat(readline.question("Masukkan angka kedua yang baru: "));
            hasil = ProcessHasil(AngkaPertama, AngkaKedua, Operator);
        }

        console.log("Hasil:", hasil);

        // Simpan hasil ke dalam riwayat jika hasil valid
        if (typeof hasil === 'number') {
            // Tambahkan riwayat dengan format: AngkaPertama Operator AngkaKedua = Hasil
            history.push(`${AngkaPertama} ${Operator} ${AngkaKedua} = ${hasil}`);
        }
    }

    // Menanyakan apakah ingin menghentikan program
    const lanjut = readline.question("Apakah ingin melakukan perhitungan lagi? (y/n): ");
    if (lanjut.toLowerCase() !== 'y') {
        console.log("Terima kasih telah menggunakan kalkulator!");
        displayHistory(); // Tampilkan riwayat kalkulasi terakhir sebelum keluar
        break; // keluar dari perulangan
    }
}
