import { List } from "../databases/db.js";

export async function createList(req, res) {
  const { title, detail } = req.body;
  const userId = req.session.userId;
  try {
    const newList = new List({ userId, title, detail });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}
export async function returnLists(req, res) {
  const userId = req.session.userId;
  try {
    const lists = await List.find({ userId: userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}

export async function deleteList(req, res) {
  try {
    const list = await List.deleteOne({ _id: id });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}

export async function updateList(req, res) {
  const { title, detail, id } = req.body;
  try {
    if (title && detail) {
      const updatedList = await List.findByIdAndUpdate(
        userId,
        { title, detail },
        { new: true, runValidators: true }
      );
    }
    if (title && !detail) {
      const updatedList = await List.findByIdAndUpdate(
        id,
        { title },
        { new: true, runValidators: true }
      );
    }
    if (!title && detail) {
      const updatedList = await List.findByIdAndUpdate(
        id,
        { detail },
        { new: true, runValidators: true }
      );
    }
    res.status(200).json("updated");
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}
