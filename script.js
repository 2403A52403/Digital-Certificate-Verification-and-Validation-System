
const sampleCertificates = [
    {
        id: "CERT2026001",
        name: "Rahul Kumar",
        course: "Computer Science",
        institution: "ABC College",
        date: "2026-01-10",
        status: "Valid"
    },
    {
        id: "CERT2026002",
        name: "Priya Sharma",
        course: "Web Development",
        institution: "XYZ College",
        date: "2026-02-15",
        status: "Valid"
    }
];

function getCertificates() {
    const saved = localStorage.getItem("certificates");

    if (saved !== null) {
        try {
            const data = JSON.parse(saved);
            return Array.isArray(data) ? data : sampleCertificates;
        } catch {
            return sampleCertificates;
        }
    }

    localStorage.setItem(
        "certificates",
        JSON.stringify(sampleCertificates)
    );

    return sampleCertificates;
}

function verifyCertificate() {

    const id = document.getElementById("certificateId")
        .value.trim().toUpperCase();

    const result = document.getElementById("result");

    if (id === "") {
        result.innerHTML = "Please enter Certificate ID.";
        result.style.background = "#ffe4e4";
        result.style.padding = "20px";
        return;
    }

    const certificates = getCertificates();

    const certificate = certificates.find(
        cert => cert.id.toUpperCase() === id
    );

    result.style.padding = "20px";
    result.style.borderRadius = "10px";

    if (!certificate) {
        result.style.background = "#ffe4e4";
        result.style.color = "#a00000";
        result.innerHTML = `
            <h3>✗ Invalid Certificate</h3>
            <p>Certificate not found in our records.</p>
        `;
        return;
    }

    if (certificate.status !== "Valid") {
        result.style.background = "#fff0dd";
        result.style.color = "#925400";
        result.innerHTML = `
            <h3>⚠ Certificate Revoked</h3>
            <p>This certificate is no longer valid.</p>
        `;
        return;
    }

    result.style.background = "#d9f8e5";
    result.style.color = "#126337";

    result.innerHTML = `
        <h3>✓ Certificate Verified Successfully!</h3>
        <p><b>Certificate ID:</b> ${escapeHTML(certificate.id)}</p>
        <p><b>Student Name:</b> ${escapeHTML(certificate.name)}</p>
        <p><b>Course:</b> ${escapeHTML(certificate.course)}</p>
        <p><b>Institution:</b> ${escapeHTML(certificate.institution)}</p>
        <p><b>Issue Date:</b> ${escapeHTML(certificate.date)}</p>
        <p><b>Status:</b> VALID</p>
    `;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}
