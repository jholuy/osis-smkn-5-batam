// Navbar
window.onscroll = function () {
    let navbar = document.querySelector(".navbar");
    let osisInfo = document.querySelector("#osis-info");
    let stickyPoint = osisInfo.getBoundingClientRect().bottom + window.scrollY;

    // Cek lebar layar. Jika lebih besar dari atau sama dengan 768px (ukuran umum tablet/desktop), maka jalankan logika sticky navbar
    if (window.innerWidth >= 768) {  // Atau gunakan media query breakpoint yang sesuai di CSS Anda
        if (window.pageYOffset >= stickyPoint) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    } else {
        // Jika di mobile (lebar layar kurang dari 768px), pastikan navbar tidak memiliki kelas 'sticky'
        navbar.classList.remove('sticky');
    }
};

// Mendapatkan elemen tombol dan navbar
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const navMenu = document.getElementById('mobile-navbar');
const body = document.body;

// Event listener untuk membuka menu (tombol hamburger)
menuOpenButton.addEventListener('click', () => {
    navMenu.classList.add('active'); // Menampilkan navbar
    body.classList.add('show-mobile-menu'); // Menambahkan efek blur di body
    menuOpenButton.classList.add('hidden'); // Menyembunyikan tombol hamburger
});

// Event listener untuk menutup menu (tombol close)
menuCloseButton.addEventListener('click', () => {
    navMenu.classList.remove('active'); // Menyembunyikan navbar
    body.classList.remove('show-mobile-menu'); // Menghilangkan efek blur
    menuOpenButton.classList.remove('hidden'); // Menampilkan kembali tombol hamburger
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Jika scroll lebih dari 50px
            menuIcon.classList.add("show");
        } else {
            menuIcon.classList.remove("show");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Ambil semua elemen dengan class "submenu-container"
    document.querySelectorAll(".submenu-container").forEach(container => {
        const structureLink = container.querySelector(".nav-links"); // Link "Structure"
        const arrow = container.querySelector(".arrow"); // Panah
        const submenu = container.querySelector(".submenu"); // Submenu

        // Event saat klik "Structure" → Navigasi tanpa buka submenu
        structureLink.addEventListener("click", function (event) {
            event.preventDefault(); // Hindari scroll instan
            window.location.href = "#structure"; // Arahkan ke struktur
        });

        // Event saat klik panah → Toggle submenu
        arrow.addEventListener("click", function (event) {
            event.stopPropagation(); // Hindari trigger event pada "Structure"

            // Tutup semua submenu lain sebelum buka yang baru
            document.querySelectorAll(".submenu").forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove("open");
                    menu.style.maxHeight = "0";
                }
            });

            // Reset semua panah ke posisi awal
            document.querySelectorAll(".arrow").forEach(a => {
                if (a !== arrow) a.classList.remove("down");
            });

            // Toggle submenu yang ditekan
            const isOpen = submenu.classList.contains("open");
            if (!isOpen) {
                submenu.classList.add("open");
                submenu.style.maxHeight = submenu.scrollHeight + "px"; // Atur tinggi submenu otomatis
                arrow.classList.add("down"); // Rotasi panah
            } else {
                submenu.classList.remove("open");
                submenu.style.maxHeight = "0";
                arrow.classList.remove("down"); // Reset panah
            }
        });
    });
});

// slide image
function moveSlide(step) {
    let slides = document.querySelectorAll(".slider-image");
    let slider = document.querySelector(".slider");

    if (!slides.length || !slider) return; // Cegah error jika elemen tidak ada

    slideIndex += step;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slider.style.transform = `translateX(${-slideIndex * 100}%)`;
}

// Function untuk animasi angka
function animateNumber(element, endValue) {
    let startValue = 0;
    let startTime = null;

    function updateNumber(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let duration = 1000; // Durasi animasi (1 detik)
        let value = Math.min((progress / duration) * endValue, endValue);

        element.textContent = Math.floor(value);

        if (value < endValue) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Function cek apakah elemen ada dalam viewport
function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Tracking scroll untuk reset animasi
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    let angkatanElement = document.getElementById('angkatan');
    let angkatanSelanjutnyaElement = document.getElementById('angkatan-selanjutnya');
    let purnaElement = document.getElementById('purna');

    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Reset angka ke 0 jika user scroll ke atas
    if (currentScrollTop <= lastScrollTop) {
        angkatanElement.textContent = "0";
        angkatanSelanjutnyaElement.textContent = "0";
        purnaElement.textContent = "0";
    }

    // Mulai animasi angka jika elemen terlihat di viewport
    if (isInViewport(angkatanElement) && angkatanElement.textContent === "0") {
        animateNumber(angkatanElement, 15);
    }
    if (isInViewport(angkatanSelanjutnyaElement) && angkatanSelanjutnyaElement.textContent === "0") {
        animateNumber(angkatanSelanjutnyaElement, 16);
    }
    if (isInViewport(purnaElement) && purnaElement.textContent === "0") {
        animateNumber(purnaElement, 14);
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

// Event klik untuk membuka tab baru dengan daftar angkatan
document.getElementById('purna-box').addEventListener('click', function() {
    window.open("angkatan.html", "_blank"); // Ganti dengan halaman yang berisi struktur angkatan
});


window.onload = function () {
    // Data event
    const events = [
        { name: 'HARDIKNAS (Hari Pendidikan Nasional)', date: new Date(2025, 4, 5) },
        { name: 'DIES NATALIS', date: new Date(2025, 4, 6) },
    ];

    // Menghapus event yang sudah ada di status tertentu
    function clearStatus(status) {
        const container = document.getElementById(status);
        container.innerHTML = ''; // Hapus semua event di status tertentu
    }

    // Fungsi untuk menambah event
    function addEvent(event) {
        const today = new Date();
        const statusContainer = document.getElementById(event.status);
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        const eventDateFormatted = `${event.date.getDate()} ${event.date.toLocaleString('default', { month: 'long' })} ${event.date.getFullYear()}`;

        eventElement.innerHTML = `
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">${eventDateFormatted}</p>
            <p class="event-status ${event.status}">${event.status}</p>
        `;

        statusContainer.appendChild(eventElement);
    }

    // Menambahkan event berdasarkan status
    function updateEventStatuses() {
        clearStatus('coming-soon');
        clearStatus('ongoing');
        clearStatus('finished');
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset jam ke 00:00 untuk perbandingan yang akurat
    
        events.forEach(event => {
            let eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0); 
    
            if (eventDate > today) {
                event.status = 'coming-soon';
            } else if (eventDate.getTime() === today.getTime()) {
                event.status = 'ongoing';
            } else {
                event.status = 'finished';
            }
    
            addEvent(event);
        });
    }    

    // Menambahkan event dinamis
    function addNewEvent(name, date) {
        const newEvent = { name, date };
        events.push(newEvent); // Masukkan event baru ke array
        updateEventStatuses(); // Update semua status event setelah event baru ditambahkan
    }

    // Menambahkan event pertama kali
    updateEventStatuses();

    // dibawah ini untuk nambahin event tanpa harus HTML
    // addNewEvent('Event Name 4', new Date(2025, 1, 15));
    // addNewEvent('Event Name 5', new Date());
}

// Set tahun otomatis footer
document.getElementById("year").textContent = new Date().getFullYear();