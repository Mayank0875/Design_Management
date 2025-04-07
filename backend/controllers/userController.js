const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc   Get all user (Admin only)
//@desc   Get /api/users/
//@desc   Private (Admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // Get all task counts grouped by user and status in one DB query
    const taskCounts = await Task.aggregate([
      {
        $match: {
          assignedTo: { $in: users.map(user => user._id) }
        }
      },
      {
        $group: {
          _id: { userId: "$assignedTo", status: "$status" },
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the task counts for quick lookup
    const taskCountMap = {};
    taskCounts.forEach(({ _id, count }) => {
      const { userId, status } = _id;
      if (!taskCountMap[userId]) taskCountMap[userId] = {};
      taskCountMap[userId][status] = count;
    });

    // Merge task counts into user objects
    const userWithTaskCounts = users.map(user => {
      const counts = taskCountMap[user._id] || {};
      return {
        ...user._doc,
        pendingTasks: counts["Pending"] || 0,
        inProgressTasks: counts["In Progress"] || 0,
        completedTask: counts["Completed"] || 0,
      };
    });

    res.status(200).json(userWithTaskCounts);
  } catch (error) {
    console.error("❌ Error in getUsers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@desc   Get user by ID
//@desc   Get /api/users/:id
//@access Private
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { getUsers, getUserById};
