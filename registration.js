// =============================
// REGISTRATION FORM
// =============================

const form = document.getElementById("registrationForm");
const submitBtn = document.querySelector(".submit-btn");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <span class="loader"></span>
            Submitting...
        `;

        try {

            const response = await fetch(form.action, {

                method: "POST",

                body: new FormData(form),

                headers: {
                    Accept: "application/json"
                }

            });

            if (response.ok) {

                submitBtn.innerHTML = "✓ Registration Submitted";

                submitBtn.style.background =
                    "linear-gradient(135deg,#10B981,#059669)";

                form.reset();

                setTimeout(() => {

                    submitBtn.disabled = false;

                    submitBtn.innerHTML = originalText;

                    submitBtn.style.background = "";

                }, 4000);

            } else {

                throw new Error();

            }

        } catch (error) {

            submitBtn.innerHTML = "Submission Failed";

            submitBtn.style.background =
                "linear-gradient(135deg,#EF4444,#DC2626)";

            setTimeout(() => {

                submitBtn.disabled = false;

                submitBtn.innerHTML = originalText;

                submitBtn.style.background = "";

            }, 4000);

        }

    });

}

// =============================
// SCROLL ANIMATION
// =============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: .15
});

document.querySelectorAll(".form-group,.info-card").forEach(el => {

    el.classList.add("hidden-item");

    observer.observe(el);

});

function setupOther(selectId, inputId) {

    const select = document.getElementById(selectId);

    const input = document.getElementById(inputId);

    if (!select || !input) return;

    select.addEventListener("change", () => {

        if (select.value === "Other") {

            input.style.display = "block";

            input.required = true;

        } else {

            input.style.display = "none";

            input.required = false;

            input.value = "";

        }

    });

}

setupOther("coachingLevel", "coachingLevelOther");
setupOther("country", "countryOther");
setupOther("education", "educationOther");
setupOther("referral", "referralOther");