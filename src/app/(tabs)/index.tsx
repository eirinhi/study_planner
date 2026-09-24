import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SubjectForm from '../../components/SubjectForm';
import TaskForm from '../../components/TaskForm';
import { getSubjects, getTasks, saveSubjects, saveTasks } from '../../storage/taskStorage';
import { Subject, Task } from '../../types/models';
import TaskList from '../../components/TaskList';
import { useAppData } from '../../hooks/useAppData';

export default function Index() {
    const { subjects, tasks, loaded, handleAddSubject, handleAddTask, handleToggleTask } = useAppData();

    function getGreeting() {
        const hour = new Date().getHours();
        return hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';
    }

    const upcomingTasks = [...tasks]
        .filter((t) => !t.done)
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        .slice(0, 5);


    return (
      <View>
        <Text>{getGreeting()}</Text>

        {loaded && <SubjectForm onAdd={handleAddSubject} />}
        {loaded && <TaskForm subjects={subjects} onAdd={handleAddTask} />}

        <Text>Upcoming tasks</Text>
        <TaskList tasks={upcomingTasks} subjects={subjects} onToggle={handleToggleTask}/>
      </View>
    );
}