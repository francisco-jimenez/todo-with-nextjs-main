import styles from "../../styles/Home.module.css";

export default function TodoItem(task, updateTask, deleteTask) {
  return (
    <div className={styles.task_container} key={task._id}>
      <input
        type="checkbox"
        className={styles.check_box}
        checked={task.completed}
        onChange={() => updateTask(task._id)}
      />
      <p
        className={
          task.completed
            ? styles.task_text + " " + styles.line_through
            : styles.task_text
        }
      >
        {task.task}
      </p>
      <button
        onClick={() => deleteTask(task._id)}
        className={styles.remove_task}
      >
        &#10006;
      </button>
    </div>
  );
}
