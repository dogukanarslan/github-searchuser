const apiURL = "https://api.github.com"
const searchPath = "/search/users"
const usersPath = "/users"

export const getUsers = (name, location, language, sort, page, itemsPerPage) => {
  return fetch(`${apiURL}${searchPath}?q=${name}location:%22${location}%22language:%22${language}%22&sort=${sort}&page=${page}&per_page=${itemsPerPage}`)
};

export const getUser = (login) => {
  return fetch(`${apiURL}${usersPath}/${login}`)
};


export const options = {
  locationOptions:[
    {name:"World",value:""},
    {name:"Istanbul",value:"istanbul"},
    {name:"Ankara",value:"ankara"},
    {name:"İzmir",value:"izmir"},
  ],
  languageOptions:[
    {name:"All",value:"all"},
    {name:"JavaScript",value:"javascript"},
    {name:"Python",value:"python"},
    {name:"Java",value:"java"},
    {name:"Ruby",value:"ruby"},
    {name:"C",value:"c"},
    {name:"C#",value:"csharp"},
    {name:"Pascal",value:"pascal"},
    {name:"Fortran",value:"fortran"},
  ],
  sortOptions:[
    {name:"Followers - High to Low",value: "followers"},
    {name:"Repositories - High to Low",value: "repositories"},
  ]
}
