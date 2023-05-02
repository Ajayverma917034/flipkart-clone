import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const InputFieldPassword = ({ PassValue, fieldName, id, setPassValue }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
    }
    return (
        <TextField
            margin='normal'
            variant='standard'
            id={id}
            label={fieldName}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={PassValue}
            onChange={(e) => setPassValue(e.target.value)}
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default InputFieldPassword