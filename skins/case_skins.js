const retrieve_case_skins = () => {
    const skins_containers = document.querySelectorAll(PAGE_CONFIG.skins_container);

    return [...skins_containers].map((container) => {
        const gradient = container.querySelector(PAGE_CONFIG.skin_gradient);
        const chances = container.querySelectorAll(PAGE_CONFIG.skin_chances);

        return {
            container,
            gradient,
            chances,
            avg_price: 0
        }
    });
}