import { useMutation } from "react-query";
import { updatePostTask, deletePostTask, updateSkillLevelPost, updateUserLevelPost } from "../../api/requests";
import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const Task = ({ task, refetchTasks, refetchUser, skillsLoading, skillsData }) => {

    const { darkMode } = useContext(ThemeContext);

    const { mutate: updateTask } = useMutation(updatePostTask, {
        onSuccess: (response) => {
            refetchTasks()
        },
    });

    const { mutate: deleteTask } = useMutation(deletePostTask, {
        onSuccess: (response) => {
            refetchTasks()
        },
    });

    const { mutate: updateSkillLevel } = useMutation(updateSkillLevelPost, {
        onSuccess: (response) => {
            refetchTasks()
        },
    });

    const { mutate: updateUserLevel } = useMutation(updateUserLevelPost, {
        onSuccess: (response) => {
            refetchUser()
        },
    });

    const matchSkills = (id) => {
        if (!skillsLoading) {
            return skillsData?.find((skill) => skill._id == id).name
        }
    }

    const handleComplete = (id, skillId) => {
        updateTask(id)
        updateSkillLevel(skillId)
        updateUserLevel(Number(localStorage.getItem('userId')))
    }

    const handleDeleteTask = (id) => {
        deleteTask(id)
    }

    return (
        // Use ClassNames package for conditional class assignment
        <li key={task.id} className={classNames("list__task", { "--completed": task.completed })}>
            <div>
                <div className={classNames("list__task__name", { "list__task__name--dark": darkMode })}>{task.name}</div>
                {/* // “&&” notation */}
                {task.skills && <div className="list__task__skills">{task?.skills?.map((skill) => (matchSkills(skill.id)))}</div>}
            </div>
            <div className="list__task__actions">
                <button onClick={() => { handleDeleteTask(task.id) }} className="list__task__button --delete">X</button>
                {!task.completed &&
                    <button
                        // Handle user interaction (eg. clicks, changes, blurs)
                        onClick={() => { handleComplete(task.id, task?.skills?.map((skill) => (skill.id))) }}
                        className="list__task__button --complete">Complete
                    </button>}
            </div>
        </li>
    )
}

export default Task