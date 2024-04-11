import { ICategory } from "../../../../interfaces/ICategory";
import { Link, useParams } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import { useEffect, useState } from "react";
import PageButton from "../../PageButton";
import { useCategoryMutation } from "../../../hooks/useHookMutation";

const CategoryList = () => {
  const trash = useParams().trash
  const { data, isLoading, refetch } = useHookQuery({ path: 'category', active: trash ? false : true });
  const { mutate, isPending } = useCategoryMutation('DELETE', 'none', trash ? 'Healing Category Success!' : 'Delete Category Success!')
  // button change page
  const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
  const limit = 6
  const indexOLastRecord = page * limit
  const indexOFirstRecord = indexOLastRecord - limit
  const currentData = data?.slice(indexOFirstRecord, indexOLastRecord)
  const nPage = Math.ceil(data?.length / limit)
  // end button change page
  useEffect(() => {
    refetch()
  }, [trash, refetch])
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h1>
        <div>
          <Link to={`${location.pathname}/add`}>
            <button className="font-mono text-blue-600 dark:text-blue-500 hover:underline">
              Add
            </button>
          </Link>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              ID
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Name
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Image
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Description
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Action
            </td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData?.map((item: ICategory, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={item.image} alt={item.name} className="h-20 w-40 object-cover" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              {trash ? (
                <td>
                  <button className="text-green-500 hover:text-green-700 mr-2" onClick={() => confirm("Are you sure to healing this category?") && mutate(item)}>
                    {isPending ? "Loading..." : "Revive"}
                  </button>
                </td>
              ) : (
                <td>
                  <button className="font-mono text-red-600 dark:text-red-500 hover:underline px-2.5" onClick={() => confirm("Are you sure to delete this category?") && mutate(item)}>
                    {isPending ? "Loading..." : "Remove"}
                  </button>
                  <button className="font-mono text-blue-600 dark:text-blue-500 hover:underline">
                    <Link to={`${location.pathname}/${item.id}/edit`}>Edit</Link>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table >
      {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
    </div >
  );
};

export default CategoryList;