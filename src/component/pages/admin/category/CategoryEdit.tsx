import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useHookQuery from "../../../hooks/useHookQuery"
import { useCategoryMutation } from "../../../hooks/useHookMutation"

const CategoryEdit = () => {
    const { id } = useParams()
    const { data } = useHookQuery({ path: 'category', id: Number(id) })
    const { form, onSubmit, isPending } = useCategoryMutation('UPDATE', '/admin/category', 'Edit Category Success!')
    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form, id])
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...form.register("name", { required: true })}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.name ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.name && <p className="text-red-500 text-xs italic">Category name is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        {...form.register("image", { required: true })}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.image ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.image && <p className="text-red-500 text-xs italic">Category image is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category Description
                    </label>
                    <textarea
                        id="description"
                        {...form.register("description", { required: true })}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.description ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.description && <p className="text-red-500 text-xs italic">Category description is required</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {isPending ? "Loading..." : "Edit"}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default CategoryEdit