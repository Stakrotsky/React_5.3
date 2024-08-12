import styles from './app.module.css';
import { useTasks } from './hooks/useTasks';

export const App = () => {
	const {
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
	} = useTasks();
	return (
		<div className={styles.app}>
			<h3 className={styles.title}>Список задач:</h3>
			<div className={styles['input-block']}>
				<input
					type="text"
					value={taskText}
					onChange={(e) => setTaskText(e.target.value)}
					placeholder="Ввести новую задачу"
				/>
				<button onClick={handleAddTask}>Добавить задачу</button>
			</div>
			{error && <div className={styles['error-block']}>{error}</div>}
			<div className={styles['search-and-sort-block']}>
				<input
					type="text"
					onChange={handleSearchChange}
					placeholder="Поиск задач"
				/>
				<button onClick={handleSort}>
					{isSorted ? 'Отмена сортировки' : 'Сортировать по алфавиту'}
				</button>
			</div>
			<div className={styles['tasks-block']}>
				<h3 className={styles.title}>Текущие задачи:</h3>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<ul className={styles['tasks-block-list']}>
						{filteredTasks.map((task) => (
							<li key={task.id} className={styles['tasks-block-item']}>
								{editTaskId === task.id ? (
									<div className={styles['task-item-content']}>
										<input
											type="text"
											value={editTaskText}
											onChange={(e) =>
												setEditTaskText(e.target.value)
											}
											className={styles['task-input']}
										/>
										<div className={styles['task-item-buttons']}>
											<button
												onClick={handleSaveEditedTask}
												className={styles['save-button']}
											>
												Сохранить
											</button>
											<button
												onClick={() => setEditTaskId(null)}
												className={styles['cancel-save-button']}
											>
												Отмена
											</button>
										</div>
									</div>
								) : (
									<div className={styles['task-item-content']}>
										<span>{task.text}</span>
										<div className={styles['task-item-buttons']}>
											<button onClick={() => handleEditTask(task)}>
												Изменить
											</button>
											<button
												onClick={() => handleDeleteTask(task.id)}
												className={styles['delete-button']}
											>
												Удалить
											</button>
										</div>
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
