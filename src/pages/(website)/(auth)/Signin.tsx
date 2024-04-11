import { useLocalStorage } from '@/common/hooks/useStorage'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Joi from 'joi'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required()
})

const Signin = () => {
    const [, setUser] = useLocalStorage('user', {})
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/signin', formData)
            return data
        },
        onSuccess: (data) => (
            setUser(data),
            alert('Đăng nhập thành công!'),
            navigate('/')
        ),
        onError: (error) => alert('Email hoặc mật khẩu sai')
    })

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData)
    }
    return (
        <div className='container'>
           <div className="form-container"> 
          <div className="close"><img src="../assets/icons/close.svg" alt="" /></div>
          <h1 className="form-title
            ">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="block">
                <button type="submit" className="button">Login</button>
                <div><Link to={`/signup`} className='my'>Create new account?</Link></div>
            </div>
          </form>
        
      </div>
        </div>
    )
}

export default Signin
