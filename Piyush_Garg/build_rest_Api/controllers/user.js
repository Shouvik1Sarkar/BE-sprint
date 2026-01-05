import User from "../models/user.js";

async function handleGetAllUsers(req, res) {
  const db_user = await User.find({});

  const result = `
    <ul>
      ${db_user
        .map((user) => {
          return `<li>${user.firstName}</li>`;
        })
        .join("")}
    </ul>
    `;

  return res.send(result);
}

async function handleCreateUser(req, res) {
  const body = req.body;

  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(500).json({ msg: "missing" });
  }
  const user = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  return res.status(201).json({ msg: "SUCCESS", id: user.id });
}
async function handleGetUserById(req, res) {
  const id = req.params.id;
  const found_user = User.findById({ id });
  return res.json(found_user);
}

async function handlePatch(req, res) {
  // TODO
  return res.send("This is done");
}

async function handleDeleteById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  // res.json(user);
  return res.status(200).json({ msg: "SUCCESS" });
}
export {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handlePatch,
  handleDeleteById,
};
