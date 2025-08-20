const CURRENCY = document.cookie.split('; ')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('currency='))
    ?.split('=')[1] || 'USD';

// MAYBE: change from odds to range ( could be more precise )

const main = ()=>{
    const skins_containers = document.querySelectorAll('.ContainerGroupedItem');

    const skins = [...skins_containers].map((container)=>{
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

    // TODO: When searching for original price, add exception cus sometimes it writes "FREE"
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
        const span_case_gain = document.createElement('span');
        span_case_gain.textContent = ` (avg: ${avg_case_gain} ${CURRENCY})`;
        price_label.appendChild(span_case_gain);

        const span_to_gain = document.createElement('span');
        span_to_gain.textContent = ` (${odds_to_gain}%)`;
        span_to_gain.style.color = "green";
        price_label.appendChild(span_to_gain);

        const span_to_lose = document.createElement('span');
        span_to_lose.textContent = ` (${odds_to_lose}%)`;
        span_to_lose.style.color = "red";
        price_label.appendChild(span_to_lose);
    }, 1000)
    
}

main();