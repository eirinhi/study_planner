import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SubjectForm from '../components/SubjectForm';
import { Subject } from '../types/models';
import { getSubjects, saveSubjects } from '../storage/taskStorage';

export default function Index() {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
      getSubjects().then(setSubjects);
    }, []);

    function handleAddSubject(subject: Subject) {
      const updated = [...subjects, subject];
      setSubjects(updated);
      saveSubjects(updated);
    }

    return (
      <View>
        <SubjectForm onAdd={handleAddSubject} />
        {subjects.map((s) => (
          <Text key={s.id}>{s.name}</Text>
        ))}
      </View>
    );
}