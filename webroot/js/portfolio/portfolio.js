import { companies, states } from './companies.js';

const $cardContainer = $('.card-container');
const $companyCard = $('.company-card');
const $navRegionBtn = $('.nav-region');

let currentRegion = 'all';

const generateCardLinks = links => {
    let renderedLinks = '';
    links.forEach( link => {
        const linkKey = Object.keys(link)[0];
        renderedLinks += `<a class="company-link" href="${link[linkKey]}">${linkKey}</a>`
    });
    return renderedLinks;
};

const formatCompanyName = name => {
    const separateName = name.split(': ');
    return `<h3><span class="red-text">${separateName[0]}</span></h3>
            <h4><span> ${separateName[1]}</span></h4>`;
};

const formatInvestType = (type, link) => {
    const splitString = type.split('(');
    return link ? `<p>${splitString[0]}<a href="${link}">(${splitString[1]}</a></p>`
                : `<p>${type}</p>`;
};

const itemHighlighter = item => {
    const itemArray = item.split(':');
    return `<p><span style="font-weight: bold">${itemArray[0]}</span>: ${itemArray[1]}</p>`
};

// Generate html card 'component' and return it, as long as it belong to currentRegion
const generateCompanyCard = card => {
    const linkElements = generateCardLinks(card.links);
    const cardDiv = `<div class="company-card card row">
                        <div class="row">
                            <div class="col-sm-8 d-flex flex-column justify-content-center">
                                ${formatCompanyName(card.name)}
                                <br>
                                <h5 class="card-subtitle">${card.location}</h5>
                            </div>
                            <div class="col-sm-4">
                                <img class="company-logo" src="${card.logo}" alt="card image for ${card.name}"/>
                            </div>
                        </div>      
                        <div>              
                            <br>
                            ${itemHighlighter(card.investType)}

                            ${formatInvestType(itemHighlighter(card.impactType), card.impactTypeLink)}
                            <p class="card-text">${itemHighlighter(card.desc)}</p>
                            ${linkElements}
                        </div>                    
                    </div>`;
    if (card.region === currentRegion || currentRegion === 'all') {
        return cardDiv;
    } else if (currentRegion === 'US' && states.includes(card.region)) {
        return cardDiv;
    }
};

// Empty card container and repopulate it
const parseCompanies = companies => {
    $cardContainer.empty();
    companies.forEach( company => {
        $cardContainer.append(generateCompanyCard(company));
    });
};

$(document).ready(() => {
    parseCompanies(companies);

    $navRegionBtn.on('click', function() {
        currentRegion = $(this).attr('id');
        parseCompanies(companies);
        $navRegionBtn.removeClass('shadow');
        $(this).addClass('shadow');
    })
});
