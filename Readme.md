# Angularjs + API TODO app

## FE - Angularjs

- login page
- todo list page
    - edit sidepanel
- todo detail page
    - edit sidepanel
- Auth: jwt w/ token interceptor
- components: stateful & stateless
- data: promises & resolvers

---

## BE - NodeJs Express

- in memory object as storage
- REST (GET, POST, PUT, DELETE) endpoints for:
    - `/auth`
    - `/todos`
    - `/todos/:id`
- JWT auth (use jsonwebtoken package)
- promises
- middleware on routes to check auth
- bonus:
    - persistant json file as storage


// REMAINING TODO'S:

✓  baza shrani vec userjev
✓  routing na apiju za todo/1 todo/2 
✓  password hash
✓  jwt + middleware + interceptor + localstorage
-  promisi na apiju
-  res.send brez return
-  RESTFUL API'S (poprabi put delete patch)
-  implementiraj bcrypt
