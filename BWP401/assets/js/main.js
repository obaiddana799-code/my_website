// بيانات الفعاليات
const eventsData = [
    {
        id: 1,
        title: "مساحة حوار: القراءة اليوم",
        category: "ثقافة",
        date: "2026-10-18",
        dateLabel: "18 تشرين الأول 2026",
        place: "لقاء افتراضي",
        image: "assets/img/culture.svg",
        description: "لقاء مفتوح لتبادل الكتب والأفكار وتجارب القراءة، مع مساحة للنقاش حول دور القراءة في تطوير المعرفة والخيال.",
        time: "18:00",
        icon: "📚",
        gallery: [
            "assets/img/culture1.jpg",
            "assets/img/culture2.jpg",
            "assets/img/culture3.jpg"
        ]
    },
    {
        id: 2,
        title: "ورشة أساسيات تطوير الويب",
        category: "تقنية",
        date: "2026-10-20",
        dateLabel: "20 تشرين الأول 2026",
        place: "مخبر افتراضي",
        image: "assets/img/tech.svg",
        description: "ورشة تعليمية مبسطة للتعرّف إلى HTML لبناء الصفحات، وCSS لتنسيقها، وJavaScript لإضافة التفاعل. لا تحتاج الورشة إلى خبرة سابقة.",
        time: "17:00",
        icon: "💻",
        gallery: [
            "assets/img/tech1.jpg",
            "assets/img/tech2.jpg",
            "assets/img/tech3.jpg"
        ],
    },
    {
        id: 3,
        title: "تحدّي الحركة والنشاط",
        category: "رياضة",
        date: "2026-10-23",
        dateLabel: "23 تشرين الأول 2026",
        place: "عن بُعد",
        image: "assets/img/sport.svg",
        description: "نشاط طلابي يشجّع على الحركة اليومية والعادات الصحية من خلال تحديات خفيفة قابلة للتطبيق في المنزل.",
        time: "16:30",
        icon: "⚽",
        gallery: [
            "assets/img/sport1.jpg",
            "assets/img/sport2.jpg",
            "assets/img/sport3.jpg"
        ]
    },
    {
        id: 4,
        title: "أمسية مواهب طلابية",
        category: "موسيقى",
        date: "2026-11-02",
        dateLabel: "2 تشرين الثاني 2026",
        place: "قاعة افتراضية",
        image: "assets/img/music.svg",
        description: "منصة ودية لعرض المواهب الموسيقية والفنية للطلاب والتعرّف إلى تجاربهم الإبداعية.",
        time: "19:00",
        icon: "🎵",
        gallery: [
            "assets/img/music1.jpg",
            "assets/img/music2.jpg",
            "assets/img/music3.jpg"
        ]
    },
    {
        id: 5,
        title: "مبادرة أثر طيب",
        category: "عائلي",
        date: "2026-11-08",
        dateLabel: "8 تشرين الثاني 2026",
        place: "نشاط مجتمعي",
        image: "assets/img/community.svg",
        description: "مبادرة تطوعية تشجّع على التعاون وتقديم أفكار عملية صغيرة ذات أثر إيجابي في المجتمع.",
        time: "11:00",
        icon: "🌿",
        gallery: [
            "assets/img/community1.jpg",
            "assets/img/community2.jpg",
            "assets/img/community3.jpg"
        ]
    },
    {
        id: 6,
        title: "لقاء المسارات المهنية",
        category: "تقنية",
        date: "2026-11-12",
        dateLabel: "12 تشرين الثاني 2026",
        place: "لقاء افتراضي",
        image: "assets/img/tech.svg",
        description: "حوار حول المهارات الرقمية والمسارات المهنية، وكيفية بناء خطة تعلم وتطوير مهارات قابلة للتطبيق.",
        time: "18:30",
        icon: "🧭",
        gallery: [
            "assets/img/career1.jpg",
            "assets/img/career2.jpg",
            "assets/img/career3.jpg"
        ]
    }
];

// تنسيق شارات التصنيفات
const categoryClass = {
    "ثقافة": "badge-culture",
    "تقنية": "badge-tech",
    "رياضة": "badge-sport",
    "موسيقى": "badge-art",
    "عائلي": "badge-community"
};

// قراءة قائمة المفضلة
function getFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("dalil-favorites") || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

// التحقق مما إذا كانت الفعالية ضمن المفضلة
function isFavorite(id) {
    return getFavorites().includes(Number(id));
}

