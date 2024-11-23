(function HighSeasToolkit() {
    if (globalThis.HIGH_SEAS_TOOLKIT_RAN) {
        return;
    }
    globalThis.HIGH_SEAS_TOOLKIT_RAN = true;
    function initUi() {
        var sidePanel = document.createElement("div");
        sidePanel.style = 
        `
        background-color: white;
        position: fixed;
        z-index: 9999999;
        right: 0;
        top: 0;
        bottom: 0;
        width: 24rem;
        display: none;
        `;
        var title = document.createElement("h3");
        title.innerText = "High Seas Toolkit";
        title.classList.add("tracking-tight", "text-xl", "font-bold", "text-center");
        sidePanel.appendChild(title);
        sidePanel.innerHTML += `
        <div class="name">
            <label>Name: </label>
            <code>Wet Stone</code>
        </div>
        <div class="comingSoon">
            <label>Coming Soon: </label>
            <code>false</code>
        </div>
        <div class="enabledCa">
            <label>Canada: </label>
            <code>false</code>
        </div>
        <div class="enabledEu">
            <label>Europe: </label>
            <code>false</code>
        </div>
        <div class="enabledIn">
            <label>India: </label>
            <code>false</code>
        </div>
        <div class="enabledUs">
            <label>US: </label>
            <code>false</code>
        </div>
        <div class="enabledXx">
            <label>OtherCountries: </label>
            <code>false</code>
        </div>
        <div class="enabledAll">
            <label>AllCountries: </label>
            <code>false</code>
        </div>
        <div class="fulfilledAtEnd">
            <label>One Time Purchase: </label>
            <code>false</code>
        </div>
        <div class="id">
            <label>ID: </label>
            <code>loading</code>
        </div>
        <div class="imageUrl">
            <label>Image: </label>
            <code>https://example.com</code>
        </div>
        <div class="minimumHoursEstimated">
            <label>Hours Min: </label>
            <code>0</code>
        </div>
        <div class="maximumHoursEstimated">
            <label>Hours Max: </label>
            <code>69</code>
        </div>
        <div class="outOfStock">
            <label>Out of Stock: </label>
            <code>false</code>
        </div>
        <div class="priceGlobal">
            <label>Global price: </label>
            <code>0</code>
        </div>
        <div class="priceUs">
            <label>US price: </label>
            <code>0</code>
        </div>
        <div class="subtitle">
            <label>Description: </label>
            <code>A wet rock.</code>
        </div>
        `;
        var closeBtn = document.createElement("button");
        closeBtn.innerText = "❌";
        closeBtn.addEventListener("click", ()=>{
            sidePanel.style.display = "none";
        });
        sidePanel.querySelector("h3").appendChild(closeBtn);
        document.body.appendChild(sidePanel);
        return sidePanel;
    }
    var sidePanel = initUi();
    function displayToUI(data) {
        var keys = Object.keys(data);
        keys.forEach(k => {
            try {
                sidePanel.getElementsByClassName(k)[0].querySelector("code").innerText = data[k];
            } catch(e) {
                console.log("High Seas Toolkit found a new property: " + k);
            }
        });
        sidePanel.style.display = "block";
    }
    function extractReactState($reactElem) {
        var reactKey = Object.keys($reactElem).find(x=>x.startsWith("__reactProps$"));
        var props = $reactElem[reactKey].children.props;
        return props.children[2].props.children[0].props.item;
    }
    function updateShopCards() {
        const shopCards = document.querySelectorAll(`#harbor-tab-scroll-element div.container>div.grid>div`);
        shopCards.forEach(x => {
            if (x.getAttribute("data-patched") === "yes") {
                return;
            }
            x.setAttribute("data-patched", "yes");

            var header = x.querySelector("div").children[0].querySelector("div.flex");
            var button = document.createElement("button");
            button.addEventListener("click", ()=>{
                displayToUI(extractReactState(x));
            });
            button.style = "float: right";
            button.innerText = '⚓';
            header.appendChild(button);
        });
    }
    setInterval(updateShopCards, 500);
})();