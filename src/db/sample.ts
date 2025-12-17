import { where, orderBy, limit } from "firebase/firestore";
import { userRepo } from "./repo/user";
import { todoRepo } from "./repo/todo";

export const firestoreUsageExamples = async () => {
  const allUsers = await userRepo.getAll();
  const admins = await userRepo.getAll([where("role", "==", "admin")]);

  const priorityTodos = await todoRepo.getAll([
    where("isCompleted", "==", false),
    orderBy("priority", "desc"),
    limit(10),
  ]);
  const myProfile = await userRepo.getById("user_123");

  // Add
  const newUserId = await userRepo.add({
    email: "new@example.com",
    name: "Newbie",
    role: "user",
  });

  // Update
  await userRepo.update("user_123", {
    role: "user",
  });

  // 7. 삭제 (Delete)
  await userRepo.delete("user_123");
};
