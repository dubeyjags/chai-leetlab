# Leetlab
## Achitecture and Project Plannning
### Backend
    - node-js
    - expressjs
    - postgres
    - prisma
    - judege0 = for code execution

### Frontend
    - JS
    - Reeact - vite
    - tailwind
    - diasy-ui
    - zustand
    - zod and react hook forms

### API Arhitecture
    - Authentication
    - Problem management
    - code execution
    - submission
    - playlist

User 
- admin
    - create problems (testcases,codesippets, refrence solution)
    - on judge0 (validate each question and testcases)
    - save in db
- user
    - get the problems (add and sub 2 numbers)
    - submit answer
    - code executions
    - loop the soltions
        - fails (stop)
        - success 
            - track problems solved (if not yet solved)
            - strore the test case and solutions


## Backend
npm i nodemon (for reloading)
npm i express (for routing)
update package.json (  "type": "module", for use of latest features)
update package.json  "dev": "nodemon src/index.js"
npm i dotenv (create .env file with port)
    index.js
```
    import express from "express"
    import dotenv from "dotenv"
    const app = express();
    dotenv.config()
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
        
    })
```

# CH - 1 
## Authentications
    register,login,logout,check

need to install (ORM) prisma and prisma client for db
npm i prisma
npm i @prisma/client
npx prisma init
Also check for docker with command docker
    docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
    config db in .env
npx prisma generate
npx prisma migrate dev ( migrate the db)
npx prisma db push  

## judge0
- judge0 github
- judge0.com > pricing > install > changelog
    - deployment procedure
        - powershell > wsl --install (open ubantu)
        - username/jagdamba
        - sudo apt update
        - sudo apt upgrade -y
        - sudo nano /etc/default/grub
        - sudo apt install -y docker.io
        - sudo apt install -y docker-compose
        - sudo apt install git curl -y
        - git clone https://github.com/judge0/judge0.git
        - cd judge0
        - nano judge0.conf (update redis and postgres password)
        - docker-compose up -d  (or add sudo at begining)
        - docker ps (to check the running server and port)


## now start the auth routes at index.js routes.js and controller.js
npm i bcryptjs (for hashing password)
npm i jsonwebtoken
npm i cookie-parser


