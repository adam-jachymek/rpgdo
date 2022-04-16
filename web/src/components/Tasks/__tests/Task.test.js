import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Task from '../Task'
import { ThemeContext } from '../../../ThemeContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const defaultProps = {
    task: { userId: 1, name: "asdasd", completed: false, skills: [{ id: 1 }], id: 15 },
    refetchTasks: jest.fn(),
    refetchUser: jest.fn(),
    skillsLoading: false,
    skillsData: [{ id: 1, name: "guitar", level: 6, exp: 600, maxExp: 6000, userId: 1, tasksCompleted: 2 },
    { id: 2, name: "react", level: 3, exp: 1400, maxExp: 3000, userId: 1, tasksCompleted: 1 }]
}

const darkMode = true
const setDarkMode = jest.fn()
const queryClient = new QueryClient();

test('after completed task change background to green and button "completed" is not visible', () => {

    const container = render(
        <QueryClientProvider client={queryClient}>
            <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
                <Task {...defaultProps} />
            </ThemeContext.Provider>
        </QueryClientProvider>
    )

    fireEvent.click(screen.getByText('Complete'))

    expect(container.firstChild).toHaveClass('--completed')
    expect(screen.getbyText('Complete')).toBeNull
})