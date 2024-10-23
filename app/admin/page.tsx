import StatCard from '@/components/StatCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns, Payment} from "@/components/table/columns"
import {DataTable} from "../../components/table/DataTable"
import {getRecentAppointmentList} from "@/lib/actions/appointment.actions"
 
// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.

//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }
const Admin = async () => {

  // const data = await getData()
  const appointments = await getRecentAppointmentList();
  console.log(appointments)

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-8">
            <header className="admin-header">
            <Link href="/" className="cursor-pointer">
            <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
            </Link>
            <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

</main>
<section className="admin-stat">
<StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
</section>
<DataTable columns={columns} data={appointments.documents} />
</div>
  )
}

export default Admin