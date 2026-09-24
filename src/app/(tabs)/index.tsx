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

    return (
      <View>
        {loaded && <SubjectForm onAdd={handleAddSubject} />}
        {subjects.map((s) => (
          <Text key={s.id}>{s.name}</Text>
        ))}

        {loaded && <TaskForm subjects={subjects} onAdd={handleAddTask} />}
        <TaskList tasks={tasks} subjects={subjects} onToggle={handleToggleTask}/>
      </View>
    );
}