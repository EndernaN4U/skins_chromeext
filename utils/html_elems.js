const make_span = (text, color = null) => {
    const span = document.createElement('span');
    span.textContent = text;

    if(color) span.style.color = color;

    return span;
}