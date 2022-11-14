
const createInfoElement = (labelName, value) => {
    const infoElement = document.createElement('div');

    const labelElement = document.createElement('strong')
    labelElement.innerText = labelName + ': '
    infoElement.appendChild(labelElement)

    const valueElement = document.createElement('span')
    valueElement.innerText = value
    infoElement.appendChild(valueElement)

    return infoElement
}

const createImgElement = (country) => {
    const imgContainerElement = document.createElement('div')
    const imgElement = document.createElement('img')
    imgElement.src = country.flagUrl
    imgElement.alt = country.name + ' flag'

    imgContainerElement.appendChild(imgElement)

    return imgContainerElement
}

const createCountryItem = (country) => {
    const listItem = document.createElement('li');

    const anchorElement = document.createElement('a')
    anchorElement.href = `?country=${country.code}`;

    anchorElement.appendChild(createImgElement(country))

    const infoContainerElement = document.createElement('div')
    infoContainerElement.classList.add('info-container')

    const countryNameElement = document.createElement('strong')
    countryNameElement.innerText = country.name
    countryNameElement.classList.add('country-name')
    infoContainerElement.appendChild(countryNameElement)

    infoContainerElement.appendChild(createInfoElement('Capital', country.capital))
    infoContainerElement.appendChild(createInfoElement('Region', country.region))
    infoContainerElement.appendChild(createInfoElement('Population', country.population))

    anchorElement.appendChild(infoContainerElement)

    listItem.appendChild(anchorElement)

    return listItem
}

const createListElement = (countries) => {
    const listElement = document.createElement('ul');
    listElement.classList.add('country-list')

    countries.forEach(country => {
        listElement.appendChild(createCountryItem(country))
    })

    return listElement
}

export const renderCountriesList = (countries) => {
    const root = document.querySelector('#root')
    root.innerHTML = ""
    root.appendChild(createListElement(countries))
}

const createDetailElement = (country) => {
    const detailContainerElement = document.createElement("div");

    const flagImgElement = createImgElement(country);
    const detailContentElement = document.createElement("div");
    detailContainerElement.classList.add("detail-container");
    detailContentElement.classList.add("detail-content");

    const detailNameElement = document.createElement("strong");
    detailNameElement.innerText = country.name;
    detailNameElement.classList.add("detail-name");

    detailContainerElement.appendChild(flagImgElement);
    detailContentElement.appendChild(detailNameElement);

    const leftColumnElement = document.createElement("div");

    leftColumnElement.appendChild(
        createInfoElement("Native name", country.nativeName)
    );
    leftColumnElement.appendChild(
        createInfoElement("Population", country.population)
    );
    leftColumnElement.appendChild(createInfoElement("Region", country.region));
    leftColumnElement.appendChild(
        createInfoElement("Sub region", country.subregion)
    );
    leftColumnElement.appendChild(
        createInfoElement("Capital", country.capital)
    );

    const rightColumnElement = document.createElement("div");

    rightColumnElement.appendChild(
        createInfoElement("Top level domain", country.tld)
    );
    rightColumnElement.appendChild(
        createInfoElement("Currencies", country.currencies)
    );
    rightColumnElement.appendChild(
        createInfoElement("Languages", country.languages)
    );

    detailContentElement.appendChild(leftColumnElement);
    detailContentElement.appendChild(rightColumnElement);

    if (country.borders && country.borders.length > 0) {
        detailContentElement.appendChild(
            createBorderCountriesContainer(country)
        );
    }

    detailContainerElement.appendChild(detailContentElement);

    return detailContainerElement;
};

const createBorderCountriesContainer = (country) => {
    const borderCountriesContainerElement = document.createElement("div");
    borderCountriesContainerElement.classList.add("border-countries-container");
    const labelElement = document.createElement("strong");
    labelElement.innerText = "Border Countries";

    borderCountriesContainerElement.appendChild(labelElement);

    country.borders.forEach((border) => {
        borderCountriesContainerElement.appendChild(
            createDetailButton(border, `/rest-countries/?country=` + border)
        );
    });

    return borderCountriesContainerElement;
};

const createDetailButton = (text, link) => {
    const anchorElement = document.createElement("a");
    anchorElement.innerText = text;
    anchorElement.classList.add("detail-button");
    anchorElement.href = link;

    return anchorElement;
};

export const renderCountryDetails = (country) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createDetailButton("Go back", "/rest-countries/"));
    rootElement.appendChild(createDetailElement(country));
};