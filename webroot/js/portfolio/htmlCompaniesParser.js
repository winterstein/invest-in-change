// Paste this snippet directly to the console on a published Invest in Change newsletter
// at mailchimp. Eg: https://mailchi.mp/30585d3b2e88/invest-in-change-may-opportunities-284843
// then copy the resulting json.

// @Andris -- good doc notes above. Could you also put a note in the wiki, so people know to look at this file? Thanks ^Dan


// This code fits with mailchimp's auto-generated html -- if could break in the future if they change.

const doc = document.getElementsByTagName('html')[0];

let output = [];

const h3s = Array.from(doc.getElementsByTagName('h3')).filter(e => {
    if (e.className !== 'null') return e;
}).map(e => e.innerText);

const cards = Array.from(doc.getElementsByClassName('mcnCaptionBlockInner'));
console.log(cards[0]);

cards.forEach(card => {
    let obj = {};

    obj.logo = card.querySelector('img').src;
    obj.name = card.querySelector('h3').innerText;
    const fullLocation = card.querySelector('h4').innerText.split(', ');
    obj.location = fullLocation[0];
    obj.region = fullLocation[1];
    const pLines = Array.from(card.getElementsByTagName('p'));
    obj.investType = pLines[0].innerText;
    obj.taxRelief = pLines[1].innerText;
    obj.endDate = pLines[2].innerText;
    obj.impactType = pLines[3].innerText;
    const impactLink = Array.from(pLines[3].getElementsByTagName('a'));
    obj.impactTypeLink = impactLink.length > 0 ? impactLink[0].getAttribute('href') : '';
    obj.desc = pLines[4].innerText;
    const links = Array.from(card.getElementsByTagName('a'));
    links.forEach( link => {
        const linkText = link.innerText;
        const linkHref = link.getAttribute('href');
        if (!obj.links) obj.links = [];
        else obj.links.push({ [linkText]: linkHref })
    });

    output.push(obj);
});

console.log(JSON.stringify(output));