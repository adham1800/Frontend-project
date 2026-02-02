import { Pagination as BPagination } from "react-bootstrap";

const Pagination = ({ total, setPage }) => {
  const pages = Math.ceil(total / 10);

  return (
    <BPagination className="justify-content-center mt-4">
      {[...Array(pages)].map((_, i) => (
        <BPagination.Item key={i} onClick={() => setPage(i)}>
          {i + 1}
        </BPagination.Item>
      ))}
    </BPagination>
  );
};

export default Pagination;
