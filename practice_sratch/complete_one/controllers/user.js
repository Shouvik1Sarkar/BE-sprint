import User from "../model/user.js";

async function handleHomeRoute(req, res) {
  res.send("Home route");
}

async function handleCreateUser(req, res) {
  const get_info = req.body;
  console.log(get_info);
  if (!get_info) {
    return res.status(501).json({ msg: "User not found" });
  }
  if (
    !get_info ||
    !get_info.first_name ||
    !get_info.last_name ||
    !get_info.email ||
    !get_info.gender ||
    !get_info.job_title
  ) {
    return res.json(501).json({ msg: "Missing attibute" });
  }
  const create_user = await User.create({
    first_name: get_info.first_name,
    last_name: get_info.last_name,
    email: get_info.email,
    gender: get_info.gender,
    job_title: get_info.job_title,
  });

  if (!create_user) {
    return res.status(501).json({ msg: "User not created" });
  }

  return res.status(201).json({ msg: `User created ${create_user}` });
}

async function handleCreateUserById(req, res) {
  const user_id = req.params.id;
  const user = await User.findById({ _id: user_id });
  if (!user) {
    return res.status(501).json({ msg: "User not found" });
  }

  res.status(201).json({ msg: ` ${user}` });
}

async function handleEditUser(req, res) {
  const user_id = req.params.id;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: user_id },
    { $set: updates }
  );
  if (!user) {
    return res.status(501).json({ msg: "User not found" });
  }
  console.log("USER: ", user);
  res.status(201).json({ msg: `User: ${user}` });
}

async function handleDeleteUser(req, res) {
  const user_id = req.params.id;

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(501).json({ msg: "User not found" });
  }

  await User.findByIdAndDelete({ _id: user_id });

  res.status(201).json({
    msg: `User with id  Deleted Successfully`,
  });
}

export {
  handleHomeRoute,
  handleCreateUser,
  handleCreateUserById,
  handleEditUser,
  handleDeleteUser,
};
