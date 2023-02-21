import axios from 'axios';

type apiReqData = {
    name: string;
    capital: string;
    currency: {
        code: string;
    };
    language: {
        name: string;
    };
};

type apiData = {
    count: string;
    capi: string;
    cur: string;
    lang: string;
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
    let countName = (<HTMLInputElement>document.querySelector('.fcou')).value;
    let capName = (<HTMLInputElement>document.querySelector('.fcap')).value;
    let curName = (<HTMLInputElement>document.querySelector('.fcur')).value;
    let langName = (<HTMLInputElement>document.querySelector('.flan')).value;

    filterOutput(countName, capName, curName, langName);
});

function filterOutput(
    countName: string,
    capName: string,
    curName: string,
    langName: string,
) {
    let start = 0;
    let finish = 20;

    let url = `http://localhost:3004/countries?name_like=${countName}&capital_like=${capName}&currency.code_like=${curName}&language.name_like=${langName}`;

    axios.get(url).then((response) => {
        let data = response.data;
        let totalLength = data.length;

        if (finish > totalLength) {
            finish = totalLength;
            document.querySelector('.load-more').classList.add('hide');
        } else {
            document.querySelector('.load-more').classList.remove('hide');
        }
        drawSort(pushToArray(data, start, finish));

        const loadMore = document.querySelector('.load-more');
        loadMore.addEventListener('click', () => {
            finish += 20;
            if (finish > totalLength) {
                finish = totalLength;
                document.querySelector('.load-more').classList.add('hide');
            } else {
                document.querySelector('.load-more').classList.remove('hide');
            }
            drawSort(pushToArray(data, start, finish));
        });

        // COUNTRY SORT BUTTONS
        let countrySortDesc = document.querySelector('.co-desc');
        countrySortDesc.addEventListener('click', () => {
            byCountryDesc(data, start, finish);
            document.querySelector('.co-desc').classList.add('hide');
            document.querySelector('.co-asc').classList.remove('hide');
        });

        let countrySortAsc = document.querySelector('.co-asc');
        countrySortAsc.addEventListener('click', () => {
            // countryAsc();
            byCountryAsc(data, start, finish);
            document.querySelector('.co-desc').classList.remove('hide');
            document.querySelector('.co-asc').classList.add('hide');
        });

        // CAPITAL SORT BUTTONS
        let capitalSortDesc = document.querySelector('.ca-desc');
        capitalSortDesc.addEventListener('click', () => {
            byCapitalDesc(data, start, finish); // sort Descending
            document.querySelector('.ca-desc').classList.add('hide');
            document.querySelector('.ca-asc').classList.remove('hide');
        });

        let capitalSortAsc = document.querySelector('.ca-asc');
        capitalSortAsc.addEventListener('click', () => {
            byCapitalAsc(data, start, finish);
            document.querySelector('.ca-desc').classList.remove('hide');
            document.querySelector('.ca-asc').classList.add('hide');
        });

        // CURRENCY SORT BUTTONS
        let currencySortDesc = document.querySelector('.cu-desc');
        currencySortDesc.addEventListener('click', () => {
            byCurrencyDesc(data, start, finish);
            document.querySelector('.cu-desc').classList.add('hide');
            document.querySelector('.cu-asc').classList.remove('hide');
        });

        let currencySortAsc = document.querySelector('.cu-asc');
        currencySortAsc.addEventListener('click', () => {
            byCurrencyAsc(data, start, finish);
            document.querySelector('.cu-desc').classList.remove('hide');
            document.querySelector('.cu-asc').classList.add('hide');
        });

        // CURRENCY SORT BUTTONS
        let languageSortDesc = document.querySelector('.la-desc');
        languageSortDesc.addEventListener('click', () => {
            byLanguageDesc(data, start, finish);
            document.querySelector('.la-desc').classList.add('hide');
            document.querySelector('.la-asc').classList.remove('hide');
        });

        let languageSortAsc = document.querySelector('.la-asc');
        languageSortAsc.addEventListener('click', () => {
            byLanguageAsc(data, start, finish);
            document.querySelector('.la-desc').classList.remove('hide');
            document.querySelector('.la-asc').classList.add('hide');
        });
    });
}

// Sort by Country descending
let byCountryDesc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.count < p2.count ? 1 : p1.count > p2.count ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Country ascending
let byCountryAsc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.count > p2.count ? 1 : p1.count < p2.count ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Capital descending
let byCapitalDesc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.capi < p2.capi ? 1 : p1.capi > p2.capi ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Capital descending
let byCapitalAsc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.capi > p2.capi ? 1 : p1.capi < p2.capi ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Currency descending
let byCurrencyDesc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.cur < p2.cur ? 1 : p1.cur > p2.cur ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Currency ascending
let byCurrencyAsc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.cur > p2.cur ? 1 : p1.cur < p2.cur ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Language descending
let byLanguageDesc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.lang < p2.lang ? 1 : p1.lang > p2.lang ? -1 : 0,
    );
    drawSort(sortedProducts);
};

// Sort by Language ascending
let byLanguageAsc = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = pushToArray(data, start, finish);
    let sortedProducts = sortOutput.sort((p1: apiData, p2: apiData) =>
        p1.lang > p2.lang ? 1 : p1.lang < p2.lang ? -1 : 0,
    );
    drawSort(sortedProducts);
};

const pushToArray = (data: apiReqData[], start: number, finish: number) => {
    let sortOutput = [];
    for (let start = 0; start < finish; start++) {
        sortOutput.push({
            count: data[start].name,
            capi: data[start].capital,
            cur: data[start].currency.code,
            lang: data[start].language.name,
        });
    }
    return sortOutput;
};

const drawSort = (sortedProducts: apiData[]) => {
    document.querySelector('tbody').replaceChildren();
    for (let i = 0; i < sortedProducts.length; i++) {
        let name = sortedProducts[i].count;
        let capital = sortedProducts[i].capi;
        let cur = sortedProducts[i].cur;
        let lang = sortedProducts[i].lang;
        createTableRow(name, capital, cur, lang);
    }
};

// Init Draw
filterOutput('', '', '', '');
