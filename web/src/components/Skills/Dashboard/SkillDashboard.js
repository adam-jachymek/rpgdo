import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { fetchSkill, fetchTasks } from "../../../api/requests"
import LinearProgress from '@mui/material/LinearProgress';

import "./style.sass"

const SkillDashboard = () => {
  const { id: skillId } = useParams()

  const { isLoading: tasksLoading, data: tasksData } = useQuery(['tasks'], fetchTasks);
  const { isLoading: skillLoading, data: skill, refetch } = useQuery(['skill'], () => fetchSkill(skillId));

  if(skillLoading) {
    return null
  }

  const progress = (exp, maxExp) => {
    const result = (100 * exp) / maxExp

    return result
  }

  return (
    <div className="skill">
      <h3 className="skill__name">{skill.name}</h3>
      <span style={{width: "200px"}}>LVL: {skill.level}
          <LinearProgress variant="determinate" value={progress(skill.exp, skill.maxExp)} />
        </span>
      <p>Tasks completed: {skill.tasksCompleted}</p>
    </div>
  )

}

export default SkillDashboard
