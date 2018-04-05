const form = document.querySelector('form')
const input = document.getElementsByName('search')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const { value } = input[0]

    gitHubApi.getUsers(value)
        .then((res) => {
            res.message === 'Not Found' ? printNoResults() : printUser(res)
        })
        .catch(err => console.log(err))


    gitHubApi.getRepos(value)
        .then(data => {
            console.log(data)
            data.message === 'Not Found' ? printNoResults() : printRepos(data)
        })
        .catch(err => console.log(err))
})





printUser = (user) => {
    let userData = document.getElementsByClassName('user-data')
    let noResults = document.getElementsByClassName('no-results')

    noResults[0].style.display = 'none'
    userData[0].style.display = 'flex'

    const bio = user.bio ? user.bio : 'This user did not provide any bio'

    userData[0].innerHTML = `<img src='${user.avatar_url}' alt="user-picture">
                                <div class="user-info">
                                    <h5>
                                        @${user.login}
                                    </h5>
                                    <h1>
                                        ${user.name}
                                    </h1>
                                    <p>
                                        ${bio}
                                    </p>
                                </div>`
}

printRepos = (repos) => {
    let reposList = document.getElementsByClassName('repos-list')
    let userRepos = document.getElementsByClassName('user-repos')
    

    userRepos[0].style.display = 'block'
    

    reposList[0].innerHTML = repos.map(repo => {
        return `<li>
                    <h2>${repo.name}</h2>
                    <div class="icons">
                        <img src="./img/star.svg"> ${repo.stargazers_count}
                        <img src="./img/repo-forked.svg"> ${repo.forks_count}
                    </div>
                </li>
                <hr>`
    }).join('')
}

printNoResults = () => {
    let noResults = document.getElementsByClassName('no-results')
    let userRepos = document.getElementsByClassName('user-repos')
    let userData = document.getElementsByClassName('user-data')


    userRepos[0].style.display = 'none'
    noResults[0].style.display = 'block'
    userData[0].style.display = 'none'

    noResults[0].innerHTML = `<p>Does not exist</p>`
}