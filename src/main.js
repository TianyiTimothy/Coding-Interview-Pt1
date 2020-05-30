// urls
// params: roles=id1,id2,id3 => roles=1,3,5
const allEmployeesUrl = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
const allRolesUrl = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";

window.onload = function () {
  displayRolesFrom(allRolesUrl);
  displayMembersFrom(allEmployeesUrl);
}

async function getDataFrom(url) {
  // use fetch to get data
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
  members__member_img.src = member.employeehaspic ?
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
  
  // description_card (div)
  const members__member_descriptioncard = createNode("div");
  members__member_descriptioncard.className = "members__member_descriptioncard";
  members__member_descriptioncard.innerText = member.employeebio;
  // append
  appendNode(members__member, members__member_descriptioncard);

  // roles (div), with divs as its child node
  const members__member_roles = createNode("div");
  members__member_roles.className = "members__member_roles";

  for (role of member.roles) {
    const members__member_roles_role = createNode("div");
    members__member_roles_role.className = "members__member_roles_role";
    members__member_roles_role.innerText = role.rolename;
    members__member_roles_role.style.backgroundColor = role.rolecolor;

    // append each role to roles node
    appendNode(members__member_roles, members__member_roles_role)
  }

  // append
  appendNode(members__member, members__member_roles);

  // employeeisfeatured ? crown:none
  if (member.employeeisfeatured==="1") {
    const members__member_crown = createNode("span");
    members__member_crown.className="members__member_crown";
    members__member_crown.innerText = "👑";
    // append
    appendNode(members__member, members__member_crown);
  }

  return members__member;
}

function createRoleElement(role) {

  // <div class="roles__role">
  //   <input class="roles__role_checkbox" type="checkbox" name="allroles" id="allroles">
  //   <label class="roles__role_label" for="allroles">ALL ROLES</label>
  // </div>

  // <div>
  const roles__role = createNode("div");
  roles__role.className = "roles__role";

  // <input>
  const roles__role_checkbox = createNode("input");
  roles__role_checkbox.className = "roles__role_checkbox";
  roles__role_checkbox.type = "checkbox";
  roles__role_checkbox.name = role.roleid;
  roles__role_checkbox.id = role.roleid;
  roles__role_checkbox.value = role.roleid;
  // check <input>
  roles__role_checkbox.addEventListener("change", function () {

    let getEmployeesByRolesUrl = allEmployeesUrl + "?roles=";

    if (this.checked) {
      // check: set bg color & check if "all roles" checked
      // all role checkbox
      const roleCheckboxes = document.getElementsByClassName("roles__role_checkbox");
      allCheckedFlag = true;
      for (roleCheckbox of roleCheckboxes) {
        if (roleCheckbox.checked === false) {
          allCheckedFlag = false;
        }
      }
      if (allCheckedFlag) {
        document.getElementById("allroles").checked = true;
      }

      roles__role_label.style.backgroundColor = role.rolecolor;
    } else {
      // uncheck: remove bg color & uncheck "all roles"
      document.getElementById("allroles").checked = false
      roles__role_label.style.backgroundColor = "";
    }

    // show employees based on checked inputs
    // get roleid from all checked inputs
    const roles__role_checkboxes = document.getElementsByClassName("roles__role_checkbox");
    let allCheckboxChecked = true;
    for (const roles__role_checkbox of roles__role_checkboxes) {
      if (roles__role_checkbox.checked) {
        // get id from roleinput.value
        getEmployeesByRolesUrl += roles__role_checkbox.value + ",";
      }else{
        allCheckboxChecked = false;
      }
    }
    if(allCheckboxChecked){
      const allrolesDOM = document.getElementById("allroles");
      allrolesDOM.checked;
      console.log(allrolesDOM);
    }
    // delete the last comma
    getEmployeesByRolesUrl = getEmployeesByRolesUrl.substr(0, getEmployeesByRolesUrl.length - 1);
    displayMembersFrom(getEmployeesByRolesUrl);

  });

  // <label>
  const roles__role_label = createNode("label");
  roles__role_label.className = "roles__role_label";
  roles__role_label.innerText = role.rolename;
  roles__role_label.htmlFor = role.roleid;


  // append child
  appendNode(roles__role, roles__role_checkbox);
  appendNode(roles__role, roles__role_label);

  return roles__role;
}
function displayRolesFrom(url){
  // roles in checkbox
  this.getDataFrom(url).then((roles) => {
    const rolesDOM = document.getElementById("roles");
    // use for in to "iterate" an object
    for (role of roles) {
      appendNode(rolesDOM, createRoleElement(role));
    }
  }).catch(error=>{
    const rolesDOM = document.getElementById("roles");
    // remove roles
    rolesDOM.innerHTML="&nbsp;<em>Is your code robust enough?</em> --Christine";
    // rolesDOM.innerHTML="<em>Don't forget to submit your reflection.</em> --Christine";
    console.log(error);
  });
}
function displayMembersFrom(url) {
  getDataFrom(url).then(function (employees) {
    const membersDOM = document.getElementById("members");
    // clear current members
    membersDOM.innerHTML = "";

    // use for in to "iterate" an object
    for (employeeid in employees) {
      // type of index is string
      const index = employeeid + "";
      const employee = employees[index];

      // create an element for each member, and append it to membersDOM
      appendNode(membersDOM, createMemberElement(employee));
    }
  })
    .catch(function (error) {
      // show error message to users
      const membersDOM = document.getElementById("members");
      const errorMsg = createNode("div");
      errorMsg.className="members__errorMsg";
      errorMsg.innerText="Sorry, failed to fetch members from API";
      appendNode(membersDOM, errorMsg);

      console.log(error);
    });
}

function allRolesChanged(allRolesInput) {

  // check all roles
  const roles__role_checkboxes = document.getElementsByClassName("roles__role_checkbox");
  for(roles__role_checkbox of roles__role_checkboxes){
    // check if not checked
    roles__role_checkbox.checked=true;
  }

  // show all members
  displayMembersFrom(allEmployeesUrl);
}

// below: path I walked

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