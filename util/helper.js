export const decimalRoundOff = (value, decimal) => {

    if (isNaN(value) || !value) {
        return '';
    }

    const [integerPart, fractionalPart = ''] = value.toString().split('.');
    let formattedFractionalPart = fractionalPart.substring(0, decimal);
    while (formattedFractionalPart.length < decimal) {
        formattedFractionalPart += '0';
    }
    const formattedPrice = `${integerPart}.${formattedFractionalPart}`.replace(/\d(?=(\d{3})+\.)/g, '$&');
    return formattedPrice;
};

