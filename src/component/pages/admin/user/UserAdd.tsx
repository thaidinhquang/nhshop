import { IUser } from "../../../../interfaces/IUser"
import useHookQuery from "../../../hooks/useHookQuery"
import { useUserMutation } from "../../../hooks/useHookMutation"

const UserAdd = () => {
  const { form, onSubmit, isPending } = useUserMutation('CREATE', '/admin/users', 'Add User Success!')
  const { data, isLoading } = useHookQuery({ path: 'users' })
  form.setValue('active', true)
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...form.register("name", { required: "Name is required" })}
            className={`sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.name ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.name && <p className="text-red-500 text-xs italic">{form.formState.errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
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
            className={`sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.email ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.email && <p className="text-red-500 text-xs italic">{form.formState.errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="text"
            id="password"
            {...form.register("password", { required: "Password is required", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Minimum eight characters, at least one letter and one number' } })}
            className={`sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.password ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.password && <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Role
          </label>
          <select
            id="role"
            {...form.register("role", { required: "Role is required" })}
            className={`sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.role ? 'border-red-500' : ''}`}
          >
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
          {form.formState.errors.role && <p className="text-red-500 text-xs italic">{form.formState.errors.role.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isPending ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </div >
  )
}

export default UserAdd