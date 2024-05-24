import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
export default function Todo() {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [isEditing, setEditing] = useState(false)
    const [currentTodoId, setCurrenTodoId] = useState(null)
    const [editTodoText, setEditTodoText] = useState("")

    useEffect(() => {
        const fetchTodos = async () => {
            const todoCollection = collection(db, 'todos')
            const todoSnapsoth = await getDocs(todoCollection)
            const todoList = todoSnapsoth.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setTodos(todoList)
        }
        fetchTodos()
    }, [])



    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return

        const docRef = await addDoc(collection(db, 'todos'), {
            text: newTodo
        })

        setTodos([...todos, { id: docRef, text: newTodo }])
        setNewTodo('')
    }

    const handleEditTodo = (id, text) => {
        setEditing(true);
        setCurrenTodoId(id);
        setEditTodoText(text);
    }

    const handleSaveEdit = async () => {
        if (editTodoText.trim() === "") return;

        const todoDoc = doc(db, 'todos', currentTodoId);
        await updateDoc(todoDoc, { text: editTodoText });
        setTodos(
            todos.map((todo) =>
                todo.id === currentTodoId ? { ...todo, text: editTodoText } : todo

            )
        );
        setEditing(false)
        setCurrenTodoId(null)
        setEditTodoText("")
    }
    const handleCancelEdit = () => {
        setEditTodoText("");
        setCurrenTodoId(null);
        setEditing(false);
    }
    const delateChange = (id) => {
        const nwTodos = [...todos]
        nwTodos.splice(id,)
        setTodos(nwTodos)
    }

    return (
        <div>
            <h1>Todo</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {isEditing && currentTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodoText}
                                    onChange={(e) => setEditTodoText(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={delateChange}>delate</button>
                            </>
                        ) : (
                            <>
                                <span>{todo.text}</span>
                                <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}


