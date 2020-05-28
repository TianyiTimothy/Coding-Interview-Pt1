window.onload = function () {
  // urls
  // params: roles=id1,id2,id3 => roles=1,3,5
  const allEmployeesUrl = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
  // const allRolesUrl = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";
  // vars
  const membersDOM = document.getElementById("members");

  // use fetch to get data
  getDataFrom(allEmployeesUrl).then(function (employees) {

    // use for in to "iterate" an object
    for (employeeid in employees) {
      // type of index is string
      const index = employeeid + "";
      const employee = employees[index];

      // create an element for each member, and append it to membersDOM
      membersDOM.appendChild(createMemberElement(employee));
    }
  })
  .catch(function (error) {
    alert(error);
  });;
}

async function getDataFrom(url) {
  const response = await fetch(url);
  return response.json();
}

function createNode(element) {
  return document.createElement(element);
}

function appendNode(parent, child) {
  return parent.appendChild(child);
}

function createMemberElement(member) {
  // url for member image
  const memberImgUrlStart = "http://sandbox.bittsdevelopment.com/code1/employeepics/";
  const memberImgUrlEnd = ".jpg";

  // member parent node
  const members__member = createNode("div");
  members__member.className = "flexItem members__member";

  // img
  const members__member_img = createNode("img");
  members__member_img.className = "members__member_img";
  // check if employeehaspic
  members__member_img.src = member.employeehaspic?
    memberImgUrlStart + member.employeeid + memberImgUrlEnd : 
    "src/images/dontpanic.jpg";
  members__member_img.alt = "member number " + member.employeeid;
  // append to member parent node
  appendNode(members__member, members__member_img);

  // name (h2)
  const members__member_name = createNode("h2");
  members__member_name.className = "members__member_name";
  members__member_name.innerText = member.employeefname + " " + member.employeelname;
  // append
  appendNode(members__member, members__member_name);

  // description (p)
  const members__member_description = createNode("p");
  members__member_description.className = "members__member_description";
  members__member_description.innerText = member.employeebio;
  // append
  appendNode(members__member, members__member_description);

  // roles (div), with divs as its child node
  const members__member_roles = createNode("div");
  members__member_roles.className = "members__member_roles";

  for (role of member.roles) {
    const members__member_roles_role = createNode("div");
    members__member_roles_role.className = "members__member_roles_role";
    members__member_roles_role.innerText = role.rolename;
    members__member_roles_role.style.backgroundColor = role.rolecolor;
    if (role.rolecolor === "#FDFFF7") {
      // the api returns a background color which is too light to display white color fonts.
      members__member_roles_role.style.color = "black";
    }
    // append each role to roles node
    appendNode(members__member_roles, members__member_roles_role)
  }

  // append
  appendNode(members__member, members__member_roles);
  
  // employeeisfeatured ? crown:none
  if(member.employeeisfeatured){
    const members__member_crown = createNode("span");
    members__member_crown.innerText="👑";
  }

  return members__member;
}

// const requestInit = () => {
//   if (window.XMLHttpRequest) {
//     request = new XMLHttpRequest();
//     request.overrideMimeType('text/xml');
//     return request;
//   } else {
//     alert("request init error.");
//     return none;
//   }
// }


  // used XMLHttpRequest() here. but fetch() is better
  // const request = requestInit();
  // get request
  // listen to ready state -> open -> send
  // request.onreadystatechange = () => {
  //     if (request.readyState == 4) {
  //     const status = request.status;
  //     if (status === 200) {
  //       const dataJSON = request.responseText;
  //       dataArr = JSON.parse(dataJSON);
  //       console.log(dataArr[1]);
  //     } else {
  //       this.alert("HTTP status error.")
  //       return none;
  //     }
  //   }
  // };
  // request.open('GET', allEmployeesUrl, true);
  // request.send();

  /*  HTML for one member:
      <div class="flexible members" id="members">
        <div class="flexItem members__member">
          <span class="members__member_crown">👑</span>
          <img class="members__member_img" src="1.jpg" alt="member_1">
          <h2 class="members__member_name">Christine Bittle</h2>
          <p class="members__member_description">Web Enthusiast</p>
          <div class="members__member_roles">
            <div class="members__member_roles_role">Coding</div>
            <div class="members__member_roles_role">Coding</div>
          </div>
        </div>
      </div>
  */