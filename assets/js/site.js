// kidDo website

// Always render the name kidDo in the brand font: wrap every text occurrence
// that is not already inside a .kd element.
(function () {
    const skip = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "TITLE"]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue.includes("kidDo")) return NodeFilter.FILTER_REJECT;
            for (let el = node.parentElement; el; el = el.parentElement) {
                if (skip.has(el.tagName) || el.classList.contains("kd")) return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(kidDo)/).forEach((part) => {
            if (part === "kidDo") {
                const span = document.createElement("span");
                span.className = "kd";
                span.textContent = part;
                frag.appendChild(span);
            } else if (part) {
                frag.appendChild(document.createTextNode(part));
            }
        });
        node.replaceWith(frag);
    }
})();

// mobile menu
(function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", open);
        menu.classList.toggle("is-open", open);
    });
    menu.addEventListener("click", (e) => {
        if (e.target.closest("a")) {
            toggle.setAttribute("aria-expanded", "false");
            menu.classList.remove("is-open");
        }
    });
})();

// reveal on scroll; the reveal class is dropped afterwards so hover effects work
(function () {
    const items = document.querySelectorAll(".reveal");
    const done = (el) => {
        el.classList.add("is-in");
        setTimeout(() => el.classList.remove("reveal", "is-in"), 800);
    };
    if (!("IntersectionObserver" in window)) {
        items.forEach(done);
        return;
    }
    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                done(e.target);
                io.unobserve(e.target);
            }
        }
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
})();


// e-mail links: the address is stored reversed in data attributes so that it is
// not present in the page source, and assembled here.
(function () {
    const rev = (s) => s.split("").reverse().join("");
    document.querySelectorAll("a.email[data-u][data-d]").forEach((a) => {
        const addr = rev(a.dataset.u) + "@" + rev(a.dataset.d);
        a.href = "mailto:" + addr;
        a.textContent = addr;
    });
})();
