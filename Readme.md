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
✓  promisi na apiju
✓   res.send brez return
-  RESTFUL API'S (poprabi put delete patch)
✓  implementiraj bcrypt
-  codecleanup (ni anonimih funckij) popravi naming
✓  Implementiraj bcrypt v login, register routo (naredi dve metodi v security helperju create hash pa compoare hash    ki vrneta promise)
-  Spremeni frontend da bo bral iz DB Json todoje

✓  naredi router za /uuid
✓  v edit sidepanelu dodaj ta uuid v klick funkcije
✓ v edit task podaj uuuid
4. naredi za oboje da bo requestalo (get) na backend /todo/uuid

✓  naredi si da bo dbjson imel pravilni naming ()
6. naredi da bodo vsi endopoint razen login in register (authentication wall)
7. dodaj midleware na vse route
8. naredi da bo edit in delete za samo za tiste todoje katere si ustvaril ti (ostalo je error)
