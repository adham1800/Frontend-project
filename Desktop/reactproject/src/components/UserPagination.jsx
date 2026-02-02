import { Pagination } from "react-bootstrap";

const UserPagination = ({ total, setPage }) => {
  const pages = Math.ceil(total / 10);

  return (
    <Pagination className="justify-content-center mt-4">
      {[...Array(pages)].map((_, i) => (
        <Pagination.Item key={i} onClick={() => setPage(i)}>
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default UserPagination;
