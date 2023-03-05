function lockedProfile() {

    const main = document.getElementById('main');
    main.textContent = '';
    const profile = document.querySelectorAll('#profile');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach((e) => {
                //console.log(e[1]);
                let mainDiv = document.createElement('div');
                mainDiv.className = 'profile';
                let img = document.createElement('img');
                img.className = 'userIcon';
                img.src = './iconProfile2.png';
                mainDiv.appendChild(img);

                const lockLabel = document.createElement('label');
                lockLabel.textContent = 'Lock' + ' ';
                mainDiv.appendChild(lockLabel);
                const radioBtn = document.createElement('input');
                radioBtn.type = 'radio';
                radioBtn.name = `${e[1].username}Locked`;
                radioBtn.value = 'lock';
                radioBtn.setAttribute('checked', '');
                mainDiv.appendChild(radioBtn);

                const unlockLabel = document.createElement('label');
                unlockLabel.textContent = ' ' + 'Unlock' + ' ';
                mainDiv.appendChild(unlockLabel);
                const radioBtn1 = document.createElement('input');
                radioBtn1.type = 'radio';
                radioBtn1.name = `${e.username}Locked`;
                radioBtn1.value = 'unlock';
                radioBtn1.checked = false;
                mainDiv.appendChild(radioBtn1);
                let hr = document.createElement('hr');
                mainDiv.appendChild(hr);
                const usernameLabel = document.createElement('label');
                usernameLabel.textContent = 'Username';
                mainDiv.appendChild(usernameLabel);
                const usernameField = document.createElement('input');
                usernameField.type = 'text';
                usernameField.setAttribute('name', `${e[1].username}`);
                usernameField.setAttribute('value', `${e[1].username}`);
                usernameField.setAttribute('disabled', true);
                usernameField.setAttribute('readonly', true);
                mainDiv.appendChild(usernameField);
                //*****hidden ******//
                const hidden = document.createElement('div');
                hidden.setAttribute('id', `${e[1].username}HiddenFields`);
                let hr1 = document.createElement('hr');
                hidden.appendChild(hr1);
                const email = document.createElement('label');
                email.textContent = 'Email:' + ' ';
                hidden.appendChild(email);
                const emailField = document.createElement('input');
                emailField.type = ('email');
                emailField.setAttribute('name', `${e[1].username}`);
                emailField.setAttribute('value', `${e[1].email}`);
                emailField.setAttribute('disabled', true);
                emailField.setAttribute('readonly', true);
                hidden.appendChild(emailField);
                const age = document.createElement('label');
                age.textContent = ' ' + 'Age:' + ' ';
                hidden.appendChild(age);
                const ageField = document.createElement('input');
                ageField.type = ('email');
                ageField.setAttribute('name', `${e[1].Age}`);
                ageField.setAttribute('value', `${e[1].age}`);
                ageField.setAttribute('disabled', true);
                ageField.setAttribute('readonly', true);
                hidden.style.display = 'none';
                hidden.appendChild(ageField);
                mainDiv.appendChild(hidden);
                //  create showButton
                let showBtn = document.createElement('button');
                showBtn.textContent = 'Show more';
                showBtn.disabled = true;
                mainDiv.appendChild(showBtn);
                main.appendChild(mainDiv);
                radioBtn.addEventListener('click', () => {
                    radioBtn1.checked = false;
                    showBtn.disabled = true;
                });

                radioBtn1.addEventListener('click', () => {
                    radioBtn.checked = false;
                    showBtn.disabled = false;
                    showBtn.addEventListener('click', showFunc);
                });
                function showFunc() {
                    hidden.style.display = 'block';
                    showBtn.textContent = 'Hide it';
                    showBtn.removeEventListener('click', showFunc);
                    showBtn.addEventListener('click', hideFunc);
                }
                function hideFunc() {
                    hidden.style.display = 'none';
                    showBtn.textContent = 'Show more';
                    showBtn.removeEventListener('click', hideFunc);
                    showBtn.addEventListener('click', showFunc);
                }
            });
        });
}