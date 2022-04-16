import { useQuery, useMutation } from "react-query"
import { fetchTasks, postTask, fetchSkills, postSkill, updateSkill, changeSkillName, deleteSkillName } from "./api/mongodb";
import { useState } from "react";

const TestMongo = () => {
    const [inputAddTask, setInputAddTask] = useState('')
    const [inputChangeSkill, setInputChangeSkill] = useState('')

    const { isLoading: tasksLoading, data: tasksData, refetch: refetchTasks } = useQuery(['tasksMongo'], fetchTasks);
    const { isLoading: skillsLoading, data: skillsData, refetch: refetchSkills } = useQuery(['skillsMongo'], fetchSkills);

    const { mutate: addTask } = useMutation(postTask, {
        onSuccess: (response) => {
            refetchTasks()
        },
    });

    const { mutate: addSkill } = useMutation(postSkill, {
        onSuccess: (response) => {
            refetchTasks()
        },
    });

    const { mutate: changeSkill } = useMutation(changeSkillName, {
        onSuccess: (response) => {
            refetchSkills()
        },
    });

    const { mutate: updateSkillTrigger } = useMutation(updateSkill, {
        onSuccess: (response) => {
            refetchSkills()
            console.log("newSkill", skillsData)
        },
    });

    const { mutate: deleteSkill } = useMutation(deleteSkillName, {
        onSuccess: (response) => {
            refetchSkills()
        },
    });

    console.log("tasks", tasksData)
    console.log("skills", skillsData)

    const handleAddTask = () => {
        addSkill({ name: inputAddTask })
        setInputAddTask('')
    }

    const handleChangeSkill = () => {
        changeSkill({ name: inputChangeSkill })
        setInputChangeSkill('')
    }

    const handleUpdateSkill = () => {
        updateSkillTrigger()
    }

    return (
        <>
            <div style={{ paddingTop: "50px" }} className="tasks__add">
                <input onChange={(e) => { setInputAddTask(e.target.value) }} placeholder="name"></input>
                <button onClick={handleAddTask} className="tasks__add__button">Add new task</button>
            </div>


            <div style={{ marginTop: "100px" }} className="tasks__add">
                <button onClick={handleUpdateSkill} className="tasks__add__button">Update Skill</button>
                <input onChange={(e) => { setInputChangeSkill(e.target.value) }} placeholder="name"></input>
                <button onClick={handleChangeSkill} className="tasks__add__button">Change Name</button>
            </div>

            <button onClick={deleteSkill} className="tasks__add__button">DeleteSkill</button>
        </>

    )
}

export default TestMongo