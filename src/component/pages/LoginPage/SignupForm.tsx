/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import useHookQuery from "../../hooks/useHookQuery";
import { IUser } from "../../../interfaces/IUser";
import { useUserMutation } from "../../hooks/useHookMutation";
import { Toaster } from "sonner";
const SignupForm = ({ setIsAnimated }: any) => {
  const { form, onSubmit, isPending, isSuccess } = useUserMutation('CREATE', 'Account created successfully!')
  const { data, isLoading } = useHookQuery({ path: 'users' })
  useEffect(() => {
    if (isSuccess) {
      form.reset()
    }
  }, [isSuccess, setIsAnimated, form])

  form.setValue('role', 0)
  form.setValue('active', true)
  if (isLoading) return <div>Loading...</div>
  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <Toaster richColors position='top-right' duration={2000} expand={true} />
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Create account
              </h1>
              <form className="mt-12" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...form.register("name", { required: "Name is required" })}
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 ${form.formState.errors.name && 'border-red-500'}`}
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                  {form.formState.errors.name && <p className="text-red-500 text-xs italic">{form.formState.errors.name.message}</p>}
                </div>
                <div className="mt-10 relative">
                  <input
                    id="email"
                    type="email"
                    {...form.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                      validate: async (value) => {
                        const isExist = data?.find((item: IUser) => item.email === value)
                        if (isExist) {
                          return 'Email already exist'
                        }
                      }
                    })}
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 ${form.formState.errors.email && 'border-red-500'}`
                    }
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                  {form.formState.errors.email && <p className="text-red-500 text-xs italic">{form.formState.errors.email.message}</p>}
                </div>
                <div className="mt-10 relative">
                  <input
                    id="password"
                    type="password"
                    {...form.register("password", { required: "Password is required", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Minimum eight characters, at least one letter and one number' } })}
                    className={`peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 ${form.formState.errors.password && 'border-red-500'}`}
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  {form.formState.errors.password && <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>}
                </div>
                <input
                  type="submit"
                  value={isPending ? 'Creating account...' : `Sign up `}
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;