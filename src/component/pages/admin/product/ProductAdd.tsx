import { ICategory } from "../../../../interfaces/ICategory"
import useHookQuery from "../../../hooks/useHookQuery"
import { useProductMutation } from "../../../hooks/useHookMutation"

const ProductAdd = () => {
  const { form, onSubmit, isPending } = useProductMutation('CREATE', '/admin/products', 'Add Product Success!')
  const { data: category, isLoading } = useHookQuery({ path: 'category' })
  form.setValue('active', true)
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            {...form.register("title", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.title ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.title && <p className="text-red-500 text-xs italic">Product title is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Price
          </label>
          <input
            type="number"
            id="price"
            {...form.register("price", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.price ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.price && <p className="text-red-500 text-xs italic">Product price is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Discount Percentage
          </label>
          <select
            id="discountPercentage"
            {...form.register("discountPercentage", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.discountPercentage ? 'border-red-500' : ''}`}
          >
            {[...Array(101).keys()].map((item: number, index: number) => (
              <option key={index} value={item}>{item}%</option>
            ))}
          </select>
          {form.formState.errors.discountPercentage && <p className="text-red-500 text-xs italic">Product discount percentage is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Thumbnail
          </label>
          <input
            type="text"
            id="thumbnail"
            {...form.register("thumbnail", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.thumbnail ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.thumbnail && <p className="text-red-500 text-xs italic">Product thumbnail is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Category
          </label>
          <select
            id="category"
            {...form.register("category", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">--- Select Category ---</option>
            {isLoading ? <option>Loading...</option> : category!.map((item: ICategory, index: number) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
          {form.formState.errors.category && <p className="text-red-500 text-xs italic">Product category is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Description
          </label>
          <textarea
            id="description"
            {...form.register("description", { required: true })}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${form.formState.errors.description ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.description && <p className="text-red-500 text-xs italic">Product description is required</p>}
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

export default ProductAdd