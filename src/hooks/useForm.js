import { useState, useEffect } from 'react'

export function useForm(initialState, validate, next) {
    const [values, setValues] = useState(initialState)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isSubmiting) {
            const IsErrors = Object.keys(errors).length !== 0
            console.log('IsErrors', IsErrors);
            if (IsErrors) {
                setIsSubmiting(false)
            } else {
                next()
                setIsSubmiting(false)
                setValues(initialState)
            }
        }
    }, [errors, next, isSubmiting, initialState])
    const handleKeyDown = event => {
        //console.log(event.keyCode);
        if (event.keyCode === 13 && event.ctrlKey) {
            next()
        }
    }
    const handleChange = event => {
        event.persist()
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        })
        )
    }
    const handleSubmit = event => {
        event.preventDefault()
        const IsErrors = validate(values)
        setErrors(IsErrors)
        setIsSubmiting(true)
    }
    return {
        handleSubmit,
        handleKeyDown,
        values,
        errors,
        handleChange
    }
}
export default useForm