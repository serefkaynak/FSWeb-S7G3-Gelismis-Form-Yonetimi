import React from 'react';
import { useState } from 'react';


export default function Form () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        kosul: false
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    }
    
    const handleFormDataChange = (event) => {
        setFormData({...formData,[event.target.key]: event.target.value })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <p>
                    <label>
                    Name:
                    <input type="text"  placeholder='name giriniz' key="name" onChange={handleFormDataChange}/>
                    </label>
                    </p>

                    <p>
                    <label>
                    Email:
                    <input type="email" placeholder='email giriniz' key="email" onChange={handleFormDataChange}
                    />
                    </label>
                    </p>

                    <p>
                    <label>
                    Password
                    <input type="password" placeholder='*****'key="password" onChange={handleFormDataChange}/>
                    </label>
                    </p>

                    <p>
                    <label>
                    Okudum, Kabul Ediyorum.
                    <input type="checkbox" />
                    </label>
                    </p>

                    <p>
                    <button type='submit'>
                        Submit
                    </button>
                    </p>
                    
                </form  > 
            </div>
            
        </div>
    )
}