(function () {
    "use strict";

    const clarityId = "wrd1brrkj4";
    const storageKey = "epartanen_analytics_consent";
    const granted = "granted";
    const denied = "denied";

    function getStoredConsent() {
        try {
            return window.localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function setStoredConsent(value) {
        try {
            window.localStorage.setItem(storageKey, value);
        } catch (error) {
            // Jos localStorage ei ole käytössä, valinta pysyy vain nykyisessä sivulatauksessa.
        }
    }

    function consentPayload(analyticsValue) {
        return {
            ad_Storage: denied,
            analytics_Storage: analyticsValue
        };
    }

    function loadClarity() {
        if (window.__epartanenClarityLoaded) {
            if (typeof window.clarity === "function") {
                window.clarity("consentv2", consentPayload(granted));
            }
            return;
        }

        window.__epartanenClarityLoaded = true;

        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () {
                (c[a].q = c[a].q || []).push(arguments);
            };
            c[a]("consentv2", consentPayload(granted));
            t = l.createElement(r);
            t.async = 1;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", clarityId);
    }

    function clearCookie(name, domain) {
        const domainPart = domain ? "; domain=" + domain : "";
        document.cookie = name + "=; Max-Age=0; path=/" + domainPart;
    }

    function clearClarityCookies() {
        const cookieNames = ["_clck", "_clsk", "CLID", "ANONCHK", "MR", "MUID", "SM"];
        const hostname = window.location.hostname;
        const hostParts = hostname.split(".");
        const domains = ["", hostname];

        if (hostParts.length >= 2) {
            domains.push("." + hostParts.slice(-2).join("."));
        }

        cookieNames.forEach((name) => {
            domains.forEach((domain) => clearCookie(name, domain));
        });
    }

    function denyClarity() {
        if (typeof window.clarity === "function") {
            window.clarity("consentv2", consentPayload(denied));
            window.clarity("consent", false);
        }

        clearClarityCookies();
    }

    function privacyPageUrl() {
        return "/tietosuoja/";
    }

    function removeBanner() {
        const banner = document.querySelector(".analytics-consent");
        if (banner) {
            banner.remove();
        }
    }

    function renderBanner(forceOpen) {
        const storedConsent = getStoredConsent();
        if (!forceOpen && storedConsent) {
            return;
        }

        removeBanner();

        const banner = document.createElement("aside");
        banner.className = "analytics-consent";
        banner.setAttribute("aria-label", "Analytiikan suostumus");

        const statusText = storedConsent === granted
            ? "Analytiikka on tällä hetkellä hyväksytty."
            : storedConsent === denied
                ? "Analytiikka on tällä hetkellä pois käytöstä."
                : "";

        banner.innerHTML = `
            <div class="analytics-consent__content">
                <div class="analytics-consent__text">
                    <strong>Analytiikka</strong>
                    <p>Käytän Microsoft Claritya sivuston toimivuuden ja käytettävyyden arviointiin. Tallennus käynnistyy vain, jos hyväksyt analytiikan.</p>
                    ${statusText ? `<p class="analytics-consent__status">${statusText}</p>` : ""}
                </div>
                <div class="analytics-consent__actions">
                    <a href="${privacyPageUrl()}">Tietosuojaseloste</a>
                    <button type="button" class="analytics-consent__button analytics-consent__button--secondary" data-analytics-deny>Vain välttämättömät</button>
                    <button type="button" class="analytics-consent__button" data-analytics-accept>Hyväksy analytiikka</button>
                </div>
            </div>
        `;

        banner.querySelector("[data-analytics-accept]").addEventListener("click", () => {
            setStoredConsent(granted);
            loadClarity();
            removeBanner();
        });

        banner.querySelector("[data-analytics-deny]").addEventListener("click", () => {
            setStoredConsent(denied);
            denyClarity();
            removeBanner();
        });

        document.body.appendChild(banner);
    }

    function onReady(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    }

    const storedConsent = getStoredConsent();
    if (storedConsent === granted) {
        loadClarity();
    } else {
        denyClarity();
    }

    onReady(() => {
        renderBanner(false);

        document.addEventListener("click", (event) => {
            const trigger = event.target.closest("[data-privacy-settings]");
            if (!trigger) {
                return;
            }

            event.preventDefault();
            renderBanner(true);
        });
    });
})();
