// CURRENCY
const currencies_symbols = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "PLN": "zł",
    "TRY": "₺"
}

const retrieve_currency_symbol = () => {
    const currency_name = document.cookie.split('; ')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith('currency='))
        ?.split('=')[1] || 'USD';

    return currencies_symbols[currency_name] || currencies_symbols['USD'];
}

const CURRENCY = retrieve_currency_symbol();


const retrieve_case_skins = () => {
    const skins_containers = document.querySelectorAll('.ContainerGroupedItem');

    return [...skins_containers].map((container) => {
        const gradient = container.querySelector('.ContainerGroupedItem_quality-gradient');
        const chances = container.querySelectorAll(`
            .ContainerGroupedItem_chances >
            .chances_table >
            tbody >
            .table_row
        `);

        return {
            container,
            gradient,
            chances,
            avg_price: 0
        }
    });
}

const make_span = (text, color = null) => {
    const span = document.createElement('span');
    span.textContent = text;

    if(color) span.style.color = color;

    return span;
}

const main = ()=>{
    const skins = retrieve_case_skins();

    const price_label = document.querySelector('.ContainerPrice > .Currency');
    const original_price = parseFloat(price_label.textContent.trim());

    let avg_case_gain = 0,
        odds_to_gain = 0,   // Gain or make 0
        odds_to_lose = 0;
    
    skins.forEach(( skin ) => {
        let prices_by_odds = 0,
            sum_of_odds = 0;

        skin.chances.forEach((chance_row) => {
            let [_, price, __, odds] = [...chance_row.querySelectorAll('td')].map(child => child.textContent.trim());

            price = parseFloat(price);
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

    setTimeout(()=>{
        price_label.appendChild(make_span(` (avg: ${avg_case_gain} ${CURRENCY})`));
        price_label.appendChild(make_span(` (${odds_to_gain}%)`, "green"));
        price_label.appendChild(make_span(` (${odds_to_lose}%)`, "red"));
    }, 1000)
    
}

main();