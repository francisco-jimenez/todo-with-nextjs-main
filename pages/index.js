import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import TodoItem from "./components/TodoItem";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LocaleSwitcher from "./components/LocaleSwitcher";

const url = "http://localhost:3000/api/task";

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState({ task: "" });
  const { t } = useTranslation("common");

  const handleChange = ({ currentTarget: input }) => {
    input.value === ""
      ? setTask({ task: "" })
      : setTask((prev) => ({ ...prev, task: input.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (task._id) {
        const { data } = await axios.put(url + "/" + task._id, {
          task: task.task,
        });
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask({ task: "" });
        console.log(data.message);
      } else {
        const { data } = await axios.post(url, task);
        setTasks((prev) => [...prev, data.data]);
        setTask({ task: "" });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id) => {
    try {
      const originalTasks = [...tasks];
      const index = originalTasks.findIndex((t) => t._id === id);
      const { data } = await axios.put(url + "/" + id, {
        completed: !originalTasks[index].completed,
      });
      originalTasks[index] = data.data;
      setTasks(originalTasks);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <LocaleSwitcher />
      <h1 className={styles.heading}>TO-DO</h1>
      <div className={styles.container}>
        <form onSubmit={addTask} className={styles.form_container}>
          <input
            className={styles.input}
            type="text"
            placeholder={t("task-to-be-done")}
            onChange={handleChange}
            value={task.task}
          />
          <button type="submit" className={styles.submit_btn}>
            {t("add-todo")}
          </button>
        </form>
        {tasks.map((task) => TodoItem(task, updateTask, deleteTask))}
        {tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ locale }) => {
  const { data } = await axios.get(url);
  return {
    props: {
      tasks: data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
