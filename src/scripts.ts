import axios from 'axios';

// https://stackoverflow.com/questions/17684921/sort-json-object-in-javascript
// https://dev.to/slimpython/sort-array-of-json-object-by-key-value-easily-with-javascript-3hke

//  http://localhost:3004/countries?_limit=3&_sort=capital&_order=asc

// GET COUNTRIES BY NAME SORT ASC
// http://localhost:3004/countries?_limit=3_sort=capital&_order=asc

// DEFAULT VIEW BY COUNTRY NAME ASCENDING
function countryAsc() {
    let limit = 5;
    let type = `name`;
    let order = 'asc';
    sortOutput(limit, type, order);
}
// countryAsc();
function countryDesc() {
    let limit = 5;
    let type = `name`;
    let order = 'desc';
    sortOutput(limit, type, order);
}

// DEFAULT VIEW BY CAPITAL NAME ASCENDING
function capitalAsc() {
    let limit = 5;
    let type = `capital`;
    let order = 'asc';
    sortOutput(limit, type, order);
}
function capitalDesc() {
    let limit = 5;
    let type = `capital`;
    let order = 'desc';
    sortOutput(limit, type, order);
}

// DEFAULT VIEW BY CURENCY NAME ASCENDING
function currencyAsc() {
    let limit = 5;
    let type = `currency.code`;
    let order = 'asc';
    sortOutput(limit, type, order);
}
function currencyDesc() {
    let limit = 5;
    let type = `currency.code`;
    let order = 'desc';
    sortOutput(limit, type, order);
}

// DEFAULT VIEW BY LANGUAGE NAME ASCENDING
function languageAsc() {
    let limit = 5;
    let type = `language.name`;
    let order = 'asc';
    sortOutput(limit, type, order);
}
function languageDesc() {
    let limit = 5;
    let type = `language.name`;
    let order = 'desc';
    sortOutput(limit, type, order);
}

let outPutQuery = (data: any, limit: number) => {
    document.querySelector('tbody').replaceChildren();
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let capital = data[i].capital;
        let cur = data[i].currency.code;
        let lang = data[i].language.name;
        createTableRow(name, capital, cur, lang);
    }
};

let createTableRow = (
    name: string,
    capital: string,
    cur: string,
    lang: string,
) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${name}</td>
        <td>${capital}</td>
        <td>${cur}</td>
        <td>${lang}</td>
