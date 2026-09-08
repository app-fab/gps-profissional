/*!
 * GPS da Carreira™ — Banner de consentimento de cookies (A7)
 * Site: Página de Vendas (oferta.jornadanegocios.com.br)
 * Sem dependências externas. Não define nenhum cookie de rastreamento por si só.
 * Expõe window.gpsCookieConsent.hasMarketingConsent() para o futuro Pixel da Meta
 * verificar antes de disparar, e window.gpsOpenCookiePreferences() para o link
 * "Preferências de cookies" do rodapé.
 */
(function () {
  if (window.__gpsCookieConsentInit) return;
  window.__gpsCookieConsentInit = true;

  var STORAGE_KEY = "gps_cookie_consent_v1";
  var VERSION = 1;

  // Paleta desta página (creme/navy), igual ao rodapé já publicado.
  var C = {
    bg: "#faf8f3",
    text: "#1f1d1a",
    muted: "#6b6b6b",
    border: "rgba(13, 27, 42, 0.16)",
    accent: "#0D1B2A",
    accentText: "#ffffff",
    switchOn: "#0D1B2A",
    overlay: "rgba(7, 14, 24, 0.6)"
  };

  var css =
    ".gps-cc-banner,.gps-cc-modal-overlay{box-sizing:border-box}" +
    ".gps-cc-banner *,.gps-cc-modal-overlay *{box-sizing:border-box}" +
    ".gps-cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:999990;background:" + C.bg + ";color:" + C.text + ";border-top:1px solid " + C.border + ";padding:20px 24px;font-family:'Inter',system-ui,sans-serif;box-shadow:0 -6px 24px rgba(0,0,0,.18)}" +
    ".gps-cc-banner__inner{max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}" +
    ".gps-cc-banner__text{flex:1 1 480px;font-size:14px;line-height:1.55;margin:0}" +
    ".gps-cc-banner__actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}" +
    ".gps-cc-btn{font-family:inherit;font-size:14px;font-weight:700;line-height:1.2;padding:12px 18px;border-radius:8px;cursor:pointer;border:1px solid transparent;white-space:nowrap}" +
    ".gps-cc-btn--equal{background:" + C.accent + ";color:" + C.accentText + ";border-color:" + C.accent + "}" +
    ".gps-cc-btn--equal:hover{filter:brightness(1.15)}" +
    ".gps-cc-btn--outline{background:transparent;color:" + C.accent + ";border-color:" + C.accent + "}" +
    ".gps-cc-btn--outline:hover{background:rgba(13,27,42,.06)}" +
    ".gps-cc-btn--link{background:transparent;color:inherit;border:none;text-decoration:underline;padding:6px 4px;font-weight:600}" +
    ".gps-cc-btn:focus-visible{outline:2px solid " + C.accent + ";outline-offset:2px}" +
    ".gps-cc-modal-overlay{position:fixed;inset:0;z-index:999991;background:" + C.overlay + ";display:flex;align-items:center;justify-content:center;padding:20px}" +
    ".gps-cc-modal{background:" + C.bg + ";color:" + C.text + ";max-width:560px;width:100%;max-height:86vh;overflow-y:auto;border-radius:14px;padding:28px;font-family:'Inter',system-ui,sans-serif;border:1px solid " + C.border + "}" +
    ".gps-cc-modal h2{font-size:19px;margin:0 0 10px;font-family:inherit}" +
    ".gps-cc-intro{font-size:14px;line-height:1.55;margin:0 0 20px;color:" + C.muted + "}" +
    ".gps-cc-cat{border-top:1px solid " + C.border + ";padding:14px 0}" +
    ".gps-cc-cat:first-of-type{border-top:none;padding-top:0}" +
    ".gps-cc-cat__head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px}" +
    ".gps-cc-cat__title{font-size:14px;font-weight:700;margin:0}" +
    ".gps-cc-cat__desc{font-size:13px;line-height:1.55;margin:0;color:" + C.muted + "}" +
    ".gps-cc-badge{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;padding:4px 8px;border-radius:999px;background:rgba(13,27,42,.08);border:1px solid " + C.border + ";white-space:nowrap;color:" + C.accent + "}" +
    ".gps-cc-switch{position:relative;display:inline-block;width:42px;height:24px;flex:none}" +
    ".gps-cc-switch input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}" +
    ".gps-cc-switch__track{position:absolute;inset:0;background:rgba(13,27,42,.2);border-radius:999px;transition:background .15s;pointer-events:none}" +
    ".gps-cc-switch__thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform .15s}" +
    ".gps-cc-switch input:checked+.gps-cc-switch__track{background:" + C.switchOn + "}" +
    ".gps-cc-switch input:checked+.gps-cc-switch__track .gps-cc-switch__thumb{transform:translateX(18px)}" +
    ".gps-cc-switch input:focus-visible+.gps-cc-switch__track{outline:2px solid " + C.accent + ";outline-offset:2px}" +
    ".gps-cc-modal__actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}" +
    ".gps-cc-modal__actions .gps-cc-btn{flex:1 1 auto;text-align:center}" +
    "@media (max-width:640px){.gps-cc-banner__actions{width:100%}.gps-cc-banner__actions .gps-cc-btn{flex:1 1 auto}}";

  var styleEl = document.createElement("style");
  styleEl.id = "gps-cc-styles";
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.marketing === "boolean") return parsed;
    } catch (e) {}
    return null;
  }

  function writeConsent(marketing) {
    var payload = { version: VERSION, marketing: !!marketing, timestamp: new Date().toISOString() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("gps-consent-changed", { detail: payload })); } catch (e) {}
    return payload;
  }

  window.gpsCookieConsent = {
    get: readConsent,
    hasMarketingConsent: function () { var c = readConsent(); return !!(c && c.marketing); },
    openPreferences: function () { openModal(); }
  };
  window.gpsOpenCookiePreferences = function () { openModal(); };

  var bannerEl = null;
  var overlayEl = null;

  function closeBanner() {
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
    bannerEl = null;
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  function closeModal() {
    if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
    overlayEl = null;
    document.removeEventListener("keydown", onModalKeydown);
  }

  function finish(marketing) {
    writeConsent(marketing);
    closeModal();
    closeBanner();
  }

  function buildBanner() {
    var el = document.createElement("div");
    el.className = "gps-cc-banner";
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Aviso de cookies");
    el.innerHTML =
      '<div class="gps-cc-banner__inner">' +
        '<p class="gps-cc-banner__text">Usamos cookies essenciais para o funcionamento do site. ' +
        "Cookies de análise de audiência (Umami) não identificam você individualmente. " +
        "Cookies de marketing (Pixel da Meta) só são ativados com a sua autorização. " +
        '<button type="button" class="gps-cc-btn gps-cc-btn--link" data-gps-cc="customize">Personalizar</button></p>' +
        '<div class="gps-cc-banner__actions">' +
          '<button type="button" class="gps-cc-btn gps-cc-btn--equal" data-gps-cc="reject">Rejeitar não essenciais</button>' +
          '<button type="button" class="gps-cc-btn gps-cc-btn--equal" data-gps-cc="accept">Aceitar todos</button>' +
        "</div>" +
      "</div>";
    el.addEventListener("click", function (e) {
      var action = e.target && e.target.getAttribute && e.target.getAttribute("data-gps-cc");
      if (action === "accept") finish(true);
      else if (action === "reject") finish(false);
      else if (action === "customize") openModal();
    });
    return el;
  }

  function buildModal() {
    var consent = readConsent();
    var marketingChecked = consent ? !!consent.marketing : false;

    var overlay = document.createElement("div");
    overlay.className = "gps-cc-modal-overlay";

    var modal = document.createElement("div");
    modal.className = "gps-cc-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "gps-cc-modal-title");

    modal.innerHTML =
      '<h2 id="gps-cc-modal-title">Preferências de cookies</h2>' +
      '<p class="gps-cc-intro">Você pode escolher quais cookies não essenciais autoriza. Cookies essenciais e de análise de audiência sempre ficam ativos porque não dependem de consentimento — eles não identificam você individualmente. Sua escolha pode ser alterada a qualquer momento por este mesmo link, no rodapé da página.</p>' +
      '<div class="gps-cc-cat">' +
        '<div class="gps-cc-cat__head"><p class="gps-cc-cat__title">Essenciais</p><span class="gps-cc-badge">Sempre ativo</span></div>' +
        '<p class="gps-cc-cat__desc">Necessários para o funcionamento, a navegação e a segurança do site. Sem eles, o site não opera corretamente.</p>' +
      "</div>" +
      '<div class="gps-cc-cat">' +
        '<div class="gps-cc-cat__head"><p class="gps-cc-cat__title">Análise de audiência (Umami)</p><span class="gps-cc-badge">Sempre ativo</span></div>' +
        '<p class="gps-cc-cat__desc">Estatísticas agregadas de visitas às páginas, sem identificação individual do visitante e sem cookies de rastreamento.</p>' +
      "</div>" +
      '<div class="gps-cc-cat">' +
        '<div class="gps-cc-cat__head">' +
          '<p class="gps-cc-cat__title">Marketing e anúncios (Pixel da Meta)</p>' +
          '<label class="gps-cc-switch">' +
            '<input type="checkbox" id="gps-cc-marketing-toggle"' + (marketingChecked ? " checked" : "") + ' aria-label="Autorizar cookies de marketing e anúncios" />' +
            '<span class="gps-cc-switch__track"><span class="gps-cc-switch__thumb"></span></span>' +
          "</label>" +
        "</div>" +
        '<p class="gps-cc-cat__desc">Ajudam a medir o resultado de campanhas e evitam mostrar o mesmo anúncio repetidamente. Só são ativados se você autorizar aqui.</p>' +
      "</div>" +
      '<div class="gps-cc-modal__actions">' +
        '<button type="button" class="gps-cc-btn gps-cc-btn--equal" data-gps-cc="reject">Rejeitar não essenciais</button>' +
        '<button type="button" class="gps-cc-btn gps-cc-btn--outline" data-gps-cc="save">Salvar preferências</button>' +
        '<button type="button" class="gps-cc-btn gps-cc-btn--equal" data-gps-cc="accept">Aceitar todos</button>' +
      "</div>";

    modal.addEventListener("click", function (e) {
      var action = e.target && e.target.getAttribute && e.target.getAttribute("data-gps-cc");
      if (action === "accept") finish(true);
      else if (action === "reject") finish(false);
      else if (action === "save") {
        var toggle = modal.querySelector("#gps-cc-marketing-toggle");
        finish(!!(toggle && toggle.checked));
      }
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });

    overlay.appendChild(modal);
    return overlay;
  }

  function openModal() {
    if (overlayEl) return;
    overlayEl = buildModal();
    document.body.appendChild(overlayEl);
    document.addEventListener("keydown", onModalKeydown);
    var firstBtn = overlayEl.querySelector(".gps-cc-switch input");
    if (firstBtn) firstBtn.focus();
  }

  function maybeShowBanner() {
    if (readConsent()) return;
    bannerEl = buildBanner();
    document.body.appendChild(bannerEl);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", maybeShowBanner);
  } else {
    maybeShowBanner();
  }
})();