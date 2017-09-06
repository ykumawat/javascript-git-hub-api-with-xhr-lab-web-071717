const token = `token `

function getRepositories() {
  event.preventDefault()
  const currentUser = document.getElementById('username').value
  const req = new XMLHttpRequest()
  //req.state = 'OPENED'
  req.addEventListener("load", showRepositories);
  req.open("GET", (`https://api.github.com/users/` + currentUser + `/repos`))
  req.setRequestHeader("Authorization", `token `)
  req.send()
}

function showRepositories(event, data) { //event is load, data is whatever we get back after request is loaded
  var repos = JSON.parse(this.responseText) //outputs a string and converts to object
    console.log(repos)
    const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<br> - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a><br>-<a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
    //the above assists us in iterating over the array of objects
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el, token) {
  event.preventDefault()
  const currentUser = document.getElementById('username').value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.state = "opened"
  req.addEventListener("load", displayCommits)
  req.open("GET", ('https://api.github.com/repos/' + currentUser + '/'+ name + '/commits'))
  req.setRequestHeader("Authorization", `token `)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el, token) {
  event.preventDefault()
  const currentUser = document.getElementById('username').value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.state = "opened"
  req.addEventListener("load", displayBranches)
  req.open("GET", ('https://api.github.com/repos/' + currentUser + '/'+ name + '/branches'))
  req.setRequestHeader("Authorization", `token `)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(commit => '<li><strong>' + commit.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
