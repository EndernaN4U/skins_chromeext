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

const PREFIX_REGEX = /^\D*/;

// Value should be string like "$5.50"
const parse_currency = (value) =>{
    return parseFloat(value.trim().replace(PREFIX_REGEX, ''));
}