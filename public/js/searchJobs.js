function getInternJobs(e) {
    e.preventDefault();
    let industry = document.getElementById('industry').value;
    let remote = document.getElementById('remote').value;
    let paid = document.getElementById('paid').value;
    const position = document.getElementById('position').value;

    if (industry == '0' || industry == 'Any') {
        industry = '';
    }

    if (remote == '0' || remote == 'All') {
        remote = [true, false, null];
    } else if (remote == 'Yes') {
        remote = [true]
    } else {
        remote = [false]
    }

    if (paid == '0' || paid == 'All') {
        paid = [true, false, null]
    } else if (paid == 'Yes') {
        paid = [true]
    } else {
        paid = [false]
    }
    console.log("aaaa");

    window.location.href = `${WEB_URL}/job-search?industry=${industry}&position=${position}&remote=${remote}&paid=${paid}`;
}


(async () => {
    try {
        const res = await fetch(`${SERVER_URL}/industry`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (res.status == 200) {
            const mainElement = document.getElementById('industry');

            const selectCategoryElement = document.createElement('option');
            selectCategoryElement.innerHTML = 'Select Industry';
            selectCategoryElement.setAttribute('value', '0')

            const anyElement = document.createElement('option');
            anyElement.innerHTML = 'Any';
            anyElement.setAttribute('value', 'Any');

            mainElement.appendChild(selectCategoryElement);
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