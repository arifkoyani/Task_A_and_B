document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    nextButton.addEventListener('click', () => {
        page1.classList.remove('active');
        page2.classList.add('active');
    });
    prevButton.addEventListener('click', () => {
        page2.classList.remove('active');
        page1.classList.add('active');
    });
});
async function fetchData() {
    try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        console.log(data);
        renderUsers(data);
        const response2 = await fetch('https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=');
        const repoData = await response2.json();
        console.log('Data from second API:', repoData);
        renderStars(repoData.items);
    } catch (error) {
        console.log("Error: ", error);
    }
}
function renderStars(repos) {
    const repoList = document.getElementById('repoList');
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        const repoName = document.createElement('h2');
        repoName.classList.add('repo-name');
        repoName.textContent =` name:${repo.name}`;
        const repoDescription = document.createElement('p');
        repoDescription.textContent = `id: ${repo.id}`;
        repoDescription.classList.add('repo-description')
        const repoStars = document.createElement('p');
        repoStars.textContent = `Stars: ${repo.stargazers_count}`;
        repoStars.classList.add('total-repository-stars')
        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = "Hyper Link";
        repoLink.classList.add('repo-list')
        const lineBreak = document.createElement('br');
        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDescription);
        repoCard.appendChild(repoStars);
        repoCard.appendChild(repoLink);
        repoCard.appendChild(lineBreak);
        repoList.appendChild(repoCard);
    });
}
function renderUsers(users) {
    
    const userList = document.getElementById('userList');

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        const id =document.createElement('h2')
        id.textContent = user.id
        const url = document.createElement('h3')
        url.textContent = user.type
        const userName = document.createElement('h3');
        userName.textContent = user.login;
        const userProfileLink = document.createElement('a');
        userProfileLink.href = user.html_url    ;
        userProfileLink.textContent = "Profile";
        const lineBreak = document.createElement('br');
        userCard.appendChild(id)
        userCard.appendChild(userName);
        userCard.appendChild(url)
        userCard.appendChild(userProfileLink);
        userCard.appendChild(lineBreak);
        userList.appendChild(userCard);
    });
}
fetchData();