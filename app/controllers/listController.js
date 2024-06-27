import { List } from "../databases/db.js";

export async function createList(req, res) {
  const listId = req.params.id;
  const { name, content } = req.body;
  const userId = req.session.userId;
  try {
    const newList = new List({ listId, userId, name, content });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create list" });
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
    const listId = req.params.id;
    const list = await List.deleteOne({ listId: listId });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}

export async function updateList(req, res) {
  const { name, content } = req.body;
  const listId = req.param.id;
  try {
    if (name && content) {
      const updatedList = await List.findByIdAndUpdate(
        listId,
        { name, content },
        { new: true, runValidators: true }
      );
    }
    if (name && !content) {
      const updatedList = await List.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );
    }
    if (!name && content) {
      const updatedList = await List.findByIdAndUpdate(
        id,
        { content },
        { new: true, runValidators: true }
      );
    }
    res.status(200).json("updated");
  } catch (error) {
    res.status(400).json({ error: "Failed to create list" });
  }
}
