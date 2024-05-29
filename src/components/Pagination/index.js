import './index.css'

const Pagination = props => {
  const {currentPage, totalPages, onNextPage, onPrevPage} = props
  const onNextPage1 = () => {
    onNextPage()
  }
  const onPrevPage1 = () => {
    onPrevPage()
  }
  return (
    <footer className="pagination-container">
      <button
        className="button"
        onClick={onPrevPage1}
        type="button"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="page-count">{currentPage}</span>
      <button
        className="button"
        onClick={onNextPage1}
        type="button"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </footer>
  )
}
export default Pagination
