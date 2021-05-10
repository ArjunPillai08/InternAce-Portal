function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// const booleans = items.map(boolFromStringOtherwiseNull)

function boolFromStringOtherwiseNull(s) {
    if (s == 'true') return true
    if (s == 'false') return false
    return null
}

async function getJobs() {
    if (getParameterByName('industry') === null) {
        fetchInternJobs();
    } else {

        const industry = getParameterByName('industry');
        const position = getParameterByName('position');
        const paid = getParameterByName('paid').split(',').map(boolFromStringOtherwiseNull);
        const remote = getParameterByName('remote').split(',').map(boolFromStringOtherwiseNull);
        try {
            const res = await fetch(`${SERVER_URL}/filter`, {
                method: 'POST',
                body: JSON.stringify({
                    "position": position,
                    "industry": industry,
                    "paid": paid,
                    "remote": remote
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (res.status == 200) {
                if (data.length == 0) {
                    getElementById('main').innerHTML = '';
                    document.getElementById('no-results').style.display = 'block';
                    document.getElementById('no-results').innerHTML = "No Results found for your search!";
                } else {
                    document.getElementById('no-results').style.display = 'none';
                    createJobCards(data);
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }
}

getJobs();

async function fetchInternJobs() {
    try {
        const res = await fetch(SERVER_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.status == 200) {
            createJobCards(data)
        }

    }
    catch (err) {
        console.log(err);
    }
}


function createElement(ele) {
    return document.createElement(ele);
}

function getElementById(id) {
    return document.getElementById(id);
}

function createJobCards(data) {
    getElementById('main').innerHTML = '';
    data.forEach(element => {

        // outer div
        const mainContent = createElement('div');
        mainContent.className = 'candidate-description client-description applicants-content';

        getElementById('main').appendChild(mainContent);


        // First part
        // content div
        const clientDes = createElement('div');
        clientDes.className = 'language-print client-des';


        const clearFixDiv = createElement('div');
        clearFixDiv.className = 'clearfix';

        const pullLeftDiv = createElement('div');
        pullLeftDiv.className = 'pull-left';

        const position = createElement('h5');
        position.className = 'name';
        position.innerHTML = element.position;

        const industryName = createElement('a');
        industryName.className = 'industry';
        industryName.setAttribute('href', '#');
        industryName.innerHTML = element.industry;

        pullLeftDiv.appendChild(position);
        pullLeftDiv.appendChild(industryName);

        clearFixDiv.appendChild(pullLeftDiv);

        clientDes.appendChild(clearFixDiv);
        mainContent.appendChild(clientDes);

        // First part end


        // Details Part
        const details = createElement('div');
        details.id = 'details';
        details.className = 'profile-card-loc';

        const locIconElement = createElement('i');
        locIconElement.id = 'location-icon';
        locIconElement.className = 'fa fa-map-marker';

        const locationNameelement = createElement('span');
        locationNameelement.id = 'location-name';
        locationNameelement.className = 'profile-card-loc__txt';

        if (element.location) {
            locationNameelement.innerHTML = element.location;
        } else {
            locationNameelement.innerHTML = 'Not mentioned';
        }

        const datePosted = createElement('div');
        datePosted.id = 'posted-date';

        const dateIcon = createElement('img');
        dateIcon.src = 'https://cdn0.iconfinder.com/data/icons/find-a-job-1/512/523_Calendar_Date_Day_Time_Job-512.png';
        dateIcon.setAttribute('width', '25px');
        dateIcon.setAttribute('height', '25px');

        const date = createElement('h6');
        date.style.display = 'inline-block';
        date.innerHTML = element.date_posted;

        datePosted.appendChild(dateIcon);
        datePosted.appendChild(date);

        const lineBreak = createElement('br');
        const lineBreak2 = createElement('br');
        const lineBreak3 = createElement('br');
        const lineBreak4 = createElement('br');
        const lineBreak5 = createElement('br');

        const companyHeading = createElement('span');
        companyHeading.innerHTML = 'Company: ';

        const companyTextElement = createElement('span');
        companyTextElement.innerHTML = element.company;
        companyTextElement.className = 'active-color';

        const paymentHeading = createElement('span');
        paymentHeading.innerHTML = 'Pay amount: ';

        const paymentAmount = createElement('span');

        if (element.payment_amount) {
            paymentAmount.innerHTML = "Yes";
            paymentAmount.className = 'active-color';
        } else {
            paymentAmount.innerHTML = "Not mentioned";
            paymentAmount.className = 'na-color';
        }


        const workRemotelyHeading = createElement('span');
        workRemotelyHeading.innerHTML = 'Work remotely: ';

        const workStatusElement = createElement('span');

        if (element.is_remote) {
            workStatusElement.innerHTML = "Yes";
            workStatusElement.className = 'active-color workRemotely';
        } else {
            workStatusElement.innerHTML = "Not mentioned";
            workStatusElement.className = 'na-color workRemotely';
        }

        const isPaidHeading = createElement('span');
        isPaidHeading.innerHTML = 'Paid: ';

        const isPaidStatusElement = createElement('span');

        if (element.is_paid) {
            isPaidStatusElement.innerHTML = "Yes";
            isPaidStatusElement.className = 'active-color paid';
        } else {
            isPaidStatusElement.innerHTML = "Not mentioned";
            isPaidStatusElement.className = 'na-color paid';

        }

        const moreInfoButton = createElement('div');
        moreInfoButton.className = 'toggle-details text-right';

        const moreInfoAnchor = createElement('a');
        moreInfoAnchor.className = 'btn btn-toggle';
        moreInfoAnchor.setAttribute('target', '_blank');
        moreInfoAnchor.setAttribute('href', element.href);
        moreInfoAnchor.innerHTML = 'Info';

        moreInfoButton.appendChild(moreInfoAnchor);


        details.appendChild(locIconElement);
        details.appendChild(locationNameelement);
        details.appendChild(datePosted);
        details.appendChild(lineBreak);
        details.appendChild(companyHeading);
        details.appendChild(companyTextElement);
        details.appendChild(lineBreak2);
        details.appendChild(workRemotelyHeading);
        details.appendChild(workStatusElement);
        details.appendChild(lineBreak3);
        details.appendChild(isPaidHeading);
        details.appendChild(isPaidStatusElement);
        details.appendChild(lineBreak4);
        details.appendChild(paymentHeading);
        details.appendChild(paymentAmount);
        details.appendChild(lineBreak5);


        clientDes.appendChild(details);
        clientDes.appendChild(moreInfoButton)

    })
}

async function filterElements() {
    let industry = document.getElementById('industry').value;
    let remote = document.getElementById('workRemotely').value;
    let paid = document.getElementById('paid').value;
    const position = document.getElementById('searchInput').value;

    if (industry == 'Any') {
        industry = '';
    }

    if (paid == 'All') {
        paid = [true, false, null]
    } else if (paid == 'Yes') {
        paid = [true]
    } else {
        paid = [false]
    }

    if (remote == 'All') {
        remote = [true, false, null]
    } else if (remote == 'Yes') {
        remote = [true]
    } else {
        remote = [false]
    }
    try {
        const res = await fetch(`${SERVER_URL}/filter`, {
            method: 'POST',
            body: JSON.stringify({
                "position": position,
                "industry": industry,
                "paid": paid,
                "remote": remote
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.status == 200) {
            if (data.length == 0) {
                getElementById('main').innerHTML = '';
                document.getElementById('no-results').style.display = 'block';
                document.getElementById('no-results').innerHTML = "No Results found for your search!";
            } else {
                document.getElementById('no-results').style.display = 'none';
                createJobCards(data);
            }
        }

    }
    catch (err) {
        console.log(err);
    }


}


(async () => {
    try {
        const res = await fetch(`${SERVER_URL}/industry`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.status == 200) {
            const mainElement = document.getElementById('industry');

            const anyElement = document.createElement('option');
            anyElement.innerHTML = 'Any';
            anyElement.setAttribute('value', 'Any');

            mainElement.appendChild(anyElement);

            data.forEach((element) => {
                const industryType = document.createElement('option');
                industryType.innerHTML = element;
                industryType.setAttribute('value', element);
                mainElement.appendChild(industryType);
            })
        }

    }
    catch (err) {
        console.log(err);
    }
})();