import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <table className="ml-[10rem] w-full border mx-auto">
          <AdminMenu />
          <thead className="w-full border">
            <tr>
              <th className="text-left">ITEMS</th>
              <th className="text-left">USER</th>
              <th className="text-left">ID</th>
              <th className="text-left">DATA</th>
              <th className="text-left">TOTAL</th>
              <th className="text-left">PAID</th>
              <th className="text-left">DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={"http://localhost:5000/" + order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>
                <td>{order.user ? order.user.username : "N/A"}</td>
                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td>$ {order.totalPrice.toFixed(2)}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
