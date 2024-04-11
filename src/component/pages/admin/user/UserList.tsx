import { Link } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import PageButton from "../../PageButton";
import { useState } from "react";
import { IUser } from "../../../../interfaces/IUser";


const UserList = () => {
  const { data, isLoading } = useHookQuery({ path: 'users' })
 
  // button change page
  const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
  const limit = 6
  const indexOLastRecord = page * limit
  const indexOFirstRecord = indexOLastRecord - limit
  const currentData = data?.slice(indexOFirstRecord, indexOLastRecord)
  const nPage = Math.ceil(data?.length / limit)
  // end button change page

  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User List</h1>
        <div>
          <Link to={`${location.pathname}/add`}>
            <button className="font-mono text-blue-600 dark:text-blue-500 hover:underline">
              Add
            </button>
          </Link>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              ID
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Name
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Email
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Role
            </td>
            <td className="px-6 py-3 text-left text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">
              Action
            </td>
           
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData?.map((item: IUser, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.role == 2 ? "Admin" : item.role == 1 ? "Admin" : "User"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <button className="font-mono text-blue-600 dark:text-blue-500 hover:underline">
                    <Link to={`${location.pathname}/${item.id}/edit`}>Edit</Link>
                  </button>
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
    </div >
  );
};

export default UserList;