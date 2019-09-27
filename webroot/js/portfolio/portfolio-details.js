import { companies } from './companies.js';

const getCompanyObjFromId = id => {
    return companies.filter(company => {
        if (company.name === id) { return company }
        else { return }
    })[0]
}

const generateLinkElements = links => {
    return links.map(link => {
        const linkKey = Object.keys(link);
        return `<li class="list-inline-item">
            <a id="company-link" href="${link[linkKey]}">
                <h5>${linkKey}</h5>
            </a>
        </li>`
    })
}

const companyCard = company => {
    const formattedName = company.name.split(': ');

    return (
    `<div class="col-lg-6 col-md-12">
                  <div class="section-title mb-0">
                    <h2 class="mb-2"><span>${formattedName[0]}</span></h2>
                    <h4>${formattedName[1]}</h4>
                  </div>
                  <p>${company.desc}</p>
                </div>
                <div class="col-lg-6 col-md-12">
                  <ul class="portfolio-meta list-unstyled mt-5">
                    <li class="mb-3"><span> Location : </span> ${company.location}, ${company.region}</li>
                    <li class="mb-3"><span> Investment type :</span> ${company.investType.split(': ')[1]}</li>
                    <li class="mb-3"><span> Campaign end :</span> ${company.endDate.split(': ')[1]}</li>
                    <li class="mb-3"><span> Impact type :</span> ${company.impactType.split(': ')[1]}</li>
                  </ul>

                  <div class="social-icon">
                    <span></span>
                  <ul class="list-inline mb-0">
                    ${generateLinkElements(company.links).join(' - ')}
                  </ul>
                </div>`
                )
}

const getIdFromUrl = () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    return id && id.length ? id : '';
}

$(document).ready(() => {
    const id = getIdFromUrl();
    const company = getCompanyObjFromId(id);
    const card = companyCard(company);
    console.log(company);

    $('#card-container').append(card);
    $('#company-img').attr('src', company.logo);
})