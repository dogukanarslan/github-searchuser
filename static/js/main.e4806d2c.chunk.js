(this.webpackJsonpgithubsearch=this.webpackJsonpgithubsearch||[]).push([[0],{23:function(e,a,t){e.exports=t(36)},28:function(e,a,t){},30:function(e,a,t){},36:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),s=t(20),c=t.n(s),r=(t(28),t(29),t(30),t(1));function m(){return n.a.createElement("nav",{className:"navbar navbar-expand navbar-dark bg-dark"},n.a.createElement(r.b,{className:"navbar-brand",to:"/"},n.a.createElement("i",{className:"fab fa-github fa-2x"})),n.a.createElement("ul",{className:"navbar-nav ml-auto"},n.a.createElement("li",{className:"nav-item"},n.a.createElement(r.b,{className:"nav-link",to:"/"},"Home")),n.a.createElement("li",{className:"nav-item"},n.a.createElement(r.b,{className:"nav-link",to:"/rankings"},"Rankings")),n.a.createElement("li",{className:"nav-item"},n.a.createElement(r.b,{className:"nav-link",to:"/about"},"About")),n.a.createElement("li",{className:"nav-item"},n.a.createElement(r.b,{className:"nav-link",to:"/contact"},"Contact"))))}var o=t(7),i=t(9),u=t(10),d=t(12),E=t(11),h=t(6),p=t(13);function g(e){return n.a.createElement("div",{className:"col-6 col-md-3"},n.a.createElement("div",{className:"card mb-4"},n.a.createElement("img",{className:"card-img-top",src:e.avatar_url,alt:""}),n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title small"},e.login),n.a.createElement(r.b,{to:"/details/".concat(e.login),className:"btn btn-outline-dark btn-sm"},"More Info"))))}var N=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(d.a)(this,Object(E.a)(a).call(this,e))).state={user:[],inputVal:"",location:"",language:"",sort:"followers",itemsPerPage:40,pageNumber:1,lowerLimit:1},t.inputHandlerChange=t.inputHandlerChange.bind(Object(h.a)(t)),t.inputHandlerSubmit=t.inputHandlerSubmit.bind(Object(h.a)(t)),t.selectLocationChange=t.selectLocationChange.bind(Object(h.a)(t)),t.selectSortChange=t.selectSortChange.bind(Object(h.a)(t)),t.selectLanguageChange=t.selectLanguageChange.bind(Object(h.a)(t)),t.nextPage=t.nextPage.bind(Object(h.a)(t)),t.previousPage=t.previousPage.bind(Object(h.a)(t)),t}return Object(p.a)(a,e),Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.github.com/search/users?q=".concat(this.state.inputVal,"location:%22").concat(this.state.location,"%22+language:%22").concat(this.state.language,"%22&sort=").concat(this.state.sort,"&per_page=").concat(this.state.itemsPerPage)).then((function(e){return e.json()})).then((function(a){return e.setState({user:a})}))}},{key:"inputHandlerChange",value:function(e){this.setState({inputVal:e.target.value})}},{key:"selectLocationChange",value:function(e){this.setState({location:e.target.options[e.target.options.selectedIndex].value})}},{key:"selectSortChange",value:function(e){this.setState({sort:e.target.options[e.target.options.selectedIndex].value})}},{key:"selectLanguageChange",value:function(e){this.setState({language:e.target.options[e.target.options.selectedIndex].value})}},{key:"inputHandlerSubmit",value:function(e){var a=this;e.preventDefault(),fetch("https://api.github.com/search/users?q=".concat(this.state.inputVal,"location:%22").concat(this.state.location,"%22+language:%22").concat(this.state.language,"%22&sort=").concat(this.state.sort,"&per_page=").concat(this.state.itemsPerPage)).then((function(e){return e.json()})).then((function(e){return a.setState({user:e,lowerLimit:1,upperLimit:a.state.itemsPerPage})}))}},{key:"nextPage",value:function(){var e=this;document.body.scrollTop=0,document.documentElement.scrollTop=0,this.setState({pageNumber:this.state.pageNumber+1,lowerLimit:this.state.itemsPerPage+this.state.lowerLimit},(function(){return fetch("https://api.github.com/search/users?q=".concat(e.state.inputVal,"location:%22").concat(e.state.location,"%22+language:%22").concat(e.state.language,"%22&sort=").concat(e.state.sort,"&page=").concat(e.state.pageNumber,"&per_page=").concat(e.state.itemsPerPage)).then((function(e){return e.json()})).then((function(a){return e.setState({user:a})}))}))}},{key:"previousPage",value:function(){var e=this;document.body.scrollTop=0,document.documentElement.scrollTop=0,this.setState({pageNumber:this.state.pageNumber-1,lowerLimit:this.state.lowerLimit-this.state.itemsPerPage},(function(){return fetch("https://api.github.com/search/users?q=".concat(e.state.inputVal,"location:%22").concat(e.state.location,"%22+language:%22").concat(e.state.language,"%22&sort=").concat(e.state.sort,"&page=").concat(e.state.pageNumber,"&per_page=").concat(e.state.itemsPerPage)).then((function(e){return e.json()})).then((function(a){return e.setState({user:a})}))}))}},{key:"render",value:function(){return 0===this.state.user.length||this.state.user.hasOwnProperty("message")?n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"spinner-border",role:"status"},n.a.createElement("span",{className:"sr-only"})),n.a.createElement("p",{className:"lead"},"Loading")))):n.a.createElement("div",{className:"Home"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("form",{className:"my-3",onSubmit:this.inputHandlerSubmit},n.a.createElement("div",{className:"form-row"},n.a.createElement("div",{className:"form-group col-md-3"},n.a.createElement("label",{htmlFor:"username"},"Username"),n.a.createElement("input",{className:"form-control",type:"text",id:"username",value:this.state.inputVal,onChange:this.inputHandlerChange})),n.a.createElement("div",{className:"form-group col-md-3"},n.a.createElement("label",{htmlFor:"location"},"Location"),n.a.createElement("select",{className:"form-control",id:"location",onChange:this.selectLocationChange},n.a.createElement("option",{value:"",defaultValue:!0},"World"),n.a.createElement("option",{value:"istanbul"},"\u0130stanbul"),n.a.createElement("option",{value:"ankara"},"Ankara"),n.a.createElement("option",{value:"izmir"},"\u0130zmir"))),n.a.createElement("div",{className:"form-group col-md-3"},n.a.createElement("label",{htmlFor:"languages"},"Language"),n.a.createElement("select",{className:"form-control",id:"languages",onChange:this.selectLanguageChange},n.a.createElement("option",{value:"",defaultValue:!0},"All"),n.a.createElement("option",{value:"javascript"},"JavaScript"),n.a.createElement("option",{value:"python"},"Python"),n.a.createElement("option",{value:"java"},"Java"),n.a.createElement("option",{value:"ruby"},"Ruby"),n.a.createElement("option",{value:"c"},"C"),n.a.createElement("option",{value:"csharp"},"C#"),n.a.createElement("option",{value:"pascal"},"Pascal"),n.a.createElement("option",{value:"fortran"},"Fortran"))),n.a.createElement("div",{className:"form-group col-md-3"},n.a.createElement("label",{htmlFor:"sort"},"Sort by"),n.a.createElement("select",{className:"form-control",id:"sort",onChange:this.selectSortChange},n.a.createElement("option",{value:"followers",defaultValue:!0},"Followers - High to Low"),n.a.createElement("option",{value:"repositories"},"Repositories - High to Low")))),n.a.createElement("button",{className:"btn btn-dark",type:"submit"},"Search")))),n.a.createElement("p",{className:"lead"},this.state.lowerLimit,"-",this.state.lowerLimit+this.state.user.items.length-1," of ",this.state.user.total_count," results"),n.a.createElement("div",{className:"row"},this.state.user.items.slice(0,this.state.itemsPerPage).map((function(e,a){return n.a.createElement(g,Object.assign({key:Math.random()},e))}))),n.a.createElement("nav",null,n.a.createElement("ul",{className:"pagination justify-content-between"},1===this.state.lowerLimit?n.a.createElement("button",{disabled:!0,className:"btn btn-dark",onClick:this.previousPage},"\xab Previous Page"):n.a.createElement("button",{className:"btn btn-dark",onClick:this.previousPage},"\xab Previous Page"),this.state.lowerLimit+this.state.user.items.length-1===this.state.user.total_count?n.a.createElement("button",{disabled:!0,className:"btn btn-dark",onClick:this.nextPage},"Next Page \xbb"):n.a.createElement("button",{className:"btn btn-dark",onClick:this.nextPage},"Next Page \xbb")))))}}]),a}(n.a.Component);function v(e){return n.a.createElement(N,{allData:e.allData,istanbulData:e.istanbulData,ankaraData:e.ankaraData,izmirData:e.izmirData})}function b(){return n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row text-center my-5"},n.a.createElement("div",{className:"col"},n.a.createElement("h2",null,"Github Search Documentation"))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-4"},n.a.createElement("h4",null,n.a.createElement("i",{className:"fas fa-book"})," Github Search Manual"),n.a.createElement("hr",null),n.a.createElement("p",{className:"lead"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida.")),n.a.createElement("div",{className:"col-md-4"},n.a.createElement("h4",null,n.a.createElement("i",{className:"fas fa-cog"})," API Limitations"),n.a.createElement("hr",null),n.a.createElement("p",{className:"lead"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida.")),n.a.createElement("div",{className:"col-md-4"},n.a.createElement("h4",null,n.a.createElement("i",{class:"fas fa-comment-alt"})," Github Search Forum"),n.a.createElement("hr",null),n.a.createElement("p",{className:"lead"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida."))),n.a.createElement("div",{className:"row text-center my-2"},n.a.createElement("div",{className:"col"},n.a.createElement("h2",null,"Technologies"))),n.a.createElement("div",{className:"row text-center"},n.a.createElement("div",{className:"col-md"},n.a.createElement("i",{className:"fab fa-html5 fa-7x"}),n.a.createElement("p",{className:"lead"},"HTML")),n.a.createElement("div",{className:"col-md"},n.a.createElement("i",{className:"fab fa-css3-alt fa-7x"}),n.a.createElement("p",{className:"lead"},"CSS")),n.a.createElement("div",{className:"col-md"},n.a.createElement("i",{className:"fab fa-js-square fa-7x"}),n.a.createElement("p",{className:"lead"},"JavaScript")),n.a.createElement("div",{className:"col-md"},n.a.createElement("i",{className:"fab fa-react fa-7x"}),n.a.createElement("p",{className:"lead"},"React")),n.a.createElement("div",{className:"col-md"},n.a.createElement("i",{className:"fab fa-bootstrap fa-7x"}),n.a.createElement("p",{className:"lead"},"Bootstrap"))))}function f(){return n.a.createElement("div",{className:"container"},n.a.createElement("form",{className:"mb-5"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md"},n.a.createElement("div",{className:"form-group"},n.a.createElement("h4",{className:"display-4"},"Get in touch")))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6"},n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",className:"form-control",placeholder:"Name"})))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6"},n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"email",className:"form-control",placeholder:"Email"})))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6"},n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",className:"form-control",placeholder:"Subject"})))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 col-sm"},n.a.createElement("div",{className:"form-group"},n.a.createElement("textarea",{className:"form-control",placeholder:"Enter your message"})))),n.a.createElement("button",{className:"btn btn-dark",type:"button"},"Submit")))}function x(e){return n.a.createElement("div",{className:"col-md"},n.a.createElement("div",{className:"card mb-4"},n.a.createElement("img",{className:"card-img-top",src:e.avatar_url,alt:""}),n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title small"},e.login),n.a.createElement(r.b,{to:"/details/".concat(e.login),className:"btn btn-outline-dark btn-sm"},"More Info"))))}var y=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(d.a)(this,Object(E.a)(a).call(this,e))).state={allData:[],istanbulData:[],ankaraData:[]},t}return Object(p.a)(a,e),Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.github.com/search/users?q=location:%22%22&sort=followers&per_page=3").then((function(e){return e.json()})).then((function(a){return e.setState({allData:a})})),fetch("https://api.github.com/search/users?q=location:istanbul&sort=followers&per_page=3").then((function(e){return e.json()})).then((function(a){return e.setState({istanbulData:a})})),fetch("https://api.github.com/search/users?q=location:ankara&sort=followers&per_page=3").then((function(e){return e.json()})).then((function(a){return e.setState({ankaraData:a})}))}},{key:"render",value:function(){return 0===this.state.allData.length||0===this.state.istanbulData.length||0===this.state.ankaraData.length||this.state.allData.hasOwnProperty("message")||this.state.istanbulData.hasOwnProperty("message")||this.state.ankaraData.hasOwnProperty("message")?n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"spinner-border",role:"status"},n.a.createElement("span",{className:"sr-only"})),n.a.createElement("p",{className:"lead"},"Loading")))):n.a.createElement("div",{className:"rankings"},n.a.createElement("div",{className:"jumbotron jumbotron-fluid"},n.a.createElement("div",{className:"container"},n.a.createElement("h1",{className:"display-4"},"Top 3 Developers"),n.a.createElement("p",{className:"lead"},"Most followed developers around the world and various cities of Turkey"))),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"mb-2 text-center"},n.a.createElement("h4",{className:"display-2"},"World")))),n.a.createElement("div",{className:"row"},this.state.allData.items.map((function(e){return n.a.createElement(x,Object.assign({key:Math.random()},e))})))),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"mb-2 text-center"},n.a.createElement("h4",{className:"display-2"},"Istanbul")))),n.a.createElement("div",{className:"row"},this.state.istanbulData.items.map((function(e){return n.a.createElement(x,Object.assign({key:Math.random()},e))})))),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"mb-2 text-center"},n.a.createElement("h4",{className:"display-2"},"Ankara")))),n.a.createElement("div",{className:"row"},this.state.ankaraData.items.map((function(e){return n.a.createElement(x,Object.assign({key:Math.random()},e))})))))}}]),a}(n.a.Component),k=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(d.a)(this,Object(E.a)(a).call(this,e))).state={user:[]},t}return Object(p.a)(a,e),Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.github.com/users/".concat(this.props.match.params.login)).then((function(e){return e.json()})).then((function(a){return e.setState({user:a})}))}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"Details"},console.log(this.props),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row py-5"},n.a.createElement("div",{className:"col-md-4"},n.a.createElement("img",{className:"img-fluid",src:this.state.user.avatar_url,alt:""})),n.a.createElement("div",{className:"col-md-8"},n.a.createElement("p",null,n.a.createElement("strong",null,"Username"),n.a.createElement("br",null),this.state.user.login),n.a.createElement("p",null,n.a.createElement("strong",null,"Name"),n.a.createElement("br",null)," ",this.state.user.name),this.state.user.company&&n.a.createElement("p",null,n.a.createElement("strong",null,"Company"),n.a.createElement("br",null)," ",this.state.user.company),this.state.user.blog&&n.a.createElement("p",null,n.a.createElement("strong",null,"Blog"),n.a.createElement("br",null)," ",this.state.user.blog),this.state.user.location&&n.a.createElement("p",null,n.a.createElement("strong",null,"Location"),n.a.createElement("br",null)," ",this.state.user.location),this.state.user.email&&n.a.createElement("p",null,n.a.createElement("strong",null,"Email"),n.a.createElement("br",null)," ",this.state.user.email),this.state.user.bio&&n.a.createElement("p",null,n.a.createElement("strong",null,"Bio"),n.a.createElement("br",null)," ",this.state.user.bio),n.a.createElement("p",null,n.a.createElement("strong",null,"Public Repositories"),n.a.createElement("br",null),this.state.user.public_repos),n.a.createElement("p",null,n.a.createElement("strong",null,"Followers"),n.a.createElement("br",null)," ",this.state.user.followers),n.a.createElement("p",null,n.a.createElement("strong",null,"Following"),n.a.createElement("br",null)," ",this.state.user.following)),n.a.createElement("span",{onClick:function(){return e.props.history.goBack()}},n.a.createElement("i",{className:"fas fa-arrow-left fa-3x text-dark back-arrow"})))))}}]),a}(n.a.Component);function w(){return n.a.createElement(o.c,null,n.a.createElement(o.a,{exact:!0,path:"/",component:v}),n.a.createElement(o.a,{exact:!0,path:"/rankings",component:y}),n.a.createElement(o.a,{exact:!0,path:"/about",component:b}),n.a.createElement(o.a,{exact:!0,path:"/contact",component:f}),n.a.createElement(o.a,{exact:!0,path:"/details/:login",component:k}))}function P(){return n.a.createElement("footer",{className:"Footer bg-dark"},n.a.createElement("div",{className:"container py-5"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 col-md"},n.a.createElement("p",{className:"lead text-muted"},"Github Search"),n.a.createElement("h1",{className:"small text-muted"},"\xa9 2019")),n.a.createElement("div",{className:"col-6 col-md"},n.a.createElement("h5",{className:"text-muted"},"Features"),n.a.createElement("ul",{className:"list-unstyled text-small"},n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Cool stuff")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Random feature")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Team feature")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Stuff for developers")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Another one")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Last time")))),n.a.createElement("div",{className:"col-6 col-md"},n.a.createElement("h5",{className:"text-muted"},"Resources"),n.a.createElement("ul",{className:"list-unstyled text-small"},n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Resource")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Resource name")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Another resource")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Final resource")))),n.a.createElement("div",{className:"col-6 col-md"},n.a.createElement("h5",{className:"text-muted"},"Resources"),n.a.createElement("ul",{className:"list-unstyled text-small"},n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Business")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Education")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Government")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Gaming")))),n.a.createElement("div",{className:"col-6 col-md"},n.a.createElement("h5",{className:"text-muted"},"About"),n.a.createElement("ul",{className:"list-unstyled text-small"},n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Team")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Locations")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Privacy")),n.a.createElement("li",null,n.a.createElement(r.b,{className:"text-muted",to:"/"},"Terms")))))))}var j=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(m,null),n.a.createElement(w,null),n.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(r.a,null,n.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.e4806d2c.chunk.js.map