`;
    document.querySelector('tbody').appendChild(tr);
};

let formSubmit = document.querySelector('.fsubmit');
formSubmit.addEventListener('click', () => {
    let page = 1;
    let limit = 20;
    let countName = (<any>document.querySelector('.fcou')).value;
    let capName = (<any>document.querySelector('.fcap')).value;
    let curName = (<any>document.querySelector('.fcur')).value;
    let langName = (<any>document.querySelector('.flan')).value;
    let order = 'desc';

    filtertOutput(page, limit, countName, capName, curName, langName, order);
});

function filtertOutput(
    page: number,
    limit: number,
    countName: string,
    capName: string,
    curName: string,
    langName: string,
    order: string,
) {
    let url = `http://localhost:3004/countries?_page=${page}&_limit=${limit}&name_like=${countName}&capital_like=${capName}&currency.code_like=${curName}&language.name_like=${langName}`;

    axios.get(url).then((response) => {
        let data = response.data;
        outPutQuery(data, limit);

        // COUNTRY SORT BUTTONS
        let countrySortDesc = document.querySelector('.co-desc');
        countrySortDesc.addEventListener('click', () => {
            // countryDesc(); // sort Descending
            byCountryDesc(data);
            document.querySelector('.co-desc').classList.add('hide');
            document.querySelector('.co-asc').classList.remove('hide');
        });

        let countrySortAsc = document.querySelector('.co-asc');
        countrySortAsc.addEventListener('click', () => {
            // countryAsc();
            byCountryAsc(data);
            document.querySelector('.co-desc').classList.remove('hide');
            document.querySelector('.co-asc').classList.add('hide');
        });

        // CAPITAL SORT BUTTONS
        let capitalSortDesc = document.querySelector('.ca-desc');
        capitalSortDesc.addEventListener('click', () => {
            byCapitalDesc(data); // sort Descending
            document.querySelector('.ca-desc').classList.add('hide');
            document.querySelector('.ca-asc').classList.remove('hide');
        });

        let capitalSortAsc = document.querySelector('.ca-asc');
        capitalSortAsc.addEventListener('click', () => {
            byCapitalAsc(data);
            document.querySelector('.ca-desc').classList.remove('hide');
            document.querySelector('.ca-asc').classList.add('hide');
        });

        // CURRENCY SORT BUTTONS
        let currencySortDesc = document.querySelector('.cu-desc');
        currencySortDesc.addEventListener('click', () => {
            byCurrencyDesc(data);
            document.querySelector('.cu-desc').classList.add('hide');
            document.querySelector('.cu-asc').classList.remove('hide');
        });

        let currencySortAsc = document.querySelector('.cu-asc');
        currencySortAsc.addEventListener('click', () => {
            byCurrencyAsc(data);
            document.querySelector('.cu-desc').classList.remove('hide');
            document.querySelector('.cu-asc').classList.add('hide');
        });

        // CURRENCY SORT BUTTONS
        let languageSortDesc = document.querySelector('.la-desc');
        languageSortDesc.addEventListener('click', () => {
            byLanguageDesc(data);
            document.querySelector('.la-desc').classList.add('hide');
            document.querySelector('.la-asc').classList.remove('hide');
        });

        let languageSortAsc = document.querySelector('.la-asc');
        languageSortAsc.addEventListener('click', () => {
            byLanguageAsc(data);
            document.querySelector('.la-desc').classList.remove('hide');
            document.querySelector('.la-asc').classList.add('hide');
        });
    });
}

// Sorty by Country descending
let byCountryDesc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.count < p2.count ? 1 : p1.count > p2.count ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Country ascending
let byCountryAsc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.count > p2.count ? 1 : p1.count < p2.count ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Capital descending
let byCapitalDesc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.capi < p2.capi ? 1 : p1.capi > p2.capi ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Capital descending
let byCapitalAsc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.capi > p2.capi ? 1 : p1.capi < p2.capi ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Currency descending
let byCurrencyDesc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.cur < p2.cur ? 1 : p1.cur > p2.cur ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Currency ascending
let byCurrencyAsc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.cur > p2.cur ? 1 : p1.cur < p2.cur ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Language descending
let byLanguageDesc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.lang < p2.lang ? 1 : p1.lang > p2.lang ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

// Sorty by Language ascending
let byLanguageAsc = (data: any) => {
    let sortOutput = sortArray(data);
    let sortedProducts = sortOutput.sort((p1: any, p2: any) =>
        p1.lang > p2.lang ? 1 : p1.lang < p2.lang ? -1 : 0,
    );
    console.log(sortedProducts);
    drawSort(sortedProducts);
};

const sortArray = (data: any) => {
    let sortOutput: any = [];
    for (let i = 0; i < data.length; i++) {
        sortOutput.push({
            count: data[i].name,
            capi: data[i].capital,
            cur: data[i].currency.code,
            lang: data[i].language.name,
        });
    }
    return sortOutput;
};

const drawSort = (sortedProducts: any) => {
    document.querySelector('tbody').replaceChildren();
    for (let i = 0; i < sortedProducts.length; i++) {
        let name = sortedProducts[i].count;
        let capital = sortedProducts[i].capi;
        let cur = sortedProducts[i].cur;
        let lang = sortedProducts[i].lang;
        createTableRow(name, capital, cur, lang);
    }
};

function sortOutput(limit: number, type: string, order: string) {
    let url = `http://localhost:3004/countries?_limit=${limit}&_sort=${type}&_order=${order}`;
    axios.get(url).then((response) => {
        let data = response.data;
        outPutQuery(data, limit);
    });
}
