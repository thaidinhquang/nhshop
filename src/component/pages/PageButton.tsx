import { Link } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"
type props = {
    nPage: number,
    page: number | 1,
    setPage: Dispatch<SetStateAction<number>>
}
const PageButton = ({ nPage, page, setPage }: props) => {
    const pageNumbers = [...Array(nPage! + 1).keys()].slice(1)
    return (
        <div className={`btn-directional flex justify-center my-12`}>
            <Link to={`${window.location.pathname}?page=${page - 1}`} key={page - 1}>
                <button className={`rounded py-4 px-6 items-center mx-2 bg-[#F9F1E7] ${page == 1 && "hidden"}`}
                    onClick={() => setPage(page - 1)}>
                    Back
                </button>
            </Link>
            {pageNumbers?.map((number) => (
                <Link to={`${window.location.pathname}?page=${number}`} key={number}>
                    <button className={`rounded py-4 px-6 items-center mx-2 ${number === page ? "bg-[#B88E2F] text-white" : "bg-[#F9F1E7]"}`}
                        onClick={() => setPage(number)}>
                        {number}
                    </button>
                </Link>
            ))}
            <Link to={`${window.location.pathname}?page=${page + 1}`} key={page + 1}>
                <button className={`rounded py-4 px-6 items-center mx-2 bg-[#F9F1E7] ${page==nPage && "hidden"}`}
                    onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </Link>
        </div>
    )
}

export default PageButton