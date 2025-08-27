const inject_content = ()=>{
    const currency = retrieve_currency_symbol();
    const skins = retrieve_case_skins();

    const price_label = document.querySelector(PAGE_CONFIG.price_label);
    const original_price = parse_currency(price_label.textContent);

    let avg_case_gain = 0,
        odds_to_gain = 0,   // Gain or make 0
        odds_to_lose = 0;
    
    skins.forEach(( skin ) => {
        let prices_by_odds = 0,
            sum_of_odds = 0;

        skin.chances.forEach((chance_row) => {
            let [_, price, __, odds] = [...chance_row.querySelectorAll('td')].map(child => child.textContent);

            price = parse_currency(price);
            odds = parseFloat(odds);

            if(price < original_price) odds_to_lose += odds;
            else odds_to_gain += odds;

            prices_by_odds += price * odds;
            sum_of_odds += odds;

            avg_case_gain += price * odds;
        });

        skin.avg_price = Math.round(prices_by_odds / sum_of_odds * 100) / 100;

        const gradient_color = skin.avg_price < original_price ? 'red' : 'green';
        skin.gradient.style.backgroundImage = `linear-gradient(180deg, transparent 0, ${gradient_color} 100%)`;

    });

    avg_case_gain = Math.round(avg_case_gain) / 100;
    odds_to_gain = Math.round(odds_to_gain);
    odds_to_lose = Math.round(odds_to_lose);

    price_label.appendChild(make_span(`(avg: ${avg_case_gain} ${currency})`));
    price_label.appendChild(make_span(`(${odds_to_gain}%)`, "green"));
    price_label.appendChild(make_span(`(${odds_to_lose}%)`, "red"));
}


(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        setTimeout(() => {
            inject_content();
        }, 1000);
    });
})();

