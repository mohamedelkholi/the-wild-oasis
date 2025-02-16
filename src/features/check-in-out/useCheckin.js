import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error(`there was an error while checking in`);
    },
  });

  return { checkin, isChecking };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateBooking } from "../../services/apiBookings";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useCheckin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
//     mutationFn: ({ bookingId, breakfast }) =>
//       updateBooking(bookingId, {
//         status: "checked-in",
//         isPaid: true,
//         ...breakfast,
//       }),

//     onSuccess: (data) => {
//       toast.success(`Booking #${data.id} successfully checked in`);
//       queryClient.invalidateQueries({ active: true });
//       navigate("/");
//     },

//     onError: () => toast.error("There was an error while checking in"),
//   });

//   return { checkin, isCheckingIn };
// }
