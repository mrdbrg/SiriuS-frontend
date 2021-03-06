// ==============================================================================
//                                    USER
// ==============================================================================

// create new user
export const createUser = data => {
  return fetch(`http://localhost:3000/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// update user
export const updateAccount = (userId, data) => {
  return fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// login user
export const loginUser = data => {
  return fetch(`http://localhost:3000/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// user autologin 
export const autoLogin = () => {
  return fetch(`http://localhost:3000/api/v1/autologin`, {
    headers: {
      "Authorization": `Bearer ${localStorage.token}`
    }
  })
  .then(r => r.json())
}

// get all users
export const getUsers = () => {
  return fetch(`http://localhost:3000/api/v1/users/`)
  .then(r => r.json())
}

// delete user
export const deleteUser = userId => {
  return fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: "DELETE"
  })
  .then(r => r.json())
}

// ==============================================================================
//                                    PROJECTS
// ==============================================================================

// remove project from user
export const removeProjectFromUser = (userId, projectId) => {
  return fetch(`http://localhost:3000/api/v1/users/${userId}/remove-project/${projectId}`, {
    method: "DELETE"
  })
  .then(r => r.json())
}

// get all projects
export const getProjects = () => {
  return fetch(`http://localhost:3000/api/v1/projects/`)
  .then(r => r.json())

}

// add user to project
export const addUserProject = updateProject => {
  return fetch(`http://localhost:3000/api/v1/add_user/project/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateProject)
  })
  .then(r => r.json())
}

// create new project
export const createProject = data => {
  // console.log("CREATE PROJECT --->", data)
  return fetch(`http://localhost:3000/api/v1/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// edit project
export const editProject = (projectId, data) => {
  // console.log("EDIT PROJECT --->", data, projectId)
  return fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// destroy - complete project
export const completeProject = projectId => {
  return fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
    method: "DELETE"
  })
  .then(r => r.json())
}

// ==============================================================================
//                               ARCHIVE PROJECTS
// ==============================================================================

// get archived projects
export const getArchivedProjects = () => {
  return fetch(`http://localhost:3000/api/v1/archive_projects`)
  .then(r => r.json())
}

// create - arquive project
export const archiveProject = arqProject => {
  return fetch(`http://localhost:3000/api/v1/archive_projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(arqProject)
  }).then(r => r.json())
}

// delete from arquive
export const deleteFromArchive = projectId => {
  // console.log("DELETE FROM ARCHIVE -->", projectId)
  return fetch(`http://localhost:3000/api/v1/archive_projects/${projectId}`, {
    method: "DELETE",
  }).then(r => r.json())
}

// ==============================================================================
//                               ARCHIVE DOCUMENTS
// ==============================================================================

// get archived documents
export const getArchiveDocuments = () => {
  return fetch(`http://localhost:3000/api/v1/archive_documents`)
  .then(r => r.json())
}

// create - arquive document
export const archiveDocuments = arqDocs => {
  return fetch(`http://localhost:3000/api/v1/archive_documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...arqDocs })
  }).then(r => r.json())
}

// ==============================================================================
//                                  DOCUMENTS
// ==============================================================================

// set documents
export const getDocuments = () => {
  return fetch(`http://localhost:3000/api/v1/documents`)
  .then(r => r.json())
}

// create documents
export const newDocument = formData => {
  return fetch(`http://localhost:3000/api/v1/documents`, {
    method: 'POST',
    body: formData
  })
}

// ==============================================================================
//                                    INVITES
// ==============================================================================

export const inviteUser = data => {
  return fetch('http://localhost:3000/api/v1/invites/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
}

// set invitations
export const getInvites = () => {
  return fetch(`http://localhost:3000/api/v1/invites`)
  .then(r => r.json())
}

// detele invitations
export const deleteInvites = inviteId => {
  console.log("inviteId =>", inviteId)
  return fetch(`http://localhost:3000/api/v1/invites/${inviteId}`, {
    method: 'DELETE'
  })
  .then(r => r.json())
}

// download archived project zip file
export const downloadZip = projectId => {
  console.log("projectId -->", projectId)
  return fetch(`http://localhost:3000/api/v1/download/${projectId}`, {
    headers: { 
      'Content-Type': 'application/json'
    }
  })
  .then(response => response)
}