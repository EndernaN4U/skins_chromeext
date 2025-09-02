// Function to retrieve case skins information from the page
const retrieve_case_skins = () => {
    const skins_containers = document.querySelectorAll(PAGE_CONFIG.skins_container);

    return [...skins_containers].map((container) => {
        const gradient = container.querySelector(PAGE_CONFIG.skin_gradient);
        const chances_table_row = container.querySelectorAll(PAGE_CONFIG.skin_chances);

        let avg_price = 0,
            price_by_odds = 0,
            sum_of_odds = 0;

        const chances = [...chances_table_row].map((chance_row)=>{
            let [_, price, __, odds] = [...chance_row.querySelectorAll('td')].map(child => child.textContent);

            price = parse_currency(price);
            odds = parseFloat(odds);

            price_by_odds += price * odds;
            sum_of_odds += odds;

            return { price, odds };
        });

        avg_price = Math.round(price_by_odds / sum_of_odds * 100) / 100;

        return {
            container,
            gradient,
            chances,
            avg_price
        }
    });
}