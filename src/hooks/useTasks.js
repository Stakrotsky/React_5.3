import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import {
	addTask,
	deleteTask,
	editTask,
	filterTasks,
	sortTasks,
	useDebouncedSearch,
} from '../utils/utils.js';

export const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [taskText, setTaskText] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [editTaskId, setEditTaskId] = useState(null);
	const [editTaskText, setEditTaskText] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const tasksDbRef = ref(db, 'tasks');

		return onValue(tasksDbRef, (snapshot) => {
			const loadedTasks = snapshot.val();
			const tasksArray = loadedTasks
				? Object.entries(loadedTasks).map(([id, task]) => ({ id, ...task }))
				: [];
			setTasks(tasksArray);
			setIsLoading(false);
		});
	}, []);

	const handleEditTask = (task) => {
		setEditTaskId(task.id);
		setEditTaskText(task.text);
	};

	const handleAddTask = () => {
		addTask(taskText)
			.then(() => {
				setTaskText('');
				setError('');
			})
			.catch((err) => setError(err.message));
	};
	const handleSaveEditedTask = () => {
		editTask(editTaskId, editTaskText)
			.then((updatedTask) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === editTaskId ? updatedTask : task,
					),
				);
				setEditTaskId(null);
				setEditTaskText('');
			})
			.catch((err) => setError(err.message));
	};

	const handleDeleteTask = (id) => {
		deleteTask(id)
			.then(() => {
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			})
			.catch((err) => setError(err.message));
	};

	const debouncedSearch = useDebouncedSearch((query) => {
		setSearchQuery(query);
	}, 300);

	const handleSort = () => {
		setIsSorted((prevIsSorted) => !prevIsSorted);
	};

	const handleSearchChange = (e) => {
		const query = e.target.value;
		debouncedSearch(query);
	};

	const sortedTasks = isSorted ? sortTasks(tasks) : tasks;
	const filteredTasks = filterTasks(sortedTasks, searchQuery);

	return {
		filteredTasks,
		isLoading,
		error,
		editTaskId,
		editTaskText,
		handleEditTask,
		handleAddTask,
		handleSaveEditedTask,
		handleDeleteTask,
		handleSort,
		handleSearchChange,
		setEditTaskText,
		setEditTaskId,
		taskText,
		setTaskText,
		isSorted,
	};
};
