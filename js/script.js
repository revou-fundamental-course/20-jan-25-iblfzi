// Fungsi validasi input angka dan panjang minimal 3 digit
function validateNumericInput(input) {
    let value = input.value.replace(/\D/g, ""); // Hanya angka

    if (value.length < 3) {
        input.setCustomValidity("Panjang nilai minimal 3 digit.");
    } else {
        input.setCustomValidity(""); // Menghapus pesan validasi jika valid
    }

    if (value.length > 3) {
        value = value.slice(0, 3); // Batasi maksimal 3 digit
    }

    input.value = value;
}

// Fungsi validasi input umur
function validateAgeInput(input) {
    let value = input.value.replace(/\D/g, ""); // Hanya angka

    if (value.length > 3) {
        value = value.slice(0, 3); // Batasi maksimal 3 digit
    }

    let age = parseInt(value, 10);

    if (age > 120) {
        alert("Usia tidak boleh lebih dari 120 tahun.");
        value = "120"; // Maksimal 120
    } else if (age < 1 && value !== "") {
        alert("Usia minimal adalah 1 tahun.");
        value = "1"; // Minimal 1
    }

    input.value = value;
}

// Fungsi untuk mengecek apakah semua input valid
function isFormValid() {
    const usia = document.getElementById("input-usia").value.trim();
    const beratBadan = document.getElementById("input-berat-badan").value.trim();
    const tinggiBadan = document.getElementById("input-tinggi-badan").value.trim();

    if (!usia || !beratBadan || !tinggiBadan) {
        alert("Semua kolom wajib diisi.");
        return false;
    }

    return true;
}

// Fungsi untuk menghitung BMI
function hitungBMI() {
    if (!isFormValid()) return; // Cek apakah formulir valid

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
document.getElementById("input-usia").addEventListener("input", function() {
    validateAgeInput(this);
});
document.getElementById("input-berat-badan").addEventListener("input", function() {
    validateNumericInput(this);
});
document.getElementById("input-tinggi-badan").addEventListener("input", function() {
    validateNumericInput(this);
});

// Menambahkan event listener untuk tombol hitung dan reset
document.getElementById("btn-hitung").addEventListener("click", hitungBMI);
document.getElementById("btn-reset").addEventListener("click", resetForm);
