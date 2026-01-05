import express from "express";
import users from "./MOCK_DATA.json" with  { type: "json" };
import fs from "fs"


const app = express();

app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=>{
  console.log("This is middleware-1.")
  // return res.send("This is middleware-1.")
  req.my_name = "SHOUVIK"
  next()
})
app.use((req, res, next)=>{
   console.log(req.my_name)
  next()
})

app.get("/", (req, res) => {
  console.log(req.my_name)
  res.send("HOME ROUTE---->", req.my_name);
});

app.route("/api/users").get((req, res) => {
//   res.send(users);
  res.json(users)
 
}).post(  (req, res)=>{
    // TODO
    const new_user = req.body
    console.log("NEW USER: ", new_user)
    users.push({...new_user, id: users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), ()=>{})
    return res.send(`User created: ${users.length}`)
});
// app.get("/api/users/:id", (req, res) => {
// const id = req.params.id
// const found_user = users.find(user => user.id == id)
// res.json(found_user)
// });

// app.post("/api/users/:id", (req, res)=>{
//     // TODO
// })
// app.delete("/api/users/:id", (req, res)=>{
//     // TODO
// })

app.route("/api/users/:id").get( (req, res) => {
const id = req.params.id
const found_user = users.find(user => user.id == id)
res.json(found_user)
}).patch(  (req, res)=>{
    // TODO
    const id = req.params.id

    const edited = req.body
    console.log("EDITED: ", edited)

    const find_user = users.find(user => user.id = id)
    Object.assign(find_user, edited);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), ()=>{})
    return res.send("jjjjj")
}).delete( (req, res)=>{
    const id = req.params.id

    const updated_users = users.filter(user => user.id != id)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updated_users), ()=>{})

    return res.send("USER GOT DELETED.")
})

app.listen(8000, () => console.log(`The app is running at 8000`));
