// All supported currency symbols
const currencies_symbols = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "PLN": "zł",
    "TRY": "₺"
};

// Retrieve the current currency symbol from cookies "currency"
const retrieve_currency_symbol = () => {
    const currency_name = document.cookie.split('; ')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith('currency='))
        ?.split('=')[1] || 'USD';

    return currencies_symbols[currency_name];
}

// Regex that matches any non-digit characters at the start of the string
const PREFIX_REGEX = /^\D*/;

/* 
The function will extract the numeric part and return it as a float.
Value should be string like "$5.50"
*/
const parse_currency = (value) =>{
    return parseFloat(value.trim().replace(PREFIX_REGEX, ''));
}