export function toProperCase(str) {
    return str.replace(/_/g, ' ').replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function toIdCase(str) {
    return str.replace(/[^\w\s!?]/g,'').replace(' ', '_').toUpperCase();
}

export function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "m" },
        { value: 1e9, symbol: "b" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits) + item.symbol : "0";
}

export const imageOnError = (event) => {
    event.currentTarget.src = "https://static.wikia.nocookie.net/minecraft/images/f/ff/BarrierOld.png";
    event.currentTarget.className = "error";
    event.currentTarget.onError = null;
};
