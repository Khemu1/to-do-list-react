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
    const lists = await List.find({ userId: userId }).select(
      "listId name content -_id"
    );
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create list" });
  }
}

export async function deleteList(req, res) {
  try {
    const listId = req.params.id;
    const result = await List.deleteOne({ listId: listId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete list" });
  }
}

export async function updateList(req, res) {
  const { name, content } = req.body;
  const listId = req.params.id; 
  try {
    let updateData = {};
    if (name) updateData.name = name;
    if (content) updateData.content = content;
    console.log(updateData);
    const updatedList = await List.findOneAndUpdate({ listId }, updateData, {
      new: true,
      runValidators: true,
    });

    if (updatedList) {
      res.status(200).json(updatedList);
    } else {
      res.status(404).json({ error: "List not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({ error: "Failed to update list" });
  }
}
