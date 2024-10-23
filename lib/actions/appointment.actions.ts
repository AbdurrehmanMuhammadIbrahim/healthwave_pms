'use server'

import { ID, Query } from "node-appwrite";
import { databases, } from "../appwrite.config";
import { parseStringify } from "../utils";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
try {
     // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
     const newAppointment = await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
       
          
        
      );

      return parseStringify(newAppointment);
    } catch (error) {
      console.error("An error occurred while creating a new patient:", error);
    }
   
    }

   //getAppointment
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
    process.env.DATABASE_ID!,
    process.env.APPOINTMENT_COLLECTION_ID!,
    appointmentId
      )

      return parseStringify(appointment);

  } catch (error) {
    console.error(
      "An error occurred while getting the appointment details:",
      error
    );
  }
};
console.log(process.env.DATABASE_ID, process.env.APPOINTMENT_COLLECTION_ID);

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      // [Query.orderDesc("$createdAt"),
        [Query.limit(1000000000)],
      // [Query.limit(1000000000)] 
    );



    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };


    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};


export const updateAppointment = async({
  appointmentId,
  userId,
  appointment,
  type}:
  UpdateAppointmentParams) =>{
    try {
      const updatedAppointment = await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment,
       
      )
      if(!updateAppointment){
        throw new Error ('Appointment not found')

      }
      revalidatePath('/admin');
      return parseStringify(updatedAppointment);

    } catch (error) {
      console.log(error)
    }

}