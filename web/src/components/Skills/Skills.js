import { useQuery, useMutation } from "react-query";
import { fetchSkills, addSkillPost, deletePostSkill } from "../../api/requests";
import { useState } from "react";
import { FaGuitar } from 'react-icons/fa'
import LinearProgress from '@mui/material/LinearProgress';
import "./style.sass"

const Skills = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [inputAddSkill, setInputAddSkill] = useState('')

  const { isLoading: skillsLoading, data: skillsData, refetch } = useQuery(['skills'], fetchSkills);

  const { mutate: addSkill } = useMutation(addSkillPost, {
    onSuccess: (response) => {
      refetch()
    },
  });

  const { mutate: deleteSkill } = useMutation(deletePostSkill, {
    onSuccess: (response) => {
      refetch()
    },
  });

  const progress = (exp, maxExp) => {
    const result = (100 * exp) / maxExp

    return result
  }

  const skillsMap = skillsData?.map((skill) => (
    <a className="skills__link" href={`skill/${skill.id}`}>
        <li className="skills__skill">
          <div className="skills__skill__info">
            <span>{skill.name}</span>
            <span style={{width: "200px"}}>LVL: {skill.level}
            <LinearProgress variant="determinate" value={progress(skill.exp, skill.maxExp)} /></span>
          </div>
          <div>
            <button onClick={() => {deleteSkill(skill.id)}}>X</button>
          </div>
        </li>
    </a>
  ))

  const handleAddSkill = () => {
    addSkill(inputAddSkill)
    setInputAddSkill('')
    setShowAdd(false)
  }

  return (
    <div className="skills">
      <h3>Skills</h3>
      {showAdd ?
        <div className="tasks__add">
          <input onChange={(e) => { setInputAddSkill(e.target.value) }} placeholder="name"></input>
          <button onClick={handleAddSkill} className="tasks__add__button">Add new skill</button>
          <button onClick={() => { setShowAdd(false) }} className="tasks__add__button --cancel">Cancel</button>
        </div> :
        <button onClick={() => { setShowAdd(true) }} className="tasks__add__button">Add new skill</button>}
      <ul className="skills__list">
        {skillsMap}
      </ul>
    </div>
  )
}

export default Skills
