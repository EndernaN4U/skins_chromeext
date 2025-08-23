const currencies_symbols = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "PLN": "zł",
    "TRY": "₺"
};

const retrieve_currency_symbol = () => {
    const currency_name = document.cookie.split('; ')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith('currency='))
        ?.split('=')[1] || 'USD';

    return currencies_symbols[currency_name];
}
