import { ref, push, set, remove } from 'firebase/database';
import { db } from '../firebase';
import { useRef } from 'react';
import debounce from 'lodash.debounce';

export const addTask = async (taskText) => {
	if (taskText.trim() === '') {
		throw new Error('Задача не может быть пустой');
	}
	const newTaskRef = push(ref(db, 'tasks'));
	await set(newTaskRef, { text: taskText });
	return { id: newTaskRef.key, text: taskText };
};

export const deleteTask = async (taskId) => {
	await remove(ref(db, `tasks/${taskId}`));
};

export const editTask = async (taskId, editTaskText) => {
	await set(ref(db, `tasks/${taskId}`), { text: editTaskText });
	return { id: taskId, text: editTaskText };
};

export const filterTasks = (tasks, query) => {
	return tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
};

export const sortTasks = (tasks) => {
	return [...tasks].sort((a, b) => a.text.localeCompare(b.text));
};

export const useDebouncedSearch = (callback, delay) => {
	const debouncedCallback = useRef(debounce(callback, delay)).current;
	return (query) => debouncedCallback(query);
};
