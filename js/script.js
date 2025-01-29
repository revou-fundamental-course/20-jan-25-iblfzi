// Fungsi validasi input
function validateInput(input) {
    const value = input.value;

    // Jika bukan angka atau panjang lebih dari 3 digit, hapus karakter terakhir
    if (!/^\d*$/.test(value) || value.length > 3) {
        input.value = value.slice(0, 3); // Potong hingga 3 digit
    }
}

// Fungsi untuk menghitung BMI
function hitungBMI() {
    const beratBadan = parseFloat(document.getElementById("input-berat-badan").value);
    const tinggiBadanCm = parseFloat(document.getElementById("input-tinggi-badan").value);
    const gender = document.getElementById("gender").value; // Mendapatkan jenis kelamin dari dropdown

    if (isNaN(beratBadan) || isNaN(tinggiBadanCm) || beratBadan <= 0 || tinggiBadanCm <= 0) {
        alert("Mohon masukkan berat badan dan tinggi badan yang valid.");
        return;
    }

    const tinggiBadanM = tinggiBadanCm / 100;
    const bmi = beratBadan / (tinggiBadanM * tinggiBadanM);

    let kategori, saran;

// Menentukan kategori BMI berdasarkan jenis kelamin
    if (bmi < 18.5) {
        kategori = "Kurus (Underweight)";
        saran = gender === 'laki-laki' ? "Disarankan untuk menambah berat badan dengan latihan beban." : "Disarankan untuk menambah berat badan dengan diet sehat.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        kategori = "Normal";
        saran = "Pertahankan berat badan Anda dengan gaya hidup sehat.";
    } else if (bmi >= 25 && bmi < 29.9) {
        kategori = "Berat badan berlebih (Overweight)";
        saran = gender === 'laki-laki' ? "Disarankan untuk menurunkan berat badan dengan kombinasi latihan kardio dan beban." : "Disarankan untuk menurunkan berat badan melalui diet dan olahraga teratur.";
    } else {
        kategori = "Obesitas";
        saran = gender === 'laki-laki' ? "Disarankan untuk menurunkan berat badan, terutama untuk kesehatan jantung." : "Disarankan untuk menurunkan berat badan agar mengurangi risiko penyakit terkait obesitas.";
    }

    document.getElementById("result-bmi").innerText = bmi.toFixed(1);
    document.querySelector(".result-section article p:last-child").innerText = `Kategori: ${kategori}\nSaran: ${saran}`;
}

// Fungsi reset formulir
function resetForm() {
    document.getElementById("input-berat-badan").value = "";
    document.getElementById("input-usia").value = "";
    document.getElementById("input-tinggi-badan").value = "";
    document.getElementById("gender").value = "laki-laki";  // Set default ke laki-laki

    document.getElementById("result-bmi").innerText = "0";
    document.querySelector(".result-section article p:last-child").innerText = "";
}

// Menambahkan event listener untuk validasi pada setiap input
document.getElementById("input-berat-badan").addEventListener("input", function() {
    validateInput(this);
});
document.getElementById("input-tinggi-badan").addEventListener("input", function() {
    validateInput(this);
});

// Menambahkan event listener untuk tombol hitung dan reset
document.getElementById("btn-hitung").addEventListener("click", hitungBMI);
document.getElementById("btn-reset").addEventListener("click", resetForm);
