import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

import {
  useDeleteMessageMutation,
  useGetMessagesQuery,
} from "../../../Redux/contactMessageApi";
import Pagination from "../../../components/Pagination/Pagination";
import { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

export default function ClientMessage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetMessagesQuery({ page: currentPage, limit });
  const messages = data?.data;

  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this service?");
    if (isConfirm) {
      try {
        const res = await deleteMessage(id);
        if (res?.data?.success) {
          toast.success("Message deleted successfully");
        } else {
          toast.error(
            res?.data?.message ? res?.data?.message : "Something went wrong!"
          );
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">Client Message</h3>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, i) => (
              <tr key={message?._id}>
                <td>{i + 1}</td>
                <td>{message?.name}</td>
                <td>{message?.phone}</td>
                <td>{message?.email}</td>
                <td>{message?.subject}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/contact-message/view/${message?._id}`}>
                      <FaEye className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(message?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
