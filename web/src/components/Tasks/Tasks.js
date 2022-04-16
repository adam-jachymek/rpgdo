import { useQuery, useMutation } from "react-query";
import { fetchTasks, fetchSkills, postTask, updatePostTask, deletePostTask, updateSkillLevelPost, updateUserLevelPost } from "../../api/requests";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useMemo } from "react";
import "./style.sass"
import classNames from "classnames";
import { useContext } from 'react';
import { ThemeContext } from "../../ThemeContext";
import Task from "./Task";

const Tasks = ({ refetchUser }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [inputAddTask, setInputAddTask] = useState('')
  const [addSkill, setAddSkill] = useState('')

  const { isLoading: tasksLoading, data: tasksData, refetch: refetchTasks } = useQuery(['tasks'], fetchTasks);
  const { isLoading: skillsLoading, data: skillsData } = useQuery(['skills'], fetchSkills);

  const { darkMode } = useContext(ThemeContext);

  console.log(darkMode)

  const { mutate: addTask } = useMutation(postTask, {
    onSuccess: (response) => {
      refetchTasks()
    },
  });

  const skillsMap = skillsData?.map((skill) => (
    <li onClick={() => { !addSkill ? setAddSkill(skill.id) : setAddSkill("") }}
      className={classNames("tasks__add__skills__skill", { "checked": skill.id === addSkill })}>
      {skill.name}
    </li>
  ))

  const taskMap = tasksData?.map((task) => (
    // Display list of data
    <Task task={task} refetchTasks={refetchTasks} refetchUser={refetchUser} skillsLoading={skillsLoading} skillsData={skillsData} />
  ))

  const handleAddTask = () => {
    const userId = Number(localStorage.getItem('userId'))
    const skills = addSkill ? { skills: [{ id: addSkill }] } : ''
    addTask({ userId: userId, name: inputAddTask, completed: false, ...skills })
    setInputAddTask('')
    setAddSkill('')
    setShowAdd(false)
  }

  // Multiple returns from the component
  if (tasksLoading || skillsLoading) {
    <CircularProgress />
  }

  return (
    <div>
      <h3>Tasks</h3>
      {showAdd ?
        <div className="tasks__add">
          <input onChange={(e) => { setInputAddTask(e.target.value) }} placeholder="name"></input>
          <ul className="tasks__add__skills">
            {skillsMap}
          </ul>
          <button onClick={handleAddTask} className="tasks__add__button">Add new task</button>
          <button onClick={() => { setShowAdd(false) }} className="tasks__add__button --cancel">Cancel</button>
        </div> :
        <button onClick={() => { setShowAdd(true) }} className="tasks__add__button">Add new task</button>}
      <ul className="list">
        {taskMap}
      </ul>
    </div>
  )

}

export default Tasks