// إضافة الفعالية إلى المفضلة أو إزالتها
function toggleFavorite(id) {
    let favorites = getFavorites();
    id = Number(id);

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem(
        "dalil-favorites",
        JSON.stringify(favorites)
    );

    // تحديث جميع أزرار المفضلة الظاهرة
    document.querySelectorAll(".favorite-btn").forEach(btn => {
        const active = isFavorite(btn.dataset.id);

        btn.classList.toggle("is-favorite", active);
        btn.textContent = active ? "♥" : "♡";
        btn.setAttribute("aria-pressed", String(active));
    });

    // إعادة عرض الصفحة عند فتح قائمة المفضلة
    if (
        new URLSearchParams(location.search).get("view") === "favorites"
    ) {
        setupEventsPage();
    }
}

// إنشاء بطاقة الفعالية
function eventCard(ev) {
    const images = ev.gallery || [ev.image];

    return `
        <div class="col-md-6 col-lg-4 event-result"
             data-category="${ev.category}"
             data-date="${ev.date}">

            <article class="event-card h-100 position-relative">
                <button
                    type="button"
                    class="favorite-btn ${isFavorite(ev.id) ? "is-favorite" : ""}"
                    data-id="${ev.id}"
                    aria-label="إضافة أو إزالة من المفضلة"
                    aria-pressed="${isFavorite(ev.id)}"
                    title="إضافة أو إزالة من المفضلة"
                >${isFavorite(ev.id) ? "♥" : "♡"}</button>

                <div class="event-gallery ${ev.gallery && ev.gallery.length ? "has-gallery" : ""}">
                    <img
                        src="${ev.image}"
                        alt="${ev.title}"
                        class="original-image"
                        loading="lazy"
                    >

                    ${(ev.gallery || []).map((src, index) => `
                        <img
                            src="${src}"
                            alt="${ev.title} - صورة ${index + 1}"
                            class="hover-image"
                            loading="lazy"
                        >
                    `).join("")}
                </div>

                <div class="card-body d-flex flex-column">
                    <span class="badge ${categoryClass[ev.category] || ""}">
                        ${ev.category}
                    </span>

                    <h3>${ev.title}</h3>
                    <p>${ev.description}</p>

                    <div class="event-meta mt-auto">
                        📅 ${ev.dateLabel}<br>
                        📍 ${ev.place}
                    </div>

                    <a class="text-link mt-3"
                       href="event.html?id=${ev.id}">
                        التفاصيل ←
                    </a>
                </div>
            </article>
        </div>
    `;
}
// إعداد صفحة الفعاليات
function setupEventsPage() {
    const grid = document.getElementById("eventsGrid");

    if (!grid) return;

    const search = document.getElementById("searchInput");
    const cat = document.getElementById("categoryFilter");
    const date = document.getElementById("dateFilter");

    const params = new URLSearchParams(location.search);

    if (params.has("category")) {
        cat.value = params.get("category");
    }

    // تطبيق البحث والتصفية
    function render() {
        const q = search.value.trim().toLowerCase();

        const favoritesOnly =
            new URLSearchParams(location.search).get("view")
            === "favorites";

        const chosen = eventsData.filter(event =>
            (!favoritesOnly || isFavorite(event.id)) &&
            (
                !q ||
                (
                    event.title + " " +
                    event.place + " " +
                    event.description
                ).toLowerCase().includes(q)
            ) &&
            (!cat.value || event.category === cat.value) &&
            (!date.value || event.date.startsWith(date.value))
        );

        grid.innerHTML = chosen.map(eventCard).join("");

        document.getElementById("resultsCount").textContent =
            `عدد النتائج: ${chosen.length}`;

        document.getElementById("emptyState").classList.toggle(
            "d-none",
            chosen.length !== 0
        );
    }

    // تحديث النتائج عند تغيير الفلاتر
    [search, cat, date].forEach(element => {
        element.addEventListener("input", render);
    });

    // مسح الفلاتر
    document.getElementById("clearFilters").addEventListener(
        "click",
        () => {
            search.value = "";
            cat.value = "";
            date.value = "";

            render();
        }
    );

    render();
}

