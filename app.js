/* ===== À MODIFIER : vos vraies coordonnées (valables pour toutes les pages) ===== */
const CONFIG = {
  whatsapp: "243832049572",          // indicatif + numéro, sans « + », sans espaces ni « 0 » initial
  telephone: "+243832049572",        // numéro affiché et appelé
  email: "lumieresamson090@gmail.com",
  adresse: "Kalemie, Tanganyika, RDC",
  facebook: ""                       // lien de la page Facebook (laisser vide pour la masquer)
};
/* ================================================================================= */

function $(id) { return document.getElementById(id); }

/* Liens WhatsApp avec message pré-rempli */
document.querySelectorAll("[data-wa]").forEach(function (a) {
  a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(a.dataset.wa);
});

/* Lien d'appel */
document.querySelectorAll("[data-tel]").forEach(function (a) {
  a.href = "tel:" + CONFIG.telephone.replace(/\s/g, "");
});

/* Coordonnées (uniquement si l'élément existe sur la page) */
if ($("c-tel")) { $("c-tel").href = "tel:" + CONFIG.telephone.replace(/\s/g, ""); $("t-tel").textContent = CONFIG.telephone; }
if ($("c-mail")) { $("c-mail").href = "mailto:" + CONFIG.email; $("t-mail").textContent = CONFIG.email; }
if ($("t-adresse")) { $("t-adresse").textContent = CONFIG.adresse; }
if ($("f-adresse")) { $("f-adresse").textContent = CONFIG.adresse; }
if ($("c-map")) { $("c-map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ets K-HAIME " + CONFIG.adresse); }
if ($("map")) { $("map").src = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.adresse) + "&output=embed"; }
if ($("c-fb") && CONFIG.facebook) { $("c-fb").href = CONFIG.facebook; $("c-fb").hidden = false; }
if ($("annee")) { $("annee").textContent = new Date().getFullYear(); }

/* Formulaires -> WhatsApp (le service est lu dans data-service ou dans la liste déroulante) */
document.querySelectorAll("form.form").forEach(function (f) {
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var service = f.dataset.service || (f.service ? f.service.value : "");
    var msg = "Bonjour, je suis " + f.nom.value.trim() + ".\nService : " + service + "\n" + f.message.value.trim();
    window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    f.reset();
  });
});

/* Données structurées pour Google */
var ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify({"@context": "https://schema.org", "@type": "LocalBusiness", "name": "Ets K-HAIME",
  "description": "Station d’essence, hôtel, logistique camions et bateaux à Kalemie", "telephone": CONFIG.telephone,
  "email": CONFIG.email, "address": {"@type": "PostalAddress", "addressLocality": "Kalemie", "addressCountry": "CD"},
  "sameAs": CONFIG.facebook ? [CONFIG.facebook] : []});
document.head.appendChild(ld);

/* Photo manquante : on retire l'image, le dégradé avec icône reste visible */
document.querySelectorAll(".media img").forEach(function (img) {
  img.addEventListener("error", function () { img.remove(); });
});

/* Menu mobile */
var bouton = $("menu"), nav = $("nav");
if (bouton && nav) {
  bouton.addEventListener("click", function () {
    var ouvert = nav.classList.toggle("ouvert");
    bouton.setAttribute("aria-expanded", ouvert);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("ouvert"); bouton.setAttribute("aria-expanded", "false"); }
  });
}

/* Agrandir une photo de la galerie au clic */
var zoom = document.createElement("div");
zoom.className = "zoom";
zoom.innerHTML = '<img alt="">';
document.body.appendChild(zoom);
document.querySelectorAll(".galerie .media").forEach(function (m) {
  m.addEventListener("click", function () {
    var img = m.querySelector("img");
    if (!img) return;
    zoom.firstChild.src = img.src;
    zoom.firstChild.alt = img.alt;
    zoom.classList.add("ouvert");
  });
});
zoom.addEventListener("click", function () { zoom.classList.remove("ouvert"); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") zoom.classList.remove("ouvert"); });
