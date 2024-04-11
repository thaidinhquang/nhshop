import { useLocalStorage } from '@/common/hooks/useStorage'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const signinSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
})

const Signup = () => {
    const [, setUser] = useLocalStorage('user', {})
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            name:'',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/signup', formData)
            return data
        },
        onSuccess: (data) => setUser(data),
        onError: (error) => console.log(error)
    })

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData)
        alert('Đăng kí thành công!');
        navigate('/signin')
    }
    return (
        <div className='container'>
           <div className="form-container"> 
          <h1 className="form-title
            ">Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
              <label>Name</label>
              <input className='pl-2' type="text" {...register('name', { required: true, minLength: 3 })} placeholder='Name' />
              {errors.name && <p className='text-[red]'>{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className='pl-2' type="email" {...register('email', { required: true, minLength: 3 })} placeholder='Email' />
              {errors.email && <p className='text-[red]'>{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className='pl-2' type="password" {...register('password', { required: true, minLength: 6 })} placeholder='Password'/>
              {errors.password && <p className='text-[red]'>{errors.password.message}</p>}
            </div>
            <div className="form-group">
              <label>ConFirm Password</label>
              <input className='pl-2' type="password" {...register('confirmPassword', { required: true, minLength: 6 })} placeholder='Password'/>
              {errors.confirmPassword && <p className='text-[red]'>{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="button">Signup</button>
           
          </form>
        
      </div>
        </div>
    )
}

export default Signup
