import { TaskCreationForm } from "@/components/TaskCreationForm";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <>
      <TaskCreationForm />
      <TaskList />
    </>
  );
}
