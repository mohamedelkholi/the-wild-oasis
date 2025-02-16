import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // console.log(bookings);
  // .1
  const numBookings = bookings.length;

  //.2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.

  const checkins = confirmedStays.length;

  //4.
  //occupation num checked in nights /num of all nights (num of cabins *num od Days)

  // console.log(confirmedStays);
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