function setupEventDetail() {
    const root = document.getElementById("eventDetail");

    if (!root) return;

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id")) || 1;

    const ev = eventsData.find(event => event.id === id)
        || eventsData[0];

    // عرض صور الفعالية وتفاصيلها
    root.innerHTML = `
        <div class="row g-5 align-items-start">
            <div class="col-lg-7">

                <div class="event-gallery ${
                    ev.gallery && ev.gallery.length
                        ? "has-gallery"
                        : ""
                }">
                    <img
                        src="${ev.image}"
                        alt="${ev.title}"
                        class="original-image"
                    >

                    ${(ev.gallery || []).map((src, index) => `
                        <img
                            src="${src}"
                            alt="${ev.title} - صورة ${index + 1}"
                            class="hover-image"
                        >
                    `).join("")}
                </div>

                <div class="mt-4">
                    <span class="badge ${
                        categoryClass[ev.category] || ""
                    }">
                        ${ev.category}
                    </span>

                    <h1 class="mt-3">${ev.title}</h1>
                    <p class="lead">${ev.description}</p>

                    <div class="d-flex gap-2 flex-wrap">
                        <button
                            class="btn btn-accent"
                            id="calendarBtn"
                        >
                            أضف إلى التقويم
                        </button>

                        <button
                            class="btn btn-outline-secondary"
                            id="shareBtn"
                        >
                            شارك الفعالية
                        </button>
                    </div>

                    <div
                        id="detailMessage"
                        class="small mt-3"
                        aria-live="polite"
                    ></div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="info-card event-facts">
                    <h2>معلومات الفعالية</h2>

                    <p>📅 <strong>التاريخ:</strong> ${ev.dateLabel}</p>
                    <p>🕒 <strong>الوقت:</strong> ${ev.time}</p>
                    <p>📍 <strong>المكان:</strong> ${ev.place}</p>
                </div>
            </div>
        </div>
    `;

    // تجهيز ملف التقويم للتنزيل
    document.getElementById("calendarBtn").addEventListener(
        "click",
        () => {
            const start =
                ev.date.replaceAll("-", "") +
                "T" +
                ev.time.replace(":", "") +
                "00";

            const end =
                ev.date.replaceAll("-", "") +
                "T" +
                String(Number(ev.time.slice(0, 2)) + 1)
                    .padStart(2, "0") +
                ev.time.slice(3) +
                "00";

            const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${ev.title}
DTSTART:${start}
DTEND:${end}
LOCATION:${ev.place}
DESCRIPTION:${ev.description}
END:VEVENT
END:VCALENDAR`;

            const blob = new Blob(
                [ics],
                { type: "text/calendar;charset=utf-8" }
            );

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.href = url;
            a.download = `event-${ev.id}.ics`;
            a.click();

            URL.revokeObjectURL(url);

            document.getElementById("detailMessage").textContent =
                "تم تجهيز ملف التقويم للتنزيل.";
        }
    );

    // مشاركة الفعالية أو نسخ رابطها
    document.getElementById("shareBtn").addEventListener(
        "click",
        async () => {
            const data = {
                title: ev.title,
                text: `${ev.title} - ${ev.dateLabel}`,
                url: location.href
            };

            const message =
                document.getElementById("detailMessage");

            try {
                if (navigator.share) {
                    await navigator.share(data);
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(location.href);
                    message.textContent = "تم نسخ رابط الفعالية.";
                } else {
                    message.textContent =
                        "انسخ رابط الصفحة من شريط العنوان لمشاركته.";
                }
            } catch (error) {
                message.textContent =
                    "يمكنك نسخ رابط الصفحة ومشاركته.";
            }
        }
    );

    // عرض فعاليات أخرى مقترحة
    const related = eventsData
        .filter(event =>
            event.id !== ev.id &&
            event.category === ev.category
        )
        .concat(
            eventsData.filter(event =>
                event.id !== ev.id &&
                event.category !== ev.category
            )
        )
        .slice(0, 3);

    document.getElementById("relatedEvents").innerHTML =
        related.map(eventCard).join("");
}


// إعداد نموذج التواصل
function setupContactForm() {
    const form = document.getElementById("contactForm");

    if (!form) return;

    const alert = document.getElementById("formAlert");

    form.addEventListener("submit", event => {
        // منع إرسال النموذج بالطريقة الافتراضية
        event.preventDefault();

        // تفعيل إظهار أخطاء التحقق من الحقول
        form.classList.add("was-validated");

        // التحقق من صحة البيانات
        if (!form.checkValidity()) {
            alert.className = "alert alert-danger";
            alert.textContent =
                "تعذّر الإرسال: يرجى التأكد من تعبئة الحقول وصحة البريد الإلكتروني.";

            alert.classList.remove("d-none");
            return;
        }

        // عرض رسالة نجاح التحقق
        alert.className = "alert alert-success";
        alert.textContent =
            "تم التحقق من البيانات بنجاح!";

        alert.classList.remove("d-none");

        // تفريغ الحقول بعد نجاح التحقق
        form.reset();
        form.classList.remove("was-validated");
    });
}


// إعداد الوضع الليلي
function setupTheme() {
    const btn = document.getElementById("themeToggle");

    if (!btn) return;

    // استعادة الوضع المحفوظ سابقاً
    const savedTheme = localStorage.getItem("dalil-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // التبديل بين الوضع الفاتح والداكن
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const currentTheme =
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light";

        // حفظ اختيار المستخدم
        localStorage.setItem("dalil-theme", currentTheme);
    });
}


function setupFeaturedSlider() {
    const root = document.getElementById("featuredEvents");
    if (!root) return;

    const slides = [...root.children];
    if (slides.length < 2) return;

    const section = root.closest(".section-block");
    let active = 0;
    let timer = null;

    root.classList.add("featured-slider-row");

    slides.forEach((slide, index) => {
        const card = slide.querySelector(".featured-card");

        if (card) {
            card.setAttribute("aria-roledescription", "slide");
            card.setAttribute(
                "aria-label",
                `الفعالية ${index + 1} من ${slides.length}`
            );
        }
    });

    // إنشاء مؤشرات السلايدر تلقائياً
    const indicators = document.createElement("div");
    indicators.className = "featured-indicators";
    indicators.setAttribute("aria-label", "اختيار الفعالية البارزة");

    slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `عرض الفعالية ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            restartTimer();
        });

        indicators.appendChild(dot);
    });

    root.after(indicators);

    function showSlide(index) {
        active = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const isActive = i === active;

            slide.classList.toggle("featured-hidden", !isActive);
            slide.classList.toggle("featured-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        [...indicators.children].forEach((dot, i) => {
            dot.classList.toggle("active", i === active);

            if (i === active) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(() => {
            showSlide(active + 1);
        }, 3300);
    }

    function restartTimer() {
        startTimer();
    }

    document.getElementById("nextFeatured")?.addEventListener("click", () => {
        showSlide(active + 1);
        restartTimer();
    });

    document.getElementById("prevFeatured")?.addEventListener("click", () => {
        showSlide(active - 1);
        restartTimer();
    });

    // إيقاف الحركة أثناء تفاعل المستخدم مع القسم
    if (section) {
        section.addEventListener("mouseenter", stopTimer);
        section.addEventListener("mouseleave", startTimer);
        section.addEventListener("focusin", stopTimer);

        section.addEventListener("focusout", (event) => {
            if (!section.contains(event.relatedTarget)) {
                startTimer();
            }
        });
    }

    showSlide(0);
    startTimer();
}
document.addEventListener("DOMContentLoaded", () => {
    setupEventsPage();
    setupEventDetail();
    setupContactForm();
    setupTheme();
    setupFeaturedSlider();
});
// تبديل صور الفعالية عند تمرير المؤشر
document.addEventListener("mouseover", function (e) {
    const card = e.target.closest(".event-gallery");

    if (!card || card.contains(e.relatedTarget)) return;

    const images = card.querySelectorAll(".hover-image");

    if (!images.length) return;

    let current = 0;

    images.forEach(img => img.classList.remove("active"));
    images[current].classList.add("active");

    if (card.sliderTimer) clearInterval(card.sliderTimer);

    card.sliderTimer = setInterval(() => {
        images[current].classList.remove("active");
        current = (current + 1) % images.length;
        images[current].classList.add("active");
    }, 900);
});

document.addEventListener("mouseout", function (e) {
    const card = e.target.closest(".event-gallery");

    if (!card || card.contains(e.relatedTarget)) return;

    if (card.sliderTimer) {
        clearInterval(card.sliderTimer);
        card.sliderTimer = null;
    }

    card.querySelectorAll(".hover-image").forEach(img => {
        img.classList.remove("active");
    });
});
// زر العودة إلى أعلى الصفحة
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
// معالجة الضغط على زر المفضلة
document.addEventListener("click", function (e) {
    const button = e.target.closest(".favorite-btn");

    if (!button) return;

    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(button.dataset.id);
});