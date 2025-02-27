import { db } from "@/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUserMessage, deleteUserMessage } from "./actions";
import { UserMessages } from "@/db/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import SubmitButton from "./SubmitBtn";

async function getUserMessage() {
  const { userId } = await auth();

  if (!userId) return null;

  return db
    .select()
    .from(UserMessages)
    .where(eq(UserMessages.user_id, userId))
    .orderBy(desc(UserMessages.createTs));
}

export default async function MessagesPage() {
  const existingMessage = await getUserMessage();

  const listOfMsgs = existingMessage?.length ? (
    <div className="w-2/3 grid grid-cols-1 gap-4 mt-20">
      {existingMessage.map((item) => (
        <div className="border-b-2 flex justify-between" key={item.id}>
          <h2 className="text-3xl ">✍️ {item.message}</h2>

          <form action={deleteUserMessage}>
            <input type="hidden" name="messageId" value={item.id} />

            <SubmitButton type="Delete" />
          </form>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <main className="flex flex-col gap-6 items-center px-24">
      <AddMsgForm />
      {listOfMsgs}
    </main>
  );
}

function AddMsgForm() {
  return (
    <form
      action={createUserMessage}
      className="shadow-md w-2/3 rounded p-8 pb-0 bg-neutral-200"
    >
      <div className="mb-6">
        <input
          type="text"
          name="message"
          placeholder="Add your message"
          className="text-center appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
          required
        />
      </div>
      <div className="w-full text-center">
        <SubmitButton type="Add" />
      </div>
    </form>
  );
}
