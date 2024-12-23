import Swal from "sweetalert2";
import Loading from "../../components/common/loading";
import SectionWrapper from "../../components/common/section-wrapper";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "../../react-query/auth";

export default function UserManagementScreen() {
  const users = useGetUsers();
  const update = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (users.isLoading) return <Loading />;

  const handleUpdateUser = async (id, role) => {
    const res = await update.mutateAsync({ id: id, role: role });
    if (res.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "user update successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser.mutateAsync(id);
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "error",
            text: "something went wrong try again",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionWrapper>
        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.data.map((x, index) => (
                <tr
                  key={x.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {x._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover shadow-md"
                          src={x.photo}
                          alt={`${x.name}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-800">
                          {x.name}
                        </div>
                        <div
                          className={`text-sm ${
                            x.role === 1 ? "text-blue-500" : "text-gray-500"
                          }`}
                        >
                          {x.role === 1 ? "Admin" : "User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {x.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {x.role == 1 ? (
                      <button
                        onClick={() => handleUpdateUser(x._id, 2)}
                        className="btn btn-primary w-20"
                        disabled={update.isLoading}
                      >
                        {update.isLoading ? (
                          <span className="loader"></span>
                        ) : (
                          "User"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateUser(x._id, 1)}
                        className="btn btn-primary w-20"
                        disabled={update.isLoading}
                      >
                        {update.isLoading ? (
                          <span className="loader"></span>
                        ) : (
                          "Admin"
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(x._id)}
                      className="btn btn-error btn-outline ml-3"
                      disabled={deleteUser.isLoading}
                    >
                      {deleteUser.isLoading ? (
                        <span className="loader"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
    </div>
  );
}

const userList = [
  {
    id: 1,
    name: "John Doe",
    role: 1,
    email: "john.doe@example.com",
    picture: "https://via.placeholder.com/150/1",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: 2,
    email: "jane.smith@example.com",
    picture: "https://via.placeholder.com/150/2",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: 1,
    email: "michael.johnson@example.com",
    picture: "https://via.placeholder.com/150/3",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: 2,
    email: "emily.davis@example.com",
    picture: "https://via.placeholder.com/150/4",
  },
  {
    id: 5,
    name: "Robert Brown",
    role: 1,
    email: "robert.brown@example.com",
    picture: "https://via.placeholder.com/150/5",
  },
  {
    id: 6,
    name: "Jessica Wilson",
    role: 2,
    email: "jessica.wilson@example.com",
    picture: "https://via.placeholder.com/150/6",
  },
  {
    id: 7,
    name: "David Martinez",
    role: 1,
    email: "david.martinez@example.com",
    picture: "https://via.placeholder.com/150/7",
  },
  {
    id: 8,
    name: "Sophia Garcia",
    role: 2,
    email: "sophia.garcia@example.com",
    picture: "https://via.placeholder.com/150/8",
  },
  {
    id: 9,
    name: "William Lee",
    role: 1,
    email: "william.lee@example.com",
    picture: "https://via.placeholder.com/150/9",
  },
  {
    id: 10,
    name: "Olivia Anderson",
    role: 2,
    email: "olivia.anderson@example.com",
    picture: "https://via.placeholder.com/150/10",
  },
];
