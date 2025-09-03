// login page scripts

// Animasi masuk yang halus untuk halaman login
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    gsap.from(".login_container", { duration: 0.6, y: 16, opacity: 0, ease: "power2.out" });
    gsap.from(".login_form > *", { duration: 0.6, y: 8, opacity: 0, stagger: 0.08, delay: 0.05, ease: "power2.out" });
  }

  // Toggle show/hide password
  const toggle = document.querySelector(".toggle-password");
  const pwd = document.getElementById("password");
  if (toggle && pwd) {
    toggle.addEventListener("click", () => {
      const isPwd = pwd.type === "password";
      pwd.type = isPwd ? "text" : "password";
      toggle.classList.toggle("active", isPwd);
      toggle.setAttribute("aria-label", isPwd ? "Hide password" : "Show password");
      pwd.focus();
    });
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // validasi username dan password, bisa diganti sesuai keinginan
  if (username === "user" && password === "user") {
    Swal.fire({
      icon: "success",
      title: "Login berhasil!",
      text: "Selamat datang ayanggg",
      showConfirmButton: false,
      timer: 1500,
    }).then(function () {
      window.location.href = "birthday.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login gagal!",
      text: "Coba cek lagi username sama passwordnya ya :)",
      confirmButtonText: "Coba lagi",
      confirmButtonColor: "#ff7675",
    });
  }
}
