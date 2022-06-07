# Henry-OverFlow API

## Estos son los ENDPOINTS disponibles hasta el momento:
<br/>

__USERS__

  - GET, POST http://localhost:3001/users
  - GET http://localhost:3001/users?fullname={input}
  - GET, PUT http://localhost:3001/users/{idUser}

__POSTS__

  - GET http://localhost:3001/posts
  - GET http://localhost:3001/posts/{idPost}
  - GET http://localhost:3001/posts?title={input}
  - POST http://localhost:3001/posts/{idUser} + Require Header (idUser)
  - PUT, DELETE http://localhost:3001/posts/{idPost}/{idUser}
  
__COMMENTS__

  - POST http://localhost:3001/comments/{idPost}/{idUser} + Require Header (idUser)
  - PUT, DELETE http://localhost:3001/comments/{idComment}/{idUser}

__TAGS & MODULES__

  - GET http://localhost:3001/modules
  - GET http://localhost:3001/tags

__LIKE__

  - GET http://localhost:3001/likes/{idOf}
  - PUT http://localhost:3001/likes/{idOf}/{idUser}

__FAVORITE__

  - GET http://localhost:3001/favorites/{idUser}
  - PUT http://localhost:3001/favorites/{idOf}/{idUser}

__REPORT__

  - POST http://localhost:3001/reports/{idOf}/{idUser}

__INBOX__

  - GET http://localhost:3001/inboxes/{idUser}
  - PUT http://localhost:3001/inboxes/{idUser}/{idNotification}
  - PUT http://localhost:3001/inboxes/{idUser}/{idNotification}?clean=true
  - DELETE http://localhost:3001/inboxes/clean/{idUser}

<br/>

## <b> ADMIN ROUTES </b> + Require Header (idUser)

__REPORT__

  - GET http://localhost:3001/admin/reports/
  - GET http://localhost:3001/admin/reports/{idReport}
  - DELETE http://localhost:3001/admin/reports/{idReport}
  
__TAGS__

  - PUT http://localhost:3001/admin/tags/{idModule}
  - DELETE http://localhost:3001/admin/tags/{idTag}
  
__USERS__

  - PUT http://localhost:3001/admin/users/{idUser}
  

<br/>

> NOTA: "idOf" representaria el ID de la entidad a la que le estaremos dando like, si se tratara de un post, <br/> el primer parametro sera el ID de dicho post, si se tratara de un comentario se insertaria el ID del comentario.

