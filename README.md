# Henry-OverFlow API

## Estos son los ENDPOINTS disponibles hasta el momento:
<br/>

__USERS__

  - GET, POST http://localhost:3001/users
  - GET http://localhost:3001/users?fullname={input}
  - GET, PUT http://localhost:3001/users/{idUser}

__POSTS__

  - GET http://localhost:3001/posts
  - GET http://localhost:3001/posts?title={input}
  - POST http://localhost:3001/posts/{idUser}
  - GET, PUT, DELETE http://localhost:3001/posts/{idPost}
  
__COMMENTS__

  - POST http://localhost:3001/comments/{idPost}/{idUser}
  - PUT, DELETE http://localhost:3001/comments/{idComment}

__TAGS & MODULES__

  - GET http://localhost:3001/modules
  - GET http://localhost:3001/tags

__LIKES POSTS // COMMENTS__
  - PUT http://localhost:3001/likes/{idOf}/{idUser}
  - GET http://localhost:3001/likes/{idOf}
  <br/>
  <br/>
  NOTA: "idOf" representaria el ID de la entidad a la que le estaremos dando like, si se tratara de un post, el primer parametro sera el ID de dicho post, si se tratara de un comentario se insertaria el ID del comentario