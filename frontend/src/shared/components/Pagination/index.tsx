
import ReactPaginate from 'react-paginate';
import "./Pagination.scss"

type PaginationProps = {
    pages: number;
    setCurrentPage: (page: number) => void;
}

type IndicatorButtonProps = {
    side: "left" | "right"
}

export const Pagination = ({ pages, setCurrentPage }: PaginationProps) => {
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<IndicatorButton side='right' />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pages}
                previousLabel={<IndicatorButton side='left' />}
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    );
}

const IndicatorButton = ({ side }: IndicatorButtonProps) => {
    return (
        <button className="pagination-indicator">
            {side === "left" ? "<" : ">"}
        </button>
    )
}