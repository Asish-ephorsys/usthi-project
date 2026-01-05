document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ contactForm not found in DOM");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            const response = fetch("http://localhost:8000/contacts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showPopup(
                    "✅ Thank you for contacting Ephorsys!<br>We’ve received your details and will get back to you shortly.",
                    "green"
                );
                form.reset();
            } else {
                const errorText = await response.text();
                console.error("Backend error:", errorText);
                showPopup("❌ Something went wrong.", "red");
            }
        } catch (error) {
            console.error("Network error:", error);
            showPopup("⚠️ Failed to connect to the server.", "red");
        }
    });

});
