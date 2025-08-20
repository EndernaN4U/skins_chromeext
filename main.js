const CURRENCY = "zł";

// TODO: When searching for original price, add exception cus sometimes it writes "FREE"
// TODO: Should categorize percentages to losing money and gaining money ( 0 also )
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
    
    let avg_price = 0;

    list_items.forEach(item => {
        let [_, price, __, odds] = [...item.querySelectorAll('td')].map(child => child.textContent.trim());

        avg_price += parseFloat(price)*parseFloat(odds);
    });

    avg_price = Math.round(avg_price) / 100;

    const price_label = document.querySelector('.ContainerPrice > .Currency');
    const original_price = parseFloat(price_label.textContent.trim());

    setTimeout(()=>{
        price_label.textContent += ` (avg: ${avg_price} zł)`;

        const span_percent = document.createElement('span');
        const percents = Math.round((avg_price / original_price) * 100);

        span_percent.textContent = ` (${percents}%)`;
        span_percent.style.color = percents > 100 ? "green" : "red";

        price_label.appendChild(span_percent);
    }, 1000);

}

main();