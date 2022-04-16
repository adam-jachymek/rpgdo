import { fetchTest, fetchQuestions, fetchCategories } from './api/requests';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery, } from 'react-query';

const Categories = () => {

    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);

    const categoriesMap = categories?.map((category) => (
        <a key={category.id} style={{ textDecoration: "none" }} href={`/questions/${category.id}`}>
            <li style={{ padding: "5px" }}>{category.name}</li>
        </a >
    ))

    if (isLoading) {
        return <CircularProgress />
    }


    return (
        <>
            <h3>Choose Category</h3>
            <ul style={{ listStyle: "none", padding: "0" }}>
                {categoriesMap}
            </ul>
        </>
    )
}

export default Categories
