$(document).ready(function () {
  $("#searchUser").on("keyup", function (e) {
    let username = e.target.value;
    $.ajax({
      url: "http://api.github.com/users/" + username,
      data: {
        client_id: "51c3bbf488eca5cb08ec",
        client_secret: "2560ffa4d91c8cb6ff35b7bea2bc07d016b55787",
      },
    }).done(function (user) {
      $.ajax({
        url: "http://api.github.com/users/" + username + "/repos",
        data: {
          client_id: "51c3bbf488eca5cb08ec",
          client_secret: "2560ffa4d91c8cb6ff35b7bea2bc07d016b55787",
          sort: "created: asc",
          per_page: 5,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $("#repos").append(`
          <div class="well">
          <div class = "row">
          <div class = "col-md-7">
          <strong> ${repo.name}</strong>:${repo.description}
          </div>
          <div class = "col-md-3">
          <span class="badge badge-secondary">Forks: ${repo.forks_count}</span>
      <span class="badge badge-info">Watchers: ${repo.watchers}</span>
       <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
          </div>
          <div class = "col-md-2">

          <a href="${repo.html_url}" target="_blank" class="btn btn-primary m-1">Repo Page</a>
          </div>
          </div>
          </div>
          `);
        });
      });

      $("#profile").html(`
    <div class="card">
  <h5 class="card-header">${user.name}</h5>
  <div class="card-body">
    <div class="row">
    <div class="col-md-3">
    <img class="img-thumbnail" style="width:100%" src="${user.avatar_url}">
    <a target ="_blank" href="${user.html_url}" class="btn btn-primary">View Profile</a>
    </div>
    <div class = "col-md-9">
     <span class="badge badge-secondary">Public Repos: ${user.public_repos}</span>
      <span class="badge badge-info">Public Gists: ${user.public_gists}</span>
       <span class="badge badge-primary">Followers: ${user.followers}</span>
    <span class="badge badge-danger">Following: ${user.following}</span>
    <div>
    <ul class="list-group">
  <li class="list-group-item">Company: ${user.company}</li>
  <li class="list-group-item">Website/blog: ${user.blog}</li>
  <li class="list-group-item">Location: ${user.location}</li>
  <li class="list-group-item">Member since: ${user.created_at}</li>
 
</ul>
</div>
    
    
    </div>
    </div>
    
    
  </div>
</div>
<h3 class ="page-header"> Latest Repos</h3>
<div id ="repos" class=""> </div>
    
    `);
    });
  });
});
