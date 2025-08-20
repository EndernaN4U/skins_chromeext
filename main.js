const CURRENCY = document.cookie.split('; ')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('currency='))
    ?.split('=')[1] || 'USD';

// TODO: When searching for original price, add exception cus sometimes it writes "FREE"
// MAYBE: colorise items to green, red and gradient for ex.
// MAYBE: change from odds to range ( could be more precise )

const main = ()=>{
    const list_items = document.querySelectorAll(`
        .ContainerGroupedItem >
        .ContainerGroupedItem_chances >
        .chances_table >
        tbody >
        .table_row
    `);

    const price_label = document.querySelector('.ContainerPrice > .Currency');
    const original_price = parseFloat(price_label.textContent.trim());
    
    let avg_price = 0,
        odds_to_gain = 0,   // Gain or make 0
        odds_to_lose = 0;

    list_items.forEach(item => {
        let [_, price, __, odds] = [...item.querySelectorAll('td')].map(child => child.textContent.trim());

        price = parseFloat(price);
        odds = parseFloat(odds);

        if(price < original_price) odds_to_lose += odds;
        else odds_to_gain += odds;

        avg_price += price * odds;
    });

    avg_price = Math.round(avg_price) / 100;
    odds_to_gain = Math.round(odds_to_gain);
    odds_to_lose = Math.round(odds_to_lose);

    setTimeout(()=>{
        price_label.textContent += ` (avg: ${avg_price} ${CURRENCY})`;

        const span_to_gain = document.createElement('span');
        span_to_gain.textContent = ` (${odds_to_gain}%)`;
        span_to_gain.style.color = "green";
        price_label.appendChild(span_to_gain);

        const span_to_lose = document.createElement('span');
        span_to_lose.textContent = ` (${odds_to_lose}%)`;
        span_to_lose.style.color = "red";
        price_label.appendChild(span_to_lose);

    }, 1000);

}

main();