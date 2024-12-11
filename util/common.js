import { toast } from 'react-toastify';
import moment from 'moment';

export const removeWhiteSpace = (event) => {
    if (event.key === ' ') {
        event.preventDefault();
    }
}

export const showNotification = (status, message) => {
    toast.dismiss();
    if (status) {
        const msg = (<div> <strong>Success!</strong> <br /> {message} </div>);
        toast.success(msg, { autoClose: 3000 });
    } else {
        const msg = (<div> <strong>Failure!</strong> <br /> {message} </div>);
        toast.error(msg, { autoClose: 3000 });
    }
}

export const formatDate = (date, format) => {
    return moment(date).format(format);
};


export const formatNumber = (value, decimal) => {
    // console.log(value,decimal,"staking plan created successfully");
    
    if (isNaN(value) || !value) {
        return '0.0000';
    }

    // Handle exponential values by converting them to fixed-point notation
    if (value.toString().includes('e') || value.toString().includes('E')) {
        value = Number(value).toFixed(decimal || 4);
    }

    if (!decimal) {
        return value.toString();
    }
    
    const [integerPart, fractionalPart = ''] = value.toString().split('.');
    let formattedFractionalPart = fractionalPart.substring(0, decimal);
    
    // Append zeros to fractional part if needed
    while (formattedFractionalPart.length < decimal) {
        formattedFractionalPart += '0';
    }

    // Combine the integer and fractional parts
    const formattedPrice = `${integerPart}.${formattedFractionalPart}`;
    return formattedPrice;
};


export const validDecimal = (e) => {

    const char = e.key;

    if (['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(char)) {
        return;
    }

    if (char === '.' && e.target.value.includes('.')) {
        e.preventDefault();
        return;
    }

    if (char === '.' && e.target.value.length === 0) {
        e.preventDefault();
        return;
    }

    if (!/[0-9.]$/.test(char)) {
        e.preventDefault();
    }
};

export const handleCopy = (text) => {
    // Ensure 'message' is passed correctly
    const message = text;

    navigator.clipboard.writeText(text)
        .then(() => {
            // Create the message content for the toast notification
            const msg = (
                <div>
                    <strong>Copied to Clipboard!</strong>
                    <br />
                    {message}
                </div>
            );
            toast.dismiss()
            // Show the toast notification
            toast.success(msg, { autoClose: 3000 });
        })
        .catch((error) => {
            // Show an error toast notification if copying fails
            toast.error("Internal Server Error");
            console.error('Failed to copy text: ', error);
        });
};


export const walletTypes = () => {
    let walletArray = ['Reward Asset', 'Spot Asset', 'Referral Asset']
    return walletArray;
};

export const assetTypes = () => {
    let array = [
        { name: 'All Assets', id: null },
        { name: 'Reward Asset', id: 0 },
        { name: 'Spot Asset', id: 1 },
        { name: 'Referral Asset', id: 2 },
    ]
    return array
};

export const formatNumberComma = (num, decimalCount) => {
    if (isNaN(num)) return null; // Handle non-numeric input

    if (num.toString().includes('e') || num.toString().includes('E')) {
        num = num.toFixed(decimalCount !== undefined ? decimalCount : 10);
    }
    
    // Convert the number to string and split into integer and decimal parts
    num = num.toString().split('.');
    let integerPart = num[0];
    let decimalPart = num.length > 1 ? num[1] : '';

    // Format the integer part
    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');

    // Prepare the formatted decimal part
    if (decimalCount !== undefined) {
        decimalPart = decimalPart.slice(0, decimalCount); // Limit decimal places
    }

    // Combine the formatted parts
    return otherDigits + (otherDigits ? ',' : '') + lastThreeDigits +
        (decimalCount !== undefined && decimalPart ? '.' + decimalPart : '');
}


export const formatNumberKMB = (amount, decimal = 3) => {
    if (isNaN(amount)) return null; // Handle non-numeric input

    const absNum = Math.abs(amount);
    let formattedValue;

    if (absNum >= 1e9) { // Billions
        formattedValue = (amount / 1e9).toFixed(decimal) + 'B';
    } else if (absNum >= 1e6) { // Millions
        formattedValue = (amount / 1e6).toFixed(decimal) + 'M';
    } else if (absNum >= 1e3) { // Thousands
        formattedValue = (amount / 1e3).toFixed(decimal) + 'k';
    } else {
        formattedValue = amount.toFixed(decimal); // Ensure three decimal places for numbers less than 1,000
    }

    return formattedValue;
}
export const buttonLoading = () => {
    return (
        <button type='button' className='btn btn-action text-white w-100'>
            Loading ...
        </button>
    )
}
