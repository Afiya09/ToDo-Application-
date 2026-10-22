const todoModel = require("../models/todoModels");

// created todo
const createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "please provide title and description",
      });
    }
    const todo = await todoModel.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).send({
      success: true,
      message: "your task has been created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in created todo api",
      error,
    });
  }
};

//get todo
const getTodoController = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //validate
    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "No user found with this id",
      });
    }
    // find task
    const todos = await todoModel.find({ createdBy: req.user.id });

    res.status(200).send({
      success: true,
      message: todos.length ? "Your Todos " : "You have no todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get todo api",
      error,
    });
  }
};

//delete api
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findByIdAndDelete({
      _id: id,
      createdBy: req.user.id,
    });
    //find id

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in delete todo api",
    });
  }
};

//Update todo
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide todo id",
      });
    }
    const data = req.body;
    //update todo
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: "your task has been updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error In Update Todo Api",
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
